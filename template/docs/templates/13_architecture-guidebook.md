---
status: Draft
owner: <placeholder>
last-reviewed: <YYYY-MM-DD>
---

# Architecture Guidebook template

> **Origin & license**: This template ships with [pentaglyph-docs](https://github.com/uyuutosa/pentaglyph-docs) (MIT License) as the standard form for a project's *Architecture Guidebook* — a textbook-style, narratively-organised read-through of the system, designed to take a newcomer from "I have never seen this codebase" to "I know where everything lives and why." It synthesises Simon Brown's *Software Architecture for Developers* (Leanpub, 2014), [matklad's "How to write ARCHITECTURE.md" essay](https://matklad.github.io/2021/02/06/ARCHITECTURE.md.html), and [Microsoft CodeTour](https://github.com/microsoft/codetour) into a single artefact.

> **How to use this template**: `cp docs/templates/9_architecture-guidebook.md docs/user-manual/explanation/architecture-guidebook/<chapter>.md`. Delete this `> ...` guidance block before authoring. Split the guidebook into multiple chapter files (one chapter per file) when total length exceeds ~800 lines.
>
> Recommended location: `docs/user-manual/explanation/architecture-guidebook/` — the long-form variant of the Diátaxis explanation quadrant.
>
> Academic / industry grounding:
> - [Simon Brown — Software Architecture for Developers](https://leanpub.com/b/software-architecture) — the canonical "guidebook" form
> - [matklad — How to write ARCHITECTURE.md](https://matklad.github.io/2021/02/06/ARCHITECTURE.md.html) — the bird's-eye view discipline
> - [Microsoft CodeTour](https://github.com/microsoft/codetour) — implementation-navigation standard
> - [Mark Richards & Neal Ford — Fundamentals of Software Architecture (O'Reilly)](https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/) — modern architecture pedagogy
>
> Length target: **300–800 lines per chapter**. Balance narrative voice with completeness.
>
> **What this template is NOT for**:
> - Per-module implementation specs — use [`3_module-detailed-design.md`](./3_module-detailed-design.md) under `detailed-design/`
> - Decision records (the *Why* of one specific choice) — use [`5_adr.md`](./5_adr.md) (MADR) under `arc42/09-decisions/`
> - Requirements (WHAT / WHY a feature exists) — use [`2_prd.md`](./2_prd.md)
> - End-user task instructions — use the Diátaxis how-to quadrant under `user-manual/how-to/`
>
> An Architecture Guidebook is a **reading-path layer that links existing assets (arc42 / C4 / ADR / detailed-design) with narrative and a code map.** It does not replace any of them.

> **When to write one**:
> - A newcomer says "I want to onboard this codebase in one week" and existing assets are scattered
> - The set of accepted ADRs has grown large enough that a *story* across them is needed
> - A major refactor just landed and you want to publish a "current architecture snapshot" before the next change
> - The lead architect is about to leave or rotate, and the system's *why* lives in their head

---

# Architecture Guidebook: <Project name>

| Metadata          | Value                                                                |
| ----------------- | -------------------------------------------------------------------- |
| Status            | Draft / Stable / Deprecated                                          |
| Owner             | <name or team>                                                       |
| Audience          | <primary persona — e.g. DV-NN Developer>                             |
| Last Updated      | YYYY-MM-DD                                                           |
| Prerequisites     | <required prior knowledge>                                           |
| Reading time      | <e.g. ~2 hours straight through>                                     |
| Related ADRs      | <list of ADRs referenced across this guidebook>                      |

---

## 0. About this guidebook

### 0.1 Purpose

One paragraph stating what problem this guidebook solves and what reader experience it delivers.

Example:
> A newly-joined developer should be able to understand the system's overall structure, key architectural decisions, and where every concept maps to implementation files **within one day**, rather than spending a week piecing it together from 100+ scattered files across `docs/`, `frontend/`, and `backend/`.

### 0.2 Target audience

- **Primary readers** (1–2 personas): <persona ID + description>
- **Secondary readers**: <other readers who may find this useful>
- **Out of scope**: <reader types this guidebook does not serve>

### 0.3 Reading paths

The guidebook is organised across multiple chapters. Suggest entry routes by reader situation:

| Your situation | Recommended path |
|---|---|
| New to the project, want the big picture | 0 → 1 → 2 → … → N (read straight through) |
| Backend-focused | 0 → 1 → 4 → 7 (Code Tours) |
| Frontend-focused | 0 → 1 → 3 → 7 (Code Tours) |
| Infrastructure / DevOps | 0 → 6 |

### 0.4 Relationship to existing assets

| Existing asset | Role | How this guidebook relates |
|---|---|---|
| `docs/arc42/` | Authoritative system description (§1–§12) | **Authoritative source**. This guidebook re-narrates arc42 chapters into a continuous read |
| `docs/diagrams/c4/` | C4 diagrams (Structurizr DSL) | Each chapter links the relevant zoom level |
| `docs/detailed-design/` | Per-module implementation specs | Linked from each chapter's "Go deeper" footer |
| `docs/arc42/09-decisions/` (ADR) | Authoritative decision records | Linked inline when each chapter explains *why* |

> The Architecture Guidebook **does not replace** any of these. It supplies **the narrative layer and reading path** that the other artefacts on their own cannot.

---

## 1. System-level overview (C4 L1 + Context)

### 1.1 The story: what problem does this system solve?

3–5 paragraphs in **plain prose** describing what the system does for the world, what value it produces, who depends on it. Avoid technical jargon; speak in stakeholder terms.

### 1.2 C4 L1 System Context diagram

```mermaid
%% Extract the System Context view from docs/diagrams/c4/workspace.dsl
```

Authoritative source: [`docs/diagrams/c4/workspace.dsl`](../../diagrams/c4/workspace.dsl) (Structurizr DSL).

Show the system boundary, external systems, and actor types in one figure. Annotate each element in 1–2 sentences below the diagram.

### 1.3 Key architectural decisions (ADR map)

Walk the reader through the **top 5–10 ADRs** that constitute the system's identity, as a story:

> We adopted Framework X because of constraint Y ([ADR-NNNN](#)). That decision forced us to also choose technology Z for streaming ([ADR-NNNN](#)). Together, these two choices imply the layering you'll see in chapters 3 and 4…

Summarise each ADR in 3–5 lines and link out.

---

## 2. Core domains (C4 L2 Container)

### 2.1 The story: how responsibilities split across containers

3–5 paragraphs narrating the responsibility split among the main containers (Frontend, Backend, Pipeline, Storage, external AI services, etc.) and how they interact at runtime.

### 2.2 C4 L2 Container diagram

```mermaid
%% Container view excerpt
```

### 2.3 One-line container summary

| Container | Responsibility | Main technologies | Repository path |
|---|---|---|---|
| Frontend | <one sentence> | <e.g. Next.js, React> | `frontend/` |
| Backend | <one sentence> | <e.g. FastAPI, framework X> | `backend/` |
| … | … | … | … |

---

## 3–6. Per-domain chapters (Frontend / Backend / Crosscutting / Infrastructure)

Use one chapter per domain. Each chapter follows the **Chapter Pattern** below.

### Chapter Pattern (mandatory five sections per chapter)

#### N.1 Why this shape (Why) — narrative

3–5 paragraphs in Diátaxis-explanation voice, narrating the chosen technologies, partitioning, design principles, and the tradeoffs against rejected alternatives.

Example (Frontend chapter):
> We adopted Next.js App Router because it lets us draw the server / client component boundary explicitly while permitting incremental adoption of React Server Components. Pages Router was initially considered ([ADR-XXX](#)), but did not compose well with our direct-SSE streaming approach ([ADR-YYY](#))…

#### N.2 Main layers / modules (What) — structural description

Describe the internal structure at **C4 L3 (Component) granularity**: directory layout, primary modules, dependency direction.

#### N.3 Where the code lives (Where) — the Code Map

**The most important section.** Following matklad's bird's-eye-view discipline, map every concept introduced in this chapter to its implementation file(s):

| Concept | Implementation file | Lines | Note |
|---|---|---|---|
| <concept> | [`frontend/src/...`](../../../frontend/src/...) | L42-87 | <one-line comment> |
| … | … | … | … |

All links must be **repo-root-relative** so they survive directory reorganisation.

#### N.4 Going deeper

For readers who want to dive in:

- **ADRs**: [ADR-NNNN](../../arc42/09-decisions/NNNN-*.md), …
- **Detailed designs**: [`docs/detailed-design/<area>/`](../../detailed-design/<area>/), …
- **arc42 sections**: [§5 Building Blocks](../../arc42/05-building-blocks/), [§8 Crosscutting](../../arc42/08-crosscutting/), …

#### N.5 Pitfalls

List 3–5 typical failure modes a developer has historically hit when working in this domain:

- ❌ <Anti-pattern>: why it goes wrong / how to do it correctly
- ❌ <Anti-pattern>: …

Link to relevant postmortems under `docs/postmortems/` when available.

---

## 7. Code Tours (walkthroughs of runtime paths)

Implementation-navigation walkthroughs in the [Microsoft CodeTour](https://github.com/microsoft/codetour) tradition. One tour per significant runtime scenario.

Each tour is a step-ordered table linking to code, or alternatively a CodeTour `.tour` JSON file:

### Tour 1: <main scenario 1>

Walk through what happens, file by file, in **execution order**, when this scenario fires:

| Step | File | Lines | What happens |
|---|---|---|---|
| 1 | [`frontend/src/...`](../../../frontend/src/...) | L10-25 | User clicks a button |
| 2 | [`frontend/src/...`](../../../frontend/src/...) | L40-60 | API request is built |
| 3 | [`backend/src/...`](../../../backend/src/...) | L100 | FastAPI handler receives the request |
| … | … | … | … |

Minimum 3 tours; recommended 5–7.

### CodeTour JSON form

For IDE-integrated tours, also publish a `.tour` JSON under `.tours/`:

```json
{
  "title": "<Tour name>",
  "description": "<one-line summary>",
  "steps": [
    { "file": "frontend/src/...", "line": 10, "description": "..." }
  ]
}
```

Convention: [`design-guide/code-tours.md`](../design-guide/code-tours.md). Authoring discipline for the guidebook itself: [`design-guide/architecture-guidebook.md`](../design-guide/architecture-guidebook.md).

---

## 8. ADR map (a tour through the decision space)

The system's principal ADRs arranged in **adoption order** with **logical dependencies**:

| ADR # | Title | Status | Depends on |
|---|---|---|---|
| 0001 | … | Accepted | — |
| 0002 | … | Accepted | 0001 |
| … | … | … | … |

Full ADR index: [`docs/arc42/09-decisions/README.md`](../../arc42/09-decisions/README.md).

---

## 9. Glossary

Definitions for **project-specific terms only** (do not duplicate general industry terminology):

| Term | Definition | Related |
|---|---|---|
| <term> | <one-line definition> | [<related link>](#) |
| … | … | … |

---

## Revision history

| Version | Date | Summary |
|---------|------|---------|
| 1.0 | YYYY-MM-DD | Initial version |

---

## References

- [Simon Brown — Software Architecture for Developers](https://leanpub.com/b/software-architecture)
- [matklad — How to write ARCHITECTURE.md](https://matklad.github.io/2021/02/06/ARCHITECTURE.md.html)
- [Microsoft CodeTour](https://github.com/microsoft/codetour)
- [Mark Richards & Neal Ford — Fundamentals of Software Architecture](https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/)
- arc42: <https://arc42.org>
- C4 model: <https://c4model.com>
- Diátaxis: <https://diataxis.fr>

---

*This template is part of [pentaglyph-docs](https://github.com/uyuutosa/pentaglyph-docs) (MIT License).*
