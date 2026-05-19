---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
framework: 80/20 Rule (Pareto Principle)
stage: 3 — Prioritize
binds: Vilfredo Pareto (1896) / Joseph Juran (popularised 1940s)
---

# 80/20 (Pareto) — Stage 3: Prioritize (1-D ranking)

**~80% of effects come from ~20% of causes.** Rank candidate actions / items by their contribution to the outcome you care about; concentrate on the top ~20% and explicitly deprioritize the rest. The exact ratio (90/10, 70/30, etc.) doesn't matter — the principle is *the distribution is uneven, so triage*.

## Authoritative source

- Origin: **Vilfredo Pareto** observed that 80% of Italian land was owned by 20% of the population (1896): <https://en.wikipedia.org/wiki/Pareto_principle>
- Popularised in management: **Joseph M. Juran**, *Quality Control Handbook* (1951)
- Modern essay: <https://fs.blog/the-pareto-principle/>
- Don't re-author — link out.

## When to use

- You have **a long list of candidate actions** and limited time / capacity
- The effect-distribution is **plausibly skewed** (most contexts are — uniform distributions are rare)
- The cost of *deliberate deprioritization* is lower than the cost of *spreading thin*
- You need a **defensible answer for stakeholders** asking "why aren't you doing X?" — "X is in the 80% tail; here's the 20% we're focused on" is a clear answer

## When NOT to use

- The list has **2–5 items** — just rank them by impact, no need for Pareto framing
- Outcomes are **inherently uniform** (e.g., compliance items where missing any one fails audit) — 80/20 breaks down
- You need **multi-dimensional positioning** (e.g., effort × impact, not just impact) → use [`3-two-by-two-matrix.md`](./3-two-by-two-matrix.md)
- You're in a **risk-mitigation context** where the 80% tail items could cascade catastrophically — 80/20 deprioritization is dangerous (long-tail risks)

## Worked example — Sprint 1 task triage

Sprint 1 had ~25 candidate tasks across INF / BE / FE / COMP / QA. Ranking by impact-on-Sprint-Goal:

```text
Top 20% (concentrate here):
  1. AWS account access (Q-14)              — blocks 6 other tasks
  2. Bedrock model access enable (Q-11)      — blocks demo hosting
  3. ADR 22-bundle acceptance (Q-12)         — unblocks audit trail
  4. chat-first MVP polish                   — only thing visible to client
  5. CodePipeline baseline                   — blocks all later infra

Long 80% tail (deprioritize):
  6-25. Various: doc cleanups, internal refactors, follow-up bugs,
        nice-to-have features, exploratory spikes, etc.
        → Deferred to Sprint 2 or backlog, explicitly communicated
```

The "deprioritize the 80%" decision is as important as the "focus on the 20%" decision — without explicit deprioritization, the team unconsciously tries to work the long tail.

## How to apply (5-minute version)

1. List **all candidate actions** (no editing yet)
2. For each, estimate **impact on the outcome you care about** (rough: High / Med / Low — don't over-quantify)
3. Sort by impact descending
4. Draw a line at the top ~20%
5. **Communicate**: "doing these N; explicitly deferring these M"

## Common failures

| Failure | Example | Fix |
| --- | --- | --- |
| Over-quantifying | "Let's score each item 0-100 on 5 dimensions" — analysis paralysis | High/Med/Low is enough; ranking matters, not absolute scores |
| Fake top-20% | The "top 5" includes low-impact items because they're easy / fun | Apply impact ruthlessly, then if all top-5 are equally easy, that's a bonus |
| Hidden long-tail work | "Top 5" stated, but team still touches the 80% in the background | Make deprioritization **explicit and communicated** — "we are not doing X, Y, Z this sprint" |
| Static Pareto | Run once at sprint start, ignore mid-sprint signal that the ranking is wrong | Re-rank mid-sprint if new info shifts the impact estimates |

## Pairing with other frameworks

- **After [`1-issue-tree.md`](./1-issue-tree.md)**: the issue tree's leaves form the candidate list; 80/20 ranks them
- **After [`2-hypothesis-driven.md`](./2-hypothesis-driven.md)**: candidate hypotheses ranked by "fastest path to falsification × highest decision-value"
- **Before [`4-ooda-loop.md`](./4-ooda-loop.md)**: Pareto picks which actions to put into the OODA cycle

## Related

- [`./README.md`](./README.md) — directory overview + decision tree
- [`./_foundation-mece.md`](./_foundation-mece.md) — top 20% / bottom 80% are MECE by construction
- [`./3-two-by-two-matrix.md`](./3-two-by-two-matrix.md) — alternative Stage-3 framework (when 1-D ranking isn't enough)
