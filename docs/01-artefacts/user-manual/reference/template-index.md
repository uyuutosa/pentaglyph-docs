---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-17
diataxis: reference
audience: anyone selecting a template
---

# Template inventory

> **What this is:** the authoritative current-state list of templates shipped by pentaglyph. Numbering is contiguous; there is no collision.

For *how to choose* among them, see [how-to/choose-the-right-template.md](../how-to/choose-the-right-template.md). For *when to write what*, see [`../../../../template/docs/WORKFLOW.md`](../../../../template/docs/WORKFLOW.md).

---

## Four template families

Templates split into four families by purpose. Numbers are stable identifiers, not a ranking.

### Core (0–5) — the architecture spine

Every pentaglyph project uses these. They map 1:1 to the questions in [`STRATEGY.md §2`](../../../../template/docs/STRATEGY.md#2-adopted-standards).

| # | Template | Question it answers | Lives under |
| --- | --- | --- | --- |
| 0 | [`0_default.md`](../../../../template/docs/01-artefacts/templates/0_default.md) | Fallback when nothing else fits | Wherever sensible |
| 1 | [`1_architecture-overview.md`](../../../../template/docs/01-artefacts/templates/1_architecture-overview.md) | How does the whole system work? | `arc42/01`, `arc42/05`, `arc42/08` |
| 2 | [`2_prd.md`](../../../../template/docs/01-artefacts/templates/2_prd.md) | What/why are we building this? | `arc42/03-context-and-scope/prds/` |
| 3 | [`3_module-detailed-design.md`](../../../../template/docs/01-artefacts/templates/3_module-detailed-design.md) | How is *this module* implemented? | `detailed-design/` |
| 4 | [`4_use-case.md`](../../../../template/docs/01-artefacts/templates/4_use-case.md) | What does Actor X do in scenario Y? | `arc42/03-context-and-scope/use-cases/` |
| 5 | [`5_adr.md`](../../../../template/docs/01-artefacts/templates/5_adr.md) | Why this decision over alternatives? (MADR v3.0) | `arc42/09-decisions/` |

### UX research (6–8) — service / user design

Optional. Used when you have actual product / design work to document. See [TiSDD](https://www.thisisservicedesigndoing.com/methods) for the underlying method bank.

| # | Template | Question it answers | Lives under |
| --- | --- | --- | --- |
| 6 | [`6_persona.md`](../../../../template/docs/01-artefacts/templates/6_persona.md) | Who is this for, what do they want? | `service-design/personas/` |
| 7 | [`7_journey-map.md`](../../../../template/docs/01-artefacts/templates/7_journey-map.md) | How does the persona experience the scenario stage by stage? | `service-design/journeys/` |
| 8 | [`8_service-blueprint.md`](../../../../template/docs/01-artefacts/templates/8_service-blueprint.md) | Frontstage vs backstage of the service | `service-design/blueprints/` |

### Process (9–12) — sprint, refinement, DoD, governance

Optional. Used when your team needs structured artefacts for scrum-style cadence or heavier-weight governance.

| # | Template | Purpose | Lives under |
| --- | --- | --- | --- |
| 9 | [`9_sprint-retro.md`](../../../../template/docs/01-artefacts/templates/9_sprint-retro.md) | Sprint retrospective output | `task-list/` (Layer B) |
| 10 | [`10_refinement-pbi.md`](../../../../template/docs/01-artefacts/templates/10_refinement-pbi.md) | Product-backlog-item refinement | `task-list/` (Layer B) |
| 11 | [`11_dod-checklist.md`](../../../../template/docs/01-artefacts/templates/11_dod-checklist.md) | Definition of Done checklist | `design-guide/dod-checklist.md` |
| 12 | [`12_governance-decision.md`](../../../../template/docs/01-artefacts/templates/12_governance-decision.md) | Governance-board decision record (heavier-weight than an ADR) | `governance/` |

### Onboarding (13) — developer narrative

| # | Template | Purpose | Lives under |
| --- | --- | --- | --- |
| 13 | [`13_architecture-guidebook.md`](../../../../template/docs/01-artefacts/templates/13_architecture-guidebook.md) | Long-form Diátaxis-explanation onboarding read-through for new engineers | `user-manual/explanation/architecture-guidebook/` |

---

## File inventory at a glance

```text
template/docs/templates/
  0_default.md
  1_architecture-overview.md
  2_prd.md
  3_module-detailed-design.md
  4_use-case.md
  5_adr.md
  6_persona.md
  7_journey-map.md
  8_service-blueprint.md
  9_sprint-retro.md
  10_refinement-pbi.md
  11_dod-checklist.md
  12_governance-decision.md
  13_architecture-guidebook.md
  README.md
```

- **14 templates** (0–13).
- 1 README index file.
- 15 files total under `template/docs/templates/`.

---

## History

Prior to 2026-05-17, `9_architecture-guidebook.md` and `9_sprint-retro.md` collided on the `9_` numeric prefix. The architecture guidebook was renumbered to `13_` to make the namespace contiguous; sprint-retro retained `9_` because `WORKFLOW.md §2` already cited Template 9 as the sprint retrospective. The `templates/README.md` "Ten templates" count was bumped to fourteen at the same time.

---

## Per-template links

For deep-dives on individual templates, see:

- [`../../../../template/docs/01-artefacts/templates/README.md`](../../../../template/docs/01-artefacts/templates/README.md) — the *template/* side index (canonical mandatory/optional section matrix)
- [how-to/choose-the-right-template.md](../how-to/choose-the-right-template.md) — human-facing picker
- [`../../../../template/docs/WORKFLOW.md §1`](../../../../template/docs/WORKFLOW.md#1-which-template-do-i-use) — the AI-facing decision tree

---

## Related

- [reference/profiles.md](./profiles.md) — which sections each profile installs
- [`../../../../template/docs/01-artefacts/templates/README.md`](../../../../template/docs/01-artefacts/templates/README.md) — template-side authoring rules and section matrix
