---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
---

# docs/ — Index

Entry point for all project documentation.

- **For "where do I put this doc?"** → [`WORKFLOW.md`](./WORKFLOW.md)
- **For "why is the layout this way?"** → [`STRATEGY.md`](./STRATEGY.md)
- **If you are an AI agent** → [`AI_INSTRUCTIONS.md`](./AI_INSTRUCTIONS.md)

## Standards adopted

| Concern                               | Standard                  | Authoritative source                               | Local home                                       |
| ------------------------------------- | ------------------------- | -------------------------------------------------- | ------------------------------------------------ |
| Architecture description              | **arc42**                 | <https://arc42.org/overview/>                      | [`arc42/`](./arc42/)                             |
| Architecture diagrams                 | **C4 model**              | <https://c4model.com>                              | [`diagrams/c4/`](./diagrams/c4/)                 |
| Decision records                      | **MADR v3.0**             | <https://adr.github.io/madr/>                      | [`arc42/09-decisions/`](./arc42/09-decisions/)   |
| User docs taxonomy                    | **Diátaxis**              | <https://diataxis.fr>                              | [`user-manual/`](./user-manual/)                 |
| Service design                        | **TiSDD**                 | <https://www.thisisservicedesigndoing.com/methods> | [`service-design/`](./service-design/)           |
| Client engagement (6th slot — binder) | **PEL** composition of 8  | see [`STRATEGY.md` §2.6](./STRATEGY.md)            | [`client-engagement/`](./client-engagement/)     |

## Layer A — durable design (slow change, code-coupled)

- [`arc42/`](./arc42/) — arc42 §1–§12 architecture description
- [`diagrams/c4/`](./diagrams/c4/) — C4 model diagrams (Structurizr DSL is the source of truth)
- [`detailed-design/`](./detailed-design/) — per-module implementation specs (HOW)
- [`design-guide/`](./design-guide/) — operational conventions (style, naming, team agreements)
- [`api-contract/`](./api-contract/) — OpenAPI / GraphQL / MCP / RPC contracts
- [`user-manual/`](./user-manual/) — end-user docs (Diátaxis quadrants)
- [`service-design/`](./service-design/) — TiSDD per-service designs (personas, journeys, blueprints)
- [`governance/`](./governance/) — RACI, ADR Accept protocol, override justification (concern ④)
- [`client-engagement/`](./client-engagement/) — Project Engagement Layer (PEL) durable artefacts (`CHARTER.md`, `OPERATING-AGREEMENT.md`, `NOW-NEXT-LATER.md`, `raid.md`, `decisions/`)

## Layer B — volatile working material (dated, append-only)

- [`impl-plans/`](./impl-plans/) — dated implementation plans
- [`task-list/`](./task-list/) — sprint-scoped task breakdowns
- [`postmortems/`](./postmortems/) — bug / incident retrospectives
- [`reports/`](./reports/) — one-shot research / evaluation reports
- [`cost-estimates/`](./cost-estimates/) — cost projections (latest-wins)
- [`client-engagement/reports/`](./client-engagement/reports/) — PEL weekly + Heartbeat reports per cycle
- [`client-engagement/daci/`](./client-engagement/daci/) — in-flight decisions (archive to `client-engagement/decisions/` as MADR on approval)
- [`client-engagement/kickoffs/`](./client-engagement/kickoffs/) — cycle kickoff narratives
- [`client-engagement/prfaqs/`](./client-engagement/prfaqs/) — Amazon working-backwards memos for new initiatives
- [`client-engagement/questions/`](./client-engagement/questions/) — verbose-form open question files (one per Q-NNN)

## Templates

See [`templates/README.md`](./templates/README.md) for the index and selection flow.

- [`templates/0_default.md`](./templates/0_default.md) — fallback when none of 1–18 fit
- [`templates/1_architecture-overview.md`](./templates/1_architecture-overview.md) — arc42 §1+§3+§4+§5+§8 + C4 L1/L2 system overview
- [`templates/2_prd.md`](./templates/2_prd.md) — PRD with `FR-<CAT>-NNN` / `NFR-<CAT>-NNN` IDs
- [`templates/3_module-detailed-design.md`](./templates/3_module-detailed-design.md) — Google Design Doc + Pragmatic Engineer module spec
- [`templates/4_use-case.md`](./templates/4_use-case.md) — Cockburn casual + user story + Given/When/Then
- [`templates/5_adr.md`](./templates/5_adr.md) — MADR v3.0 ADR with Y-statement
- [`templates/6_persona.md`](./templates/6_persona.md) — Cooper goal-directed persona (UX research, optional)
- [`templates/7_journey-map.md`](./templates/7_journey-map.md) — Kalbach customer journey map (UX research, optional)
- [`templates/8_service-blueprint.md`](./templates/8_service-blueprint.md) — Bitner service blueprint (UX research, optional, cross-functional services)
- [`templates/9_sprint-retro.md`](./templates/9_sprint-retro.md) — Sprint retrospective (process layer)
- [`templates/10_refinement-pbi.md`](./templates/10_refinement-pbi.md) — Refinement / PBI (process layer)
- [`templates/11_dod-checklist.md`](./templates/11_dod-checklist.md) — Definition of Done checklist (process layer)
- [`templates/12_governance-decision.md`](./templates/12_governance-decision.md) — Governance decision (concern ④)
- [`templates/13_architecture-guidebook.md`](./templates/13_architecture-guidebook.md) — Architecture Guidebook (durable narrative)
- [`templates/14_inception-deck.md`](./templates/14_inception-deck.md) — Agile Inception Deck for `client-engagement/CHARTER.md` (PEL)
- [`templates/15_weekly-update.md`](./templates/15_weekly-update.md) — Atlassian 4-block weekly status (PEL)
- [`templates/16_heartbeat.md`](./templates/16_heartbeat.md) — Basecamp Heartbeat + Amazon 6-pager prose discipline (PEL)
- [`templates/17_daci-decision.md`](./templates/17_daci-decision.md) — DACI workflow that archives to MADR (PEL)
- [`templates/18_raid-entry.md`](./templates/18_raid-entry.md) — RAID log row format (PEL)
