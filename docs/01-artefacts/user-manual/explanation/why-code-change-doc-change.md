---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-17
diataxis: explanation
audience: anyone weighing whether the rule is worth the friction
---

# Why *code change → doc change* is the central rule

> **What this is:** the long-form argument for the one rule pentaglyph treats as non-negotiable. If you accept this rule, everything else in the kit follows. If you reject it, nothing else matters.

The rule, verbatim from [`WORKFLOW.md`](../../../../template/docs/WORKFLOW.md):

> **Code change implies doc change in the same PR. No exceptions beyond trivial typos.**

This page exists for the moments — usually in week three or four of adoption — when the rule starts to feel like overhead and someone asks *"can we just relax it for this one PR?"* The answer is no, and the reasoning is below.

---

## The failure mode the rule prevents

Imagine a codebase without the rule. The lifecycle of a piece of documentation looks like this:

1. **Day 0.** A developer writes `docs/auth.md` describing the authentication module. The doc is accurate. It is reviewed and merged with the code that implements it.
2. **Day 14.** Someone changes the auth handler to add a new error case. The doc is not updated — *"it is just an extra error, the rest is still accurate"*.
3. **Day 60.** Someone refactors auth to support OAuth. The doc still says "API key only". The refactor PR is approved because the reviewer trusts the code; nobody reads `auth.md` in PR review.
4. **Day 120.** A new hire reads `auth.md` to learn the system. They write code based on a description that is **40% wrong**. The wrong 40% is what causes the next production incident.
5. **Day 180.** Someone proposes deleting `auth.md` because *"it is misleading"*. The proposal is approved. The team concludes that *"docs do not work"*.

This trajectory is not hypothetical. It is the modal outcome of every doc system that does not have the rule. The team is not lazy and the docs are not bad — the **feedback loop between code and doc is broken**, and once broken it decays monotonically.

The rule fixes the feedback loop by **shortening the loop to zero**: the doc update is in the same PR as the code that invalidates it. There is no day-14, day-60, day-120. The doc cannot drift because every drift-event also touches the doc.

---

## Why "we will update the docs later" fails

The most common counter-proposal is: *"can we batch doc updates? Code in PRs, docs in a weekly sweep?"*

This sounds reasonable. It fails for three reasons:

### 1. Context decays in days, not weeks.

When you write the code, you remember *why* you made the choices you made — which alternatives you rejected, what edge cases you considered, what the new error case actually means. Five days later that context is 70% gone. Two weeks later it is 95% gone. By the time the weekly sweep happens, the developer is no longer the person who wrote the code — they are a reconstructor working from `git log`.

A doc written by a reconstructor is worse than no doc. It reads with authoritative voice but lacks the load-bearing details only the original author had.

### 2. Batched updates inherit the wrong granularity.

A PR is the right unit of *coherent change*. A weekly sweep is just a time window. When you batch doc updates, you have to *re-discover* which docs each code change affected — and the discovery is harder than the original update would have been, because the diffs have already merged and you are now working from a multi-day delta.

The rule keeps doc work at PR granularity precisely because that is the granularity at which the code change is comprehensible.

### 3. Nobody owns the sweep.

In every team that has tried batching, the weekly sweep is owned by *whoever has time*. Whoever has time changes week to week. Coverage gaps appear immediately. By month three the sweep is informal, by month six it has stopped, and by month nine the team is saying *"docs do not work for us"*.

The rule eliminates the sweep entirely. There is no separate owner of doc currency; the owner is whoever writes the PR.

---

## Why the rule has teeth (and why teeth matter)

The rule is not aspirational. It is enforced in three places:

| Where | What | How |
| --- | --- | --- |
| **PR review** | Diffs that change `src/` without changing the matching `docs/` file are sent back | Quote `WORKFLOW.md §2` (the Code change → doc update mapping) at the author |
| **AI agent prompts** | An agent runs the *audit my diff* prompt before push | See [how-to/prompt-cookbook.md §6](../how-to/prompt-cookbook.md#6-audit-a-diff-for-missing-doc-updates) |
| **Optional CI** | A hook runs `pentaglyph metrics` (or equivalent) to detect doc-source pairs that drifted | Project-specific |

Teeth matter because **discipline without enforcement decays**. Every team that has ever tried a "we agree to update docs" policy has discovered the half-life is about three weeks. The teeth replace social discipline with structural enforcement.

The rule is also load-bearing for *every other rule in the kit*. Front-matter only matters if someone updates `last-reviewed:` when they change the doc. Templates only matter if they are reached for when a new doc is needed. The decision tree only matters if it is invoked at PR time. All of these presuppose the central rule.

---

## What "doc change" actually means in practice

The rule is sometimes objected to as too coarse — *"my one-line bugfix does not justify a doc change."* The objection misreads the rule. "Doc change in the same PR" can be any of:

- **A real update** — if the code change shifted observable behaviour, the corresponding `detailed-design/<module>.md` needs an update.
- **A `last-reviewed:` bump** — if you re-read the doc and confirmed it is still accurate, change the front-matter date. This is a *positive* signal, not a no-op.
- **A new ADR** — if the code change made an architectural choice (even implicitly), record it.
- **A new postmortem entry** — if the code change is a fix for an incident, the incident gets a postmortem entry.
- **A diagram regeneration** — if the change touched a building block in the C4 model, regenerate the SVG.
- **Genuinely nothing** — for typo fixes, comment-only changes, dependency bumps, lint-only changes. The rule's *"no exceptions beyond trivial typos"* clause covers these.

The "trivial typo" exception exists precisely so the rule does not become a parody of itself on commits that obviously cannot change behaviour. It is **narrow** by design — typo / formatting / comment-only / lint. Anything that changes runtime behaviour, even by one character, is in scope.

---

## Why AI agents make the rule more important, not less

A naïve reading is: *"AI agents can write docs faster, so the cost of the rule is lower, so we do not need teeth."*

The actual situation is the opposite. AI agents make the rule **more** important:

1. **They write code faster than they reason about it.** A human writing OAuth code thinks about what they are doing for hours and the doc update is a 10% tax. An AI agent writes the same code in two minutes and the doc update is a 50% tax. Without enforcement, the agent will optimise the tax to zero.

2. **They have no memory across sessions.** Without docs, the agent's next session re-derives architecture from code. The result is *plausible-looking* but locally-inconsistent code, because the agent re-picks design defaults each time.

3. **They generate plausible-but-wrong docs without supervision.** The right response is not "stop using AI for docs"; it is "force the doc update into the same PR as the code, where the human reviewer is already paying attention to the code". The same review pass catches both.

The combination of *high code volume* + *no agent memory* + *plausible-but-wrong doc generation* is exactly the failure mode the rule prevents. Pre-AI teams could survive a slack documentation policy on willpower alone. Post-AI teams cannot.

---

## The two genuine objections

### Objection 1: "It slows us down on the critical path."

True, in the short term. A PR that took 20 minutes now takes 25. Multiplied across a team and a year, that is meaningful.

The break-even point in practice is around month three. Below that, the rule feels like overhead. Above it, removing the rule would feel like removing the test suite — possible in principle, painful in practice.

The mathematics: a 25% PR tax is paid on every PR. The reward is fewer GroundHog Day debates (each one ~6 person-hours), faster onboarding (each new hire saves ~1 week), and fewer regressions caused by stale-doc-led wrong assumptions (each one variable, often days). For a team shipping ~50 PRs/week with monthly hires and weekly incidents, the rule pays for itself in roughly six weeks.

### Objection 2: "Docs are not actually read; updating them is theatre."

This objection contains a real diagnosis (docs that nobody reads are wasted), but the wrong remedy (stop writing docs). The right remedy is to write *fewer* docs and update them rigorously.

Pentaglyph already does this — the kit has 13 templates but most projects use 5–6 of them. Each one has a specific reader role (PRD → product team, ADR → architects, Module DD → implementers, Use Case → designers, API contract → consumers). The rule guarantees the docs that *do* exist are accurate. That is what makes them worth reading.

If a doc in your repo is not being read, the answer is to delete it (mark as Superseded, link to a successor or remove the topic). The answer is not to let it rot.

---

## What happens when the rule is broken

Once or twice, nothing. The rule has slack — a single missed doc update is recoverable by a follow-up PR.

But the rule has a **threshold**. Once roughly 10–15% of a repo's durable docs are out of date, the team starts to assume *all* docs may be wrong. At that point the docs lose their reference function — they become decorative, and the team's behavioural pattern flips from *"check the doc"* to *"check the code, the doc is probably wrong"*.

That flip is hard to reverse. It usually requires either a documentation bankruptcy (delete most of the docs, start over) or a months-long catch-up effort. Both are expensive.

The rule exists to keep you well below the threshold. Strict enforcement when the cost is low (25% PR tax) prevents the catastrophic cost (documentation bankruptcy) later.

---

## Practical advice

If you are adopting pentaglyph on an existing project:

1. Adopt the rule *forward* only. Past PRs do not need retrofitting.
2. Write the [audit-my-diff prompt](../how-to/prompt-cookbook.md#6-audit-a-diff-for-missing-doc-updates) into your team's PR template or pre-push hook.
3. The first five PRs that go through the rule will feel awkward. By PR six, the doc update is automatic.
4. When someone proposes "let us skip the rule on this one PR" — they are testing whether the rule has teeth. The right response is *"no — and if the doc update is genuinely a 5-minute job, let us do it now"*. The right response is **not** *"yes just this once"*.

If you are evaluating whether to adopt pentaglyph at all:

- If the rule sounds intolerable, pentaglyph is probably not for you. The rest of the kit is decoration without it.
- If the rule sounds tolerable but onerous, you are the target audience. The kit makes the rule cheap enough to actually follow.
- If the rule sounds obvious, you are already paying the cost of *not* having it elsewhere. Pentaglyph just makes the existing discipline cheaper.

---

## Related

- [`../../../../template/docs/WORKFLOW.md §2`](../../../../template/docs/WORKFLOW.md#2-code-change--doc-update-mapping) — the canonical Code change → doc update mapping
- [why-pentaglyph.md](./why-pentaglyph.md) — the broader argument for the kit as a whole
- [`../how-to/prompt-cookbook.md §6`](../how-to/prompt-cookbook.md#6-audit-a-diff-for-missing-doc-updates) — the agent-side enforcement prompt
- [`../how-to/use-with-claude-code.md`](../how-to/use-with-claude-code.md) — daily workflow that bakes the rule in
