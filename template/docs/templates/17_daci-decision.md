---
status: Draft
owner: <placeholder>
last-reviewed: <YYYY-MM-DD>
---

# DACI Decision Workflow Template (Type 17 / Atlassian DACI)

> **Copy to use**: `cp templates/17_daci-decision.md client-engagement/daci/<YYYY-MM-DD>-<kebab-slug>.md`
> Recommended location: `client-engagement/daci/<YYYY-MM-DD>-<kebab-slug>.md` while in flight; **archive to** `client-engagement/decisions/<YYYY-MM-DD>-<kebab-slug>.md` (reformatted as MADR via [`5_adr.md`](./5_adr.md)) once approved.
> Reference: [Atlassian Team Playbook — DACI](https://www.atlassian.com/team-playbook/plays/daci) · [Reforge — DACI artifact library](https://www.reforge.com/artifacts/c/team-operations/daci-decision-making-framework) · [DACI vs RAPID vs RACI — TimeTrex](https://www.timetrex.com/blog/rapid-vs-daci-vs-raci-frameworks)
> Length target: **1–3 pages** in flight (grows with Contributor input), then **compresses to 1–2 pages** in the MADR archive
>
> **What it is**: DACI is the *workflow* for arriving at a decision (Driver / Approver / Contributors / Informed). It pairs cleanly with MADR (in [`../client-engagement/decisions/`](../client-engagement/decisions/)) which records the *outcome*. DACI without MADR loses the audit trail; MADR without DACI loses the deliberation process. Use both.
>
> **DACI roles**:
> - **D — Driver**: owns moving the decision forward; gathers context, runs discussion, drives to a call. Usually the engagement lead or a delegate.
> - **A — Approver**: has the final yes/no. **Typically one person.** Multi-approver decisions are slow; if you have >1 Approver, prefer RAPID instead.
> - **C — Contributors**: provide input, expertise, or impact assessment. Multiple. Their input is required for the Approver to decide well.
> - **I — Informed**: notified of the outcome. Multiple. They do not block.
>
> **When to use this template**: non-trivial, cross-functional decision with client visibility, currently in flight. For pure engineering-internal decisions, write a MADR directly under [`../arc42/09-decisions/`](../arc42/09-decisions/). For one-person calls inside the engagement lead's authority, record as a one-liner in the relevant `weekly.md`.
>
> Delete this `> ...` guidance block after copying.

---

# DACI: `<decision title (verb-led)>`

| Metadata | Value |
| --- | --- |
| Status | **Open** / Discussion / Decided / Archived (→ MADR) |
| Driver (D) | `<name>` |
| Approver (A) | `<name>` |
| Contributors (C) | `<name>`, `<name>`, `<name>` |
| Informed (I) | `<name>`, `<name>` |
| Opened | `<YYYY-MM-DD>` |
| Target decision date | `<YYYY-MM-DD>` |
| Linked | [`../raid.md`](../raid.md) `D-NNN` (if any), [`../questions/Q-NNN.md`](../questions/) (if any) |

---

## 1. The decision to be made

<!-- One paragraph stating the question. End with a question mark — literally.
     If you can't state it as a question, the decision is too vague. -->

<e.g. "Should we deploy the chat-image upload feature using S3 presigned URLs (architecture A) or backend-proxied uploads (architecture B), given the Layer 1 consent and 90-day retention constraints?">

## 2. Context

<!-- 2-3 paragraphs setting up why this decision is on the table now and what's at stake.
     Reference the originating signal: a `raid.md` Risk, a `questions/Q-NNN.md` open question, a charter constraint, a client request. -->

<paragraph: what surfaced this decision and when>

<paragraph: what's at stake — what becomes harder or impossible if we decide wrong>

<paragraph: scope of the decision — what it covers and what it explicitly does not>

## 3. Options under consideration

<!-- 2-4 options. Each option gets equal-depth analysis. The "do nothing" / "defer" option is often a legitimate fourth option — name it. -->

### Option A: `<descriptive name>`

**Summary**: <1-2 sentence description>

**Trade-offs**:
- **+** `<benefit>`
- **+** `<benefit>`
- **−** `<cost>`
- **−** `<cost>`

**Cost / effort estimate**: `<rough band>`

**Driver's recommendation level**: `<strong / moderate / weak>`

### Option B: `<descriptive name>`

(same structure)

### Option C: `<descriptive name>`

(same structure)

### Option D (often "do nothing" or "defer"): `<descriptive name>`

(same structure — name explicitly the cost of not deciding)

## 4. Contributor input

<!-- Each Contributor adds a timestamped section here. Driver compiles or each Contributor edits in.
     Don't overwrite Contributor input — append. -->

### `<contributor name>` — `<YYYY-MM-DD>`

<their input — typically 1-3 paragraphs covering their expertise / impact assessment / recommendation>

### `<contributor name>` — `<YYYY-MM-DD>`

<their input>

## 5. Driver's recommendation

<!-- The Driver synthesises the Contributor input and recommends an option to the Approver.
     The Approver may accept, reject, or modify — but the Driver owns the recommendation. -->

**Driver recommends**: `<Option X>`

**Why**: <2-3 sentences synthesising the Contributor input into a recommendation>

**Open uncertainties for the Approver**: <if any>

## 6. Approver's decision

<!-- Written by the Approver. Until this section is filled, the DACI is Open. -->

**Decided**: `<Option X>` — `<YYYY-MM-DD>` — `<Approver name>`

**Rationale**: <2-3 sentences explaining the call. Especially if differing from Driver recommendation, explain why.>

**Constraints / conditions**: <any conditions attached to the decision>

## 7. Notified

<!-- The Informed role gets the decision. Driver records when and how. -->

| Person | Notified on | How |
| --- | --- | --- |
| `<name>` | `<YYYY-MM-DD>` | Slack / email / Heartbeat reference |

## 8. Archival to MADR

<!-- When the DACI is Decided, the Driver archives it to `../decisions/<YYYY-MM-DD>-<slug>.md` reformatted as MADR (template 5).
     The DACI workflow → MADR mapping:
     - DACI §1 (decision) + §2 (context) → MADR Context and Problem Statement
     - DACI §3 (options) → MADR Considered Options
     - DACI §5 (recommendation) + §6 (decision) → MADR Decision Outcome
     - DACI §4 (contributor input) → MADR Pros and Cons of the Options
     - DACI roles → MADR front-matter: Approver → decided-by, Contributors → consulted, Informed → informed
-->

**Archived as MADR**: [`../decisions/<YYYY-MM-DD>-<slug>.md`](../decisions/) — `<YYYY-MM-DD>`

The Git history of this DACI file is preserved (the file is moved, not deleted) so the deliberation is auditable.

---

## References

- [Atlassian DACI play](https://www.atlassian.com/team-playbook/plays/daci)
- [Reforge DACI artifact library](https://www.reforge.com/artifacts/c/team-operations/daci-decision-making-framework)
- [`5_adr.md`](./5_adr.md) — the MADR template this DACI archives into
- [`../client-engagement/README.md`](../client-engagement/README.md) — PEL overview
- [`../client-engagement/OPERATING-AGREEMENT.md` §3](../client-engagement/OPERATING-AGREEMENT.md) — decision rights matrix for this engagement
