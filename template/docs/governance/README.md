---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
layer: 4
---

# governance/ — Layer ④ Governance

> **Self-architecture role**: this directory is **Layer ④ Governance** in pentaglyph's [self-architecture](../arc42/05-building-blocks/pentaglyph-self-architecture.md). It defines **who decides, accepts, and overrides** — not **what** is decided (decisions are individual ADRs under [`../arc42/09-decisions/`](../arc42/09-decisions/)). See [ADR-0001](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md), [ADR-0004](../arc42/09-decisions/0004-layer-separation-contracts.md), [ADR-0008](../arc42/09-decisions/0008-governance-layer-contract.md).

## Files in this directory

| File | Purpose |
| --- | --- |
| [`raci.md`](./raci.md) | Per-artefact-type Responsible / Accountable / Consulted / Informed matrix |
| [`adr-accept-protocol.md`](./adr-accept-protocol.md) | MADR `Proposed → Accepted` transition conditions and review process |
| [`override-justification.md`](./override-justification.md) | Format and authorisation policy for downstream overrides of kit defaults |
| [`contributing.md`](./contributing.md) | Upstream contribution flow (PR procedure, subtree push, regulatory carve-outs) |

## What does NOT belong here

- **Specific decisions.** Decisions are individual ADRs under `arc42/09-decisions/`. This directory says *how* a decision is reviewed and accepted, not *what* the decision is.
- **Process bindings.** Operational processes (Scrum / BDD / TDD / etc.) live in `design-guide/` as Layer ② Process. This directory says *who has authority* over those processes' adoption/override.
- **Code or automation.** Layer ③ Automation lives in `cli/` / `.claude/` / `scripts/docs/`.
- **Metrics dashboards.** Layer ⑤ Measurement (optional) lives in `metrics/`.

## Layer ④ dependency direction

Per [ADR-0004](../arc42/09-decisions/0004-layer-separation-contracts.md), Layer ④ Governance:

- **Reads** from layers ⓪ ① ② ③ (any artefact's status, ownership, type).
- **Writes** only into Layer ④ (this directory) — does not mutate any ADR, template, or design-guide.
- **Decisions** (individual ADRs) are still Layer ① Artefacts; Layer ④ only defines the *process* through which they are accepted.

## When to update files in this directory

- **`raci.md`**: a new artefact type is introduced (e.g. new template `12_*.md`).
- **`adr-accept-protocol.md`**: the bar for `Accepted` shifts (e.g. regulated industries adopt stricter review requirements).
- **`override-justification.md`**: a new override category emerges that the existing format doesn't capture.
- **`contributing.md`**: the upstream contribution flow changes (new git host, new policy).

Every update to a file in this directory should be a Layer ④ governance decision recorded via [`../templates/12_governance-decision.md`](../templates/12_governance-decision.md) (Phase 4 of the [self-architecture roadmap](../impl-plans/2026-05-14_pentaglyph-self-architecture-roadmap.md)).

## How downstream projects override

Downstream may replace any file in this directory by writing a same-named file in `<downstream>/docs/governance/`. The override must include a one-paragraph rationale in `<downstream>/docs/design-guide/governance-override.md` citing [ADR-0001](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md) §5 "Override paths". Common overrides:

- **Regulated industries** (medical / financial / public-sector): replace `adr-accept-protocol.md` with stricter reviewer requirements.
- **Multi-stakeholder consortia**: replace `raci.md` with multi-party authority.
- **OSS projects with formal RFC processes**: replace `contributing.md` with the project's RFC flow (e.g. Rust RFCs, Python PEPs).

## Cross-references

- [Self-architecture overview](../arc42/05-building-blocks/pentaglyph-self-architecture.md)
- [STRATEGY.md §11 Layer ④ Governance](../STRATEGY.md)
- [ADR-0008 Governance layer contract](../arc42/09-decisions/0008-governance-layer-contract.md)
- [Templates §12 Governance decision template](../templates/12_governance-decision.md)
