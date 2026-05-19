---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
---

# `client-engagement/` — Project Engagement Layer (PEL)

This directory is the local home of the **Project Engagement Layer** — pentaglyph's 6th slot. It is not a single canonical standard like arc42 or MADR; rather, it is a **binder** that composes eight well-known, AI-friendly primitives into one opinionated layout for client / advisory / engagement work.

The composition exists because, after surveying the consulting-advisory space, no single canonical "client communication standard" was found in the way `arc42` is canonical for architecture or `MADR` for decisions. Instead, the modern de-facto practice is a stack of well-known primitives, each owning one slice of the engagement lifecycle.

## The eight bound primitives

| Slot | Primitive | Authoritative source | Local home |
| --- | --- | --- | --- |
| Engagement charter | **Agile Inception Deck** (Rasmusson, 2010) | <https://agilewarrior.wordpress.com/2010/11/06/the-agile-inception-deck/> | [`CHARTER.md`](./CHARTER.md) |
| Operating agreement | **GitLab Handbook** "handbook-first" pattern | <https://handbook.gitlab.com/> | [`OPERATING-AGREEMENT.md`](./OPERATING-AGREEMENT.md) |
| Short-form weekly | **Atlassian "Priorities → Progress → Problems → Next"** | <https://www.atlassian.com/team-playbook/plays/weekly-team-updates> | [`01-artefacts/reports/YYMMDD/weekly.md`](./01-artefacts/reports/) |
| Long-form cyclical | **Basecamp Heartbeat** + **Amazon 6-pager** prose discipline | <https://world.hey.com/jason/what-s-in-a-heartbeat-4fd72d0e> / <https://www.sixpagermemo.com/blog/amazon-six-pager-template> | [`01-artefacts/reports/YYMMDD/heartbeat.md`](./01-artefacts/reports/) |
| Forward roadmap | **Now / Next / Later** (Janna Bastow) | <https://productmanagementresources.com/now-next-later-roadmap/> | [`NOW-NEXT-LATER.md`](./NOW-NEXT-LATER.md) |
| Decision log (recorded) | **MADR** (pentaglyph standard #3) — client-visible subset | <https://adr.github.io/madr/> | [`decisions/`](./decisions/) |
| Decision log (in-flight) | **DACI** (Atlassian) | <https://www.atlassian.com/team-playbook/plays/daci> | [`daci/`](./daci/) |
| Open-items ledger | **RAID log** (Risk / Assumption / Issue / Decision) | <https://asana.com/resources/raid-log> | [`raid.md`](./raid.md) |
| New-initiative kickoff | **Amazon PR/FAQ** (working backwards) | <https://workingbackwards.com/resources/working-backwards-pr-faq/> | [`prfaqs/`](./prfaqs/) |
| Internal question ledger | (no single canonical name; we call it the *questions log*) | — | [`questions/`](./questions/) |
| Cycle kickoff narrative | **Basecamp Kickoffs** (companion to Heartbeats) | <https://37signals.com/podcast/kickoffs-and-heartbeats/> | [`kickoffs/`](./kickoffs/) |

**Do not re-author the philosophy of these primitives inside this repo.** Link out to the authoritative source. This is the same rule that applies to arc42, C4, MADR, Diátaxis, and TiSDD.

## Why a binder layer instead of a 6th peer standard

arc42 / C4 / MADR / Diátaxis / TiSDD each ship as a single, named, self-contained standard with an authoritative URL. The client-engagement space has no such single anchor — every consulting firm has its own templates, and no public standard has emerged as canonical. Picking *one* (say, Basecamp Shape Up) would be over-fitting; picking *several without a binder* would scatter client-engagement material across `01-artefacts/reports/`, `01-artefacts/arc42/09-decisions/`, `01-artefacts/impl-plans/`, and ad-hoc directories. The binder model — one directory, one README, eight well-known primitives composed — gives the AI agent a single placement target without sacrificing the "no homegrown frameworks" rule.

## When to use PEL

- The project has an external client / sponsor / paying customer / executive stakeholder who consumes written progress.
- The team is small enough that GitLab-handbook-style "single source of truth" beats meeting culture.
- Decisions need a paper trail that is *more readable* than `01-artefacts/arc42/09-decisions/` (which is engineering-internal) but *less formal* than a Statement of Work.

## When NOT to use PEL

- Pure internal product development with no external stakeholder (use `01-artefacts/reports/` + `01-artefacts/impl-plans/`).
- The engagement is contract-formal and decisions live in legal annexes (use `legal/` or whatever your contract repo is — PEL is collaborative, not legal).
- The team is large enough that PEL becomes a bottleneck (PEL assumes the engagement lead can write a Heartbeat per cycle).

## Lifecycle and authoring

- Each report is dated (`01-artefacts/reports/YYMMDD/`); reports are **volatile**, not durable. They append-only with each cycle.
- `CHARTER.md` / `OPERATING-AGREEMENT.md` / `NOW-NEXT-LATER.md` are **durable** — single file, edited in place, supersede-not-delete on change.
- `raid.md` is a **single living table** — entries change state (open → closed) in place.
- `decisions/` follows MADR lifecycle (Proposed → Accepted → Superseded).
- `daci/` entries archive into `decisions/` once Approved.
- `questions/` follows Open → Closed → Superseded lifecycle.

See [`../WORKFLOW.md` §1.5](../WORKFLOW.md) for the PEL decision tree.

## Confidentiality posture (important)

GitLab's handbook-first principle is **public-first**. Consulting engagements are **private-first** — material in `client-engagement/` is typically under NDA. PEL borrows the *single-source-of-truth* discipline from GitLab Handbook but inverts the *public default*. Treat every PEL file as confidential unless your engagement agreement specifies otherwise. See [`OPERATING-AGREEMENT.md`](./OPERATING-AGREEMENT.md) for how to record the confidentiality posture explicitly.

## Cross-references to other pentaglyph standards

- `decisions/` reuses [MADR template](../01-artefacts/templates/5_adr.md) (pentaglyph standard #3) — clients see a curated subset; the engineering team's full corpus stays in [`../01-artefacts/arc42/09-decisions/`](../01-artefacts/arc42/09-decisions/).
- `CHARTER.md` feeds the *Stakeholders* section of [arc42 §1](../01-artefacts/arc42/01-introduction-and-goals/) and the *Quality Goals* of [§10](../01-artefacts/arc42/10-quality/).
- `01-artefacts/reports/YYMMDD/heartbeat.md` references [C4 diagrams](../01-artefacts/diagrams/c4/) when useful — narrative + diagram, not narrative or diagram.
- TiSDD touchpoint mapping ([`../01-artefacts/service-design/`](../01-artefacts/service-design/)) feeds the *user journey* references in heartbeats and PR/FAQs.

## Templates used by this directory

- [`../01-artefacts/templates/14_inception-deck.md`](../01-artefacts/templates/14_inception-deck.md) — Agile Inception Deck for `CHARTER.md`
- [`../01-artefacts/templates/15_weekly-update.md`](../01-artefacts/templates/15_weekly-update.md) — Atlassian 4-block for `01-artefacts/reports/YYMMDD/weekly.md`
- [`../01-artefacts/templates/16_heartbeat.md`](../01-artefacts/templates/16_heartbeat.md) — Basecamp + 6-pager prose for `01-artefacts/reports/YYMMDD/heartbeat.md`
- [`../01-artefacts/templates/17_daci-decision.md`](../01-artefacts/templates/17_daci-decision.md) — DACI workflow for `daci/`
- [`../01-artefacts/templates/18_raid-entry.md`](../01-artefacts/templates/18_raid-entry.md) — single RAID entry format for `raid.md`

(Templates 14+ for PR/FAQ, Now/Next/Later, and Kickoff narrative are planned for a follow-up release.)

## Related

- [`../STRATEGY.md` §6](../STRATEGY.md) — why PEL exists and how it relates to the 5 peer standards
- [`../WORKFLOW.md` §1.5](../WORKFLOW.md) — PEL decision tree
- [`../AI_INSTRUCTIONS.md`](../AI_INSTRUCTIONS.md) — AI agent placement rules
- [`../../.claude/rules/client-engagement-rule.md`](../../.claude/rules/client-engagement-rule.md) — auto-loaded rule for PEL placement
