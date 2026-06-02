---
name: explain
description: >
  Tutor skill that translates this codebase for newcomers. Given a file path,
  function name, concept, error message, or architecture term, it discovers
  existing docs first (re-using rather than re-generating), produces a
  Diátaxis-style Explanation in narrative voice with a Mermaid diagram and
  links to ADRs / arc42 §08 / official upstream docs. Audience-aware (dev vs
  end-user). Asks once at the end whether to persist the explanation under
  the appropriate `docs/` location; treats silence as "yes, save".
argument-hint: "<target>  e.g. src/foo/bar.ts | \"AG-UI SSE\" | --audience=dev|user"
disable-model-invocation: false
---

# /explain &lt;target&gt; — newcomer-friendly tutor

Use this skill when someone joining the project (or stepping into an
unfamiliar area) needs a **patient, narrative explanation of what something
is and why it was built that way**. It is the conversational counterpart to
[Diátaxis Explanation](https://diataxis.fr/explanation/) — discursive,
theoretical, deepening; never a how-to.

This is the **only skill that translates existing docs for a newcomer**.
Other doc skills ([/doc-init](../doc-init/SKILL.md),
[/doc-fill](../doc-fill/SKILL.md), [/doc-status](../doc-status/SKILL.md))
*build* docs from scratch and assume you already understand the codebase.

## What it does

1. **Audience resolution** — picks `dev` or `user`:
   - Explicit `--audience=dev|user` wins
   - File paths and code symbols → `dev`
   - Feature names, UI affordances, journey steps → `user`
   - Ambiguous → asks one focused question, then proceeds
2. **Discovery (cheap re-use first)** — greps the target across
   `docs/01-artefacts/arc42/08-crosscutting/explanations/`,
   `docs/01-artefacts/user-manual/explanation/`, `docs/01-artefacts/arc42/08-crosscutting/`,
   `docs/01-artefacts/detailed-design/`, and `docs/01-artefacts/arc42/09-decisions/`. If a substantive
   explanation already exists, the skill **points to it instead of
   re-generating**. The newcomer is sent to the canonical home; nothing is
   duplicated.
3. **Translation (only when needed)** — when no existing explanation
   covers the target, the skill:
   - Reads the relevant source(s): code file, ADRs, detailed design,
     `arc42/08-crosscutting/` concern, `reference-codes/` sample
   - Writes an Explanation that follows the structure in
     [docs/01-artefacts/user-manual/explanation/README-pentaglyph.md](../../../docs/01-artefacts/user-manual/explanation/README-pentaglyph.md):
     What this is about / Background / The design / Alternatives rejected /
     Trade-offs accepted / Related
   - Embeds **one Mermaid diagram** when an architectural shape is being
     explained. C4 zoom levels (Context / Container / Component) are the
     mental model; the diagram is hand-written Mermaid, not a re-render of
     the canonical [`docs/01-artefacts/diagrams/c4/workspace.dsl`](../../../docs/01-artefacts/diagrams/c4/workspace.dsl)
     (which it links to instead)
   - Cites every load-bearing claim with a markdown link to its source
     (ADR, detailed design, official upstream URL). The skill **never
     paraphrases an Accepted ADR** — it links to it. ADRs are immutable
     source of truth; this skill is a translation layer.
4. **Persist prompt (opt-out, not opt-in)** — at the end the skill asks:
   > "Save this explanation to `<path>`? [Y/n] (silence = save)"
   - `n` / `no` → not saved, conversation ends
   - any other reply, or no reply within the next turn → saved
   - Save targets:
     - `--audience=dev` → `docs/01-artefacts/arc42/08-crosscutting/explanations/<kebab-topic>.md`
     - `--audience=user` → `docs/01-artefacts/user-manual/explanation/<kebab-topic>.md`
   - Each saved file carries front-matter (`audience`, `source_adrs`,
     `last_verified`, `status: Stable`) so the lifecycle-monitor agent can
     flag stale entries.

## When to use

- A newcomer asks "what does this file do?" while pointing at code
- Someone asks "why did we pick X over Y?" — the answer lives in an ADR
  but they want it in narrative form with the surrounding context
- A reviewer is reading a PR that touches an unfamiliar area and wants the
  10-minute primer before reading the diff
- During onboarding: walk through 3–5 of the most-asked concepts and let
  silence-saves accumulate a `docs/.../explanations/` library naturally

## When NOT to use

- You want to **write a new how-to** (step-by-step instructions) → use
  `docs/01-artefacts/user-manual/how-to/` directly. Explanation is theory; how-to is
  practice. See [Diátaxis](https://diataxis.fr/) for the four-quadrant
  rationale
- You want to **record a fresh design decision** → use
  [/doc-fill adr:&lt;title&gt;](../doc-fill/SKILL.md). ADRs are the source
  of truth; explanations only translate them
- You want **canonical architecture diagrams** (System Context /
  Container) → those live in [`docs/01-artefacts/diagrams/c4/workspace.dsl`](../../../docs/01-artefacts/diagrams/c4/workspace.dsl)
  and are rendered by [/diagram-render](../diagram-render/SKILL.md). The
  Mermaid diagrams in `/explain` outputs are **didactic sketches**, not
  the canonical view
- The target is **already explained** in
  `docs/01-artefacts/arc42/08-crosscutting/explanations/` or
  `docs/01-artefacts/user-manual/explanation/` — the skill's discovery step will catch
  this and point you there

## Output structure

A single response containing:

1. **One-paragraph summary** — the elevator pitch
2. **Background** — what existed before, what problem the design solves
3. **The design** — how it works conceptually (with the Mermaid diagram
   inline if architecture is in scope)
4. **Alternatives we rejected** — and why, with ADR links
5. **Trade-offs we accept** — honest, no marketing voice
6. **Where to go next** — bulleted links to ADRs, detailed design files,
   upstream official docs (arc42, C4, MADR, Diátaxis as applicable, plus
   framework-specific URLs)
7. **Persist prompt** — `Save to <path>? [Y/n]`

## Diátaxis fidelity

This skill writes **Explanation**, not Tutorial or How-to:

| Quadrant | Voice | Goal | This skill? |
|----------|-------|------|-------------|
| Tutorial | Teacher-led | Guarantee first success | No — link to `docs/01-artefacts/user-manual/tutorials/` |
| How-to | Recipe | Solve one task | No — link to `docs/01-artefacts/user-manual/how-to/` |
| Reference | Dry, precise | Lookup | No — link to `docs/01-artefacts/user-manual/reference/` or API contract |
| **Explanation** | Discursive | Understand *why* | **Yes — this skill** |

If the skill catches itself writing "first, do X" it has slipped into
how-to territory; it must rewrite that paragraph in declarative voice or
redirect the reader to the existing how-to.

## Save-target rules

| Audience | Location | Why |
|----------|----------|-----|
| `dev` (engineers, AI agents touching the codebase) | `docs/01-artefacts/arc42/08-crosscutting/explanations/<topic>.md` | Explanations of cross-cutting concerns sit next to the canonical concern docs in arc42 §08, as didactic siblings |
| `user` (product users, journey readers) | `docs/01-artefacts/user-manual/explanation/<topic>.md` | Already the canonical Diátaxis Explanation home for end-user docs |

The `dev` location is a **sibling subdirectory** to the existing arc42 §08
concern files; the README in `docs/01-artefacts/arc42/08-crosscutting/` notes the
subdirectory's purpose so it is discoverable without changing the arc42
template.

## Front-matter contract for saved files

```yaml
---
audience: dev | user
topic: <kebab-topic>
source_adrs: [0001, 0007]          # ADRs whose decisions this translates
source_docs:                        # detailed-design files cited
  - docs/detailed-design/.../X.md
last_verified: YYYY-MM-DD           # date the explanation matched the code
status: Stable | Needs-Review       # auditor flags this when sources drift
---
```

`last_verified` is the lever for staleness detection: when an ADR or
source doc is updated, the auditor flags every explanation whose
`source_adrs` / `source_docs` overlap so a human can re-verify.

## Implementation note

This skill is **conversational and writes files** — it is not a router
to a sub-agent. The skill prompt itself contains the discovery /
translation / persist loop because the loop needs auto-loaded
`.claude/rules/` (writing style, docs placement) which sub-agents do not
inherit. See [`docs/AI_INSTRUCTIONS.md`](../../../docs/AI_INSTRUCTIONS.md)
and [`docs/WORKFLOW.md`](../../../docs/WORKFLOW.md) for the placement
protocol that the persist step follows.

---

## See also

- [Diátaxis — Explanation](https://diataxis.fr/explanation/) — the
  authoritative four-quadrant taxonomy
- [arc42 §8 Crosscutting Concepts](https://docs.arc42.org/section-8/) — the
  conceptual home for `dev` audience explanations
- [`docs/01-artefacts/user-manual/explanation/README-pentaglyph.md`](../../../docs/01-artefacts/user-manual/explanation/README-pentaglyph.md)
  — Explanation structure rules this skill obeys
- [/doc-fill](../doc-fill/SKILL.md) — when you want to write a fresh ADR
  instead of explaining an existing one
- [/diagram-render](../diagram-render/SKILL.md) — for canonical C4
  rendering; `/explain`'s Mermaid is didactic only
