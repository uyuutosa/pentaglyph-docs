---
status: Proposed
owner: <placeholder>
last-reviewed: 2026-05-14
---

# ADR-0004: Define strict layer separation contracts (DO / DON'T per layer + one-way dependency direction)

| Metadata  | Value                                                          |
| --------- | -------------------------------------------------------------- |
| Status    | **Proposed**                                                   |
| Type      | ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit     |
| Date      | 2026-05-14                                                     |
| Deciders  | pentaglyph upstream maintainer + adopting project PO            |
| Consulted | AI agents authoring kit extensions                              |
| Informed  | all pentaglyph users                                            |
| Ticket    | Tracked via roadmap impl-plan 2026-05-14                        |

---

## Context and Problem Statement

[ADR-0001](0001-adopt-five-layer-self-architecture.md) adopts a 5-layer concern axis (⓪-④) plus an optional Measurement layer. Without explicit responsibility contracts and a dependency direction, layers leak:

- A CLI command (Layer ③) could re-define a template (Layer ①).
- A `design-guide/` file (Layer ②) could prescribe a specific tool (which is Layer ③ Automation's concern).
- A `governance/` file (Layer ④) could take a specific decision (which is an individual ADR's role inside Layer ① Artefacts).
- A `metrics/` file (Layer ⑤) could prescribe how to improve metrics (which is Layer ② Process's role).

Without contracts, every layer addition is a candidate to violate the others, and PR review becomes ad hoc judgement.

---

## Decision Drivers

- **DD-1 (highest)**: Make layer violations mechanically detectable in PR review.
- **DD-2**: Define an override order so downstream projects can replace layers without disturbing others.
- **DD-3**: Keep the contracts short enough that contributors actually read them.
- **DD-4**: Avoid over-specifying — the contracts should bind clear-cut leaks, not every edge case.

---

## Considered Options

1. **No contracts** — rely on PR review judgement.
2. **Lightweight DO/DON'T table per layer** (chosen) — one row per layer in `STRATEGY.md §3.2` with explicit DO and DON'T columns + one-way dependency rule.
3. **Heavy formal contracts** — a separate page per layer with full interface specifications (inputs/outputs/error modes).

---

## Decision Outcome

**Chosen option: Option 2 — lightweight DO/DON'T table per layer plus a strict one-way dependency direction**.

### Layer contracts (authoritative table)

| Layer | DO (responsibility) | DON'T (out of scope) |
| --- | --- | --- |
| ⓪ Standards | List + link out to canons | Re-author canon philosophy |
| ① Artefacts | Provide concrete shapes, taxonomy, lifecycle | Prescribe processes that produce them |
| ② Process | Bind external process canons in thin design-guides | Invent new process standards; prescribe specific tools |
| ③ Automation | Operate on ① + execute ② via CLI / agents / scripts | Re-define artefacts or processes inside code |
| ④ Governance | Define who decides / accepts / overrides | Take specific decisions (the role of individual ADRs) |
| ⑤ Measurement | Quantify health of ⓪-④ | Prescribe how to improve metrics (Layer ②'s role) |

(The same table also lives in [`STRATEGY.md §3.2`](../../STRATEGY.md) and [`arc42/05-building-blocks/pentaglyph-self-architecture.md`](../05-building-blocks/pentaglyph-self-architecture.md). This ADR is the authoritative source; the other two reference it.)

### One-way dependency direction

Each layer depends only on layers below it (⓪ is at the bottom, ⑤ at the top):

```
⓪ Standards  →  ① Artefacts  →  ② Process  →  ③ Automation  →  ④ Governance  →  ⑤ Measurement
```

Concretely:

- ⓪ cites no kit file. ⓪ → external canon URLs only.
- ① may cite ⓪. ① must not cite ② ③ ④ ⑤.
- ② may cite ⓪ + ①. ② must not cite ③ ④ ⑤.
- ③ may cite ⓪ + ① + ②. ③ must not cite ④ ⑤.
- ④ may cite ⓪ + ① + ② + ③. ④ must not cite ⑤.
- ⑤ may cite ⓪-④. ⑤ is the outermost layer.

### Y-statement summary

> In the context of **defining how the 5 (+1) layers of pentaglyph interact**, facing **the risk that layers leak (CLI redefines templates, governance takes decisions, etc.) without explicit contracts**, we decided for **a lightweight DO/DON'T table per layer plus a strict one-way dependency direction (⓪ → ① → ② → ③ → ④ → ⑤)** to achieve **mechanically-checkable PR review and a predictable override order for downstream projects**, accepting **that some edge cases (e.g. a Layer ③ script that needs governance metadata) require an explicit exception ADR**.

---

## Pros and Cons of the Options

### Option 1: No contracts

- Pros:
  - Maximum flexibility.
- Cons:
  - Every PR re-debates layer boundaries.
  - Drift accumulates silently.

### Option 2: Lightweight DO/DON'T + one-way direction (chosen)

- Pros:
  - Fits in one table (the table above).
  - Checkable: grep `(import|require|@source) ⑤` in a Layer ① file is an immediate violation.
  - Override-friendly: downstream replaces Layer N by editing files that cite only ⓪-(N-1).
- Cons:
  - Edge cases require exception ADRs (e.g. a `scripts/docs/metrics_*.py` reading `governance/raci.md` would technically violate ⑤ → ④, but is benign).

### Option 3: Heavy formal contracts

- Pros:
  - Maximum precision.
- Cons:
  - Nobody reads multi-page interface specs for a documentation kit. The cost dwarfs the benefit.

---

## Consequences

### Positive

- PR review has a binary check: "does this file cite something above its layer?"
- Downstream override order is unambiguous: replace top-down (⑤ first, ⓪ last).
- A forthcoming layer-aware lint can encode the citation rule.

### Negative

- Some files genuinely span layers (e.g. `STRATEGY.md` spans ⓪ + ① + ④). These are tagged with multiple layer references and exempted from the strict citation rule.
- New contributors must learn the 6-row table before opening a meaningful PR.

### Neutral

- The contracts describe **responsibility**, not **physical location**. A file in `cli/` can implement ③ logic, but its README may describe Layer ① concerns (templates it scaffolds). Both are legitimate.

### Follow-ups

- [ ] Add a `scripts/docs/lint_layer_citations.py` that statically detects citation-direction violations (Phase 3 of impl-plan 2026-05-14).
- [ ] Add a layer-tag front-matter field to all new files: `layer: 0|1|2|3|4|5|0+1|...` (Phase 4 of impl-plan 2026-05-14).

---

## Compliance / Validation

- Verification:
  - Layer-aware lint (forthcoming).
  - PR review: reviewers verify the new file's layer matches its citations.
- Frequency: per-PR + periodic full-repo scan each minor release.

---

## More Information

### Related ADRs

- Builds on: [ADR-0001](0001-adopt-five-layer-self-architecture.md) — defines the layers this ADR contracts.
- Complementary: [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md) — the DON'T for Layer ② Process.

### References

- arc42 §5 — Building Block View; this ADR is the kit-meta equivalent for pentaglyph's own building blocks.
- [`STRATEGY.md §3.2`](../../STRATEGY.md) — the table this ADR makes authoritative.
- [`arc42/05-building-blocks/pentaglyph-self-architecture.md`](../05-building-blocks/pentaglyph-self-architecture.md) §4 — the dependency-direction diagram.
