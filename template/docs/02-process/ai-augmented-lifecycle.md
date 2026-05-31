---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-16
layer: 2
---

# AI-augmented work-item lifecycle — empirically grounded operating rules

> **What this file is.** The convention this kit ships for how AI agents traverse the lifecycle of hierarchical work items (epic → feature → user-story / bug → task or equivalent) during AI-augmented engineering. Like its sibling [`ai-augmented-pr.md`](./ai-augmented-pr.md), every rule below traces to a peer-reviewed paper or an established industry source — see the [References](#references) section.
>
> **What this file is not.** A binding to any specific work-item tool (Azure DevOps, Jira, Linear, GitHub Issues, …). State names like `Resolved`, `Closed`, `In Review` are tool concerns and live in downstream projects under [`design-guide/`](./) overrides — see [§5 Override path](#5-override-path).
>
> **Companion artefact.** [`ai-augmented-pr.md`](./ai-augmented-pr.md) — PR descriptions for AI-contributed code; the two files together cover the *pull-request* surface (description quality) and the *work-item* surface (lifecycle progression) of AI-augmented engineering.

---

## 1. The problem this kit takes a position on

AI agents can now drive work items through their entire intermediate lifecycle — branching, implementing, testing, opening the PR, merging, even closing sub-tasks — at a speed humans cannot match. Two operational pathologies follow:

1. **Reviewer-gate dilution.** When AI moves a work item all the way to the terminal "done" state, the human reviewer has no concentrated checkpoint. They either inspect every transition (unsustainable) or none (rubber-stamping). Field reports describe this as "AI throughput exceeds human verification bandwidth" — the same construct ICSE 2025 ([Spiess et al.](https://www.software-lab.org/publications/icse2025_calibration.pdf)) measures as miscalibration manifesting in *process* rather than *output*. The fix from the HCI literature on **appropriate reliance** ([Schemmer et al., IUI 2023](https://dl.acm.org/doi/10.1145/3581641.3584066); [Vasconcelos et al., ACM HCI 2025](https://dl.acm.org/doi/10.1145/3710946)) is to install **one** human-attention gate per work item, not zero and not many.

2. **Hierarchy erosion.** Hierarchical work-item systems (epic → feature → user-story → task) exist because requirements live at one altitude and implementation lives at a lower one. When AI agents create or close items without respecting parentage, the hierarchy collapses: child tasks orphaned from a user story can't be planned, unparented user stories can't be reported up to a feature, and AI-fabricated top-level business requirements blur the line between "the team built this" and "the AI invented this". The User Stories canon ([Cohn, 2004](https://www.mountaingoatsoftware.com/books/user-stories-applied)) is explicit: business-requirement items are **a conversation token between PO and team**, not a generation target.

This file is the kit's position on those two pathologies. The PR surface is covered by [`ai-augmented-pr.md`](./ai-augmented-pr.md); this file covers the work-item surface.

---

## 2. What the evidence supports

Three operating principles each have measurable support and together they form the canon this file binds. Each principle is stated abstractly here; the **state-machine binding** to a concrete tool (ADO Agile, Jira, Linear, GitHub Issues, …) lives in downstream `design-guide/` overrides — see [§5 Override path](#5-override-path).

### 2.1 Single human review-gate per work item

> **Principle.** For every deliverable-level work item (user story, bug, feature, epic, or equivalent — *not* sub-tasks), exactly **one** state in the lifecycle is reserved as the human review checkpoint. AI agents progress the item through all preceding states autonomously, but never through that one gate. The transition *out* of the review-gate (toward "closed" / "accepted" / "shipped") is human-only.

The empirical basis sits in two converging strands of literature:

- **Cognitive forcing functions** ([Buçinca et al., CSCW 2021](https://dl.acm.org/doi/10.1145/3449287)) reduce overreliance on AI in decision contexts by approximately 10 percentage points among reviewers high in Need for Cognition, but the same paper warns that *excessive* forcing causes disengagement. **One forcing point per item** is the operationalised version: enough friction to engage the reviewer, not so much that they tune out.
- **Appropriate reliance** ([Schemmer et al., IUI 2023](https://dl.acm.org/doi/10.1145/3581641.3584066); [Vasconcelos et al., CSCW 2023](https://dl.acm.org/doi/10.1145/3579605)) is operationalised by aligning reviewer attention with the *moment of consequential commitment*. The final state transition (item → done) is consequential because once it's there, it stops being looked at. Concentrating human attention at exactly that transition aligns attention with consequence.

Sub-tasks are **excluded from the review-gate**. They are work-decomposition artefacts under a parent deliverable; the deliverable is the unit of review, not its internal partitioning. AI agents close sub-tasks directly. See §2.3 for why the hierarchy makes this safe.

### 2.2 One PR maps to one top-level deliverable work item

> **Principle.** A pull request corresponds to exactly **one** deliverable-level work item (user story / bug / equivalent). Sub-tasks are not independently PR'd; they exist as work decomposition under a parent deliverable. AI agents creating branches or PRs MUST resolve any sub-task identifier they are handed to the parent deliverable before branching.

The empirical basis is in PR-review effectiveness research:

- **The 200-400 LoC review band** (Cisco / SmartBear field data, widely cited; convergent with [Gonçalves et al., EMSE 2022](https://link.springer.com/article/10.1007/s10664-022-10123-8)) is the published peak for defect detection in code review. A user story sized to fit this band, expressed as one PR, gives the reviewer exactly the unit research says they can hold in working memory.
- **PR description-vs-merge-latency** ([Tao Xiao et al., FSE 2024](https://tao-xiao.github.io/files/Copilot4PR_FSE_2024.pdf)) finds review latency rises when PRs lack a clear single-deliverable framing. One-task-per-PR fragments the framing; one-deliverable-per-PR concentrates it.

The first principle (single review-gate, §2.1) and this principle reinforce each other: the gate is the moment the *PR* and the *work item* converge on the reviewer's attention. If multiple PRs each opened a separate review-gate for the same deliverable, the gate would dilute again.

### 2.3 No unparented work items; the business-requirement layer is human-authored

> **Principle.** Every work item below the business-requirement layer has a parent. AI agents may create intermediate-layer items (e.g. a grouping epic / feature when an appropriate one is absent), but **must not auto-create the top business-requirement layer** — they escalate to the human PO instead. The business-requirement layer is a conversation token between PO and team, not a generation target.

The empirical / canon basis:

- **User Stories applied** ([Cohn, 2004](https://www.mountaingoatsoftware.com/books/user-stories-applied) chs. 1-3) frames the business-requirement layer (epic / story) as a **placeholder for conversation**, not a static specification. The artefact's value is the conversation it triggers between PO and team. AI-fabricated top-level requirements skip that conversation, which is the artefact's reason for existing.
- **Scrum Guide 2020** ([Schwaber & Sutherland](https://scrumguides.org/scrum-guide.html)) names the Product Owner as the **single accountable role** for Product Backlog content. PO content authored by an AI without PO agreement violates that accountability.
- **The hierarchy erosion problem** (operational, not academic): orphan work items cannot be reported up, cannot be planned together, and cannot be measured. Hierarchical work-item tooling depends on parentage; AI agents that ignore parentage break the tooling's invariants downstream of any item they touch.

Concretely, this principle has three rules:

1. **Every non-top-level item must have a parent.** Tasks parent up to user stories / bugs. User stories / bugs parent up to features (or directly to epics when features are not used). Features parent up to epics.
2. **AI may auto-create intermediate parents when fit is absent.** If a new user story has no fitting feature, the AI may create the feature (linked to an existing epic).
3. **AI must never auto-create the top business-requirement layer.** If no fitting epic / initiative / business-requirement exists, the AI escalates to the PO. The PO authors the top layer; the AI works under it.

This principle is **structural** — it constrains the *shape* of the work-item graph, independent of the lifecycle states traversed.

---

## 3. How the three principles compose

The three principles operate at three different surfaces of the engineering process:

| Surface | Principle | Effect |
| --- | --- | --- |
| **Work-item lifecycle** (state machine) | §2.1 single review-gate | One human attention point per deliverable |
| **PR boundary** (branch + diff) | §2.2 one PR per deliverable | Review unit matches research-supported size band |
| **Work-item graph** (parentage) | §2.3 no unparented + no top auto-create | Hierarchy stays intact; PO accountability preserved |

They are designed to be applied **together**. Applying any one alone leaves a leak: §2.1 without §2.2 lets multiple PRs dilute the gate; §2.1+§2.2 without §2.3 lets the AI create review-gates for items the team never agreed to build; §2.3 without §2.1 lets the AI carry items past the human attention point.

---

## 4. What this binding does *not* prescribe

Following the kit's [STRATEGY §9 four-axis evaluation](../STRATEGY.md), the following are intentionally out of scope (project-specific, no universal canon, fails the switching-cost or domain-neutrality axis):

| Out of scope | Why | Where to bind |
| --- | --- | --- |
| **Specific state names** (`Resolved`, `In Review`, `QA Pending`, …) | Tool-specific; varies across ADO Agile, Jira, Linear, GitHub Issues, GitLab | Downstream `design-guide/ai-lifecycle-binding.md` per project |
| **Which state is the review-gate** | Tool-dependent; might be `Resolved` (ADO Agile), a label, a column position, an external review-app | Downstream binding |
| **The exact hierarchy levels** (Epic → Feature → US vs. Epic → US vs. Initiative → Theme → Epic → Story) | Project- and team-size dependent | Downstream binding |
| **Escalation channel for top-layer creation** | Slack, ADO comment mention, email, in-person | Downstream binding |
| **Automation hooks** (when AI invokes which state transition) | Layer ③ Automation, not Layer ② Process | `.claude/` / `cli/` / `scripts/docs/` in downstream |

This binding is intentionally **state-machine-agnostic**. It defines invariants the binding must preserve, not the binding itself.

---

## 5. Override path

The intended downstream pattern is to author a project-specific `design-guide/ai-lifecycle-binding.md` (or extend `design-guide/dev-cycle.md`) that:

1. Names the specific lifecycle states in use.
2. Designates exactly one state as the human review-gate (per §2.1).
3. Documents the hierarchy levels in use and which level counts as the "deliverable" for PR-unit purposes (per §2.2).
4. Documents the escalation pattern for top-layer creation (per §2.3).
5. Lists the Layer ③ automation hooks that enforce the binding (AI agents / CLI / lint).

Example (downstream, ADO Agile + AI agents, **not part of this kit**):

> States: `New → Active → Resolved → Closed` (per ADO Agile template). Review-gate = `Resolved`. AI agents transition `New → Active → Resolved` autonomously; only the PO transitions `Resolved → Closed`. Sub-tasks: AI closes directly `New → Active → Closed`. Hierarchy: `Epic → Feature → User Story / Bug → Task`. Deliverable level (one PR) = User Story or Bug. Escalation for new Epic: comment-mention to PO on the parent Feature.

That binding lives in the downstream project, not here. The principles above bound it.

---

## 6. Compliance hints (downstream)

Downstream bindings should provide mechanically checkable hooks for each principle. These are recommended, not mandatory:

- **For §2.1**: a CI / pre-merge check that the deliverable item is in the designated review-gate state when the PR completes auto-merge. Tooling: ADO REST API check / Jira webhook / Linear MCP.
- **For §2.2**: AI agent guard that rejects branch / PR creation when the work-item ID is a sub-task — resolves to parent deliverable first.
- **For §2.3**: a periodic audit (`/ado-audit` equivalent in downstream) that flags unparented items and AI-authored top-layer items for human review.

The kit ships these hooks as concrete examples only in the downstream binding files; they are not part of Layer ② Process.

---

## 7. Relationship to other kit canons

| Kit canon | Relationship |
| --- | --- |
| [`ai-augmented-pr.md`](./ai-augmented-pr.md) | Sibling. PR-surface companion. §2.2 PR-unit principle references its §3 verification budget. |
| [`dev-cycle.md`](./dev-cycle.md) (Scrum Guide 2020 binding) | Scrum Guide names the PO accountability that §2.3 honours. |
| [`dod-dor.md`](./dod-dor.md) | DoD applies at the moment of review-gate transition (§2.1). DoR applies before items enter the lifecycle at all (orthogonal). |
| [`bdd-workflow.md`](./bdd-workflow.md) / [`tdd-workflow.md`](./tdd-workflow.md) | Orthogonal — these bind *what* gets verified; this file binds *who* and *when* the verification gate fires. |
| [`version-control.md`](./version-control.md) | §2.2 PR-unit principle is enforced at the branching boundary defined here. |

---

## 8. References

### Peer-reviewed (primary)

- Buçinca, Z., Malaya, M. B., & Gajos, K. Z. (2021). To trust or to think: Cognitive forcing functions can reduce overreliance on AI in AI-assisted decision-making. *Proc. ACM Hum.-Comput. Interact.*, 5(CSCW1). <https://dl.acm.org/doi/10.1145/3449287>
- Schemmer, M., Kuehl, N., Benz, C., Bartos, A., & Satzger, G. (2023). Appropriate reliance on AI advice: Conceptualization and the effect of explanations. *Proc. ACM IUI 2023*. <https://dl.acm.org/doi/10.1145/3581641.3584066>
- Vasconcelos, H., et al. (2023). Explanations can reduce overreliance on AI systems during decision-making. *Proc. ACM CSCW 2023*. <https://dl.acm.org/doi/10.1145/3579605>
- Vasconcelos, H., et al. (2025). Selective explanations. *Proc. ACM HCI 2025*. <https://dl.acm.org/doi/10.1145/3710946>
- Spiess, C., et al. (2025). Calibration of large language models for code review. *ICSE 2025*. <https://www.software-lab.org/publications/icse2025_calibration.pdf>
- Tao Xiao et al. (2024). Copilot4PR: empirical study of AI-assisted PR description. *FSE 2024*. <https://tao-xiao.github.io/files/Copilot4PR_FSE_2024.pdf>
- Gonçalves, P., et al. (2022). Code review checklists: a systematic study. *EMSE 2022*. <https://link.springer.com/article/10.1007/s10664-022-10123-8>

### Industry / canon (primary)

- Cohn, M. (2004). *User Stories Applied: For Agile Software Development*. Addison-Wesley. <https://www.mountaingoatsoftware.com/books/user-stories-applied>
- Schwaber, K. & Sutherland, J. (2020). [*The Scrum Guide (November 2020)*](https://scrumguides.org/scrum-guide.html).

### Field reports (secondary)

- Cisco / SmartBear code-review field studies (200-400 LoC review band) — see also [SmartBear: Best Kept Secrets of Peer Code Review](https://smartbear.com/SmartBear/media/pdfs/best-kept-secrets-of-peer-code-review.pdf).

### Related kit files

- [`ai-augmented-pr.md`](./ai-augmented-pr.md) — PR-surface companion.
- [`dev-cycle.md`](./dev-cycle.md) — Scrum cadence binding.
- [`dod-dor.md`](./dod-dor.md) — Definition of Done / Ready bindings.
- [`STRATEGY.md §9`](../STRATEGY.md) — four-axis evaluation that scopes this binding's prescriptions.
