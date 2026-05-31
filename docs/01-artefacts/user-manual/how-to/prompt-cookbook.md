---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-16
diataxis: how-to
audience: developers driving Claude / Cursor / Copilot against a pentaglyph repo
---

# Prompt cookbook

> **Problem this guide solves:** pentaglyph's whole value materialises when an AI agent uses the kit on your behalf. But the *shape of the prompt* matters. This cookbook collects the prompts that work in practice — and flags the ones that look reasonable but break the protocol.

Every prompt below assumes:

1. The repo was initialised with `pentaglyph init … --ai=<your-agent>`.
2. The agent has already been told to read `docs/AI_INSTRUCTIONS.md` and `docs/WORKFLOW.md` once in the session.

If neither is true, start at [use-with-claude-code.md §1–§2](./use-with-claude-code.md) first.

The prompts are written for Claude Code; Cursor / Copilot work the same way, just paste into their chat panel.

---

## Quick index

| Job | Prompt |
| --- | --- |
| Bootstrap a session | [§1](#1-bootstrap-a-session) |
| Write a PRD | [§2](#2-write-a-prd-for-a-new-feature) |
| Surface ADR candidates from a design | [§3](#3-surface-adr-candidates-from-a-design) |
| Write a Module Detailed Design from scratch | [§4](#4-write-a-module-detailed-design-from-scratch) |
| Reverse-generate a Module DD from existing code | [§5](#5-reverse-generate-a-module-dd-from-existing-code) |
| Audit a diff for missing doc updates | [§6](#6-audit-a-diff-for-missing-doc-updates) |
| PR self-review | [§7](#7-pr-self-review) |
| Supersede an ADR | [§8](#8-supersede-an-adr) |
| Migrate a legacy doc | [§9](#9-migrate-a-legacy-doc-into-pentaglyph-layout) |
| Audit a stale doc | [§10](#10-audit-a-stale-doc) |
| Anti-patterns | [§11](#11-anti-patterns-prompts-that-look-reasonable-but-break-the-protocol) |

---

## 1. Bootstrap a session

Send this exactly once when you start working on docs:

> Read `docs/AI_INSTRUCTIONS.md` and `docs/WORKFLOW.md` end to end. From now on, whenever you create or modify anything under `docs/`, follow that protocol. If you are about to place a file somewhere those rules do not explicitly authorise, stop and ask me.

You only need this once per session. It anchors the next 20 prompts.

---

## 2. Write a PRD for a new feature

> I need a PRD for the following feature, following pentaglyph rules:
>
> *Feature:* `<one-line description>`
>
> *Background:* `<2–3 sentences of context>`
>
> Use Template 2. Place the file under `arc42/03-context-and-scope/prds/` with a kebab-case filename. Set the front-matter status to `Draft`. Fill `<placeholder>` with `<actual project name>`. After writing, list any open questions you could not answer from the context I gave.

The trailing *"list any open questions"* is essential — Claude will otherwise invent plausible-sounding values to fill fields and you will not notice until weeks later.

---

## 3. Surface ADR candidates from a design

> Here is a design proposal for `<feature>`. Identify each architectural decision implied by this design that should be recorded as a separate ADR. For each, write a one-sentence summary, the named alternatives, and a recommended `Status: Proposed` ADR draft using Template 5 (MADR v3.0). Place each draft in `arc42/09-decisions/` with the next sequential NNNN prefix.
>
> *Design:* `<paste design notes>`
>
> Do not bundle decisions. Each ADR is one decision. If you find more than 5 candidates, flag the top 5 and ask whether to draft the rest.

The *"do not bundle"* rule matters because the most common ADR failure is a single ADR titled "Architecture for feature X" containing 4 separate decisions. That is not an ADR; that is a mini design doc.

---

## 4. Write a Module Detailed Design from scratch

> Write a Module Detailed Design for the `<module>` module that we are about to implement.
>
> *PRD:* `docs/arc42/03-context-and-scope/prds/<feature>.md` (read this first)
> *Relevant ADRs:* `<list ADR numbers>`
>
> Use Template 3. Place the file at `docs/detailed-design/<module>.md`. Add a child link under `docs/arc42/05-building-blocks/`. Status `Draft`. List open questions at the end.

---

## 5. Reverse-generate a Module DD from existing code

When you adopt pentaglyph on an existing project:

> Read the source under `src/<module>/`. Write a Module Detailed Design (Template 3) describing the *current* implementation — not a desired future one. Place it at `docs/detailed-design/<module>.md`. Mark every section where you had to guess at intent with `[INFERRED — please verify]`.
>
> Do not invent design rationale. If the reason for a structural choice is not visible in the code, leave it blank and add an Open Question.

The `[INFERRED — please verify]` marker is the discipline that prevents reverse-generated docs from rotting on contact.

---

## 6. Audit a diff for missing doc updates

This is the **single highest-leverage prompt in the cookbook**. Run before every PR.

> Look at my staged diff (`git diff --cached`). Walk `docs/WORKFLOW.md §2` (the Code change → doc update mapping table) row by row and tell me, for each row that matches changes in my diff, whether the corresponding doc has been updated in this PR.
>
> Report format:
> - ✅ `<row>` — covered by `<file>`
> - ❌ `<row>` — missing update to `<expected file>`
> - ⚠️ `<row>` — partially covered; gap is `<specific gap>`
>
> Do not generate the missing updates yet. Just produce the gap list.

The *"do not generate yet"* line stops Claude from writing 400 lines of doc that you would otherwise have to review. Get the gap list first, then ask for the updates one at a time.

---

## 7. PR self-review

After §6 has cleared:

> Self-review this PR against pentaglyph rules. Check specifically:
>
> 1. No edits to any `Accepted` ADR body. Edits to front-matter only are allowed.
> 2. All new durable docs have front-matter (`status`, `owner`, `last-reviewed`).
> 3. All new volatile docs have a `YYYY-MM-DD_` prefix.
> 4. No invented directories. Every new file is under one of the directories named in `docs/WORKFLOW.md §1`.
> 5. No implicit architectural decisions in the code without a corresponding ADR.
> 6. The PR title/description summarises the user-facing change, not the implementation detail.
>
> Report any violation with file and line. Do not auto-fix.

---

## 8. Supersede an ADR

> ADR-`<NNNN>` (`<title>`) needs to be superseded. The new decision is `<one-sentence description>`.
>
> 1. Pick the next sequential NNNN prefix.
> 2. Write the new ADR using Template 5. Include `Supersedes: <NNNN>` in the front-matter.
> 3. Update **only the front-matter** of `<NNNN>.md` to add `Superseded by: <new NNNN>` and change `Status: Accepted` → `Status: Superseded`.
> 4. Do NOT edit the body of `<NNNN>.md`. The body is the historical record.
>
> After writing, show me a `git diff` summary of both files.

The "do not edit the body" rule is the one Claude breaks most often. The "show me a `git diff` summary" line forces it to expose any over-reach.

---

## 9. Migrate a legacy doc into pentaglyph layout

> The legacy file `<path>` contains content that should be re-homed under pentaglyph layout. Read it, then:
>
> 1. Identify each *durable* claim (system structure, decision, contract).
> 2. For each, decide which pentaglyph file it belongs in — quote `docs/WORKFLOW.md §1` to justify.
> 3. Produce the new files using the right templates.
> 4. Replace the migrated content in `<path>` with a one-line link to the new home.
>
> Discard any volatile content (status updates, dated TODOs) — those are not migrated, they are forgotten.

The last sentence is critical. Legacy docs are usually 30% durable, 70% dated cruft. Migrating the cruft poisons the new structure.

---

## 10. Audit a stale doc

> Read `docs/<path>`. Compare its claims against the current code under `<relevant src path>`. List every claim that is:
>
> - 🔴 Wrong — contradicts current code
> - 🟡 Stale — was true once but the code has moved on
> - 🟢 Still accurate
>
> Group by section. Do not rewrite the doc — just produce the audit. I will decide what to update.

Run this periodically (monthly is a reasonable cadence) on the 5 most-referenced docs in your repo. Most docs decay invisibly; this prompt makes the decay legible.

---

## 11. Anti-patterns — prompts that look reasonable but break the protocol

Avoid these:

| Anti-prompt | Why it breaks the protocol |
| --- | --- |
| *"Write all the docs for this feature."* | Conflates PRD / ADR / Module DD into one call. Each is a separate decision. Ask for them sequentially. |
| *"Reorganise `docs/` to be cleaner."* | The structure is **not** for cleanliness; it is for *placement determinism*. Reorganising it on agent vibes destroys that. |
| *"Update all the docs that mention X."* | Mass blind updates rot the audit trail. Update the *one canonical* doc; everything else should be a link to it. |
| *"Generate docs for the whole codebase."* | High volume, low signal. The result reads like the code, which is exactly the value pentaglyph does not add. |
| *"Convert the ADRs to a more readable format."* | MADR v3.0 *is* the format. There is no negotiation. |
| *"Combine these three ADRs into one."* | Loses the one-decision-per-file property that makes ADRs useful for `git blame` archaeology. |
| *"You can skip the front-matter for this quick fix."* | The front-matter is what makes the doc machine-readable. Quick fixes are exactly when it gets dropped. |

---

## A useful habit

Save the prompts you use most as templates in your editor (Claude Code → `.claude/commands/`, Cursor → snippets). The four worth saving for almost every project:

1. §1 — bootstrap
2. §6 — diff audit
3. §7 — PR self-review
4. §10 — stale audit

Together, those four cover ~90% of the recurring documentation work in a pentaglyph project.

---

## Related

- [use-with-claude-code.md](./use-with-claude-code.md) — daily workflow context
- [`../../../../template/docs/AI_INSTRUCTIONS.md`](../../../../template/docs/AI_INSTRUCTIONS.md) — the protocol Claude follows
- [`../../../../template/docs/WORKFLOW.md`](../../../../template/docs/WORKFLOW.md) — the canonical rules the prompts lean on
