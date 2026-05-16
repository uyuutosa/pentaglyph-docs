#!/usr/bin/env python3
"""ADR Status distribution + monthly throughput.

Walks `arc42/09-decisions/*.md` (excluding README.md), parses the Status from each
ADR's metadata table or YAML front-matter, and reports:

- Status distribution (Proposed / Accepted / Rejected / Superseded by NNNN / Deprecated).
- Monthly throughput (count per YYYY-MM from the Date field).
- Optionally: list of stale Proposed ADRs (in Proposed for > N days).

The script is part of Layer ③ Automation per ADR-0007 of the pentaglyph kit. Per
the layer contract it reads Layer ① Artefacts (ADRs are Layer ①) and writes only
to stdout.

Usage:
    metrics_adr.py <docs_dir> [--format=markdown|json] [--proposed-stale-days=30]
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from dataclasses import asdict, dataclass
from datetime import date
from pathlib import Path

FRONT_MATTER_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)
# Pull Status from a Metadata table row: `| Status | <value> |` (with optional `**` for bolding)
STATUS_TABLE_RE = re.compile(r"^\|\s*Status\s*\|\s*([^|]+?)\s*\|", re.MULTILINE)
# Pull Date row: `| Date | YYYY-MM-DD |`
DATE_TABLE_RE = re.compile(r"^\|\s*Date\s*\|\s*(\d{4}-\d{2}-\d{2})\s*\|", re.MULTILINE)
# Status from YAML front-matter
STATUS_FM_RE = re.compile(r"^status:\s*(\S+)", re.MULTILINE)

# Canonical statuses we care about. Free-form text after "Superseded by" or
# "Superseded by ADR-XXXX" all normalises to "Superseded".
CANONICAL_STATUSES: tuple[str, ...] = (
    "Proposed",
    "Accepted",
    "Rejected",
    "Superseded",
    "Deprecated",
    "Unknown",
)


@dataclass
class AdrStat:
    id: str
    title: str
    status: str
    date: str | None
    path: str


def normalise_status(raw: str | None) -> str:
    if not raw:
        return "Unknown"
    raw = raw.strip().strip("*").strip()
    # Strip MADR formatting like "**Proposed**" / "Superseded by ADR-0001" / "Rejected"
    if raw.lower().startswith("superseded"):
        return "Superseded"
    for canon in CANONICAL_STATUSES:
        if raw.lower().startswith(canon.lower()):
            return canon
    return "Unknown"


def parse_adr(md: Path) -> AdrStat:
    text = md.read_text(encoding="utf-8")
    # Title: first `# ADR-NNNN: <title>` header
    title_match = re.search(r"^# (ADR-\d+:.*)$", text, re.MULTILINE)
    title = title_match.group(1) if title_match else md.stem
    # Status: prefer metadata-table row over front-matter (more authoritative in MADR strict)
    status_match = STATUS_TABLE_RE.search(text)
    if not status_match:
        status_match = STATUS_FM_RE.search(text)
    status = normalise_status(status_match.group(1) if status_match else None)
    # Date: from metadata table
    date_match = DATE_TABLE_RE.search(text)
    iso_date = date_match.group(1) if date_match else None
    return AdrStat(
        id=md.stem.split("-")[0],
        title=title,
        status=status,
        date=iso_date,
        path=str(md.name),
    )


def collect(adr_dir: Path) -> list[AdrStat]:
    if not adr_dir.exists():
        return []
    stats: list[AdrStat] = []
    for md in sorted(adr_dir.glob("*.md")):
        if md.name in {"README.md", "README-pentaglyph.md"}:
            continue
        try:
            stats.append(parse_adr(md))
        except (OSError, UnicodeDecodeError):
            continue
    return stats


def status_distribution(stats: list[AdrStat]) -> dict[str, int]:
    dist = Counter(s.status for s in stats)
    # Force canonical-status ordering, fill zeros
    return {status: dist.get(status, 0) for status in CANONICAL_STATUSES}


def monthly_throughput(stats: list[AdrStat]) -> dict[str, int]:
    months: Counter[str] = Counter()
    for s in stats:
        if s.date:
            months[s.date[:7]] += 1
    return dict(sorted(months.items()))


def stale_proposed(stats: list[AdrStat], today: date, threshold_days: int) -> list[AdrStat]:
    stale: list[AdrStat] = []
    for s in stats:
        if s.status != "Proposed" or not s.date:
            continue
        try:
            d = date.fromisoformat(s.date)
        except ValueError:
            continue
        if (today - d).days >= threshold_days:
            stale.append(s)
    return stale


def emit_markdown(
    stats: list[AdrStat],
    today: date,
    proposed_stale_days: int,
) -> str:
    lines: list[str] = []
    lines.append(f"# pentaglyph ADR metrics — as of {today.isoformat()}")
    lines.append("")
    lines.append(f"Total ADRs: **{len(stats)}**.")
    lines.append("")
    lines.append("## Status distribution")
    lines.append("")
    lines.append("| Status | Count | % |")
    lines.append("| --- | ---: | ---: |")
    dist = status_distribution(stats)
    for status, count in dist.items():
        pct = round(100.0 * count / len(stats), 1) if stats else 0.0
        lines.append(f"| {status} | {count} | {pct}% |")
    lines.append("")
    lines.append("## Monthly throughput (by Date field)")
    lines.append("")
    monthly = monthly_throughput(stats)
    if monthly:
        lines.append("| Month | ADRs created |")
        lines.append("| --- | ---: |")
        for month, count in monthly.items():
            lines.append(f"| {month} | {count} |")
    else:
        lines.append("(no ADRs have parseable Date fields)")
    lines.append("")
    stale = stale_proposed(stats, today, proposed_stale_days)
    if stale:
        lines.append(f"## Stale Proposed ADRs (in Proposed for ≥ {proposed_stale_days} days)")
        lines.append("")
        lines.append("Per [`governance/adr-accept-protocol.md`](../governance/adr-accept-protocol.md): indefinite Proposed is forbidden. Acceptor should accept, reject, or deprecate within the threshold.")
        lines.append("")
        lines.append("| ADR | Title | Date | Path |")
        lines.append("| --- | --- | --- | --- |")
        for s in stale:
            lines.append(f"| {s.id} | {s.title} | {s.date} | `{s.path}` |")
        lines.append("")
    return "\n".join(lines)


def emit_json(
    stats: list[AdrStat],
    today: date,
    proposed_stale_days: int,
) -> str:
    return json.dumps(
        {
            "as_of": today.isoformat(),
            "total_adrs": len(stats),
            "status_distribution": status_distribution(stats),
            "monthly_throughput": monthly_throughput(stats),
            "stale_proposed_threshold_days": proposed_stale_days,
            "stale_proposed_adrs": [asdict(s) for s in stale_proposed(stats, today, proposed_stale_days)],
            "all_adrs": [asdict(s) for s in stats],
        },
        indent=2,
        ensure_ascii=False,
    )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("docs_dir", type=Path)
    parser.add_argument("--format", choices=("markdown", "json"), default="markdown")
    parser.add_argument(
        "--proposed-stale-days",
        type=int,
        default=30,
        help="Threshold for flagging stale Proposed ADRs (default: 30)",
    )
    parser.add_argument("--today", type=date.fromisoformat, default=date.today())
    args = parser.parse_args(argv)
    docs_root = args.docs_dir.resolve()
    if not docs_root.exists():
        print(f"ERROR: {docs_root} does not exist", file=sys.stderr)
        return 1
    adr_dir = docs_root / "arc42" / "09-decisions"
    stats = collect(adr_dir)
    if args.format == "json":
        print(emit_json(stats, args.today, args.proposed_stale_days))
    else:
        print(emit_markdown(stats, args.today, args.proposed_stale_days))
    return 0


if __name__ == "__main__":
    sys.exit(main())
