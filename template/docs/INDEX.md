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
| Architecture description              | **arc42**                 | <https://arc42.org/overview/>                      | [`01-artefacts/arc42/`](./01-artefacts/arc42/)                             |
| Architecture diagrams                 | **C4 model**              | <https://c4model.com>                              | [`01-artefacts/diagrams/c4/`](./01-artefacts/diagrams/c4/)                 |
| Decision records                      | **MADR v3.0**             | <https://adr.github.io/madr/>                      | [`01-artefacts/arc42/09-decisions/`](./01-artefacts/arc42/09-decisions/)   |
| User docs taxonomy                    | **Diátaxis**              | <https://diataxis.fr>                              | [`01-artefacts/user-manual/`](./01-artefacts/user-manual/)                 |
| Service design                        | **TiSDD**                 | <https://www.thisisservicedesigndoing.com/methods> | [`01-artefacts/service-design/`](./01-artefacts/service-design/)           |
| Client engagement (6th slot — binder) | **PEL** composition of 8  | see [`STRATEGY.md` §2.6](./STRATEGY.md)            | [`client-engagement/`](./client-engagement/)     |

## Layer A — durable design (slow change, code-coupled)

- [`01-artefacts/arc42/`](./01-artefacts/arc42/) — arc42 §1–§12 architecture description
- [`01-artefacts/diagrams/c4/`](./01-artefacts/diagrams/c4/) — C4 model diagrams (Structurizr DSL is the source of truth)
- [`01-artefacts/detailed-design/`](./01-artefacts/detailed-design/) — per-module implementation specs (HOW)
- [`02-process/`](./02-process/) — operational conventions (style, naming, team agreements)
- [`01-artefacts/api-contract/`](./01-artefacts/api-contract/) — OpenAPI / GraphQL / MCP / RPC contracts
- [`01-artefacts/user-manual/`](./01-artefacts/user-manual/) — end-user docs (Diátaxis quadrants)
- [`01-artefacts/service-design/`](./01-artefacts/service-design/) — TiSDD per-service designs (personas, journeys, blueprints)
- [`04-governance/`](./04-governance/) — RACI, ADR Accept protocol, override justification (concern ④)
- [`client-engagement/`](./client-engagement/) — Project Engagement Layer (PEL) durable artefacts (`CHARTER.md`, `OPERATING-AGREEMENT.md`, `NOW-NEXT-LATER.md`, `raid.md`, `decisions/`)

## Layer B — volatile working material (dated, append-only)

- [`01-artefacts/impl-plans/`](./01-artefacts/impl-plans/) — dated implementation plans
- [`01-artefacts/task-list/`](./01-artefacts/task-list/) — sprint-scoped task breakdowns
- [`01-artefacts/postmortems/`](./01-artefacts/postmortems/) — bug / incident retrospectives
- [`01-artefacts/reports/`](./01-artefacts/reports/) — one-shot research / evaluation reports
- [`01-artefacts/cost-estimates/`](./01-artefacts/cost-estimates/) — cost projections (latest-wins)
- [`client-engagement/01-artefacts/reports/`](./client-engagement/01-artefacts/reports/) — PEL weekly + Heartbeat reports per cycle
- [`client-engagement/daci/`](./client-engagement/daci/) — in-flight decisions (archive to `client-engagement/decisions/` as MADR on approval)
- [`client-engagement/kickoffs/`](./client-engagement/kickoffs/) — cycle kickoff narratives
- [`client-engagement/prfaqs/`](./client-engagement/prfaqs/) — Amazon working-backwards memos for new initiatives
- [`client-engagement/questions/`](./client-engagement/questions/) — verbose-form open question files (one per Q-NNN)

## Templates

See [`01-artefacts/templates/README.md`](./01-artefacts/templates/README.md) for the index and selection flow.

- [`01-artefacts/templates/0_default.md`](./01-artefacts/templates/0_default.md) — fallback when none of 1–18 fit
- [`01-artefacts/templates/1_architecture-overview.md`](./01-artefacts/templates/1_architecture-overview.md) — arc42 §1+§3+§4+§5+§8 + C4 L1/L2 system overview
- [`01-artefacts/templates/2_prd.md`](./01-artefacts/templates/2_prd.md) — PRD with `FR-<CAT>-NNN` / `NFR-<CAT>-NNN` IDs
- [`01-artefacts/templates/3_module-detailed-design.md`](./01-artefacts/templates/3_module-detailed-design.md) — Google Design Doc + Pragmatic Engineer module spec
- [`01-artefacts/templates/4_use-case.md`](./01-artefacts/templates/4_use-case.md) — Cockburn casual + user story + Given/When/Then
- [`01-artefacts/templates/5_adr.md`](./01-artefacts/templates/5_adr.md) — MADR v3.0 ADR with Y-statement
- [`01-artefacts/templates/6_persona.md`](./01-artefacts/templates/6_persona.md) — Cooper goal-directed persona (UX research, optional)
- [`01-artefacts/templates/7_journey-map.md`](./01-artefacts/templates/7_journey-map.md) — Kalbach customer journey map (UX research, optional)
- [`01-artefacts/templates/8_service-blueprint.md`](./01-artefacts/templates/8_service-blueprint.md) — Bitner service blueprint (UX research, optional, cross-functional services)
- [`01-artefacts/templates/9_sprint-retro.md`](./01-artefacts/templates/9_sprint-retro.md) — Sprint retrospective (process layer)
- [`01-artefacts/templates/10_refinement-pbi.md`](./01-artefacts/templates/10_refinement-pbi.md) — Refinement / PBI (process layer)
- [`01-artefacts/templates/11_dod-checklist.md`](./01-artefacts/templates/11_dod-checklist.md) — Definition of Done checklist (process layer)
- [`01-artefacts/templates/12_governance-decision.md`](./01-artefacts/templates/12_governance-decision.md) — Governance decision (concern ④)
- [`01-artefacts/templates/13_architecture-guidebook.md`](./01-artefacts/templates/13_architecture-guidebook.md) — Architecture Guidebook (durable narrative)
- [`01-artefacts/templates/14_inception-deck.md`](./01-artefacts/templates/14_inception-deck.md) — Agile Inception Deck for `client-engagement/CHARTER.md` (PEL)
- [`01-artefacts/templates/15_weekly-update.md`](./01-artefacts/templates/15_weekly-update.md) — Atlassian 4-block weekly status (PEL)
- [`01-artefacts/templates/16_heartbeat.md`](./01-artefacts/templates/16_heartbeat.md) — Basecamp Heartbeat + Amazon 6-pager prose discipline (PEL)
- [`01-artefacts/templates/17_daci-decision.md`](./01-artefacts/templates/17_daci-decision.md) — DACI workflow that archives to MADR (PEL)
- [`01-artefacts/templates/18_raid-entry.md`](./01-artefacts/templates/18_raid-entry.md) — RAID log row format (PEL)
