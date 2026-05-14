---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
type: template
template-id: 9
---

# Sprint Retrospective Template (Type 9)

> **Use case**: capture the output of a Scrum Retrospective (or equivalent cadence retro) as a versioned, citable record.
> **Lifecycle**: Layer B (Volatile, dated, append-only). Place at `task-list/YYYY-MM-DD_sprint-NN-retro.md`.
> **Canon**: [Scrum Guide 2020 §Sprint Retrospective](https://scrumguides.org/scrum-guide.html#sprint-retrospective) — bound via [`design-guide/dev-cycle.md`](../design-guide/dev-cycle.md).
> **Length target**: 1 page. Retros that grow beyond 1 page usually indicate scope drift in the retro itself.
>
> Delete this `> ...` guidance block after copying.

---

# Sprint <NN> Retrospective — <YYYY-MM-DD>

| Metadata | Value |
| --- | --- |
| Sprint | NN (start–end dates) |
| Sprint Goal | <one-line, from Sprint Planning> |
| Participants | <names or roles> |
| Facilitator | <name> |
| Format | <Start-Stop-Continue / 4Ls / Glad-Sad-Mad / Sailboat / DAKI / other> |

---

## 1. Inspect — what happened?

### 1.1 Velocity / throughput

| Metric | Sprint NN | Prior Sprint NN-1 | Trend |
| --- | --- | --- | --- |
| Committed PBIs | | | |
| Completed PBIs | | | |
| Carried over | | | |
| Defect rate | | | |

### 1.2 Sprint Goal status

**Did we meet the Sprint Goal?**

- [ ] Yes — fully
- [ ] Partially — <which parts deferred and why>
- [ ] No — <root cause>

---

## 2. Adapt — what changes?

> Use the chosen format's structure. Examples below.

### Start

- <one item per bullet, action-oriented>

### Stop

- <one item per bullet>

### Continue

- <one item per bullet>

---

## 3. Action items (committed)

> Each action item must have an owner and a target. Items without owner+target are not committed; they are just discussion.

| # | Action | Owner | Target | Tracking |
| --- | --- | --- | --- | --- |
| 1 | | | next Sprint / by date | <work-item ID> |
| 2 | | | | |

---

## 4. Definition of Done updates (optional)

If this retro tightens the team's DoD, record the change here and update [`design-guide/dod-dor.md`](../design-guide/dod-dor.md) in the same PR.

| DoD item | Old | New | Effective from |
| --- | --- | --- | --- |
| | | | Sprint NN+1 |

---

## 5. References

- [Scrum Guide 2020 §Sprint Retrospective](https://scrumguides.org/scrum-guide.html#sprint-retrospective)
- Derby, E. & Larsen, D. (2006). [Agile Retrospectives: Making Good Teams Great](https://pragprog.com/titles/dlret/agile-retrospectives/) — alternative formats.
- [Retromat](https://retromat.org/) — large catalog of retrospective formats.
- [`design-guide/dev-cycle.md`](../design-guide/dev-cycle.md) — Scrum binding that produces this artefact.

---

## Lightweight form (for very small teams)

> If a full retro template is overkill for a 1-2 person team, use this minimal form:

```markdown
## Sprint NN retro (YYYY-MM-DD)
- 🟢 Worked: <list>
- 🔴 Didn't: <list>
- 🟡 Try next: <list>
- Action: <owner> will <do thing> by <date>.
```
