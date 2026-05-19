---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
---

# `questions/` — internal question ledger

This directory holds **open client questions** that are too verbose for a single `raid.md` row but not yet a decision. Each question gets its own file. When a question becomes triage-able (one-line summary + clear action), it gets promoted to a `raid.md` `I-NNN` row. When it becomes a decision in flight, it gets promoted to `daci/`. When it gets answered with a recordable artefact, it gets archived to `decisions/`.

## Why a separate `questions/` log (vs just using `raid.md`)

`raid.md` is a single living **table** — one row per item, one line per row. Some open questions have too much context (background, options, expected decision, dependencies) to fit a row. For those, write a `Q-NNN-<slug>.md` file under `questions/` and reference it from `raid.md`. The split mirrors how engineering teams use:

- One-line **issue tracker** entries (= `raid.md`)
- Multi-paragraph **design docs** for unresolved questions (= `questions/`)

## When to open a question vs go straight to `raid.md`

| Open a `questions/Q-NNN.md` if | Stay in `raid.md` if |
| --- | --- |
| Background needs >2 paragraphs to set | Background fits in one line |
| 2+ options need to be enumerated with trade-offs | Action is obvious |
| Question will sit unresolved for >1 cycle | Question can be triaged this week |
| Multiple stakeholders need to engage in writing | Owner can resolve alone |

## File naming

`Q-NNN-<kebab-slug>.md` where `NNN` is sequential within the engagement. Never renumber.

## Question file structure

```markdown
---
status: Open | Closed | Superseded
opened: YYYY-MM-DD
owner: <name>
deferred-until: <YYYY-MM-DD or "next-cycle" or null>
group: <category, e.g. UX / scope / infra / regulatory>
---

# Q-NNN: <question title>

**Question**: <1-2 sentence statement>

**Background**: <paragraphs of context>

**Options**:
- A. <option> — <tradeoff>
- B. <option> — <tradeoff>

**Expected decision**: <what we hope the answer looks like>

**Latest mention**: [`../reports/YYMMDD/heartbeat.md`](../reports/)

**Linked**: `raid.md` `I-NNN`, `daci/YYYY-MM-DD-<slug>.md` if any
```

## Lifecycle

1. **Open**: created when question first surfaces.
2. **Promoted**: when sharp enough for one-line tracking, mirror into `raid.md`. The question file stays as the "verbose home".
3. **In-flight**: when discussion begins toward a decision, open a corresponding `daci/` entry; cross-link.
4. **Closed**: answer recorded in a `decisions/` MADR; question file updated with `status: Closed` and link to MADR.
5. **Superseded**: if numbering changes (e.g., engagement re-baselines), mark old `Q-NNN` files Superseded and link to successor; do not delete.

## Cross-references

- [`../raid.md`](../raid.md) — one-line index of open items
- [`../daci/`](../daci/) — questions that are now decisions in flight
- [`../decisions/`](../decisions/) — questions that have been answered

## Related

- [`../README.md`](../README.md) — PEL overview
- [`../OPERATING-AGREEMENT.md` §3](../OPERATING-AGREEMENT.md) — decision rights table
