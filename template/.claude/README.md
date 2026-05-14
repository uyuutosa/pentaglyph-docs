---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-14
layer: 3
---

# `.claude/` — AI-agent rules, agents, and skills (Layer ③ Automation)

> **Self-architecture role**: this directory is part of **Layer ③ Automation** in pentaglyph's [self-architecture](../docs/arc42/05-building-blocks/pentaglyph-self-architecture.md), alongside `cli/` and `scripts/docs/`. It encodes pentaglyph's rules, sub-agents, and skills for Anthropic's Claude Code. See [ADR-0001](../docs/arc42/09-decisions/0001-adopt-five-layer-self-architecture.md) and [ADR-0004](../docs/arc42/09-decisions/0004-layer-separation-contracts.md).

## What lives here

| Subdirectory | Purpose | Layer interaction |
| --- | --- | --- |
| [`rules/`](./rules/) | Auto-loaded behavioural rules: `documentation.md`, `version-control.md`, `dialogue-style.md` | Operates on Layer ① (placement, lifecycle) + Layer ② (Git Flow + dialogue patterns). Does **not** invent rules — it surfaces and enforces what `WORKFLOW.md` and `STRATEGY.md` already prescribe. |
| [`agents/`](./agents/) | Specialised sub-agents: `adr-writer`, `architect-agent`, `completeness-auditor`, `discovery-agent`, `doc-orchestrator`, `spec-writer` | Each agent operates on a specific subset of Layer ① Artefacts (ADRs, arc42 sections, PRDs, building blocks). They do **not** redefine the artefacts they produce. |
| [`skills/`](./skills/) | User-invocable shortcuts: `diagram-render`, `doc-fill`, `doc-init`, `doc-status` | Each skill executes a fragment of Layer ② Process (rendering pipeline, doc-build interview, lifecycle health check). Skill content is the **execution** of a process binding, never a new binding. |

## What does NOT belong here

- **New canons or standards.** A new process binding belongs in `docs/design-guide/`, not in an agent or rule. The agent/skill may then *execute* the binding.
- **Templates.** Templates are Layer ① Artefacts and live in `docs/templates/`. An agent generating a doc must reference the template; it must not embed a private copy.
- **Decision authority.** Agents and skills cannot Accept ADRs or override governance. That is Layer ④ Governance's role.

## Layer dependency direction

Per [ADR-0004](../docs/arc42/09-decisions/0004-layer-separation-contracts.md), Layer ③ Automation depends on layers ⓪ + ① + ② only:

- ✅ Agents and skills may **read** templates, design-guides, ADRs.
- ✅ Agents and skills may **write** new instances of templates (e.g. `adr-writer` writes an ADR using `5_adr.md`).
- ❌ Agents and skills must **not** override template definitions, canon bindings, or governance rules.

A forthcoming layer-aware lint (`scripts/docs/lint_layer_citations.py`) will detect violations.

## When to add a new agent / rule / skill

The [§9.1 four-axis criterion](../docs/STRATEGY.md) ([ADR-0003](../docs/arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md)) applies here too:

1. **Day-1 necessity** — does every pentaglyph project need this automation on day one? (Most automations fail this; they are project-specific and belong in the downstream `.claude/`.)
2. **Switching cost** — is replacing the automation costly enough to justify shipping a default?
3. **External canon / artefact** — does the automation operate on a canon-bound process or a template from `docs/templates/`? If not, it is probably inventing.
4. **Domain neutrality** — does the automation work across regulated / startup / AI-first / enterprise IT?

If all four hold, propose an ADR and add the automation here. If not, leave it for downstream `.claude/` extensions.

## How downstream projects override

Downstream projects extend pentaglyph's `.claude/` by **adding** files to their own `.claude/rules/`, `.claude/agents/`, `.claude/skills/`. They may also **disable** or **replace** a kit-provided rule by writing a same-name override in their own `.claude/` (the more specific path wins for Claude Code).

Each downstream override should:

1. Open with a comment citing the kit-provided rule it replaces.
2. Link to the downstream `docs/design-guide/<reason>.md` documenting the rationale ([ADR-0001](../docs/arc42/09-decisions/0001-adopt-five-layer-self-architecture.md) §5 "Override paths").

## Cross-references

- [Self-architecture overview](../docs/arc42/05-building-blocks/pentaglyph-self-architecture.md)
- [STRATEGY.md §3](../docs/STRATEGY.md) — the two-axis taxonomy
- [ADR-0004](../docs/arc42/09-decisions/0004-layer-separation-contracts.md) — layer separation contracts (DO/DON'T table)
- [`cli/README.md`](../cli/README.md) — the Bun CLI sibling of this `.claude/` automation
