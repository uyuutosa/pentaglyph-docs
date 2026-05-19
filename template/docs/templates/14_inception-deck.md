---
status: Draft
owner: <placeholder>
last-reviewed: <YYYY-MM-DD>
---

# Inception Deck Template (Type 14 / Agile Inception Deck)

> **Copy to use**: `cp templates/14_inception-deck.md client-engagement/CHARTER.md`
> Recommended location: `client-engagement/CHARTER.md` (one per engagement)
> Reference: [The Agile Inception Deck — Jonathan Rasmusson (2010)](https://agilewarrior.wordpress.com/2010/11/06/the-agile-inception-deck/) · PDF: <https://agilewarrior.files.wordpress.com/2012/08/99-inception-deck.pdf> · Book: *The Agile Samurai* (Pragmatic Bookshelf 2010)
> Length target: **1–2 pages per question, 10–20 pages total**
>
> **What it is**: ten questions every team should answer with stakeholders *before* starting an engagement. The deck originated at ThoughtWorks (Jonathan Rasmusson) and has been the de-facto agile engagement charter for 15+ years. LLM-corpus footprint: very high.
>
> **Discipline**: each question gets one focused paragraph, not a bullet list. The forcing function is to be able to discuss each answer with stakeholders without losing the room. Re-validate at every cycle boundary.
>
> Delete this `> ...` guidance block after copying.

---

# Engagement Charter — `<client>` / `<engagement>`

| Metadata | Value |
| --- | --- |
| Status | **Draft** / Reviewed / Active / Closed |
| Engagement | `<client-name>` |
| Charter period | `<YYYY-MM-DD>` – `<YYYY-MM-DD>` |
| Engagement lead | `<name>` |
| Client sponsor | `<name>` |
| Last reviewed | `<YYYY-MM-DD>` |

---

## 1. Why are we here?

<!-- The fundamental reason this engagement exists. Why this client. Why now. Why this team.
     1 focused paragraph. If you can't write this without listing 6 bullets, the engagement isn't framed yet. -->

<e.g. We are here because <client> needs <capability> to address <business problem> by <deadline>. Our team brings <specific expertise> that the client cannot economically build in-house. The engagement is funded as a <budget envelope> and replaces <prior approach that failed for reason X>.>

---

## 2. Elevator pitch

<!-- Two sentences a board member could repeat verbatim after one read.
     Formula: "For [target], who [need], the [solution] is a [category] that [key benefit]. Unlike [alternative], we [differentiator]." -->

<sentence 1: target + need + solution>
<sentence 2: differentiation from alternative>

---

## 3. Product box

<!-- Imagine the engagement deliverable is a boxed product on a shelf. Write what would be on the front of the box.
     - 1 headline
     - 3-4 benefit bullets (not features — benefits)
     - 1 visual concept (describe it; don't draw it here) -->

**Headline**: <one-line value proposition>

**On the box**:
- <benefit 1>
- <benefit 2>
- <benefit 3>

**Visual concept**: <one sentence describing what would be on the front of the box>

---

## 4. NOT list

<!-- The explicit out-of-scope list. This is the single most valuable section — it prevents scope creep at week 6.
     Write items that someone might reasonably expect to be in scope but are not. -->

**Out of scope for this engagement**:
- <item that someone might assume is in scope>
- <item that's a future-phase concern>
- <item that's a different team's responsibility>

**Adjacent but not us**: <hand-off to whom>

---

## 5. Meet your neighbours

<!-- Adjacent teams, dependencies, integrations. Who do we collaborate with? Who do we hand off to?
     Each entry: who, what they own, how we interact. -->

| Team / role | Owns | How we interact | Contact |
| --- | --- | --- | --- |
| `<team>` | `<scope>` | `<handoff / dependency / collaboration>` | `<name>` |

---

## 6. Show the solution

<!-- One or two architecture sketches or wireframes. C4 L1 from ../diagrams/c4/ is often the right fit.
     Show the *shape* of the solution. Detail comes later. -->

<C4 L1 system context, or hand-drawn box diagram, or screenshot mockup>

Reference: [`../diagrams/c4/`](../diagrams/c4/) for the architecture renders.

---

## 7. What keeps us up at night

<!-- Top 3-5 risks the team is genuinely worried about. Not the polite risks — the ones that would actually break the engagement.
     These map directly into `raid.md` as Risk-class entries. -->

| # | Risk | Impact if realised | Likelihood | Mitigation in progress |
| --- | --- | --- | --- | --- |
| 1 | `<risk>` | `<consequence>` | High / Med / Low | `<what we're doing about it>` |

→ Mirror to [`raid.md`](../client-engagement/raid.md) `R-NNN` rows.

---

## 8. Size it up

<!-- Timeline / cycles / budget. NOT a Gantt chart — a paragraph with rough bands.
     The discipline is to commit to *order of magnitude*, not false precision. -->

**Estimated duration**: `<X-Y weeks / cycles / months>`

**Cycles**: `<N cycles of M weeks each>` — see [`OPERATING-AGREEMENT.md` §1](../client-engagement/OPERATING-AGREEMENT.md) for cadence specifics.

**Effort band**: `<S / M / L / XL>` engagement — `<rough total person-weeks>`.

**Confidence**: `<low / medium / high>` — derived from <what gives us confidence or worry>.

---

## 9. What's going to give

<!-- The trade-off discussion: time, scope, quality, cost — which of these is fixed and which is flexible?
     Force the conversation by drawing the trade-off square (mentally or on paper). -->

| Dimension | Posture | Notes |
| --- | --- | --- |
| Time | **Fixed** / Flexible | <e.g., milestone tied to client board meeting on <date>> |
| Scope | Fixed / **Flexible** | <e.g., NOT list is fixed but Now/Next/Later flex within remaining capacity> |
| Quality | **Fixed** | Non-negotiable — see [`OPERATING-AGREEMENT.md` §6](../client-engagement/OPERATING-AGREEMENT.md) for definition |
| Cost / capacity | Fixed / **Flexible** | <e.g., team size locked, overtime is the lever> |

**The lever we will pull when things slip**: <which of the above moves first>

---

## 10. What's it going to take

<!-- Team composition, cadence, communication channels. Feeds OPERATING-AGREEMENT.md.
     This is the operational summary — most details belong in OPERATING-AGREEMENT.md. -->

**Team composition**:
- <role>: <name> (<%-time allocation>)
- <role>: <name> (<allocation>)

**Cadence**:
- Weekly: <day, channel>
- Cycle (every <N> weeks): Heartbeat + Kickoff
- Roadmap review: monthly

**Channels**: see [`OPERATING-AGREEMENT.md` §2](../client-engagement/OPERATING-AGREEMENT.md).

**Decision rights**: see [`OPERATING-AGREEMENT.md` §3](../client-engagement/OPERATING-AGREEMENT.md).

---

## Sign-off

| Role | Name | Date | Signature |
| --- | --- | --- | --- |
| Client sponsor | `<name>` | `<YYYY-MM-DD>` | `<initials or commit SHA>` |
| Engagement lead | `<name>` | `<YYYY-MM-DD>` | `<initials or commit SHA>` |
| Technical lead | `<name>` | `<YYYY-MM-DD>` | `<initials or commit SHA>` |

## Revision history

| Version | Date | Author | Notes |
| --- | --- | --- | --- |
| v0.1 | `<YYYY-MM-DD>` | `<author>` | Initial charter |

---

## References

- [Agile Inception Deck — Jonathan Rasmusson](https://agilewarrior.wordpress.com/2010/11/06/the-agile-inception-deck/)
- *The Agile Samurai* (Rasmusson, Pragmatic Bookshelf 2010)
- [`../client-engagement/README.md`](../client-engagement/README.md) — PEL overview
- [`../client-engagement/OPERATING-AGREEMENT.md`](../client-engagement/OPERATING-AGREEMENT.md) — how the engagement runs
