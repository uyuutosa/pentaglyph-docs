---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-17
layer: 0
---

# pentaglyph documentation

> **Where pentaglyph itself is documented.** This is the canonical home of the *user-facing manual* for the `pentaglyph` CLI and the doc kit it scaffolds. It is **not** the template that gets copied into downstream projects — that lives under [`../template/docs/`](../template/).

The content is organised under [`01-artefacts/user-manual/`](./01-artefacts/user-manual/), per [ADR-0010](../template/docs/01-artefacts/arc42/09-decisions/0010-explicit-layer-prefixed-directories.md) (layer-prefixed directories) — the same layer convention the kit itself uses. The user manual is **Layer ① Artefact** content (it *describes the kit*); this README is a Layer ⓪ orientation entry-point that spans layers.

---

## Quick links

> **Using Claude Code?** Run `/tour` for an interactive 4-mode tour of pentaglyph (Quick narrative / Guided by role / Menu / Ask me anything). The `tour-guide` agent ships with the kit when you scaffold with `--ai=claude` (see [`template/.claude/agents/tour-guide.md`](../template/.claude/agents/tour-guide.md)). For the static written equivalent, follow the table below.

| You want to… | Start here |
| --- | --- |
| **Set up pentaglyph for the first time** | [tutorials/getting-started.md](./01-artefacts/user-manual/tutorials/getting-started.md) |
| **Use pentaglyph with Claude Code** | [how-to/use-with-claude-code.md](./01-artefacts/user-manual/how-to/use-with-claude-code.md) |
| **Adopt pentaglyph in an existing project** | [how-to/adopt-existing-project.md](./01-artefacts/user-manual/how-to/adopt-existing-project.md) |
| **Pick the right template** | [how-to/choose-the-right-template.md](./01-artefacts/user-manual/how-to/choose-the-right-template.md) |
| **Write an ADR (MADR v3.0)** | [how-to/write-an-adr.md](./01-artefacts/user-manual/how-to/write-an-adr.md) |
| **Prompt your AI agent** | [how-to/prompt-cookbook.md](./01-artefacts/user-manual/how-to/prompt-cookbook.md) |
| **Look up which templates exist** | [reference/template-index.md](./01-artefacts/user-manual/reference/template-index.md) |
| **Look up profiles** (`minimal`/`standard`/`full`) | [reference/profiles.md](./01-artefacts/user-manual/reference/profiles.md) |
| **Look up AI targets** (`claude`/`cursor`/`copilot`/`generic`) | [reference/ai-targets.md](./01-artefacts/user-manual/reference/ai-targets.md) |
| **Understand *why* pentaglyph exists** | [explanation/why-pentaglyph.md](./01-artefacts/user-manual/explanation/why-pentaglyph.md) |
| **Understand the central rule** (`code change → doc change`) | [explanation/why-code-change-doc-change.md](./01-artefacts/user-manual/explanation/why-code-change-doc-change.md) |
| **Understand why five standards** | [explanation/why-five-standards.md](./01-artefacts/user-manual/explanation/why-five-standards.md) |

---

## Diátaxis layout (within Layer ①)

The user manual follows the [Diátaxis](https://diataxis.fr) four-quadrant model:

| Quadrant | Reader's goal | Where |
| --- | --- | --- |
| **Tutorials** | First-time success, guided walk-through | [`01-artefacts/user-manual/tutorials/`](./01-artefacts/user-manual/tutorials/) |
| **How-to guides** | Solve a specific problem you already know you have | [`01-artefacts/user-manual/how-to/`](./01-artefacts/user-manual/how-to/) |
| **Reference** | Look something up; dry and complete | [`01-artefacts/user-manual/reference/`](./01-artefacts/user-manual/reference/) |
| **Explanation** | Understand the *why* | [`01-artefacts/user-manual/explanation/`](./01-artefacts/user-manual/explanation/) |

Do not invent a fifth quadrant. If a doc straddles two, split it.

---

## Two reading paths

**Path A — "I just want to use it"**

1. [tutorials/getting-started.md](./01-artefacts/user-manual/tutorials/getting-started.md) (≈ 30 min)
2. [how-to/use-with-claude-code.md](./01-artefacts/user-manual/how-to/use-with-claude-code.md)
3. [how-to/choose-the-right-template.md](./01-artefacts/user-manual/how-to/choose-the-right-template.md)
4. [how-to/prompt-cookbook.md](./01-artefacts/user-manual/how-to/prompt-cookbook.md)

**Path B — "I want to understand it"**

1. [explanation/why-pentaglyph.md](./01-artefacts/user-manual/explanation/why-pentaglyph.md)
2. [`../template/docs/STRATEGY.md`](../template/docs/STRATEGY.md) (kit's own layered taxonomy)
3. [`../template/docs/WORKFLOW.md`](../template/docs/WORKFLOW.md) (canonical placement / lifecycle rules)
4. [`../template/docs/AI_INSTRUCTIONS.md`](../template/docs/AI_INSTRUCTIONS.md) (the AI-agent entry point)

---

## Two different "docs" trees in this repo — do not confuse them

| Location | Audience | Purpose |
| --- | --- | --- |
| [`libs/pentaglyph-docs/docs/`](.) **(here)** | **pentaglyph users** (humans, OSS) | How to *use* the `pentaglyph` CLI and kit |
| [`libs/pentaglyph-docs/template/docs/`](../template/docs/) | **AI agents + downstream projects** | The kit itself — what gets copied into your project by `pentaglyph init` |

Both now use the same layer-prefixed structure (`01-artefacts/`, `02-process/`, …) per [ADR-0010](../template/docs/01-artefacts/arc42/09-decisions/0010-explicit-layer-prefixed-directories.md). The difference is *audience* and *scope*: this `docs/` documents pentaglyph itself; `template/docs/` is the content scaffolded into downstream consumers.

Editing `template/docs/01-artefacts/user-manual/` will leak into every project that runs `pentaglyph init` later. Edit *this* directory (`docs/01-artefacts/user-manual/`) instead when documenting pentaglyph itself.

---

## Status

Round 1 of the manual covers the highest-friction questions (first-run, Claude Code integration, existing-project adoption, template selection, prompt cookbook, template reference, ADR authoring deep-dive). Reference and Explanation are now reasonably populated; remaining gaps are flagged inline.

Contributions welcome via [`../README.md`](../README.md).
