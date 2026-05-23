---
status: Draft
owner: <placeholder>
last-reviewed: <YYYY-MM-DD>
engagement: <client-name>
confidentiality: private
---

# Operating Agreement — `<client-name>`

> Authored using the **GitLab Handbook "handbook-first" pattern** (<https://handbook.gitlab.com/>) with a **private-first inversion**. GitLab's handbook is public by default; consulting engagements are private by default. PEL borrows the *single-source-of-truth* discipline and the *async-first* tooling assumptions, but inverts the *public default*. Every file under [`./`](./) is confidential unless explicitly marked otherwise.

> **How this document is used**: this file is the single source of truth for *how the engagement runs* — cadence, channels, decision rights, escalation. If a meeting decision contradicts this file, the file wins (and is updated). If Slack contradicts this file, the file wins. Edit in place; do not branch by date.

---

## 1. Cadence

| Activity | Frequency | Format | Owner |
| --- | --- | --- | --- |
| Weekly short-form update | Weekly, `<weekday>` `<time-tz>` | [`01-artefacts/reports/YYMMDD/weekly.md`](./01-artefacts/reports/) | Engagement lead |
| Cycle Heartbeat | Every `<N>` weeks | [`01-artefacts/reports/YYMMDD/heartbeat.md`](./01-artefacts/reports/) | Engagement lead |
| Cycle Kickoff | Start of cycle | [`kickoffs/YYYY-MM-DD_cycle-<n>.md`](./kickoffs/) | Engagement lead |
| Roadmap review | Monthly | [`NOW-NEXT-LATER.md`](./NOW-NEXT-LATER.md) | Engagement lead + client sponsor |
| RAID triage | Weekly | [`raid.md`](./raid.md) | Engagement lead |
| Decision archive | As decisions land | [`decisions/`](./decisions/) (from [`daci/`](./daci/)) | Engagement lead |

## 2. Channels

| Channel | Purpose | Authoritative? |
| --- | --- | --- |
| This repo (`client-engagement/`) | Single source of truth for engagement state | **Yes** |
| Slack / Teams / chat | Short-form updates, real-time questions, scheduling | No — promoted to this repo within `<N>` hours |
| Email | Formal approvals, sign-offs that need a paper trail | Promoted to `decisions/` or `CHARTER.md` sign-off |
| Meetings | Synchronous decision-making, relationship-building | Decisions captured to `daci/` or `decisions/` within `<N>` hours |

**Async-first principle**: every decision should be expressible in writing in this repo. If a decision lives only in someone's head or only in Slack, it has not happened.

## 3. Decision rights

| Decision class | Who decides | Who is consulted | How it is recorded |
| --- | --- | --- | --- |
| Architectural / technical | Engineering lead | Engagement lead, client tech contact | MADR in [`decisions/`](./decisions/) |
| Scope change | Engagement lead + client sponsor | Engineering lead | DACI in [`daci/`](./daci/), then archived |
| Budget / commercial | Client sponsor | Engagement lead | Out of scope for this repo — record reference only |
| Operational (cadence change, channel change) | Engagement lead | Whole team | Edit this file directly |
| Security / compliance | Client security lead | Engagement lead | MADR in [`decisions/`](./decisions/) + log in `raid.md` |

## 4. Escalation path

`<step 1: who> → <step 2: who> → <step 3: who>`

For example: `Engineering lead → Engagement lead → Client sponsor → Mutual senior management`.

Time-box each step. Escalation is not failure; silent stuck-ness is.

## 5. Confidentiality posture

| Material | Confidentiality | Sharing default |
| --- | --- | --- |
| Everything in `client-engagement/` | **Confidential** | Repo access only |
| `01-artefacts/reports/YYMMDD/*.md` | Confidential | Shared with client sponsor + named recipients in CHARTER §10 |
| `decisions/*.md` | Confidential | Shared with client team |
| RAW client data referenced in PEL | As per client policy | Never copied into PEL repo |
| Anonymised case-study material | Subject to written sign-off | Out of scope unless explicitly permitted |

## 6. Working agreements (the "how we work" rules)

- **Writing > meetings**: a written async update counts as participation. Meeting absence with a written update is acceptable.
- **One source of truth**: if it's not in this repo (or linked from this repo), it doesn't exist for the purposes of decision-making.
- **Promote within `<N>` hours**: Slack / meeting / email content with decision implications must be promoted to a tracked file within the deadline.
- **No surprise scope changes**: scope changes go through `daci/` first; the Heartbeat does not introduce scope changes for the first time.
- **Respect the NOT list** (CHARTER §4): anything not in scope requires a charter amendment.

## 7. Revision history

| Version | Date | Author | Notes |
| --- | --- | --- | --- |
| v0.1 | <YYYY-MM-DD> | <author> | Initial operating agreement |
