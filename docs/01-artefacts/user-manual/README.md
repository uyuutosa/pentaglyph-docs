---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-17
layer: 1
---

# pentaglyph user manual — Layer ① Artefacts

> Authoritative source: <https://diataxis.fr>
>
> This directory follows the **Diátaxis** four-quadrant model. It is the *user-facing* manual for the `pentaglyph` CLI and kit — pentaglyph documenting itself with the same standards it ships.

For navigation, see the top-level [`docs/README.md`](../../README.md). This README is the Layer ① index.

## The four quadrants

| Quadrant                          | Reader's goal                                | Example                                             |
| --------------------------------- | -------------------------------------------- | --------------------------------------------------- |
| [`tutorials/`](./tutorials/)      | **Learning by doing** (newcomer)             | "Get from zero to your first PRD + ADR + Module DD" |
| [`how-to/`](./how-to/)            | **Solving a specific problem** (competent)   | "How do I use pentaglyph with Claude Code?"         |
| [`reference/`](./reference/)      | **Looking something up** (precise, dry)      | "Which sections does `--profile=standard` install?" |
| [`explanation/`](./explanation/)  | **Understanding** (background reading)       | "Why five standards?"                               |

Do not invent fifth quadrants. Do not mix two quadrants in one file. If a file feels like both a tutorial and a how-to, split it.

## Authoring rules

1. **Tutorial** — guaranteed-to-succeed first-run experience. Show, do not explain. Hide trade-offs.
2. **How-to** — assumes the reader knows the basics. Solve one problem. Cover the relevant alternatives.
3. **Reference** — austere, complete, structured. No narrative.
4. **Explanation** — discursive. Background, history, "why". No instructions.

## Hard rules

- **Front-matter required** on every file (`status`, `owner`, `last-reviewed`).
- **Link from each how-to to the relevant reference page**, and vice versa.
- **Distinct from `template/docs/01-artefacts/user-manual/`** — that one is the *empty stub* scaffolded into downstream projects; this one is pentaglyph's own filled-in manual.

For lifecycle / when to update, see [`../../../template/docs/WORKFLOW.md`](../../../template/docs/WORKFLOW.md).

## Reference

- Diátaxis — <https://diataxis.fr>
- Diátaxis quadrants explained — <https://diataxis.fr/start-here/>
- ADR-0010 (layer-prefixed directories) — [`../../../template/docs/01-artefacts/arc42/09-decisions/0010-explicit-layer-prefixed-directories.md`](../../../template/docs/01-artefacts/arc42/09-decisions/0010-explicit-layer-prefixed-directories.md)
