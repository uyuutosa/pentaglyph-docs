# pentaglyph-docs

<p align="center">
  <img src="./assets/hero.png" alt="pentaglyph-docs — five standards (arc42, C4, MADR, Diátaxis, TiSDD) bound by one AI-first workflow" width="100%" />
</p>

> A documentation scaffold built on five industry standards — **arc42** (architecture), **C4** (diagrams), **MADR** (decisions), **Diátaxis** (user docs), and **TiSDD** (service design) — with a single explicit workflow and AI-readable instructions per directory. A sixth slot, the **Project Engagement Layer (PEL)**, composes eight well-known client-communication primitives for consulting / advisory work.

The name **pentaglyph** (Greek `penta` "five" + `glyph` "engraved sign") reflects the **five peer standards** bundled into one opinionated kit. The 6th slot is a *binder*, not a peer standard — the client-engagement space has no single canonical framework, so PEL composes eight well-known primitives (Inception Deck / GitLab Handbook / Atlassian weekly / Basecamp Heartbeat / Amazon 6-pager / Now-Next-Later / DACI / RAID / PR-FAQ) under one local home. Renamed from the original `tetragram` (four standards) when TiSDD was adopted as the fifth peer standard; see `cli/PUBLISH.md` for migration notes.

| #  | Standard / slot                | Authoritative source                                                                | Local home                          |
| -- | ------------------------------ | ----------------------------------------------------------------------------------- | ----------------------------------- |
| 1  | **arc42**                      | <https://arc42.org/overview/>                                                       | `template/docs/arc42/`              |
| 2  | **C4 model**                   | <https://c4model.com>                                                               | `template/docs/diagrams/c4/`        |
| 3  | **MADR v3.0**                  | <https://adr.github.io/madr/>                                                       | `template/docs/arc42/09-decisions/` |
| 4  | **Diátaxis**                   | <https://diataxis.fr>                                                               | `template/docs/user-manual/`        |
| 5  | **TiSDD**                      | <https://www.thisisservicedesigndoing.com/methods>                                  | `template/docs/service-design/`     |
| 6  | **PEL** (binder, 8 primitives) | per-primitive URLs in [`template/docs/STRATEGY.md`](./template/docs/STRATEGY.md) §2.6 | `template/docs/client-engagement/`  |

External standards are authoritative. This kit only adds:

1. **Concrete file layout** that maps each standard to a directory.
2. **A single canonical workflow** ([`template/docs/WORKFLOW.md`](./template/docs/WORKFLOW.md)) that tells humans and AI agents *when to write what, where to put it, and what state it goes through*.
3. **Per-directory `README.md`** files with explicit AI instructions so an LLM can place new content correctly with zero project context.
4. **A Bun-based CLI** (`cli/`) that scaffolds a new project's `docs/` from this template with profile / language / AI-target options.

---

## Quick start

```bash
bunx --bun @uyuutosa/pentaglyph init ./my-project --profile=standard --ai=claude
```

That command creates `./my-project/docs/` populated with the kit and `./my-project/.claude/rules/documentation.md` for the auto-load rule. Then open `./my-project/docs/AI_INSTRUCTIONS.md` and `./my-project/docs/WORKFLOW.md` — those two files contain everything you need.

For a 30-minute walk-through (PRD → ADR → Module DD → code-with-doc), see the [getting-started tutorial](./docs/tutorials/getting-started.md).

For the full CLI reference, see [`cli/README.md`](./cli/README.md).

---

## Documentation

**[`docs/`](./docs/) — the user manual for pentaglyph itself.** Diátaxis-organised:

- **Tutorial** — [Getting started (30 min walk-through)](./docs/tutorials/getting-started.md)
- **How-to** — [Use with Claude Code](./docs/how-to/use-with-claude-code.md) · [Adopt in an existing project](./docs/how-to/adopt-existing-project.md) · [Choose the right template](./docs/how-to/choose-the-right-template.md) · [Prompt cookbook](./docs/how-to/prompt-cookbook.md)
- **Reference** — [Template inventory](./docs/reference/template-index.md)
- **Explanation** — [Why pentaglyph exists](./docs/explanation/why-pentaglyph.md)

> **Two different "docs" in this repo.** `./docs/` (above) is the manual for pentaglyph *users*. `./template/docs/` is the kit *itself* — what gets copied into your project by `pentaglyph init`. Do not confuse the two.

---

## Repo layout

```text
pentaglyph-docs/
├── README.md                 # this file
├── LICENSE                   # MIT
├── template/                 # the doc kit — what gets copied
│   ├── docs/
│   │   ├── INDEX.md              # entry point
│   │   ├── STRATEGY.md           # taxonomy, layers, authoring rules
│   │   ├── WORKFLOW.md           # ★ single source of truth for "what to write when"
│   │   ├── AI_INSTRUCTIONS.md    # entry point for AI agents
│   │   ├── arc42/                # arc42 §1–§12
│   │   ├── diagrams/c4/          # C4 model (Structurizr DSL)
│   │   ├── detailed-design/      # per-module specs
│   │   ├── design-guide/         # operational conventions
│   │   ├── api-contract/         # OpenAPI / MCP-tool schemas
│   │   ├── impl-plans/           # dated implementation plans
│   │   ├── task-list/            # sprint-scoped task breakdowns
│   │   ├── postmortems/          # incident retrospectives
│   │   ├── reports/              # one-shot research reports
│   │   ├── cost-estimates/       # cost projections
│   │   ├── user-manual/          # Diátaxis quadrants
│   │   ├── service-design/       # TiSDD per-service designs (persona / journey / blueprint)
│   │   ├── client-engagement/    # PEL — Project Engagement Layer (6th slot)
│   │   └── templates/            # 19 authoring templates (0-8 core+UX, 9-13 process/governance, 14-18 PEL)
│   └── .claude/rules/            # Claude Code auto-load rule
└── cli/                          # Bun CLI scaffolder
    ├── package.json
    ├── tsconfig.json
    └── src/
```

---

## Alternative: manual copy

If you do not want to use `bunx` / `npx`, you can copy the template directly:

```bash
git clone https://github.com/uyuutosa/pentaglyph-docs.git
cp -r pentaglyph-docs/template/docs   ./my-project/docs
cp -r pentaglyph-docs/template/.claude ./my-project/.claude
```

---

## Why "pentaglyph"?

The five standards in this kit each answer a different question:

| Standard       | Question it answers                                              |
| -------------- | ---------------------------------------------------------------- |
| arc42          | *How is the system organised?*                                   |
| C4             | *What does it look like at each zoom level?*                     |
| MADR           | *Why did we choose this over alternatives?*                      |
| Diátaxis       | *How do users learn this product?*                               |
| TiSDD          | *How is the **service** experienced end-to-end?*                 |
| PEL (6th slot) | *How does this team communicate with the client over the engagement?* |

Picking just one is incomplete. Picking all five is opinionated but defensible — and that opinion is what this kit packages. The name `pentaglyph` (Greek `penta` "five" + `glyph` "engraved sign") replaces the earlier `tetragram` (four standards) as of v0.1.0, when TiSDD joined as the fifth peer standard. The 6th slot — **PEL (Project Engagement Layer)** — is a *binder* over eight well-known client-communication primitives, not a new peer standard; the kit's name remains `pentaglyph`.

---

## License

MIT. See [`LICENSE`](./LICENSE).
