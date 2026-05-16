---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-16
diataxis: how-to
audience: anyone deciding what kind of doc to write
---

# How to choose the right template

> **Problem this guide solves:** you are about to write a doc and you cannot decide whether it should be a PRD, an ADR, a Module Detailed Design, a Use Case, or something else. `WORKFLOW.md §1` already has a decision tree, but it is optimised for AI agents — humans want the mental model behind the tree.

This is the **human-facing** template selection guide. For the AI-facing version, see [`../../template/docs/WORKFLOW.md §1`](../../template/docs/WORKFLOW.md#1-which-template-do-i-use).

---

## The three questions that decide the template

Almost every template selection comes down to one of three questions:

1. **WHAT and WHY** are we building? → **PRD** or **Use Case**
2. **HOW** are we building it? → **Module Detailed Design** or **Architecture Overview**
3. **WHY this technical choice** over the alternatives? → **ADR**

If you cannot place your doc in one of these three buckets, you probably do not need a durable doc — you need a `report/`, `impl-plan/`, or `postmortem/` (volatile).

---

## The full picker

```text
Are you recording a single architectural decision and its alternatives?
   YES → Template 5 (ADR — MADR v3.0). One file under arc42/09-decisions/.

Are you describing what users want and why we will build it?
   YES → Template 2 (PRD). Lives under arc42/03-context-and-scope/prds/.

Are you describing how a specific actor uses a specific scenario?
   YES → Template 4 (Use Case). Under arc42/03-context-and-scope/use-cases/.

Are you specifying how one module / service is implemented?
   YES → Template 3 (Module Detailed Design). Under detailed-design/.

Are you describing the system as a whole, or a cross-cutting concern?
   YES → Template 1 (Architecture Overview). arc42 §1, §3, §4, §5, §8.

Is it a UX research output — a persona, journey map, or service blueprint?
   YES → Template 6 / 7 / 8 respectively.

Is it dated working material (plan, sprint task list, postmortem, report)?
   YES → no template — just a Markdown file under the matching Layer B directory.
         File name is YYYY-MM-DD_<kebab-title>.md.

Anything else?
   → Template 0 (Default). Place it in the closest matching directory.
```

If you are still unsure after this, the section below covers the **most common confusions**.

---

## Common confusion #1: "Is this a PRD or a Use Case?"

| Aspect | PRD (Template 2) | Use Case (Template 4) |
| --- | --- | --- |
| Focus | *What problem are we solving and for whom?* | *How does Actor X accomplish Goal Y?* |
| Lifespan | Lives until the feature ships, then stays as the canonical "why" | Lives as long as the scenario remains valid |
| Specificity | One feature or product area | One scenario; many use cases per feature |
| Author | PM / product lead | Anyone who designs the interaction |
| Typical length | 1–3 pages | 0.5–1 page |
| Example | "Add a `greet` command so users can test their install" | "First-time user runs `my-app greet`" |

**Rule of thumb:** if you are writing about a *user journey through the system*, that is a Use Case. If you are writing about *whether we should build this feature at all*, that is a PRD.

Both can — and often should — coexist for the same feature.

---

## Common confusion #2: "Is this an ADR or part of the Module Detailed Design?"

| Aspect | ADR (Template 5) | Module DD (Template 3) |
| --- | --- | --- |
| Focus | *Why did we pick this option?* | *What is the implementation?* |
| Lifespan | Once `Accepted`, immutable. Supersede with a new ADR | Living document — kept in sync with code |
| Specificity | One decision, one file | One module / service / subsystem |
| Alternatives | **Required** — lists what was rejected and why | Not required |
| Typical length | 1 page | 1–10 pages |

**Rule of thumb:** if removing this section from the doc would leave the *implementation* still describable but the *choice* unexplained, it is an ADR. If removing it would leave the *choice* explained but the *implementation* opaque, it is part of the Module DD.

It is normal for an implementation to reference 2–5 ADRs from its Module DD.

---

## Common confusion #3: "Is this an ADR or a comment in the code?"

ADRs are for decisions someone might re-litigate later. Code comments are for context a future reader needs to understand the *current* code.

Write an ADR if:

- The decision has named alternatives that someone else would seriously consider.
- The decision has trade-offs that are not obvious from the code.
- Six months from now, someone might ask *"why is this X instead of Y?"*
- The decision affects more than one module.

Do **not** write an ADR for:

- Variable names, formatting, lint conventions (the lint rules are the ADR).
- "Use library X" where there are no real alternatives.
- One-line workarounds (a `// HACK:` comment is correct).

If you find yourself writing an "ADR" that has no `Alternatives` section, it is not an ADR.

---

## Common confusion #4: "Is this an Architecture Overview or a Module Detailed Design?"

| Architecture Overview (Template 1) | Module DD (Template 3) |
| --- | --- |
| Spans multiple modules | One module |
| Lives under `arc42/` | Lives under `detailed-design/` |
| Read by newcomers and architects | Read by implementers and reviewers |
| Updated rarely (system shape changes) | Updated on every code change to that module |
| Diagrams: high-level C4 (Context / Container) | Diagrams: low-level (Component / sequence) |

**Rule of thumb:** if a stranger to the codebase needs to read this to understand *the system*, it is overview. If they need to read it to understand *one part*, it is module DD.

---

## Common confusion #5: "Is this durable or volatile?"

The single sharpest test: **does this doc describe the system as it is, or what we did at a point in time?**

- *The system as it is* → durable, goes in `arc42/`, `detailed-design/`, `design-guide/`, `api-contract/`, `user-manual/`. Front-matter required. Lifecycle Draft → Review → Done.
- *What we did at a point in time* → volatile, goes in `impl-plans/`, `task-list/`, `postmortems/`, `reports/`, `cost-estimates/`. Filename has a `YYYY-MM-DD` prefix. Append-only — never edit a closed volatile doc; write a new dated one.

If you find yourself writing a doc that is *partly* both — say, an implementation plan that ends with a permanent design decision — split it: keep the dated plan in `impl-plans/` and lift the durable part into an ADR or a Module DD update.

---

## When you genuinely cannot decide

Two escape hatches exist:

1. **Template 0 (Default)** is designed for "I really do not know". Use it, put the file in the closest reasonable directory, and let the next reviewer help re-classify it.
2. **Ask Claude / a teammate.** Quote the doc's purpose in one sentence and ask *"which pentaglyph template?"*. The answer is almost always immediate.

What you should **not** do is invent a new template or a new directory. That is the failure mode pentaglyph is designed to prevent.

---

## The complete template list

For the *authoritative* list of templates that exist right now in this repo, see [reference/template-index.md](../reference/template-index.md). It also flags the numbering and naming inconsistencies that exist as of this writing.

---

## Related

- [`../../template/docs/WORKFLOW.md`](../../template/docs/WORKFLOW.md) — the canonical placement rules
- [reference/template-index.md](../reference/template-index.md) — current template inventory
- [how-to/write-an-adr.md](./write-an-adr.md) — the MADR-specific deep dive
- [how-to/use-with-claude-code.md](./use-with-claude-code.md) — let Claude pick the template for you
