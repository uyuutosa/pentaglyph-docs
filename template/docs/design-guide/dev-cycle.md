---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
layer: 2
---

# Development cycle (Scrum Guide 2020) — pentaglyph design-guide

| Metadata | Value |
| --- | --- |
| Status | Stable |
| Layer | 2 (Process) |
| Canon | Schwaber & Sutherland — Scrum Guide 2020 |
| Binding date | 2026-05-14 |
| Related ADRs | [ADR-0001](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md), [ADR-0002](../arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md), [ADR-0003](../arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md), [ADR-0005](../arc42/09-decisions/0005-surface-implicit-process-layer.md) |

## 1. External canon (authoritative)

- **Primary**: Schwaber, K. & Sutherland, J. (2020). [The Scrum Guide (November 2020)](https://scrumguides.org/scrum-guide.html). The canonical definition. Updates every 2-4 years; this binding tracks the 2020 revision (current as of 2026-05-14).
- **Companion**: Schwaber, K. & Sutherland, J. (2017). [The Scrum Guide (November 2017)](https://scrumguides.org/revisions.html) — the previous revision, retained for projects on long-running 2017 contracts.

## 1.5. Surfaces implicit behaviour in WORKFLOW.md + Layer B directories

pentaglyph already enforces several Scrum artefacts without naming the canon:

- [`task-list/`](../task-list/) Layer B directory exists for "Sprint-scoped task breakdowns" — this is the Scrum **Sprint Backlog** artefact.
- [`impl-plans/`](../impl-plans/) "How we plan to implement X over the next N weeks" — implicit Sprint planning horizon.
- [`postmortems/`](../postmortems/) "Medium+ severity only" — implicit incident-review process (orthogonal to Sprint Retrospective but related).
- [`WORKFLOW.md`](../WORKFLOW.md) Lifecycle `Draft → Review → Done` — the Review gate is implicitly a Sprint Review-like checkpoint per artefact.

This binding does not change pentaglyph's behaviour. It names the canon that has been operating implicitly. Per [ADR-0005](../arc42/09-decisions/0005-surface-implicit-process-layer.md).

## 2. Why pentaglyph binds this (§9.1 four-axis evaluation)

| Axis | Verdict | Rationale |
| --- | --- | --- |
| Day-1 necessity | ✅ | Every project needs *some* cadence (Sprint / Kanban / continuous) from day 1; "no cadence" is itself a (poor) choice. |
| Switching cost | ⚠️ Medium | Switching cadence mid-flight is painful but not catastrophic. Boundary case for prescription. |
| External canon | ✅ | Scrum Guide 2020 — published by the framework authors, free, stable revision history. |
| Domain neutrality | ✅ | Scrum works for regulated / startup / B2B / OSS. (Embedded / hardware projects may prefer Kanban — see Override below.) |

Three ✅ + one ⚠️. **Bind as the default cadence** for the kit, with an explicit override path for Kanban / SAFe / LeSS / XP.

## 3. Artefact mapping

- **Layer B output directories** the Scrum events fill:
  - **Sprint Planning** output → [`task-list/YYYY-MM-DD_<sprint>.md`](../task-list/)
  - **Sprint Retrospective** output → uses [`templates/9_sprint-retro.md`](../templates/9_sprint-retro.md) (Phase 2.5 of self-architecture roadmap)
  - **Product Backlog Refinement** output → uses [`templates/10_refinement-pbi.md`](../templates/10_refinement-pbi.md)
- **Definition of Done** → [`design-guide/dod-dor.md`](./dod-dor.md) (separate binding)
- **No tool selection.** Whether you track Sprint Backlog in Jira / Linear / Azure DevOps Boards / GitHub Projects / paper is a Layer ③ Automation concern.

## 4. Lifecycle integration

- **Sprint cadence is project-specific.** This binding does not prescribe 1-week / 2-week / 4-week Sprints — pick what matches team / domain.
- **Sprint Goal** is a Layer ① artefact (typically tracked in your work-item system, not in `docs/`).
- **Increment** = the cumulative `Done` state of all Layer A artefacts at Sprint end; aligns with pentaglyph's `Done` lifecycle state.

## 5. Override path

Common alternatives, in order of frequency:

| Alternative | When | How to override |
| --- | --- | --- |
| **Kanban** (no Sprints, WIP limits) | Continuous-delivery teams, ops-heavy work | Replace this file with `dev-cycle.md` binding [Kanban Method](https://kanban.university/). Drop `templates/9_sprint-retro.md`; replace with continuous retros. |
| **SAFe / LeSS** | Multi-team coordination, regulated industries | Author `dev-cycle.md` binding the framework; keep this file as fallback for single-team subsets. |
| **XP (Extreme Programming)** | Engineering-discipline focus | Coexists with Scrum; supplement with [`tdd-workflow.md`](./tdd-workflow.md). |
| **Trunk-Based Development cadence** | Continuous deployment with feature flags | Replace [`version-control.md`](./version-control.md) Git Flow default; cadence becomes "merge to trunk daily". |

To override: author `<downstream>/docs/design-guide/dev-cycle.md` and update [`STRATEGY.md §9`](../STRATEGY.md) in the same PR.

## 6. References

- Schwaber, K. & Sutherland, J. [The Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)
- Schwaber, K. & Sutherland, J. [The Scrum Guide revisions history](https://scrumguides.org/revisions.html)
- Anderson, D. (2010). [Kanban: Successful Evolutionary Change](https://leanpub.com/kanban-condensed). (Override reference)
- Leffingwell, D. [SAFe (Scaled Agile Framework)](https://scaledagileframework.com/). (Override reference)
- [`_binding-a-new-process.md`](./_binding-a-new-process.md) — the meta-doc this file follows
