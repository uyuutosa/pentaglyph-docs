---
status: Proposed
owner: <placeholder>
last-reviewed: 2026-05-21
---

# ADR-0012: Add `implementation-workflow.md` as a Layer ③ Automation rule for AI-assisted Claude Code sessions

| Metadata  | Value                                                          |
| --------- | -------------------------------------------------------------- |
| Status    | **Proposed**                                                   |
| Type      | ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit     |
| Date      | 2026-05-21                                                     |
| Deciders  | pentaglyph upstream maintainer + adopting project POs           |
| Consulted | downstream consumers running Claude Code on real projects       |
| Informed  | all pentaglyph users                                            |
| Ticket    | <placeholder>                                                  |

---

## Context and Problem Statement

`.claude/rules/` currently ships **four files**
([`client-engagement.md`](../../../../.claude/rules/client-engagement.md),
[`dialogue-style.md`](../../../.claude/rules/dialogue-style.md),
[`documentation.md`](../../../.claude/rules/documentation.md),
[`version-control.md`](../../../.claude/rules/version-control.md)). Each
covers a distinct concern; the count is kept low on purpose.

Real-world downstream adopters running Claude Code on production code
have repeatedly grown a **fifth rule of their own**, covering what is
best described as *session-level execution discipline for AI-assisted
work*:

- Simplicity-first / no-shortcut / verify-before-done principles applied
  to AI-generated diffs.
- Plan-before-coding cadence applied to Claude Code sessions.
- Worktree strategy for long sessions (avoiding orphaned commits when
  the main checkout's branch gets swapped by an IDE / hook / parallel
  process).
- Periodic `develop` re-integration during long sessions.
- Post-merge local sync to avoid stale-`develop` forks for the next
  task.
- Sub-agent strategy (one task per sub-agent, briefing discipline, the
  fact that sub-agents cannot read `CLAUDE.md`).
- "Skills first" — use the project's Claude Code skills instead of
  hand-rolling multi-step operations.
- Reflection loop — record corrections to a lessons file.

Observed concrete instances of this drift:

- The AI-clone PoC project's `.claude/rules/workflow.md` (~280 lines)
  was authored 2026-03-06, predating any pentaglyph subtree, and grew
  organically to cover all of the above.
- Multiple other downstream Claude Code projects (different teams) have
  shipped near-identical "Stage 0 check" sequences and worktree
  guidance with subtle drift.

Because none of these concerns map cleanly onto the four existing rules,
every adopter is forced to write their own. The result:

- Duplication across projects (the generic operational discipline is
  identical; only the tool bindings differ).
- Drift between projects (one team's worktree threshold contradicts
  another's).
- Adopters who *don't* write the rule lose Claude Code sessions to
  preventable failures (orphaned commits, stale `develop`, hand-rolled
  duplications of existing skills, unrecorded corrections).

A canonical home for the *generic operational discipline* is missing
from the kit.

### What this rule is **not**

This rule does **not** introduce a new Layer ② Process canon binding.
The temptation to do so was considered and rejected because the
session-level discipline above is not anchored by a single external
canon — it draws from at least six different sources (Pragmatic
Programmer, Polya, Fowler CI, git-worktree(1), Google SRE Postmortem
Culture, PMBOK Lessons-Learned Register). Promoting any of those to a
formal Layer ② binding requires the screening process in
[`02-process/_binding-a-new-process.md`](../../../02-process/_binding-a-new-process.md)
and PO demand, and is tracked separately in
[`02-process/_future-bindings.md`](../../../02-process/_future-bindings.md).

---

## Decision Drivers

- **DD-1 (highest)**: Stop duplication across pentaglyph downstreams
  *without* prematurely binding canons that have not been screened per
  [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md).
- **DD-2**: Preserve the layer architecture from
  [ADR-0001](0001-adopt-five-layer-self-architecture.md) — place the
  rule in the layer whose contract it actually matches.
- **DD-3**: Keep the `.claude/rules/` surface area learnable — five
  files is acceptable, ten is not.
- **DD-4**: Allow downstream tool bindings (ADO / Jira / Linear / GitHub
  Issues / log paths / skill inventories) to live in `docs/02-process/`,
  not in the rule itself, so the universal rule stays portable.

---

## Considered Options

1. **Status quo** — leave `.claude/rules/` at four files; every
   downstream writes its own.
2. **Append to `version-control.md`** — extend the existing Layer ③
   rule with execution-discipline content.
3. **Add a Layer ② Process binding** — create
   `02-process/implementation-workflow.md` that binds one of the six
   inspiration canons (e.g. Fowler CI 2006) plus a matching Layer ③
   rule.
4. **Add the rule as a Layer ③ Automation rule only**, matching the
   `dialogue-style.md` precedent (kit-authored convention with no
   Layer ② binding), with cross-references to existing Layer ② canon
   bindings where they intersect (chosen).
5. **Move execution discipline entirely into `docs/02-process/` as a
   process doc** — no auto-loaded rule.

---

## Decision Outcome

**Chosen option: Option 4 — add
[`.claude/rules/implementation-workflow.md`](../../../../.claude/rules/implementation-workflow.md)
as a 5th Layer ③ Automation rule, kit-authored, with explicit
cross-references to existing Layer ② canon bindings.**

The rule sits in **Layer ③ Automation** per
[ADR-0001](0001-adopt-five-layer-self-architecture.md) §3.2. Per
[ADR-0002 §Decision Outcome](0002-bind-canons-only-no-self-authored-standards.md#decision-outcome),
Layer ③ is **exempt from the bind-only constraint** — kit-meta-docs
(CLI, rules, agents, governance, metrics) are authored by pentaglyph
because they describe the kit itself, not external concerns.

The rule:

- Holds kit-authored hard rules (Skills first / worktree strategy /
  sub-agent strategy / periodic-integration cadence / post-merge sync /
  reflect-on-corrections / Stage 0 meta-pattern).
- Cross-references existing Layer ② canon bindings where they intersect
  (e.g. hard rule §6 "verify before done" links to
  [`02-process/dod-dor.md`](../../../02-process/dod-dor.md)).
- Cites external inspirations (Pragmatic Programmer / Polya / Fowler /
  git-worktree(1) / Google SRE / PMBOK) under an explicit *External
  references (informational, not formal bindings)* heading.
- Pushes all tool-specific bindings (ticket systems, CI commands, log
  locations, skill inventories, lessons-file paths) to a downstream
  `docs/02-process/implementation-workflow.md` extension.

Promotion of any informational reference to a formal Layer ② binding is
**out of scope for this ADR** and follows the screening in
[`02-process/_binding-a-new-process.md`](../../../02-process/_binding-a-new-process.md);
the canons that meet the four-axis criterion will be added to
[`02-process/_future-bindings.md`](../../../02-process/_future-bindings.md)
as backlog candidates in a separate change.

### Y-statement summary

> In the context of **AI-assisted Claude Code sessions on
> pentaglyph-adopted projects**, facing **every downstream growing a
> near-identical "session execution discipline" rule with subtle drift
> and the temptation to over-bind canons in the process**, we decided
> for **a 5th `.claude/rules/` file (Layer ③ Automation), kit-authored,
> with cross-references to existing Layer ② canon bindings and
> informational citations of unbound canons, matching the
> `dialogue-style.md` precedent**, to achieve **deduplication, layer
> integrity, and a canonical home for session-level execution
> discipline**, accepting **a five-file `.claude/rules/` surface area
> (up from four) and the obligation to keep tool-specific bindings out
> of the universal rule**.

---

## Pros and Cons of the Options

### Option 1: Status quo

- Pros:
  - Zero change to upstream surface area.
- Cons:
  - Duplication compounds: every new pentaglyph adopter re-discovers
    the same orphaned-commit / stale-`develop` / sub-agent-context-loss
    lessons the hard way.
  - Adopters who skip the rule lose work to preventable Claude Code
    session failures.
  - The implicit "fifth rule" already exists in every downstream;
    pretending it does not is denial, not minimalism.

### Option 2: Append to `version-control.md`

- Pros:
  - No new file.
- Cons:
  - Conflates branching topology (a Git Flow concern) with session
    execution discipline (a Claude Code concern). MECE violation
    against [ADR-0004](0004-layer-separation-contracts.md) Layer ③
    cohesion guidance.
  - Cohesion drops: readers looking for "how should I structure my
    session?" cannot find it in a file titled `version-control.md`.
  - The append would roughly double `version-control.md`'s size while
    making both halves harder to find.

### Option 3: Add as a Layer ② Process binding

- Pros:
  - Forces canon-binding rigor (each rule traceable to an authoritative
    source).
- Cons:
  - Session-level execution discipline has no single canon; binding
    only one of the six inspirations would be arbitrary and would
    leave the other five as ungoverned content in a file whose layer
    forbids it.
  - Violates [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md)
    if multiple canons are paraphrased in one Layer ② file without
    `_binding-a-new-process.md` screening.
  - Prematurely commits the kit to formal bindings of canons not yet
    in [`_future-bindings.md`](../../../02-process/_future-bindings.md).

### Option 4: Layer ③ Automation rule only (chosen)

- Pros:
  - Matches the architectural intent of Layer ③ per
    [ADR-0001](0001-adopt-five-layer-self-architecture.md) and
    [ADR-0004](0004-layer-separation-contracts.md): kit-authored
    operational conventions for automation surfaces.
  - Honours [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md)
    by *not* binding canons in a layer whose contract is "describe the
    kit's own automation".
  - Has a direct precedent: `dialogue-style.md` is a Layer ③ rule with
    no Layer ② counterpart, and is the kit's standing example of how
    to ship a session-behaviour rule without binding a canon.
  - Downstream extension path matches `version-control.md` ↔
    `02-process/version-control.md`, so adopters already know the
    pattern.
- Cons:
  - Surface area grows from four rules to five. Future maintainers
    must resist drift back to "ten rules".
  - Some content (e.g. the 30-minute worktree threshold, the 30-minute
    sync cadence) is a kit-authored operational decision rather than a
    canon citation; the rule must mark these clearly to prevent
    confusion with bound canons.

### Option 5: Process doc only (no auto-loaded rule)

- Pros:
  - Preserves the "rules layer is small" intuition absolutely.
- Cons:
  - Process docs are *not auto-loaded* by Claude Code — they only fire
    when an agent reads them explicitly. The whole point of an
    auto-loaded rule is to make the behaviour the default, especially
    for new contributors and AI agents.
  - Adopters still duplicate work in their own `02-process/` files;
    the deduplication win is lost.

---

## Consequences

### Positive

- New pentaglyph adopters inherit the execution discipline by default,
  without having to discover the same failure modes one orphaned-commit
  incident at a time.
- Downstream `02-process/implementation-workflow.md` files become small
  (tool bindings only) instead of duplicating ~200 lines of operational
  discipline.
- The mapping "Layer ③ auto-loaded rule = universal kit-authored
  operational conventions; `docs/02-process/<name>.md` = canon binding
  or tool-specific extension" becomes consistent across `version-control`,
  `documentation`, `client-engagement`, and now `implementation-workflow`.
- The kit gains a working example of "Layer ③ rule referencing existing
  Layer ② bindings without re-binding them", which clarifies the layer
  contract for future rules.

### Negative

- Five auto-loaded rules instead of four — a slightly larger context
  footprint at every Claude Code session start. Judged worth it because
  the rule prevents whole categories of session-level data loss.
- Future contributors will be tempted to add a sixth, seventh rule.
  Maintainers must explicitly justify additions against ADR-0001
  (does it belong in Layer ③?) and ADR-0002 (does it need a Layer ②
  binding first?).
- The kit-authored thresholds (30-minute worktree, 30-minute sync) are
  pentaglyph opinions rather than industry-standard numbers; downstream
  may want to adjust them in their `02-process/` extension. This is by
  design, but must be discoverable.

### Neutral

- Existing four rules are untouched.
- Downstream `.claude/rules/<project>-workflow.md` files (where they
  exist) can be slimmed to retain only tool-specific bindings, or fully
  removed in favour of `02-process/implementation-workflow.md`.

### Follow-ups

- [ ] Each downstream that already ships a "workflow"-style rule audits
      it, lifts the generic content into the new upstream rule via a
      PR, and keeps only tool bindings locally. (Per-downstream
      tickets.)
- [ ] In a separate change, add Fowler CI 2006 / Google SRE Postmortem
      Culture / PMBOK Lessons-Learned Register to
      [`02-process/_future-bindings.md`](../../../02-process/_future-bindings.md)
      as backlog candidates (currently absent from the backlog).
- [ ] Update `STRATEGY.md` to mention the five-rule surface area
      (was: four) and the precedent that Layer ③ rules may have no
      Layer ② counterpart when no single canon applies.

---

## Compliance / Validation

- **Verification:** No section of
  [`implementation-workflow.md`](../../../../.claude/rules/implementation-workflow.md)
  paraphrases an unbound canon's core definitions. The *External
  references* section cites sources informally; rules drawing on bound
  canons link to the corresponding `02-process/` file.
- **Verification:** No `az` / `gh` / `glab` / `jira` / ticket-system-
  specific commands appear in the upstream rule — they live in
  downstream `02-process/implementation-workflow.md` extensions only.
- **Verification:** Kit-authored thresholds (30-minute worktree,
  30-minute sync) appear with explicit *"kit-authored operational
  decision"* framing, not as if they were canon prescriptions.
- **Frequency:** Per-PR review when editing
  `.claude/rules/implementation-workflow.md`.

---

## More Information

### Related ADRs

- Builds on:
  [ADR-0001](0001-adopt-five-layer-self-architecture.md) — places the
  rule in Layer ③ Automation.
- Constrained by:
  [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md) — the
  new rule must not formally bind unbound canons; only the
  cross-references to existing bindings count as "binding".
- Constrained by:
  [ADR-0004](0004-layer-separation-contracts.md) — Layer ③ must not
  invent new bindings or template formats.
- Complementary:
  [ADR-0005](0005-surface-implicit-process-layer.md) — surfacing
  previously implicit processes; this ADR surfaces session-level
  execution discipline that downstreams were quietly re-inventing.
- Complementary:
  [ADR-0010](0010-explicit-layer-prefixed-directories.md) — Layer ②
  directory naming convention referenced from this file.

### References

- Hunt, A. & Thomas, D. (1999, 2019). *The Pragmatic Programmer*.
  Addison-Wesley.
- Polya, G. (1945). *How to Solve It*. Princeton University Press.
- Fowler, M. (2006). "Continuous Integration".
  <https://martinfowler.com/articles/continuousIntegration.html>
- Git project. `git-worktree(1)`.
  <https://git-scm.com/docs/git-worktree>
- Schwaber, K. & Sutherland, J. (2020). *Scrum Guide*.
  <https://scrumguides.org/scrum-guide.html#increment>
- Google SRE Book. *Postmortem Culture: Learning from Failure*.
  <https://sre.google/sre-book/postmortem-culture/>
- PMI (2021). *PMBOK Guide* (7th ed.) — Lessons-Learned Register.
