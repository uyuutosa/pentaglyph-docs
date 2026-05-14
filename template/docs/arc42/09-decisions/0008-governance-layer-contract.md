---
status: Proposed
owner: <placeholder>
last-reviewed: 2026-05-14
---

# ADR-0008: Governance Layer (④) contract — who decides, accepts, and overrides

| Metadata  | Value                                                          |
| --------- | -------------------------------------------------------------- |
| Status    | **Proposed**                                                   |
| Type      | ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit     |
| Date      | 2026-05-14                                                     |
| Deciders  | pentaglyph upstream maintainer + adopting project PO            |
| Consulted | regulated-industry adopters, OSS-project consortia              |
| Informed  | all pentaglyph users                                            |
| Ticket    | Tracked via roadmap impl-plan 2026-05-14 Phase 4                |

---

## Context and Problem Statement

[ADR-0001](0001-adopt-five-layer-self-architecture.md) introduces Layer ④ Governance as one of pentaglyph's six concern layers. [ADR-0004](0004-layer-separation-contracts.md) gives the general DO/DON'T contract: Layer ④ defines who decides, accepts, overrides — not what is decided. Until Phase 4 of the [self-architecture roadmap](../../impl-plans/2026-05-14_pentaglyph-self-architecture-roadmap.md), governance was only `owner:` front-matter — implicit and weak.

This ADR formalises Layer ④:

1. **What artefacts live in `governance/`**: a fixed set (`README.md`, `raci.md`, `adr-accept-protocol.md`, `override-justification.md`, `contributing.md`) plus dated `governance/<topic>-decision-YYYY-MM-DD.md` files for changes.
2. **What rules apply to those artefacts**: who authors, who accepts, how downstream overrides.
3. **What Layer ④ may NOT do**: take individual decisions (those are ADRs), prescribe specific processes (those are Layer ② bindings), execute automation (Layer ③).

---

## Decision Drivers

- **DD-1 (highest)**: Make the layer auditable. Regulated adopters (medical / financial / public-sector) need a concrete answer to "who decides?" and "where is that documented?".
- **DD-2**: Avoid Layer ④ → ① writes. Governance can audit any layer but must not mutate templates, design-guides, or ADRs.
- **DD-3**: Keep the layer small. A bloated governance directory is itself a governance failure (becomes unread).
- **DD-4**: Provide a default that single-team projects can adopt without modification while regulated / multi-team projects can extend.

---

## Considered Options

1. **No Layer ④ formalisation**. Continue with `owner:` front-matter only. Implicit governance.
2. **Layer ④ as a single `governance.md` file**. Compact but conflates RACI / Accept / Override / Contribute.
3. **Layer ④ as a directory with 4-5 fixed files** (chosen). One file per concern.
4. **Layer ④ as a versioned governance.yaml**. Machine-readable but loses prose explanation.

---

## Decision Outcome

**Chosen option: Option 3 — directory with 5 fixed files**.

### Structure

```
governance/
├── README.md                       ← navigation + layer role
├── raci.md                         ← per-artefact-type Responsible/Accountable/Consulted/Informed
├── adr-accept-protocol.md          ← Proposed → Accepted transition rules
├── override-justification.md       ← format + policy for downstream overrides
└── contributing.md                 ← upstream contribution flow (PR procedure)
```

Additional **dated** files capture Layer ④ changes:

```
governance/<topic>-decision-YYYY-MM-DD.md   ← uses templates/12_governance-decision.md
```

### Contract (Layer ④ DO / DON'T)

| DO | DON'T |
| --- | --- |
| Define **who decides** for each artefact type | Take individual decisions (use ADRs) |
| Define **how decisions are accepted** (review threshold, reviewer count, Acceptor role) | Define **what** is accepted (the substance is the ADR's job) |
| Define **how downstream overrides** are recorded | Pre-approve overrides (each override has its own rationale) |
| Define **how upstream contributions** flow | Implement the flow (that's Layer ③ Automation) |
| Audit any Layer ⓪-③ artefact for governance compliance | Mutate any Layer ⓪-③ artefact |

### Layer ④ write authority

Per [ADR-0004](0004-layer-separation-contracts.md), Layer ④ writes only into `governance/`. Specifically:

- **README.md / raci.md / adr-accept-protocol.md / override-justification.md / contributing.md** — edited by hand via PR, reviewed per `adr-accept-protocol.md` (the file references itself for review process, intentionally — Layer ④ is self-bootstrapping).
- **`<topic>-decision-YYYY-MM-DD.md`** — append-only. Each governance decision creates a new file (uses template 12); existing files are never edited (immutable).

### Y-statement summary

> In the context of **giving pentaglyph an explicit Layer ④ Governance home (the `governance/` directory)**, facing **the choice between informal `owner:` front-matter and over-formalised governance.yaml**, we decided for **a directory with 5 fixed files (README, raci, adr-accept-protocol, override-justification, contributing) plus append-only dated decision files using template 12** to achieve **auditable Layer ④ that regulated adopters can extend and small projects can adopt unchanged**, accepting **a small upfront authoring cost for the 5 default files**.

---

## Pros and Cons of the Options

### Option 1: No Layer ④ formalisation

- Pros:
  - Zero authoring.
- Cons:
  - Regulated adopters reject pentaglyph on audit.
  - "Who can Accept an ADR?" remains implicit. Bus-factor risk.

### Option 2: Single `governance.md`

- Pros:
  - Compact.
- Cons:
  - Conflates four orthogonal concerns. Editing one (e.g. RACI) risks breaking the others.
  - File becomes very long; readers stop reading.

### Option 3: 5-file directory (chosen)

- Pros:
  - Each file has one job.
  - `grep -r governance/` lists the kit's governance surface.
  - Downstream overrides target one file at a time, reducing override friction.
- Cons:
  - 5 default files to author once. Mitigated by templates being short.

### Option 4: governance.yaml

- Pros:
  - Machine-readable; programmatic audit.
- Cons:
  - Loses the prose explanation that humans actually read.
  - YAML schema becomes a versioning headache.

---

## Consequences

### Positive

- Regulated adopters get a concrete file set to point auditors at.
- ADR `Proposed → Accepted` has a defined procedure ([`governance/adr-accept-protocol.md`](../../governance/adr-accept-protocol.md)).
- Downstream overrides have a documented format ([`governance/override-justification.md`](../../governance/override-justification.md)).
- Upstream contributions have a documented flow ([`governance/contributing.md`](../../governance/contributing.md)).
- Layer ④ becomes greppable: `find docs/governance -name "*.md"` lists every governance artefact.

### Negative

- 5 default files to maintain. Routine maintenance is light (these are stable structural docs) but they must not rot.
- Any future Layer ④ change requires authoring a dated decision file per template 12. Slight overhead.

### Neutral

- Layer ④ does not change existing kit behaviour. It surfaces what was implicit.
- Single-team projects can adopt the defaults verbatim — no immediate override authoring required.

### Follow-ups

- [ ] Implement governance/ in the kit (Phase 4 of self-architecture roadmap — this ADR's batch).
- [ ] Add `--governance=full|minimal|none` flag to `pentaglyph init` (forthcoming, Phase 3 of automation deliverables).
- [ ] Layer-aware lint to verify Layer ④ files don't include statements that should be ADRs.

---

## Compliance / Validation

- Verification:
  - The 5 governance files exist after `pentaglyph init --profile=standard|full`.
  - Each governance file declares `layer: 4` in front-matter.
  - Governance decision files use `templates/12_governance-decision.md`.
- Frequency: per-PR + periodic audit each minor release.

---

## More Information

### Related ADRs

- Builds on: [ADR-0001](0001-adopt-five-layer-self-architecture.md), [ADR-0004](0004-layer-separation-contracts.md).
- Complements: [ADR-0006](0006-self-adr-strict-madr-discipline.md) — strict MADR discipline that `adr-accept-protocol.md` enforces.
- Complements: [ADR-0007](0007-automation-layer-contract.md) — Layer ③ Automation contract, which Layer ④ may audit but not mutate.

### References

- [`STRATEGY.md §11 Layer ④ Governance`](../../STRATEGY.md) (forthcoming reorganisation in Phase 4 of self-architecture roadmap).
- [`governance/README.md`](../../governance/README.md) — directory's authoritative navigation.
- [Wikipedia: Responsibility assignment matrix](https://en.wikipedia.org/wiki/Responsibility_assignment_matrix) — RACI definitions used in `raci.md`.
