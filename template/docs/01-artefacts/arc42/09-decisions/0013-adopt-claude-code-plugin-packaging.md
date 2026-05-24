---
status: Proposed
owner: AI-clone PoC (pentaglyph downstream reference) — Yu Sato
last-reviewed: 2026-05-23
---

# ADR-0013: Adopt Claude Code plugin packaging for the operational layer (skills / agents / hooks)

| Metadata  | Value                                                              |
| --------- | ------------------------------------------------------------------ |
| Status    | **Proposed**                                                       |
| Type      | ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit         |
| Date      | 2026-05-23                                                         |
| Deciders  | pentaglyph upstream maintainer + adopting project POs              |
| Consulted | downstream consumers running pentaglyph on real projects           |
| Informed  | all pentaglyph users                                               |
| Ticket    | AI-clone downstream: [AB#2331](https://dev.azure.com/ai-clone/ai-clone/_workitems/edit/2331) (Feature) / [AB#2332](https://dev.azure.com/ai-clone/ai-clone/_workitems/edit/2332) (Paperwork US) |

---

## Context and Problem Statement

pentaglyph today ships its operational surface (slash commands, sub-agents,
hooks, marketplace-style skills) as a `.claude/` directory tree, copied into
consumer projects via `pentaglyph init` and kept in sync via `git subtree`.
A single consumer pulls **the entire bundle** — there is no way to pick
"just the SDD pipeline" or "just the diagram renderer" without forking.

Two adjacent observations make this a problem worth addressing now:

1. **Real consumers want different subsets.** A regulated industry team
   adopting pentaglyph for documentation governance has no use for the
   measurement layer's `lizard` CCN gate, but is forced to carry it.
   A small open-source project wanting the diagram-render skill must adopt
   the whole arc42 vocabulary. The mismatch is visible in fork-and-strip
   patterns we have seen in early adopters.
2. **Claude Code grew a first-class plugin system** (`v2.1.x`,
   `.claude-plugin/plugin.json` manifest, `claude plugin install/enable`,
   `claude --plugin-dir`, plugin marketplaces) that exists exactly to
   solve the "selective adoption of `.claude/` artefacts" problem.
   The plugin system supports the operational components pentaglyph ships
   today — skills (`skills/<name>/SKILL.md`), sub-agents
   (`agents/*.md`), hooks (`hooks/hooks.json`), MCP servers (`.mcp.json`),
   LSP servers (`.lsp.json`), monitors, and explicit
   plugin-to-plugin dependencies via the manifest's `dependencies`
   field — and ships with a marketplace ecosystem (`claude-plugins-official`
   + `claude-community`) for discovery.

A naive "lift everything to a single mega-plugin" would solve the
fork-and-strip pain but lose the per-feature toggling. A naive "lift
everything including rules" would break the kit's constitutional layer
(see Decision Drivers §3).

> **Y-statement.** *In the context of distributing pentaglyph to downstream
> projects that want selective adoption of its operational components,
> facing the friction of subtree-pulling an indivisible `.claude/` bundle
> and the maturation of Claude Code's plugin system, we decided to
> migrate the operational layer (skills / agents / hooks / MCP / monitors)
> to six thematic Claude Code plugins with explicit plugin-to-plugin
> dependencies, and neglected to plugin-ise the constitutional rule layer
> and the `docs/` scaffold (both stay in the existing init/subtree
> mechanism, because plugins cannot ship project-root files and cannot
> contribute auto-loaded rules), to achieve per-feature opt-in adoption
> without sacrificing the always-on guarantees of the rule layer,
> accepting the cost of a hybrid distribution model (subtree + plugin)
> and namespaced skill invocations (`/pentaglyph-sdd:doc-init` instead of
> `/doc-init`).*

---

## Decision Drivers

The drivers below are ordered by priority. Higher drivers vetoed candidate
options that violated them.

1. **Constitutional rules MUST remain always-on.** The kit's authority
   comes from the four `.claude/rules/*.md` files being loaded into every
   Claude Code session via the `InstructionsLoaded` mechanism. Converting
   them to model-invoked skills (the only plugin contribution path for
   "instructions") changes the semantics from "constitutional" to
   "advisory when remembered". This is non-negotiable.
2. **Selective adoption** by downstream consumers (the problem statement).
3. **Dependency hygiene.** A consumer that enables `pentaglyph-sdd` must
   not be required to manually also enable `pentaglyph-foundation`.
   Plugin-to-plugin dependency resolution must do that transitively.
4. **Compatibility with the existing subtree workflow** — adopting plugins
   should not force consumers to abandon their existing
   `libs/pentaglyph-docs/` subtree path overnight. A graceful migration
   window with both mechanisms operational is required.
5. **Bind-canons-only constraint of
   [ADR-0002](./0002-bind-canons-only-no-self-authored-standards.md)** —
   pentaglyph does not author its own packaging standard. It binds to
   Claude Code's plugin spec as published at
   <https://code.claude.com/docs/en/plugins-reference>.
6. **Reviewability of the migration.** A six-plugin split is reviewable
   per-plugin (one PR per plugin). A 1-plugin lift would be a single
   400-file PR. The split also lets consumers adopt in stages.
7. **PoC validation gate.** No commitment to the plugin model without a
   working multi-plugin PoC that exercises the dependency-resolution path
   end-to-end.

---

## Considered Options

| #  | Option                                                                                                                  | Selective adoption | Always-on rules | Dep hygiene | Bind-only-canons | Migration cost  |
| -- | ----------------------------------------------------------------------------------------------------------------------- | ------------------ | --------------- | ----------- | ---------------- | --------------- |
| A  | Status quo: keep `.claude/` mono-bundle, distribute only via subtree                                                    | ✗                  | ✓               | n/a         | ✓                | None            |
| B  | Single mega-plugin `pentaglyph` containing every skill / agent / hook                                                   | ✗ (binary on/off)  | ✗               | n/a         | ✓                | Medium          |
| C  | Six thematic plugins (foundation / sdd / cleanup / thinking-frameworks / measurement / diagram) **+ rules stay in subtree** | ✓                  | ✓               | ✓           | ✓                | Medium-high     |
| D  | Convert rules to skills, ship everything (rules + skills + agents) as plugins                                            | ✓                  | ✗ (breaks rules) | ✓           | ✗ (re-authors)   | High            |
| E  | One foundation plugin + downstream consumers compose their own from foundation primitives                                | ✓ (advanced users) | ✓               | ✓           | ✓                | Highest (consumer-side) |

---

## Decision Outcome

**Chosen option: C — Six thematic plugins, rules stay in the subtree scaffold.**

The split:

| Plugin | Components | Depends on |
| --- | --- | --- |
| `pentaglyph-foundation` | skills: `tour`, `explain` / agents: `tour-guide` | — |
| `pentaglyph-sdd` | skills: `doc-init`, `doc-fill`, `doc-status` / agents: `doc-orchestrator`, `discovery-agent`, `completeness-auditor`, `architect-agent`, `adr-writer`, `spec-writer`, `impl-plan-writer`, `prd-writer` | foundation |
| `pentaglyph-cleanup` | skill: `cleanup` / agent: `cleanup-orchestrator` / hooks: SessionStart claim-sweep (optional) | foundation |
| `pentaglyph-thinking-frameworks` | skill: `think` (9-framework selector) | foundation |
| `pentaglyph-measurement` | skill: `measure` / `bin/` wrappers for `lizard`, `schemathesis` | foundation |
| `pentaglyph-diagram` | skill: `diagram-render` | foundation |

What stays in the existing init / subtree scaffold (delivered by
`pentaglyph init` / `git subtree pull`):

- `docs/` scaffold tree (arc42 §1-§12, ADR README, glossary, runtime, …)
- `.claude/rules/*.md` — the four constitutional rules
- `templates/` (PRD / spec / ADR / use case / impl-plan / glossary entry)
- Project `CLAUDE.md` template
- Project `.claude/settings.json` template (with `enabledPlugins` array
  pre-pointing at the six plugins)

Rationale for the split granularity (six, not three, not fifteen):

- **foundation** is required by every other plugin (transitive dependency
  root). Splitting `tour` and `explain` out of `sdd` lets a consumer
  adopt onboarding helpers without committing to the SDD pipeline.
- **sdd** is the heaviest plugin (3 skills + 7 agents) because the SDD
  pipeline is internally cohesive — its agents call each other via
  `Task` and splitting them would require cross-plugin agent invocation
  which the spec does not yet make ergonomic.
- **cleanup**, **thinking-frameworks**, **measurement**, **diagram** are
  each independent feature surfaces with no inter-dependencies, so they
  become independent plugins. A consumer who only wants
  `pentaglyph-diagram` installs two plugins (foundation + diagram) and
  gets a working diagram renderer without paying for the SDD pipeline.

PoC validation (executed 2026-05-23 against Claude Code v2.1.146):

- `pentaglyph-diagram` (1 skill + manifest) — passes `claude plugin
  validate --strict`, loads via `--plugin-dir`, the skill surfaces as
  `/pentaglyph-diagram:diagram-render`.
- `pentaglyph-foundation` (2 skills + 1 agent + manifest) — passes
  strict, loads, all components visible.
- `pentaglyph-sdd` (3 skills + 7 agents + manifest with `dependencies:
  [pentaglyph-foundation ~0.1.0]`) — passes strict, loads when foundation
  is also loaded, **refuses to load** when foundation is missing (debug
  log: `dependency-unsatisfied`).

---

## Consequences

### Positive

- **Selective adoption** unlocks. A consumer reaches for one plugin at a
  time and the rest stay out of their `~/.claude/plugins/cache`.
- **Versioning becomes explicit.** Each plugin has its own `version` field
  in `plugin.json` and its own marketplace entry, so a consumer can pin
  `pentaglyph-sdd@0.3.0` while letting `pentaglyph-diagram` track latest.
- **Discoverability via marketplace.** Once submitted to
  `claude-community`, the plugins surface in `/plugin` Discover for any
  Claude Code user, not just consumers who already heard of pentaglyph.
- **Rules retain their constitutional semantics.** Because they stay in
  `.claude/rules/`, the `InstructionsLoaded` lifecycle event fires for
  them as before and they are present in every session, every turn.
- **The subtree / init mechanism shrinks to its core job** — shipping the
  scaffold (docs/ + rules + templates). Less surface area to maintain.

### Negative

- **Hybrid distribution.** Consumers must understand "subtree for scaffold
  + plugin for operations" rather than a single mechanism. The
  documentation burden is real and must be addressed in the user manual.
- **Namespaced skill invocations.** `/doc-init` becomes
  `/pentaglyph-sdd:doc-init`. The plugin spec mandates namespacing and
  offers no short-alias mechanism. Existing user habits and existing
  cross-references in `docs/` need to be updated.
- **Silent dependency failure.** When a consumer loads `pentaglyph-sdd`
  via `--plugin-dir` without `pentaglyph-foundation`, Claude Code refuses
  to enable it but **does not surface the error to stderr** (it appears
  only in `--debug-file` output). The marketplace `claude plugin enable`
  path is louder, but local-directory testing UX is poor. Workaround: the
  README explicitly lists the foundation dependency for every plugin.
- **`Task` cross-plugin agent invocation** is untested by this PoC. If
  the spec ever changes to break cross-plugin agent calls, the SDD
  pipeline (which uses `doc-orchestrator → discovery-agent / architect-agent / adr-writer / spec-writer`)
  is still safe because all those agents are in the same plugin, but
  any future cross-plugin agent invocation must validate this path.
- **Migration window cost.** During the transition, downstream consumers
  must run BOTH the subtree (for rules + docs/) AND the plugins (for
  skills + agents). Old subtree paths under `.claude/skills/` and
  `.claude/agents/` must be deleted to avoid double-loading, but the
  rule files must NOT be deleted. The migration script and user manual
  must spell this out.

---

## Validation

This ADR is considered Validated when **all six** are true:

1. All six plugins have a `0.1.0` release tagged in their respective git
   sources via `claude plugin tag --push`.
2. At least one downstream consumer (AI-clone reference project) has
   migrated from the subtree-bundled `.claude/skills/` + `.claude/agents/`
   to the six plugins, with its `.claude/settings.json` listing them in
   `enabledPlugins` at project scope.
3. The pentaglyph user manual has a "Plugin installation" section
   replacing the "subtree pull" instructions for the operational layer
   (the subtree section stays for the scaffold layer).
4. A migration script (`pentaglyph migrate-to-plugins`) exists and runs
   green on the AI-clone reference project: deletes
   `libs/pentaglyph-docs/template/.claude/skills/` and
   `.claude/agents/`, leaves rules intact, writes the `enabledPlugins`
   array to the consumer's `.claude/settings.json`.
5. CI exercises all six plugins via `claude --plugin-dir <each>` and
   asserts the expected skill / agent surface for each plugin.
6. The marketplace-style submission (or private marketplace, if the
   consumer prefers private hosting) is at least drafted.

---

## Pros and Cons of the Options

### Option A — Status quo (mono-bundle subtree)

- Pros: zero migration cost; one mechanism to understand; rules and
  operations co-located.
- Cons: indivisible — fork-and-strip is the only adoption pattern for
  partial use; no marketplace discoverability; no per-feature versioning;
  ignores a capability that Claude Code put in our hands.

### Option B — Single mega-plugin

- Pros: marketplace discoverability; consumer installs with one command.
- Cons: binary on/off — does not solve the selective adoption problem;
  also violates Decision Driver §1 because it cannot include the rule
  files (so rules would still need a separate distribution mechanism).
  Net result: same hybrid burden as Option C but worse selective
  adoption. Rejected.

### Option C — Six thematic plugins **(chosen)**

- Pros: per-feature opt-in; transitive dependency resolution; clear
  ownership boundaries inside the kit; reviewable per-plugin PRs; each
  plugin can version independently.
- Cons: hybrid distribution model; namespacing breaks existing
  command-name habits; silent dependency-failure UX; PR review burden of
  six manifests + six version cadences.

### Option D — Convert rules to skills, ship everything as plugins

- Pros: single distribution mechanism (everything is a plugin);
  consumers learn one model.
- Cons: violates Decision Driver §1 — model-invoked skills do not
  provide always-on rule semantics, so the kit's authority dissolves.
  Also violates ADR-0002 because the kit would have to *re-author* the
  always-on instruction-loading semantics that Claude Code itself
  provides via `InstructionsLoaded`. Rejected.

### Option E — Foundation plugin + consumer-side composition

- Pros: maximally flexible; consumers compose their own kit.
- Cons: pushes too much complexity to the consumer; defeats the purpose
  of pentaglyph as a *kit*; and a consumer who composes their own kit
  has effectively forked, which is exactly the friction we are trying to
  remove. Rejected.

---

## More Information

- Claude Code plugin spec: <https://code.claude.com/docs/en/plugins>
- Plugin reference: <https://code.claude.com/docs/en/plugins-reference>
- Plugin marketplaces: <https://code.claude.com/docs/en/plugin-marketplaces>
- `InstructionsLoaded` hook event (the mechanism that auto-loads rule
  files): plugins reference §Plugin components > Hooks > event table
- Related: [ADR-0002 bind-canons-only](./0002-bind-canons-only-no-self-authored-standards.md)
  (binding to Claude Code's plugin spec as published canon)
- Related: [ADR-0001 adopt-five-layer-self-architecture](./0001-adopt-five-layer-self-architecture.md)
  (the layer this decision affects is Layer ③ Automation)
- PoC artefacts (local): `/tmp/pentaglyph-poc/{pentaglyph-foundation,pentaglyph-sdd,pentaglyph-diagram}/`
- Implementation plan: [`docs/01-artefacts/impl-plans/2026-05-23_operational-layer-plugin-migration.md`](../../impl-plans/2026-05-23_operational-layer-plugin-migration.md) (Draft, drafted alongside this ADR)
