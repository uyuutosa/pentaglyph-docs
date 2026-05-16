---
status: Proposed
owner: <placeholder>
last-reviewed: 2026-05-14
---

# ADR-0001: Adopt a 5-layer self-architecture (Standards / Artefacts / Process / Automation / Governance) plus optional Measurement

| Metadata  | Value                                                          |
| --------- | -------------------------------------------------------------- |
| Status    | **Proposed**                                                   |
| Type      | ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit     |
| Date      | 2026-05-14                                                     |
| Deciders  | pentaglyph upstream maintainer + adopting project PO            |
| Consulted | downstream maintainers, AI agents authoring extensions          |
| Informed  | all pentaglyph users                                            |
| Ticket    | Tracked via roadmap impl-plan 2026-05-14                        |

---

## Context and Problem Statement

Pentaglyph's existing taxonomy in [`STRATEGY.md §3`](../../STRATEGY.md) (prior to expansion) organised the repository along a single **change-rate axis** (Layers A / B / C: durable / volatile / frozen). This worked for placing files but produced two systemic gaps:

1. **No structural home for process artefacts**. Sprint retros, definition-of-done checklists, RACI matrices, ADR Accept policies are real artefacts pentaglyph touches (through `WORKFLOW.md` and Layer B docs), but there is no labelled concern column in which they belong. They leak across existing layers without a canonical owner.
2. **No clear extensibility pattern**. When a downstream project (or upstream contributor) wants to bind a new process canon (BDD, Scrum, TDD, Trunk-based, DORA, …), there is no documented "place this here, follow this shape" path. Extensions accrete ad hoc.

A second axis is needed: a **concern axis** that classifies *what* each artefact addresses, independent of *how often* it changes. Together the two axes form a matrix that gives every artefact one canonical cell.

---

## Decision Drivers

- **DD-1 (highest)**: Eliminate the "process leak" problem — every artefact the kit produces or hosts should have one obvious place.
- **DD-2**: Provide a structural home for extensibility (especially binding new process canons in the future — see [ADR-0005](0005-surface-implicit-process-layer.md)).
- **DD-3**: Match the kit's existing self-consistency norms — pentaglyph already enforces arc42 + C4 + MADR + Diátaxis + TiSDD on downstream projects; modelling itself with the same vocabulary closes a credibility gap.
- **DD-4**: Keep the model small enough for new contributors to internalise in one read.

---

## Considered Options

1. **Keep only the change-rate axis (status quo)**. No structural change.
2. **Add a 3-layer concern axis: Artefacts / Process / Automation**. Minimal extension. Folds Standards into Artefacts, omits Governance.
3. **Add a 5-layer concern axis: Standards / Artefacts / Process / Automation / Governance, plus an optional Measurement layer**. Full extension.
4. **Add a 7-layer concern axis** (separate Templates from Lifecycle, separate AI-agents from CLI). Maximum granularity.

---

## Decision Outcome

**Chosen option: Option 3 — 5 layers (⓪ Standards / ① Artefacts / ② Process / ③ Automation / ④ Governance), plus an optional ⑤ Measurement layer**.

The detailed layer contracts (DO / DON'T per layer + dependency direction) live in [`STRATEGY.md §3.2`](../../STRATEGY.md). The C4 L1/L2 view of the kit lives in [`arc42/05-building-blocks/pentaglyph-self-architecture.md`](../05-building-blocks/pentaglyph-self-architecture.md).

### Y-statement summary

> In the context of **structuring pentaglyph as a kit that downstream projects extend and AI agents navigate**, facing **process artefacts with no canonical home and no extensibility pattern**, we decided for **a 5-layer concern axis (Standards/Artefacts/Process/Automation/Governance) plus optional Measurement, orthogonal to the existing change-rate axis** to achieve **one canonical cell per artefact, a documented extensibility path, and self-consistency with the canons the kit enforces on others**, accepting **a small upfront learning cost for new contributors**.

---

## Pros and Cons of the Options

### Option 1: Status quo (change-rate only)

- Pros:
  - Zero change.
- Cons:
  - Process / governance artefacts remain homeless.
  - The kit cannot answer "where do I put a BDD binding?" without ad hoc invention.
  - Self-inconsistency vs. the canons the kit enforces on others.

### Option 2: 3-layer concern (Artefacts / Process / Automation)

- Pros:
  - Simpler than Option 3.
- Cons:
  - Folds Standards into Artefacts, obscuring the link-out rule (§2).
  - Omits Governance, leaving "who decides" implicit.
  - Cannot host metrics-related artefacts without inventing a 4th layer later.

### Option 3: 5 layers + optional Measurement (chosen)

- Pros:
  - Each existing kit concern lands in exactly one layer.
  - Optional Measurement layer keeps the core minimal but admits future growth.
  - Dependency direction (⓪ → ① → ② → ③ → ④ → ⑤) gives downstream a top-down override order.
- Cons:
  - 5+1 layers to learn (mitigated by the matrix in `STRATEGY.md §3.3` which makes placement mechanical).

### Option 4: 7 layers (max granularity)

- Pros:
  - Maximum structural precision.
- Cons:
  - Each split (templates vs lifecycle, agents vs scripts) is a value judgement rather than a hard line — downstream override would constantly cross sub-layer boundaries.
  - Onboarding cost rises non-linearly with layer count.

---

## Consequences

### Positive

- Every artefact in the kit has one canonical concern + change-rate cell.
- Future binding of process canons (BDD / Scrum / TDD / Trunk-based / OKR / DORA / SRE / DesignOps / Lean Startup …) has a documented home: Layer ② Process.
- Downstream override path is unambiguous (top-down by layer).
- The kit can finally apply arc42 + C4 + MADR to itself ([`arc42/05-building-blocks/pentaglyph-self-architecture.md`](../05-building-blocks/pentaglyph-self-architecture.md)).

### Negative

- New contributors must learn 5 (or 5+1) layer labels.
- Existing files that straddled concerns (e.g. `STRATEGY.md` itself, which spans ⓪ ① ④) must be tagged with multiple layer references — the matrix is not strictly one-file-one-cell for kit-meta-docs.
- Some downstream projects may treat layer count as bureaucratic overhead.

### Neutral

- The 6th layer (⑤ Measurement) is explicitly optional; small projects skip it without losing core kit value.
- The dependency direction is enforced socially (via PR review + the forthcoming layer-aware lint), not at the file-system level.

### Follow-ups

- [ ] Layer ② Process build-out: see [ADR-0005](0005-surface-implicit-process-layer.md) + Phase 2 of impl-plan 2026-05-14.
- [ ] Layer ④ Governance build-out: Phase 4 of impl-plan 2026-05-14.
- [ ] Layer ⑤ Measurement decision: Phase 5 of impl-plan 2026-05-14 (optional, gated on adopter demand).

---

## Compliance / Validation

- Verification: every new file or directory added to the kit must reference its layer in front-matter (`layer: 0|1|2|3|4|5`) or in its README.
- Frequency: PR review + periodic audit each minor release.

---

## More Information

### Related ADRs

- Complementary: [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md) — extends the "do not re-author" rule to Layer ②.
- Complementary: [ADR-0003](0003-apply-day1-switching-cost-canon-criterion.md) — the criterion for prescribing within Layer ② and Layer ④.
- Operationalises: [ADR-0004](0004-layer-separation-contracts.md) — the strict DO/DON'T contracts per layer.
- Justifies: [ADR-0005](0005-surface-implicit-process-layer.md) — why Layer ② is "surface" not "construct".

### References

- arc42: <https://arc42.org/overview/>
- C4 model: <https://c4model.com>
- MADR v3.0: <https://adr.github.io/madr/>
- Diátaxis: <https://diataxis.fr>
- TiSDD: <https://www.thisisservicedesigndoing.com/methods>
