import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export function printHelp(): void {
  const help = `tetragram — scaffold a docs/ tree based on arc42 + C4 + MADR + Diátaxis

USAGE
  tetragram init <target-dir> [options]
  tetragram add <section> [options]
  tetragram --help | --version

COMMANDS
  init <dir>     Scaffold a new docs/ tree under <dir>/docs.
  add <section>  Add a single section (e.g. user-manual) to an existing scaffold.

OPTIONS
  --profile <minimal|standard|full>
                 Which sections to include (default: standard).
                 - minimal:  templates + arc42 (12 sections + ADRs)
                 - standard: minimal + diagrams + detailed-design + api-contract
                             + design-guide + impl-plans + postmortems + reports
                 - full:     standard + task-list + cost-estimates + user-manual

  --include <list>
                 Comma-separated sections to include, overriding the profile.
                 Sections: arc42, diagrams, detailed-design, design-guide,
                           api-contract, impl-plans, task-list, postmortems,
                           reports, cost-estimates, user-manual, templates.

  --ai <claude|cursor|copilot|generic>
                 Which AI editor hook to install (default: generic).
                 - claude:  .claude/rules/documentation.md auto-load rule
                 - cursor:  .cursor/rules/docs.md
                 - copilot: .github/copilot-instructions.md
                 - generic: docs/AI_INSTRUCTIONS.md only

  --lang <en|ja|both>
                 Language for boilerplate placeholders (default: en).
                 Templates themselves remain English regardless.

  --name <project-name>
                 Project name written into front-matter placeholders.

  --force        Overwrite existing files. Default: skip existing files.
  --dry-run      Print actions without writing.
  -h, --help     Show this help.
  -v, --version  Show version.

EXAMPLES
  # Scaffold a standard kit into ./my-app/docs with Claude Code support
  tetragram init ./my-app --profile=standard --ai=claude --name="My App"

  # Just templates + arc42 + ADRs
  tetragram init ./my-lib --profile=minimal --ai=generic

  # Add the user-manual section later
  tetragram add user-manual --target=./my-app

DOCS
  https://github.com/uyuutosa/tetragram-docs
`;
  process.stdout.write(help);
}

export async function printVersion(): Promise<void> {
  try {
    const here = dirname(new URL(import.meta.url).pathname);
    const candidates = [
      join(here, "..", "..", "package.json"),
      join(here, "..", "package.json"),
    ];
    for (const c of candidates) {
      try {
        const pkg = JSON.parse(await readFile(c, "utf-8"));
        process.stdout.write(`tetragram ${pkg.version}\n`);
        return;
      } catch {
        // try next
      }
    }
  } catch {
    // fall through
  }
  process.stdout.write("tetragram (version unknown)\n");
}
