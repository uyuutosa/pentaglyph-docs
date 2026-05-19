---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
framework: Issue Tree (a.k.a. Logic Tree / Problem Tree)
stage: 1 — Frame the problem
binds: McKinsey problem-solving canon (Minto Pyramid Principle lineage)
---

# Issue Tree — Stage 1: Frame the problem (top-down)

Decompose a vague problem into a tree of progressively narrower sub-questions, each branching point MECE ([`_foundation-mece.md`](./_foundation-mece.md)). Leaf nodes are concrete, answerable sub-questions; the tree's root is the original problem.

## Authoritative source

- McKinsey problem-solving canon — codified externally in Barbara Minto, *The Pyramid Principle* (1973, 2009 ed.): <https://www.barbaraminto.com/>
- Plain explainers: <https://www.mckinsey.com/about-us/new-at-mckinsey-blog/the-mckinsey-mind-on-issue-trees>, <https://www.craftingcases.com/issue-tree/>
- Don't re-author — link out.

## When to use

- The problem is **vague or compound** ("our user retention is bad", "the system is slow") and needs to be broken into things you can actually investigate
- You're at the start of an investigation and need to **distribute branches across team members** (each leaf can be owned by one person)
- You want to **avoid jumping to a solution prematurely** — Issue Tree forces problem-framing before solutioning

## When NOT to use

- The problem is already concrete and well-bounded ("rotate this API key") — Issue Tree is overhead
- You suspect the **premises themselves are wrong** — use [`1-first-principles.md`](./1-first-principles.md) instead (Issue Tree assumes the framing is correct and just needs decomposition)
- The problem is a **single linear cause chain** — use [`2-five-whys.md`](./2-five-whys.md) (depth over breadth)

## Worked example — "Our weekly engagement report is taking too long to draft"

```text
Root: Weekly report takes >4 hours to draft (target: <1 hour)
├─ Data-gathering takes too long
│   ├─ Status info scattered across Slack / commits / ADO?     [investigate]
│   ├─ Manual aggregation from multiple sources?               [investigate]
│   └─ Wait time for input from team members?                  [investigate]
├─ Writing itself takes too long
│   ├─ No template — start from blank page each time?          [investigate]
│   ├─ No clear audience / purpose, so over-writing?           [investigate]
│   └─ Wrestling with prose structure?                         [investigate]
└─ Review / revision takes too long
    ├─ No clear DoD on what "done" means?                      [investigate]
    ├─ Approver review cycle is slow?                          [investigate]
    └─ Format polish (tables / links) takes long?              [investigate]
```

Each leaf is now a concrete investigation (Stage 2). The tree reveals that the problem has 3 distinct root causes (data, writing, review) — fixing only one won't move the needle.

## MECE check at each branching point

For the above tree, ask at each level:
- Are the 3 children at root level mutually exclusive? **Yes** — data-gathering, writing, review are distinct phases
- Do they collectively exhaust the cause space? **Mostly** — could also be "personal factors: tired / busy"; legitimate to add or note as "out of scope"

If a level fails MECE, fix the level before going deeper.

## Common failures

| Failure | Example | Fix |
| --- | --- | --- |
| Solution-tree, not issue-tree | Root: "We should add caching" (already a solution, not a problem) | Re-root at the actual problem: "API responses are slow" |
| Inconsistent altitude | Children mix high-level themes and specific bugs | Pick one altitude per level; the next altitude goes one level deeper |
| Not MECE | Children overlap or leave gaps | See [`_foundation-mece.md`](./_foundation-mece.md) |
| Too deep too fast | 7-level tree, leaves are atomic micro-tasks | Stop at "investigatable" altitude — let Stage 2 do the deeper work |

## Related

- [`./README.md`](./README.md) — directory overview + decision tree
- [`./_foundation-mece.md`](./_foundation-mece.md) — MECE principle (used at every branching point)
- [`./1-first-principles.md`](./1-first-principles.md) — alternative Stage-1 framework (bottom-up)
- [`./2-hypothesis-driven.md`](./2-hypothesis-driven.md) — pairs with Issue Tree (hypothesize at each leaf, test fastest)
