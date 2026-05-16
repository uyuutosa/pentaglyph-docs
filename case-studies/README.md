---
status: Stable
owner: pentaglyph-docs
last-reviewed: 2026-05-16
---

# Case studies

Real-world adoption stories that document **how a downstream project bound the kit's deliberately abstract canons to its concrete operating environment**. Each case study names:

1. The downstream project (link to its repo / website if public).
2. Which Layer (① Artefacts / ② Process / ③ Automation / ④ Governance / ⑤ Measurement) was bound.
3. What the upstream kit deliberately leaves under-specified.
4. The concrete bindings the downstream chose (tools, cadence, file layout).
5. Lessons learned that may interest future adopters.

Case studies are **non-authoritative** — they document one team's choices, not a recommended path. The authoritative bindings live in [`template/docs/design-guide/`](../template/docs/design-guide/) for Layer ② and the corresponding meta-doc [`_binding-a-new-process.md`](../template/docs/design-guide/_binding-a-new-process.md). Case studies illustrate the meta-doc's instructions with end-to-end examples.

## When to add a case study

Add a file here when:

- A downstream project completes a non-trivial binding (typically Layer ② or ③).
- The binding choices would be useful as a worked example for other adopters.
- The downstream gives permission to publish their concrete naming / cadence / tool choices.

File naming: `YYYY-MM-DD_<downstream-name>-<binding-topic>.md`. Use kebab-case throughout.

## Index

| Date       | Downstream | Binding topic                       | File                                                                                    |
| ---------- | ---------- | ----------------------------------- | --------------------------------------------------------------------------------------- |
| 2026-05-16 | AI-clone (PoC) | Layer ② Process — Scrum / CI-CD / BDD-TDD | [`2026-05-16_ai-clone-downstream-process-binding.md`](./2026-05-16_ai-clone-downstream-process-binding.md) |
