---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
layer: 2
---

# BDD (Behaviour-Driven Development) — pentaglyph design-guide

| Metadata | Value |
| --- | --- |
| Status | Stable |
| Layer | 2 (Process) |
| Canon | Dan North (2003) + Gojko Adzic SbE (2011) |
| Binding date | 2026-05-14 |
| Related ADRs | [ADR-0001](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md), [ADR-0002](../arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md), [ADR-0003](../arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md), [ADR-0005](../arc42/09-decisions/0005-surface-implicit-process-layer.md) |

## 1. External canon (authoritative)

- **Primary**: North, D. (2003). [Introducing BDD](https://dannorth.net/introducing-bdd/). The canonical statement.
- **Companion**: Adzic, G. (2011). [Specification by Example](https://gojko.net/books/specification-by-example/). Defines executable examples as living documentation.
- **Grammar**: Fowler, M. [GivenWhenThen](https://martinfowler.com/bliki/GivenWhenThen.html). The Acceptance Criteria grammar used by pentaglyph templates.

## 1.5. Surfaces implicit behaviour in templates/2_prd.md + templates/4_use-case.md

pentaglyph has used G/W/T in artefacts since v0.1 without explicitly naming the canon:

- [`templates/2_prd.md`](../templates/2_prd.md) — the FR (Functional Requirement) table already requires an "Acceptance Criteria (Given/When/Then)" column.
- [`templates/4_use-case.md`](../templates/4_use-case.md) §7 — Acceptance Criteria already uses G/W/T.

This binding makes the canon explicit and gives downstream projects a citable source for the format. Per [ADR-0005](../arc42/09-decisions/0005-surface-implicit-process-layer.md), this is **surfacing, not inventing**.

## 2. Why pentaglyph binds this (§9.1 four-axis evaluation)

| Axis | Verdict | Rationale |
| --- | --- | --- |
| Day-1 necessity | ✅ | Every project producing PRDs / use cases needs an Acceptance Criteria format from day 1. |
| Switching cost | ✅ | Changing the AC format after multiple FRs are written requires rewriting every FR row across all PRDs. |
| External canon | ✅ | North 2003 + Adzic 2011 — published, citable, stable for 20+ years. |
| Domain neutrality | ✅ | G/W/T works for regulated / startup / AI-first / B2B SaaS / OSS / enterprise IT. |

All four pass. **Bind eligible.**

## 3. Artefact mapping

- **Layer ① templates that consume this binding**:
  - [`templates/2_prd.md`](../templates/2_prd.md) — FR table column "Acceptance Criteria (Given/When/Then)"
  - [`templates/4_use-case.md`](../templates/4_use-case.md) — §7 Acceptance Criteria
- **No tool selection.** Whether you implement the G/W/T as `.feature` files (Cucumber / Behat / SpecFlow), step definitions (pytest-bdd, JBehave), or plain-text Acceptance Criteria reviewed manually is a Layer ③ Automation concern, decided per-project. This binding fixes only the **prose grammar**.

## 4. Lifecycle integration

- A PRD's FR row is `Draft` until the G/W/T is reviewable in plain prose by a non-engineer (PO / SME).
- Acceptance Criteria are reviewed in the **same PR** as the FR they belong to (the "code change → doc change in same PR" rule in [`WORKFLOW.md`](../WORKFLOW.md) applies).
- When code lands implementing an FR, the FR's Status moves to `Implemented`, tracked in the corresponding [`detailed-design/<module>.md`](../detailed-design/) §"Functional Requirements implemented" section (downstream projects).

## 5. Override path

A downstream project may replace G/W/T with an alternative AC grammar (e.g. AAA "Arrange-Act-Assert", scenario tables, Cockburn detailed use-case flows). To override:

1. Author `<your-project>/docs/design-guide/bdd-workflow.md` that supersedes this file (cite the kit version).
2. Update local copies of `templates/2_prd.md` and `templates/4_use-case.md` AC sections.
3. Cite [ADR-0001](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md) §5 "Override paths" in the change rationale.

## 6. References

- North, D. (2003). [Introducing BDD](https://dannorth.net/introducing-bdd/)
- Adzic, G. (2011). [Specification by Example](https://gojko.net/books/specification-by-example/) (Manning)
- Fowler, M. [GivenWhenThen](https://martinfowler.com/bliki/GivenWhenThen.html)
- Wynne, M. & Hellesøy, A. [The Cucumber Book, 2nd ed.](https://pragprog.com/titles/hwcuc2/the-cucumber-book-second-edition/) (Pragmatic, 2017)
- Smart, J. [BDD in Action, 2nd ed.](https://www.manning.com/books/bdd-in-action-second-edition) (Manning, 2023)
- [`_binding-a-new-process.md`](./_binding-a-new-process.md) — the meta-doc this file follows
