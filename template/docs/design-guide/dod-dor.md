---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
layer: 2
---

# Definition of Done (DoD) & Definition of Ready (DoR) — pentaglyph design-guide

| Metadata | Value |
| --- | --- |
| Status | Stable |
| Layer | 2 (Process) |
| Canon | Scrum Guide 2020 (DoD) + Scrum.org DoR guidance |
| Binding date | 2026-05-14 |
| Related ADRs | [ADR-0001](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md), [ADR-0002](../arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md), [ADR-0003](../arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md), [ADR-0005](../arc42/09-decisions/0005-surface-implicit-process-layer.md) |

## 1. External canon (authoritative)

- **Primary (DoD)**: [Scrum Guide 2020 §Increment + §Definition of Done](https://scrumguides.org/scrum-guide.html#definition-of-done). DoD is defined inside the Scrum Guide; not a separate spec.
- **Primary (DoR)**: [Scrum.org DoR resource page](https://www.scrum.org/resources/blog/walking-through-definition-ready). DoR is **not** part of the Scrum Guide (it is a community practice); pentaglyph binds the Scrum.org canonical guidance.
- **Companion**: Schwaber, K. (2013). [Software in 30 Days](https://www.scrum.org/resources/software-30-days-book). Practical DoD examples.

## 1.5. Surfaces implicit behaviour in WORKFLOW.md lifecycle states

pentaglyph's [`WORKFLOW.md §4`](../WORKFLOW.md) lifecycle `Draft → Review → Done → Superseded` has implicit DoD/DoR gates:

- **Draft → Review** requires implicit readiness (the artefact is reviewable). This is **Definition of Ready** for the Review state.
- **Review → Done** requires implicit completeness (the artefact passes review). This is **Definition of Done** for the Done state.
- ADRs `Proposed → Accepted` has its own DoD-equivalent (Y-statement filled, 3+ Drivers, 2+ Options, Consequences in ±/0 form — see [`arc42/09-decisions/README.md`](../arc42/09-decisions/README.md)).

This binding makes those implicit gates explicit and aligns them with the Scrum / Scrum.org canon, per [ADR-0005](../arc42/09-decisions/0005-surface-implicit-process-layer.md).

## 2. Why pentaglyph binds this (§9.1 four-axis evaluation)

| Axis | Verdict | Rationale |
| --- | --- | --- |
| Day-1 necessity | ✅ | A team that ships anything needs a DoD by day 1. Without it, "Done" is subjective. |
| Switching cost | ✅ | Loose DoD lets defective work merge; tightening retroactively requires re-checking every "Done" artefact. |
| External canon | ✅ DoD / ⚠️ DoR | Scrum Guide owns DoD; DoR is community canon (Scrum.org) — slightly weaker but still citable. |
| Domain neutrality | ✅ | DoD/DoR concepts apply to code, docs, design, ops alike. |

All four pass (with DoR's external-canon caveat). **Bind both.**

## 3. Artefact mapping

- **DoD checklist template**: [`templates/11_dod-checklist.md`](../templates/11_dod-checklist.md) (Phase 2.5 of self-architecture roadmap). Per-artefact-type DoD (PRD-DoD, Module-DoD, ADR-DoD).
- **DoR checklist** is embedded in [`templates/10_refinement-pbi.md`](../templates/10_refinement-pbi.md) §"DoR".
- **WORKFLOW.md state transitions** reference this binding for the Draft → Review → Done gates.

**No tool selection.** Whether you enforce DoD via PR checklist, CI gate, or PR-template radio buttons is a Layer ③ Automation concern.

## 4. Lifecycle integration

- **DoR is checked at refinement** (Layer ② Process event, see [`dev-cycle.md`](./dev-cycle.md) Refinement).
- **DoD is checked at Review → Done** (every PR that moves an artefact to `Done`).
- **DoD updates**: the team's DoD is itself a Layer A durable artefact (lives in `<downstream>/docs/design-guide/dod-checklist.md`), versioned, and tightened over time per Scrum retrospective output.

## 5. Override path

Common alternatives:

| Alternative | When | How to override |
| --- | --- | --- |
| **No DoR** | Trunk-based / continuous-discovery teams that prefer pulling work to refinement | Drop `templates/10_refinement-pbi.md`. Keep DoD only. |
| **Multi-level DoD** (per-environment) | Regulated industries needing separate dev / stage / prod DoDs | Author `dod-checklist-<env>.md` per environment; cross-link from this file. |
| **Acceptance Test-Driven DoD** | XP teams with strong test discipline | Replace checklist with passing acceptance tests as the only DoD criterion. Bind [`tdd-workflow.md`](./tdd-workflow.md) Strong form. |

To override: author `<downstream>/docs/design-guide/dod-dor.md` and update Layer ① templates 10 / 11 accordingly.

## 6. References

- [Scrum Guide 2020 — Definition of Done](https://scrumguides.org/scrum-guide.html#definition-of-done)
- Scrum.org. [Walking Through the Definition of Ready](https://www.scrum.org/resources/blog/walking-through-definition-ready)
- Scrum.org. [What Is a Definition of Done?](https://www.scrum.org/resources/what-definition-done)
- Sutherland, J. (2014). [Scrum: The Art of Doing Twice the Work in Half the Time](https://www.scrumatscale.com/scrum-art-doing-twice-work-half-time/). Chapter on DoD.
- [`_binding-a-new-process.md`](./_binding-a-new-process.md) — the meta-doc this file follows
