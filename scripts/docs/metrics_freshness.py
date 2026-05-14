#!/usr/bin/env python3
"""Durable-doc freshness: last-reviewed age distribution + 90-day staleness warnings.

Walks the target docs/ tree, parses each durable doc's `last-reviewed:` YAML
front-matter field, computes age in days from today, and reports:

- Age bucket distribution (<30 / 30-89 / 90-179 / 180+ days).
- Files whose last-reviewed exceeds the staleness threshold (default 90 days).
- Files missing `last-reviewed` entirely.

Volatile docs (Layer B: impl-plans/, task-list/, postmortems/, reports/,
cost-estimates/) are excluded from freshness checks because they are
append-only — the existence of a newer dated file is itself the freshness signal.

The script is part of Layer ③ Automation per ADR-0007 of the pentaglyph kit. Per
the layer contract it reads Layer ① + ② + ④ Artefacts and writes only to stdout.

Usage:
    metrics_freshness.py <docs_dir> [--format=markdown|json] [--stale-days=90]
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import asdict, dataclass
from datetime import date
from pathlib import Path

# Durable doc trees subject to freshness lint. Layer B trees (impl-plans, etc.)
# are excluded — they are append-only and don't have last-reviewed semantics.
DURABLE_TREES: tuple[str, ...] = (
    "arc42",
    "detailed-design",
    "design-guide",
    "api-contract",
    "user-manual",
    "governance",
    "templates",
    "service-design",
    "diagrams",
    "metrics",
)

FRONT_MATTER_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)
LAST_REVIEWED_RE = re.compile(r"^last-reviewed:\s*(\S+)", re.MULTILINE)

# Buckets are inclusive lower bound, exclusive upper bound.
BUCKETS: tuple[tuple[str, int, int | None], ...] = (
    ("fresh (<30d)", 0, 30),
    ("aging (30-89d)", 30, 90),
    ("stale (90-179d)", 90, 180),
    ("rotten (180d+)", 180, None),
)


@dataclass
class FileStat:
    path: str
    last_reviewed: str | None
    age_days: int | None


def parse_last_reviewed(text: str) -> str | None:
    m = FRONT_MATTER_RE.match(text)
    if not m:
        return None
    fm = m.group(1)
    m2 = LAST_REVIEWED_RE.search(fm)
    if not m2:
        return None
    value = m2.group(1).strip().strip("\"'")
    # Treat placeholder values as missing
    if value.startswith("<") and value.endswith(">"):
        return None
    return value


def age_in_days(last_reviewed: str, today: date) -> int | None:
    try:
        d = date.fromisoformat(last_reviewed)
    except ValueError:
        return None
    return (today - d).days


def collect(docs_root: Path, today: date) -> list[FileStat]:
    stats: list[FileStat] = []
    for tree in DURABLE_TREES:
        target = docs_root / tree
        if not target.exists():
            continue
        for md in target.rglob("*.md"):
            try:
                text = md.read_text(encoding="utf-8")
            except (OSError, UnicodeDecodeError):
                continue
            lr = parse_last_reviewed(text)
            age = age_in_days(lr, today) if lr else None
            stats.append(
                FileStat(
                    path=str(md.relative_to(docs_root)),
                    last_reviewed=lr,
                    age_days=age,
                )
            )
    return stats


def bucket_label(age_days: int | None) -> str:
    if age_days is None:
        return "missing"
    for label, lo, hi in BUCKETS:
        if age_days >= lo and (hi is None or age_days < hi):
            return label
    return "rotten (180d+)"


def emit_markdown(stats: list[FileStat], stale_days: int, today: date) -> str:
    bucket_counts: dict[str, int] = {label: 0 for label, _, _ in BUCKETS}
    bucket_counts["missing"] = 0
    for s in stats:
        bucket_counts[bucket_label(s.age_days)] += 1

    lines: list[str] = []
    lines.append(f"# pentaglyph freshness metrics — as of {today.isoformat()}")
    lines.append("")
    lines.append(f"Total durable docs scanned: **{len(stats)}**. Staleness threshold: ≥ **{stale_days}** days.")
    lines.append("")
    lines.append("## Age distribution")
    lines.append("")
    lines.append("| Bucket | Count | % |")
    lines.append("| --- | ---: | ---: |")
    for label, _, _ in BUCKETS:
        cnt = bucket_counts[label]
        pct = round(100.0 * cnt / len(stats), 1) if stats else 0.0
        lines.append(f"| {label} | {cnt} | {pct}% |")
    miss = bucket_counts["missing"]
    miss_pct = round(100.0 * miss / len(stats), 1) if stats else 0.0
    lines.append(f"| missing `last-reviewed` | {miss} | {miss_pct}% |")
    lines.append("")
    stale = [s for s in stats if s.age_days is not None and s.age_days >= stale_days]
    if stale:
        lines.append(f"## Stale files (age ≥ {stale_days} days)")
        lines.append("")
        lines.append("| File | last-reviewed | Age (days) |")
        lines.append("| --- | --- | ---: |")
        for s in sorted(stale, key=lambda x: -(x.age_days or 0)):
            lines.append(f"| `{s.path}` | {s.last_reviewed} | {s.age_days} |")
        lines.append("")
    missing_files = [s for s in stats if s.last_reviewed is None]
    if missing_files:
        lines.append("## Files missing `last-reviewed`")
        lines.append("")
        for s in missing_files:
            lines.append(f"- `{s.path}`")
        lines.append("")
    return "\n".join(lines)


def emit_json(stats: list[FileStat], stale_days: int, today: date) -> str:
    bucket_counts: dict[str, int] = {label: 0 for label, _, _ in BUCKETS}
    bucket_counts["missing"] = 0
    for s in stats:
        bucket_counts[bucket_label(s.age_days)] += 1
    return json.dumps(
        {
            "as_of": today.isoformat(),
            "stale_threshold_days": stale_days,
            "total_files": len(stats),
            "bucket_counts": bucket_counts,
            "files": [asdict(s) for s in stats],
        },
        indent=2,
        ensure_ascii=False,
    )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("docs_dir", type=Path)
    parser.add_argument("--format", choices=("markdown", "json"), default="markdown")
    parser.add_argument("--stale-days", type=int, default=90)
    parser.add_argument(
        "--today",
        type=date.fromisoformat,
        default=date.today(),
        help="Override 'today' (ISO 8601). Useful for deterministic CI.",
    )
    args = parser.parse_args(argv)
    docs_root = args.docs_dir.resolve()
    if not docs_root.exists():
        print(f"ERROR: {docs_root} does not exist", file=sys.stderr)
        return 1
    stats = collect(docs_root, args.today)
    if args.format == "json":
        print(emit_json(stats, args.stale_days, args.today))
    else:
        print(emit_markdown(stats, args.stale_days, args.today))
    return 0


if __name__ == "__main__":
    sys.exit(main())
