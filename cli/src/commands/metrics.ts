/**
 * `pentaglyph metrics [--target=<dir>] [--metric=coverage|freshness|adr|all] [--format=markdown|json]`
 *
 * Layer ③ Automation CLI wrapper for the Python metric scripts in
 * `scripts/docs/`. Shells out to each script and aggregates output.
 *
 * Per ADR-0007 layer-writes contract: this command **reads** Layer ① / ② / ④
 * artefacts and **writes** only to stdout. Callers redirect to Layer ⑤
 * Measurement files under `docs/metrics/`.
 *
 * @see scripts/docs/README.md
 * @see template/docs/metrics/README.md
 * @see template/docs/arc42/09-decisions/0007-automation-layer-contract.md
 * @see template/docs/arc42/09-decisions/0009-measurement-layer-activation.md
 *
 * @remarks
 * Requires Python 3.10+ available on PATH. The Python scripts are stdlib-only
 * (no pip install required). If Python is missing, the user is given an
 * actionable error pointing to the direct-invocation path.
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ParsedArgs } from "../lib/args.ts";

type Metric = "coverage" | "freshness" | "adr" | "all";
type Format = "markdown" | "json";

const KNOWN_METRICS: ReadonlySet<Metric> = new Set<Metric>([
  "coverage",
  "freshness",
  "adr",
  "all",
] as const);

/** Resolve the path to the bundled `scripts/docs/` directory (sibling of `cli/`). */
function resolveScriptsDir(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  // src/commands/metrics.ts is two levels deep inside cli/; scripts/docs lives next to cli/.
  return resolve(here, "..", "..", "..", "scripts", "docs");
}

/** Run one Python script and return its stdout as a string. */
async function runScript(
  scriptPath: string,
  args: string[],
): Promise<string> {
  return new Promise((resolveStdout, reject) => {
    const child = spawn("python3", [scriptPath, ...args], {
      stdio: ["ignore", "pipe", "inherit"],
    });
    let buf = "";
    child.stdout.on("data", (chunk) => {
      buf += String(chunk);
    });
    child.on("error", (err) => {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        reject(
          new Error(
            "python3 not found on PATH. Install Python 3.10+ and re-run, or invoke the scripts directly:\n" +
              `  python3 ${scriptPath} <docs_dir>\n\n` +
              "See scripts/docs/README.md for details.",
          ),
        );
        return;
      }
      reject(err);
    });
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Python script exited with code ${code}: ${scriptPath}`));
      } else {
        resolveStdout(buf);
      }
    });
  });
}

/**
 * `pentaglyph metrics` entry point.
 *
 * @param opts - Parsed CLI args. Recognised flags:
 *   - `--target=<dir>`: docs directory to measure. Defaults to `docs` relative to cwd.
 *   - `--metric=coverage|freshness|adr|all`: which metric to run. Defaults to `all`.
 *   - `--format=markdown|json`: output format. Defaults to `markdown`.
 *   - `--stale-days=<N>`: freshness staleness threshold (default 90).
 *   - `--proposed-stale-days=<N>`: ADR Proposed staleness threshold (default 30).
 *   - `--threshold=<N>`: coverage substantive-content threshold (default 200).
 */
export async function runMetrics(opts: ParsedArgs): Promise<void> {
  const target = (opts.target as string | undefined) ?? "docs";
  const metric = ((opts.metric as Metric | undefined) ?? "all") as Metric;
  const format = ((opts.format as Format | undefined) ?? "markdown") as Format;
  const staleDays = opts["stale-days"] as string | undefined;
  const proposedStaleDays = opts["proposed-stale-days"] as string | undefined;
  const threshold = opts.threshold as string | undefined;

  if (!KNOWN_METRICS.has(metric)) {
    throw new Error(
      `Unknown --metric value: ${metric}. Expected one of: ${[...KNOWN_METRICS].join(", ")}`,
    );
  }
  const targetDir = resolve(process.cwd(), target);
  if (!existsSync(targetDir)) {
    throw new Error(`Target directory does not exist: ${targetDir}`);
  }
  const scriptsDir = resolveScriptsDir();
  if (!existsSync(scriptsDir)) {
    throw new Error(
      `scripts/docs/ directory not found at ${scriptsDir}. The CLI expects to be installed alongside the scripts; if you cloned the repo, try running the Python scripts directly.`,
    );
  }

  const runs: Array<{ name: Metric; path: string; extraArgs: string[] }> = [];
  if (metric === "coverage" || metric === "all") {
    runs.push({
      name: "coverage",
      path: join(scriptsDir, "metrics_coverage.py"),
      extraArgs: threshold ? [`--threshold=${threshold}`] : [],
    });
  }
  if (metric === "freshness" || metric === "all") {
    runs.push({
      name: "freshness",
      path: join(scriptsDir, "metrics_freshness.py"),
      extraArgs: staleDays ? [`--stale-days=${staleDays}`] : [],
    });
  }
  if (metric === "adr" || metric === "all") {
    runs.push({
      name: "adr",
      path: join(scriptsDir, "metrics_adr.py"),
      extraArgs: proposedStaleDays ? [`--proposed-stale-days=${proposedStaleDays}`] : [],
    });
  }

  if (format === "json") {
    const aggregated: Record<string, unknown> = {};
    for (const r of runs) {
      const stdout = await runScript(r.path, [
        targetDir,
        "--format=json",
        ...r.extraArgs,
      ]);
      aggregated[r.name] = JSON.parse(stdout);
    }
    process.stdout.write(JSON.stringify(aggregated, null, 2));
    process.stdout.write("\n");
    return;
  }

  // markdown: emit each script's output sequentially, separated by horizontal rules
  for (let i = 0; i < runs.length; i++) {
    const r = runs[i];
    if (!r) continue;
    const stdout = await runScript(r.path, [
      targetDir,
      "--format=markdown",
      ...r.extraArgs,
    ]);
    process.stdout.write(stdout);
    if (i < runs.length - 1) {
      process.stdout.write("\n\n---\n\n");
    }
  }
}
