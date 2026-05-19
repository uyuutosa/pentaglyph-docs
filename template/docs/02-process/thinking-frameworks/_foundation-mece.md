---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
framework: MECE (Mutually Exclusive, Collectively Exhaustive)
binds: Minto Pyramid Principle (Barbara Minto, 1973)
---

# MECE — Foundation Principle

**MECE** (pronounced *mee-see*) = **M**utually **E**xclusive, **C**ollectively **E**xhaustive. A decomposition / grouping / list is MECE when:

- **Mutually Exclusive (ME)**: no two items overlap — every element belongs to exactly one bucket
- **Collectively Exhaustive (CE)**: the buckets together cover the entire space — no element is left out

## Authoritative source

- Coined by **Barbara Minto** at McKinsey in the 1960s, formalised in *The Pyramid Principle* (1973, latest ed. 2009): <https://www.barbaraminto.com/>
- Plain explainer: <https://en.wikipedia.org/wiki/MECE_principle>
- Don't re-author the philosophy — link out.

## Why this file is a `_foundation-` not a stage entry

MECE is **cross-cutting**. Every other framework in this directory invokes it:

- [`1-issue-tree.md`](./1-issue-tree.md) — decomposition tree must be MECE at each branching point
- [`1-first-principles.md`](./1-first-principles.md) — the set of "irreducible truths" should be MECE
- [`2-hypothesis-driven.md`](./2-hypothesis-driven.md) — competing hypothesis lists must be MECE
- [`2-five-whys.md`](./2-five-whys.md) — at each level the candidate causes should be MECE (then pick the most explanatory)
- [`3-pareto-80-20.md`](./3-pareto-80-20.md) — the "vital 20%" and "trivial 80%" buckets are MECE by construction
- [`3-two-by-two-matrix.md`](./3-two-by-two-matrix.md) — 4 quadrants must be MECE (2 axes, exhaustive coverage)
- [`5-minto-pyramid.md`](./5-minto-pyramid.md) — every grouping at every pyramid level must be MECE

So MECE doesn't deserve a stage slot — it's the gravity that pulls everything in this directory into shape.

## When to use it

Whenever you produce a list, a decomposition, a categorisation, a set of options, a set of buckets. Before you finish, ask:

- **Overlap check (ME)**: could any item I listed belong to two buckets at once? If yes, refine the bucket definitions or split / merge buckets.
- **Coverage check (CE)**: is there anything in the real problem that doesn't fit any bucket? If yes, add a bucket (often "Other / not yet categorised" is a legitimate bucket — but be honest about its size).

## Anti-patterns (failures common in practice)

| Failure | Example | Fix |
| --- | --- | --- |
| Overlap | "We have 3 customer segments: enterprise / SMB / Japan" (Japan overlaps with both) | Re-axis: split by geography OR by size, not both at once |
| Gap | "Our risks are: tech risk / market risk" (missing: regulatory, financial, people) | Use a domain-checklist (PESTEL, RAID) to verify coverage |
| Wrong altitude | "Backend / Frontend / TypeScript" (mixed concerns: 2 tiers + 1 language) | Pick a single dimension and split exhaustively along it |
| Lazy "Other" | "Customers: enterprise / SMB / Other (90%)" | "Other" being the biggest bucket means the decomposition is broken |

## Worked example — applying MECE to *this directory*

The 9 thinking frameworks in this dir are organised by 5-stage workflow:

- ME: Each framework is in exactly one stage (no framework appears in two stages)
- CE: The 5 stages cover the problem-solving lifecycle from problem-framing to communication
- Within each stage: the 1–2 frameworks differ on a clear axis (e.g., Stage 1 = top-down Issue Tree vs bottom-up First Principles)

This is itself a MECE check. If we add a 10th framework, the first question is: which stage does it land in, and is the addition still ME within that stage?

## When NOT to use it

- **Brainstorming / divergent thinking**: MECE is convergent — it constrains. In ideation phases, drop MECE temporarily to maximize candidate generation, then re-apply during selection.
- **Continuous / fuzzy phenomena**: MECE works for categorical things. For continuous variables (e.g., customer satisfaction on a 1–10 scale) use histograms / distributions, not MECE buckets.
- **Inherently overlapping concepts**: some concepts genuinely overlap (e.g., "fast learner" and "good communicator" describe overlapping people-skills). Forcing MECE on inherently fuzzy concepts is procrustean.

## Related

- [`./README.md`](./README.md) — directory overview
- [`./5-minto-pyramid.md`](./5-minto-pyramid.md) — the parent framework that introduced MECE
