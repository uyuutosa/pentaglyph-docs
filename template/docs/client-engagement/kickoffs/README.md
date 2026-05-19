---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
---

# `kickoffs/` — cycle kickoff narratives

This directory holds **cycle kickoff messages** paired with the cycle Heartbeats in [`../01-artefacts/reports/`](../01-artefacts/reports/). Pattern adopted from **Basecamp's Kickoffs and Heartbeats** (<https://37signals.com/podcast/kickoffs-and-heartbeats/>): every cycle opens with a forward-looking Kickoff narrative ("what we're going to do in this cycle and why") and closes with a backward-looking Heartbeat narrative ("what we did this cycle, what we learned, what's next").

## Why kickoffs exist as a separate slot

The weekly `weekly.md` is mechanical. The cycle-end `heartbeat.md` is retrospective. Neither is the right place for the cycle-start *forward-looking commitment*. A separate kickoff file:

- Sets stakeholder expectations for the cycle at its start, not after the fact
- Gives the Heartbeat author something concrete to measure the cycle against
- Records the team's *intent* before reality intrudes — useful for learning

## When to write a kickoff

- At the start of every cycle (whatever the engagement cadence is — 4 weeks, 6 weeks, monthly).
- Optionally at the start of a new initiative that doesn't align with a cycle boundary.

## File naming

`YYYY-MM-DD_cycle-<n>.md` where `<n>` is the cycle number within the engagement.

## Structure (recommended)

1. **Cycle theme** — 1-2 sentence headline ("what this cycle is *about*").
2. **Commitments** — items from `NOW-NEXT-LATER.md` *Now* bucket, with named owners.
3. **Open questions to resolve this cycle** — pointers into `questions/` and `daci/`.
4. **Risks we're flagging upfront** — pointers into `raid.md`.
5. **Out of scope for this cycle** — what's deferred to the next *Next* bucket.
6. **Communication plan** — any cadence variations for this cycle (e.g., "no weekly during week 3 due to client holiday").

## Lifecycle

Kickoffs are **volatile**, like reports. Never edited after publication. The Heartbeat at cycle end *responds* to the Kickoff — that's where the learning is captured, not by editing the Kickoff.

## Cross-references

- [`../01-artefacts/reports/YYMMDD/heartbeat.md`](../01-artefacts/reports/) — closing narrative for the cycle this Kickoff opens
- [`../NOW-NEXT-LATER.md`](../NOW-NEXT-LATER.md) — *Now* bucket items become Kickoff commitments
- [`../raid.md`](../raid.md) — risks flagged in Kickoff §4

## Related

- [`../README.md`](../README.md) — PEL overview
- Basecamp Kickoffs & Heartbeats podcast: <https://37signals.com/podcast/kickoffs-and-heartbeats/>
- Basecamp Shape Up Ch 14 ("Decide When to Stop"): <https://basecamp.com/shapeup/3.5-chapter-14>
