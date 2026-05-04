import { mkdir, readdir, copyFile, stat, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";

export interface CopyOptions {
  force: boolean;
  dryRun: boolean;
  /** Optional file-content transformer. Receives content + relative path. */
  transform?: (content: string, relativePath: string) => string;
  /** Optional log sink. */
  log?: (msg: string) => void;
}

/**
 * Recursively copy a directory tree.
 *
 * @remarks
 * - Respects `force` and `dryRun` flags.
 * - Applies `transform` only to text files (utf-8 decodable). Binary files copy verbatim.
 */
export async function copyDir(
  srcDir: string,
  destDir: string,
  opts: CopyOptions,
): Promise<{ copied: number; skipped: number }> {
  let copied = 0;
  let skipped = 0;

  if (!opts.dryRun) {
    await mkdir(destDir, { recursive: true });
  }

  const entries = await readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name);
    const destPath = join(destDir, entry.name);

    if (entry.isDirectory()) {
      const sub = await copyDir(srcPath, destPath, opts);
      copied += sub.copied;
      skipped += sub.skipped;
      continue;
    }

    if (existsSync(destPath) && !opts.force) {
      opts.log?.(`  skip   ${relative(process.cwd(), destPath)} (exists)`);
      skipped++;
      continue;
    }

    if (opts.dryRun) {
      opts.log?.(`  would  ${relative(process.cwd(), destPath)}`);
      copied++;
      continue;
    }

    if (opts.transform && isLikelyText(srcPath)) {
      const raw = await readFile(srcPath, "utf-8");
      const transformed = opts.transform(raw, relative(srcDir, srcPath));
      await mkdir(dirname(destPath), { recursive: true });
      await writeFile(destPath, transformed, "utf-8");
    } else {
      await mkdir(dirname(destPath), { recursive: true });
      await copyFile(srcPath, destPath);
    }

    opts.log?.(`  write  ${relative(process.cwd(), destPath)}`);
    copied++;
  }

  return { copied, skipped };
}

/** Is the file likely text (transformable) based on extension? */
function isLikelyText(path: string): boolean {
  const TEXT_EXTS = [".md", ".txt", ".dsl", ".yml", ".yaml", ".json", ".ts", ".tsx", ".js", ".mjs", ".cjs", ".sh"];
  return TEXT_EXTS.some((ext) => path.endsWith(ext));
}

/** Resolve the path of the bundled `template/` directory relative to this file. */
export async function resolveTemplateDir(): Promise<string> {
  // When running from source: cli/src/lib/fs.ts → ../../../template/
  // When running from compiled: cli/dist/index.js → ../template/
  const here = dirname(new URL(import.meta.url).pathname);
  const candidates = [
    join(here, "..", "..", "..", "template"),
    join(here, "..", "..", "template"),
    join(here, "..", "template"),
  ];
  for (const c of candidates) {
    try {
      const s = await stat(c);
      if (s.isDirectory()) return c;
    } catch {
      // try next
    }
  }
  throw new Error(
    "Could not locate the bundled template/ directory. " +
      "Reinstall tetragram or pass --template <path>.",
  );
}
