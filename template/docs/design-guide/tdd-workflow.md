---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
layer: 2
---

# TDD (Test-Driven Development) — pentaglyph design-guide

| Metadata | Value |
| --- | --- |
| Status | Stable |
| Layer | 2 (Process) |
| Canon | Beck (2002) + Fowler |
| Binding date | 2026-05-14 |
| Related ADRs | [ADR-0001](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md), [ADR-0002](../arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md), [ADR-0003](../arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md), [ADR-0005](../arc42/09-decisions/0005-surface-implicit-process-layer.md) |

## 1. External canon (authoritative)

- **Primary**: Beck, K. (2002). [Test-Driven Development by Example](https://www.oreilly.com/library/view/test-driven-development/0321146530/). Addison-Wesley. The canonical book defining the Red-Green-Refactor cycle.
- **Companion**: Fowler, M. [Test-Driven Development definition](https://martinfowler.com/bliki/TestDrivenDevelopment.html). Brief authoritative summary.
- **Related canon**: [`bdd-workflow.md`](./bdd-workflow.md) — TDD's outer loop (acceptance tests) overlaps with BDD's executable specifications.

## 1.5. Surfaces implicit behaviour in WORKFLOW.md "same PR" rule

pentaglyph's [`WORKFLOW.md`](../WORKFLOW.md) requires "Code change → doc change in the same PR" — this implies the code change is **complete enough to document**. TDD makes the "complete enough" criterion explicit: code + tests + docs land together. The Red-Green-Refactor cycle is the implicit micro-cadence that produces each commit.

This binding names the canon that operates implicitly inside every well-formed pentaglyph PR. Per [ADR-0005](../arc42/09-decisions/0005-surface-implicit-process-layer.md).

## 2. Why pentaglyph binds this (§9.1 four-axis evaluation)

| Axis | Verdict | Rationale |
| --- | --- | --- |
| Day-1 necessity | ⚠️ Medium | Every project benefits, but TDD discipline is acquired over weeks/months, not day 1. Project may run code-first → tests-later in early prototyping. |
| Switching cost | ✅ | Retrofitting tests onto legacy code is expensive; TDD-first amortises the cost. |
| External canon | ✅ | Beck 2002 — published, stable 20+ years, taught in every CS curriculum. |
| Domain neutrality | ✅ | TDD works for code; the practice is domain-agnostic (it works for backend / frontend / data / infra). |

Three ✅ + one ⚠️. Bind as **recommended discipline** (not mandatory cadence). Adopters may run TDD-first, test-after, or test-shaped acceptance-only — the binding documents the canon, not the enforcement.

## 3. Artefact mapping

- **Layer ① test-related artefacts**:
  - Test files live in the source repository (not in `docs/`). pentaglyph does not own where tests live.
  - **Test plans** (high-level) → [`templates/3_module-detailed-design.md`](../templates/3_module-detailed-design.md) §"Testing strategy" (downstream uses this).
  - **Acceptance tests** are the BDD overlap — see [`bdd-workflow.md`](./bdd-workflow.md).
- **No tool selection.** Whether you use pytest / Jest / RSpec / xUnit / JUnit / Vitest / Playwright is a Layer ③ Automation concern.

## 4. Lifecycle integration

- The Red-Green-Refactor cycle operates **inside one commit** (typically): write failing test → make it pass → refactor.
- Per pentaglyph's "same PR" rule, the PR contains both tests and the corresponding production code — TDD-first projects also include doc updates.
- TDD's "outer loop" (acceptance tests for a feature) maps to BDD's `.feature` files when both are bound; this design-guide and [`bdd-workflow.md`](./bdd-workflow.md) compose: BDD owns the AC grammar, TDD owns the micro-cycle.

## 5. Override path

Common alternatives:

| Alternative | When | How to override |
| --- | --- | --- |
| **Test-after** | Prototyping / spike work / throwaway code | Document the exception in `<downstream>/docs/design-guide/tdd-workflow.md` "Exemptions" section. |
| **Behaviour-only** (no unit tests) | Pure data-pipeline / glue code | Bind only `bdd-workflow.md`; drop this file. |
| **Property-based testing** | Algorithmic / cryptographic code | Supplement (not replace) Beck TDD with [Hypothesis](https://hypothesis.readthedocs.io/) or [QuickCheck](https://hackage.haskell.org/package/QuickCheck). |
| **ATDD (Acceptance Test-Driven)** | Outer-loop-only teams | Replace this file with ATDD binding; usually composes with BDD. |

To override: author `<downstream>/docs/design-guide/tdd-workflow.md` and document the exception class.

## 6. References

- Beck, K. (2002). [Test-Driven Development by Example](https://www.oreilly.com/library/view/test-driven-development/0321146530/) (Addison-Wesley)
- Fowler, M. [Test-Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- Beck, K. (2018). [Test Desiderata](https://kentbeck.github.io/TestDesiderata/) — properties tests should satisfy.
- Meszaros, G. (2007). [xUnit Test Patterns](https://martinfowler.com/books/meszaros.html). Reference for test smells.
- Khorikov, V. (2020). [Unit Testing Principles, Practices, and Patterns](https://www.manning.com/books/unit-testing). Modern complement to Beck.
- [`bdd-workflow.md`](./bdd-workflow.md) — outer-loop companion to this binding
- [`_binding-a-new-process.md`](./_binding-a-new-process.md) — the meta-doc this file follows
