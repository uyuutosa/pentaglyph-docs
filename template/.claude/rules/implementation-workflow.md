---
paths:
  - "**"
---

# Implementation Workflow Rule (auto-loaded globally)

This rule governs **how AI agents and contributors approach implementation
work** during AI-assisted Claude Code sessions — planning a change,
executing it, integrating with the team, and reflecting after.

## Position in the layer architecture

This file is a **Layer ③ Automation** rule per
[ADR-0001](../../docs/01-artefacts/arc42/09-decisions/0001-adopt-five-layer-self-architecture.md)
(kit-authored operational conventions for the Claude Code automation
surface). It is **exempt from the bind-only constraint** that
[ADR-0002](../../docs/01-artefacts/arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md)
applies to Layers ⓪ Standards and ② Process — Layer ③ describes how
the kit *operates*, not external standards.

| Sibling rules                                                       | Layer | Binds a canon? |
| ------------------------------------------------------------------- | ----- | -------------- |
| [`version-control.md`](./version-control.md)                        | ③     | Yes — Git Flow (full binding in [`02-process/version-control.md`](../../docs/02-process/version-control.md)) |
| [`documentation.md`](./documentation.md)                            | ③     | Yes — arc42 / C4 / MADR / Diátaxis / TiSDD (via `STRATEGY.md §2`) |
| [`dialogue-style.md`](./dialogue-style.md)                          | ③     | No — kit-authored convention only |
| [`client-engagement.md`](./client-engagement.md)                    | ③     | Yes — PEL binder over 8 primitives (via `STRATEGY.md §2.6`) |
| **`implementation-workflow.md`** (this file)                         | **③** | **No — kit-authored convention; cross-references existing Layer ② bindings** |

The pattern this file follows is `dialogue-style.md`: a Layer ③
kit-authored rule with no Layer ② canon binding, because session-level
execution discipline does not yet have a single authoritative canon
(see the *External references* section below for inspirations and the
[`_future-bindings.md`](../../docs/02-process/_future-bindings.md)
backlog for candidates).

Downstream projects extend this rule by writing
[`docs/02-process/implementation-workflow.md`](../../docs/02-process/implementation-workflow.md)
with tool-specific bindings (ticket system / CI commands / skills
inventory / log locations). The kit-authored hard rules stay universal.

## Hard rules (kit-authored)

The following rules are pentaglyph-authored operational decisions. Where
a rule intersects with an externally bound canon, the binding file is
linked; the kit-authored rule extends the canon's operational mapping,
it does not re-author the canon itself.

1. **Simplicity first.** Make the smallest change that solves the
   problem. Do not refactor adjacent code, add abstractions for
   hypothetical futures, or introduce libraries unless necessary. If
   the diff feels large, justify each block in the PR description.

2. **No silent shortcuts.** Do not work around a failing test, hook,
   lint, or type error. Find the root cause and fix it, or escalate.
   `--no-verify`, `# type: ignore`, `// @ts-expect-error`,
   `eslint-disable`, and equivalent bypasses require either a PR
   comment justifying the exception or a follow-up ticket to remove
   them later. *Related Layer ② binding:*
   [`02-process/tdd-workflow.md`](../../docs/02-process/tdd-workflow.md)
   (failing tests are the red phase; do not skip green).

3. **Plan before coding for non-trivial work.** Any task with three or
   more distinct steps, or that touches a design decision, starts with
   a written plan in the project's planning artefact (the Claude Code
   `TodoWrite` list; an issue body; `tasks/todo.md`; an impl-plan file).
   Pause to re-plan when reality diverges.

4. **Skills first.** Before hand-rolling a multi-step operation (PR
   creation, bug fix workflow, deployment, code review, doc generation),
   check whether the project ships a Claude Code skill
   (`.claude/skills/`) that already covers it. Skills bake in
   verification steps and best practice; bypassing them re-introduces
   the bugs they prevent.

5. **Reflect on corrections.** When the user corrects your approach,
   record the rule in the project's lessons file (location declared in
   the downstream extension — commonly `tasks/lessons.md`, a docs/
   postmortems folder, or the project equivalent). Capture *why* (the
   failure mode that triggered the correction) and *how to apply* (when
   this rule fires next time).

6. **Verify before declaring done.** "Done" requires demonstration:
   tests pass, the app boots, the deploy succeeds, the doc renders.
   "It should work" is not done. Re-read the diff and ask: *would a
   senior engineer approve this?* *Related Layer ② binding:*
   [`02-process/dod-dor.md`](../../docs/02-process/dod-dor.md) (this
   rule operationalises Definition of Done for AI-driven changes).

7. **Bug reports start with logs.** When a bug is reported, read the
   logs, failing tests, and browser console first. Do not ask the user
   to repeat information that is already in the diagnostic surface.
   The downstream extension declares the project's primary log
   locations.

## Worktree strategy for long sessions

`git-worktree(1)` lets a single repository have multiple working trees
attached to different branches. The 30-minute threshold below is a
kit-authored operational decision, not part of any external canon.

### When to use a worktree

| Situation                                                              | Use worktree? |
| ---------------------------------------------------------------------- | ------------- |
| Short edit (< 30 minutes) on a feature branch in the main checkout     | No            |
| Long session (> 30 minutes) on a feature branch                        | **Yes**       |
| Parallel agents that each modify code                                  | **Yes** (one worktree per agent) |
| Parallel agents that only read code                                    | No            |
| Switching branches mid-session for a quick reference look              | Yes (read-only worktree at the reference SHA) |

### Why worktrees for long sessions

The main checkout is shared across IDE, hooks, terminal panes, and other
Claude Code processes. Any of them can issue `git checkout` against your
working branch while you have uncommitted work; the fix-up cost ranges
from "stash and recover" to "use `git fsck --unreachable` to find the
orphaned commit". Worktrees isolate each line of work so a `checkout`
in one tree cannot disturb another.

### Worktree lifecycle

```bash
# Create
git fetch origin develop --quiet
git worktree add -b feature/<description> <path> origin/develop

# Work
cd <path>
# ... commits ...

# Cleanup (after merge; see "Post-merge sync")
git worktree remove <path>
git branch -D feature/<description>
```

## Periodic integration

Sessions longer than 30 minutes, or feature branches that accumulate
many commits, drift from `develop`. Drift compounds — small conflicts
are cheap, large rebases are not.

The 30-minute sync cadence is a kit-authored operational decision.
External inspiration: Fowler's "Continuous Integration" (2006), applied
at the session level — see *External references* below.

### When to sync with `develop`

| Trigger                                                | Action                                       |
| ------------------------------------------------------ | -------------------------------------------- |
| Session start                                          | `git fetch origin develop`, inspect drift    |
| Every 30 minutes during long work                      | `git fetch origin develop && git merge`      |
| Immediately after a sub-agent that modifies code finishes | `git fetch origin develop && git merge`   |
| `git rev-list --count HEAD..origin/develop` ≥ 10       | Integrate before continuing                  |
| Phase boundary in a multi-phase plan                   | Integrate, then start the next phase         |

### Standard procedure

```bash
git status --short                          # 1. Ensure clean (or commit a WIP snapshot)
git fetch origin develop --prune            # 2. Fetch
git rev-list --count HEAD..origin/develop   # 3. Inspect drift
git merge origin/develop --no-ff            # 4. Merge (resolve conflicts if any)
```

Never run a merge while a sub-agent is editing files. Wait for the
sub-agent to finish, commit its output, then integrate.

### When conflicts compound, stop and split

If a single `git merge origin/develop` produces conflicts in 10+ files,
the PR is doing too much. Symptoms:

- The PR description has more than three distinct narrative threads.
- Reviewers will ask "what is this PR about?"
- The integration cost outweighs the change cost.

The remedy is to split: commit current work to a Draft PR, branch the
remainder, and continue in smaller pieces.

## Post-merge sync

When a PR completes (auto-merge or manual), the local checkout that
produced it must catch up:

```bash
git fetch origin develop --prune
git checkout develop && git pull --ff-only origin develop
git branch -D feature/<merged-branch> 2>/dev/null
git remote prune origin
git worktree remove <worktree-path> 2>/dev/null  # if a worktree was used
```

Skip only when the PR ended `abandoned` (delete the branch but no
`develop` sync needed) or when uncommitted important changes block
`checkout` (stash or commit first).

The next task must not start against a stale `develop`. This is the
single most common cause of "why did my PR conflict immediately on
push?" — the answer is almost always "you forked from an old `develop`".

## Pre-work checks (Stage 0)

Before creating a new ticket, artefact, or branch, verify that the work
does not duplicate existing artefacts. The detailed sequence is
tool-specific (which ticket system, which spec format, which sprint
cadence) and lives in the downstream extension. The *meta-pattern* —
applicable everywhere — is:

1. **Search before creating.** Grep the codebase, list existing tickets,
   read the relevant section of `docs/01-artefacts/detailed-design/`.
2. **Pair specs with code.** A spec marked "Implemented" with no
   matching code is rot. Fix the rot before adding more work on top.
3. **Snapshot the lifecycle state.** Before starting, know which ADRs,
   features, and plans are in flight — your change should not silently
   contradict an Accepted decision.

Project-specific Stage 0 sequences (e.g. ticket-system traversal,
story-point estimation, sprint assignment, parent-link enforcement)
belong in
[`docs/02-process/implementation-workflow.md`](../../docs/02-process/implementation-workflow.md).
The work-item-lifecycle complement to Stage 0 is documented in
[`02-process/ai-augmented-lifecycle.md`](../../docs/02-process/ai-augmented-lifecycle.md)
(who can transition a work item between states).

## Sub-agent strategy

Sub-agents (Claude Code's `Task` tool) are valuable for two reasons:

1. **Context isolation.** A sub-agent's working set does not pollute the
   orchestrating agent's context window. Use them for research, codebase
   exploration, and parallel analysis.
2. **Computational depth.** A focused sub-agent can spend many turns on
   a single problem without the orchestrator's attention drifting.

Apply these rules:

- **One sub-agent, one task.** Multi-tasking sub-agents lose focus.
- **Brief sub-agents like a colleague:** state goal, context, constraints,
  expected output shape. Sub-agents do not see the orchestrating
  conversation.
- **Parallel modifying sub-agents need worktrees.** If two sub-agents
  both edit code, give each its own worktree (see above) so their edits
  do not collide.
- **Sub-agents do not see `CLAUDE.md`.** Constraints they must follow
  must be either in the sub-agent's definition (`.claude/agents/*.md`)
  or repeated in the brief.

## External references (informational, not formal bindings)

The hard rules above are *kit-authored*. They are informed by — but do
not formally bind — the external sources below. Per
[ADR-0002](../../docs/01-artefacts/arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md),
a formal Layer ② binding requires a dedicated `02-process/<canon>.md`
file with the 6-section template; promoting any of these references to
that status follows the screening process in
[`02-process/_binding-a-new-process.md`](../../docs/02-process/_binding-a-new-process.md)
and the backlog in
[`02-process/_future-bindings.md`](../../docs/02-process/_future-bindings.md).

| Source                                                                                                          | Influences which hard rule(s) |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Hunt & Thomas, *The Pragmatic Programmer* (1999, 20th-anniv ed. 2019)                                            | §1 (simplicity), §4 (DRY/skills) |
| Polya, *How to Solve It* (1945)                                                                                  | §3 (plan before coding)      |
| Fowler, "Continuous Integration" (2006) <https://martinfowler.com/articles/continuousIntegration.html>            | Periodic integration cadence |
| `git-worktree(1)` <https://git-scm.com/docs/git-worktree>                                                        | Worktree strategy            |
| Google SRE Book, *Postmortem Culture* <https://sre.google/sre-book/postmortem-culture/>                          | §5 (reflect on corrections)  |
| PMI, *PMBOK Guide* (7th ed., 2021) — Lessons-Learned Register                                                    | §5 (reflect on corrections)  |

For canons that *are* formally bound by pentaglyph and intersect with
this rule, see:

- [`02-process/dod-dor.md`](../../docs/02-process/dod-dor.md) — Scrum
  Definition of Done (related to hard rule §6).
- [`02-process/tdd-workflow.md`](../../docs/02-process/tdd-workflow.md)
  — Beck TDD (related to hard rule §2).
- [`02-process/dev-cycle.md`](../../docs/02-process/dev-cycle.md) —
  Scrum Guide 2020 (related to hard rule §3 planning cadence).
- [`02-process/version-control.md`](../../docs/02-process/version-control.md)
  — Git Flow (referenced by worktree / periodic-integration / post-merge
  sections).

## Project-specific extensions

Each downstream project supplements this rule with at minimum:

- **Ticket-system bindings** (Jira / Linear / GitHub Issues / GitLab
  Issues / Azure DevOps Boards / …): Stage 0 sequence, ticket-to-PR
  linking, state-transition rules, work-item-type taxonomy. See also
  [`02-process/ai-augmented-lifecycle.md`](../../docs/02-process/ai-augmented-lifecycle.md)
  for the canonical lifecycle binding.
- **CI/CD bindings**: which commands run on `develop` push, which on PR
  open, which on tag, where logs appear.
- **Project skills inventory** (`.claude/skills/`): which generic
  patterns are already covered by a skill, so contributors do not
  hand-roll them.
- **Log locations**: where to look first when investigating a bug.
- **Project lessons-file location**: the canonical place for §Hard-rule 5
  reflections.

Those extensions belong in
[`docs/02-process/implementation-workflow.md`](../../docs/02-process/implementation-workflow.md).
This file stays universal.
