# `scripts/docs/` — pentaglyph metric & lint tooling (Layer ③ Automation)

Python scripts that operate on the kit's own `template/docs/` tree (or a downstream project's `docs/` tree) to produce Layer ⑤ Measurement outputs and Layer ③ Automation lints.

> **Self-architecture role**: Layer ③ Automation per [`STRATEGY.md §10`](../../template/docs/STRATEGY.md) and [ADR-0007](../../template/docs/arc42/09-decisions/0007-automation-layer-contract.md). Outputs are Layer ⑤ Measurement artefacts (placed under `metrics/` of the target project).
>
> **Layer-writes contract** (per ADR-0007): these scripts **read** layers ⓪-④ and **write** only to Layer ⑤ (`metrics/`) or CI logs. They do not mutate any other layer.

## Scripts

| Script | Reads | Writes | Purpose |
| --- | --- | --- | --- |
| [`metrics_coverage.py`](./metrics_coverage.py) | `arc42/`, `detailed-design/`, `arc42/03-context-and-scope/use-cases/` (Layer ①) | stdout (json / markdown) | Existence + substantive-content coverage per arc42 section |
| [`metrics_freshness.py`](./metrics_freshness.py) | Every durable doc's `last-reviewed:` front-matter field (Layer ①+②+④) | stdout (json / markdown) | Age-in-days distribution + 90-day staleness warnings |
| [`metrics_adr.py`](./metrics_adr.py) | `arc42/09-decisions/*.md` (Layer ①) | stdout (json / markdown) | ADR Status distribution + monthly throughput |

## Usage

### Direct invocation (Python 3.10+)

```bash
# Run from the project root (where docs/ lives) — for downstream projects
python3 libs/pentaglyph-docs/scripts/docs/metrics_coverage.py docs/

# Or run against the kit's own template/docs/ (dogfooding) — for the kit itself
python3 libs/pentaglyph-docs/scripts/docs/metrics_coverage.py libs/pentaglyph-docs/template/docs/

# Output format flags
python3 libs/pentaglyph-docs/scripts/docs/metrics_freshness.py docs/ --format=markdown
python3 libs/pentaglyph-docs/scripts/docs/metrics_adr.py docs/ --format=json
```

### Via Bun CLI (Layer ③ wrapper)

```bash
bunx pentaglyph metrics --target=docs --format=markdown
bunx pentaglyph metrics --target=docs --metric=coverage --format=json
```

The Bun CLI ([`../../cli/src/commands/metrics.ts`](../../cli/src/commands/metrics.ts)) is a thin wrapper that shells out to the three Python scripts and aggregates output.

## Output formats

Both formats are stable contracts for downstream consumers (CI dashboards, MkDocs plugins, custom tooling):

- `--format=json`: machine-parseable. JSON object with metric name as key.
- `--format=markdown` (default): human-readable. Markdown table per metric.

JSON schema is documented in each script's `--help`. Markdown output is suitable for committing to `metrics/snapshots/YYYY-MM-DD_*.md` for trend tracking.

## Design notes

- **Read-only**: scripts never mutate `docs/`. Output goes to stdout — callers decide where to redirect (file / CI step / dashboard).
- **No external dependencies**: stdlib-only (`pathlib`, `re`, `json`, `argparse`, `datetime`). Avoids supply-chain risk for a tool that runs in CI.
- **Idempotent**: running a script twice in succession produces identical output (no clock-dependent state besides freshness — which is intentional and salient).
- **Dogfoodable**: the kit runs these scripts against its own `template/docs/` to produce [`../../template/docs/metrics/baseline.md`](../../template/docs/metrics/baseline.md).

## Cross-references

- [STRATEGY.md §12 Layer ⑤ Measurement](../../template/docs/STRATEGY.md)
- [ADR-0009 Measurement layer activation](../../template/docs/arc42/09-decisions/0009-measurement-layer-activation.md)
- [`../../template/docs/metrics/README.md`](../../template/docs/metrics/README.md) — Layer ⑤ artefact navigation
- [`../../cli/src/commands/metrics.ts`](../../cli/src/commands/metrics.ts) — Bun CLI wrapper

## License

MIT.
