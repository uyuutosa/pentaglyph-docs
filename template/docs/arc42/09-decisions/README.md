---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
---

# arc42 §9 — Architecture Decision Records (ADRs)

> Authoritative source for the section: <https://docs.arc42.org/section-9/>
> Authoritative source for the format: **MADR v3.0** — <https://adr.github.io/madr/>

## File naming

`NNNN-<kebab-title>.md` where `NNNN` is a zero-padded 4-digit sequence, globally unique across the project.

Examples:

- `0001-adopt-postgres-as-primary-store.md`
- `0002-use-jwt-for-service-to-service-auth.md`

## Template

Always start from [`../../templates/5_adr.md`](../../templates/5_adr.md). Do not invent a homemade ADR format.

## Status legend

| Status                | Meaning                                                                   |
| --------------------- | ------------------------------------------------------------------------- |
| **Proposed**          | Draft; under team review. Body may still be edited.                       |
| **Accepted**          | Ratified. **Body is immutable** — supersede with a new ADR, do not edit.  |
| **Rejected**          | Considered and explicitly rejected. Kept for traceability.                |
| **Superseded by NNNN**| Replaced by the cited ADR. Read the superseding ADR for the current decision. |
| **Deprecated**        | No longer relevant; no active replacement.                                |

## Authoring rules

1. **One file per decision.** No grouped ADRs.
2. **Status field** must be one of the values in the legend above.
3. **All external rationale** (regulatory documents, design specs, business analysis) must be absorbed into the ADR body or linked. Do not link to ephemeral chat / ticket comments as the only source.
4. **Date in ISO 8601** (`YYYY-MM-DD`).
5. **Once `Accepted`, body is immutable.** If the decision changes, write a new ADR with `Supersedes: NNNN`, then update the old ADR's status to `Superseded by MMMM`.
6. **Y-statement** required in the Decision Outcome section (Olaf Zimmermann form).
7. **Minimums**: 3 Decision Drivers, 2 Considered Options, Consequences in Positive / Negative / Neutral form, Compliance / Validation section.

## Index

### Self-ADRs (kit-meta, ADRs 0001-0009)

These ADRs document **pentaglyph's own** architectural decisions. They are distinguished by the `— self-ADR for the kit` suffix in their `Type` field ([ADR-0006](0006-self-adr-strict-madr-discipline.md)). Downstream projects adopting pentaglyph **either keep or delete** these self-ADRs (`bunx pentaglyph init --keep-self-adrs={true,false}` once that flag ships); their own ADRs start at the next free number.

| #    | File                                                                                          | Title                                                                          | Status   | Date       |
| ---- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------- | ---------- |
| 0001 | [0001-adopt-five-layer-self-architecture.md](./0001-adopt-five-layer-self-architecture.md)    | Adopt a 5-layer self-architecture (+ optional Measurement)                     | Proposed | 2026-05-14 |
| 0002 | [0002-bind-canons-only-no-self-authored-standards.md](./0002-bind-canons-only-no-self-authored-standards.md) | Bind external canons only (extended to Layer ② Process)                        | Proposed | 2026-05-14 |
| 0003 | [0003-apply-day1-switching-cost-canon-criterion.md](./0003-apply-day1-switching-cost-canon-criterion.md)     | Apply the (day-1 × switching-cost × external-canon × domain-neutrality) criterion | Proposed | 2026-05-14 |
| 0004 | [0004-layer-separation-contracts.md](./0004-layer-separation-contracts.md)                    | Strict layer separation contracts (DO/DON'T + one-way dependency direction)     | Proposed | 2026-05-14 |
| 0005 | [0005-surface-implicit-process-layer.md](./0005-surface-implicit-process-layer.md)            | Surface the implicit Process layer (Layer ② = surface, not invent)              | Proposed | 2026-05-14 |
| 0006 | [0006-self-adr-strict-madr-discipline.md](./0006-self-adr-strict-madr-discipline.md)          | Apply strict MADR v3.0 discipline to the kit's own decisions                    | Proposed | 2026-05-14 |
| 0007 | [0007-automation-layer-contract.md](./0007-automation-layer-contract.md)                      | Automation Layer ③ contract — named-exception allow-list for Layer ② writes     | Proposed | 2026-05-14 |
| 0008 | [0008-governance-layer-contract.md](./0008-governance-layer-contract.md)                      | Governance Layer ④ contract — directory with 5 fixed files + dated decisions    | Proposed | 2026-05-14 |
| 0009 | [0009-measurement-layer-activation.md](./0009-measurement-layer-activation.md)                | Measurement Layer ⑤ activation (optional) — 5 categories + dogfooded baseline   | Proposed | 2026-05-14 |

### Downstream-project ADRs

Maintain a section like the example below in your downstream `arc42/09-decisions/README.md`. Group ADRs by theme. Start numbering at the next free number after the highest self-ADR.

```markdown
### Runtime / SDK Foundation

| #     | File                                                | Title                                       | Status   | Date       |
| ----- | --------------------------------------------------- | ------------------------------------------- | -------- | ---------- |
| 0007  | [0007-...](./0007-...md)                            | <decision title>                            | Proposed | YYYY-MM-DD |
```

## References

- MADR v3.0 — <https://adr.github.io/madr/>
- Michael Nygard original (2011) — <https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions>
- Y-statements (Olaf Zimmermann) — <https://medium.com/olzzio/y-statements-10eb07b5a177>
- arc42 §9 — <https://docs.arc42.org/section-9/>
