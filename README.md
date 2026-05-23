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

## How pentaglyph is layered — the two-axis taxonomy

> **Read this section before touching anything in `template/docs/`. AI agents in particular: this is the structure you will be evaluated against.**

pentaglyph organises every file along **two orthogonal axes**, defined authoritatively in [`template/docs/STRATEGY.md §3`](./template/docs/STRATEGY.md#3-two-axis-taxonomy-change-rate--concern). Reading only one axis (e.g. just looking at [`assets/layers.png`](./assets/layers.png) which shows concern alone) is the most common AI-agent failure mode and produces miscategorised files.

<p align="center">
  <img src="./assets/layers-matrix.png" alt="pentaglyph two-axis taxonomy — change-rate (A/B/C) × concern (⓪/①/②/③/④/⑤). Every artefact lives in exactly one cell." width="100%" />
</p>

> If the image above is missing, regenerate it via `paperbanana generate -i assets/layers-matrix.txt -c "pentaglyph two-axis taxonomy" -o assets/layers-matrix.png` (requires `GOOGLE_API_KEY` or `PAPERBANANA_API_KEY_NAME`). The methodology spec at [`assets/layers-matrix.txt`](./assets/layers-matrix.txt) is the canonical source for the figure.

### Axis 1 — change-rate (A / B / C)

How often the artefact changes. Determines review weight and lifecycle state machine.

| Layer | Purpose | Change rate | Lifecycle |
|---|---|---|---|
| **A — Durable design** | Records "how the system is built". Code-coupled. Reviewed before merge. | Slow | `Draft → Review → Done → Superseded` |
| **B — Volatile working material** | Records "what we did, when". Append-only. Not reviewed (latest-wins). | Fast (dated) | `Active → Superseded by next dated file` |
| **C — Reference and archive** | Frozen prior content / RAW third-party material. Read-only. | None | (immutable) |

### Axis 2 — concern (⓪ / ① / ② / ③ / ④ / ⑤)

What concern the artefact addresses. Determines responsibility, DO/DON'T contract, and primary location. **Dependency direction is bottom-up**: each lower concern is the substrate for the upper.

| Layer | Concern | Responsibility (DO) | Out of scope (DON'T) |
|---|---|---|---|
| **⓪ Standards** | Bind external authoritative canons | List + link out (arc42, C4, MADR, Diátaxis, TiSDD + PEL primitives) | Re-author the canons' philosophy |
| **① Artefacts** | Templates + placement taxonomy + lifecycle state machine | Provide concrete document shapes and where they go | Prescribe processes that produce them |
| **② Process** | Bind external process canons (Scrum, BDD, TDD, Trunk-based, …) into thin operational defaults | One `02-process/` per canon, 6-section template, link-out only | Invent new process standards; paraphrase canon definitions |
| **③ Automation** | Reduce manual work via CLI + AI agents + scripts | Operate on artefacts from ①, execute processes from ② | Re-define artefacts or processes inside automation code |
| **④ Governance** | Define who decides / accepts / overrides | RACI, ADR Accept protocol, override justification | Take specific decisions (those are ADRs in ⓪/①) |
| **⑤ Measurement** *(optional)* | Quantify the health of ⓪–④ | Doc coverage, ADR throughput, freshness, doc-rot detection | Prescribe how to improve metrics (that is ② Process's role) |

### Combined matrix — where things actually live

Every artefact in the kit lives in exactly one cell of this matrix. **Empty cells are intentionally empty** — placing content there indicates a concern misclassification.

```
                    ┌────────────────────────────────────┬────────────────────────────────────┬──────────────────────────────────┐
                    │ A — Durable design                 │ B — Volatile working material      │ C — Reference and archive        │
                    │ slow · reviewed · code-coupled     │ dated · append-only · latest-wins  │ frozen · read-only               │
┌───────────────────┼────────────────────────────────────┼────────────────────────────────────┼──────────────────────────────────┤
│ ⓪ Standards      │ STRATEGY.md §2 (no directory)      │ —                                  │ —                                │
├───────────────────┼────────────────────────────────────┼────────────────────────────────────┼──────────────────────────────────┤
│ ① Artefacts      │ 01-artefacts/templates/            │ client-engagement/                 │ archive/_legacy/                 │
│                   │ 01-artefacts/arc42/                │ {reports,daci,kickoffs,            │                                  │
│                   │ 01-artefacts/detailed-design/      │  prfaqs,questions}/ (PEL volatile) │                                  │
│                   │ 01-artefacts/api-contract/         │                                    │                                  │
│                   │ 01-artefacts/user-manual/          │                                    │                                  │
│                   │ 01-artefacts/service-design/       │                                    │                                  │
│                   │ 01-artefacts/diagrams/c4/          │                                    │                                  │
├───────────────────┼────────────────────────────────────┼────────────────────────────────────┼──────────────────────────────────┤
│ ② Process        │ 02-process/version-control.md      │ 01-artefacts/impl-plans/           │ —                                │
│                   │ 02-process/dev-cycle.md            │ 01-artefacts/task-list/            │ (frozen process = deprecated;    │
│                   │ 02-process/dod-dor.md              │ 01-artefacts/postmortems/          │  express via superseding ADR)    │
│                   │ 02-process/tdd-workflow.md         │ 01-artefacts/reports/              │                                  │
│                   │ 02-process/bdd-workflow.md         │                                    │                                  │
│                   │ 02-process/_binding-a-new-process.md │                                  │                                  │
├───────────────────┼────────────────────────────────────┼────────────────────────────────────┼──────────────────────────────────┤
│ ③ Automation     │ cli/                               │ —                                  │ —                                │
│                   │ .claude/                           │                                    │                                  │
│                   │ scripts/docs/                      │                                    │                                  │
├───────────────────┼────────────────────────────────────┼────────────────────────────────────┼──────────────────────────────────┤
│ ④ Governance     │ 04-governance/raci.md              │ 01-artefacts/cost-estimates/       │ —                                │
│                   │ 04-governance/adr-accept-protocol.md │                                  │                                  │
│                   │ 04-governance/override-justification.md │                              │                                  │
│                   │ 04-governance/contributing.md      │                                    │                                  │
├───────────────────┼────────────────────────────────────┼────────────────────────────────────┼──────────────────────────────────┤
│ ⑤ Measurement    │ 05-measurement/README.md           │ 05-measurement/snapshots/          │ —                                │
│   (optional)      │ 05-measurement/baseline.md         │ YYYY-MM-DD_*.md                    │                                  │
└───────────────────┴────────────────────────────────────┴────────────────────────────────────┴──────────────────────────────────┘
                                       Place by concern first (⓪–⑤). Then pick change-rate (A/B/C).
                                          Empty cells signal a misclassification.
```

### Placement procedure (use this exactly, in order)

1. **Pick concern first** (⓪–⑤). Ask yourself: *"which concern would re-author this content if it disappeared?"*
2. **Pick change-rate second** (A/B/C). Ask yourself: *"would I keep editing this file indefinitely, or write a new dated file next month?"*
3. **Locate the matching cell** in the matrix above and place the file at one of the listed paths.
4. **If the cell is intentionally empty**, you are in the wrong concern. Back to step 1.

### Worked example — binding an emerging practice (e.g. AI harness engineering)

Suppose you want to adopt practices from the 2026 "Harness Engineering" essay (PostToolUse hooks, AGENTS.md sizing rules, ADR-linter coupling, MVH rollout). The source is not yet a canon — it's a vendor / community aggregate — so pentaglyph upstream cannot bind it as a default (per [ADR-0002 bind-canons-only](./template/docs/01-artefacts/arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md) and the day-1 ∧ switching-cost ∧ external-canon ∧ domain-neutrality criterion in [ADR-0003](./template/docs/01-artefacts/arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md), it fails the external-canon axis). But your **downstream project** can still adopt it via the override path. Place the new artefacts like this:

| Aspect of the harness practice | Cell | Concrete file in your downstream project |
|---|---|---|
| Link to the source essay | ⓪ × A | Add a one-line `link-out` under `docs/STRATEGY.md §9.X` (no paraphrasing) |
| Hook config template, AGENTS.md template (<50 lines) | ① × A | `docs/01-artefacts/templates/<NN>_hooks-config.json.tmpl`, `<NN>_agents-md.tmpl` |
| Rationale: "why we adopted hooks; what we deviated; override path" | ② × A | `docs/02-process/harness-strategy.md` (use the 6-section template in `02-process/_binding-a-new-process.md`) |
| Rollout plan (dated) | ② × B | `docs/01-artefacts/impl-plans/YYYY-MM-DD_harness-rollout.md` |
| `.claude/settings.json` hooks block, hook scripts | ③ × A | `.claude/settings.json`, `.claude/hooks/*.sh` |
| RACI line: "who accepts a new hook" | ④ × A | New row in `docs/04-governance/raci.md` |
| Hook hit-rate, lint auto-fix success rate | ⑤ × B | `docs/05-measurement/snapshots/YYYY-MM-DD_harness.md` (only if Layer ⑤ is activated) |

**Notice the pattern**: a single emerging practice spans **6 of the 18 cells** when adopted properly. Putting it all in one place (e.g. only `02-process/harness.md`, or only `.claude/settings.json`) is a misclassification — it conflates Standards (link-out), Process (rationale), Automation (executable hooks), Governance (RACI), and Measurement (metrics) into one cell. The matrix is what prevents that conflation.

**Why upstream pentaglyph does not ship this binding by default**: external-canon axis fails (no ISO/IEEE/single-authoritative-URL). Adopt downstream, observe for 6 months, then propose upstream via [`02-process/_future-bindings.md`](./template/docs/02-process/_future-bindings.md) if it stabilises.

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
