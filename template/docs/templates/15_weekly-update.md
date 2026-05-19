---
status: Draft
owner: <placeholder>
last-reviewed: <YYYY-MM-DD>
---

# Weekly Update Template (Type 15 / Atlassian 4-block)

> **Copy to use**: `cp templates/15_weekly-update.md client-engagement/reports/<YYMMDD>/weekly.md`
> Recommended location: `client-engagement/reports/<YYMMDD>/weekly.md`
> Reference: [Atlassian Team Playbook — Weekly Team Updates](https://www.atlassian.com/team-playbook/plays/weekly-team-updates)
> Length target: **1 page** (300–600 words, ≤ 5 min read)
>
> **What it is**: the de-facto AI-friendly "weekly status update" structure — *Priorities → Progress → Problems → Next*. Atlassian formalised it, every LLM produces it zero-shot, every PM-tool template (Notion, Linear, Asana) defaults to a variant of it.
>
> **When to write it**: every week the engagement is active. Skip only with explicit reason recorded in `OPERATING-AGREEMENT.md` (e.g., client holiday).
>
> **Discipline**: brevity. The weekly is mechanical and scan-able. Save narrative for the cycle Heartbeat ([`16_heartbeat.md`](./16_heartbeat.md)). If you find yourself writing >1 page of weekly, those paragraphs probably belong in the Heartbeat.
>
> Delete this `> ...` guidance block after copying.

---

# Weekly Update — `<client>` / `<YYYY-MM-DD>`

| Metadata | Value |
| --- | --- |
| Report period | `<YYYY-MM-DD>` – `<YYYY-MM-DD>` |
| Author | `<engagement lead>` |
| Cycle | `<cycle-N, week N of M>` |
| Cycle theme | `<from kickoffs/cycle-N.md>` |

---

## 1. Priorities (this week's focus)

<!-- 3-5 bullets. What we said we'd focus on this week.
     If something here didn't come from last week's "Next" section, explain why. -->

- `<priority 1>` — `<owner>`
- `<priority 2>` — `<owner>`
- `<priority 3>` — `<owner>`

## 2. Progress (what shipped / advanced)

<!-- What actually moved forward this week.
     Each item ties back to a NOW-NEXT-LATER.md row or a `daci/` decision.
     One line per item. Link to artefacts (PRs, deploys, docs). -->

- ✅ `<item>` — `<short outcome>` (`<link>`)
- ⏩ `<item>` — `<partial progress>` (`<link>`)
- 🔄 `<item>` — `<in flight>` (`<link>`)

Legend: ✅ = shipped / closed, ⏩ = advanced significantly, 🔄 = in flight without major movement.

## 3. Problems (where we're stuck or worried)

<!-- Where we hit friction, made a wrong assumption, or have an unresolved blocker.
     Honesty over polish. Every problem should map to either a `raid.md` row or a `questions/` entry. -->

- `<problem>` — `<what's blocking>` — linked to [`raid.md` `I-NNN`](../raid.md) | [`questions/Q-NNN.md`](../questions/)
- `<problem>` — `<what's blocking>` — linked to ...

If no problems this week, write "None this week" — but be skeptical: if you're never reporting problems, the channel is broken.

## 4. Next (next week's plan)

<!-- 3-5 bullets. What we plan to focus on next week.
     These become next week's "Priorities" section. -->

- `<next priority>` — `<owner>`
- `<next priority>` — `<owner>`
- `<next priority>` — `<owner>`

## Open client asks (if any)

<!-- Things the client needs to do or decide for us to make progress.
     One row per ask. Map to questions/ or daci/. -->

| Ask | Owner (client side) | By when | Linked |
| --- | --- | --- | --- |
| `<ask>` | `<client contact>` | `<YYYY-MM-DD>` | [`questions/Q-NNN.md`](../questions/) |

---

## References

- [Atlassian Weekly Team Updates play](https://www.atlassian.com/team-playbook/plays/weekly-team-updates)
- [`../README.md`](../README.md) — PEL overview
- [`../NOW-NEXT-LATER.md`](../NOW-NEXT-LATER.md) — current roadmap
- [`../raid.md`](../raid.md) — open items table
- [`../kickoffs/`](../kickoffs/) — cycle kickoff narratives (for cycle theme)
- [`../reports/<YYMMDD-prev>/weekly.md`](./) — previous week (for Next → Priorities continuity)
