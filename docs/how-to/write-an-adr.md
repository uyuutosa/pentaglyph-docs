---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-17
diataxis: how-to
audience: anyone writing or reviewing an ADR
---

# How to write an ADR

> **Problem this guide solves:** you have a decision worth recording and you have `templates/5_adr.md` in front of you. What goes in each section, what does *not* belong, and how do you avoid the most common ways ADRs go wrong? This guide is the MADR v3.0-specific deep dive that complements the generic [how-to/choose-the-right-template.md](./choose-the-right-template.md).

This is a **how-to**, not a tutorial — we assume you have already decided that an ADR is the right artefact (if not, start with [choose-the-right-template.md §Common confusion #2](./choose-the-right-template.md#common-confusion-2-is-this-an-adr-or-part-of-the-module-detailed-design)).

The authoritative format reference is [MADR v3.0](https://adr.github.io/madr/). This page only adds the **operational guidance** layered on top of it — how to use the format well in a pentaglyph project.

---

## TL;DR

1. **One decision per ADR.** If your draft contains the word *"and"* in the decision sentence, split it.
2. **Status starts at `Proposed`.** Only `Accepted` after team review. Never edit an `Accepted` ADR's body — supersede with a new ADR instead.
3. **The `Alternatives` section is mandatory.** If you considered no alternatives, you do not have an architectural decision; you have a default.
4. **File naming**: `arc42/09-decisions/NNNN-<kebab-title>.md` where `NNNN` is the next sequential 4-digit number, zero-padded.
5. **Link to and from**: PRDs that triggered the decision, Module DDs that implement it, and any prior ADRs this one builds on or supersedes.

---

## Step-by-step

### 1. Pick the number

Find the highest existing ADR number in `arc42/09-decisions/`:

```bash
ls docs/arc42/09-decisions/ | grep -E '^[0-9]{4}-' | sort | tail -1
```

Use the next sequential 4-digit number. Do not reserve gaps for "future categories" — the number is *just an identifier*, not a hierarchy. Reserving numbers is the most common way ADR sequences develop confusing holes.

### 2. Copy the template

```bash
cp docs/templates/5_adr.md docs/arc42/09-decisions/NNNN-<kebab-title>.md
```

Or ask Claude (per [prompt-cookbook §3](./prompt-cookbook.md#3-surface-adr-candidates-from-a-design)):

> Write an ADR from `docs/templates/5_adr.md` recording the decision: `<one-sentence summary>`. Place it at `docs/arc42/09-decisions/<next-NNNN>-<kebab-title>.md`. Status `Proposed`. Fill all required sections.

### 3. Fill the title

The title is the **decision itself**, not the topic. Write it as a verb phrase:

| ✅ Good (decision) | ❌ Bad (topic) |
| --- | --- |
| "Adopt PostgreSQL for primary persistence" | "Database selection" |
| "Use OAuth 2.1 PKCE for first-party clients" | "Authentication" |
| "Run async jobs on Cloudflare Queues, not in-process" | "Job processing" |

The titles ending in *"-tion"* nouns (Authentication, Selection, Processing) are almost always the wrong shape. The reader cannot tell from the title what was decided.

### 4. Write the Context (the *what* and *why*)

Two to four sentences. Two ingredients:

1. **The forcing function.** What changed in the codebase, product, or constraints that made this decision necessary? *"We need to ship the v1 API by Q2"* / *"The PoC database is hitting its connection limit in load tests"* / *"Compliance review requires log retention for 90 days"*.
2. **The decision space.** What candidate approaches were on the table at the moment of decision? Not the chosen one (that comes later) — the *space* you were choosing from.

If you find yourself writing more than four sentences here, you are probably narrating the discussion. Cut to the substance.

> **Anti-pattern:** Context section that reads like the meeting minutes (*"Alice raised the issue, then Bob pointed out…"*). The ADR is a permanent record, not a chat log.

### 5. Write the Decision (the *what we chose*)

One to three sentences. State the chosen option clearly. The reader should be able to *implement based on this section alone*.

Example:

> We will use PostgreSQL 16 as the primary persistence store for the user, order, and audit tables. Schemas live in `db/migrations/` and are versioned with Alembic. Read replicas are out of scope for this decision (see ADR-0024).

Note the last clause: explicitly marking what is *out of scope* prevents future readers from assuming this ADR covers something it does not.

### 6. Write the Consequences (the *what follows*)

This is where ADRs earn their value. Three sub-sections:

**Positive consequences.** What good outcomes do we expect? Be specific: *"unlocks pg_vector for the search use case"* beats *"better technical foundation"*.

**Negative consequences.** What are we accepting as a cost? *"Increased operational complexity vs SQLite — we now need backup, replication, and version-upgrade procedures"*. The negative section is what proves you took the trade-off seriously.

**Neutral consequences.** Anything else that follows but is neither good nor bad. Often empty; that is fine.

> **Anti-pattern:** Empty `Negative consequences`. If you cannot name a downside, you have not actually weighed the decision — you have rationalised it. Force yourself to name at least one cost, even a small one.

### 7. Write the Alternatives (the *what we rejected, and why*)

The single most important section. List each alternative you seriously considered, with a **specific reason for rejection**.

Format per alternative:

```markdown
#### SQLite

Considered for: low operational overhead, embedded deployment.

Rejected because: load tests showed connection-pool exhaustion at ~200 concurrent
agents, which is below our 500-agent target. WAL mode helped but did not close
the gap.
```

Two failure modes to avoid:

| Failure | Example | Fix |
| --- | --- | --- |
| Strawman alternative | *"We considered using flat files. They are slow."* (Nobody seriously proposed this.) | Only list alternatives that received >5 minutes of serious consideration. |
| Vague rejection | *"Considered MongoDB. Rejected because document stores do not fit our use case."* | Give the *specific* property that disqualified it. "Schema drift would have prevented strict typing in our migration layer" — not "did not fit". |

If you genuinely had no alternative — say, the platform mandated one choice — you do not have an architectural decision. You have a constraint. Record it in arc42 §2 (Constraints) instead of `arc42/09-decisions/`.

### 8. Fill the front-matter

```yaml
---
status: Proposed     # → Accepted after review → Superseded if replaced
date: 2026-05-17
deciders: ["alice", "bob"]  # GitHub handles or names
supersedes: 0007    # only if this ADR replaces another
superseded-by: ~    # filled in later if this ADR gets superseded
---
```

- **`deciders`**: people who can be asked *"why?"* in three months. Not the whole team — the 2–4 people who actually weighed the trade-offs.
- **`supersedes`**: when this ADR replaces an older one, name it here. Then **update the older ADR's front-matter** to set `superseded-by: <this-NNNN>` and `status: Superseded`. **Do not edit the older ADR's body.**

### 9. Cross-link

Add bidirectional links:

- **From the PRD** (if applicable): add a line *"Decision recorded in ADR-NNNN"*.
- **To the PRD**: add a line in the ADR Context section *"Triggered by [PRD link]"*.
- **From the Module DD** that implements it: add a row *"Per ADR-NNNN, we use…"*.
- **To/from prior ADRs**: especially supersede chains.

The cross-links are what make ADRs *findable* six months later. An unlinked ADR is dead weight.

### 10. Get it accepted

Status flow:

```text
Proposed → Accepted     (after team review approves)
Proposed → Rejected     (if the team disagrees with the proposal)
Accepted → Superseded   (if a later ADR replaces it)
```

The transition `Proposed → Accepted` is the only one that requires team sign-off. The others are recording fact, not asking permission.

**Rejected ADRs stay on disk.** Do not delete them — the reasoning that led to the rejection is valuable. Set `status: Rejected` and leave the body intact.

---

## What an ADR is NOT

The most common failure mode is writing the wrong artefact under the ADR label:

| Looks like an ADR but is not | Goes here instead |
| --- | --- |
| A mini design doc with implementation details | `detailed-design/<module>.md` |
| A list of "principles" or "guidelines" the team should follow | `design-guide/<topic>.md` |
| A meeting summary | a Slack message or a Notion page; not in the repo |
| A retrospective insight | `task-list/YYYY-MM-DD_sprint-NN-retro.md` |
| A constraint imposed externally (regulatory, platform) | arc42 §2 Constraints |
| Three decisions bundled because they relate | Three separate ADRs that link to each other |

When in doubt, ask: *"Could a future reader implement based on the Decision section alone, with the Alternatives section answering the obvious 'but what about X?' question?"* If yes, it is a valid ADR. If no, it is one of the rows above in disguise.

---

## How long should an ADR be?

The MADR examples and our experience converge on the same answer: **half a page to one page** is the sweet spot.

- **Under 100 words** is usually too thin to defend the decision in three months.
- **Over 600 words** usually means you are dragging implementation detail into the ADR. Move it to the Module DD.

Long ADRs are not "more rigorous" — they are usually less load-bearing. The discipline is *which paragraphs survive*, not *how many you wrote*.

---

## Supersede vs. amend

You will eventually need to change a decision. The rule:

| Change type | What to do |
| --- | --- |
| Typo, broken link, missing front-matter field | Edit the existing file directly |
| The decision *itself* changes (you no longer use PostgreSQL — now you use CockroachDB) | **Write a new ADR with `supersedes: <old NNNN>`. Do not edit the old body.** |
| The decision is partially obsolete (still PostgreSQL, but now with read replicas) | Write a new ADR that **extends** the old. The old stays `Accepted`; the new ADR's Context cites the old one. |

The reason "do not edit Accepted bodies" is non-negotiable: an ADR's value is as a stable historical record. If editors are allowed to rewrite past decisions, the audit trail collapses. The cost of writing a new ADR is *low* (one page); the cost of corrupting the trail is *high* (your team stops trusting any ADR).

---

## A checklist before merging

- [ ] Title is a verb phrase, not a noun.
- [ ] One decision, not bundled.
- [ ] Context names the forcing function and the decision space.
- [ ] Decision section is implementable on its own.
- [ ] Consequences include at least one negative.
- [ ] Alternatives section has ≥ 2 entries with specific rejection reasons.
- [ ] Front-matter has `status`, `date`, `deciders`.
- [ ] PR title and description reference the ADR.
- [ ] If superseding another ADR, the older ADR's front-matter is updated **without** body edits.
- [ ] Length is 100–600 words.

---

## Related

- [`../../template/docs/templates/5_adr.md`](../../template/docs/templates/5_adr.md) — the MADR v3.0 template
- [MADR v3.0 specification](https://adr.github.io/madr/) — the authoritative format reference
- [Y-statements (Olaf Zimmermann)](https://medium.com/olzzio/y-statements-10eb07b5a177) — a tighter ADR variant; the MADR template is compatible with it
- [Michael Nygard's original ADR essay (2011)](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) — origin of the practice
- [how-to/choose-the-right-template.md §Common confusion #2](./choose-the-right-template.md#common-confusion-2-is-this-an-adr-or-part-of-the-module-detailed-design) — ADR vs Module DD
- [how-to/prompt-cookbook.md §8 — Supersede an ADR](./prompt-cookbook.md#8-supersede-an-adr) — agent-driven supersede flow
