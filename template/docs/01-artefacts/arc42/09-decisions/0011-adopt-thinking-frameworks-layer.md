---
status: Proposed
owner: <placeholder>
last-reviewed: 2026-05-19
---

# ADR-0011: Bind external problem-solving thinking frameworks under `02-process/thinking-frameworks/`

| Metadata  | Value                                                          |
| --------- | -------------------------------------------------------------- |
| Status    | **Proposed**                                                   |
| Type      | ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit     |
| Date      | 2026-05-19                                                     |
| Deciders  | pentaglyph upstream maintainer + adopting project PO            |
| Consulted | downstream maintainers, AI agents authoring extensions          |
| Informed  | all pentaglyph users                                            |
| Ticket    | Tracked via roadmap impl-plan + downstream consumer ADO ticket |

---

## Context and Problem Statement

Pentaglyph today binds 5 peer **documentation** standards (arc42 / C4 / MADR / Diátaxis / TiSDD) and a 6th binder slot (PEL — see PR #63). All six occupy concern axes ⓪ Standards and ① Artefacts: they prescribe *what document to produce, in what shape, where*.

However, real consulting / advisory / engineering work also depends on **problem-solving thinking frameworks** — Minto Pyramid, MECE, Issue Tree, Hypothesis-Driven Approach, 5 Whys, First Principles, 80/20, 2x2 Matrix, OODA Loop — that shape *how to think before writing anything*. These have observable, well-documented effects on dev quality (decisions are sharper, investigation is faster, communication is clearer, AI agents produce better output when given a named framework to apply).

Today there is no canonical home for these frameworks in pentaglyph. Practitioners apply them implicitly (佐藤さんの既存報告書は事実上 Minto SCQA 構造) but the bindings are not made first-class. New team members and AI agents must rediscover them. The decision: should pentaglyph bind these frameworks as a structured layer, and if so, where?

---

## Decision Drivers

- **DD-1 (highest)**: Problem-solving quality compounds dev quality. Named frameworks accelerate both human cognition and AI agent output (one-line instructions like "draft this as SCQA" / "do an Issue Tree" / "apply 80-20" produce sharply better results than open-ended prompts).
- **DD-2**: Make existing implicit practice explicit. The 佐藤さん engagement already uses these frameworks ad hoc (weekly reports follow SCQA-adjacent structure, prioritization decisions are 80-20-flavoured). Binding them removes the "rediscover each time" tax.
- **DD-3**: Future-proof extensibility. Other consulting / advisory frameworks will surface over time (Crucial Conversations, Reference Class Forecasting, Theory of Constraints, …). The binding pattern should accept them without restructuring.
- **DD-4**: AI-first authoring. Every framework chosen must have high LLM training-corpus footprint so agents can produce reasonable output from a 1-line instruction.
- **DD-5**: Avoid scope creep into a new peer standard. These frameworks are thinking-prescriptive, not artifact-prescriptive — they don't define document shapes the way arc42 etc. do.

---

## Considered Options

### Option A — Bind as a 6th (or 7th) **peer standard**

Add "Thinking Frameworks" as a peer to arc42 / C4 / MADR / Diátaxis / TiSDD / PEL, with its own top-level `docs/thinking/` directory and STRATEGY §2 row.

- **Pros**: maximum visibility; signals importance
- **Cons**: peer standards are *artifact-prescriptive* (each prescribes specific document shapes). Thinking frameworks don't — Issue Tree is not a document, it's a way to decompose problems. Forcing them into a peer slot mislabels them; readers would expect templates like `21_issue-tree-document.md` which would be a category error
- **Cons**: bumps the visible "pentaglyph = 5 / actually 6 / now 7" count further, intensifying the naming problem already debated in PR #63
- **Cons**: violates [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md) "bind canons only, do not self-author standards" by elevating a *binding pattern* (composition of thinking frameworks) to peer-standard status

### Option B — Bind as **operational conventions under `02-process/`**, in a dedicated sub-directory

Add `docs/02-process/thinking-frameworks/` as a new sub-directory, alongside existing conventions (`version-control.md`, `ai-augmented-pr.md`, `code-tours.md`, the `bdd-workflow.md` / `tdd-workflow.md` / `dev-cycle.md` process bindings). Each framework gets a 1-2 page binding file with: authoritative source URL, when-to-use, when-not-to-use, 1-2 worked examples.

- **Pros**: structurally honest — these are operational conventions, same category as the existing `02-process/` entries
- **Pros**: no pressure on the kit-naming question (no new peer standard, no new top-level slot)
- **Pros**: extensible — future frameworks (Crucial Conversations, etc.) drop in as additional files
- **Pros**: respects [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md) — each file is a *binding* of an external canon, not a pentaglyph-authored standard
- **Cons**: less visible than peer-standard placement (mitigation: cross-reference from STRATEGY §3.2 concern ② Process row, link from AI_INSTRUCTIONS.md)

### Option C — **Add as a new concern axis (⑥)** in STRATEGY §3.2

Introduce concern ⑥ "Reasoning / Thinking" alongside the existing ⓪–⑤ (Standards / Artefacts / Process / Automation / Governance / Measurement). Frameworks live in `docs/thinking/` and are classified as concern ⑥.

- **Pros**: most architecturally pure — surfaces "thinking frameworks" as a first-class concern
- **Cons**: heavy structural change for ~10 framework bindings; the concern-axis additions in [ADR-0001](0001-adopt-five-layer-self-architecture.md) already cover what these frameworks support (they're invoked *by* concern ② Process artefacts and *during* concern ① Artefact authoring)
- **Cons**: violates the "binding pattern fits existing concerns" principle; concern axis was deliberately closed at ⑤

### Option D — Bind only Minto, defer the rest

Adopt only `5-minto-pyramid.md` under `02-process/business-writing.md`. Defer MECE / Issue Tree / Hypothesis-Driven / 5 Whys / First Principles / 80-20 / 2x2 / OODA to ad-hoc later bindings.

- **Pros**: minimum scope; low cost
- **Cons**: arbitrary — Minto without MECE is incoherent (MECE is Minto's grouping foundation); 5 Whys without Issue Tree leaves problem-framing half-covered. The frameworks form an interlocking 5-stage workflow that loses value when split

---

## Decision Outcome

**Choose Option B: bind as operational conventions under `docs/02-process/thinking-frameworks/`.**

Rationale:

1. Structurally honest (Option A and C mislabel; Option D under-includes)
2. Respects [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md) and [ADR-0004](0004-layer-separation-contracts.md) layer separation
3. No impact on kit-naming question
4. Extensible for future framework additions
5. Existing `02-process/` already has analogous bindings (`bdd-workflow.md`, `tdd-workflow.md`) — pattern is proven

**Initial scope**: 9 frameworks across 5 workflow stages + 1 foundation (MECE), curated for MECE coverage of the problem-solving lifecycle:

| Stage | Framework | File |
| --- | --- | --- |
| Foundation | MECE | `_foundation-mece.md` |
| 1. Frame the problem | Issue Tree | `1-issue-tree.md` |
| 1. Frame the problem | First Principles Thinking | `1-first-principles.md` |
| 2. Investigate / diagnose | Hypothesis-Driven Approach | `2-hypothesis-driven.md` |
| 2. Investigate / diagnose | 5 Whys | `2-five-whys.md` |
| 3. Prioritize | 80/20 (Pareto) | `3-pareto-80-20.md` |
| 3. Prioritize | 2x2 Matrix | `3-two-by-two-matrix.md` |
| 4. Decide & act | OODA Loop | `4-ooda-loop.md` |
| 5. Communicate | Minto Pyramid + SCQA | `5-minto-pyramid.md` |

Each file: 150–400 words. Front matter declaring framework name + stage + bound external canon. Sections: authoritative source URL, when to use, when NOT to use, worked example, common failures, related frameworks.

---

## Consequences

### Positive

- AI agents gain a vocabulary of one-line instructions (`"do an Issue Tree"`, `"apply SCQA"`, `"check this is MECE"`) that produces sharply better output
- Existing implicit practices (e.g. SCQA-adjacent structure of 佐藤さんの reports) become explicit and teachable
- New team members onboard faster — the problem-solving toolkit is documented rather than tribal knowledge
- Cultural alignment with Toyota lineage (5 Whys originates at Toyoda Sakichi; pentaglyph's first dogfooding consumer is the 豊田合成 engagement)
- Postmortems and after-action reviews get a canonical method (5 Whys + OODA cycle-time analysis)

### Negative

- Maintenance overhead: 10 framework files to keep current as authoritative sources evolve (mitigation: re-review annually; most of these frameworks are decades-old and stable)
- Risk of cargo-cult adoption ("we're using Issue Tree" without actually decomposing well) — mitigation: each file includes "common failures" section

### Neutral

- STRATEGY §3.2 concern axis stays at ⓪–⑤; this binding lives within concern ② Process (operational conventions)
- No impact on PR #63 (PEL) or any other in-flight work

---

## Compliance

- [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md): ✅ each framework binds an external canon with authoritative URL; pentaglyph does not author the philosophy
- [ADR-0004](0004-layer-separation-contracts.md): ✅ frameworks live in concern ② Process, do not leak into ⓪ Standards or ① Artefacts
- [`docs/02-process/_binding-a-new-process.md`](../../../02-process/_binding-a-new-process.md): ✅ each framework file follows the 6-section template adapted for thinking-frameworks (source / when / when-not / example / failures / related)

---

## Follow-ups

- [ ] After 1-2 cycles of use, audit which frameworks are actually invoked vs. which are shelf-warmers; promote the most-used ones to AI_INSTRUCTIONS.md cheat sheet
- [ ] Add `01-artefacts/templates/` reference: postmortem template should reference `2-five-whys.md` as default root-cause method
- [ ] Cross-reference from PEL `client-engagement/01-artefacts/reports/README.md`: weekly + heartbeat templates should reference `5-minto-pyramid.md` as the prose-structure default
- [ ] Add Toyota Production System / Lean references where overlap exists (especially for 5 Whys)

---

## References

- [`../../02-process/thinking-frameworks/README.md`](../../02-process/thinking-frameworks/README.md) — the new directory's overview
- [ADR-0001](0001-adopt-five-layer-self-architecture.md) — the concern-axis decision this builds on
- [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md) — bind-canons rule that this respects
- [ADR-0004](0004-layer-separation-contracts.md) — layer separation contracts
