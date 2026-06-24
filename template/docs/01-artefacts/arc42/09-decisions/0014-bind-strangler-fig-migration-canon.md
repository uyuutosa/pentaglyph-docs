---
status: Proposed
owner: <placeholder>
last-reviewed: 2026-06-19
---

# ADR-0014: Bind the Strangler Fig pattern as the migration canon (Layer ② Process)

| Metadata  | Value                                                              |
| --------- | ------------------------------------------------------------------ |
| Status    | **Proposed**                                                       |
| Type      | ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit         |
| Date      | 2026-06-19                                                         |
| Deciders  | pentaglyph upstream maintainer + adopting project POs              |
| Consulted | downstream consumers running pentaglyph on real migrations         |
| Informed  | all pentaglyph users                                               |

---

## Context and Problem Statement

pentaglyph is, end to end, a kit for *small, reversible, doc-paired change*.
Its constitution ([`WORKFLOW.md`](../../../WORKFLOW.md) "code change → doc
change in the same PR"), its anti-diff-bomb stance, and especially its
adoption guide ([`how-to/adopt-existing-project.md`](../../../../../docs/how-to/adopt-existing-project.md))
all describe the same shape: never hold a long-lived broken state; replace a
legacy estate slice by slice; delete the husk when it carries nothing. That
guide is, structurally, a **Strangler Fig migration of a documentation
estate** — but the kit never names the pattern.

Leaving it unnamed has a concrete cost. When a team faces a large
replacement — a framework swap, a service extraction, a doc-layout
migration — the default cultural pull is the **big-bang rewrite**: branch
off, rebuild for three months, cut over once. That is the failure mode
pentaglyph exists to prevent, yet the kit offers no *named, bindable
alternative* to point at in the moment. "We should just rewrite it" is
currently met with a vibe ("prefer small steps"), not a canon.

Two things make naming it worth doing now:

1. **The pattern is already latent in the kit** and is being practiced
   without attribution — the adoption guide, and the kit's own
   subtree→plugin migration ([ADR-0013](./0013-adopt-claude-code-plugin-packaging.md))
   which ran a hybrid window with both mechanisms live until the legacy
   path carried nothing. Per [ADR-0005](./0005-surface-implicit-process-layer.md),
   pentaglyph prefers to *surface the canon it already follows*.
2. **It is a clean bindable canon.** Fowler's *StranglerFigApplication*
   (2004) is a single authoritative URL with two decades of training-corpus
   footprint — exactly the profile [ADR-0003](./0003-apply-day1-switching-cost-canon-criterion.md)
   requires, and exactly the "bind, don't author" shape
   [ADR-0002](./0002-bind-canons-only-no-self-authored-standards.md) mandates.

> **Y-statement.** *In the context of teams facing a large legacy
> replacement under pentaglyph's small-reversible-change discipline, facing
> the cultural default toward a big-bang rewrite and the absence of a named
> alternative to point at, we decided to bind the Strangler Fig pattern
> (Fowler 2004) as a Layer ② Process canon in [`migration-strategy.md`](../../../02-process/migration-strategy.md),
> and neglected to author our own migration methodology or to place it as a
> per-project §8 crosscutting concern, to give every adopter a named,
> reversible, slice-at-a-time migration sequencing discipline, accepting
> that the kit now ships an opinion about how migrations are staged (not
> only how docs are written).*

---

## Decision Drivers

Ordered by priority; higher drivers veto lower.

1. **Bind canons only ([ADR-0002](./0002-bind-canons-only-no-self-authored-standards.md)).** pentaglyph must not invent a "pentaglyph migration method". Whatever is added must be an external canon with an authoritative source.
2. **Day-1 switching cost ([ADR-0003](./0003-apply-day1-switching-cost-canon-criterion.md)).** The bound canon must be applicable on the next migration with no tooling, no restructuring, and a high LLM-corpus footprint so agents apply it zero-shot.
3. **Reversibility-first.** Whatever is bound must make *revert-at-the-seam* the default, consistent with the kit's small-PR ethos.
4. **Dogfooding consistency.** The binding should name a pattern the kit *already* practices, not bolt on an aspirational one (per [ADR-0005](./0005-surface-implicit-process-layer.md)).
5. **Correct layer placement ([ADR-0001](./0001-adopt-five-layer-self-architecture.md) / [ADR-0004](./0004-layer-separation-contracts.md)).** The artefact must land in the layer that owns "how the team works over time", not in a per-project architecture slot.

---

## Considered Options

| #  | Option                                                                              | Bind-only-canons | Day-1 cost | Reversibility | Correct layer | Names latent practice |
| -- | ----------------------------------------------------------------------------------- | ---------------- | ---------- | ------------- | ------------- | --------------------- |
| A  | Status quo — leave the pattern implicit in `adopt-existing-project.md`              | n/a              | n/a        | ✓             | n/a           | ✗                     |
| B  | Bind Strangler Fig as a Layer ② Process canon (`02-process/migration-strategy.md`) **(chosen)** | ✓                | ✓          | ✓             | ✓             | ✓                     |
| C  | Author a pentaglyph-original "migration playbook"                                   | ✗ (re-authors)   | ✓          | ✓             | ✓             | ✓                     |
| D  | Place it as a per-project arc42 §8 crosscutting concern                             | ✓                | ✓          | ✓             | ✗ (per-project, not a canon home) | ✓ |

---

## Decision Outcome

**Chosen option: B — bind Strangler Fig as a Layer ② Process canon.**

The binding ships as [`02-process/migration-strategy.md`](../../../02-process/migration-strategy.md),
in the same thin-mapping format as the TDD / BDD / Git-Flow bindings: link
to Fowler's canonical source, a four-axis evaluation, an operational mapping
(cut the seam → strangle one slice at a time → retire the husk), the
reversibility invariant, the "when NOT to use it" caveat, and a table of
where the pattern already shows up across the kit. The
[`02-process/README.md`](../../../02-process/README.md) suggested-files
table registers it as a kit-shipped binding.

Why B over the alternatives is in the drivers: A leaves the cultural default
(big-bang rewrite) unchallenged; C violates the kit's foundational
bind-don't-author rule ([ADR-0002](./0002-bind-canons-only-no-self-authored-standards.md));
D puts a *general, bindable canon* into a *per-project, system-specific*
slot (§8 crosscutting is for an adopter's own security model / error
strategy, not for shipping a named external method to every adopter).

---

## Consequences

### Positive

- Every adopter inherits a named, reversible migration discipline. "Let's
  rewrite it" now has a concrete, bindable counter-proposal to weigh against.
- AI agents asked to plan a migration produce sound Strangler-Fig staging
  zero-shot, and can cite the binding when proposing the seam ADR.
- The kit's own incremental ethos becomes legible: `adopt-existing-project.md`
  is now explicitly framed as the documentation-estate instance of the
  pattern, closing the gap between what the kit *does* and what it *names*.

### Negative

- The kit now ships an opinion about **migration sequencing**, not only
  about documentation. That widens pentaglyph's surface slightly beyond
  "doc kit" toward "engineering-process kit" — deliberate, but worth noting
  for adopters who want only the doc layer.
- One more Layer ② file to keep `last-reviewed`-current.
- Risk of over-application: a team could cargo-cult a seam onto a system
  small enough that a one-shot rewrite is genuinely lower-risk. The binding
  mitigates this with an explicit "when NOT to use it" section (Fowler's own
  caveat), but the risk is real.

---

## Validation

Considered Validated when **all** are true:

1. [`02-process/migration-strategy.md`](../../../02-process/migration-strategy.md) exists and passes the kit's `last-reviewed` / frontmatter lint.
2. [`02-process/README.md`](../../../02-process/README.md) lists the binding in its suggested-files / kit-shipped table.
3. [`how-to/adopt-existing-project.md`](../../../../../docs/how-to/adopt-existing-project.md) names the Strangler Fig pattern and links back to the binding (the meta framing — pentaglyph's own doc-adoption *is* a Strangler Fig).
4. At least one downstream consumer references the binding when authoring a real migration's seam ADR.

---

## Pros and Cons of the Options

### Option A — Status quo (leave it implicit)

- Pros: zero work; nothing new to maintain.
- Cons: the cultural default (big-bang rewrite) keeps winning arguments
  because there is no *named* alternative to bind a discussion to; the kit
  keeps practicing a pattern it cannot point at. Rejected.

### Option B — Bind Strangler Fig as a Process canon **(chosen)**

- Pros: clears all four binding axes; names a latent practice; lands in the
  correct layer; gives agents a zero-shot migration plan.
- Cons: widens the kit's opinion-surface to migration sequencing; one more
  file to keep current.

### Option C — Author a pentaglyph-original migration playbook

- Pros: could be tailored exactly to the kit's vocabulary.
- Cons: directly violates [ADR-0002](./0002-bind-canons-only-no-self-authored-standards.md) —
  pentaglyph binds canons, it does not author standards. A bespoke playbook
  also forfeits the LLM-corpus footprint that makes a well-known canon
  zero-shot-applicable. Rejected.

### Option D — Per-project §8 crosscutting concern

- Pros: keeps `02-process/` narrowly "team conventions".
- Cons: §8 crosscutting is the home for an *adopter's own* system concerns
  (their security model, their error strategy) — filled per project. A
  general external method shipped to *every* adopter is a Layer ② binding,
  not a per-project §8 entry. Mis-placing it would also hide it from the
  binder where TDD/BDD/Git-Flow live. Rejected.

---

## More Information

- Canon: Fowler, M. (2004). [StranglerFigApplication](https://martinfowler.com/bliki/StranglerFigApplication.html)
- Companion: Fowler, M. [BranchByAbstraction](https://martinfowler.com/bliki/BranchByAbstraction.html)
- Companion: Newman, S. *Monolith to Microservices* (O'Reilly, 2019), ch. 3
- The binding: [`02-process/migration-strategy.md`](../../../02-process/migration-strategy.md)
- The doc-estate instance: [`how-to/adopt-existing-project.md`](../../../../../docs/how-to/adopt-existing-project.md)
- Related: [ADR-0002 bind-canons-only](./0002-bind-canons-only-no-self-authored-standards.md), [ADR-0003 day-1 switching cost](./0003-apply-day1-switching-cost-canon-criterion.md), [ADR-0005 surface-implicit-process-layer](./0005-surface-implicit-process-layer.md)
- A self-migration that followed the pattern: [ADR-0013 plugin packaging](./0013-adopt-claude-code-plugin-packaging.md) (hybrid subtree+plugin window)
