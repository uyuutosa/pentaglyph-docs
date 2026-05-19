---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
framework: 5 Whys (a.k.a. Five Whys / 5W)
stage: 2 — Investigate / diagnose
binds: Sakichi Toyoda — Toyota Production System
---

# 5 Whys — Stage 2: Investigate (bottom-up symptom-to-cause)

Repeatedly ask **"why?"** — at least five times — starting from an observed symptom, to trace the chain of cause and effect down to a **root cause**. Each answer becomes the next "why?" subject.

## Authoritative source

- Coined by **Sakichi Toyoda** (founder of what became Toyota Industries), formalised in **Toyota Production System** by Taiichi Ohno: <https://en.wikipedia.org/wiki/Five_whys>
- Toyota's own description: <https://global.toyota/en/company/vision-and-philosophy/production-system/>
- *(Cultural note: this framework originated in the same Toyota lineage as Toyoda Gosei, the client engagement this kit was first dogfooded against.)*
- Don't re-author — link out.

## When to use

- A **specific incident or symptom** has occurred and you need to understand *why* before fixing
- The cause chain is **linear** (one cause leads to the next), not a tree with multiple parallel branches
- The team's instinct is to **patch the symptom** — 5 Whys forces them past the surface
- Especially good for **post-incident postmortems** (see [`../../postmortems/`](../../postmortems/))

## When NOT to use

- The problem has **multiple parallel root causes** — 5 Whys's linear chain will miss most of them; use [`1-issue-tree.md`](./1-issue-tree.md) instead
- The problem is **systemic / cultural** — 5 Whys tends to bottom out at "lack of training" or "human error" which are dead ends; you need a different framing
- You're at **start of a project** with no symptoms yet — 5 Whys is reactive, not designive

## Worked example — "Weekly status report missed its publish deadline"

1. *Why was the weekly status report missed?*
   - Because the engagement lead ran out of time on Friday afternoon.
2. *Why did the engagement lead run out of time?*
   - Because gathering input from 4 team members took 3 hours instead of the planned 1 hour.
3. *Why did input-gathering take 3 hours?*
   - Because the team members reply async over Slack and each thread took 20-40 min of back-and-forth to extract what was needed.
4. *Why is it back-and-forth instead of one-shot?*
   - Because the engagement lead's question prompt is open-ended ("how did your week go?") and answers ramble; lead then has to ask follow-ups to extract the structured fields the report needs.
5. *Why is the prompt open-ended?*
   - Because there's no shared template that names the 4 fields the weekly report needs (Priorities / Progress / Problems / Next).

**Root cause**: missing async-update template with named fields.

**Fix**: introduce a Slack pinned message with the 4 fields; team replies inline; lead aggregates rather than interrogates. Estimated effort: 30 min. Estimated savings: 2 hours per week.

Compare to a non-5-Whys fix: "engagement lead should start earlier on Friday" — treats symptom, doesn't change the structural cause.

## The discipline: "why" not "who"

5 Whys is a **process** investigation, not a blame investigation. Re-phrase any "why didn't person X do Y?" as "why did the **process** allow Y to be missed?" — the goal is to fix the system, not the person.

## When to stop "why?"-ing

Stop when:

- You hit a **root cause that's actionable** (you can name a specific change that would prevent the chain from re-occurring)
- You hit a **decision someone made deliberately** (further "why?" enters opinion territory)
- You hit "**because of how the universe works**" — you've gone too deep; back up one step

The number "5" is heuristic — sometimes 3 is enough, sometimes 7+ is needed. If you stop at 1–2, you're treating symptoms.

## Common failures

| Failure | Example | Fix |
| --- | --- | --- |
| Stop at "human error" | "Why? Because someone made a mistake." (dead-end) | Continue: "why did the process let a single human mistake cause this?" |
| Branch instead of chain | At "why?" #3, multiple parallel causes appear | Note the branch, drill the most explanatory one; sibling branches deserve their own 5 Whys |
| Speculation, not evidence | Each "why?" answer is a guess, not confirmed | At each step, ask "what evidence supports this answer?" — if none, you have a *hypothesis* not a finding (jump to [`2-hypothesis-driven.md`](./2-hypothesis-driven.md)) |
| Blame disguised as "why" | "Why did Bob skip the review?" | "Why does the process not require a 2nd reviewer for this category?" |

## Integration with postmortems

This kit's [`../../postmortems/`](../../postmortems/) directory expects every Medium+ postmortem to include a 5 Whys section. The post-mortem template (when added) should reference this file as the canonical method.

## Related

- [`./README.md`](./README.md) — directory overview + decision tree
- [`./_foundation-mece.md`](./_foundation-mece.md) — at each "why?" level, candidate causes should be MECE before picking the most explanatory
- [`./2-hypothesis-driven.md`](./2-hypothesis-driven.md) — alternative Stage-2 framework (top-down hypothesis testing)
- [`./1-issue-tree.md`](./1-issue-tree.md) — use Issue Tree when causes are parallel (tree), use 5 Whys when causes are sequential (chain)
