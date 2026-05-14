---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
type: template
template-id: 12
---

# Governance Decision Template (Type 12)

> **Use case**: record a Layer ④ Governance decision (a change to `raci.md` / `adr-accept-protocol.md` / `override-justification.md` / `contributing.md`, or a new authorisation policy). Not for individual architectural decisions — those are ADRs (Template 5).
> **Lifecycle**: Layer A (Durable). Place at `governance/<topic>-decision-YYYY-MM-DD.md`. Append-only — never edit; supersede by a newer dated file.
> **Why a separate template from ADR?** Governance decisions are *about who decides*, not *what is decided*. Conflating them with ADRs blurs the layer boundary.
>
> Delete this `> ...` guidance block after copying.

---

# Governance Decision: <topic> (YYYY-MM-DD)

| Metadata | Value |
| --- | --- |
| Status | Active / Superseded by <next-decision-file> |
| Date | YYYY-MM-DD |
| Decided by | <Acceptor name + role per `raci.md`> |
| Consulted | <names + roles> |
| Affects file(s) | `governance/<changed-file>.md`, ... |
| Layer | 4 (Governance) |

---

## 1. What changed

<One paragraph. Concretely: which file, which section, before vs after. Link to the diff if applicable.>

## 2. Why

<One paragraph. The trigger: a retrospective finding, a regulatory shift, a process pain point, a downstream request, a contradiction with another Layer ④ file.>

## 3. Authority

<Per [`raci.md`](../governance/raci.md), the Acceptor for this artefact type is <role>. The Acceptor listed in Metadata is named.>

## 4. Trade-offs

| Gained | Lost |
| --- | --- |
| <gain 1> | <loss 1> |
| <gain 2> | <loss 2> |

## 5. Reversibility

<How would the project revert this decision? Append a new dated decision file? Override locally? What is the cost?>

## 6. Effective from

<Date or condition (e.g. "next Sprint", "from Sprint 12 onwards", "immediately").>

## 7. Communication

<How was the team informed? Daily Scrum announcement / `task-list/` retro entry / Slack / mailing list? Per `raci.md` the Informed parties for this artefact type should all see this within one Sprint of the decision.>

## 8. References

<Link to:>

- The file(s) changed (with the change's commit hash if relevant)
- The trigger (retrospective output, regulatory document, downstream issue)
- [ADR-0008 Governance layer contract](../arc42/09-decisions/0008-governance-layer-contract.md)
- [`raci.md`](../governance/raci.md) and any other Layer ④ file consulted

---

## Lightweight form (for very small projects)

> If a full decision record is overkill for a 1-2 person project, use this minimal form:

```markdown
## Governance decision: <topic> (YYYY-MM-DD)

- **What changed**: <one line>
- **Why**: <one line>
- **Decided by**: <name>
- **Trade-off accepted**: <one line>
- **Effective from**: <date>
```

Lightweight form still goes in `governance/` (not `task-list/`), to preserve grep-ability of all Layer ④ decisions.
