import { existsSync } from "node:fs";
import { mkdir, copyFile, writeFile, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import type { ParsedArgs } from "../lib/args.ts";
import type { AiTarget, Profile, Section } from "../lib/types.ts";
import { PROFILE_SECTIONS, ROOT_FILES } from "../lib/profiles.ts";
import { copyDir, resolveTemplateDir } from "../lib/fs.ts";

/**
 * Substitute `<placeholder>` with the project name **only inside the YAML
 * front-matter block** at the top of the file.
 *
 * @remarks
 * `<placeholder>` is overloaded in the templates: it stands for the project
 * name in front-matter `owner:` lines (where it should be substituted) AND
 * for "fill-this-in" markers in the body of authoring templates (where it
 * must remain literal so the human author can spot it). Substituting only
 * inside the leading `---...---` block satisfies both.
 *
 * Files without front-matter are returned unchanged.
 */
function substitutePlaceholder(content: string, projectName: string): string {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) return content;
  const fmEnd = fmMatch[0].length;
  const head = content.slice(0, fmEnd).replaceAll("<placeholder>", projectName);
  const body = content.slice(fmEnd);
  return head + body;
}

export async function runInit(opts: ParsedArgs): Promise<void> {
  const target = opts._[0];
  if (!target) {
    throw new Error(
      "Usage: pentaglyph init <target-dir> [--profile=...] [--ai=...] [--name=...]",
    );
  }

  const targetRoot = resolve(target);
  const targetDocs = join(targetRoot, "docs");

  const profile: Profile = opts.profile ?? "standard";
  const ai: AiTarget = opts.ai ?? "generic";
  const projectName = opts.name ?? "<placeholder>";

  const sections: readonly Section[] = opts.include
    ? (opts.include as Section[])
    : PROFILE_SECTIONS[profile];

  const log = (msg: string) => process.stdout.write(`${msg}\n`);

  log(`pentaglyph init`);
  log(`  target:   ${targetDocs}`);
  log(`  profile:  ${profile}${opts.include ? " (overridden by --include)" : ""}`);
  log(`  sections: ${sections.join(", ")}`);
  log(`  ai:       ${ai}`);
  log(`  name:     ${projectName}`);
  log(`  force:    ${opts.force ?? false}`);
  log(`  dry-run:  ${opts.dryRun ?? false}`);
  log("");

  const templateRoot = await resolveTemplateDir();
  const templateDocs = join(templateRoot, "docs");

  if (!existsSync(templateDocs)) {
    throw new Error(`Template docs not found at ${templateDocs}`);
  }

  if (!opts.dryRun) {
    await mkdir(targetDocs, { recursive: true });
  }

  // Always-installed root files
  for (const f of ROOT_FILES) {
    await installFile(
      join(templateDocs, f),
      join(targetDocs, f),
      { force: !!opts.force, dryRun: !!opts.dryRun, projectName, log },
    );
  }

  // Sections — try layer-prefixed paths first (post-ADR-0010 restructure
  // where artefact sections live under 01-artefacts/), then fall back to
  // flat paths (pre-restructure templates or future top-level layers like
  // 02-process / 04-governance / 05-measurement). The candidate order
  // ensures upstream templates can evolve their physical layout without
  // breaking older profile names.
  for (const section of sections) {
    const candidates = [
      join("01-artefacts", section),
      section,
    ];
    let resolved: { src: string; dest: string; rel: string } | null = null;
    for (const rel of candidates) {
      const src = join(templateDocs, rel);
      if (existsSync(src)) {
        resolved = { src, dest: join(targetDocs, rel), rel };
        break;
      }
    }
    if (!resolved) {
      log(
        `  warn   section "${section}" not found in template ` +
          `(tried 01-artefacts/${section} and ${section}) — skipping`,
      );
      continue;
    }
    log(`  add    ${resolved.rel}/`);
    await copyDir(resolved.src, resolved.dest, {
      force: !!opts.force,
      dryRun: !!opts.dryRun,
      log,
      transform: (content) => substitutePlaceholder(content, projectName),
    });
  }

  // AI hook
  await installAiHook(templateRoot, targetRoot, ai, opts, log);

  // Cross-repo AI marker — addresses pentaglyph-docs#19. Auto-load rules
  // resolve from a Claude Code session root, so when an AI agent sessioned
  // in repo A edits a pentaglyph-adopting repo B from outside, B's
  // `.claude/rules/documentation.md` never fires. The marker file is
  // discoverable by `ls` / `find` from the file tree alone, so an external
  // AI agent crawling the target before writing can latch onto it.
  await writeMarker(targetRoot, opts, log);

  log("");
  log("Done.");
  log(`Read ${targetDocs}/AI_INSTRUCTIONS.md and ${targetDocs}/WORKFLOW.md next.`);
  // Machine-readable hint for AI agents observing this stdout. Format
  // intentionally distinct (single-line, key=value) so a downstream agent
  // can grep / parse without false positives from prose. See
  // pentaglyph-docs#19 Option D.
  log("AI_AGENT_HINT: kit=pentaglyph read=docs/AI_INSTRUCTIONS.md,docs/WORKFLOW.md before=any-edit-under=docs/");
}

/**
 * Writes a small `.pentaglyph` marker file at the target root.
 *
 * The file is JSON-shaped so downstream tooling (CI hooks, AI-agent
 * meta-rules) can parse it without YAML or TOML dependencies. Content is
 * intentionally minimal — just enough for an external agent to:
 *   1. Detect that the directory is a pentaglyph-adopting repo
 *   2. Locate the canonical AI_INSTRUCTIONS / WORKFLOW files
 *   3. Read the kit version so version-specific protocol can be retrieved
 *
 * Path: `<target>/.pentaglyph` (at the repo root, alongside `docs/`).
 * The leading dot keeps it out of the way for human listings while
 * remaining discoverable by `find . -name '.pentaglyph'`.
 */
async function writeMarker(
  targetRoot: string,
  opts: ParsedArgs,
  log: (msg: string) => void,
): Promise<void> {
  const markerPath = join(targetRoot, ".pentaglyph");
  if (existsSync(markerPath) && !opts.force) {
    log(`  skip   ${markerPath} (exists)`);
    return;
  }
  if (opts.dryRun) {
    log(`  would  ${markerPath}`);
    return;
  }
  const version = await readKitVersion();
  const marker = {
    kit: "pentaglyph",
    version,
    ai_instructions: "docs/AI_INSTRUCTIONS.md",
    workflow: "docs/WORKFLOW.md",
    templates: "docs/templates/",
    agent_hint:
      "AI agents editing this repo's docs/ from any context (including " +
      "cross-repo sessions) should Read docs/AI_INSTRUCTIONS.md and " +
      "docs/WORKFLOW.md before writing. The Claude Code .claude/rules/ " +
      "auto-load only resolves from the session root, so external agents " +
      "must discover this protocol via the file tree.",
    discoverable_by: [
      "find . -name '.pentaglyph'",
      "test -f .pentaglyph",
    ],
    upstream: "https://github.com/uyuutosa/pentaglyph-docs",
  };
  await writeFile(markerPath, JSON.stringify(marker, null, 2) + "\n", "utf8");
  log(`  write  ${markerPath}`);
}

async function readKitVersion(): Promise<string> {
  try {
    const pkgPath = join(import.meta.dirname, "..", "..", "package.json");
    const pkg = JSON.parse(await readFile(pkgPath, "utf8")) as { version?: string };
    return pkg.version ?? "0.0.0";
  } catch {
    return "0.0.0";
  }
}

interface InstallFileOpts {
  force: boolean;
  dryRun: boolean;
  projectName: string;
  log: (msg: string) => void;
}

async function installFile(
  src: string,
  dest: string,
  opts: InstallFileOpts,
): Promise<void> {
  if (!existsSync(src)) {
    opts.log(`  warn   ${src} missing in template`);
    return;
  }
  if (existsSync(dest) && !opts.force) {
    opts.log(`  skip   ${dest} (exists)`);
    return;
  }
  if (opts.dryRun) {
    opts.log(`  would  ${dest}`);
    return;
  }
  await mkdir(dirname(dest), { recursive: true });
  const content = await readFile(src, "utf-8");
  const replaced = substitutePlaceholder(content, opts.projectName);
  await writeFile(dest, replaced, "utf-8");
  opts.log(`  write  ${dest}`);
}

async function installAiHook(
  templateRoot: string,
  targetRoot: string,
  ai: AiTarget,
  opts: ParsedArgs,
  log: (msg: string) => void,
): Promise<void> {
  if (ai === "generic") {
    log(`  ai     generic → AI_INSTRUCTIONS.md only (no editor hook)`);
    return;
  }

  // Claude target: install full .claude/ tree (rules + agents + skills).
  // The bundled doc-orchestrator + 5 specialist agents + 3 slash commands
  // turn /doc-init into a guided conversational doc builder.
  if (ai === "claude") {
    const src = join(templateRoot, ".claude");
    const dest = join(targetRoot, ".claude");
    if (!existsSync(src)) {
      log(`  warn   Claude template source missing: ${src}`);
      return;
    }
    log(`  ai     claude → .claude/{rules,agents,skills}/ (orchestrator + 5 specialists + 3 commands)`);
    await copyDir(src, dest, {
      force: !!opts.force,
      dryRun: !!opts.dryRun,
      log,
      transform: opts.name
        ? (content) => substitutePlaceholder(content, opts.name!)
        : undefined,
    });
    return;
  }

  // Cursor / Copilot targets: re-use the documentation rule as a project
  // instruction file at the editor's expected path.
  const map: Record<Exclude<AiTarget, "generic" | "claude">, { src: string; dest: string }> = {
    cursor: {
      src: join(templateRoot, ".claude/rules/documentation.md"),
      dest: join(targetRoot, ".cursor/rules/docs.md"),
    },
    copilot: {
      src: join(templateRoot, ".claude/rules/documentation.md"),
      dest: join(targetRoot, ".github/copilot-instructions.md"),
    },
  };

  const entry = map[ai];
  if (!existsSync(entry.src)) {
    log(`  warn   AI hook source missing: ${entry.src}`);
    return;
  }
  if (existsSync(entry.dest) && !opts.force) {
    log(`  skip   ${entry.dest} (exists)`);
    return;
  }
  if (opts.dryRun) {
    log(`  would  ${entry.dest}`);
    return;
  }
  await mkdir(dirname(entry.dest), { recursive: true });
  await copyFile(entry.src, entry.dest);
  log(`  write  ${entry.dest}`);
}
