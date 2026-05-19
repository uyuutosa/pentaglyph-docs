---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
framework: 2x2 Matrix (a.k.a. Quadrant Diagram)
stage: 3 — Prioritize
binds: BCG Growth-Share Matrix (1970), Eisenhower Matrix (1954), various consulting-firm staples
---

# 2x2 Matrix — Stage 3: Prioritize (2-D positioning)

Position candidate items on **two orthogonal axes** to surface 4 quadrants, then act on quadrant-specific advice. Classic axes: Importance × Urgency (Eisenhower), Growth × Market-share (BCG), Effort × Impact (PM standard), Reach × Confidence (RICE-lite).

## Authoritative source

- **Eisenhower Matrix** (Importance × Urgency): <https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method>
- **BCG Growth-Share Matrix** (1970): <https://www.bcg.com/about/overview/our-history/growth-share-matrix>
- General 2x2 culture in consulting: McKinsey / Bain / BCG — every strategy slide deck has them
- Don't re-author specific matrix templates — pick the right axes for the question and link to the established named matrix when applicable.

## When to use

- Candidate items have **>1 important dimension** that affects how to handle them (impact alone isn't enough; effort matters too)
- The choice differs **categorically by quadrant** (e.g., "Do now" vs "Schedule" vs "Delegate" vs "Drop")
- You need a **visual artefact** that stakeholders can argue about (positioning on the matrix is a discussion forcing function)

## When NOT to use

- **1 dimension is enough** — use [`3-pareto-80-20.md`](./3-pareto-80-20.md) (simpler)
- **>3 dimensions** matter — 2x2 forces you to drop dimensions; consider RICE / weighted scoring instead
- Items are **inherently uncomparable** (different problems entirely) — don't force them into the same matrix
- You only have **2–3 items** — just discuss them; matrix is overkill

## Worked example — Stage 1 thinking framework selection (the meta-version)

Suppose you're choosing which thinking framework to teach the team first. Axes: **Learning Difficulty** × **Frequency of Use**.

```text
                    Low Frequency        High Frequency
                  ┌────────────────────┬────────────────────┐
   Hard to        │                    │                    │
   Learn          │  First Principles  │  Issue Tree        │
                  │  (Quadrant 2:      │  (Quadrant 1:      │
                  │  defer until       │  invest deeply;    │
                  │  needed)           │  highest ROI)      │
                  ├────────────────────┼────────────────────┤
   Easy to        │                    │                    │
   Learn          │  OODA Loop         │  MECE / SCQA       │
                  │  (Quadrant 4:      │  (Quadrant 3:      │
                  │  pick up           │  teach immediately;│
                  │  opportunistically)│  cheap + frequent) │
                  └────────────────────┴────────────────────┘
```

Action by quadrant:
- **Q1 (high freq + hard)**: invest heavy training, build internal examples
- **Q2 (low freq + hard)**: bookmark, defer until a real need surfaces
- **Q3 (high freq + easy)**: teach in next team meeting, expect immediate uptake
- **Q4 (low freq + easy)**: no urgency, picked up on the job

This is itself a 2x2 application — the framework choosing the rollout order is named (Importance-Urgency-style, axes substituted).

## How to design good axes

1. **Orthogonal**: the two axes must measure independent things. "Impact" and "Value" are nearly synonyms — bad. "Impact" and "Effort" are independent — good.
2. **Actionable thresholds**: there must be a meaningful split between "high" and "low" on each axis. If everything is "medium", the matrix produces no signal.
3. **Action differs by quadrant**: if all 4 quadrants would result in the same action, the matrix isn't useful.

## Named matrices worth knowing

| Name | Axes | Use |
| --- | --- | --- |
| Eisenhower | Importance × Urgency | Personal task triage |
| BCG Growth-Share | Market growth × Relative market share | Product portfolio decisions |
| Effort × Impact | Effort to build × Expected impact | Engineering prioritization |
| Reach × Confidence | Reach (how many affected) × Confidence (sure of impact?) | PM / experiment prioritization (RICE-lite) |
| Importance × Stakeholder Interest | Stakeholder importance × Interest in this initiative | Engagement planning |
| Probability × Impact | Risk likelihood × Risk consequence | Risk register triage (see [`../../client-engagement/raid.md`](../../client-engagement/raid.md)) |

## Common failures

| Failure | Example | Fix |
| --- | --- | --- |
| Non-orthogonal axes | Impact × Value (nearly same) | Pick independent axes |
| Items cluster in one quadrant | Everything in "high-impact, high-effort" — no signal | The thresholds are wrong; recalibrate "high" vs "low" relative to this sample |
| Forced 2-D where 1-D would do | Single dimension actually drives the decision | Use [`3-pareto-80-20.md`](./3-pareto-80-20.md) instead |
| No action by quadrant | Matrix is drawn but no one says what to do per quadrant | Define action-per-quadrant *before* placing items |

## Related

- [`./README.md`](./README.md) — directory overview + decision tree
- [`./_foundation-mece.md`](./_foundation-mece.md) — 4 quadrants are MECE by axis construction
- [`./3-pareto-80-20.md`](./3-pareto-80-20.md) — alternative Stage-3 framework (1-D ranking; simpler when sufficient)
