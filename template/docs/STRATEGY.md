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
4. The boundary between the four adopted standards (arc42 / C4 / MADR / Diátaxis) is preserved — they each answer a different question.

---

## 2. Adopted standards

This kit binds five external standards into one opinionated layout. Their **authoritative definitions live at the source URLs**; this kit only adds the file layout that hosts them.

| Standard | Authoritative source | Question it answers | Local home |
|---|---|---|---|
| **arc42** | <https://arc42.org/overview/> | How is the system organised? | `01-artefacts/arc42/` |
| **C4 model** | <https://c4model.com> | What does the architecture look like at each zoom level? | `01-artefacts/diagrams/c4/` |
| **MADR v3.0** | <https://adr.github.io/madr/> | Why did we choose this over alternatives? | `01-artefacts/arc42/09-decisions/` |
| **Diátaxis** | <https://diataxis.fr> | How do users learn this product? | `01-artefacts/user-manual/` |
| **TiSDD** | <https://www.thisisservicedesigndoing.com/methods> | How is the **service** experienced end-to-end? | `01-artefacts/service-design/` |

Do not re-author the philosophy of these standards inside this repo. Link out.

The five-standard set forms the kit's namesake (`pentaglyph` — Greek `penta` "five" + `glyph` "engraved sign"). The fifth standard, **TiSDD** (*This Is Service Design Doing*, Stickdorn et al., 2018), is the canonical method bank for service design and the natural anchor for the Persona / Journey Map / Service Blueprint templates already in `01-artefacts/templates/`. It plays the same role for service-experience design that Diátaxis plays for end-user docs: a single authoritative URL plus a published reference book.

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

**Why a binder, not a sixth peer standard**: the five peer standards each ship as a single authoritative URL plus (often) a reference book. PEL's eight primitives have no shared authoritative home — picking *one* as the "PEL standard" would be over-fitting; picking *several without a binder* would scatter client-engagement material across `01-artefacts/reports/`, `01-artefacts/arc42/09-decisions/`, `01-artefacts/impl-plans/`, and ad-hoc directories. The binder model — one directory, one README, eight composed primitives — gives the AI agent a single placement target without forcing pentaglyph to invent its own framework. The kit's name remains `pentaglyph` (five peer standards); PEL is the sixth *slot*, not the sixth standard.

**Where PEL sits in the two-axis taxonomy (§3)**: PEL spans the **concern ⓪ Standards axis** (the eight bound primitives are external authoritative canons that PEL only links out to) and the **concern ① Artefacts axis** (PEL ships templates 14–18 and the `client-engagement/` directory shape). The eight primitives behave as ⓪ Standards — pentaglyph does not paraphrase them. The templates behave as ① Artefacts — they are concrete document shapes with placement and lifecycle. On the change-rate axis, durable PEL files (`CHARTER.md` / `OPERATING-AGREEMENT.md` / `NOW-NEXT-LATER.md` / `raid.md` / `decisions/`) live in **Layer A**; volatile PEL files (`01-artefacts/reports/<YYMMDD>/` / `daci/` / `kickoffs/` / `prfaqs/` / `questions/`) live in **Layer B**.

**Why these eight primitives in particular**: every piece has very high LLM training-corpus footprint (millions of public examples on GitHub, Notion templates, Atlassian docs, blog posts, podcasts), zero proprietary licensing, naturally markdown-renderable. AI agents drafting in any of these formats produce high-quality output zero-shot.

**Confidentiality posture inversion**: GitLab's handbook-first principle is *public-first*. Consulting engagements are *private-first*. PEL borrows the single-source-of-truth discipline from GitLab Handbook but inverts the public default — every file in `client-engagement/` is confidential unless the engagement agreement specifies otherwise. See [`client-engagement/OPERATING-AGREEMENT.md` §5](./client-engagement/OPERATING-AGREEMENT.md) for how a project records its specific confidentiality posture.

**Templates that ship with PEL**: Types 14–18 cover the five highest-leverage primitives (Inception Deck, Weekly Update, Heartbeat, DACI, RAID). Types 19–21 (PR/FAQ, Now/Next/Later, Kickoff) are planned for a follow-up release; until then, follow the structure documented in the authoritative source URLs above and in each `client-engagement/<sub-dir>/README.md`.

**When to enable PEL in a downstream project**: when the project has an external client / sponsor / paying customer / executive stakeholder who consumes written progress. Internal-only product development can keep `01-artefacts/reports/` + `01-artefacts/impl-plans/` and skip PEL.

---

## 3. Two-axis taxonomy: change-rate × concern

Pentaglyph organizes the repository along **two orthogonal axes**:

1. **Change-rate axis** (Layers A / B / C) — how often the artefact changes.
2. **Concern axis** (Layers ⓪ / ① / ② / ③ / ④, plus optional ⑤) — what concern the artefact addresses.

Every file in `docs/` and the kit itself sits at one cell of this matrix. Change-rate is independent of concern: an ADR (concern ⓪/①) and a sprint retro template (concern ②) are both *durable* records, but they live in different concern columns. The doc-coverage CLI (concern ③) and the doc-rot metric (concern ⑤) are both automation under the change-rate axis but split across concerns.

Making both axes explicit is what allows pentaglyph to host BDD, Scrum, TDD or any future process canon without inventing new vocabulary: those canons land in the **concern ② column**, with their lifecycle still governed by the **change-rate row**.

### 3.1 Change-rate axis (A / B / C)

| Layer | Purpose | Change rate | Examples |
|---|---|---|---|
| **A — Durable design** | Records "how the system is built". Code-coupled. Reviewed before merge. | Slow | `01-artefacts/arc42/`, `01-artefacts/diagrams/c4/`, `01-artefacts/detailed-design/`, `01-artefacts/api-contract/`, `02-process/`, `01-artefacts/user-manual/`, `01-artefacts/service-design/`, `04-governance/`, durable PEL files: `client-engagement/{CHARTER,OPERATING-AGREEMENT,NOW-NEXT-LATER,raid,decisions}` |
| **B — Volatile working material** | Records "what we did, when". Append-only. Not reviewed (latest-wins). | Fast (dated) | `01-artefacts/impl-plans/`, `01-artefacts/task-list/`, `01-artefacts/postmortems/`, `01-artefacts/reports/`, `01-artefacts/cost-estimates/`, volatile PEL files: `client-engagement/{reports,daci,kickoffs,prfaqs,questions}` |
| **C — Reference and archive** | Frozen prior content / RAW third-party material. Read-only. | None | `archive/_legacy/`, vendor-supplied RAW data |

**Why three layers and not one?** Mixing fast and slow material in the same directories produces two failure modes: (a) durable docs rot because nobody knows whether to update them or write a new dated file, and (b) volatile docs accumulate without ever being summarised into durable ones. Splitting by change-rate makes the cost / review weight visible.

### 3.2 Concern axis (⓪ / ① / ② / ③ / ④, plus optional ⑤)

| Layer | Concern | Responsibility (DO) | Out of scope (DON'T) | Primary location |
|---|---|---|---|---|
| **⓪ Standards** | Bind external authoritative canons | List + link out (arc42, C4, MADR, Diátaxis, TiSDD, plus the 8 PEL primitives — Inception Deck / GitLab Handbook / Atlassian weekly / Basecamp Heartbeat / Amazon 6-pager / Now-Next-Later / DACI / RAID / PR-FAQ) | Re-author the canons' philosophy | `STRATEGY.md §2` + `§2.6` (PEL binder) |
| **① Artefacts** | Templates + placement taxonomy + lifecycle state machine | Provide concrete document shapes and where they go | Prescribe processes that produce them | `01-artefacts/templates/` (0-18), `STRATEGY.md §4-§8`, `WORKFLOW.md`, `client-engagement/` (PEL 6th slot) |
| **② Process** | Bind external process canons (Scrum, BDD, TDD, Trunk-based, …) into thin operational defaults | One `02-process/` per canon, 6-section template, link-out only; provide extensibility (a meta-doc for binding *new* canons) | Invent new process standards; prescribe specific tools (Jira / pytest-bdd / GitHub Actions); paraphrase canon definitions | `02-process/` |
| **③ Automation** | Reduce manual work via CLI + AI agents + scripts | Operate on artefacts from ①, execute processes from ② | Re-define artefacts or processes inside automation code | `cli/`, `.claude/`, `scripts/docs/` |
| **④ Governance** | Define who decides / accepts / overrides | RACI, ADR Accept protocol, override justification, contribution guide | Take specific decisions (that is the role of individual ADRs) | `04-governance/`, `STRATEGY.md §10-§12` |
| **⑤ Measurement** *(optional)* | Quantify the health of ⓪-④ | Doc coverage, ADR throughput, freshness, doc-rot detection | Prescribe how to improve the metrics (that is ② Process's role) | `05-measurement/`, `scripts/docs/metrics_*` |

**Why a concern axis at all?** Without it, "process" and "governance" leak into the artefact taxonomy without an explicit home. Sprint retros, DoR / DoD checklists, RACI matrices, ADR Accept policies — these are real artefacts pentaglyph already touches (often implicitly through `WORKFLOW.md` and Layer B docs), but until the concern axis exists they have no canonical place. The concern axis surfaces what was previously implicit, and binds it to external canons rather than inventing in-house vocabulary.

**Layer dependency direction**: each lower concern is a substrate for the upper. ⓪ Standards is what ① Artefacts shape-check against; ① Artefacts is what ② Process operates on; ② Process is what ③ Automation executes; ③ Automation is what ④ Governance audits; ④ Governance is what ⑤ Measurement reports against. Downstream projects override from the top down (e.g. replace ② Process while reusing ⓪ Standards and ① Artefacts unchanged).

### 3.3 Combined matrix — where things actually live

| Concern \ Change-rate | A — Durable | B — Volatile | C — Frozen |
|---|---|---|---|
| **⓪ Standards** | `STRATEGY.md §2` (the five-canon list) + `§2.6` (PEL binder over 8 client-comm primitives) | — *(canons don't expire on a date)* | — |
| **① Artefacts** | `01-artefacts/templates/` (0-18), `STRATEGY.md`, `WORKFLOW.md`, `AI_INSTRUCTIONS.md`, every directory under `01-artefacts/arc42/`, `01-artefacts/detailed-design/`, `01-artefacts/api-contract/`, `01-artefacts/user-manual/`, `01-artefacts/service-design/`, `01-artefacts/diagrams/c4/`, `client-engagement/{CHARTER,OPERATING-AGREEMENT,NOW-NEXT-LATER,raid,decisions}` (PEL durable) | `client-engagement/{reports,daci,kickoffs,prfaqs,questions}` (PEL volatile) | `archive/_legacy/<frozen artefacts>` |
| **② Process** | `02-process/version-control.md`, `02-process/ai-augmented-pr.md`, `02-process/code-tours.md`, plus forthcoming `02-process/bdd-workflow.md`, `dev-cycle.md`, `dod-dor.md`, `tdd-workflow.md`, `_binding-a-new-process.md` | `01-artefacts/task-list/`, `01-artefacts/postmortems/`, `01-artefacts/impl-plans/`, `01-artefacts/reports/` (process *outputs* over time) | — *(a frozen process is a deprecated process, which is just an ADR superseding the binding)* |
| **③ Automation** | `cli/README.md`, `.claude/README.md`, `scripts/docs/README.md` and the scripts themselves | — | — |
| **④ Governance** | `04-governance/raci.md`, `04-governance/adr-accept-protocol.md`, `04-governance/override-justification.md`, `04-governance/contributing.md` (forthcoming) | `01-artefacts/cost-estimates/` (governance outputs over time) | — |
| **⑤ Measurement** *(optional)* | `05-measurement/README.md`, `05-measurement/baseline.md` (forthcoming) | `05-measurement/snapshots/*.md` (dated) | — |

> **Note**: cells referencing files marked *forthcoming* describe the **target structure**. The build-out plan lives in [`docs/01-artefacts/impl-plans/2026-05-14_pentaglyph-self-architecture-roadmap.md`](01-artefacts/impl-plans/2026-05-14_pentaglyph-self-architecture-roadmap.md). Empty cells marked "—" are **intentionally empty by design** — placing content there indicates a concern misclassification.

**How to use the matrix when placing a new file**:

1. **Concern first**: pick ⓪-⑤. Heuristic: "which concern would *re-author* this content if it disappeared?"
2. **Change-rate second**: pick A/B/C. Heuristic: "would I keep editing this file indefinitely, or write a new dated file next month?"
3. Pick the directory from the matching cell. If the cell is intentionally empty, reconsider — you are probably in the wrong concern.

---

## 4. Layer A — Durable design

### `01-artefacts/arc42/` — arc42 §1–§12

One subdirectory per arc42 section. Each section has its own `README.md` that links to the section's authoritative arc42 URL and lists the local files.

The 12 sections are non-negotiable; do not rename, renumber, or merge them. If a section is empty for your project, leave the `README.md` in place with a one-line "intentionally empty" note.

### `01-artefacts/diagrams/c4/` — C4 model

`workspace.dsl` is the **single source of truth**. Image renders (`.png`, `.svg`) are generated and gitignored.

- L1 (System Context) and L2 (Container) are required.
- L3 (Component) is added when a container is structurally complex enough to need it.
- L4 (Code) is rare; usually inline in arc42 §5 building-block notes.

### `01-artefacts/arc42/09-decisions/` — ADRs (MADR v3.0)

One file per decision: `NNNN-<kebab-title>.md`. Filename numbering is global and zero-padded.

- **Status field**: `Proposed` / `Accepted` / `Rejected` / `Deprecated` / `Superseded by NNNN`.
- **Immutable once `Accepted`**: changes require a new ADR with `Supersedes: NNNN`.

### `01-artefacts/detailed-design/` — Per-module implementation specs

One file per module. Linked from `01-artefacts/arc42/05-building-blocks/`. Uses Template 3.

`01-artefacts/detailed-design/` exists separately from `01-artefacts/arc42/05-building-blocks/` so that arc42 §5 stays a navigation index (containers, components, responsibilities) while the implementation HOW lives next to no-arc42-section-fits-cleanly material like API specs and data models.

### `01-artefacts/api-contract/` — OpenAPI / MCP-tool / RPC schemas

One file per module group. Cross-linked from `01-artefacts/detailed-design/<module>.md` §4.3 (API specification).

### `02-process/` — Operational conventions

Naming, code style, team agreements. Architecture-level cross-cutting concerns belong in `01-artefacts/arc42/08-crosscutting/`, not here.

### `01-artefacts/user-manual/` — Diátaxis quadrants

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
| `01-artefacts/impl-plans/` | "How we plan to implement X over the next N weeks" |
| `01-artefacts/task-list/` | Sprint-scoped task breakdowns |
| `01-artefacts/postmortems/` | Incident retrospectives (Medium+ severity only) |
| `01-artefacts/reports/` | One-shot research / evaluation / benchmark reports |
| `01-artefacts/cost-estimates/` | Cost projections (latest-wins) |

---

## 6. Layer C — Reference and archive

`archive/_legacy/` and any vendor-supplied RAW data directories. **Do not edit. Do not reference from new work.** Frozen.

---

## 7. Authoring rules

These are project-wide invariants. Per-directory specifics are in each `README.md`; per-template specifics are in `01-artefacts/templates/README.md`.

1. **One canonical location per topic.** Cross-references are links, not copies.
2. **Front-matter on durable docs** (`status:`, `owner:`, `last-reviewed:`). YAML between `---` markers at the top of the file.
3. **Date prefix on volatile docs.** `YYYY-MM-DD_` (engineering) or `YYYY-MM_` (cost-estimates).
4. **Repo-root-relative cross-references**: `docs/<path>` form so links survive reorganisation.
5. **English by default.** Other languages reserved for explicitly designated client-facing directories (none in the default kit; project may add e.g. `client-01-artefacts/reports/` and declare it Japanese).
6. **No paraphrasing of external standards.** Link out instead.
7. **Pick a template before writing.** `01-artefacts/templates/README.md` has the decision flow.

---

## 8. Lifecycle

See [`WORKFLOW.md` §4](./WORKFLOW.md#4-lifecycle) for the state machine. Summary:

- **Durable docs**: `Draft → Review → Done → Superseded`. Supersede over delete.
- **Volatile docs**: `Active → Superseded` (by next dated file). No Review state.
- **ADRs**: `Proposed → Accepted | Rejected → Superseded by NNNN | Deprecated`. Body immutable once Accepted.

---

## 9. Operational defaults — what this kit prescribes and what it leaves to downstream

This kit ships the five-standard skeleton plus a **bound set of Layer ② Process operational defaults**. Each default is justified against the four-axis criterion stated in [ADR-0003](./01-artefacts/arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md): **day-1 necessity ∧ switching cost ∧ external canon ∧ domain neutrality**. Failing any axis means the concern is left to project-specific extension.

> **Historical note (ADR-0005)**: prior versions of this section claimed the kit "deliberately does not prescribe" sprint cadence / code review / CI-CD. That framing was inaccurate: [`WORKFLOW.md`](./WORKFLOW.md) and the Layer B directories (`01-artefacts/task-list/`, `01-artefacts/postmortems/`, `01-artefacts/impl-plans/`) have always *implicitly* prescribed a Scrum-flavoured process. This revision **surfaces what was already running** and binds it to external canons rather than inventing a pentaglyph-specific process standard. See [ADR-0005](./01-artefacts/arc42/09-decisions/0005-surface-implicit-process-layer.md).

| # | Concern | Canon bound | Design-guide file |
| --- | --- | --- | --- |
| 1 | Branching | Git Flow (Driessen, 2010) | [`02-process/version-control.md`](./02-process/version-control.md) |
| 2 | AI-augmented PR | Xiao et al. (FSE 2024) + Anthropic conventions | [`02-process/ai-augmented-pr.md`](./02-process/ai-augmented-pr.md) |
| 3 | Code tours | Microsoft CodeTour schema | [`02-process/code-tours.md`](./02-process/code-tours.md) |
| 4 | Acceptance Criteria format | BDD (North, 2003) + SbE (Adzic, 2011) | [`02-process/bdd-workflow.md`](./02-process/bdd-workflow.md) |
| 5 | Development cycle | Scrum Guide (Schwaber & Sutherland, 2020) | [`02-process/dev-cycle.md`](./02-process/dev-cycle.md) |
| 6 | Definition of Done / Ready | Scrum Guide §DoD + Scrum.org DoR guidance | [`02-process/dod-dor.md`](./02-process/dod-dor.md) |
| 7 | Test-driven micro-cycle | TDD (Beck, 2002) | [`02-process/tdd-workflow.md`](./02-process/tdd-workflow.md) |

What is **not** prescribed (passes 0–2 axes, deferred to downstream):

- **Sprint cadence value** (1-week / 2-week / monthly) — domain-specific.
- **Ticket system** (GitHub Issues / Jira / Linear / Azure DevOps Boards) — vendor lock-in concern.
- **CI / CD pipeline implementation** (GitHub Actions vs Azure Pipelines vs Jenkins) — fails domain-neutrality for self-hosted / regulated environments.
- **Specific code-review rules** (required reviewer count, blocking checks) — team-size-dependent.

Add those as Layer A `02-process/` documents in your downstream project, citing this section.

### 9.1 Branch strategy — Git Flow by default

Branching is the one operational concern this kit *does* prescribe a default for, because every project needs it on day one and the cost of changing it later is high.

The default is **Git Flow** (Vincent Driessen, 2010). Rationale, model, and override path are documented in [`02-process/version-control.md`](./02-process/version-control.md). The auto-loaded rule file [`.claude/rules/version-control.md`](../.claude/rules/version-control.md) carries the operational checklist that AI agents follow. Override the default by replacing both files with your project-specific model.

### 9.2 AI-augmented PR authoring — empirically grounded default

Pull-request descriptions for AI-assisted changes follow [`02-process/ai-augmented-pr.md`](./02-process/ai-augmented-pr.md), and the companion template is `.github/PULL_REQUEST_TEMPLATE.md`. The convention selects a small set of fields (3-5 risk self-disclosures, span-level categorical confidence, one cognitive forcing question, a verification budget, an AI-involvement disclosure) on peer-reviewed evidence that these *specific* interventions reduce the appropriate-reliance gap, while longer free-form explanations and numeric confidence scores empirically do not. The design guide carries the citations.

The kit prescribes this default because the industry's existing PR-template canon (Google eng-practices, Conventional Commits) does not yet cover AI-generated code, and ad-hoc per-team conventions tend to drift toward "more text" — which Tao Xiao et al. (FSE 2024) found correlates with longer merge latency without a defect-detection gain. Override by replacing the design-guide file and the template; do not selectively delete fields, since the set is balanced as a whole.

### 9.3 Code tours — CodeTour-compatible reading paths

Guided reading paths through the codebase use Microsoft's CodeTour `.tour` JSON schema, anchored under `.tours/`. Convention is documented in [`02-process/code-tours.md`](./02-process/code-tours.md). Tours sit *outside* Diátaxis (which is for end users), in line with Daniele Procida's explicit position that contributor-onboarding artefacts are not part of Diátaxis (<https://diataxis.fr/start-here/>). Override is rare; if your project uses a different walkthrough format, replace the design-guide file and migrate any existing tours.

### 9.4 BDD Acceptance Criteria — Given/When/Then by default

Functional Requirements and Use Cases use the **Given/When/Then grammar** (Dan North 2003 / Adzic 2011) for Acceptance Criteria. The format is already required by [`01-artefacts/templates/2_prd.md`](./01-artefacts/templates/2_prd.md) and [`01-artefacts/templates/4_use-case.md`](./01-artefacts/templates/4_use-case.md); this binding ([`02-process/bdd-workflow.md`](./02-process/bdd-workflow.md)) names the canon. Tool selection (Cucumber / pytest-bdd / plain prose) is downstream's call. Override by adopting an alternative AC grammar (AAA, scenario tables) and replacing both templates' AC sections.

### 9.5 Development cycle — Scrum Guide 2020 by default

The kit binds [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html) as the default cadence. The binding ([`02-process/dev-cycle.md`](./02-process/dev-cycle.md)) does not prescribe a specific Sprint length, ticket system, or framework variant (SAFe / LeSS / Nexus). Common alternatives (Kanban, XP, Trunk-Based-cadence) have documented override paths. Layer B directories `01-artefacts/task-list/`, `01-artefacts/impl-plans/`, `01-artefacts/postmortems/`, plus templates 9 (`sprint-retro`), 10 (`refinement-pbi`) are the artefact homes for Scrum events.

### 9.6 Definition of Done / Ready — Scrum Guide + Scrum.org by default

The kit binds Scrum Guide 2020's DoD and Scrum.org's DoR guidance ([`02-process/dod-dor.md`](./02-process/dod-dor.md)), and [`01-artefacts/templates/11_dod-checklist.md`](./01-artefacts/templates/11_dod-checklist.md) provides per-artefact-type checklists. DoR is embedded in template 10 (`refinement-pbi`). The DoD is a living document: tighten over time via retrospective output, log changes in §"Tightening log" of `dod-checklist.md`.

### 9.7 Test-driven micro-cycle — TDD (Beck 2002) recommended

Pentaglyph recommends (does not strictly mandate) the Red-Green-Refactor cycle ([`02-process/tdd-workflow.md`](./02-process/tdd-workflow.md), Beck 2002) as the per-commit micro-cadence. The binding composes with [`02-process/bdd-workflow.md`](./02-process/bdd-workflow.md): BDD owns the outer-loop AC grammar; TDD owns the inner-loop discipline. Adopters running test-after / spike-style prototyping document the exemption per the override path in the binding.

### 9.8 Extending Layer ② — adding new process canons

When pentaglyph (or a downstream project) needs to bind a new process canon — DORA, SRE, Lean Startup, OKR, Continuous Discovery, … — follow [`02-process/_binding-a-new-process.md`](./02-process/_binding-a-new-process.md). It defines the 6-section template every new binding must follow, enforces [ADR-0002](./01-artefacts/arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md) (no canon paraphrasing), and is the substrate for the forthcoming `bunx pentaglyph add-process` CLI sub-command. Candidates under evaluation are tracked in [`02-process/_future-bindings.md`](./02-process/_future-bindings.md).

---

## 10. Layer ③ Automation

Layer ③ Automation comprises the kit's executable components: the **Bun CLI** ([`cli/`](./cli/)), the **Claude Code rules / agents / skills** ([`.claude/`](.claude/)), and the **`scripts/docs/`** Python tooling (forthcoming). Together they reduce the manual cost of operating Layer ① Artefacts and executing Layer ② Process bindings.

The authoritative contract for this layer is [ADR-0007](./01-artefacts/arc42/09-decisions/0007-automation-layer-contract.md). Summary:

| Sub-component | Primary role | What it reads | What it writes |
| --- | --- | --- | --- |
| `cli/` (Bun CLI: `pentaglyph init` / `add` / `add-process` / `metrics`) | Scaffold new `docs/` trees + extend existing ones + (forthcoming) measure | ⓪ canon list, ① templates, ② binding meta-doc | ① artefacts (always); ② only for `add-process` (explicit exception per ADR-0007 §3) |
| `.claude/` (rules, agents, skills) | Embed kit rules into Claude Code; provide doc-authoring sub-agents (`adr-writer`, `doc-orchestrator`, etc.) | ① + ② | ① only — agents may **author new ADRs / specs / use cases** using existing templates but must not redefine the templates themselves |
| `scripts/docs/` (forthcoming) | Lint, coverage, sync, layer-citation enforcement | All layers (read) | None to artefact layers — outputs go to `05-measurement/` (Layer ⑤) or CI logs |

**DON'T (per [ADR-0004](./01-artefacts/arc42/09-decisions/0004-layer-separation-contracts.md))**: Layer ③ components must not invent new bindings, new template formats, or new governance rules. Adding a new agent / skill / script that materially changes Layer ① / ② contracts requires a new ADR.

**Override path**: downstream projects may disable / replace specific automations by:

1. Editing `package.json` to exclude the CLI install for a project that uses Bazel / Make / shell scripts instead.
2. Overriding `.claude/rules/<name>.md` by writing a same-named file in the downstream `.claude/rules/` (more specific path wins for Claude Code).
3. Authoring `<downstream>/docs/02-process/automation-override.md` with rationale per [ADR-0001](./01-artefacts/arc42/09-decisions/0001-adopt-five-layer-self-architecture.md) §5.

---

## 11. Layer ④ Governance

Layer ④ Governance lives in [`04-governance/`](./04-governance/) and defines **who decides, accepts, and overrides** — not **what** is decided (decisions are individual ADRs). The authoritative contract is [ADR-0008](./01-artefacts/arc42/09-decisions/0008-governance-layer-contract.md).

The directory contains exactly five files (each `layer: 4` in front-matter):

| File | Purpose |
| --- | --- |
| [`04-governance/README.md`](./04-governance/README.md) | Layer role + navigation + DO/DON'T contract |
| [`04-governance/raci.md`](./04-governance/raci.md) | Per-artefact-type Responsible / Accountable / Consulted / Informed matrix |
| [`04-governance/adr-accept-protocol.md`](./04-governance/adr-accept-protocol.md) | MADR `Proposed → Accepted` transition conditions (structural + substantive checklists) |
| [`04-governance/override-justification.md`](./04-governance/override-justification.md) | 8-section format and authorisation policy for downstream overrides of kit defaults |
| [`04-governance/contributing.md`](./04-governance/contributing.md) | Upstream contribution flow (PR procedure, subtree push, regulatory carve-outs) |

Plus append-only dated decision files for governance changes themselves:

```
04-governance/<topic>-decision-YYYY-MM-DD.md   ← uses 01-artefacts/templates/12_governance-decision.md
```

**DON'T (per [ADR-0004](./01-artefacts/arc42/09-decisions/0004-layer-separation-contracts.md) + [ADR-0008](./01-artefacts/arc42/09-decisions/0008-governance-layer-contract.md))**: Layer ④ must not take individual decisions (those are ADRs in `01-artefacts/arc42/09-decisions/`), must not prescribe specific processes (those are Layer ② bindings in `02-process/`), and must not mutate any Layer ⓪/①/②/③ artefact. Layer ④ audits but does not write into the other layers.

**Override path**: downstream projects override Layer ④ files individually by writing same-named replacements in `<downstream>/docs/04-governance/`. Common overrides target `raci.md` (multi-team / consortium structures) and `adr-accept-protocol.md` (regulated industries with stricter reviewer requirements). Each override must include a rationale per [`04-governance/override-justification.md`](./04-governance/override-justification.md).

---

## 12. Layer ⑤ Measurement (optional)

Layer ⑤ Measurement lives in [`05-measurement/`](./05-measurement/) and quantifies the health of layers ⓪-④. Layer ⑤ is **optional** per [ADR-0001](./01-artefacts/arc42/09-decisions/0001-adopt-five-layer-self-architecture.md) §"Decision Outcome"; the activation contract is [ADR-0009](./01-artefacts/arc42/09-decisions/0009-measurement-layer-activation.md).

The directory contains:

| File | Purpose |
| --- | --- |
| [`05-measurement/README.md`](./05-measurement/README.md) | Layer role + 5 metric categories + activation playbook |
| [`05-measurement/baseline.md`](./05-measurement/baseline.md) | Snapshot of the kit's own (dogfooded) metric values |
| `05-measurement/snapshots/YYYY-MM-DD_*.md` | Periodic dated snapshots (append-only) |

The 5 metric categories (per [ADR-0009](./01-artefacts/arc42/09-decisions/0009-measurement-layer-activation.md) §3.1):

| # | Category | Status | Script |
| --- | --- | --- | --- |
| 1 | Coverage | ✅ implemented | [`scripts/docs/metrics_coverage.py`](../scripts/docs/metrics_coverage.py) |
| 2 | Freshness | ✅ implemented | [`scripts/docs/metrics_freshness.py`](../scripts/docs/metrics_freshness.py) |
| 3 | ADR throughput | ✅ implemented | [`scripts/docs/metrics_adr.py`](../scripts/docs/metrics_adr.py) |
| 4 | Doc rot detection | 🔜 future | TBD |
| 5 | Adoption (kit-level only) | 🔜 future | TBD |

The scripts are Python 3.10+ stdlib-only and follow the [ADR-0007](./01-artefacts/arc42/09-decisions/0007-automation-layer-contract.md) layer-writes contract (read layers ⓪-④, write only to stdout). The Bun CLI wraps them via `bunx pentaglyph metrics --target=docs --metric=all|coverage|freshness|adr --format=markdown|json`.

**Activate Layer ⑤** when project has > 50 durable docs, ≥ 3 active engineers, regulatory audit requirement, or visible doc rot. **Skip** for solo / early-prototype / manual-audit-preferring teams. The decision is reversible at any time without disturbing layers ⓪-④.

**Override path**: downstream projects may add categories 4 / 5 (or category 6+) by writing new `scripts/docs/metrics_*.py` and updating the [ADR-0009](./01-artefacts/arc42/09-decisions/0009-measurement-layer-activation.md) §3.1 enumeration via a follow-up ADR. Alternatively, replace the scripts entirely with project-specific tooling per [ADR-0001](./01-artefacts/arc42/09-decisions/0001-adopt-five-layer-self-architecture.md) §5 "Override paths".
