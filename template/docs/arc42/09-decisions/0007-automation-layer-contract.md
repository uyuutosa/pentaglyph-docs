---
status: Proposed
owner: <placeholder>
last-reviewed: 2026-05-14
---

# ADR-0007: Automation Layer (③) contract — what cli/ + .claude/ + scripts/docs/ may and may not do

| Metadata  | Value                                                          |
| --------- | -------------------------------------------------------------- |
| Status    | **Proposed**                                                   |
| Type      | ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit     |
| Date      | 2026-05-14                                                     |
| Deciders  | pentaglyph upstream maintainer + adopting project PO            |
| Consulted | AI agents authoring kit extensions                              |
| Informed  | downstream pentaglyph adopters                                  |
| Ticket    | Tracked via roadmap impl-plan 2026-05-14 Phase 3                |

---

## Context and Problem Statement

[ADR-0001](0001-adopt-five-layer-self-architecture.md) identifies Layer ③ Automation as one of the kit's six concern layers, containing `cli/` (the Bun scaffolder), `.claude/` (Claude Code rules / agents / skills), and a future `scripts/docs/` Python tooling tree. [ADR-0004](0004-layer-separation-contracts.md) establishes the general DO/DON'T contracts per layer and the strict one-way dependency direction (⓪ → ① → ② → ③ → ④ → ⑤).

However, Layer ③ has one structural complication that the general ADR-0004 contract does not address: **the CLI sub-command `pentaglyph add-process` writes into Layer ② Process** (it scaffolds a new `design-guide/<canon>-workflow.md` file). On a literal reading of ADR-0004, this is a violation — Layer ③ Automation should not write into Layer ② Process.

The trade-off:

- Mechanically prevent Layer ③ → ② writes → `add-process` cannot exist → Layer ② extensibility ([ADR-0001](0001-adopt-five-layer-self-architecture.md) §"β extensibility") loses its CLI scaffold path. New canon bindings are author-by-hand only.
- Allow unrestricted Layer ③ → ② writes → `add-process` is fine, but so is any future agent / script that decides to mutate `design-guide/` for any reason. Layer-separation discipline erodes.

A clean contract for Layer ③ is needed. This ADR carves the principle into rules that admit `add-process` as a deliberate, named exception while still preserving the spirit of ADR-0004.

---

## Decision Drivers

- **DD-1 (highest)**: Preserve the spirit of [ADR-0004](0004-layer-separation-contracts.md) layer separation — no general permission for Layer ③ to mutate higher layers.
- **DD-2**: Admit the β-extensibility CLI path (`add-process`) without a special-case ADR per future command.
- **DD-3**: Define mechanically-checkable rules a future layer-aware lint can enforce.
- **DD-4**: Keep the contract short enough that contributors actually read it.

---

## Considered Options

1. **Strict reading of ADR-0004 (no exceptions)**. `pentaglyph add-process` cannot exist; new bindings are author-by-hand only.
2. **Open Layer ③ → Layer ② writes globally**. Any Layer ③ component may mutate Layer ②.
3. **Named-exception contract: Layer ③ → ② writes are forbidden by default, with a numbered allow-list of explicit exceptions** (chosen).
4. **Move `add-process` to Layer ① by reframing it as "a template that the user types"**. Wordplay; doesn't solve the problem because the *executor* (CLI) still writes.

---

## Decision Outcome

**Chosen option: Option 3 — named-exception contract**.

### 3.1 Default rule (mechanically enforced)

Per [ADR-0004](0004-layer-separation-contracts.md), Layer ③ Automation components must:

- **Read** any subset of layers ⓪ ① ②.
- **Write into Layer ①** when scaffolding artefacts (e.g. `pentaglyph init`, `adr-writer` agent).
- **Not write into layers ② ④ ⑤** by default.
- **Not write into Layer ③ itself** (the kit's own automation files are authored by hand and reviewed via PRs).

### 3.2 Explicit allow-list

The following Layer ③ → ② writes are permitted, each justified individually:

| # | Operation | Component | Writes file | Why permitted |
| --- | --- | --- | --- | --- |
| **E-1** | Scaffold a new canon binding | `pentaglyph add-process <canon>` (forthcoming CLI sub-command) | `design-guide/<canon>-workflow.md` | Operationalises β extensibility requirement of [ADR-0001](0001-adopt-five-layer-self-architecture.md). The scaffold is **template-driven** (uses `_binding-a-new-process.md` 6-section template — see [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md)) and produces a placeholder requiring human completion before bind. Cannot bypass [ADR-0003](0003-apply-day1-switching-cost-canon-criterion.md) four-axis criterion — the scaffold inserts an empty §2 table that humans must fill. |

Adding a new entry to this allow-list requires a new ADR superseding this one or a follow-up ADR amending §3.2 specifically.

### 3.3 Sub-component obligations

| Sub-component | Obligation |
| --- | --- |
| `cli/` | (a) Every sub-command's README entry must declare its read/write layer interactions. (b) Each command's source must `assert` it does not write outside its declared layers (best-effort, via the layer-aware lint when it ships). |
| `.claude/agents/` | Each agent's front-matter must include `layer-writes: [1]` (or `[1, 2-E-1]` for the future `add-process` agent counterpart, if any). |
| `.claude/skills/` | Same as agents. Skills generally read more than they write; many are read-only and should declare `layer-writes: []`. |
| `scripts/docs/` (forthcoming) | Same as agents/skills. Most metrics / lint scripts are read-only (`layer-writes: [5]` for those that emit to `metrics/`). |

### 3.4 Verification

- **Manual**: PR review verifies new sub-components declare correct `layer-writes` and that the declarations match actual behaviour.
- **Automated (forthcoming)**: `scripts/docs/lint_layer_citations.py` (Phase 3 of the self-architecture roadmap) will parse front-matter and source code to detect undeclared layer writes.

### Y-statement summary

> In the context of **defining the contract for Layer ③ Automation components, including the tension created by the future `pentaglyph add-process` CLI sub-command writing into Layer ② Process**, facing **the choice between blocking β extensibility automation (strict) or eroding layer separation (open)**, we decided for **a named-exception contract: Layer ③ → ② writes are forbidden by default, with a numbered allow-list of justified exceptions (currently only E-1: `add-process`)** to achieve **β extensibility automation without losing layer-separation discipline**, accepting **that adding new exceptions requires a follow-up ADR**.

---

## Pros and Cons of the Options

### Option 1: Strict — no exceptions

- Pros:
  - Maximally mechanical layer separation.
- Cons:
  - β extensibility CLI scaffold cannot exist.
  - Adopters add new bindings by hand-copying the 6-section template — error-prone and slower onboarding.

### Option 2: Open Layer ③ → ② writes

- Pros:
  - No special-case logic.
- Cons:
  - Any future automation can silently mutate Layer ② — automation grows tendrils into the canon-binding rules without explicit review.
  - Defeats ADR-0004's main protection.

### Option 3: Named-exception contract (chosen)

- Pros:
  - β extensibility lives; strictness is preserved for everything else.
  - The allow-list is discoverable (one numbered table in this ADR).
  - Future exceptions go through ADR review — auditable.
- Cons:
  - One extra ADR amendment per future exception. Acceptable cost (rare events).

### Option 4: Reframe `add-process` as Layer ①

- Pros:
  - No exception needed if the framing fits.
- Cons:
  - Doesn't fit: the CLI still writes a file. Reframing only the *concept* doesn't change what the *executor* does. PR reviewers will see Layer ③ writing into `design-guide/` regardless.

---

## Consequences

### Positive

- `pentaglyph add-process` ships with a clean contract.
- Future Layer ③ components inherit the strict default; adopters can predict the answer when they wonder "can this script also do X?" (probably no, unless E-2 is added).
- The layer-aware lint has a clear specification to enforce.

### Negative

- Every new exception requires an ADR. Acceptable: exceptions should be rare; the ADR cost is the gatekeeper.
- The contract requires front-matter discipline (`layer-writes` field) which adds slight verbosity to each automation file.

### Neutral

- The contract does not change existing automation behaviour (`init`, `add`, existing Claude Code agents already comply on inspection).

### Follow-ups

- [ ] Implement `scripts/docs/lint_layer_citations.py` (Phase 3 of self-architecture roadmap).
- [ ] Add `layer-writes` front-matter to all existing `.claude/agents/` and `.claude/skills/` files.
- [ ] Implement `pentaglyph add-process` CLI sub-command (E-1).

---

## Compliance / Validation

- Verification:
  - Every file under `cli/src/commands/`, `.claude/agents/`, `.claude/skills/`, `scripts/docs/` must declare `layer-writes` (front-matter for `.md`, header comment for code).
  - PR review checks the declaration matches actual behaviour.
  - Forthcoming layer-aware lint automates the cross-check.
- Frequency: per-PR + periodic audit each minor release.

---

## More Information

### Related ADRs

- Builds on: [ADR-0001](0001-adopt-five-layer-self-architecture.md), [ADR-0004](0004-layer-separation-contracts.md).
- Operationalises: [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md) (the bind-only rule is enforced inside E-1's scaffold).
- Complementary: [ADR-0003](0003-apply-day1-switching-cost-canon-criterion.md) — the four-axis criterion that human authors must complete in E-1's scaffolded §2 table.

### References

- [`STRATEGY.md §11`](../../STRATEGY.md) — Layer ③ Automation overview.
- [`cli/README.md`](../../../cli/README.md) §"Role in pentaglyph's self-architecture" — command-by-command layer interactions.
- [`.claude/README.md`](../../../template/.claude/README.md) — agent / skill / rule layer interactions.
