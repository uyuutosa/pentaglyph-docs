---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
layer: 2
type: backlog
---

# Future process canon bindings — backlog

> **Layer ② Process — backlog of canons under consideration.** Each entry below has been screened against the [§9.1 four-axis criterion](../arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md) but **not yet bound**. Promotion to a `<canon>.md` design-guide requires (a) all four axes ✅ and (b) PO approval per [ADR-0002](../arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md).

> This file is intentionally not exhaustive — it documents the canons we know about and have evaluated. New candidates can be added; promotion to bound status follows [`_binding-a-new-process.md`](./_binding-a-new-process.md).

## Currently bound (for reference)

| Canon | File | Layer ② default since |
| --- | --- | --- |
| Git Flow (Driessen 2010) | [`version-control.md`](./version-control.md) | v0.1 |
| AI-augmented PR (Xiao et al. FSE 2024 + Anthropic) | [`ai-augmented-pr.md`](./ai-augmented-pr.md) | v0.1 |
| Code Tours (MS CodeTour schema) | [`code-tours.md`](./code-tours.md) | v0.1 |
| BDD (North 2003 / Adzic 2011) | [`bdd-workflow.md`](./bdd-workflow.md) | 2026-05-14 |
| Scrum Guide 2020 | [`dev-cycle.md`](./dev-cycle.md) | 2026-05-14 |
| DoD/DoR (Scrum Guide + Scrum.org) | [`dod-dor.md`](./dod-dor.md) | 2026-05-14 |
| TDD (Beck 2002) | [`tdd-workflow.md`](./tdd-workflow.md) | 2026-05-14 |

## Backlog — eligible candidates (pass 4 axes, awaiting demand signal)

### DORA / Accelerate

- **Primary**: Forsgren, Humble, Kim (2018). [Accelerate](https://itrevolution.com/product/accelerate/). [DORA State of DevOps Reports](https://dora.dev/).
- **Why eligible**: ✅ day-1 (every project benefits from measurable delivery metrics), ✅ switching-cost (instrumentation is sticky), ✅ external canon (Google-owned DORA), ✅ domain neutrality.
- **Maps to**: would create `metrics/dora-baseline.md` (Layer ⑤ Measurement, optional). Pre-requisite: Layer ⑤ activation (Phase 5 of self-architecture roadmap).
- **Status**: Held until Layer ⑤ is activated.

### SRE (Site Reliability Engineering)

- **Primary**: Beyer, Jones, Petoff, Murphy eds. (2016). [Site Reliability Engineering](https://sre.google/books/). Free online.
- **Why eligible**: ✅ all four axes for projects with prod systems. ❌ domain neutrality for early-stage / OSS / docs-only projects.
- **Maps to**: would create `design-guide/sre-workflow.md` + bind error-budget / SLO templates. Pre-requisite: arc42 §10 (Quality) population.
- **Status**: Bind on PO demand when arc42 §10 SLO templates are needed.

### Continuous Discovery (Torres)

- **Primary**: Torres, T. (2021). [Continuous Discovery Habits](https://www.producttalk.org/continuous-discovery-habits/).
- **Why eligible**: ✅ day-1 for product orgs, ❌ for OSS/internal-tools (no end-customer discovery needed).
- **Maps to**: would extend `templates/6_persona.md` + `templates/7_journey-map.md` (TiSDD overlap). Touches Layer ① more than pure ② Process.
- **Status**: Held; TiSDD already covers most ground.

### OKR (Doerr / Andy Grove)

- **Primary**: Doerr, J. (2018). [Measure What Matters](https://www.whatmatters.com/the-book/). Companion: Grove, A. (1983). High Output Management.
- **Why eligible**: ✅ day-1 for goal-setting, ⚠️ switching-cost (OKR vs Hoshin Kanri vs balanced scorecard — choice persists), ✅ external canon, ✅ domain neutrality.
- **Maps to**: would create `arc42/01-introduction-and-goals/okr-template.md` — touches Layer ① more than ② Process.
- **Status**: Held; current `arc42/01-introduction-and-goals/overview.md` covers goals informally.

### Lean Startup (Ries)

- **Primary**: Ries, E. (2011). [The Lean Startup](http://theleanstartup.com/).
- **Why eligible**: ✅ day-1 for new-product projects, ❌ for mature-product / regulated.
- **Maps to**: would create `design-guide/lean-startup.md` binding Build-Measure-Learn cycle. Layer ② cadence (alternative to Scrum).
- **Status**: Held; pentaglyph's existing Scrum binding covers cadence.

### DesignOps

- **Primary**: NN Group [DesignOps 101](https://www.nngroup.com/articles/design-operations-101/). InVision [DesignOps Handbook](https://designbetter.co/designops-handbook).
- **Why eligible**: ⚠️ external canon (no single canonical book/spec; multiple competing guides), ✅ other axes for design-heavy projects.
- **Maps to**: would extend `service-design/` with design-team workflow. Layer ② + Layer ④ Governance overlap.
- **Status**: Held; weak canon. Watch for canonical consolidation.

## Backlog — under evaluation (axes uncertain)

### Domain-Driven Design (Evans 2003)

- **Primary**: Evans, E. (2003). [Domain-Driven Design](https://www.domainlanguage.com/ddd/).
- **Why uncertain**: DDD is more an architecture pattern than a process canon — would belong in `arc42/08-crosscutting/` rather than `design-guide/`. Re-evaluate scope.
- **Status**: Evaluate placement before binding.

### Event Storming

- **Primary**: Brandolini, A. [Introducing EventStorming](https://leanpub.com/introducing_eventstorming).
- **Why uncertain**: Workshop-format process; outputs typically diagrams (Layer ① C4 / arc42 §6) rather than persistent docs. Cadence is per-feature, not per-Sprint.
- **Status**: Bind on PO demand from a project that uses Event Storming heavily.

## Rejected candidates (failed 4 axes)

### "Pentaglyph-flavoured X" (any in-house process)

- **Why rejected**: Fails the **external canon** axis by definition. [ADR-0002](../arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md) forbids self-authored process standards.
- **Path**: Author the in-house process in `<downstream>/docs/design-guide/` only; do not upstream to pentaglyph.

### Waterfall / V-Model

- **Why rejected**: ❌ domain neutrality — viable only in regulated / contract-bound projects. pentaglyph's other defaults (Git Flow + TDD + same-PR-doc-change) assume iterative work.
- **Path**: Downstream projects in regulated industries override [`dev-cycle.md`](./dev-cycle.md) with V-Model binding; do not upstream.

## How to add a candidate

1. File the canon name + primary URL + brief axes verdict as a new entry under "Under evaluation" or "Eligible".
2. If all four axes are ✅ and there is concrete demand (PO request or downstream project asking), promote to a new `<canon>.md` design-guide per [`_binding-a-new-process.md`](./_binding-a-new-process.md).
3. Move the entry from this file to "Currently bound" table above.
