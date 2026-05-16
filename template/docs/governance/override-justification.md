---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
layer: 4
---

# Override justification — format and policy for downstream overrides of kit defaults

> **Layer ④ Governance.** Pentaglyph is opinionated but not prescriptive: every default has an override path. This file defines the **format** a downstream project must use to record an override, and the **policy** that determines whether the override is acceptable.

## When does this file apply?

Whenever a downstream project changes any of:

- A pentaglyph operational default ([`STRATEGY.md §9`](../STRATEGY.md) Branching / AI-PR / Code Tours / BDD / Scrum / DoD-DoR / TDD).
- A template under [`templates/`](../templates/).
- A Layer ② Process binding under [`design-guide/`](../design-guide/).
- A Layer ④ Governance file under [`governance/`](.).
- A Layer ③ Automation component under `cli/` / `.claude/` / `scripts/docs/`.

Not all overrides need to be heavy: simple file-replacements with a one-paragraph rationale are enough. But the rationale **must exist** and be discoverable.

## Override file location

Place override rationale files in:

```
<downstream>/docs/design-guide/<topic>-override.md
```

Examples:

- `<downstream>/docs/design-guide/version-control-override.md` (overriding Git Flow with Trunk-Based).
- `<downstream>/docs/design-guide/scaffolder-override.md` (replacing `pentaglyph init` with project-specific scaffolder).
- `<downstream>/docs/design-guide/raci-override.md` (replacing the default RACI matrix).

## Required format (8 sections, short)

The override file must contain these eight sections, in order. Each section is short (a few sentences to a short paragraph). If any section is "N/A", say so explicitly with a one-line reason.

````markdown
---
status: Stable
owner: <override author>
last-reviewed: <YYYY-MM-DD>
overrides: <path to kit file being overridden>
---

# <Override topic> — override of pentaglyph default

## 1. What kit default does this override?

<Link to the kit file. One-sentence summary of what the default prescribes.>

## 2. Why is this override needed?

<One paragraph. Frame it as a constraint pentaglyph's default cannot satisfy — regulatory / organisational / domain / scale.>

## 3. What does this project do instead?

<Concrete: the replacement file's location, the replacement convention, the replacement tool/process. Include code examples if behavioural.>

## 4. Four-axis evaluation of the alternative

<Apply the same [ADR-0003](../arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md) criterion you would for a new operational default: day-1 / switching-cost / external-canon / domain-neutrality. The override is more justified if the alternative passes the same axes the kit default passed.>

## 5. Trade-offs accepted

<What does the project lose by overriding? What does it gain? Be explicit about the negative.>

## 6. Reversibility

<How would the project revert to the kit default? What would the cost be? An irreversible override deserves more scrutiny.>

## 7. Scope of the override

<Where does this override apply: the whole project, a single module, a single team? Other parts of the project should still follow the kit default unless explicitly listed.>

## 8. References

<Link to the kit default file, [ADR-0001](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md) §5 "Override paths", and any external canon for the alternative.>
````

## Authorisation

| Override scope | Acceptor (per [`raci.md`](./raci.md)) |
| --- | --- |
| Single-module override (Layer ① / ② file replaced in one module) | engineering lead |
| Project-wide kit-default override (e.g. swap Git Flow → Trunk-Based) | PO |
| Layer ④ Governance override (this file, `raci.md`, `adr-accept-protocol.md`, `contributing.md`) | PO + engineering lead (joint) |
| Regulatory / compliance override | PO + Quality Officer / Compliance Lead |

Authorisation is recorded by the Acceptor approving the PR that introduces the override file.

## What is NOT an override

- **Adding** a new file in `design-guide/` (e.g. `design-guide/our-team-conventions.md` for in-house practices). This is an extension, not an override.
- **Adding** a new template in `templates/<NN>_*.md` that doesn't conflict with an existing template.
- **Pinning** a kit version (e.g. "we use pentaglyph v0.5"). Version pinning is project hygiene, not override.
- **Adding** project-specific ADRs. Even if they contradict a kit-meta self-ADR, they are scoped to the project and don't override the kit itself.

## Common overrides — quick reference

| Override topic | Likely rationale | Typical replacement |
| --- | --- | --- |
| Git Flow → Trunk-Based | Mature CD with feature flags | [`design-guide/version-control.md`](../design-guide/version-control.md) replaced; bind [Trunk-Based Development](https://trunkbaseddevelopment.com/). |
| Scrum → Kanban | Continuous-delivery / ops-heavy work | [`design-guide/dev-cycle.md`](../design-guide/dev-cycle.md) replaced; bind [Kanban Method](https://kanban.university/). Drop `templates/9_sprint-retro.md`. |
| MADR strict → MADR lite | Solo / small projects | [`adr-accept-protocol.md`](./adr-accept-protocol.md) relaxed; ADR template simplified. |
| Default RACI → multi-stakeholder | Consortia / regulated | [`raci.md`](./raci.md) replaced with consortium structure. |
| English first-class → other-language first-class | Non-English-first organisations | [`STRATEGY.md §7`](../STRATEGY.md) §7.5 override; downstream sets `--lang=<code>` at scaffold time and documents the deviation. |

## Why this protocol?

Without an override format:

- Overrides happen silently — engineers join the project and can't tell what is "kit default" vs "project deviation".
- Reversion to kit defaults becomes archaeological.
- The kit's own evolution can't be cleanly tracked vs project drift.

With this format, every deviation is one grep away (`docs/design-guide/*-override.md`).

## References

- [ADR-0001 §5 "Override paths"](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md) — the cost gradient per layer.
- [ADR-0003](../arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md) — the four-axis criterion to apply in §4 above.
- [ADR-0008](../arc42/09-decisions/0008-governance-layer-contract.md) — Layer ④ contract.
- [`raci.md`](./raci.md) — authorisation roles.
