---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-16
---

# pentaglyph documentation

> **Where pentaglyph itself is documented.** This directory is the canonical home of the *user-facing manual* for the `pentaglyph` CLI and the doc kit it scaffolds. It is **not** the template that gets copied into downstream projects — that lives under [`../template/docs/`](../template/).

If you are looking for…

| You want to… | Start here |
| --- | --- |
| **Set up pentaglyph for the first time** | [tutorials/getting-started.md](./tutorials/getting-started.md) |
| **Use pentaglyph with Claude Code** | [how-to/use-with-claude-code.md](./how-to/use-with-claude-code.md) |
| **Adopt pentaglyph in an existing project** | [how-to/adopt-existing-project.md](./how-to/adopt-existing-project.md) |
| **Pick the right template for what you are writing** | [how-to/choose-the-right-template.md](./how-to/choose-the-right-template.md) |
| **Prompt your AI agent** | [how-to/prompt-cookbook.md](./how-to/prompt-cookbook.md) |
| **Look up which templates exist** | [reference/template-index.md](./reference/template-index.md) |
| **Understand *why* pentaglyph exists** | [explanation/why-pentaglyph.md](./explanation/why-pentaglyph.md) |

---

## Diátaxis layout

This manual follows the [Diátaxis](https://diataxis.fr) four-quadrant model. Each quadrant has one job:

| Quadrant | Reader's goal | Where |
| --- | --- | --- |
| **Tutorials** | First-time success, guided walk-through | [`tutorials/`](./tutorials/) |
| **How-to guides** | Solve a specific problem you already know you have | [`how-to/`](./how-to/) |
| **Reference** | Look something up; dry and complete | [`reference/`](./reference/) |
| **Explanation** | Understand the *why* | [`explanation/`](./explanation/) |

Do not invent a fifth quadrant. If a doc straddles two, split it.

---

## Two reading paths

**Path A — "I just want to use it"**
1. [tutorials/getting-started.md](./tutorials/getting-started.md) (≈ 30 min)
2. [how-to/use-with-claude-code.md](./how-to/use-with-claude-code.md)
3. [how-to/choose-the-right-template.md](./how-to/choose-the-right-template.md)
4. [how-to/prompt-cookbook.md](./how-to/prompt-cookbook.md)

**Path B — "I want to understand it"**
1. [explanation/why-pentaglyph.md](./explanation/why-pentaglyph.md)
2. [`../template/docs/STRATEGY.md`](../template/docs/STRATEGY.md) (kit's own layered taxonomy)
3. [`../template/docs/WORKFLOW.md`](../template/docs/WORKFLOW.md) (canonical placement/lifecycle rules)
4. [`../template/docs/AI_INSTRUCTIONS.md`](../template/docs/AI_INSTRUCTIONS.md) (the AI-agent entry point)

---

## Two different "docs" in this repo — do not confuse them

| Location | Audience | Purpose |
| --- | --- | --- |
| [`libs/pentaglyph-docs/docs/`](.) **(here)** | **pentaglyph users** (humans, OSS) | How to *use* the `pentaglyph` CLI and kit |
| [`libs/pentaglyph-docs/template/docs/`](../template/docs/) | **AI agents + downstream projects** | The kit itself — what gets copied into your project by `pentaglyph init` |

Editing `template/docs/user-manual/` will leak into every project that runs `pentaglyph init` later. Edit *this* directory instead when documenting pentaglyph itself.

---

## Status

Round 1 of the manual covers the highest-friction questions (first-run, Claude Code integration, existing-project adoption, template selection, prompt cookbook, template reference). Reference and Explanation are still skeletal — gaps are flagged in each quadrant's README.

Contributions welcome via [`../README.md`](../README.md).
