---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
type: template
template-id: 11
---

# Definition of Done Checklist Template (Type 11)

> **Use case**: per-artefact-type DoD checklists. Each downstream project owns their DoD and updates it via retrospective outputs.
> **Lifecycle**: Layer A (Durable). Place at `<downstream>/docs/design-guide/dod-checklist.md`.
> **Canon**: [Scrum Guide 2020 §Definition of Done](https://scrumguides.org/scrum-guide.html#definition-of-done) — bound via [`design-guide/dod-dor.md`](../design-guide/dod-dor.md).
> **Editing**: this is a living document. Tighten over time per retro outputs.
>
> Delete this `> ...` guidance block after copying.

---

# Definition of Done — <project name>

| Metadata | Value |
| --- | --- |
| Status | Stable |
| Last tightened | YYYY-MM-DD (Sprint NN retro) |
| Owner | Engineering team + PO |
| Binding | [`design-guide/dod-dor.md`](../design-guide/dod-dor.md) |

---

## How to use this file

- Every PR that moves an artefact to `Done` must satisfy the relevant section below.
- DoD is **per-artefact-type**, not one-size-fits-all. A code-only PR has different DoD from a PRD-only PR.
- DoD is **tightened, not loosened**, over time. Loosening requires a Retro consensus + an entry in `task-list/YYYY-MM-DD_dod-loosening.md` with rationale.

---

## 1. Code change DoD

- [ ] Tests added/updated (unit / integration / e2e as appropriate)
- [ ] All tests pass locally
- [ ] CI green
- [ ] Code reviewed by ≥ 1 peer (project-defined threshold)
- [ ] Documentation updated **in the same PR** ([`WORKFLOW.md §2`](../WORKFLOW.md) "code change → doc change")
- [ ] No new security warnings (lint / SAST / dependency audit)
- [ ] No new TODO comments without linked work item

## 2. PRD / Use Case DoD

- [ ] Status field is `Done` or `Accepted`
- [ ] All FRs have Acceptance Criteria in G/W/T (per [`design-guide/bdd-workflow.md`](../design-guide/bdd-workflow.md))
- [ ] Non-functional requirements explicit (NFR section non-empty or marked "N/A with rationale")
- [ ] Linked persona(s) (per [`templates/6_persona.md`](./6_persona.md))
- [ ] Out-of-scope section explicit

## 3. Module Detailed Design DoD

- [ ] Status is `Implemented` (= matches current code)
- [ ] §"Functional Requirements implemented" cross-references the PRD FR IDs
- [ ] §"API specification" matches `api-contract/<module>.md` (if applicable)
- [ ] §"Testing strategy" present (or marked "N/A — no behaviour to test")
- [ ] Diagrams regenerated if architectural shape changed
- [ ] Cross-links to relevant ADRs

## 4. ADR DoD

> Per [`arc42/09-decisions/README.md`](../arc42/09-decisions/README.md):

- [ ] Status: `Proposed` → `Accepted` only after review
- [ ] ≥ 3 Decision Drivers in priority order
- [ ] ≥ 2 Considered Options (one chosen, others summarised)
- [ ] Y-statement present (Olaf Zimmermann form)
- [ ] Consequences in Positive / Negative / Neutral form
- [ ] Compliance / Validation section present (or "N/A with rationale")
- [ ] Cross-link to related / superseded ADRs

## 5. Diagram update DoD

- [ ] `diagrams/c4/workspace.dsl` (or equivalent) is the source of truth — image renders regenerated
- [ ] Names match between §5 building blocks and the DSL (no synonyms)
- [ ] arc42 §3 / §5 / §6 cross-references updated if topology changed

## 6. End-user docs DoD (Diátaxis)

- [ ] Placed in the correct Diátaxis quadrant per [`user-manual/README.md`](../user-manual/README.md)
- [ ] Reader's goal in §1 / front-matter
- [ ] Tutorials: working code snippet that the reader can paste and run
- [ ] How-to: solves one specific problem
- [ ] Reference: machine-style precise lookup
- [ ] Explanation: rationale, not instruction

## 7. Retro action item DoD

- [ ] Owner named
- [ ] Target Sprint or date named
- [ ] Tracked in work-item system with ID
- [ ] (At target) outcome recorded back in the next retro's "Continue" section

---

## Tightening log

> Append-only. Newest at top.

| Date | Change | Sprint | Rationale |
| --- | --- | --- | --- |
| YYYY-MM-DD | Added "..." to §1 Code change DoD | NN | <one-line> |

---

## References

- [Scrum Guide 2020 §Definition of Done](https://scrumguides.org/scrum-guide.html#definition-of-done)
- Scrum.org. [What Is a Definition of Done?](https://www.scrum.org/resources/what-definition-done)
- [`design-guide/dod-dor.md`](../design-guide/dod-dor.md) — the binding that defines DoD.
- [`design-guide/bdd-workflow.md`](../design-guide/bdd-workflow.md), [`design-guide/tdd-workflow.md`](../design-guide/tdd-workflow.md) — related quality bindings.
