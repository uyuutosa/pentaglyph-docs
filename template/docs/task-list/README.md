---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-04
---

# task-list — sprint-scoped task breakdowns

> **Layer B (volatile, dated, append-only).** The ticket system (GitHub Issues / Jira / ADO Boards) is the source of truth for individual tasks; this directory holds *snapshots* of sprint plans for reference.

## File naming

`YYYY-MM-DD_<sprint-or-iteration>.md`

Examples:

- `2026-05-04_sprint-23.md`
- `2026-05-11_release-1.4-cut.md`

## What goes here vs. in the ticket system

| Lives here                                                  | Lives in ticket system                                   |
| ----------------------------------------------------------- | -------------------------------------------------------- |
| Plan-time snapshot (what we agreed at sprint planning)      | Live state (Active / Done / Blocked) of each ticket      |
| Cross-ticket dependency narrative                           | Per-ticket detail (assignee, estimate, comments)         |
| "Why this scope, not the alternatives" reasoning            | Daily progress comments                                  |

## Tier convention (recommended for handoff snapshots)

When the snapshot is a handoff (pre-launch backlog, AI-session handoff, post-incident remediation list), group tasks into four tiers. The tier expresses *what the task is blocking*, not how complex it is — a 5-minute regulatory fix can be Tier A if the launch depends on it.

| Tier   | Meaning                                                  | Typical example                                                     |
| ------ | -------------------------------------------------------- | ------------------------------------------------------------------- |
| **A**  | Blocks any code start. Decide before week 1.             | Pick framework family; lock public Port shape; resolve naming clash |
| **B**  | Blocks the next launch milestone. Decide within weeks.   | Regulatory ADR draft; vendor selection; counsel engagement          |
| **C**  | Blocks a later phase. Can defer.                         | Phase-2 mandate-DSL extension; alternative-broker adapter           |
| **D**  | Already owned / scheduled. Tracked here for visibility.  | Tickets already in flight                                           |

Each task entry should carry, at minimum:

- **One-line statement** of the task itself
- **Source-of-decision link** — the ADR / report / counsel brief / external dependency that explains why this is needed
- **Concrete next step** — "decide X" / "interview Y" / "wait on Z" — not vague verbs
- **Owner** — name or role; `TBD` is acceptable but flag it

Cross-link, don't duplicate: if a task is fully described in an ADR's `§Follow-ups`, link there instead of restating the body.

For lifecycle, see [`../WORKFLOW.md`](../WORKFLOW.md).
