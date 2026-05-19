---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
---

# Thinking Frameworks (problem-solving canon for engineering + advisory work)

This directory binds **external thinking / problem-solving frameworks** — the meta-skills consultants use to decompose problems, investigate, prioritize, decide, and communicate. They are *complementary* to pentaglyph's 5 peer documentation standards (arc42 / C4 / MADR / Diátaxis / TiSDD) and to the PEL 6th binder slot.

**Why bind these into a doc kit?** Because problem-solving quality compounds dev quality. Teams that share a vocabulary for "let's MECE-decompose this", "this is a hypothesis-driven sprint", "structure the report as SCQA" make faster, less-rework-prone decisions than teams that don't. AI agents also operate much better when given a named framework: `"draft this as a SCQA"` produces sharper output than `"write it persuasively"`.

**Why a separate sub-directory under `design-guide/`?** Because these frameworks are *thinking-prescriptive* (how to think), not *artifact-prescriptive* (which file to produce). They don't fit the 5-peer-standards mould (arc42 etc. each define document shapes). They belong alongside `version-control.md` / `ai-augmented-pr.md` / `code-tours.md` as **operational conventions the team binds**.

## The 5-stage problem-solving workflow

These frameworks map onto a 5-stage workflow. Each stage has 1–2 frameworks; the frameworks within a stage are *mutually exclusive* (different angles); the 5 stages are *collectively exhaustive*. **MECE** itself is a foundation principle invoked by frameworks across all stages.

| Stage | Frameworks | When to reach for it |
| --- | --- | --- |
| **1. Frame the problem** | [Issue Tree](./1-issue-tree.md) (top-down decomposition) · [First Principles](./1-first-principles.md) (bottom-up premise audit) | A vague problem statement that needs structure before it can be tackled |
| **2. Investigate / diagnose** | [Hypothesis-Driven Approach](./2-hypothesis-driven.md) (assume answer, test it) · [5 Whys](./2-five-whys.md) (trace symptom to root cause) | The problem is framed but the cause / solution is unknown |
| **3. Prioritize** | [80/20 (Pareto)](./3-pareto-80-20.md) (1-D ranking) · [2x2 Matrix](./3-two-by-two-matrix.md) (2-D positioning) | Too many candidate actions; need to triage |
| **4. Decide & act** | [OODA Loop](./4-ooda-loop.md) (Observe-Orient-Decide-Act cycle) | Fast-moving situation; iteration over single big decision |
| **5. Communicate** | [Minto Pyramid + SCQA](./5-minto-pyramid.md) (answer-first, structured prose) | Any business / engineering document or message |
| **(Foundation)** | [MECE](./_foundation-mece.md) (mutually exclusive, collectively exhaustive) | Cross-cutting — every decomposition, grouping, list, or matrix in any of the above |

## Decision tree

```text
START: I have a problem-solving / communication need.
│
├─ Need to write / present something to someone?
│   YES → 5-minto-pyramid.md (SCQA + answer first)
│
├─ Have a problem but unclear how to decompose it?
│   ├─ Existing problem, want to break into parts?  → 1-issue-tree.md
│   └─ Existing solution but premises look wrong?    → 1-first-principles.md
│
├─ Problem is framed, but solution / cause unknown?
│   ├─ Have a candidate answer to test?             → 2-hypothesis-driven.md
│   └─ Have a symptom and want to find root cause?  → 2-five-whys.md
│
├─ Too many candidate actions / options?
│   ├─ 1-axis ranking is enough?                    → 3-pareto-80-20.md
│   └─ Need to position on 2 axes / 4 quadrants?    → 3-two-by-two-matrix.md
│
├─ Fast-moving situation, decision will iterate?
│   YES → 4-ooda-loop.md
│
└─ Doing any decomposition / grouping / list above?
    Always check it's MECE → _foundation-mece.md
```

## File naming convention

`<stage-number>-<framework-kebab>.md` — the stage prefix makes the file list naturally group by workflow stage when sorted alphabetically. The exception is `_foundation-mece.md` (underscore prefix sorts first, signalling "read this first").

## When to bind a new framework

A candidate framework qualifies for this directory if:

1. **It has an external authoritative source** (book / paper / authoritative site) — pentaglyph does not invent frameworks.
2. **It is well-trained in LLMs** — AI agents recognize the name and produce reasonable output when instructed (`"use SCQA"`, `"do an issue tree"`).
3. **It is thinking-prescriptive, not artifact-prescriptive** — it shapes *how to think*, not *which file to produce*. If it's the latter, it might belong as a peer standard (`STRATEGY.md §2`) or as a PEL primitive (`client-engagement/`).
4. **It occupies a non-overlapping slot in the 5-stage workflow** — see the MECE check in the section above.

To add one: copy the structure of an existing file, place it under the right stage, update this README's table + decision tree, and write an ADR if the framework introduces a new opinion (most don't — they just bind an existing canon).

## Related

- [`../README.md`](../README.md) — design-guide directory overview
- [`../../STRATEGY.md` §3.2 concern axis](../../STRATEGY.md) — these frameworks live in concern ② Process (or perhaps deserve their own concern ⑥ — see `_future-bindings.md`)
- [`../../arc42/09-decisions/0010-adopt-thinking-frameworks-layer.md`](../../arc42/09-decisions/0010-adopt-thinking-frameworks-layer.md) — the adoption decision
- [`../_binding-a-new-process.md`](../_binding-a-new-process.md) — pentaglyph's process-canon-binding meta-doc (these thinking frameworks are bound the same way)
