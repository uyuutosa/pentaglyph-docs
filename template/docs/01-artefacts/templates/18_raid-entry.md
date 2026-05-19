---
status: Draft
owner: <placeholder>
last-reviewed: <YYYY-MM-DD>
---

# RAID Entry Template (Type 18 / Risk·Assumption·Issue·Decision)

> **Copy to use**: usually you **inline-edit** [`client-engagement/raid.md`](../client-engagement/raid.md) as a single living table; use this template only when an entry needs its own file for verbose context.
> Recommended location: rows in `client-engagement/raid.md`; verbose backing for an entry: `client-engagement/questions/Q-NNN-<slug>.md` (questions log) — see [`../client-engagement/questions/README.md`](../client-engagement/questions/README.md) for the split rationale.
> Reference: [RAID Log — Asana](https://asana.com/resources/raid-log) · [RAID Log — Digital Project Manager](https://thedigitalprojectmanager.com/project-management/raid-log/)
> Length target: **one row per entry** in the table; **≤ 1 page** if backed by a verbose file
>
> **What it is**: RAID is the de-facto modern "open items log" for project / engagement work. PMI-derived, ubiquitous, deeply trained in LLMs. The 4 classes:
>
> - **R — Risk**: something that *might* happen and would hurt if it did. Has likelihood and impact.
> - **A — Assumption**: something we're betting is true; if wrong, blast radius would be wide. Note who would catch it failing.
> - **I — Issue**: something that *has* happened (or is happening). Needs response now, not later.
> - **D — Decision**: a recorded decision. Cross-links to a [`../client-engagement/decisions/`](../client-engagement/decisions/) MADR or [`../client-engagement/daci/`](../client-engagement/daci/) workflow.
>
> **Why one row, one file mostly avoided**: RAID's value is *triage at a glance*. The single-table format forces every row to be one-line summarisable. If an item resists that, promote its narrative to [`../client-engagement/questions/Q-NNN.md`](../client-engagement/questions/) and reference it from the row.
>
> **State transitions**: Open → Mitigated / Resolved / Accepted → Closed. Edit in place; do not delete rows. When an entry closes, set `state: Closed` and the `closed` date — keep the row in the Closed section.
>
> Delete this `> ...` guidance block after copying.

---

## Inline row format (what goes in `raid.md`)

The canonical use of this template is as a row in [`../client-engagement/raid.md`](../client-engagement/raid.md). Each row is one item:

```markdown
| ID     | Class | Opened     | Owner   | Summary                         | Severity | Action / next            | Linked                  |
| ------ | ----- | ---------- | ------- | ------------------------------- | -------- | ------------------------ | ----------------------- |
| R-007  | R     | 2026-05-19 | <name>  | <one-line>                      | High     | <next action this week>  | [DACI](../daci/...)     |
| A-003  | A     | 2026-05-19 | <name>  | <assumption stated as fact>     | Med      | <how we'll verify>       | —                       |
| I-012  | I     | 2026-05-19 | <name>  | <what is happening>             | High     | <response in flight>     | [report](../01-artefacts/reports/...)|
| D-001  | D     | 2026-05-19 | <name>  | <decision summary>              | —        | Recorded                 | [MADR](../decisions/...)|
```

**ID numbering**: each class has its own numeric sequence (`R-001` … / `A-001` … / `I-001` … / `D-001` …). IDs are immutable — never reused, never renumbered.

**Severity**: applies to R / A / I. Use **High / Med / Low**. For D entries leave blank.

**Owner**: a single named person. Shared ownership = no ownership; pick one accountable name.

---

## Verbose backing file (when a row needs more)

When the one-line summary in `raid.md` cannot stand on its own (background needs paragraphs, options need enumeration, dependencies need diagramming), open a verbose backing file at [`../client-engagement/questions/Q-NNN-<slug>.md`](../client-engagement/questions/) and reference it from the row. Use the template structure documented in [`../client-engagement/questions/README.md`](../client-engagement/questions/README.md).

The verbose file owns the *deliberation*; the `raid.md` row owns the *triage signal*. They cross-reference each other; the row is the index.

---

## Class-specific authoring guidance

### Risk (R)

- State the risk as a *future hypothetical event* with subject + verb: "Client AWS account provisioning is delayed past Sprint 2", not "AWS account".
- Severity = impact × likelihood (use judgment; PMI-style 5×5 grids are overkill for advisory).
- Action / next must be *this-week-actionable*, not a project plan.

### Assumption (A)

- State the assumption as a *belief currently held*: "We assume the client's Bedrock model access enablement takes ≤ 2 business days".
- Action / next = the verification step (test, conversation, document review).
- If you can't think of a verification step, the assumption is unfalsifiable — re-state it.

### Issue (I)

- An Issue is something *happening now*. If it's "might happen", it's a Risk.
- Severity captures business impact, not technical complexity.
- Action / next must name the person and the deadline. Issues without owners metastasise.

### Decision (D)

- A D row is a *thin index entry* — full content is in the linked MADR or DACI file.
- Use D rows to make decisions *visible at triage*. Approvers and Informed parties scan `raid.md` to learn what landed.
- Severity column is blank for D (decisions don't have severity; their downstream consequences appear as R / I rows).

---

## Lifecycle

| Transition | Trigger | Update |
| --- | --- | --- |
| Open → Mitigated | Risk reduced below action threshold | Set `state: Mitigated`, note the mitigation in row |
| Open → Resolved | Issue addressed | Set `state: Resolved`, note resolution |
| Open → Accepted | Risk accepted at current level (no further mitigation planned) | Set `state: Accepted`, record approver |
| Mitigated / Resolved / Accepted → Closed | Triage decides item no longer needs visibility | Set `state: Closed`, set `closed: <date>`, move row to "Closed" section of `raid.md` |

Closed rows stay in the file for the duration of the engagement — they are the audit trail.

---

## Anti-patterns

- **One row per concern, but no one owns it**: shared ownership = no ownership. Pick one accountable name.
- **Open items list that only grows**: triage cadence in [`../client-engagement/OPERATING-AGREEMENT.md` §1](../client-engagement/OPERATING-AGREEMENT.md) requires closing items, not just adding.
- **Risk rows that read like aspirations**: "We need to make sure performance is good" is not a Risk — state the *future event* that would manifest the risk.
- **Verbose rows that should be files**: if a row spills past one screen line, promote its narrative to [`../client-engagement/questions/`](../client-engagement/questions/).

---

## References

- [RAID log — Asana](https://asana.com/resources/raid-log)
- [RAID log — Digital Project Manager](https://thedigitalprojectmanager.com/project-management/raid-log/)
- [`../client-engagement/raid.md`](../client-engagement/raid.md) — the living table this template fills
- [`../client-engagement/questions/`](../client-engagement/questions/) — verbose backing files
- [`../client-engagement/README.md`](../client-engagement/README.md) — PEL overview
