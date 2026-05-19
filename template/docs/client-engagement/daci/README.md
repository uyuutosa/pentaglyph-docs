---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
---

# `daci/` — in-flight decision workflows

This directory holds decisions **currently being made** using the **DACI** framework (Atlassian Team Playbook — <https://www.atlassian.com/team-playbook/plays/daci>). DACI is the *workflow* for arriving at a decision; MADR (in [`../decisions/`](../decisions/)) is the *artefact* that records the outcome.

## What DACI is

| Letter | Role | Meaning |
| --- | --- | --- |
| **D** | Driver | Owns moving the decision forward; gathers context, runs the meeting, drives to a call. |
| **A** | Approver | Has the final yes/no. Typically one person. |
| **C** | Contributor | Provides input, expertise, or impact assessment. Multiple. |
| **I** | Informed | Notified of the decision after it lands. Multiple. |

DACI's strength is making the *decision rights* explicit before discussion starts. Most decision dysfunction comes from ambiguity about who actually decides — DACI surfaces that immediately.

## When to use this directory

- The decision is **non-trivial**, **cross-functional**, and **has client visibility**.
- It is **in flight** — the Approver has not yet decided.
- A future MADR will record the *outcome*; this directory records the *process*.

## When NOT to use this directory

- Pure engineering-internal decisions (use [`../../arc42/09-decisions/`](../../arc42/09-decisions/) directly with MADR).
- Decisions that need no contributor input (just write the MADR in `../decisions/`).
- One-person calls inside the engagement lead's authority (record as a brief note in [`../reports/YYMMDD/weekly.md`](../reports/)).

## Lifecycle

1. **Open**: Driver creates `YYYY-MM-DD-<slug>.md` from [`../../templates/17_daci-decision.md`](../../templates/17_daci-decision.md) with D/A/C/I roles assigned and the question stated.
2. **Discussion**: Contributors add input as appended sections (timestamped).
3. **Decision**: Approver records the call in the final section with rationale.
4. **Archive**: file is **moved** to [`../decisions/`](../decisions/), renamed to its MADR-style title, reformatted from DACI workflow into MADR artefact (Status / Context / Decision / Consequences). The DACI roles map to MADR front-matter: Approver → `decided-by`, Contributors → `consulted`, Informed → `informed`.

The audit trail is preserved — git history shows the DACI discussion as the prior shape of the file.

## File naming

`YYYY-MM-DD-<kebab-slug>.md` (date is when DACI was *opened*, not closed).

## Cross-references

- [`../raid.md`](../raid.md) `D-NNN` rows reference both `daci/` (in-flight) and `decisions/` (archived).
- [`../reports/YYMMDD/heartbeat.md`](../reports/) narrates major in-flight decisions in prose.

## Related

- [`../README.md`](../README.md) — PEL overview
- [`../../templates/17_daci-decision.md`](../../templates/17_daci-decision.md) — DACI template
- Atlassian DACI play: <https://www.atlassian.com/team-playbook/plays/daci>
