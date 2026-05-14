---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
layer: 4
---

# Contributing to pentaglyph (upstream contribution flow)

> **Layer ④ Governance.** Defines how external contributions reach the pentaglyph kit at <https://github.com/uyuutosa/pentaglyph-docs.git>. Downstream projects adapting the kit for their own use override this file to describe their internal contribution flow.

## What can be contributed?

| Type | Example | Where it lands |
| --- | --- | --- |
| **New template** (Type 12+) | A scenario-table AC template alternative to G/W/T | `templates/N_*.md` + entry in `templates/README.md` |
| **New process binding** (Layer ②) | DORA, SRE, Lean Startup binding from `_future-bindings.md` backlog | `design-guide/<canon>.md` per `_binding-a-new-process.md` template |
| **Governance refinement** (Layer ④) | Multi-team RACI variant; stricter ADR Accept protocol | `governance/<topic>.md` |
| **Automation enhancement** (Layer ③) | New CLI sub-command, new `.claude/agent/`, new `scripts/docs/` lint | `cli/src/commands/`, `.claude/agents/`, `scripts/docs/` |
| **Self-ADR** (kit-meta decision) | Layer ⑤ Measurement activation, new bind exception | `arc42/09-decisions/NNNN-*.md` |
| **Bug fix** | Typo / broken link / template glitch | Inline fix |
| **Documentation improvement** | Clarification of existing kit docs | Inline edit |

## What CANNOT be upstreamed

Per [ADR-0002](../arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md):

- **In-house process standards** (no external canon URL). Keep in downstream `design-guide/` only.
- **Project-specific naming / styling**. Keep in downstream `design-guide/coding-style.md`.
- **Customer-domain specifics**. The kit stays domain-neutral.

## Contribution flow (high level)

```
┌──────────────────────────────────────────────────────────────────────┐
│  1. Open issue describing the proposed contribution                  │
│     (template + process binding + ADR types require pre-discussion)  │
├──────────────────────────────────────────────────────────────────────┤
│  2. Author drafts changes on a fork branch (or downstream subtree)   │
├──────────────────────────────────────────────────────────────────────┤
│  3. Self-check against the §9.1 four-axis criterion (ADR-0003)       │
│     and the format rules (e.g. _binding-a-new-process.md template)   │
├──────────────────────────────────────────────────────────────────────┤
│  4. Open PR with the AI-augmented PR template fields filled          │
│     (per design-guide/ai-augmented-pr.md)                            │
├──────────────────────────────────────────────────────────────────────┤
│  5. Reviewer checks structural + substantive criteria                │
│     (per governance/adr-accept-protocol.md for ADR-bearing PRs)      │
├──────────────────────────────────────────────────────────────────────┤
│  6. Upstream maintainer accepts or rejects                           │
└──────────────────────────────────────────────────────────────────────┘
```

## Detailed steps

### Step 1: Open an issue

For non-trivial contributions (anything beyond a typo / link fix), open a GitHub issue first. Describe:

- Which kit area is affected.
- The motivation (what problem does this solve?).
- The proposed approach (file additions / changes).
- Whether you have a working prototype in a downstream project that demonstrates the value.

The maintainer may decline at this stage if the proposal fails the four-axis criterion. This saves you implementation time on something that won't be accepted.

### Step 2: Drafting changes

Two paths:

**Path A — Fork on GitHub**:

```bash
# Fork uyuutosa/pentaglyph-docs to your-username/pentaglyph-docs on GitHub UI
git clone https://github.com/<your-username>/pentaglyph-docs.git
cd pentaglyph-docs
git checkout -b feature/<short-description>
# ... make changes ...
git push -u origin feature/<short-description>
# Open PR from your-username/pentaglyph-docs:feature/<X> to uyuutosa/pentaglyph-docs:main
```

**Path B — Downstream subtree push** (for projects already using pentaglyph as a `libs/pentaglyph-docs/` subtree):

```bash
# In the downstream project, after authoring changes in libs/pentaglyph-docs/
git subtree split --prefix=libs/pentaglyph-docs --rejoin -b extract-<topic>
# Push the extracted branch to a fork
git push <your-fork-remote> extract-<topic>:refs/heads/feature/<short-description>
# Open PR from there
```

The downstream subtree path is documented in the upstream kit because pentaglyph itself is dogfooding the pattern — see this kit's own [`impl-plans/2026-05-14_pentaglyph-self-architecture-roadmap.md`](../impl-plans/2026-05-14_pentaglyph-self-architecture-roadmap.md) §10 PR strategy.

### Step 3: Self-check

Before opening the PR, verify:

- [ ] **Structure**: matches the relevant template (`_binding-a-new-process.md` for Layer ② bindings; MADR v3.0 strict for ADRs; `12_governance-decision.md` for Layer ④ changes).
- [ ] **Four-axis criterion** (ADR-0003): day-1 necessity ∧ switching-cost ∧ external-canon ∧ domain-neutrality. If the contribution fails any axis, document why or withdraw.
- [ ] **No canon paraphrasing** ([ADR-0002](../arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md)).
- [ ] **Layer separation** ([ADR-0004](../arc42/09-decisions/0004-layer-separation-contracts.md)): the contribution does not cross layer boundaries inappropriately.
- [ ] **English by default** ([`STRATEGY.md §7`](../STRATEGY.md) §7.5): contributions to the kit are in English.

### Step 4: Open the PR

Use the AI-augmented PR template ([`design-guide/ai-augmented-pr.md`](../design-guide/ai-augmented-pr.md)) and fill all required fields. If the contribution adds a new operational default, the PR body must include a four-axis evaluation table.

### Step 5: Review

Reviewers check the [`adr-accept-protocol.md`](./adr-accept-protocol.md) structural and substantive criteria where applicable.

### Step 6: Acceptance

The upstream maintainer (currently <https://github.com/uyuutosa>) is the Acceptor for all kit changes per [`raci.md`](./raci.md) row "ADR (kit-meta / self-ADR)".

Acceptance criteria:

- Structural and substantive checklists pass.
- At least one peer review.
- No outstanding blockers.
- Contributor has addressed all comments.

## What about minor / typo PRs?

Minor PRs (typo, broken link, formatting fix) follow a fast path:

- Skip Step 1 (no issue needed).
- Open PR directly.
- One review approval is sufficient.
- Maintainer merges within reasonable timeline.

## Regulatory / carve-out contributions

Pentaglyph stays domain-neutral. If your contribution is regulatory- or domain-specific (medical, financial, public-sector), keep it as a **downstream override** rather than upstreaming. The exception is generic regulatory tooling that any regulated industry could use — discuss with the maintainer in the issue stage.

## Code of conduct

Pentaglyph adopts the [Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) by default. Downstream projects may add stricter requirements.

## License

Pentaglyph is MIT-licensed. By contributing, you agree your contribution is also MIT-licensed.

## References

- [pentaglyph upstream](https://github.com/uyuutosa/pentaglyph-docs)
- [`raci.md`](./raci.md) — the upstream maintainer is the Acceptor
- [`adr-accept-protocol.md`](./adr-accept-protocol.md) — review criteria
- [`override-justification.md`](./override-justification.md) — for downstream-only changes
- [ADR-0008](../arc42/09-decisions/0008-governance-layer-contract.md) — Layer ④ contract
