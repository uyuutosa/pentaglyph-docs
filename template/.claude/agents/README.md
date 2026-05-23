# pentaglyph agents — conversational documentation builder

> **Goal**: through one continuous conversation with the **`doc-orchestrator`**
> agent, the user goes from an empty `docs/` scaffold to a complete, citable
> architecture description — every arc42 section, every required ADR, every
> per-module detailed design, and a working C4 model.
>
> The user never has to remember which template to copy where. The orchestrator
> drives the conversation, dispatches specialist agents to write each
> artefact, and tracks completion against an explicit rubric.

---

## Quick start

In Claude Code, type either:

- `/doc-init` — start the discovery conversation from scratch
- `/doc-status` — see what's done and what's left
- `/doc-fill <area>` — fill one specific gap (e.g. `/doc-fill prd:auth`)

Or just ask Claude to "use the doc-orchestrator agent" and start chatting about
the system you want to document.

---

## The agents at a glance

| Agent | Role | Writes to |
|-------|------|-----------|
| **`doc-orchestrator`** | Drives the conversation. Decides which phase the user is in, which gap to fill next, which specialist to dispatch. Single source of conversational state. | (delegates) |
| **`discovery-agent`** | Elicits *what + why + who*. Conducts the discovery interview. | `01-artefacts/arc42/01-introduction-and-goals/`, `01-artefacts/arc42/03-context-and-scope/`, PRDs, use cases |
| **`architect-agent`** | Converts *what* into *structural how*. Top-level decisions, building blocks, crosscutting concerns. | `01-artefacts/arc42/04-solution-strategy/`, `01-artefacts/arc42/05-building-blocks/`, `01-artefacts/arc42/08-crosscutting/`, `01-artefacts/diagrams/c4/workspace.dsl` |
| **`adr-writer`** | Turns "we need to decide X" into a MADR v3.0 ADR. Pure execution after the architect surfaces a decision. | `01-artefacts/arc42/09-decisions/NNNN-<title>.md` |
| **`spec-writer`** | Picks one building block and produces its full Module Detailed Design (data model, API, sequences, alternatives). | `01-artefacts/detailed-design/<module>.md`, optionally a runtime scenario in `01-artefacts/arc42/06-runtime/` |
| **`completeness-auditor`** | Read-only inventory. Checks coverage against the rubric below and reports gaps. | (no writes — reports only) |

The user normally only talks to `doc-orchestrator`. The other agents are
delegation targets.

---

## The four-phase rubric (completion criteria)

The orchestrator works through these phases in order, but the user may skip /
revisit phases. The auditor reports `% complete` based on which phase's exit
criteria are met.

| Phase | Approx coverage | Required artefacts | Exit criteria (the auditor checks all of these) |
|-------|----------------:|--------------------|--------------------------------------------------|
| **1. Discovery** | 25% | `01-artefacts/arc42/01-introduction-and-goals/overview.md` (≥ 5 goals + ≥ 3 stakeholders + ≥ 5 quality goals); `01-artefacts/arc42/03-context-and-scope/system-context.md` (C4 L1 with ≥ 1 actor + ≥ 1 external system); ≥ 1 PRD; ≥ 1 use case | All four files exist, no `<placeholder>` strings remain, each file ≥ 500 chars, front-matter `status: Review` or `Done` |
| **2. Architecture** | 60% | `01-artefacts/arc42/04-solution-strategy/strategy.md` (≥ 5 named decisions, each linking to its ADR); `01-artefacts/arc42/05-building-blocks/overview.md` (≥ 3 containers); `01-artefacts/diagrams/c4/workspace.dsl` (L1 + L2 elements declared); ≥ 3 ADRs in `01-artefacts/arc42/09-decisions/` | strategy.md cross-links resolve to existing ADRs; container names in §5 match `workspace.dsl`; each ADR has Y-statement + ≥ 2 considered options |
| **3. Detail** | 85% | ≥ 1 `01-artefacts/detailed-design/<module>.md` for the most-critical building block (full data model + API + alternatives); ≥ 1 runtime scenario in `01-artefacts/arc42/06-runtime/`; `01-artefacts/arc42/08-crosscutting/` for ≥ 2 concerns | detailed-design file is ≥ 2000 chars; runtime scenario references existing building blocks; crosscutting files have a `Rule:` and a `Why:` |
| **4. Operations** | 100% | `01-artefacts/arc42/07-deployment/deployment.md`; `01-artefacts/arc42/10-quality/slos.md` (≥ 3 SLOs with target + verification); `01-artefacts/arc42/11-risks/risk-register.md` (≥ 5 risks with owner + mitigation); `01-artefacts/arc42/12-glossary/glossary.md` (≥ 5 terms) | All four files exist, all 12 arc42 section READMEs link to at least one substantive sibling file |

**Substantive content heuristic** (used by the auditor):

- File exists ✓
- File length > 500 chars (Phase 1) or > 2000 chars (Phase 3 detailed design)
- No `<placeholder>` substring
- Front-matter `status:` is one of `Review`, `Done`, `Accepted`
- For ADRs: contains "Y-statement" section; ≥ 2 options listed in "Considered Options"
- For PRDs: ≥ 1 FR with ID `FR-...-NNN`; ≥ 1 NFR with ID `NFR-...-NNN`
- For use cases: ≥ 1 AC in Given/When/Then form

A file that has none of these signs is treated as an unfilled stub even if
present on disk.

---

## How the orchestrator decides what to do

```text
START: user invokes /doc-init or talks to doc-orchestrator
│
├─ Run completeness-auditor → get current phase + next gap
│
├─ If Phase 1 incomplete:
│     Dispatch discovery-agent with the specific missing artefact
│     (e.g. "fill 01-artefacts/arc42/01 overview.md")
│
├─ If Phase 2 incomplete:
│     Dispatch architect-agent
│     Architect surfaces a decision → dispatch adr-writer
│
├─ If Phase 3 incomplete:
│     Dispatch spec-writer for the next-priority building block
│
├─ If Phase 4 incomplete:
│     Dispatch architect-agent (deployment/crosscutting) or
│     prompt user directly for SLOs / risks / glossary
│
└─ If 100%: orchestrator exits with a final summary + next-step suggestions
   (publish-readiness checklist, review-cycle suggestion, etc.)
```

After every specialist completes, the orchestrator re-runs the auditor and
chooses the next gap. The conversation never says "now we're done with
discovery" arbitrarily — the auditor's check is the source of truth.

---

## State management

There is **no separate state file**. Coverage is recomputed from `docs/` on
every audit. This means:

- The user can edit any `docs/` file by hand and the orchestrator notices
- There is nothing to corrupt or get out of sync
- A fresh Claude Code session can pick up from any prior state

The trade-off: every audit re-reads files. For a typical project (≤ 50 docs)
this is fast enough.

---

## Specialist agents — invocation contract

Each specialist agent expects to be invoked by the orchestrator with a precise
brief, e.g.:

> "Fill `01-artefacts/arc42/01-introduction-and-goals/overview.md`. The user has told me:
> [summary of conversation so far]. Use Template 1. Status: Draft → Review when
> done. Cross-link to existing ADRs: [list]. Quality goals to include: [list]."

Specialists do **not** start fresh interviews. They consume the orchestrator's
brief, fill the file, write to disk, and return a brief result summary
(file path, status, what was inferred vs what came from the brief).

The orchestrator decides whether to ask the user for clarification or to
delegate to a specialist. Specialists never delegate to other specialists.

---

## Customising for your project

The agent prompts in this directory are the **default** — they assume a
greenfield product / library / service. If you are documenting a **legacy
system**, an **internal tool**, or a **research project**, edit the agent
prompts:

1. Open the agent's `.md` file under `.claude/agents/`
2. Adjust the "When to use this agent" and "Discovery questions" sections to
   match your context
3. The completion rubric in this README should also be tightened or relaxed —
   e.g. legacy systems may not need PRDs but need much richer §11 risks

The orchestrator reads this README at the start of every session, so changes
take effect on the next conversation.

---

## See also

- [`docs/WORKFLOW.md`](../../docs/WORKFLOW.md) — the static workflow rules (where each doc lives)
- [`docs/AI_INSTRUCTIONS.md`](../../docs/AI_INSTRUCTIONS.md) — generic AI rules
- [`docs/01-artefacts/templates/README.md`](../../docs/01-artefacts/templates/README.md) — template selection flow
