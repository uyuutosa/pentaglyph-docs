---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-16
diataxis: tutorial
audience: first-time users
estimated-time: 30 minutes
---

# Getting started with pentaglyph

> **What you will accomplish in this tutorial:** scaffold a fresh `docs/` tree in a new project, read the two files that tell humans and AI agents what to do, and write your first PRD + ADR + module detailed-design — all in about 30 minutes.

This is a **tutorial**, not a reference. We hide trade-offs and alternatives. The goal is *first successful run*; you can read the explanation docs later to understand why each step exists.

---

## Before you start

You need:

- **Bun ≥ 1.1** or **Node ≥ 20** (the CLI works under either).
- An editor — ideally **[Claude Code](https://claude.ai/code)**, Cursor, or VS Code with Copilot. The tutorial uses Claude Code in its examples; the other editors work the same way with their own auto-load rule.
- About 30 minutes.

> Check Bun with `bun --version`. If not installed: `curl -fsSL https://bun.sh/install | bash`.

---

## Step 1 — Scaffold a new project

Pick any empty directory; we will use `~/tmp/my-app`.

```bash
mkdir -p ~/tmp/my-app
cd ~/tmp/my-app
bunx --bun @uyuutosa/pentaglyph init . --profile=standard --ai=claude --name="My App"
```

What just happened:

- `init` writes `docs/` and `.claude/rules/documentation.md`.
- `--profile=standard` includes arc42, C4 diagrams, detailed-design, API contracts, design-guide, impl-plans, postmortems, and reports. See [reference/profiles.md](../reference/profiles.md) for the other profiles.
- `--ai=claude` installs the Claude Code auto-load rule so that whenever Claude touches `docs/**`, it reads `docs/AI_INSTRUCTIONS.md` automatically.
- `--name` fills the `<placeholder>` slots in front-matter.

Verify:

```bash
ls docs/
# AI_INSTRUCTIONS.md  WORKFLOW.md  STRATEGY.md  INDEX.md  README.md
# arc42/  diagrams/  detailed-design/  design-guide/  api-contract/
# impl-plans/  postmortems/  reports/  templates/

ls .claude/rules/
# documentation.md
```

If those files are present, the scaffold worked.

---

## Step 2 — Read the two files that matter

Open these two files **before anything else**. They are pentaglyph's source of truth:

1. **[`docs/AI_INSTRUCTIONS.md`](../../template/docs/AI_INSTRUCTIONS.md)** — entry point for AI agents. It tells Claude/Cursor/Copilot how to decide where a new doc goes.
2. **[`docs/WORKFLOW.md`](../../template/docs/WORKFLOW.md)** — the *canonical* placement and lifecycle rules. When `AI_INSTRUCTIONS.md` says "see WORKFLOW.md §X", this is where it lands.

You do **not** need to memorise them. You just need to know they exist, and that humans and AI agents both consult the same two files.

A useful mental model:

```text
AI_INSTRUCTIONS.md     →  WORKFLOW.md  →  templates/
"you are an AI         "where does this  "what shape
 in a pentaglyph repo,  doc go and what   should the
 here is the protocol"  state does it     file have?"
                        transition through?"
```

---

## Step 3 — Write your first PRD

Pick something tiny — say, a "hello world" feature: a CLI that prints a greeting.

Open Claude Code in this directory. Because `--ai=claude` installed the auto-load rule, Claude already knows about pentaglyph. Ask it:

> "Read `docs/AI_INSTRUCTIONS.md` and `docs/WORKFLOW.md`, then write a PRD for a feature where `my-app greet <name>` prints `Hello, <name>!`. Place the file where pentaglyph rules say PRDs go. Set the front-matter status to Draft."

Claude should:

1. Read both files.
2. Copy `docs/templates/2_prd.md` as the starting shape.
3. Place the output at `docs/arc42/03-context-and-scope/prds/greet.md` (or whatever location `WORKFLOW.md §1` resolves to).
4. Fill in front-matter (`status: Draft`, `owner`, `last-reviewed`).

If it puts it somewhere else, that is a sign the protocol was not followed — gently push back and quote `WORKFLOW.md §1` at it. You should rarely have to.

> **Tip:** Do not write the PRD by hand on the first run. Watching how Claude places it teaches you the rules faster than reading them.

---

## Step 4 — Write your first ADR

PRDs answer *what/why*. ADRs answer *why this technical choice*. Let us decide on a trivial one: "we will print to stdout, not stderr".

Ask Claude:

> "We need an ADR recording the decision that `my-app greet` prints to stdout rather than stderr. Use the MADR v3.0 template. Place it under `docs/arc42/09-decisions/` with the next available NNNN prefix. Status should be `Proposed`."

You will see Claude:

- Find `docs/templates/5_adr.md` (the MADR template).
- Pick the next available number (likely `0001` if your tree is fresh).
- Fill in the four MADR sections: **Context**, **Decision**, **Consequences**, **Alternatives**.

The ADR will look intentionally minimal — that is correct for MADR v3.0. The point is *recording the decision and its alternatives*, not writing an essay.

> **Why this matters later:** six months from now when someone asks "why stdout?", the answer is one file lookup. No GroundHog Day debates. See [explanation/why-pentaglyph.md](../explanation/why-pentaglyph.md) for the full argument.

---

## Step 5 — Write your first Module Detailed Design

Now the *how*: the implementation spec for the `greet` command.

Ask Claude:

> "Write a Module Detailed Design for the `greet` command, using Template 3. Place it at `docs/detailed-design/greet.md`. Link it from `docs/arc42/05-building-blocks/` as a building-block child."

Claude will produce a file describing:

- Inputs / outputs / errors.
- The exact CLI flag list.
- A tiny runtime sequence (or a link to a use-case if you have one).
- Cross-links back to the PRD (Step 3) and the ADR (Step 4).

Three things now point at each other: PRD ↔ ADR ↔ Module DD. That is the **architecture spine** of pentaglyph.

---

## Step 6 — Make a code change and watch the doc change

This is the punchline of pentaglyph.

Now actually write `my-app/src/greet.ts`:

```typescript
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

In the **same PR**, you must update `docs/detailed-design/greet.md` if anything about the behaviour or interface differs from what you wrote in Step 5. If you implemented it exactly as specified, you may just bump the doc's `last-reviewed` date.

If you forget the doc update, the next person to review your PR will catch it — that is what [`WORKFLOW.md §2` Code change → doc update mapping](../../template/docs/WORKFLOW.md#2-code-change--doc-update-mapping) is for.

Ask Claude to verify:

> "Look at my staged diff. Does this PR satisfy pentaglyph's *code change → doc change* rule? Quote `WORKFLOW.md §2` and tell me what is missing if anything."

Claude will scan the diff and either bless the PR or list missing doc updates. This is the core habit pentaglyph builds.

---

## Step 7 — Where to go next

Congratulations — you have a working pentaglyph project with a four-document spine (PRD, ADR, Module DD, code). Next:

- **You will hit the question "which template?" a lot.** Read [how-to/choose-the-right-template.md](../how-to/choose-the-right-template.md) before you write your next doc.
- **You will want to prompt Claude better.** [how-to/prompt-cookbook.md](../how-to/prompt-cookbook.md) collects the high-leverage prompts.
- **You may want a different profile.** [reference/profiles.md](../reference/profiles.md) covers `minimal` / `standard` / `full`.
- **You may want to use this on an existing project.** [how-to/adopt-existing-project.md](../how-to/adopt-existing-project.md) shows the gradual-adoption path — *do not* try to retrofit pentaglyph in one PR.
- **You want to understand the philosophy.** [explanation/why-pentaglyph.md](../explanation/why-pentaglyph.md).

---

## What we deliberately skipped

Tutorials hide complexity on purpose. We did not cover:

- C4 diagrams (`docs/diagrams/c4/workspace.dsl`) — useful but not required for first-run.
- Volatile docs (`impl-plans/`, `postmortems/`, `reports/`) — covered in how-to guides.
- Lifecycle states beyond `Draft` (`Review` / `Done` / `Superseded`) — see [`WORKFLOW.md §4`](../../template/docs/WORKFLOW.md#4-lifecycle).
- The Diátaxis quadrants under `user-manual/` — those are for *your* end-user docs, not pentaglyph's.
- Other AI targets (`--ai=cursor` / `copilot` / `generic`). They work the same; only the auto-load file path differs.

If you find yourself reaching for any of those, you are now in **how-to / reference / explanation** territory. Welcome aboard.
