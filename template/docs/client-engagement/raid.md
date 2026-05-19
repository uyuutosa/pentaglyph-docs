---
status: Living
owner: <placeholder>
last-reviewed: <YYYY-MM-DD>
engagement: <client-name>
---

# RAID Log — `<client-name>`

> Single living table. Authored using the **RAID** pattern (Risk / Assumption / Issue / Decision — <https://asana.com/resources/raid-log>, <https://thedigitalprojectmanager.com/project-management/raid-log/>). The de-facto modern name for the "open-items log" / "question log" / "issues log" that consulting and project-management work has used in various forms since the 1990s.

> **Triage cadence**: weekly, owned by the engagement lead ([`OPERATING-AGREEMENT.md` §1](./OPERATING-AGREEMENT.md)).

> **State transitions**: Open → Mitigated / Resolved / Accepted → Closed. Edit in place; do not delete rows. When an entry closes, set its state and `closed` date — keep the history.

> **Class definitions**:
> - **R** — Risk: something that *might* happen and would hurt if it did
> - **A** — Assumption: something we're betting is true; if wrong, blast radius would be wide
> - **I** — Issue: something that *has* happened (or is happening) and needs response now
> - **D** — Decision: a recorded decision (cross-links to [`decisions/`](./decisions/) for the MADR / DACI artefact)

> **Companion to [`questions/`](./questions/)**: PEL splits open client questions into two homes — the *questions* log (verbose, one file per Q, used when a question needs a discussion) and `raid.md` (terse, single table, used when a question is sharp enough for one-line tracking). Promote `questions/Q-NNN.md` to a `raid.md` row when it becomes triage-able.

---

## Open

| ID | Class | Opened | Owner | Summary | Severity | Action / next | Linked |
| --- | --- | --- | --- | --- | --- | --- | --- |
| <R-001> | R | <YYYY-MM-DD> | <owner> | <one-line> | High / Med / Low | <next action> | [`daci/...`](./daci/) |
| <A-001> | A | <YYYY-MM-DD> | <owner> | <one-line> | <sev> | <next action> | — |
| <I-001> | I | <YYYY-MM-DD> | <owner> | <one-line> | <sev> | <next action> | [`reports/YYMMDD/...`](./reports/) |
| <D-001> | D | <YYYY-MM-DD> | <owner> | <one-line> | — | Recorded | [`decisions/...`](./decisions/) |

## Closed

> Move closed entries here. Keep them for the duration of the engagement.

| ID | Class | Opened | Closed | Owner | Summary | Outcome | Linked |
| --- | --- | --- | --- | --- | --- | --- | --- |
| — | — | — | — | — | — | — | — |

## ID numbering

Each class has its own numeric sequence: `R-001`, `R-002`, …; `A-001`, `A-002`, …; etc. IDs are immutable — never reused, never renumbered.

## Revision history

| Date | Change | Author |
| --- | --- | --- |
| <YYYY-MM-DD> | Initial table | <author> |
