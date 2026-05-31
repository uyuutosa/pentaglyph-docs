---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-16
diataxis: explanation
audience: anyone wondering whether pentaglyph is worth adopting
---

# Why pentaglyph exists

> **What this is:** the long-form *why*. If you only want to use the tool, the [tutorial](../tutorials/getting-started.md) and the [how-to guides](../how-to/) are enough. This page exists for the moments when you wonder *"do we actually need this?"* — usually a few weeks in, when the discipline starts to feel like overhead.

This is an **explanation**, not a tutorial. We will go slowly and we will not be neutral. Pentaglyph is opinionated software; the opinion is in this file.

---

## The shape of the problem

AI coding assistants — Claude, Cursor, Copilot, and the agents that follow — have inverted the economics of software development in a specific way. Generating code is now cheap. Reading, reviewing, and *trusting* code is not.

The consequence is a class of failure that did not exist in the same volume before:

1. **Velocity outpaces comprehension.** A team can ship 5× the diffs but understand 1× of them. The other 4× pass through review without anyone really seeing the implications.
2. **Implicit decisions accumulate.** Every diff makes architectural choices — what to put where, what to couple, what to abstract. When humans write code, those choices are slow enough to surface in conversation. When an AI agent writes them, they happen silently.
3. **Documentation rots faster.** AI agents update the doc that names a function but miss the doc that *describes the system the function lives in*. The first stays accurate; the second decays.
4. **The agent's next session has no memory of the last one.** Without a written record of *why* the last decision was made, the next agent re-makes the decision from scratch — often differently.

These failures are not new. They are the same failures Fred Brooks described in *The Mythical Man-Month*. AI agents make them an order of magnitude worse, and they make them happen on a timescale of weeks rather than years.

---

## Why "just write docs" is not the answer

Every team that has tried to fix this with discipline alone has discovered the same pattern:

- The team agrees docs matter. ✅
- Someone writes a "documentation guidelines" page. ✅
- People follow it for two weeks. ✅
- Then a deadline hits. Someone skips a doc update "just this once". ⚠️
- A month later, half the docs are stale. The other half are wrong. ❌
- The team concludes "docs do not work for us" and gives up.

The failure mode is not laziness. It is that the discipline has no *teeth*. There is no PR check that says "this diff changed `src/auth/handler.ts` but did not change `docs/auth.md`". There is no agent reminder that says "you are about to write a new ADR but did not check whether 0007 already covers this". There is no shared vocabulary that says "this thing you are writing is a PRD, not a Module Detailed Design, and it goes *there*".

Pentaglyph is an attempt to add teeth.

---

## The thesis

Pentaglyph proposes that the right unit of documentation discipline is not the *individual doc* but the *protocol*: a deterministic rule for which kind of doc goes where, what state it transitions through, and which artefact the AI agent must produce when given a code change.

If the protocol is precise enough:

- An AI agent can apply it mechanically, with no project context.
- A reviewer can spot violations on sight, without re-deriving the rules.
- A new team member can be productive on documentation work within an hour.

The protocol does *not* need to be elaborate. It needs to be **explicit, written down, and shared between humans and AI agents in the same form**. That last clause is the design crux. Pentaglyph is not a doc system that AI happens to be able to read; it is a doc system designed so that the same `WORKFLOW.md` file is both the human's reference and the AI agent's instructions.

---

## Why five standards, not one

When pentaglyph was designed, an obvious alternative was to invent a new layout from scratch — a single, self-consistent meta-standard. We rejected that for one reason: **AI agents have already learned the existing standards**.

The five standards pentaglyph binds — [arc42](https://arc42.org), [C4](https://c4model.com), [MADR](https://adr.github.io/madr/), [Diátaxis](https://diataxis.fr), [TiSDD](https://www.thisisservicedesigndoing.com/methods) — each have years of public material, examples, and analyses in the training corpus of every major LLM. When you tell Claude "write an ADR in MADR v3.0", it knows what that means. When you tell it "write the §5 Building Blocks view", it knows what that means.

A new meta-standard, however elegant, would have to be taught from scratch every session. Pentaglyph's bet is that **standing on the shoulders of five well-known standards beats inventing a sixth, even if the sixth is in some abstract sense "better"**.

This is also why pentaglyph's contribution is deliberately small. The five standards are authoritative; pentaglyph does not re-explain them. The kit only adds:

1. Concrete file layout — *which directory each standard lives in*.
2. One canonical workflow — *when to write what, where to put it, what state it transitions through*.
3. Per-directory AI instructions — *so an LLM can place new content correctly with zero project context*.
4. A CLI to scaffold them.

That is it. The 80% of pentaglyph that you read comes from the underlying standards. The 20% that pentaglyph itself contributes is the *binding* — the mechanism that makes the standards work together as a single discipline.

For deeper rationale on each standard's role, see [`../../../../template/docs/STRATEGY.md`](../../../../template/docs/STRATEGY.md).

---

## Why *Code change → doc change* is the central rule

Of every rule in `WORKFLOW.md`, the most important one is the simplest:

> **Code change implies doc change in the same PR.**

Every other rule serves this one. Layered taxonomy serves it (you cannot know which doc to update if there is no layout). Templates serve it (you cannot update consistently if every doc is shaped differently). Front-matter serves it (you cannot machine-verify currency without machine-readable metadata).

The rule has teeth in three places:

1. **PR review.** Diffs that touch `src/` without touching the matching `docs/` file get sent back. Not aspirationally — *actually*.
2. **AI agent prompts.** The "audit my diff" prompt in the [cookbook](../how-to/prompt-cookbook.md) makes the check mechanical.
3. **Pre-commit / CI hooks.** Optional but available — a hook that fails when source-doc pairs drift.

Without this rule, every other piece of the kit is decoration. With it, the kit produces a particular long-term property: *the documentation tells the truth about the system*. That property is what makes the docs worth reading at all.

---

## Three objections worth taking seriously

### Objection 1 — "This is overhead. We will move slower."

Yes, in the short run. A PR that previously took 20 minutes now takes 25 minutes because you write 5 minutes of doc updates.

In the long run, the math inverts. A bug investigation that previously took two days because nobody remembered why the auth layer was structured this way now takes 20 minutes because there is an ADR. A new hire who previously took two weeks to be productive now takes three days because the arc42 §5 building-blocks view actually describes the current system.

The break-even point in practice is somewhere around the **third month**. Below that, pentaglyph feels like overhead. Above it, removing pentaglyph would feel like removing the build system.

If your project lifespan is below 90 days, pentaglyph is genuinely not worth it. See the *"when not to adopt"* section in [adopt-existing-project.md §When not to adopt pentaglyph](../how-to/adopt-existing-project.md#when-not-to-adopt-pentaglyph).

### Objection 2 — "AI agents will eventually do this without scaffolding."

Maybe. Probably even. But the scaffold is not the *only* thing pentaglyph provides — it provides a *shared vocabulary between humans and the AI agent*. Even when the agent does not strictly need the scaffold, the humans on the PR still need to be able to say *"this is a PRD, not a Module DD"* in a way that everyone agrees on.

The CLI and the templates are removable. The protocol is not. Pentaglyph's bet is that the protocol survives the next two model generations and the CLI does not. If pentaglyph reaches the day where AI agents need none of the scaffolding, only the workflow document and the standard links survive — and that is a successful outcome, not a failure.

### Objection 3 — "Five standards is too many. Why not just arc42?"

Each of the five standards answers a different question, and removing any of them creates a gap. arc42 has no opinion on ADRs (MADR fills it). arc42 has no opinion on end-user docs (Diátaxis fills it). arc42 has no opinion on service-level customer experience (TiSDD fills it). arc42 has no opinion on multi-zoom-level diagrams (C4 fills it).

You can run pentaglyph with `--profile=minimal`, which gives you only the architecture spine (arc42 + ADRs). That is the legitimate "just arc42-ish" mode. Adding the other layers is opportunistic, not mandatory. See [reference/profiles.md](../reference/profiles.md).

---

## Pentaglyph as a documentation operating system

A useful framing — perhaps a slight overreach but worth saying once — is that pentaglyph is not a doc template. It is a **documentation operating system**:

- **Templates** are the file formats.
- **Directory layout** is the filesystem.
- **WORKFLOW.md** is the kernel.
- **AI_INSTRUCTIONS.md** is the system call interface for AI agents.
- **Lifecycle states** are the process states.
- **The CLI** is the installer.
- **The auto-load rules** are device drivers — they make a specific AI agent compatible with the kernel.

Under this framing, "writing docs" is not the task. "Running a structured documentation workflow against a codebase" is the task. Pentaglyph is the OS that hosts that workflow. The templates and directories are just the surfaces you happen to touch.

This framing matters because it answers the *"where does pentaglyph end?"* question. Pentaglyph ends where the workflow ends. Anything that affects the workflow — naming conventions, lifecycle states, front-matter schemas, AI agent rules — is inside pentaglyph. Anything that does not — the actual content of your docs, your product domain knowledge, your team conventions — is outside. The kit does not aspire to capture the latter, and it should not.

---

## What this means for you

If you are reading this page because pentaglyph is starting to feel like overhead — that is the expected curve, and it inverts at month three. Trust the protocol for one more sprint.

If you are reading because you are evaluating pentaglyph — the question is not "does our team need documentation?", it is *"are we shipping enough code, fast enough, with enough AI involvement, that the protocol's teeth pay off?"* For most teams using AI agents seriously, the answer is yes.

If you are reading because you want to extend pentaglyph — the rule is one. **Whatever you add must be a property of the workflow, not a property of the docs.** Add a lifecycle state, add an AI rule, add a directory whose meaning is part of the protocol. Do not add a template just because you happen to like its shape. The kit's value is in its constraints; loosening them silently is the most common failure mode.

---

## Related

- [`../../../../template/docs/STRATEGY.md`](../../../../template/docs/STRATEGY.md) — the kit's own taxonomy / layered architecture
- [`../../../../template/docs/WORKFLOW.md`](../../../../template/docs/WORKFLOW.md) — the canonical workflow this page argues for
- [tutorials/getting-started.md](../tutorials/getting-started.md) — turn the argument into a working setup
- [how-to/adopt-existing-project.md](../how-to/adopt-existing-project.md) — the gradual-adoption path
- [explanation/why-five-standards.md](./why-five-standards.md) — per-standard rationale
- [explanation/why-code-change-doc-change.md](./why-code-change-doc-change.md) — full argument for the central rule
