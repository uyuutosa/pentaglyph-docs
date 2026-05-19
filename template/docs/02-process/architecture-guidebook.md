---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
---

# Architecture Guidebook — authoring convention

> **What this file is.** The convention this kit ships for authoring an *Architecture Guidebook* — a textbook-style, narratively-organised read-through of a system. It is the **long-form companion** to the Diátaxis explanation quadrant and the **narrative layer** above arc42 / C4 / ADR / detailed-design.
>
> **What this file is not.** A spec for one module ([`../01-artefacts/detailed-design/`](../01-artefacts/detailed-design/)). A decision record ([`../01-artefacts/arc42/09-decisions/`](../01-artefacts/arc42/09-decisions/)). A user manual ([`../01-artefacts/user-manual/`](../01-artefacts/user-manual/)) — the guidebook lives *inside* `01-artefacts/user-manual/explanation/architecture-guidebook/`, but it follows a separate authoring discipline because its scope is system-wide and its audience is developers, not end users.

---

## 1. Why a separate convention

Architecture knowledge in this kit lives across five places by design:

| Asset | Question it answers | Length |
|---|---|---|
| `01-artefacts/arc42/` §1–§12 | What is the system? What constrains it? | Reference-style |
| `01-artefacts/diagrams/c4/` | What does it look like at each zoom level? | Diagrams |
| `01-artefacts/arc42/09-decisions/` (ADR) | Why was each choice made? | Per-decision |
| `01-artefacts/detailed-design/` | How is each module implemented? | Per-module |
| **Architecture Guidebook** | **How do all of the above fit together as a story?** | **Long-form narrative** |

The first four answer their own questions perfectly when consulted by an expert who already knows where to look. They do not answer "I just joined the team — where do I start, and in what order should I read?" The guidebook's job is to be that **single readable path** through everything else.

Without a guidebook, every newcomer reverse-engineers a reading path from scratch. With one, they walk a curated trail and arrive at the same mental model the rest of the team carries.

---

## 2. When to write a guidebook

Author one when at least two of the following are true:

- A newly-joined developer is expected to ramp up in **one week or less**, but the existing docs require **multiple days** of self-directed reading just to know which files are entry points.
- The system has **15+ ADRs** that no longer make sense individually because the story across them is what matters.
- A major refactor or architectural rewrite has landed within the last 90 days and the team has no canonical "current state" document.
- The lead architect (or another person who carries the system's *why* in their head) is rotating out or going on long leave.

Do **not** author one for:

- Small projects (< 5 modules, < 5 ADRs). The existing assets already serve as their own guidebook.
- Documentation gardening exercises with no specific reader in mind. Guidebooks are written **for** someone, and **by** someone close to the code. A speculative guidebook rots quickly.

---

## 3. Where the guidebook lives

Always under:

```
docs/01-artefacts/user-manual/explanation/architecture-guidebook/
  ├── README.md                # Entry point + reading paths
  ├── 00-overview.md           # System-level overview (C4 L1)
  ├── 01-<domain>.md           # Per-domain chapter (Frontend / Backend / ...)
  ├── ...
  ├── 0N-code-tours.md         # Implementation walkthroughs
  └── glossary.md              # Project-specific terms only
```

Rationale: the guidebook is **discursive, theoretical, deepening** — exactly the Diátaxis [explanation quadrant](https://diataxis.fr/explanation/) definition — but its scale exceeds what a single `explanation/*.md` file should carry. Placing it under `explanation/architecture-guidebook/` keeps it inside the Diátaxis taxonomy while letting it grow into a multi-chapter form. This is **not a fifth Diátaxis quadrant**; it is a *sub-collection* within the explanation quadrant.

If you also publish IDE-integrated tours, place the JSON form under:

```
.tours/                         # CodeTour JSON files (one of three search locations the
                                # CodeTour extension scans — see code-tours.md §3)
```

---

## 4. Authoring rules

1. **One chapter, one focus.** Mixing frontend and backend in one chapter dilutes the narrative voice and destroys the reading path. Split.
2. **Show, then map.** Every chapter has a narrative half (`Why`, `What`) and a structural half (`Where the code lives` table). One without the other fails the guidebook's purpose.
3. **Link, do not duplicate.** When a concept is already documented in `01-artefacts/arc42/`, `01-artefacts/detailed-design/`, or an ADR, link to it — do not re-explain. Re-explanation creates a second canonical location that decays.
4. **Repo-root-relative links only.** Use `docs/<path>` or `frontend/<path>` form so links survive directory reorganisation.
5. **Reading-path discipline.** The README defines two or three reading paths (e.g. "new to the project", "frontend-only", "infra-only"). Each path is a directed sequence of chapter IDs. Readers must not have to invent their own path.
6. **The Code Map is non-optional.** A chapter without a per-concept implementation-file table is half a chapter. matklad's bird's-eye-view discipline is the test: a reader should be able to answer "where does X live?" by scanning the chapter, without opening the IDE.
7. **No diagrams duplicated from `01-artefacts/diagrams/c4/`.** Either embed (Mermaid, inlined) **with** the explicit note that `workspace.dsl` is authoritative, or simply link to the SVG render in `docs/01-artefacts/diagrams/c4/exports/`. Never paste a hand-drawn diagram that diverges from the DSL.
8. **Front-matter mandatory.** `status` / `owner` / `last-reviewed` on every chapter file. Guidebooks decay fast — staleness must be visible.

---

## 5. Lifecycle

Guidebook chapters move through the standard durable-doc lifecycle:

```
Draft → Stable → Deprecated → Archived
```

A chapter is **Stable** when (a) the team consensus is that it correctly reflects the system, and (b) every Code Map link in it has been verified to still resolve to the cited file and line range.

When a major refactor invalidates a chapter, mark it `Deprecated` with a pointer to the new chapter or to the ADR that drove the change. Do **not** edit a stable chapter in place to reflect a major architectural shift — write the new version as a new file and supersede.

`last-reviewed` should be touched every quarter even for unchanged chapters, after a re-read confirms the Code Map still resolves. Skipping this for two quarters is a signal to consider the chapter stale.

---

## 6. Relationship to Code Tours

`02-process/code-tours.md` covers **scenario-specific, execution-order** walkthroughs of a single change or feature. The Architecture Guidebook covers **the whole system**.

The two are complementary:

- Guidebook chapter 7 (`code-tours.md` per template) can either **embed** short tours inline as ordered tables, or **link out** to standalone CodeTour `.tour` JSON files.
- A standalone CodeTour written for a specific PR or scenario should always declare which guidebook chapter it elaborates on — readers move from tour back to chapter for context.

---

## 7. Authoring workflow

1. Decide the chapter list before writing prose. The README and chapter list are the architectural decision of the guidebook itself; everything else is filling in.
2. Draft each chapter using [`01-artefacts/templates/13_architecture-guidebook.md`](../01-artefacts/templates/13_architecture-guidebook.md). Each file = one chapter.
3. **Write `Where the code lives` first.** The Code Map tells you whether your chapter has a coherent scope. If you cannot fill the table cleanly, the chapter boundary is wrong; restructure before writing prose.
4. Write the narrative (Why / What) after the Code Map is stable.
5. Add the Pitfalls section last. It is often the most-read part on a second visit and should be sharpened by reviewing real postmortems.
6. Link Code Tours (chapter 7 in the template) once at least three runtime scenarios are documented.

---

## 8. Anti-patterns

- ❌ **The "architecture overview" that is just C4 diagrams with captions.** That is `01-artefacts/arc42/05-building-blocks/` already. The guidebook adds narrative voice and the *Why*.
- ❌ **The Wikipedia-style guidebook.** Encyclopedic completeness with no reading path. Readers cannot tell where to start, and the guidebook fails as an onboarding tool.
- ❌ **The frozen guidebook.** A guidebook authored once at v1.0 and never touched. Decays into a misinformation source within two refactors.
- ❌ **The duplicated guidebook.** Two guidebooks because "frontend team" and "backend team" each wrote their own. One authoritative guidebook with per-domain chapters; no parallel forks.
- ❌ **The "fifth quadrant" guidebook.** Placing it outside `01-artefacts/user-manual/explanation/` because "it's not really explanation". It is. The size is what differs, not the kind.

---

## 9. Reference

- [Simon Brown — Software Architecture for Developers](https://leanpub.com/b/software-architecture) — Architecture Guidebook concept
- [matklad — How to write ARCHITECTURE.md](https://matklad.github.io/2021/02/06/ARCHITECTURE.md.html) — Code Map discipline
- [Microsoft CodeTour](https://github.com/microsoft/codetour) — Implementation walkthrough standard
- [Diátaxis — explanation quadrant](https://diataxis.fr/explanation/) — Where the guidebook lives
- [arc42](https://arc42.org/overview/) — Source of system description
- [C4 model](https://c4model.com/) — Source of diagrams
- [`../01-artefacts/templates/13_architecture-guidebook.md`](../01-artefacts/templates/13_architecture-guidebook.md) — The chapter template
- [`./code-tours.md`](./code-tours.md) — Companion convention for runtime walkthroughs
