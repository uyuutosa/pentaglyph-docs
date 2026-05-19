---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
framework: OODA Loop (Observe-Orient-Decide-Act)
stage: 4 — Decide & act
binds: John Boyd (USAF Colonel, 1976)
---

# OODA Loop — Stage 4: Decide & act (fast iteration)

A **decision-execution cycle**: **O**bserve → **O**rient → **D**ecide → **A**ct → (observe the result) → loop. The advantage goes to whoever can complete the cycle faster than the opposing actor or the changing environment.

## Authoritative source

- **John Boyd**, USAF Colonel, 1976 lecture series *Patterns of Conflict* (originally aerial-combat-derived): <https://en.wikipedia.org/wiki/OODA_loop>
- Pragmatic explainer: <https://fs.blog/ooda-loop/>
- Boyd's original briefing (PDF): <https://www.danford.net/boyd/essence.htm>
- Don't re-author — link out.

## When to use

- The **environment is changing faster** than your usual cadence (Sprint-level planning is too slow)
- You need to **act on imperfect information** — waiting for perfect data means losing the window
- The team has a **competitor / adversary** whose moves you must anticipate (market competition, security incident response, on-call firefighting)
- The decision will **iterate** — first action is not the last; rapid feedback shapes the next move

## When NOT to use

- The decision is **one-shot and irreversible** — slow it down, use [`5-minto-pyramid.md`](./5-minto-pyramid.md) to structure full analysis
- The environment is **stable** and there's time for thorough analysis → use [`2-hypothesis-driven.md`](./2-hypothesis-driven.md)
- The decision **needs broad consensus** before action (committee / governance contexts) — OODA optimises for speed, not consensus

## The four steps

| Step | What | Common failure |
| --- | --- | --- |
| **Observe** | Collect raw signal from environment | Drowning in data ("more dashboards please") — collect minimum-viable signal |
| **Orient** | Interpret signal against mental models / context — the heart of OODA | Skipping orientation; jumping straight from observation to decision |
| **Decide** | Pick the next action from the option-set surfaced by orientation | Decision paralysis — Boyd: "the cumulative effect of indecision is worse than any single bad decision" |
| **Act** | Execute the decision, then observe its effect (back to start) | Acting without instrumentation to observe the effect — open loop |

The **Orient** step is the most underrated. It's where mental models, prior experience, and domain intuition turn raw observation into actionable interpretation. Two people observing the same signal can orient differently and decide opposite things.

## Worked example — incident response

An on-call engineer gets a "high error rate" alert at 02:00.

**Cycle 1 (3 min)**:
- *Observe*: 5xx error rate spiked to 8% (baseline 0.1%); started 4 min ago
- *Orient*: recent deploy was 15 min ago; suspect deploy regression
- *Decide*: roll back the deploy
- *Act*: trigger rollback

**Cycle 2 (5 min after rollback)**:
- *Observe*: error rate dropped to 6%, still elevated; not the deploy alone
- *Orient*: must be a second cause; check upstream services
- *Decide*: page the upstream-service owner
- *Act*: page sent

**Cycle 3 (8 min later)**:
- *Observe*: upstream owner reports DB connection-pool exhaustion
- *Orient*: this is an unrelated upstream incident; our deploy regression was concurrent but smaller
- *Decide*: keep rollback in place; document the concurrent root causes
- *Act*: update incident channel

Three OODA cycles in ~16 minutes. Without OODA framing, a less experienced engineer might have stayed in *Observe* mode collecting more dashboards while error rates climbed.

## Tempo: the strategic edge

Boyd's key claim: **whoever cycles OODA faster wins** — even if their individual decisions are slightly worse. The slower actor is always reacting to a stale picture.

Implications for engineering teams:
- **Short feedback loops** (CI in minutes, observability in seconds) reduce OODA cycle time
- **Decentralised decision authority** — let the closest-to-signal actor decide, don't escalate every step
- **Postmortems** measure cycle time, not just outcome: was the slowdown in observe, orient, decide, or act?

## Common failures

| Failure | Example | Fix |
| --- | --- | --- |
| Observe-only loop | Team collects telemetry endlessly, no decisions get made | Time-box each cycle's observe step (5 min max, then orient or act) |
| Skip orient | Direct observe → act ("alert fires → restart service") | Force a 30-sec orient: "what does this signal *mean*?" |
| Sequential cycles, no learning | Each cycle's act doesn't inform the next | Capture the observation post-act *as part of the same cycle's record* |
| OODA-washing | Slow waterfall process re-labelled "OODA" | OODA cycles measured in minutes-to-hours, not weeks |

## Pairing with other frameworks

- **Inputs to OODA**: [`3-pareto-80-20.md`](./3-pareto-80-20.md) selects which action gets into the cycle
- **Wraps around OODA**: [`5-minto-pyramid.md`](./5-minto-pyramid.md) structures the post-incident summary that documents what the OODA loops produced
- **Failure mode**: if OODA cycles stop converging, fall back to [`1-issue-tree.md`](./1-issue-tree.md) — the framing might be wrong

## Related

- [`./README.md`](./README.md) — directory overview + decision tree
- [`./_foundation-mece.md`](./_foundation-mece.md) — the option-set considered in *Decide* should be MECE
- [`../../postmortems/`](../../postmortems/) — postmortem reviews include OODA-cycle-time analysis
- [`./5-minto-pyramid.md`](./5-minto-pyramid.md) — for the after-action narrative
