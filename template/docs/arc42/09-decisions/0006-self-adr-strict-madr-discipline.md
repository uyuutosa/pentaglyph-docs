---
status: Proposed
owner: <placeholder>
last-reviewed: 2026-05-14
---

# ADR-0006: Apply strict MADR v3.0 discipline to the kit's own decisions (self-ADRs)

| Metadata  | Value                                                          |
| --------- | -------------------------------------------------------------- |
| Status    | **Proposed**                                                   |
| Type      | ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit     |
| Date      | 2026-05-14                                                     |
| Deciders  | pentaglyph upstream maintainer + adopting project PO            |
| Consulted | future contributors authoring self-ADRs                         |
| Informed  | all pentaglyph users                                            |
| Ticket    | Tracked via roadmap impl-plan 2026-05-14                        |

---

## Context and Problem Statement

Pentaglyph requires downstream projects to use **MADR v3.0 strict** for all architectural decisions (`STRATEGY.md §2` binds MADR; the [ADR template](../../templates/5_adr.md) carries the strict form). However, until ADR-0001..0006 (this batch), pentaglyph itself had **no ADRs documenting its own decisions** — the 5-canon binding, the operational defaults, the layer structure, the lifecycle rules. They lived as design statements inside `STRATEGY.md` and `WORKFLOW.md`, not as decision records.

This is a self-inconsistency: the kit demands strict MADR from its users but does not practise what it demands. New contributors, AI agents reading the kit, and downstream adopters auditing the kit's own choices have no canonical record of *why* pentaglyph is built the way it is.

This ADR formalises **self-ADR discipline**: every architectural decision about the kit itself is recorded as a MADR v3.0 strict ADR in `arc42/09-decisions/`, alphabetically interleaved with downstream-project ADRs but distinguished by a `Type` field tag.

---

## Decision Drivers

- **DD-1 (highest)**: Self-consistency. The kit must obey the rules it enforces on others.
- **DD-2**: Auditability. Adopters evaluating pentaglyph for regulated environments need a record of every kit-level decision and its rationale.
- **DD-3**: Contributor predictability. New contributors should know that every change to kit-level invariants requires an ADR.
- **DD-4**: AI-agent navigation. Agents reading the kit should find decision rationale in the same format they generate when prompted to write ADRs.

---

## Considered Options

1. **No formal self-ADR discipline**. Continue documenting kit decisions in `STRATEGY.md` only.
2. **Self-ADRs in a separate directory** (e.g. `arc42/09-decisions/self/`). Isolated from downstream-project ADRs.
3. **Self-ADRs in the same directory, tagged via `Type` field** (chosen). Mixed with downstream-project ADRs, distinguished by a small metadata tag.
4. **Self-ADRs in a sibling kit-only repo**. Externalised entirely.

---

## Decision Outcome

**Chosen option: Option 3 — self-ADRs in `arc42/09-decisions/`, tagged `Type: ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit`**.

Self-ADRs are MADR v3.0 strict, same template, same numbering sequence, but the `Type` field's `— self-ADR for the kit` suffix marks them as kit-meta rather than downstream-project. They share the global ADR number sequence with downstream-project ADRs (i.e. when a downstream project adopts pentaglyph, their first downstream ADR will be numbered after the highest self-ADR — currently 0006).

### Y-statement summary

> In the context of **documenting pentaglyph's own architectural decisions**, facing **a self-inconsistency where the kit enforces MADR strict on others but doesn't apply it to itself**, we decided for **self-ADRs in the standard `arc42/09-decisions/` directory using the standard MADR v3.0 strict template, distinguished by a `Type` field tag** to achieve **self-consistency, auditability for regulated adopters, and AI-agent-friendly navigation**, accepting **a small numbering complication when downstream projects adopt the kit (they start after the highest self-ADR number)**.

---

## Pros and Cons of the Options

### Option 1: No self-ADR discipline

- Pros:
  - Zero change.
- Cons:
  - Self-inconsistency persists.
  - Adopters in regulated industries reject the kit on audit grounds.

### Option 2: Separate directory (`arc42/09-decisions/self/`)

- Pros:
  - Visual separation.
- Cons:
  - Two ADR indexes to maintain.
  - Downstream-project ADRs would need to reference into a "self/" subdirectory, adding a path-quirk.

### Option 3: Same directory, `Type` tag (chosen)

- Pros:
  - One directory, one numbering sequence, one index.
  - The `Type` tag is grep-able for tooling that wants to filter.
  - Downstream projects starting from the kit see self-ADRs as examples of the form.
- Cons:
  - Numbering collision: downstream projects must check the highest self-ADR number and start above it. Mitigated by clearly stating "self-ADRs are 0001-0006 (initial batch)" in `arc42/09-decisions/README.md`.

### Option 4: Sibling kit-only repo

- Pros:
  - Total separation.
- Cons:
  - Adopters cloning the kit get nothing about the kit's own rationale.
  - Two repos to maintain.

---

## Consequences

### Positive

- Every kit-level architectural decision is now recorded in a canonical format adopters and AI agents can read.
- The kit closes the credibility loop: it now eats its own dogfood at every layer (templates → uses its own; ADRs → uses its own; arc42 → models itself with).
- Future kit decisions (e.g. introducing Measurement Layer ⑤) automatically follow the same form.

### Negative

- Adding 6 ADRs in the initial batch (this and 0001-0005) makes the `arc42/09-decisions/` directory immediately non-empty for fresh kit scaffolds. Some adopters may want to delete the self-ADRs before starting their own — `bunx pentaglyph init` should support a `--keep-self-adrs={true,false}` flag (follow-up).
- The numbering convention (self-ADRs occupy the low end) requires a one-line note in `09-decisions/README.md`.

### Neutral

- Self-ADRs follow exactly the same template as downstream-project ADRs, so the documentation discipline is identical.
- Self-ADRs may be Superseded by later self-ADRs the same way downstream-project ADRs are.

### Follow-ups

- [ ] Add a note to `arc42/09-decisions/README.md`: "ADRs 0001-NNNN are self-ADRs (kit-meta). Downstream-project ADRs start at the next free number."
- [ ] Update `cli/` (Bun CLI) to support `bunx pentaglyph init --keep-self-adrs={true,false}` (Phase 3 of impl-plan 2026-05-14, or later).
- [ ] As future kit decisions arise, propose them as ADR-0007+ with this same Type tag.

---

## Compliance / Validation

- Verification: every file in `arc42/09-decisions/` whose decisions affect kit invariants (`STRATEGY.md`, `WORKFLOW.md`, `AI_INSTRUCTIONS.md`, the layer structure, the canon list) must carry the `— self-ADR for the kit` tag in its `Type` field.
- Frequency: per-PR introducing a new ADR; periodic audit each minor release.

---

## More Information

### Related ADRs

- Companion: [ADR-0001](0001-adopt-five-layer-self-architecture.md) — the layer model that this ADR documents the meta-discipline for.
- Companion: [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md), [ADR-0003](0003-apply-day1-switching-cost-canon-criterion.md), [ADR-0004](0004-layer-separation-contracts.md), [ADR-0005](0005-surface-implicit-process-layer.md) — the other self-ADRs in the initial batch.

### References

- MADR v3.0: <https://adr.github.io/madr/>
- Nygard, M. (2011). [Documenting Architecture Decisions](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions).
- Zimmermann, O. (2017). [Y-statements: Sustainable Architectural Decisions](https://medium.com/olzzio/y-statements-10eb07b5a177).
