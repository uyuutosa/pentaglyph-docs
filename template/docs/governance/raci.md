---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
layer: 4
---

# RACI matrix — who is Responsible, Accountable, Consulted, Informed for each artefact type

> **Layer ④ Governance.** This matrix is the default for downstream pentaglyph projects. Override by writing a same-named file in `<downstream>/docs/governance/`.

## Definitions

Per [Wikipedia: Responsibility assignment matrix](https://en.wikipedia.org/wiki/Responsibility_assignment_matrix) (RACI):

- **Responsible (R)**: the one who does the work. Can be multiple people.
- **Accountable (A)**: the one ultimately answerable. Exactly **one** per artefact / activity.
- **Consulted (C)**: those whose input is sought before completion.
- **Informed (I)**: those notified after completion.

Pentaglyph uses the **two-letter abbreviations** in cells: `R/A` means the person is both Responsible *and* Accountable.

## Default matrix (single-team project)

The default assumes a small single team. Multi-team / regulated overrides replace this file entirely.

| Artefact type | Author | Reviewer | Acceptor | Informed |
| --- | --- | --- | --- | --- |
| **ADR** (cross-cutting) | engineer drafting (R) | peer engineer (C) + PO (C) | architect or PO (A) | team (I) |
| **ADR** (kit-meta / self-ADR) | upstream maintainer (R) | adopting project PO (C) | upstream maintainer (A) | community (I) |
| **PRD** | PO (R/A) | engineering lead (C) | PO (A) | team (I) |
| **Use Case** | PO or BA (R) | engineering lead (C) | PO (A) | team (I) |
| **Module Detailed Design** | implementing engineer (R/A) | peer engineer (C) | engineering lead (A) | team (I) |
| **Persona / Journey / Blueprint** (UX research) | UX researcher (R/A) | PO (C) | PO (A) | team (I) |
| **Architecture Overview** (arc42 §1 / §3 / §4) | architect or engineering lead (R/A) | PO (C) | architect (A) | team (I) |
| **Process binding** (`design-guide/<canon>.md`) | engineer proposing (R) | peer engineer (C) + PO (C) | PO (A) | team (I) |
| **Governance file** (this directory) | maintainer (R) | PO (C) | PO (A) | team (I) |
| **CLI / agent / skill** (Layer ③) | implementing engineer (R/A) | peer engineer (C) | engineering lead (A) | team (I) |
| **Postmortem** (Medium+ severity) | incident lead (R/A) | engineering lead (C) | engineering lead (A) | team + PO (I) |
| **Sprint Retrospective output** | Scrum Master / facilitator (R) | team (C, in retro itself) | team consensus (A) | PO (I) |
| **DoD update** | team consensus (R/A) | engineering lead (C) | team consensus (A) | PO (I) |
| **Cost estimate** | engineer producing (R) | engineering lead (C) | PO (A) | finance / leadership (I) |

## Roles in detail

| Role | Definition | Notes |
| --- | --- | --- |
| **PO** | Product Owner | Per Scrum Guide 2020. **One person**, not a committee. Maximises product value. |
| **Engineering Lead** | senior engineer responsible for technical decisions | distinct from architect in larger orgs |
| **Architect** | cross-cutting technical decision authority | optional role; in small teams the engineering lead doubles |
| **Team** | all developers + designers + QA on the project | per Scrum Guide 2020 "Developers" |
| **Scrum Master / Facilitator** | facilitates Scrum events | per Scrum Guide 2020 |
| **Upstream Maintainer** | pentaglyph kit maintainer | for self-ADRs only |

## Decision authority quick reference

| Decision | Accepted by |
| --- | --- |
| Adopt a new template / design-guide / process binding | PO (with engineering input) |
| Override a kit default | PO (with rationale per `override-justification.md`) |
| Promote ADR `Proposed → Accepted` | per `adr-accept-protocol.md` (typically architect or engineering lead) |
| Tighten DoD | team consensus in Sprint Retrospective |
| Cancel a Sprint | PO only (per Scrum Guide 2020) |
| Reject a contribution PR | upstream maintainer (kit) or engineering lead (downstream) |

## Override examples

### Regulated industry (medical / financial)

Replace this file with one that adds:

- **Quality Officer** role (Accountable for compliance-affecting ADRs).
- **External Auditor** as Consulted on DoD changes.
- **Compliance Lead** as Informed on every ADR Accept.

### Multi-team consortium

Replace this file with one that:

- Lists each team's representative as R/A for their domain.
- Adds a **Steering Committee** as A for cross-team decisions.

## References

- [Wikipedia: Responsibility assignment matrix](https://en.wikipedia.org/wiki/Responsibility_assignment_matrix)
- [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html) — for Scrum role definitions used above.
- [ADR-0008](../arc42/09-decisions/0008-governance-layer-contract.md) — the Layer ④ contract this file implements.
