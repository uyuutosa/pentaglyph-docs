---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
---

# STRATEGY — Documentation taxonomy and rationale

> **For "what to write when", read [`WORKFLOW.md`](./WORKFLOW.md).**
>
> This file explains *why the directory layout looks the way it does*. If you only need to author a doc, `WORKFLOW.md` and `AI_INSTRUCTIONS.md` are sufficient.

---

## 1. Purpose

Define the taxonomy and authoring rules for `docs/` so that:

1. Every artifact has exactly one canonical location and one owner.
2. Both humans and AI agents can locate the right document in ≤ 2 hops from the entry point.
3. Volatile material (dated implementation plans, weekly reports) is separated from durable design records (architecture, ADRs).
4. The boundary between the five adopted standards (arc42 / C4 / MADR / Diátaxis / TiSDD) is preserved — they each answer a different question — and the sixth slot ([Project Engagement Layer](#26-the-sixth-slot--project-engagement-layer-pel)) composes well-known primitives without competing with the five.

---

## 2. Adopted standards

This kit binds five external standards into one opinionated layout. Their **authoritative definitions live at the source URLs**; this kit only adds the file layout that hosts them.

| Standard | Authoritative source | Question it answers | Local home |
|---|---|---|---|
| **arc42** | <https://arc42.org/overview/> | How is the system organised? | `arc42/` |
| **C4 model** | <https://c4model.com> | What does the architecture look like at each zoom level? | `diagrams/c4/` |
| **MADR v3.0** | <https://adr.github.io/madr/> | Why did we choose this over alternatives? | `arc42/09-decisions/` |
| **Diátaxis** | <https://diataxis.fr> | How do users learn this product? | `user-manual/` |
| **TiSDD** | <https://www.thisisservicedesigndoing.com/methods> | How is the **service** experienced end-to-end? | `service-design/` |

Do not re-author the philosophy of these standards inside this repo. Link out.

The five-standard set forms the kit's namesake (`pentaglyph` — Greek `penta` "five" + `glyph` "engraved sign"). The fifth standard, **TiSDD** (*This Is Service Design Doing*, Stickdorn et al., 2018), is the canonical method bank for service design and the natural anchor for the Persona / Journey Map / Service Blueprint templates already in `templates/`. It plays the same role for service-experience design that Diátaxis plays for end-user docs: a single authoritative URL plus a published reference book.

---

## 2.6 The sixth slot — Project Engagement Layer (PEL)

The five peer standards above each answer a *system-level* question (architecture, diagrams, decisions, user docs, service experience). The sixth slot — the **Project Engagement Layer**, local home [`client-engagement/`](./client-engagement/) — answers a different *kind* of question: **how does this team communicate with the paying client / external sponsor over the life of the engagement?**

Unlike the five peer standards, PEL is **not a single canonical framework**. After surveying the consulting / advisory space, no single "client communication standard" emerged with the cohesion of arc42 or MADR. Every consulting firm has its own templates; no public standard has consolidated. PEL therefore exists as a **binder** that composes eight well-known, AI-friendly primitives — each owning one slice of the engagement lifecycle:

| Slot | Bound primitive | Authoritative source |
| --- | --- | --- |
| Engagement charter (kickoff) | **Agile Inception Deck** (Rasmusson, 2010) | <https://agilewarrior.wordpress.com/2010/11/06/the-agile-inception-deck/> |
| Operating agreement (working rules) | **GitLab Handbook** "handbook-first" pattern | <https://handbook.gitlab.com/> |
| Short-form weekly | **Atlassian "Priorities → Progress → Problems → Next"** | <https://www.atlassian.com/team-playbook/plays/weekly-team-updates> |
| Long-form cyclical | **Basecamp Heartbeat** + **Amazon 6-pager** prose discipline | <https://world.hey.com/jason/what-s-in-a-heartbeat-4fd72d0e> / <https://www.sixpagermemo.com/blog/amazon-six-pager-template> |
| Forward roadmap | **Now / Next / Later** (Janna Bastow) | <https://productmanagementresources.com/now-next-later-roadmap/> |
| In-flight decisions | **DACI** (Atlassian) → archives to MADR | <https://www.atlassian.com/team-playbook/plays/daci> |
| Open-items ledger | **RAID log** (Risk / Assumption / Issue / Decision) | <https://asana.com/resources/raid-log> |
| New-initiative kickoff | **Amazon PR/FAQ** (working backwards) | <https://workingbackwards.com/resources/working-backwards-pr-faq/> |

**Why a binder, not a sixth peer standard**: the five peer standards each ship as a single authoritative URL plus (often) a reference book. PEL's eight primitives have no shared authoritative home — picking *one* as the "PEL standard" would be over-fitting; picking *several without a binder* would scatter client-engagement material across `reports/`, `arc42/09-decisions/`, `impl-plans/`, and ad-hoc directories. The binder model — one directory, one README, eight composed primitives — gives the AI agent a single placement target without forcing pentaglyph to invent its own framework. The kit's name remains `pentaglyph` (five peer standards); PEL is the sixth *slot*, not the sixth standard.

**Why these eight primitives in particular**: every piece has very high LLM training-corpus footprint (millions of public examples on GitHub, Notion templates, Atlassian docs, blog posts, podcasts), zero proprietary licensing, naturally markdown-renderable. AI agents drafting in any of these formats produce high-quality output zero-shot.

**Confidentiality posture inversion**: GitLab's handbook-first principle is *public-first*. Consulting engagements are *private-first*. PEL borrows the single-source-of-truth discipline from GitLab Handbook but inverts the public default — every file in `client-engagement/` is confidential unless the engagement agreement specifies otherwise. See [`client-engagement/OPERATING-AGREEMENT.md` §5](./client-engagement/OPERATING-AGREEMENT.md) for how a project records its specific confidentiality posture.

**Templates that ship with PEL**: Types 9–13 cover the five highest-leverage primitives (Inception Deck, Weekly Update, Heartbeat, DACI, RAID). Types 14–16 (PR/FAQ, Now/Next/Later, Kickoff) are planned for a follow-up release; until then, follow the structure documented in the authoritative source URLs above and in each `client-engagement/<sub-dir>/README.md`.

**When to enable PEL in a downstream project**: when the project has an external client / sponsor / paying customer / executive stakeholder who consumes written progress. Internal-only product development can keep `reports/` + `impl-plans/` and skip PEL.

---

## 3. Three-layer taxonomy

| Layer | Purpose | Change rate | Examples |
|---|---|---|---|
| **A — Durable design** | Records "how the system is built". Code-coupled. Reviewed before merge. | Slow | `arc42/`, `diagrams/c4/`, `detailed-design/`, `api-contract/`, `design-guide/`, `user-manual/`, `service-design/`, `client-engagement/{CHARTER,OPERATING-AGREEMENT,NOW-NEXT-LATER,raid,decisions}` |
| **B — Volatile working material** | Records "what we did, when". Append-only. Not reviewed (latest-wins). | Fast (dated) | `impl-plans/`, `task-list/`, `postmortems/`, `reports/`, `cost-estimates/`, `client-engagement/{reports,daci,kickoffs,prfaqs,questions}` |
| **C — Reference and archive** | Frozen prior content / RAW third-party material. Read-only. | None | `archive/_legacy/`, vendor-supplied RAW data |

**Why three layers and not one?** Mixing fast and slow material in the same directories produces two failure modes: (a) durable docs rot because nobody knows whether to update them or write a new dated file, and (b) volatile docs accumulate without ever being summarised into durable ones. Splitting by change rate makes the cost / review weight visible.

---

## 4. Layer A — Durable design

### `arc42/` — arc42 §1–§12

One subdirectory per arc42 section. Each section has its own `README.md` that links to the section's authoritative arc42 URL and lists the local files.

The 12 sections are non-negotiable; do not rename, renumber, or merge them. If a section is empty for your project, leave the `README.md` in place with a one-line "intentionally empty" note.

### `diagrams/c4/` — C4 model

`workspace.dsl` is the **single source of truth**. Image renders (`.png`, `.svg`) are generated and gitignored.

- L1 (System Context) and L2 (Container) are required.
- L3 (Component) is added when a container is structurally complex enough to need it.
- L4 (Code) is rare; usually inline in arc42 §5 building-block notes.

### `arc42/09-decisions/` — ADRs (MADR v3.0)

One file per decision: `NNNN-<kebab-title>.md`. Filename numbering is global and zero-padded.

- **Status field**: `Proposed` / `Accepted` / `Rejected` / `Deprecated` / `Superseded by NNNN`.
- **Immutable once `Accepted`**: changes require a new ADR with `Supersedes: NNNN`.

### `detailed-design/` — Per-module implementation specs

One file per module. Linked from `arc42/05-building-blocks/`. Uses Template 3.

`detailed-design/` exists separately from `arc42/05-building-blocks/` so that arc42 §5 stays a navigation index (containers, components, responsibilities) while the implementation HOW lives next to no-arc42-section-fits-cleanly material like API specs and data models.

### `api-contract/` — OpenAPI / MCP-tool / RPC schemas

One file per module group. Cross-linked from `detailed-design/<module>.md` §4.3 (API specification).

### `design-guide/` — Operational conventions

Naming, code style, team agreements. Architecture-level cross-cutting concerns belong in `arc42/08-crosscutting/`, not here.

### `user-manual/` — Diátaxis quadrants

Four subdirectories, one per quadrant: `tutorials/`, `how-to/`, `reference/`, `explanation/`. Pick the quadrant by the reader's goal, not by the topic.

---

## 5. Layer B — Volatile working material

All Layer B directories follow the same conventions:

- **Date prefix in filename**: `YYYY-MM-DD_<kebab-title>.md` (or `YYYY-MM_` for monthly cadence).
- **No lifecycle states beyond Active → Superseded by next file.**
- **Append-only**: never edit a closed dated file; write a new one.
- **No review required for individual files** (the latest one is the truth).

| Directory | What goes here |
|---|---|
| `impl-plans/` | "How we plan to implement X over the next N weeks" |
| `task-list/` | Sprint-scoped task breakdowns |
| `postmortems/` | Incident retrospectives (Medium+ severity only) |
| `reports/` | One-shot research / evaluation / benchmark reports |
| `cost-estimates/` | Cost projections (latest-wins) |

---

## 6. Layer C — Reference and archive

`archive/_legacy/` and any vendor-supplied RAW data directories. **Do not edit. Do not reference from new work.** Frozen.

---

## 7. Authoring rules

These are project-wide invariants. Per-directory specifics are in each `README.md`; per-template specifics are in `templates/README.md`.

1. **One canonical location per topic.** Cross-references are links, not copies.
2. **Front-matter on durable docs** (`status:`, `owner:`, `last-reviewed:`). YAML between `---` markers at the top of the file.
3. **Date prefix on volatile docs.** `YYYY-MM-DD_` (engineering) or `YYYY-MM_` (cost-estimates).
4. **Repo-root-relative cross-references**: `docs/<path>` form so links survive reorganisation.
5. **English by default.** Other languages reserved for explicitly designated client-facing directories (none in the default kit; project may add e.g. `client-reports/` and declare it Japanese).
6. **No paraphrasing of external standards.** Link out instead.
7. **Pick a template before writing.** `templates/README.md` has the decision flow.

---

## 8. Lifecycle

See [`WORKFLOW.md` §4](./WORKFLOW.md#4-lifecycle) for the state machine. Summary:

- **Durable docs**: `Draft → Review → Done → Superseded`. Supersede over delete.
- **Volatile docs**: `Active → Superseded` (by next dated file). No Review state.
- **ADRs**: `Proposed → Accepted | Rejected → Superseded by NNNN | Deprecated`. Body immutable once Accepted.

---

## 9. Where this kit ends and project-specific extension begins

This kit ships the five-standard skeleton **plus** three operational defaults (branching, AI-augmented PR authoring, code tours). It deliberately does not prescribe:

- Sprint cadence (1-week / 2-week / Kanban)
- Ticket system (GitHub Issues / Jira / Azure DevOps Boards)
- Code review workflow (specific reviewer rules, required CI checks)
- CI / CD pipelines

Add those as Layer A `design-guide/` documents in your downstream project.

### 9.1 Branch strategy — Git Flow by default

Branching is the one operational concern this kit *does* prescribe a default for, because every project needs it on day one and the cost of changing it later is high.

The default is **Git Flow** (Vincent Driessen, 2010). Rationale, model, and override path are documented in [`design-guide/version-control.md`](./design-guide/version-control.md). The auto-loaded rule file [`.claude/rules/version-control.md`](../.claude/rules/version-control.md) carries the operational checklist that AI agents follow. Override the default by replacing both files with your project-specific model.

### 9.2 AI-augmented PR authoring — empirically grounded default

Pull-request descriptions for AI-assisted changes follow [`design-guide/ai-augmented-pr.md`](./design-guide/ai-augmented-pr.md), and the companion template is `.github/PULL_REQUEST_TEMPLATE.md`. The convention selects a small set of fields (3-5 risk self-disclosures, span-level categorical confidence, one cognitive forcing question, a verification budget, an AI-involvement disclosure) on peer-reviewed evidence that these *specific* interventions reduce the appropriate-reliance gap, while longer free-form explanations and numeric confidence scores empirically do not. The design guide carries the citations.

The kit prescribes this default because the industry's existing PR-template canon (Google eng-practices, Conventional Commits) does not yet cover AI-generated code, and ad-hoc per-team conventions tend to drift toward "more text" — which Tao Xiao et al. (FSE 2024) found correlates with longer merge latency without a defect-detection gain. Override by replacing the design-guide file and the template; do not selectively delete fields, since the set is balanced as a whole.

### 9.3 Code tours — CodeTour-compatible reading paths

Guided reading paths through the codebase use Microsoft's CodeTour `.tour` JSON schema, anchored under `.tours/`. Convention is documented in [`design-guide/code-tours.md`](./design-guide/code-tours.md). Tours sit *outside* Diátaxis (which is for end users), in line with Daniele Procida's explicit position that contributor-onboarding artefacts are not part of Diátaxis (<https://diataxis.fr/start-here/>). Override is rare; if your project uses a different walkthrough format, replace the design-guide file and migrate any existing tours.
