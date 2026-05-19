---
paths:
  - "docs/**"
---

# Documentation Rule (auto-loaded for `docs/**`)

This project uses the **pentaglyph-docs** scaffold: five peer standards (arc42 + C4 + MADR + Diátaxis + TiSDD) bound by one workflow, plus a sixth slot — the **Project Engagement Layer (PEL)** at `docs/client-engagement/` — that composes eight well-known client-communication primitives (Inception Deck / GitLab Handbook / Atlassian weekly / Basecamp Heartbeat / Amazon 6-pager / Now-Next-Later / DACI / RAID / PR-FAQ).

## Two files you must read first

| File                                               | Purpose                                                      |
| -------------------------------------------------- | ------------------------------------------------------------ |
| [`docs/AI_INSTRUCTIONS.md`](../../docs/AI_INSTRUCTIONS.md) | Entry point for AI agents — decision protocol per touch     |
| [`docs/WORKFLOW.md`](../../docs/WORKFLOW.md)       | When to write what, where to put it, what state it goes through |

If the rule below contradicts those files, **the files in `docs/` win** — they are the source of truth, this rule is just a pointer.

## One-line summary

**Code change implies doc change in the same PR.** Use the table in `docs/WORKFLOW.md §2` to find which doc to update.

## Hard rules (verbatim from `docs/WORKFLOW.md §6`)

1. **One canonical location per topic.** If a concept appears in two files, one must be a link to the other.
2. **Front-matter on all durable docs** (`01-artefacts/arc42/`, `01-artefacts/detailed-design/`, `02-process/`, `01-artefacts/api-contract/`, `01-artefacts/user-manual/`, `01-artefacts/service-design/`, `04-governance/`, durable PEL files: `client-engagement/CHARTER.md` / `OPERATING-AGREEMENT.md` / `NOW-NEXT-LATER.md` / `raid.md` / `decisions/`).
3. **Date prefix on all volatile docs** (`YYYY-MM-DD_<kebab-title>.md`); for PEL weekly / heartbeat reports the dated form is `client-engagement/01-artefacts/reports/<YYMMDD>/{weekly,heartbeat}.md`.
4. **MADR for ADRs.** No homemade ADR formats. Use `docs/01-artefacts/templates/5_adr.md`. Client-visible decisions also use MADR, archived from `client-engagement/daci/` (DACI workflow, Template 17) into `client-engagement/decisions/`.
5. **C4 single source of truth = `docs/01-artefacts/diagrams/c4/workspace.dsl`.** SVG renders under `docs/01-artefacts/diagrams/c4/exports/` are **committed** so repo web UIs (CodeCommit, GitHub Enterprise, Bitbucket) can display them without local tooling. Regenerate via the [`/diagram-render`](../skills/diagram-render/SKILL.md) skill; CI may enforce `/diagram-render --check` to block drift.
6. **English by default.** Other languages reserved for explicitly designated client-facing locations declared in `docs/STRATEGY.md` — including PEL files when the project's `client-engagement/OPERATING-AGREEMENT.md` declares a non-English client language.
7. **Repo-root-relative links.** Use `docs/<path>` form so links survive reorganization.
8. **No re-explaining external standards.** Link to <https://arc42.org> / <https://c4model.com> / <https://adr.github.io/madr/> / <https://diataxis.fr> / <https://www.thisisservicedesigndoing.com/methods> / PEL primitive URLs (in `docs/STRATEGY.md` §2.6) instead of paraphrasing.
9. **`client-engagement/` (PEL) is private-first.** Per `docs/STRATEGY.md` §2.6 confidentiality inversion, every PEL file is confidential unless `client-engagement/OPERATING-AGREEMENT.md` §5 explicitly says otherwise.

## Forbidden

- Editing anything under `docs/archive/` (read-only history).
- Editing the body of an `Accepted` ADR (supersede with a new ADR instead).
- Inventing a new template (the **nineteen** in `docs/01-artefacts/templates/` cover every case — six core + three UX research + five process/governance + five PEL).
- Duplicating workflow rules into other files (link to `docs/WORKFLOW.md`).
- Writing in a non-English language in default-English directories.
- Treating PEL files as public-shareable without checking `client-engagement/OPERATING-AGREEMENT.md` §5.

## When in doubt

1. Run the [decision protocol](../../docs/AI_INSTRUCTIONS.md#2-decision-protocol--every-time-you-touch-docs) in `AI_INSTRUCTIONS.md §2`.
2. If still unclear, ask the user. Do not guess directories.
