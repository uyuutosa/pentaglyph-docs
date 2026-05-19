---
status: Accepted
owner: <placeholder>
last-reviewed: 2026-05-19
---

# ADR-0010: Adopt explicit layer-prefixed directory names under `docs/` (`01-artefacts/`, `02-process/`, `04-04-governance/`, `05-measurement/`)

| Metadata  | Value                                                          |
| --------- | -------------------------------------------------------------- |
| Status    | **Accepted** (was Proposed 2026-05-16; promoted on upstream restructure 2026-05-19) |
| Type      | ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit     |
| Date      | 2026-05-16 (Proposed) / 2026-05-19 (Accepted)                  |
| Deciders  | pentaglyph upstream maintainer + adopting project PO            |
| Consulted | downstream maintainers, AI agents authoring kit extensions      |
| Informed  | all pentaglyph users (npm consumers + subtree consumers)        |
| Ticket    | Tracked via impl-plan `2026-05-16_layer-prefixed-directories-migration.md` |

---

## Context and Problem Statement

[ADR-0001](0001-adopt-five-layer-self-architecture.md) adopts a 5 (+1) layer concern axis (⓪ Standards / ① Artefacts / ② Process / ③ Automation / ④ Governance / ⑤ Measurement). [ADR-0004](0004-layer-separation-contracts.md) defines responsibility contracts and one-way dependency direction (⓪ → ① → ② → ③ → ④ → ⑤).

However, the current directory layout under `docs/` is **flat** and labels each directory by topic (`01-artefacts/arc42/`, `02-process/`, `04-governance/`, `05-measurement/`, etc.). The mapping from directory name to layer lives in a **single table** in [`01-artefacts/arc42/05-building-blocks/pentaglyph-self-architecture.md §3.1`](../05-building-blocks/pentaglyph-self-architecture.md) and a parallel column in [`STRATEGY.md §3.2`](../../STRATEGY.md).

This produces three problems observed during the 2026-05-16 downstream binding work ([case study](../../../case-studies/2026-05-16_ai-clone-downstream-process-binding.md) — AI-clone PoC, tacit-knowledge digital twin builder):

1. **Layer attribution requires lookup.** A new contributor (or an AI agent) opening `docs/` cannot tell from the listing alone which layer a directory belongs to. They must consult §3.1 every time. The repeated context-switch is the kind of friction the kit otherwise eliminates.
2. **Dependency-direction violations are not visually obvious.** When `docs/01-artefacts/detailed-design/foo.md` cites `docs/02-process/bar.md`, a reviewer must internalise that this crosses Layer ① → Layer ②, which is reverse-dependency and therefore a violation per ADR-0004. The path strings give no visual signal.
3. **Layer-aware automation has weak hooks.** A forthcoming `scripts/docs/lint_layer_citations.py` (ADR-0004 Follow-ups) must hard-code the directory-to-layer mapping. Any rename or addition to that mapping requires editing the lint script in lockstep. Putting the layer in the path itself eliminates the lookup table.

The kit already prescribes explicit numeric prefixes inside arc42 (`01-introduction-and-goals/` ... `09-decisions/`) — extending the same convention to the layer dimension is consistent with arc42's own ordering convention and with the way the layers are numbered in the existing diagrams.

---

## Decision Drivers

- **DD-1 (highest)**: Make layer membership readable directly from the path — no lookup needed.
- **DD-2**: Make dependency-direction violations visually obvious in PR diffs.
- **DD-3**: Give automation (lint, indexing, doc-sync) a parsable layer signal in every path.
- **DD-4**: Preserve the canon-prescribed internal structure of each standard — arc42's `01-...09-` numbering, Diátaxis's quadrant names, MADR's ADR file naming all stay untouched.
- **DD-5**: Keep migration cost finite and one-shot — accept that every cross-reference must be rewritten, but only once.

---

## Considered Options

1. **Status quo (flat directories, layer mapped via `§3.1` table only)**.
2. **Front-matter `layer:` tag on every file, directories unchanged**. Each `.md` file gains `layer: 2` in front-matter; directories stay flat. Lint reads the tag.
3. **Explicit layer-prefixed directories** (chosen) — `docs/01-artefacts/`, `docs/02-process/`, `docs/04-04-governance/`, `docs/05-measurement/`. Layer ⓪ has no directory (per ADR-0001, ⓪ is link-out only). Layer ③ Automation stays at repo root (`.claude/`, `cli/`, `scripts/docs/`) since it is intentionally outside `docs/`.
4. **Hybrid: front-matter tag + selective directory rename** (rename only the small-population layers, `02-process/`, `04-04-governance/`, `05-measurement/`; keep Layer ① flat).

---

## Decision Outcome

**Chosen option: Option 3 — explicit layer-prefixed directories under `docs/`**.

### New layout

```
docs/
├── README.md                        # NEW: layer map index
├── INDEX.md                          # cross-layer index
├── STRATEGY.md                      # spans ⓪+①+④, kit entry-point — stays at root
├── WORKFLOW.md                       # spans ①+meta, primary entrypoint — stays at root
├── AI_INSTRUCTIONS.md                # AI orientation — stays at root
│
├── 01-artefacts/                    # Layer ① Artefacts
│   ├── 01-artefacts/arc42/                       # internal `01-..-09-` numbering unchanged
│   │   ├── 01-introduction-and-goals/
│   │   ├── 02-architecture-constraints/
│   │   ├── 03-context-and-scope/
│   │   ├── 04-solution-strategy/
│   │   ├── 05-building-blocks/
│   │   ├── 06-runtime/
│   │   ├── 07-deployment/
│   │   ├── 08-crosscutting/
│   │   ├── 09-decisions/
│   │   ├── 10-quality/
│   │   ├── 11-risks/
│   │   └── 12-glossary/
│   ├── 01-artefacts/api-contract/
│   ├── 01-artefacts/detailed-design/
│   ├── 01-artefacts/diagrams/c4/                 # Structurizr DSL + exports
│   ├── 01-artefacts/service-design/              # TiSDD: personas / journeys / blueprints
│   ├── 01-artefacts/templates/
│   ├── 01-artefacts/user-manual/                 # Diátaxis quadrants
│   ├── 01-artefacts/impl-plans/                  # volatile (Layer B change-rate)
│   ├── 01-artefacts/postmortems/                 # volatile
│   ├── 01-artefacts/reports/                     # volatile
│   ├── 01-artefacts/cost-estimates/              # volatile
│   └── 01-artefacts/task-list/                   # volatile
│
├── 02-process/                      # Layer ② Process (formerly 02-process/)
│   ├── _binding-a-new-process.md
│   ├── _future-bindings.md
│   ├── ai-augmented-pr.md
│   ├── architecture-guidebook.md
│   ├── bdd-workflow.md
│   ├── code-tours.md
│   ├── dev-cycle.md
│   ├── dod-dor.md
│   ├── tdd-workflow.md
│   └── version-control.md
│
├── 04-04-governance/                   # Layer ④ Governance (formerly 04-governance/)
│   └── …
│
└── 05-measurement/                  # Layer ⑤ Measurement (formerly 05-measurement/, optional)
    └── …
```

**Layer ⓪ has no directory** — per ADR-0001, ⓪ is pure link-out (URLs only) and lives as `STRATEGY.md §2`. No directory is created.

**Layer ③ Automation stays at repo root** — `.claude/`, `cli/`, `scripts/docs/` are intentionally outside `docs/` because they are *code*, not *documentation*. The layer-prefixed convention applies only inside `docs/`. (A future ADR may extend the convention to `.claude/03-automation/` etc., but that is out of scope for this ADR.)

**Cross-layer kit entry-points stay at `docs/` root** — `STRATEGY.md`, `WORKFLOW.md`, `AI_INSTRUCTIONS.md`, `INDEX.md`, `README.md` deliberately span multiple layers (per ADR-0004 Consequences). They function as kit-wide orientation and are not pinned to any single layer's directory.

### Y-statement summary

> In the context of **navigating pentaglyph's `docs/` tree as a contributor or AI agent**, facing **layer membership being inferable only from a remote table in `self-architecture.md §3.1`, which makes dependency-direction violations invisible in paths and forces a constant context-switch**, we decided for **explicit layer-prefixed directories (`01-artefacts/`, `02-process/`, `04-04-governance/`, `05-measurement/`) under `docs/`, leaving Layer ⓪ directory-less, Layer ③ at repo root, and cross-layer entry-points at `docs/` root** to achieve **layer-readability from the path alone, visually obvious dependency-direction violations in diffs, and a parsable layer signal for automation**, accepting **a one-shot migration cost of rewriting all cross-references across both pentaglyph upstream and downstream consumers, and a breaking-change major version bump of the published kit**.

---

## Pros and Cons of the Options

### Option 1: Status quo (flat, table lookup)

- Pros:
  - Zero migration cost.
  - No breaking change for downstream consumers.
- Cons:
  - Every new contributor / AI agent must internalise §3.1 before placing files correctly.
  - Reverse-dependency violations look identical to legitimate citations in path strings (`01-artefacts/detailed-design/foo.md` ↔ `02-process/bar.md` — which way is the layer arrow?).
  - Layer-aware automation must hard-code the directory mapping.

### Option 2: Front-matter `layer:` tag, directories unchanged

- Pros:
  - Lower migration cost (touch every file, but no path rewriting).
  - Layer-aware lint can read the tag without a hard-coded mapping.
- Cons:
  - Layer is still invisible in path strings → reverse-dependency violations in diffs still look identical to legitimate citations.
  - Tags can be omitted or drift from the canonical mapping; directories are physical and self-enforcing.
  - The tag has no signal during `ls docs/` or `find docs/` — exactly the operations new contributors / AI agents perform first.

### Option 3: Explicit layer-prefixed directories (chosen)

- Pros:
  - Layer is readable directly from any path: `docs/02-process/dev-cycle.md` is unmistakably Layer ②.
  - Reverse-dependency citations become visually obvious in PR diffs (a Layer ① file linking `../../02-process/foo.md` is a directional warning).
  - Automation parses the layer from the path with `path.split('/')[1]` — no lookup table.
  - Aligns with arc42's existing convention of numeric prefixes for ordering (`01-introduction-and-goals/` … `09-decisions/`).
- Cons:
  - **One-shot migration of every cross-reference** in both pentaglyph upstream and downstream consumers.
  - **Breaking change for published kit** — npm consumers on `@uyuutosa/pentaglyph` and subtree consumers must coordinate a major version bump (`0.x.y` → `1.0.0` or `1.x.y` → `2.0.0`).
  - Three levels of numeric prefixes for ADRs: `docs/01-artefacts/arc42/09-decisions/0001-...md` — visually busier than the flat form (`docs/01-artefacts/arc42/09-decisions/0001-...md`).

### Option 4: Hybrid (tag + selective rename)

- Pros:
  - Lower migration cost than Option 3.
  - Layer ② / ④ / ⑤ become visually obvious where they were previously buried.
- Cons:
  - Inconsistent — half of `docs/` uses prefixed paths, half uses tags. New contributors must learn two systems.
  - The "obvious in path" benefit applies only to the small-population layers; the largest layer (① Artefacts) — where most files live — keeps the lookup problem.
  - Hybrid systems tend to bit-rot: the tag side drifts because the directory side enforces nothing.

---

## Consequences

### Positive

- A new contributor opening `docs/01-artefacts/detailed-design/foo.md` knows immediately this is Layer ①.
- A reviewer seeing `from docs.01-artefacts.detailed-design.foo import bar` in a Python file or `[link](../../02-process/bar.md)` from a Layer ① doc has visual signal of layer boundary.
- The layer-aware lint (ADR-0004 Follow-up) becomes trivial: parse the first segment after `docs/`.
- Downstream projects following the same convention get the same benefit, and the convention transmits via the kit's scaffolder CLI.

### Negative

- **One-shot migration disrupts in-flight PRs and worktrees**. The migration PR must be coordinated to merge during a quiet window.
- **All downstream consumers must coordinate**. Subtree consumers (e.g. the AI-clone PoC reference adopter) must subtree-pull this change and then rewrite their own paths in the same coordinated PR. NPM consumers must pin the old major version until they migrate.
- **arc42 ADR paths become longer**: `docs/01-artefacts/arc42/09-decisions/0001-…md` is 8 characters longer than `docs/01-artefacts/arc42/09-decisions/0001-…md`. Repeated in every cross-reference, this adds up.
- **Wiki sync paths change**. Any downstream that mirrors `docs/` to a wiki (e.g. the AI-clone PoC mirrors to Azure DevOps Wiki) must update its sync script's path mapping.

### Neutral

- The internal structure of each canon (arc42's `§1..§12`, Diátaxis's `tutorials/how-to/reference/explanation/`, MADR's `0001-…md`) is **unchanged**. Only the outer wrapper changes.
- Cross-layer kit entry-points (`STRATEGY.md`, `WORKFLOW.md`, `AI_INSTRUCTIONS.md`, `INDEX.md`, `README.md`) stay at `docs/` root — they are intentionally directory-less because they span layers.

### Follow-ups

- [ ] Land impl-plan `2026-05-16_layer-prefixed-directories-migration.md` (in `docs/01-artefacts/impl-plans/`) with phase-by-phase migration steps. The impl-plan currently lives only in the AI-clone downstream subtree; upstream import is tracked as a follow-up PR.
- [ ] Update [`pentaglyph-self-architecture.md`](../05-building-blocks/pentaglyph-self-architecture.md) §3 Container view to reflect the new directory paths.
- [ ] Update [`STRATEGY.md`](../../STRATEGY.md) §3 taxonomy to reflect the new paths.
- [ ] Update [`WORKFLOW.md`](../../WORKFLOW.md) §1 decision tree to point to new paths.
- [ ] Update the CLI scaffolder (`cli/src/`) to emit the new directory layout.
- [ ] Implement layer-aware lint (`scripts/docs/lint_layer_citations.py`) parsing path-prefix segments.
- [ ] Major version bump of the published kit on next release.
- [ ] Coordinate downstream subtree pull + downstream-specific path rewriting in a single PR (AI-clone PoC as the reference adopter).

---

## Compliance / Validation

- Verification:
  - All cross-references in `docs/` resolve after migration (link-check CI).
  - Layer-aware lint reports zero reverse-dependency citations.
  - The CLI scaffolder produces the new layout for fresh projects.
- Frequency: per-PR (link check + layer lint) + a full-repo audit before each minor release.

---

## More Information

### Related ADRs

- Builds on: [ADR-0001](0001-adopt-five-layer-self-architecture.md) — defines the 5+1 layers this ADR prefixes into paths.
- Builds on: [ADR-0004](0004-layer-separation-contracts.md) — defines the dependency direction this ADR makes visually obvious.
- Complementary: [ADR-0007](0007-automation-layer-contract.md) — Layer ③ stays at repo root, not under `docs/`.

### Why now

The 2026-05-16 downstream binding work ([case study](../../../case-studies/2026-05-16_ai-clone-downstream-process-binding.md) — AI-clone PoC) was about to add a new Layer ② file (`ai-augmented-lifecycle.md`) under the flat `02-process/` directory. During the dependency-direction review for that file, the layer-lookup friction became concrete enough to warrant fixing the structure first. Adding the new file to the flat structure and then moving it within days would have been wasteful; structuring first lets the new file land in its final location once.

### References

- arc42 §5 — Building Block View; the directory-as-container view of the kit.
- [`01-artefacts/arc42/05-building-blocks/pentaglyph-self-architecture.md`](../05-building-blocks/pentaglyph-self-architecture.md) §3.1 — the table this ADR makes redundant (the layer mapping is now in the paths).
- arc42's own ordering convention (`01-introduction-and-goals/` … `09-decisions/`) — the numeric-prefix precedent this ADR extends.
