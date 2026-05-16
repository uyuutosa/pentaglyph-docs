---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
layer: 2
---

# design-guide — operational conventions (Layer ② Process)

> **Self-architecture role**: this directory is the home of **Layer ② Process** in pentaglyph's [self-architecture](../arc42/05-building-blocks/pentaglyph-self-architecture.md). Each file binds one **external process canon** (Scrum / BDD / TDD / Trunk-Based / Git Flow / …) into a thin operational mapping. See [ADR-0001](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md), [ADR-0002](../arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md), and [ADR-0005](../arc42/09-decisions/0005-surface-implicit-process-layer.md).

> **Use Template 0** ([`../templates/0_default.md`](../templates/0_default.md)) unless one of Templates 1–5 fits. For new process bindings (BDD / Scrum / TDD / Trunk-Based / DORA / …), use the forthcoming 6-section binding template documented in `_binding-a-new-process.md` and bound by [ADR-0002](../arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md).

This directory holds operational and convention guidelines: code style, naming, branch / commit conventions, review checklists, sprint cadence — anything that is "how this team works" rather than "how this system is built".

**What does NOT belong here:** architecture-level cross-cutting concerns (security model, error strategy, observability stack). Those go under [`../arc42/08-crosscutting/`](../arc42/08-crosscutting/). Specific tool selection (`pytest-bdd` vs Cucumber, Jira vs Linear, GitHub Actions vs Azure Pipelines) does **not** belong here either — bindings link out to the canon and stay tool-agnostic.

## Suggested files

| File                          | Purpose                                                                 |
| ----------------------------- | ----------------------------------------------------------------------- |
| `coding-style.md`             | Language-specific style guides + exceptions to upstream defaults        |
| `branch-and-commit.md`        | Branch strategy + commit message format                                 |
| `review-checklist.md`         | What reviewers must verify before approving a PR                        |
| `ai-augmented-pr.md`          | Rules for PR descriptions on AI-assisted changes (kit-shipped default)  |
| `code-tours.md`               | CodeTour-compatible guided reading paths (kit-shipped default)          |
| `sprint-cadence.md`           | Sprint length, ceremonies, definition of done                           |
| `release-process.md`          | Versioning scheme, release notes format, rollback procedure             |

For lifecycle / when to update, see [`../WORKFLOW.md`](../WORKFLOW.md).
