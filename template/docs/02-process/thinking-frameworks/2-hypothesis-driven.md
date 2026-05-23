---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
framework: Hypothesis-Driven Approach (a.k.a. Hypothesis-Driven Problem Solving)
stage: 2 — Investigate / diagnose
binds: McKinsey problem-solving canon, scientific method
---

# Hypothesis-Driven Approach — Stage 2: Investigate (top-down)

Start with a **candidate answer** to the problem, then design the **fastest tests** that would falsify it. If the hypothesis survives the tests, you have a defensible answer; if it dies, you have a sharper next hypothesis. This compresses investigation time vs. exhaustive search.

## Authoritative source

- McKinsey problem-solving canon: <https://www.mckinsey.com/about-us/new-at-mckinsey-blog/the-mckinsey-mind-on-hypothesis-driven-thinking>
- Pragmatic explainer: <https://www.craftingcases.com/hypothesis-driven-approach/>
- Scientific-method foundation: <https://en.wikipedia.org/wiki/Scientific_method>
- Don't re-author — link out.

## When to use

- The problem **space is large** and exhaustive investigation would take too long
- You have **enough domain intuition** to form a candidate answer worth testing (don't fake hypotheses — make a real bet)
- The team is **time-constrained** — fast falsification beats slow exhaustive analysis
- The investigation is **iterative** — early hypotheses inform later ones

## When NOT to use

- You **truly have no idea** — premature hypothesis-locking risks confirmation bias; start with [`1-issue-tree.md`](./1-issue-tree.md) instead
- The problem is a **single linear cause chain** — use [`2-five-whys.md`](./2-five-whys.md) (5 Whys traces from symptom backward; this approach starts at the candidate answer and tests forward)
- You're in **discovery / open-ended exploration** — hypothesis-driven is convergent; ideation needs divergent thinking first

## Worked example — "Why is BF-01 Sprint completion slipping?"

**Step 1 — form hypothesis**:
> *Hypothesis*: The slip is caused by Q-13 / Q-14 (AWS account access) blocking >50% of the Sprint's planned tasks. If we get the answer this week, slip closes by Sprint 2.

**Step 2 — design the fastest falsification tests**:
- Test A (cheap): count Sprint backlog items blocked on AWS — if <50%, hypothesis dies
- Test B (medium): for unblocked items, are they on track? If yes, hypothesis survives. If they're also slipping, second cause exists
- Test C (expensive): if hypothesis dies, what's the next candidate? (Bedrock model approval? agui-keel refactor? team capacity?)

**Step 3 — run cheapest test first**:
- Test A result: 6 of 10 backlog items blocked on AWS → 60% → hypothesis survives

**Step 4 — refine or commit**:
- Hypothesis is alive; now ask "what's the fastest path to unblock?" — not "do more analysis on whether AWS is the cause" (that's already settled). Investigation efficiency comes from *not re-litigating settled hypotheses*.

## The discipline: test order matters

Rank tests by **cost ÷ falsification power** (cheap-to-run + high-discrimination tests first). A test that takes 1 hour and would 80% falsify the hypothesis beats a test that takes 1 day and would 30% falsify it.

## Common failures

| Failure | Example | Fix |
| --- | --- | --- |
| Confirmation bias | Run only tests that *confirm* the hypothesis | Design 1+ test that would *kill* the hypothesis — and run it first |
| Fake hypothesis | "I hypothesise that the issue is complex" (not a testable claim) | Hypothesis must be falsifiable: "X is the dominant cause because of Y, and we'd see Z if it weren't" |
| Hypothesis locking | First hypothesis dies, but team keeps refining variants instead of stepping back | After 2 failed hypotheses on a topic, fall back to [`1-issue-tree.md`](./1-issue-tree.md) |
| No "now what?" plan | Run the test, get the answer, no plan for what to do with it | Every hypothesis statement includes the action implication: "if true → X, if false → Y" |

## How to phrase a hypothesis (template)

> *I hypothesise that **[cause / answer]** is the dominant explanation for **[observed problem]**, because of **[reasoning / domain intuition]**.*
> *If true, we should see **[predicted evidence]** when we **[test]**. If false, we should see **[counter-evidence]**.*
> *Action if true: **[next step]**. Action if false: **[fallback hypothesis or different investigation]**.*

## Related

- [`./README.md`](./README.md) — directory overview + decision tree
- [`./_foundation-mece.md`](./_foundation-mece.md) — competing hypotheses should be MECE
- [`./1-issue-tree.md`](./1-issue-tree.md) — pairs with hypothesis-driven (Issue Tree leaves become hypotheses, hypothesis-driven prioritises which leaf to test)
- [`./2-five-whys.md`](./2-five-whys.md) — alternative Stage-2 framework (bottom-up symptom-to-cause tracing)
