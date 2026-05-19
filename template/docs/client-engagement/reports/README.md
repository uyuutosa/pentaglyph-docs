---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
---

# `reports/` — weekly + cyclical engagement reports

This directory holds the dated, append-only progress reports for the engagement. Two flavours coexist:

| File | Format | Cadence | Template |
| --- | --- | --- | --- |
| `YYMMDD/weekly.md` | Atlassian "Priorities → Progress → Problems → Next" | Weekly | [`../../templates/15_weekly-update.md`](../../templates/15_weekly-update.md) |
| `YYMMDD/heartbeat.md` | Basecamp Heartbeat + Amazon 6-pager prose discipline | Every cycle (typically 4-6 weeks) | [`../../templates/16_heartbeat.md`](../../templates/16_heartbeat.md) |
| `narratives/YYYY-MM-DD_<topic>.md` | Amazon 6-pager (strategic memo) | Ad hoc | [`../../templates/16_heartbeat.md`](../../templates/16_heartbeat.md) (extended) |

## Why both weekly and Heartbeat

- **`weekly.md`** is short, scan-able, mechanical. It exists so the client always knows *what happened this week* without reading prose. Atlassian's 4-block (priorities / progress / problems / next) is the de-facto AI-friendly format — every LLM produces it well zero-shot.
- **`heartbeat.md`** is narrative, prose-discipline, written at cycle boundaries. It exists so the client gets *one substantial read per cycle* that ties the weeks together, celebrates progress, names problems honestly, and points at what's next. Basecamp Heartbeat + Amazon 6-pager prose are the modern de-facto for this slot.

Each `YYMMDD/` folder typically contains a `weekly.md`. Add a `heartbeat.md` at cycle boundaries. Add `kickoff.md` at cycle starts (see [`../kickoffs/`](../kickoffs/)).

## Directory layout

```
reports/
├── README.md                          # this file
├── YYMMDD/                            # one folder per report date
│   ├── weekly.md                      # Atlassian 4-block
│   ├── heartbeat.md                   # at cycle boundary only
│   └── kickoff.md                     # optional, at cycle start
└── narratives/                        # ad-hoc 6-pager memos (strategic)
    └── YYYY-MM-DD_<topic>.md
```

## Naming

- Weekly folder: `YYMMDD/` (6-digit, the report's *publish date* — typically the weekend the report is drafted).
- Narrative file: `YYYY-MM-DD_<kebab-topic>.md` (8-digit date prefix because narratives are less frequent and the 4-digit year aids long-term browsing).

## Lifecycle

Reports are **volatile** — they are never edited after publication. Mistakes are corrected in the *next* report with a one-line "correction" note, not by editing the prior one. This preserves the audit trail.

## Cross-references

- Items mentioned as "in progress" in a `weekly.md` must appear in [`../NOW-NEXT-LATER.md`](../NOW-NEXT-LATER.md) `Now` bucket.
- Decisions referenced in a `heartbeat.md` must link to [`../decisions/`](../decisions/) or [`../daci/`](../daci/).
- Risks mentioned must have a `raid.md` entry.

## Related

- [`../README.md` §The eight bound primitives](../README.md) — where reports sit in PEL
- [`../OPERATING-AGREEMENT.md` §1](../OPERATING-AGREEMENT.md) — reporting cadence
- [`../../WORKFLOW.md` §1.5](../../WORKFLOW.md) — PEL decision tree
