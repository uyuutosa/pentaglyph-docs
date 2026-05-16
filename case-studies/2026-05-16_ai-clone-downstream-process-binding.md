---
status: In Progress
owner: AI-clone team (Yu Sato) — case-study contributed upstream
last-reviewed: 2026-05-16
binding-layer: 2
upstream-canon-version: Phases 0-5 complete (AI-clone PR #749)
---

# AI-clone — Layer ② Process binding (Scrum / CI-CD / BDD-TDD)

> **What this is.** A case study of how the AI-clone PoC (a downstream consumer of pentaglyph-docs, embedded at `libs/pentaglyph-docs/` via `git subtree`) plans to bind Layer ② Process to its concrete operating environment after pentaglyph self-architecture Phases 0-5 were merged. **This document doubles as a handover note**: implementation will continue on a separate machine via the AI-clone repo's `/feature` skill, three follow-up User Stories at a time.

| Metadata | Value |
| --- | --- |
| Case study type | Layer ② Process binding (concrete-from-abstract) |
| Downstream project | AI-clone PoC (private ADO repo, Accenture-internal) |
| Upstream canon version | pentaglyph self-architecture Phases 0-5 (merged 2026-05-14 via AI-clone PR #749) |
| Date opened | 2026-05-16 |
| ADO Feature parent | [AB#1606] `[E41] pentaglyph Layer ② downstream binding (Scrum / CI-CD / BDD-TDD for AI-clone)` |
| Status | In Progress — handover doc only; implementation US not yet started |
| Related upstream docs | [`design-guide/dev-cycle.md`](../template/docs/design-guide/dev-cycle.md), [`design-guide/bdd-workflow.md`](../template/docs/design-guide/bdd-workflow.md), [`design-guide/tdd-workflow.md`](../template/docs/design-guide/tdd-workflow.md), [`design-guide/dod-dor.md`](../template/docs/design-guide/dod-dor.md), [`design-guide/_binding-a-new-process.md`](../template/docs/design-guide/_binding-a-new-process.md) |
| Related downstream docs | `docs/impl-plans/2026-05-14_pentaglyph-self-architecture-roadmap.md` (the design that led to this case study) |

---

## 1. TL;DR

After [AI-clone PR #749](https://dev.azure.com/ai-clone/_git/ai-clone/pullrequest/749) merged the pentaglyph self-architecture (5 layers ⓪–⑤ surfaced + ADRs 0001–0009 + Layer ② canon bindings), the AI-clone team noticed a **gap that pentaglyph itself does not — and should not — fill**:

> *"pentaglyph binds canons (Scrum Guide 2020 / North 2003 BDD / Beck 2002 TDD) by linking out. But our team has not yet picked the concrete Sprint cadence, CI/CD ↔ Sprint trigger, or BDD/TDD tool — those are deliberately out of pentaglyph's scope ([self-architecture roadmap §2.2](../template/docs/arc42/05-building-blocks/pentaglyph-self-architecture.md)). Without those concrete bindings, a new joiner cannot 'just adopt the kit' — they will improvise, drift, and lose the upstream benefits."*

This case study documents:

1. **What pentaglyph Layer ② provides** (the upstream side, complete).
2. **What pentaglyph deliberately leaves out-of-scope** (and why — the four-axis test in [STRATEGY §9.1](../template/docs/STRATEGY.md)).
3. **AI-clone's three concrete bindings** (the downstream side, to be implemented in Sprint 9):
   - **Track 1**: Scrum cadence binding → `docs/detailed-design/cross-cutting/development-lifecycle/scrum-cadence.md`
   - **Track 2**: CI/CD ↔ Sprint integration → extend `docs/detailed-design/infra/ci-cd/CICD.md` + new release-flow section
   - **Track 3**: BDD/TDD tool adoption ADR → `docs/arc42/09-decisions/00XX-bdd-tdd-tool-adoption.md`
4. **A `/feature`-ready checklist** so the work can resume on a separate machine without re-reading this conversation.

---

## 2. Background: the discussion that led here

On 2026-05-14 the AI-clone team merged its pentaglyph self-architecture work (PR #749 → AI-clone develop). The roadmap doc [`docs/impl-plans/2026-05-14_pentaglyph-self-architecture-roadmap.md`](https://dev.azure.com/ai-clone/_git/ai-clone?path=/docs/impl-plans/2026-05-14_pentaglyph-self-architecture-roadmap.md) §1.4 had already noted:

> *"pentaglyph は既にプロセスを内蔵している. Phase 2 の作業は『Layer ② を構築する』ではなく、『既に `WORKFLOW.md` / Layer B docs / `.claude/rules/` に隠れていたプロセスを surface し、外部正典 (Scrum Guide 2020 / BDD / SbE / TDD 等) に bind し直す』."*

§2.2 then explicitly fenced what is **not** pentaglyph's job:

| Out of scope for pentaglyph | Why |
| --- | --- |
| BDD tool selection (pytest-bdd / Cucumber / Behave) | tool choice is project-specific, no industry-wide canon |
| Sprint tool selection (Jira / ADO / Linear / GH Projects) | same — Layer ③ Automation concern |
| CI selection (GH Actions / Azure Pipelines / Buildkite) | same |
| **Sprint cadence (1-week / 2-week / 4-week)** | day-1 necessary but team-dependent — fails the four-axis test on switching cost / domain neutrality |
| 9-phase builder workflow | AI-clone-specific domain, no upstream value |

What the team **did not** fully appreciate at merge time: the downstream side of this fence is **also work that has to happen**, and it has not happened yet inside AI-clone's `docs/detailed-design/`. Pieces of it exist as scattered fragments (e.g. `.claude/rules/azure-devops.md` mentions 1-week Sprint cadence, `infra/ci-cd/CICD.md` documents Azure Pipelines triggers), but there is no single document that says *"this is how Scrum runs on this project, and this is how CI/CD plugs into it."*

The 2026-05-16 conversation surfaced this as three concrete deliverables, captured below.

---

## 3. What pentaglyph Layer ② provides (upstream — DONE)

Phase 2 of the self-architecture roadmap delivered these bindings in [`template/docs/design-guide/`](../template/docs/design-guide/) (merged 2026-05-14):

| File | Canon bound | Status |
| --- | --- | --- |
| [`dev-cycle.md`](../template/docs/design-guide/dev-cycle.md) | Scrum Guide 2020 (Schwaber & Sutherland) | Stable |
| [`bdd-workflow.md`](../template/docs/design-guide/bdd-workflow.md) | Dan North 2003 / Adzic 2011 SbE | Stable |
| [`tdd-workflow.md`](../template/docs/design-guide/tdd-workflow.md) | Beck 2002 / Fowler | Stable |
| [`dod-dor.md`](../template/docs/design-guide/dod-dor.md) | Definition templates (Cohn / industry baseline) | Stable |
| [`_binding-a-new-process.md`](../template/docs/design-guide/_binding-a-new-process.md) | Meta-doc: how to bind a new process canon | Stable |
| [`_future-bindings.md`](../template/docs/design-guide/_future-bindings.md) | Candidate canons for future binding (DDD / Event Storming / etc.) | Living |

Each binding doc structure (confirmed in `dev-cycle.md`):

1. **§1 External canon (authoritative)** — link out to scrumguides.org / etc.
2. **§1.5 Surfaces implicit behaviour** — what pentaglyph was already doing without naming the canon.
3. **§2 Four-axis evaluation (STRATEGY §9.1)** — day-1 necessity / switching cost / external canon / domain neutrality.
4. **§3 Artefact mapping** — which `template/docs/` directories receive Scrum events' outputs.
5. **§4 Lifecycle integration** — `Draft → Review → Done` alignment with Sprint boundaries.
6. **§5 Override path** — how a downstream replaces this binding (Kanban / SAFe / XP).
7. **§6 References** — link list.

**Crucially**, every binding doc states the same boundary in different words:

> *§3 (`dev-cycle.md`): "No tool selection. Whether you track Sprint Backlog in Jira / Linear / Azure DevOps Boards / GitHub Projects / paper is a Layer ③ Automation concern."*
>
> *§4 (`dev-cycle.md`): "Sprint cadence is project-specific. This binding does not prescribe 1-week / 2-week / 4-week Sprints — pick what matches team / domain."*

This is the deliberate hole. **The hole is the point** — it lets pentaglyph stay domain-neutral and ten-year-stable. But the hole has to be filled per project.

---

## 4. What pentaglyph deliberately leaves out (and why)

The four-axis test from [`STRATEGY.md §9.1`](../template/docs/STRATEGY.md) decides what pentaglyph binds vs. what it leaves to downstream:

| Axis | Means | If all four ✅ | If any ❌ |
| --- | --- | --- | --- |
| **Day-1 necessity** | Project needs it on day 1, can't postpone | Bind it | Leave to downstream |
| **Switching cost** | Costly to change after the fact | Bind it | Leave to downstream |
| **External canon** | A stable, free, authoritative document exists | Bind to it (link-out) | Don't invent one |
| **Domain neutrality** | Works in regulated / startup / B2B / OSS / AI / embedded | Bind it | Leave to downstream |

Applying this to the AI-clone gap:

| Concrete decision | Day-1? | Switch cost | External canon | Domain-neutral? | Pentaglyph binds? |
| --- | --- | --- | --- | --- | --- |
| Scrum cadence (1-week vs 2-week) | ✅ | ⚠️ medium | ❌ (Scrum Guide is silent) | ❌ (team-dependent) | **NO** — leave to downstream |
| CI tool choice (Azure Pipelines vs GH Actions) | ✅ | 🔴 high | ❌ (no canon) | ❌ (cloud-dependent) | **NO** — Layer ③ Automation concern |
| BDD tool (pytest-bdd vs Cucumber) | ⚠️ (depends on test maturity) | 🟡 low-medium | ❌ (multiple tools) | ❌ (language-dependent) | **NO** — leave to downstream |
| Sprint Review → release-tag ceremony | ✅ | ⚠️ medium | ❌ (custom per team) | ❌ (release-cadence-dependent) | **NO** — leave to downstream |
| BDD / TDD / Scrum **as concepts** | ✅ | 🔴 high | ✅ | ✅ | **YES** — already bound in Phase 2 |

So the three Tracks below all fall on the "leave to downstream" side of the line. **That is the intended architecture**, not a pentaglyph gap. What is missing is the downstream's own decision and documentation.

---

## 5. AI-clone's three concrete bindings (Sprint 9, three Tracks)

Each Track corresponds to one User Story under Feature [AB#1606]. Each is sized for **one `/feature` run** on the AI-clone repo (typically 0.5-1 day of focused work). They are independent — they can be done in any order or in parallel by separate Claude Code sessions on different machines.

### 5.1 Track 1 — Scrum cadence binding (User Story AB#1607)

**Goal**: Author `docs/detailed-design/cross-cutting/development-lifecycle/scrum-cadence.md` as AI-clone's project-specific override of pentaglyph's [`design-guide/dev-cycle.md`](../template/docs/design-guide/dev-cycle.md). This is the authoritative answer to *"How does Scrum run on this project?"*

**Concrete content (must include all of these — do not skip):**

1. **Cadence**: 1-week Sprint (Mon-Fri). Documented across `.claude/rules/azure-devops.md` already; centralize here as the source-of-truth and link from the rule file.
2. **Events** (with timeboxes already standardized in the existing `/sprint-planning`, `/daily`, `/sprint-review`, `/sprint-retro` skills):
   - Sprint Planning: Monday, 2h max
   - Daily Scrum: 15 min, asynchronous via `/daily` skill posting to ADO (no live standup — geographically dispersed team)
   - Sprint Review: Friday, 1h max — runs `/sprint-review` skill, includes DoD gate + Velocity recompute
   - Sprint Retro: Friday after Review, 45 min max — runs `/sprint-retro` skill, outputs improvement actions to ADO User Stories with `[retro]` tag
3. **Roles** (Scrum Guide 2020 mapping):
   - Product Owner: the user (Yu Sato, also acts as funder / domain champion)
   - Scrum Master: **distributed across Claude Code skills** (`/daily` for impediment detection, `/sprint-review` for DoD gate, `/sprint-retro` for facilitation). Document this explicitly — it is non-standard but intentional, and a unique aspect of this project worth surfacing in the case study.
   - Developers: Claude Code agents (`backend-dev`, `frontend-dev`, `devops-engineer`, `qa-engineer`) + the user as code reviewer / final approver.
4. **Artefact mapping** (the pentaglyph upstream `dev-cycle.md` §3 abstract list, instantiated for AI-clone):
   - Product Backlog → ADO Boards (Feature / User Story / Bug Work Items)
   - Sprint Backlog → ADO Boards (current Sprint's WIs + child Tasks)
   - Sprint Goal → ADO Sprint Goal extension (`keesschollaart.sprint-goal`)
   - Increment → ADO WIs in State=Closed at Sprint end
   - Definition of Done → `CLAUDE.md ## Definition of Done` section (already exists)
   - Definition of Ready → `/refinement` skill checklist + `refined` ADO tag
   - Sprint Retrospective output → `docs/reports/Retro_Sprint*.md` + ADO User Stories `[retro]` tag
5. **Version bumping** — Sprint Review triggers `/bump-version` (semver minor +1), tags `main`. Cross-reference [`.claude/rules/azure-devops.md` § "バージョン管理"] which already documents this.
6. **Override declaration** — this file IS the override of pentaglyph upstream `dev-cycle.md`. Add a front-matter field `overrides: libs/pentaglyph-docs/template/docs/design-guide/dev-cycle.md` so static checkers can verify alignment.

**Acceptance criteria:**

- [ ] `docs/detailed-design/cross-cutting/development-lifecycle/scrum-cadence.md` exists, has the standard detailed-design metadata table (Status: ✅ Implemented, Owner: docs-ops), and is reachable from `docs/detailed-design/INDEX-ja.md`.
- [ ] Each of the six sections above is filled with project-specific content (not generic Scrum descriptions — link out to scrumguides.org for the canon).
- [ ] `.claude/rules/azure-devops.md` § "スプリント管理" is shortened to a 3-line summary that links to the new doc as source-of-truth (single canonical location per topic — rule 1 of pentaglyph WORKFLOW.md §6).
- [ ] PR description references this case study and pentaglyph upstream `design-guide/dev-cycle.md` § "Override path".

**Estimated effort**: 0.5 day (~3 SP). Primarily aggregation of existing scattered content + one override declaration + one rule-file shortening.

### 5.2 Track 2 — CI/CD ↔ Sprint integration (User Story AB#1608)

**Goal**: Extend `docs/detailed-design/infra/ci-cd/CICD.md` (and possibly split into a new sibling) with the **Sprint-cadence interplay** that is currently undocumented. This is *not* about adding new CI features — it is about naming the existing release ceremony so newcomers stop reverse-engineering it.

**Concrete content:**

1. **Trigger matrix** — for each Azure Pipelines pipeline (`ai-clone-CI`, `ai-clone-CD-dev`, `ai-clone-CD-stg`, `ai-clone-CD-prod`, `terraform-runner`, `terraform-vm`, `agentic-fabric-CI`, etc.), document:
   - What event fires it (PR-to-develop / merge-to-develop / merge-to-main / tag-push / cron)
   - Which Sprint event the trigger maps to (e.g. CD-prod fires on `vX.Y.Z` tag, which is created by `/bump-version` at Sprint Review)
2. **Sprint-Review release flow** — the canonical sequence:
   1. Friday Sprint Review (1h, `/sprint-review` skill)
   2. DoD gate passes → `/bump-version <new-minor>` executes → 3 version files updated + Git tag pushed
   3. `release/vX.Y.Z` branch optional (currently NOT used; document that we run trunk-based for `main` per [ADR-0004](docs/arc42/09-decisions/0004-terraform-trunk-based-workflow.md))
   4. `main` merge → CD-prod pipeline auto-fires
   5. Post-deploy smoke test → `docs/detailed-design/infra/ci-cd/デプロイ後健全性テスト.md`
3. **Cold-start / drift handling** — recently-fixed bugs (AB#1550 CD cold-start grace, AB#1527 Logic App weekday VM schedule, AB#1542 agentic effort test env leak) suggest a *"week-1 of Sprint"* re-bake fragility window. Document the pattern + Logic App weekday VM schedule integration with Sprint Mon-Fri cadence.
4. **Path-aware CI skip rules** — already exist for docs-only / agentic-fabric-only PRs (AB#1261 / earlier). Document them in one place so Sprint Planning estimation knows what triggers full CI vs fast path.
5. **Failure runbook** — link to the recent CI postmortem ([`docs/postmortems/2026-05-14_ci-agent-cache-corruption-and-scheduler-stuck.md`](https://dev.azure.com/ai-clone/_git/ai-clone?path=/docs/postmortems/2026-05-14_ci-agent-cache-corruption-and-scheduler-stuck.md), already exists) and the 3-agent pool layout (Build Pool 11, agents 12/17/18).

**Acceptance criteria:**

- [ ] `docs/detailed-design/infra/ci-cd/CICD.md` has a new section "Sprint-cadence integration" (or split into a sibling `release-cadence.md` if `CICD.md` exceeds 400 lines after addition).
- [ ] Each of the 5 concrete contents above has a subsection with link-outs to specific pipeline YAML / runbook / ADR.
- [ ] `/bump-version` skill SKILL.md is cross-referenced as the ceremony entry point.
- [ ] `scrum-cadence.md` (from Track 1) is updated to link to this new section as the CI/CD side of the same release flow.

**Estimated effort**: 0.5-1 day (~3-5 SP). Mostly documentation of existing pipelines, but the trigger matrix requires careful audit.

**Dependency**: easier if Track 1 is done first (so `scrum-cadence.md` exists to link from), but not strictly blocking.

### 5.3 Track 3 — BDD / TDD tool adoption ADR (User Story AB#1609)

**Goal**: Decide which BDD and TDD tools (if any) AI-clone adopts in PoC and post-PoC phases, and record the decision as a MADR ADR under `docs/arc42/09-decisions/`. Pentaglyph upstream provides the **workflow** ([`bdd-workflow.md`](../template/docs/design-guide/bdd-workflow.md), [`tdd-workflow.md`](../template/docs/design-guide/tdd-workflow.md)) but explicitly does not pick tools.

**Decision drivers** (pre-fill in the ADR template):

1. **Existing test stack** — backend uses `pytest` extensively; frontend uses `vitest`; E2E uses `playwright`. None currently use Gherkin / `.feature` files.
2. **Current Acceptance Criteria practice** — User Story Description uses Connextra format (As a / I want / So that) + checkbox AC. Some AC are already in Given/When/Then but not executable.
3. **Test maturity** — backend has 3000+ pytest cases; frontend has +500 vitest after recent strict-review push (PR #802); E2E has scenario coverage via `playwright`. The marginal value of adding BDD on top is moderate, not high.
4. **PoC vs production** — PoC currently runs single-tenant. Multi-tenant + regulated rollout (AB#1023 epic) increases the value of executable AC for compliance audit trails.
5. **AI-agent compatibility** — Claude Code `backend-dev` / `frontend-dev` / `qa-engineer` agents can generate pytest / vitest / playwright tests today. Adding pytest-bdd would add a layer the agents need new prompts for.

**Candidate decisions (the ADR should pick one)**:

| Option | Verdict |
| --- | --- |
| **A. Adopt pytest-bdd + bdd-vitest for new features only** | Maintains pentaglyph alignment with Adzic 2011 SbE; adds friction to agent workflow; locks in tool early |
| **B. Defer BDD adoption until multi-tenant rollout (AB#1023 prod)** | Avoids premature tool commitment; keeps the option open; risks AC drift in the meantime |
| **C. Adopt G/W/T as **AC notation only** (no .feature files), TDD-first via existing pytest/vitest** | Cheapest; matches current habit; loses "executable AC" benefit; aligns with pentaglyph upstream `_binding-a-new-process.md` "tool-free first" guidance |

Recommendation embedded in the ADR template: **Option C for PoC, revisit for production-readiness at AB#1023 milestone.** The ADR author should validate this against current backlog and override if circumstances changed.

**Acceptance criteria:**

- [ ] `docs/arc42/09-decisions/00XX-bdd-tdd-tool-adoption.md` exists (use `docs/templates/5_adr.md` MADR v3.0 template; XX = next available number, currently 0032 based on existing 0001-0031).
- [ ] ADR §Status: Proposed (per ADR-0011 ADO ticket sync rule, requires user approval before flipping to Accepted).
- [ ] §Decision Drivers contains the 5 drivers above as a numbered list.
- [ ] §Considered Options lists A/B/C with one-paragraph trade-off each.
- [ ] §Decision Outcome picks one and explains why in 1-2 paragraphs.
- [ ] §Consequences §Positive + §Negative are both filled (not just one side).
- [ ] CLAUDE.md "主要 ADR" table is auto-regenerated via `scripts/docs/sync_claude_md_adr_refs.py` (AB#1048 Phase 3.4 script).

**Estimated effort**: 0.5 day (~2-3 SP). Decision is mostly already converged; the work is writing it down as MADR.

**Dependency**: independent of Track 1 and Track 2.

---

## 6. ADO Work Item map

```
[AB#1606] Feature: [E41] pentaglyph Layer ② downstream binding ........ New (Sprint 9)
  ├─ [AB#1607] User Story: [docs] Scrum cadence binding (Track 1) ..... New (Sprint 9)
  ├─ [AB#1608] User Story: [docs+devops] CI/CD ↔ Sprint integration (Track 2) ... New (Sprint 9)
  └─ [AB#1609] User Story: [docs] BDD/TDD tool adoption ADR (Track 3) . New (Sprint 9)
```

> **Confirmed at PR cut**: the three User Stories were created with IDs `AB#1607`, `AB#1608`, `AB#1609` and linked as children of `AB#1606` in the same PR cycle. Iteration is `ai-clone\Sprint9` (2026-05-18 .. 2026-05-22) for all three. Run `az boards work-item show --id 1606 --expand relations` on the other machine to confirm before starting.

Each User Story follows the Connextra Description template documented in [`.claude/rules/azure-devops.md` § "User Story Description のテンプレート"]. Acceptance Criteria are taken verbatim from the relevant Track section above.

---

## 7. `/feature`-ready checklist for the other machine

When resuming work, run these steps in order. Each step is a single shell or skill command; no synthesis or invention required.

### 7.1 Sync the machine

```bash
# In the AI-clone repo on the other machine:
git fetch origin develop --quiet
git checkout develop
git pull --ff-only origin develop
```

The case study (this file) must be visible at `libs/pentaglyph-docs/case-studies/2026-05-16_ai-clone-downstream-process-binding.md` after pull.

### 7.2 Pick the Track

Three tracks are independent. Suggested order if you want strict dependency safety:

1. Track 1 first (`scrum-cadence.md` becomes the link target for Track 2).
2. Track 2 second.
3. Track 3 (ADR) anytime — independent.

But parallel execution by two Claude sessions is fine since they touch different files.

### 7.3 Run /feature

For each chosen US, in the AI-clone repo:

```bash
# Example for Track 1 (User Story ID will be e.g. AB#1607 — confirm from ADO first):
/feature AB1607
```

The `/feature` skill will:

1. Create a `feature/AB1607-<short-name>` worktree from `origin/develop`.
2. Scaffold `docs/features/AB1607-scrum-cadence-binding/{SPEC.md,tasks.md,decisions.md}`.
3. Move the ADO US from `New` → `Active` and set iteration to the current Sprint.
4. Pre-fill SPEC.md with the Connextra US Description.

From there, follow the §5.X "Concrete content" + "Acceptance criteria" sections of this case study directly into SPEC.md and the actual target detailed-design file.

### 7.4 Definition of Done per Track

Each Track's PR must satisfy:

1. **All Acceptance Criteria checked** (per §5.X above).
2. **CLAUDE.md DoD** (per `CLAUDE.md ## Definition of Done`):
   - All existing tests pass.
   - Code review complete with zero Critical findings.
   - Corresponding detailed-design doc updated in the same PR.
   - ADO ticket moved to `Resolved` (then `Closed` after PO acceptance).
3. **PR title format**: `[docs] <track-summary> #AB#16XX` (Conventional Commits + ADO link).
4. **Auto-complete enabled** on the PR via `az repos pr update --id <PR_ID> --auto-complete true --squash true --delete-source-branch true` (pentaglyph WORKFLOW.md rule 6 prefers merge-commit, but AI-clone overrides to squash per [`docs/design-guide/version-control.md`](https://dev.azure.com/ai-clone/_git/ai-clone?path=/docs/design-guide/version-control.md)).

### 7.5 After all three Tracks merge

1. Move Feature `AB#1606` from `Active` → `Resolved` (then `Closed` after PO acceptance).
2. Update this case study's front-matter `status: In Progress` → `Complete` and add a "Lessons learned" section at the bottom.
3. `git subtree split + push` the updated case study back to pentaglyph upstream (the same workflow used by AI-clone PR #749 — see [`.claude/skills/_shared/ado_auth.sh`](https://dev.azure.com/ai-clone/_git/ai-clone?path=/.claude/skills/_shared/ado_auth.sh) `ado_git_push` helper).

---

## 8. Lessons learned (to be filled after the three Tracks merge)

*Placeholder. Authors of the three Tracks should append findings here, especially:*

- *Did the four-axis test correctly predict the boundary?*
- *Were there any pieces that should have been in pentaglyph upstream (i.e. things to push back into [`_future-bindings.md`](../template/docs/design-guide/_future-bindings.md))?*
- *Were any AI-clone-specific bindings actually generic enough to be a kit default? If so, propose an upstream PR.*

---

## 9. References

- **Upstream canon docs** (pentaglyph Phase 2 output):
  - [`design-guide/dev-cycle.md`](../template/docs/design-guide/dev-cycle.md) — Scrum Guide 2020 binding
  - [`design-guide/bdd-workflow.md`](../template/docs/design-guide/bdd-workflow.md) — BDD binding
  - [`design-guide/tdd-workflow.md`](../template/docs/design-guide/tdd-workflow.md) — TDD binding
  - [`design-guide/dod-dor.md`](../template/docs/design-guide/dod-dor.md) — DoD/DoR binding
  - [`design-guide/_binding-a-new-process.md`](../template/docs/design-guide/_binding-a-new-process.md) — meta-doc
- **Downstream context**:
  - AI-clone roadmap doc that drove the upstream Phase 0-5 work: `docs/impl-plans/2026-05-14_pentaglyph-self-architecture-roadmap.md`
  - AI-clone PR #749 (merged 2026-05-14): self-architecture Phases 0-5 implementation
  - AI-clone ADR-0012 (`pentaglyph-docs D-Full 移行`) — the subtree integration decision
  - AI-clone ADR-0011 (`設計ピボット時の ADO チケット同期を必須化する`) — governs how this case study links to AB#1606
- **External canons** (re-listed for convenience):
  - Schwaber & Sutherland — [Scrum Guide 2020](https://scrumguides.org/scrum-guide.html)
  - Dan North — [Introducing BDD (2003)](https://dannorth.net/introducing-bdd/)
  - Gojko Adzic — [Specification by Example (2011)](https://gojko.net/books/specification-by-example/)
  - Kent Beck — Test Driven Development (2002)
