---
status: Draft
owner: <placeholder>
last-reviewed: <YYYY-MM-DD>
---

# Heartbeat Template (Type 16 / Basecamp Heartbeat + Amazon 6-pager prose discipline)

> **Copy to use**: `cp 01-artefacts/templates/16_heartbeat.md client-engagement/01-artefacts/reports/<YYMMDD>/heartbeat.md`
> Recommended location: `client-engagement/01-artefacts/reports/<YYMMDD>/heartbeat.md` (at cycle boundaries) · `client-engagement/01-artefacts/reports/narratives/YYYY-MM-DD_<topic>.md` (ad-hoc strategic memos)
> Reference: [What's in a Heartbeat — Jason Fried (37signals)](https://world.hey.com/jason/what-s-in-a-heartbeat-4fd72d0e) · [Kickoffs and Heartbeats — 37signals podcast](https://37signals.com/podcast/kickoffs-and-heartbeats/) · [Amazon 6-pager — sixpagermemo.com](https://www.sixpagermemo.com/blog/amazon-six-pager-template) · [Amazon Narratives — a16z podcast](https://a16z.com/podcast/amazon-narratives-memos-working-backwards-from-release-more/)
> Length target: **3–6 pages** (1,500–3,500 words, ≤ 20 min read)
>
> **What it is**: cycle-end narrative that ties the weekly updates together. **Basecamp Heartbeat** supplies the *shape* (forward-looking + backward-looking, celebratory but honest); **Amazon 6-pager** supplies the *prose discipline* (full sentences, no bullets-of-bullets, the writing forces the thinking).
>
> **When to write it**: at every cycle boundary (typically every 4–6 weeks per `OPERATING-AGREEMENT.md`). Ad-hoc strategic memos (e.g., "should we pivot the scope?") use the same template, filed under `01-artefacts/reports/narratives/`.
>
> **Discipline — prose, not bullets**: the Amazon 6-pager rule is no bullets except for true enumerations. The constraint is forcing function: prose reveals where your thinking is incomplete in a way that bullets hide. Read [Bryar & Carr "Working Backwards"](https://workingbackwards.com/) for the why.
>
> **Voice**: narrative tense, first person plural ("we shipped X", "we learned Y", "we're worried about Z"). Avoid corporate passive voice ("X was shipped").
>
> Delete this `> ...` guidance block after copying.

---

# Heartbeat — `<client>` / `<cycle>` / `<YYYY-MM-DD>`

| Metadata | Value |
| --- | --- |
| Report period | `<cycle start YYYY-MM-DD>` – `<cycle end YYYY-MM-DD>` |
| Author | `<engagement lead>` |
| Cycle | `<cycle-N>` |
| Cycle theme (set at kickoff) | `<from kickoffs/cycle-N.md>` |
| Cycle commitments (set at kickoff) | `<count and one-line summary>` |

---

## Opening narrative

<!-- 2-3 paragraphs of prose. What was this cycle *about*? What was the dominant story?
     Did the cycle play out the way the Kickoff predicted, or did reality intrude?
     If you can't write a coherent opening paragraph, the cycle didn't have a coherent theme. -->

<paragraph 1: what we set out to do and why>

<paragraph 2: the dominant story of the cycle — what shaped it, what shifted, what surprised us>

<paragraph 3 (optional): where we are now, in one sentence, ready to support the rest of the document>

---

## 1. What we shipped (the wins)

<!-- The substantive deliveries of the cycle. Written as prose, not as a checklist.
     For each delivery: what it is, why it mattered, who delivered it. -->

<paragraph: shipped item 1 + significance + credit>

<paragraph: shipped item 2 + significance + credit>

<paragraph: shipped item 3 + significance + credit>

A condensed inventory of smaller items shipped this cycle, for completeness:

- `<small item>` ([link](../...))
- `<small item>` ([link](../...))

## 2. What we learned

<!-- The cycle's discoveries. Not just technical learnings — also team-process, client-relationship, market-signal learnings.
     This is the section that compounds over the engagement: re-read prior Heartbeats and look for patterns. -->

<paragraph: learning 1 — what we now believe that we didn't believe at the cycle start>

<paragraph: learning 2 — pattern across multiple weeks>

<paragraph: learning 3 — counter-intuitive discovery>

## 3. Where we struggled

<!-- The cycle's friction. Honesty over polish — the Heartbeat is the institutional memory of what went wrong as much as what went right.
     Map each struggle to a `raid.md` row or a `decisions/` MADR showing how we're responding. -->

<paragraph: struggle 1 — what didn't go as planned, what we now do differently — link to [`../raid.md`](../../client-engagement/raid.md) or [`../decisions/`](../decisions/)>

<paragraph: struggle 2 — same shape>

<paragraph: struggle 3 — same shape>

## 4. The state of the engagement

<!-- One paragraph each on the durable health markers of the engagement.
     This is the "executive dashboard in prose" — written so a sponsor can read it once and know where things stand. -->

**Pace**: <are we ahead, on, or behind the charter timeline? Why?>

**Scope**: <is the original CHARTER NOT-list still holding? Have new items asked to be in scope?>

**Quality**: <are we meeting the quality bar in OPERATING-AGREEMENT §6? Where are we slipping?>

**Team**: <is the team intact, healthy, and right-sized? Any capacity changes coming?>

**Client relationship**: <where does the sponsor / decision-maker stand on the engagement? Any early warnings?>

## 5. Decisions made this cycle

<!-- One-line summaries of decisions archived to `decisions/` this cycle. The detail is in the MADR; this is the index.
     Group by decision class if there are >3. -->

| Date | Decision | MADR |
| --- | --- | --- |
| `<YYYY-MM-DD>` | `<one-line>` | [`../decisions/YYYY-MM-DD-<slug>.md`](../decisions/) |

## 6. Open questions and what we're asking from you

<!-- The forward-looking client-asks section. What the client needs to decide, provide, or confirm for the *next* cycle.
     Each item maps to questions/ or daci/. -->

| Ask | Why now | Latest expected | Linked |
| --- | --- | --- | --- |
| `<ask>` | `<context>` | `<YYYY-MM-DD>` | [`../questions/Q-NNN.md`](../questions/) / [`../daci/`](../daci/) |

## 7. Next cycle

<!-- One paragraph of forward narrative. Not a Gantt — a paragraph.
     Detailed cycle planning lives in the next [`../kickoffs/`](../kickoffs/) file, which is written separately as the cycle starts. -->

<paragraph: what we expect the next cycle to be about and why>

---

## References

- [Basecamp Heartbeat (Jason Fried)](https://world.hey.com/jason/what-s-in-a-heartbeat-4fd72d0e)
- [Amazon 6-pager structure](https://www.sixpagermemo.com/blog/amazon-six-pager-template)
- [`../README.md`](../README.md) — PEL overview
- [`../NOW-NEXT-LATER.md`](../../client-engagement/NOW-NEXT-LATER.md) — roadmap (Now/Next/Later) as of this Heartbeat
- [`../kickoffs/`](../kickoffs/) — cycle kickoff that opened this cycle
- [`../decisions/`](../decisions/) / [`../daci/`](../daci/) — decisions narrated above
- [`../raid.md`](../../client-engagement/raid.md) — risks / issues / dependencies surfaced this cycle
- previous Heartbeat — [`../01-artefacts/reports/<YYMMDD-prev-cycle>/heartbeat.md`](../01-artefacts/reports/)
