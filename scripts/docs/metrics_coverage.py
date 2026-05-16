#!/usr/bin/env python3
"""arc42 / detailed-design / use-cases existence + substantive-content coverage.

Walks the target docs/ tree and reports, per arc42 section and per detailed-design
sub-tree, how many files exist and how many have *substantive* content (more than a
small placeholder threshold of non-front-matter / non-heading characters).

The script is part of Layer ③ Automation per ADR-0007 of the pentaglyph kit. Per
the layer contract it reads Layer ① Artefacts and writes only to stdout
(callers redirect to Layer ⑤ Measurement files under metrics/).

Usage:
    metrics_coverage.py <docs_dir> [--format=markdown|json] [--threshold=200]

The substantive-content threshold defaults to 200 characters after stripping
YAML front-matter and Markdown heading lines. A file below threshold is
considered a "stub" (placeholder rather than authored content).
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import asdict, dataclass
from pathlib import Path

# arc42 sections we measure for coverage. Each is a `(directory_glob, label)` pair.
ARC42_SECTIONS: tuple[tuple[str, str], ...] = (
    ("arc42/01-introduction-and-goals", "§1 Introduction and goals"),
    ("arc42/02-architecture-constraints", "§2 Architecture constraints"),
    ("arc42/03-context-and-scope", "§3 Context and scope"),
    ("arc42/04-solution-strategy", "§4 Solution strategy"),
    ("arc42/05-building-blocks", "§5 Building block view"),
    ("arc42/06-runtime", "§6 Runtime view"),
    ("arc42/07-deployment", "§7 Deployment view"),
    ("arc42/08-crosscutting", "§8 Crosscutting"),
    ("arc42/09-decisions", "§9 Decisions (ADRs)"),
    ("arc42/10-quality", "§10 Quality"),
    ("arc42/11-risks", "§11 Risks"),
    ("arc42/12-glossary", "§12 Glossary"),
)

OTHER_TREES: tuple[tuple[str, str], ...] = (
    ("detailed-design", "Detailed Design (Module specs)"),
    ("design-guide", "Design Guide (Layer ② Process)"),
    ("governance", "Governance (Layer ④)"),
    ("user-manual", "User Manual (Diátaxis)"),
    ("templates", "Templates (Layer ① shape definitions)"),
    ("arc42/03-context-and-scope/use-cases", "Use Cases"),
    ("arc42/03-context-and-scope/prds", "PRDs"),
    ("service-design", "Service Design (TiSDD)"),
)

FRONT_MATTER_RE = re.compile(r"^---\n.*?\n---\n", re.DOTALL)
HEADING_LINE_RE = re.compile(r"^#{1,6}\s.*$", re.MULTILINE)


@dataclass
class SectionStats:
    label: str
    path: str
    file_count: int
    substantive_count: int
    stub_count: int
    missing: bool

    @property
    def coverage_pct(self) -> float:
        if self.file_count == 0:
            return 0.0
        return round(100.0 * self.substantive_count / self.file_count, 1)


def strip_meta(body: str) -> str:
    """Remove YAML front-matter and Markdown heading lines.

    Leaves the substantive body text that an author would have written.
    """
    body = FRONT_MATTER_RE.sub("", body, count=1)
    body = HEADING_LINE_RE.sub("", body)
    return body.strip()


def count_substantive(directory: Path, threshold: int) -> tuple[int, int]:
    """Return (file_count, substantive_count) for .md files in `directory`.

    Recurses into subdirectories. README.md files count as files (they are
    legitimate index documents) but are subject to the same threshold.
    """
    file_count = 0
    substantive_count = 0
    for md in directory.rglob("*.md"):
        file_count += 1
        try:
            body = md.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            continue
        if len(strip_meta(body)) >= threshold:
            substantive_count += 1
    return file_count, substantive_count


def collect(docs_root: Path, threshold: int) -> list[SectionStats]:
    stats: list[SectionStats] = []
    for rel_path, label in ARC42_SECTIONS + OTHER_TREES:
        target = docs_root / rel_path
        if not target.exists():
            stats.append(
                SectionStats(
                    label=label,
                    path=rel_path,
                    file_count=0,
                    substantive_count=0,
                    stub_count=0,
                    missing=True,
                )
            )
            continue
        file_count, substantive_count = count_substantive(target, threshold)
        stats.append(
            SectionStats(
                label=label,
                path=rel_path,
                file_count=file_count,
                substantive_count=substantive_count,
                stub_count=file_count - substantive_count,
                missing=False,
            )
        )
    return stats


def emit_markdown(stats: list[SectionStats], docs_root: Path, threshold: int) -> str:
    lines: list[str] = []
    lines.append(f"# pentaglyph coverage metrics — `{docs_root}`")
    lines.append("")
    lines.append(f"Substantive threshold: ≥ **{threshold}** chars after stripping YAML front-matter and Markdown heading lines.")
    lines.append("")
    lines.append("| Section | Path | Files | Substantive | Stub | Coverage % |")
    lines.append("| --- | --- | ---: | ---: | ---: | ---: |")
    for s in stats:
        if s.missing:
            lines.append(f"| {s.label} | `{s.path}` | — | — | — | (missing) |")
        else:
            lines.append(
                f"| {s.label} | `{s.path}` | {s.file_count} | {s.substantive_count} | {s.stub_count} | {s.coverage_pct}% |"
            )
    lines.append("")
    total_files = sum(s.file_count for s in stats if not s.missing)
    total_subst = sum(s.substantive_count for s in stats if not s.missing)
    overall_pct = round(100.0 * total_subst / total_files, 1) if total_files else 0.0
    lines.append(
        f"**Overall**: {total_subst}/{total_files} substantive ({overall_pct}%). "
        f"Missing sections: {sum(1 for s in stats if s.missing)}."
    )
    return "\n".join(lines)


def emit_json(stats: list[SectionStats], docs_root: Path, threshold: int) -> str:
    return json.dumps(
        {
            "docs_root": str(docs_root),
            "threshold_chars": threshold,
            "sections": [asdict(s) | {"coverage_pct": s.coverage_pct} for s in stats],
            "summary": {
                "total_files": sum(s.file_count for s in stats if not s.missing),
                "total_substantive": sum(s.substantive_count for s in stats if not s.missing),
                "missing_sections": sum(1 for s in stats if s.missing),
            },
        },
        indent=2,
        ensure_ascii=False,
    )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("docs_dir", type=Path, help="Path to docs/ root (or template/docs/ for kit dogfooding)")
    parser.add_argument(
        "--format",
        choices=("markdown", "json"),
        default="markdown",
        help="Output format (default: markdown)",
    )
    parser.add_argument(
        "--threshold",
        type=int,
        default=200,
        help="Substantive-content character threshold (default: 200)",
    )
    args = parser.parse_args(argv)
    docs_root = args.docs_dir.resolve()
    if not docs_root.exists():
        print(f"ERROR: {docs_root} does not exist", file=sys.stderr)
        return 1
    stats = collect(docs_root, args.threshold)
    if args.format == "json":
        print(emit_json(stats, docs_root, args.threshold))
    else:
        print(emit_markdown(stats, docs_root, args.threshold))
    return 0


if __name__ == "__main__":
    sys.exit(main())
