---
status: Proposed
owner: <placeholder>
last-reviewed: 2026-05-14
---

# ADR-0002: Bind external canons only — pentaglyph does not author its own standards (extended to Layer ② Process)

| Metadata  | Value                                                          |
| --------- | -------------------------------------------------------------- |
| Status    | **Proposed**                                                   |
| Type      | ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit     |
| Date      | 2026-05-14                                                     |
| Deciders  | pentaglyph upstream maintainer + adopting project PO            |
| Consulted | community contributors                                          |
| Informed  | all pentaglyph users                                            |
| Ticket    | Tracked via roadmap impl-plan 2026-05-14                        |

---

## Context and Problem Statement

Pentaglyph's [`STRATEGY.md §2`](../../STRATEGY.md) already states that the kit binds five external canons (arc42, C4, MADR, Diátaxis, TiSDD) and "does not re-author the philosophy of these standards inside this repo". The implication is meant to be: the kit *also* does not invent its own standards in adjacent areas — branching, PR conventions, process canons, governance — but this is only stated implicitly through the operational-defaults list in §9 (Git Flow / AI-PR / Code Tours all link out to external authorities).

The introduction of Layer ② Process ([ADR-0001](0001-adopt-five-layer-self-architecture.md), [ADR-0005](0005-surface-implicit-process-layer.md)) creates a stronger temptation to invent: bindings for BDD, Scrum, TDD, Trunk-based are all areas where the kit could plausibly write a "pentaglyph BDD workflow" rather than bind Dan North 2003. That would be a quiet violation of §2, and would erode the kit's identity over time.

This ADR makes the "bind, do not author" rule explicit, extends it from Layer ⓪ Standards to Layer ② Process, and defines what "binding" concretely looks like.

---

## Decision Drivers

- **DD-1 (highest)**: Preserve the kit's identity as a binder of canons, not a publisher of standards.
- **DD-2**: Avoid the maintenance burden of in-house standards (the kit would need to track its own version compatibility, errata, deprecations).
- **DD-3**: Allow downstream projects to skip pentaglyph's Layer ② entirely by adopting the underlying canons directly — without losing pentaglyph's other layers.
- **DD-4**: Reduce review burden — paraphrase-detection is a cheap PR check when the rule is "no canon paraphrasing".

---

## Considered Options

1. **No formal rule** (status quo, implicit only).
2. **Bind-only rule for Layer ⓪ Standards only**. Status quo +§2 made explicit.
3. **Bind-only rule extended to Layer ② Process** (chosen).
4. **Bind-only rule extended to all layers ⓪-⑤**. Most aggressive — would forbid even kit-meta-docs like `STRATEGY.md`.

---

## Decision Outcome

**Chosen option: Option 3 — bind-only rule extended to Layer ⓪ Standards and Layer ② Process**.

Concretely:

- **Layer ⓪**: `STRATEGY.md §2` already enforces this. No change.
- **Layer ② Process**: Every `design-guide/<canon>.md` file must:
  - Open with `## 1. External canon (authoritative)` listing the canonical URL and (where applicable) book/spec.
  - Add only the **operational mapping** (which pentaglyph artefacts produce/consume the canon's outputs, which layer it sits in, which override path applies).
  - **Never** paraphrase the canon's core definitions. Quotes from the canon are allowed; restatements are not.
- **Layers ① ③ ④ ⑤**: Kit-meta-docs (templates, CLI, agents, governance, metrics) are *authored* by pentaglyph (otherwise the kit would have no content). These layers are exempt from the bind-only rule because they describe the kit itself, not external concerns.

### Y-statement summary

> In the context of **adding bindings for external process canons (BDD, Scrum, TDD, Trunk-based, …) to Layer ② Process**, facing **the temptation to invent "pentaglyph X-workflow" rather than link to the authoritative source**, we decided for **a strict bind-only rule extending §2 to Layer ②, with a 6-section design-guide template that forbids paraphrasing canon definitions** to achieve **preservation of the kit's identity, reduced maintenance burden, and clean adopter override paths**, accepting **that some genuinely useful in-house practices (without an external canon) remain outside the kit**.

---

## Pros and Cons of the Options

### Option 1: No formal rule

- Pros:
  - Maximum flexibility.
- Cons:
  - Implicit rules drift. Future maintainers may not realise §2 was meant to constrain Layer ②.

### Option 2: Layer ⓪ only

- Pros:
  - Minimal change.
- Cons:
  - Layer ② is exactly where the temptation to invent is strongest (process canons are voluminous, easy to summarise).

### Option 3: Layer ⓪ + Layer ② (chosen)

- Pros:
  - Closes the loophole at the point of greatest temptation.
  - 6-section template makes the rule mechanically checkable.
- Cons:
  - Some adopters may want a "pentaglyph-flavoured BDD" — they can fork or use downstream `design-guide/` extensions, but not the upstream kit.

### Option 4: All layers

- Pros:
  - Maximum identity protection.
- Cons:
  - Layers ① ③ ④ ⑤ literally cannot exist without kit-authored content. The rule is incoherent applied here.

---

## Consequences

### Positive

- Every Layer ② binding has a predictable shape and is auditable in one PR pass.
- Downstream projects can replace the canon binding without touching pentaglyph's other layers (e.g. swap Scrum→Kanban by replacing `design-guide/dev-cycle.md` only).
- The "we add file layout, the canons add philosophy" division of labour ([`STRATEGY.md §2`](../../STRATEGY.md)) is preserved as the kit grows.

### Negative

- Useful practices without an external canon (e.g. team-specific code-review checklists) cannot be upstreamed — they remain in downstream `design-guide/`.
- Some canons have weak or sprawling primary sources (e.g. "Scrum" has both the Scrum Guide and dozens of derivative frameworks); choosing which to bind requires its own micro-ADR per binding.

### Neutral

- Existing operational defaults (Git Flow, AI-PR, Code Tours) already comply.
- The 6-section template is enforced via PR review + a simple grep ("does the file have a `## 1. External canon` heading?").

### Follow-ups

- [ ] Add a `design-guide/_binding-a-new-process.md` meta-doc that documents the 6-section template + paraphrase-detection heuristic (Phase 2 of impl-plan 2026-05-14).
- [ ] Add to `cli/`: `bunx pentaglyph add-process <name>` scaffolds a new design-guide from the template (Phase 3 of impl-plan).

---

## Compliance / Validation

- Verification:
  - Every file in `design-guide/` matching `^[a-z][a-z0-9-]+\.md$` (i.e. excluding the meta-doc `_binding-*.md`) must contain `## 1. External canon (authoritative)`.
  - PR review checks for paraphrasing — heuristic: search the canon source for any sentence pentaglyph adds; if a near-paraphrase exists, replace with a quote + link.
- Frequency: per-PR.

---

## More Information

### Related ADRs

- Builds on: [ADR-0001](0001-adopt-five-layer-self-architecture.md) — defines Layer ② Process which this rule constrains.
- Operationalised by: [ADR-0003](0003-apply-day1-switching-cost-canon-criterion.md) — the four-axis criterion has "external canon" as a required axis, matching this ADR.
- Complementary: [ADR-0005](0005-surface-implicit-process-layer.md) — surfacing implicit processes by binding canons rather than authoring.

### References

- [`STRATEGY.md §2`](../../STRATEGY.md) — the original "do not re-author" statement.
- Spolsky, J. (2002). [The Law of Leaky Abstractions](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/) — paraphrase of a canon eventually drifts from the canon.
