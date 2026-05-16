---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
layer: 2
type: meta-doc
---

# Binding a new process canon — the 6-section template

> **Layer ② Process — meta-doc.** Defines the operational template every design-guide in this directory must follow when binding an external process canon. This file is itself bound by [ADR-0001](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md), [ADR-0002](../arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md), [ADR-0003](../arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md), and [ADR-0005](../arc42/09-decisions/0005-surface-implicit-process-layer.md).

## When to use this

You are about to add a new file `design-guide/<canon>-workflow.md` (or `<canon>.md`) that binds an external process canon — Scrum / BDD / TDD / Trunk-Based / DORA / OKR / Lean Startup / SRE / DesignOps / Continuous Discovery / … — into pentaglyph as an operational default.

**Do not invent a new format.** Copy the 6 sections below verbatim. The structure is enforced by [ADR-0002](../arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md): every binding must (a) link out to the authoritative canon, (b) describe only operational mapping, and (c) refuse to paraphrase canon definitions.

## When NOT to use this

If you want to write a project-specific extension, code-style guide, or naming convention without an external canon, use [`../templates/0_default.md`](../templates/0_default.md) instead. This template is exclusively for **canon bindings**.

## The 6 sections (copy verbatim)

````markdown
---
status: Draft
owner: <name>
last-reviewed: <YYYY-MM-DD>
layer: 2
---

# <Canon name> — pentaglyph design-guide

| Metadata | Value |
| --- | --- |
| Status | Draft / Stable / Superseded by NNNN |
| Layer | 2 (Process) |
| Canon | <canon name + authoritative URL> |
| Binding date | YYYY-MM-DD |
| Related ADRs | ADR-NNNN, ... |

## 1. External canon (authoritative)

- Primary: <URL> (book / spec / standards body)
- Companion: <URL> (optional, secondary sources)

## 1.5. Surfaces implicit behaviour in <WORKFLOW.md §X | STRATEGY.md §Y | templates/T_*.md>

<List the pre-existing pentaglyph artefacts or rules that this binding makes explicit. Required by ADR-0005.>

## 2. Why pentaglyph binds this (§9.1 four-axis evaluation)

| Axis | Verdict | Rationale |
| --- | --- | --- |
| Day-1 necessity | ✅ / ❌ | <one line> |
| Switching cost | ✅ / ❌ | <one line> |
| External canon | ✅ / ❌ | <one line> |
| Domain neutrality | ✅ / ❌ | <one line> |

If any axis is ❌, **do not bind**. Leave the canon as a project-specific extension.

## 3. Artefact mapping

- Layer ① templates that produce / consume this binding's outputs: `templates/N_<name>.md`, …
- No tool selection. Tool choice (e.g. Cucumber vs pytest-bdd, Jira vs Linear) is a Layer ③ concern, decided per project.

## 4. Lifecycle integration

<How the canon's cadence interacts with pentaglyph's Draft → Review → Done lifecycle.>

## 5. Override path

A downstream project may replace this binding by:

1. Authoring `<downstream>/docs/design-guide/<canon>.md` that supersedes this file.
2. Updating any Layer ① templates the binding consumes.
3. Citing [ADR-0001](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md) §5 "Override paths" in the rationale.

## 6. References

<Link-out only. No paraphrasing.>
````

## Hard rules

1. **Do not paraphrase the canon.** Quote where needed, but never restate definitions in your own words. PR review will catch paraphrases; replace with quote + link.
2. **Tool-agnostic.** §3 names artefacts (PRD, ADR, retro template). It does NOT name tools (Jira, pytest-bdd, GitHub Actions, …) — those are Layer ③ concerns.
3. **Bidirectional links.** In the same PR that adds a new binding:
   - Add the binding to [`STRATEGY.md §9`](../STRATEGY.md) (operational defaults list).
   - Add a row to [`AI_INSTRUCTIONS.md §2.5`](../AI_INSTRUCTIONS.md) "Common cells" table.
   - Add an entry to [`_future-bindings.md`](./_future-bindings.md) if you moved a candidate from there to bound.
4. **Pass the §9.1 four-axis criterion in §2.** Failure on any axis means do not bind.

## CLI scaffold (forthcoming, Phase 3 of self-architecture roadmap)

`bunx pentaglyph add-process <canon-kebab-name>` will scaffold a new `<canon>-workflow.md` from this template, pre-fill the front-matter, and remind the author of the bidirectional-links rule.

## References

- [ADR-0001](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md) — Layer ② Process definition
- [ADR-0002](../arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md) — bind-only rule
- [ADR-0003](../arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md) — §9.1 four-axis criterion
- [ADR-0005](../arc42/09-decisions/0005-surface-implicit-process-layer.md) — §1.5 "Surfaces implicit behaviour" rule
- [`STRATEGY.md §3`](../STRATEGY.md) — Layer ② location in the 2-axis taxonomy
- [`_future-bindings.md`](./_future-bindings.md) — backlog of canons under consideration for binding
