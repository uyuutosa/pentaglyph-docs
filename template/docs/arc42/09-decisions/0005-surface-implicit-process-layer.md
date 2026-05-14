---
status: Proposed
owner: <placeholder>
last-reviewed: 2026-05-14
---

# ADR-0005: Surface the implicit Process layer — pentaglyph already runs processes; we document what already runs, not invent new standards

| Metadata  | Value                                                          |
| --------- | -------------------------------------------------------------- |
| Status    | **Proposed**                                                   |
| Type      | ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit     |
| Date      | 2026-05-14                                                     |
| Deciders  | pentaglyph upstream maintainer + adopting project PO            |
| Consulted | downstream maintainers using pentaglyph for active projects     |
| Informed  | community contributors                                          |
| Ticket    | Tracked via roadmap impl-plan 2026-05-14                        |

---

## Context and Problem Statement

Pentaglyph's [`STRATEGY.md §9`](../../STRATEGY.md) states that the kit *"deliberately does not prescribe ... Sprint cadence / Ticket system / Code review workflow / CI-CD"*. This framing is **factually inaccurate**: pentaglyph already prescribes a substantial process layer, only implicitly:

| `WORKFLOW.md` provision                                        | Process it implies                              |
| -------------------------------------------------------------- | ----------------------------------------------- |
| "Code change → doc change. They land in **the same PR**."      | PR-based code review process                    |
| "Lifecycle: Draft → **Review** → Done"                         | Review process (reviewers, criteria, approval) |
| "ADRs **immutable once Accepted**"                             | Accept role / decision authority                |
| `postmortems/` directory with severity threshold "Medium+"     | Incident review process + severity grading      |
| `task-list/` directory                                         | Sprint planning + closing process               |
| `impl-plans/` "How we plan to implement X over the next N weeks" | Planning + scoping process                    |
| `cost-estimates/` cadence                                      | Periodic cost review process                    |

Every entry above is a **process artefact** that the kit demands its users produce. The §9 claim of "no process" is a self-deception: the kit *does* prescribe a process, but it (a) hides this fact in the artefact taxonomy and (b) does not bind any of these implicit processes to an external canon, so downstream adopters must reverse-engineer pentaglyph's expectations or supply their own (typically Scrum / Kanban / their company default).

This is the gap [ADR-0001](0001-adopt-five-layer-self-architecture.md)'s Layer ② Process exists to close, but adopting Layer ② carries a meta-decision: **do we frame this as "adding new prescriptions" or "surfacing what already runs"?**

---

## Decision Drivers

- **DD-1 (highest)**: Self-consistency. The kit cannot claim "no process" while shipping a `WORKFLOW.md` that prescribes one.
- **DD-2**: Adoption friction. Downstream maintainers spend hours figuring out which process pentaglyph expects; surfacing it cuts this cost.
- **DD-3**: Upstream PR acceptance risk. Framing Layer ② as "adding new prescriptions" triggers the upstream "stay lean" reflex; framing it as "documenting what already runs" sidesteps that.
- **DD-4**: Honesty. Adopters deserve to know what pentaglyph actually expects, not the marketing version.

---

## Considered Options

1. **Frame Layer ② as new prescriptions**. "Pentaglyph now prescribes BDD / Scrum / DoD / TDD bindings."
2. **Frame Layer ② as surfacing implicit process** (chosen). "Pentaglyph already prescribes a process implicitly via `WORKFLOW.md` and Layer B docs; Layer ② makes the implicit explicit and binds it to external canons."
3. **Drop the §9 claim and add nothing**. Just delete "deliberately does not prescribe" without adding Layer ②.

---

## Decision Outcome

**Chosen option: Option 2 — surface, do not add**.

Concretely:

1. **`STRATEGY.md §9` is rewritten** to acknowledge that pentaglyph prescribes process implicitly and that Layer ② surfaces this. The phrase "deliberately does not prescribe" is removed.
2. **Each Layer ② design-guide** opens with a "this surfaces existing implicit behaviour in §X of `WORKFLOW.md`" section, citing the implicit prescription it formalises.
3. **Upstream PRs introducing Layer ② bindings** open with the messaging: *"This adds no new prescription. It documents what `WORKFLOW.md` already requires, binds it to <canon>, and adds an override path."*
4. **Specific bindings selected for first batch**: Scrum Guide 2020 (for `task-list/`, `impl-plans/` cadence), BDD (Dan North 2003 / Adzic 2011 for Acceptance Criteria already in `templates/2_prd.md`), Definition of Done (existing Scrum.org guidance, anchoring the implicit Done state in `WORKFLOW.md` lifecycle), TDD (Beck 2002, for testing rhythm aligned with the `same PR` rule).

### Y-statement summary

> In the context of **operationalising [ADR-0001](0001-adopt-five-layer-self-architecture.md)'s Layer ② Process**, facing **the upstream "stay lean" reflex and a self-inconsistency in `STRATEGY.md §9` ("no process prescribed" vs `WORKFLOW.md` which prescribes plenty)**, we decided for **framing Layer ② as surfacing what `WORKFLOW.md` already implies and binding it to external canons (Scrum Guide 2020 / BDD / DoD / TDD)** to achieve **honest documentation of the kit's actual demands, lower adopter friction, and reduced upstream PR rejection risk**, accepting **that the `STRATEGY.md §9` text needs rewriting (a small but visible change)**.

---

## Pros and Cons of the Options

### Option 1: Frame as new prescriptions

- Pros:
  - Honest about the additions in the literal sense ("we added these design-guides").
- Cons:
  - Misleading about the substance ("we added prescriptions" — but the prescriptions already existed implicitly).
  - Triggers upstream's "kit should stay lean" reflex even when the kit gets *less* heavy on net (the implicit prescriptions become explicit, but no new behaviour is required of adopters).

### Option 2: Surface, do not add (chosen)

- Pros:
  - Honest about the substance.
  - Sidesteps the lean-reflex by showing the implicit prescriptions side-by-side with the binding.
  - Makes the §9 rewrite a natural consequence rather than an unrelated change.
- Cons:
  - Requires careful PR messaging (the surface-vs-add distinction is easy to miss in a one-line title).

### Option 3: Drop §9 claim, add nothing

- Pros:
  - Minimal change.
- Cons:
  - Leaves adopters with the same reverse-engineering cost.
  - Wastes the opportunity Layer ② creates.

---

## Consequences

### Positive

- The kit gains a clear, honest stance on process: "we prescribe a minimal one via `WORKFLOW.md`, and the bindings tell you what canon that minimal process aligns with".
- Upstream PR acceptance for the first batch of bindings (Scrum / BDD / DoD / TDD) is structurally easier — the lean-reflex argument is pre-empted by the surface-not-add framing.
- Downstream projects gain an override path: each binding can be replaced (Kanban for Scrum, RDD for TDD, etc.) without re-deriving pentaglyph's expectations.

### Negative

- `STRATEGY.md §9` text changes — a visible deletion of "deliberately does not prescribe", which some adopters may have cited as a feature.
- The "surface, not add" framing requires PR-author discipline; sloppy PR descriptions will undermine it.

### Neutral

- The kit's net behaviour for adopters is unchanged in the short term: the same `WORKFLOW.md` rules apply, now with named canons attached.
- Downstream projects that already use Scrum / BDD / etc. gain nothing concrete from the first batch but get a citable canon for future audits.

### Follow-ups

- [ ] Rewrite `STRATEGY.md §9` first paragraph (Phase 1 of impl-plan 2026-05-14, after Phase 1.5).
- [ ] Author `design-guide/bdd-workflow.md` opening with a "surfaces Acceptance Criteria already in `templates/2_prd.md` §FR; binds to Dan North 2003 / Adzic 2011" preamble (Phase 2.1 of impl-plan).
- [ ] Author `design-guide/dev-cycle.md` opening with a "surfaces lifecycle implicit in `WORKFLOW.md` Draft→Review→Done; binds to Scrum Guide 2020" preamble (Phase 2.2 of impl-plan).
- [ ] Author `design-guide/dod-dor.md` (Phase 2.3) and `design-guide/tdd-workflow.md` (Phase 2.4) with parallel preambles.

---

## Compliance / Validation

- Verification: every `design-guide/*.md` (excluding the meta-doc) must have a `## 1.5. Surfaces implicit behaviour in <WORKFLOW.md §X | STRATEGY.md §Y>` section.
- Frequency: per-PR (introducing or modifying a Layer ② design-guide).

---

## More Information

### Related ADRs

- Operationalises: [ADR-0001](0001-adopt-five-layer-self-architecture.md) Layer ② Process column.
- Bound by: [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md) — bindings must link out, not paraphrase.
- Bound by: [ADR-0003](0003-apply-day1-switching-cost-canon-criterion.md) — each binding must pass the four-axis criterion.

### References

- pentaglyph [`WORKFLOW.md`](../../WORKFLOW.md) §2 + §4 — the implicit process prescriptions surfaced by this ADR.
- pentaglyph [`STRATEGY.md §9`](../../STRATEGY.md) — the claim this ADR identifies as inaccurate.
- Schwaber, K. & Sutherland, J. (2020). [The Scrum Guide](https://scrumguides.org/scrum-guide.html).
- North, D. (2003). [Introducing BDD](https://dannorth.net/introducing-bdd/).
- Adzic, G. (2011). [Specification by Example](https://gojko.net/books/specification-by-example/).
- Beck, K. (2002). *Test-Driven Development by Example*. Addison-Wesley.
