---
status: Stable
owner: <placeholder>
last-reviewed: 2026-06-19
layer: 2
---

# Strangler Fig — pentaglyph design-guide

| Metadata     | Value                                                                 |
| ------------ | --------------------------------------------------------------------- |
| Status       | Stable                                                                |
| Layer        | 2 (Process)                                                           |
| Canon        | Fowler (2004) — *StranglerFigApplication*                             |
| Binding date | 2026-06-19                                                            |
| Related ADRs | [ADR-0001](../01-artefacts/arc42/09-decisions/0001-adopt-five-layer-self-architecture.md), [ADR-0002](../01-artefacts/arc42/09-decisions/0002-bind-canons-only-no-self-authored-standards.md), [ADR-0003](../01-artefacts/arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md), [ADR-0014](../01-artefacts/arc42/09-decisions/0014-bind-strangler-fig-migration-canon.md) |

## 1. External canon (authoritative)

- **Primary**: Fowler, M. (2004). [StranglerFigApplication](https://martinfowler.com/bliki/StranglerFigApplication.html). The canonical statement of the pattern, named after the *Ficus* strangler vine that grows around a host tree and gradually replaces it. Do **not** re-author the pattern here — this file binds it; the rationale lives at the source.
- **Companion**: Fowler, M. [BranchByAbstraction](https://martinfowler.com/bliki/BranchByAbstraction.html). The complementary in-codebase technique for introducing the seam when a clean network boundary (proxy / facade) is not available.
- **Companion**: Sato, T. *Monolith to Microservices* (O'Reilly, 2019), ch. 3 — the long-form treatment, including the *event-interception* and *asset-capture* variants of the seam.
- **Related canon**: [`version-control.md`](./version-control.md) — each strangle slice is a small, independently shippable PR; the branching model carries it. [`dev-cycle.md`](./dev-cycle.md) — the per-slice cadence.

## 1.5. Surfaces an ethos pentaglyph already practices

pentaglyph's constitutional discipline is *small, reversible, doc-paired change*: [`WORKFLOW.md`](../WORKFLOW.md)'s "code change → doc change in the same PR", the kit's preference for many narrow PRs over diff-bombs, and — most directly — [`how-to/adopt-existing-project.md`](../../../docs/how-to/adopt-existing-project.md), whose entire shape ("do not retro-document; migrate ad-hoc docs one at a time on the PR that next touches them; the legacy doc shrinks and you eventually delete it") **is** a Strangler Fig migration of a documentation estate.

This binding names the pattern that was operating implicitly. Per [ADR-0005](../01-artefacts/arc42/09-decisions/0005-surface-implicit-process-layer.md), pentaglyph prefers to *name the canon it already follows* rather than leave it as folklore — so that "we should just rewrite it" is met with a named alternative, not a vibe.

## 2. Why pentaglyph binds this (§9.1 four-axis evaluation)

Per [ADR-0003](../01-artefacts/arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md), a canon is bound only if it clears all four axes:

| Axis | Assessment |
| --- | --- |
| **Day-1 switching cost** | Near-zero. The pattern is one URL and one mental model; a team applies it on the next migration without tooling or restructuring. |
| **LLM training-corpus footprint** | Very high. Twenty years of blog posts, conference talks, the Newman book, and countless migration write-ups. An AI agent asked to "plan this migration Strangler-Fig style" produces sound staging zero-shot. |
| **Authoritative single source** | Yes. Fowler's bliki entry is the canonical definition; the companion book extends but does not fork it. |
| **Non-overlap with bound canons** | Clean. TDD/BDD govern *how a unit of change is verified*; Git Flow governs *how a branch merges*; Strangler Fig governs *how a large replacement is sequenced over time*. None of the existing bindings answer the migration-sequencing question. |

## 3. Operational mapping

The pattern is three moves. pentaglyph adds only the placement and the reversibility discipline; the mechanics link out to Fowler.

1. **Cut the seam.** Put an interception point in front of the thing being replaced — a proxy, an HTTP facade, a feature flag, a dispatch table, or (in-codebase) a Branch-by-Abstraction layer. All traffic flows through the seam; initially it routes 100% to the legacy implementation. Record the seam as an ADR (`templates/5_adr.md`) — it is a load-bearing decision.
2. **Strangle one slice at a time.** Build the new implementation for one capability, flip that slice's route to the new path behind the seam, verify (TDD/BDD outer loop), ship. Each slice is **one independently shippable, independently revertible PR** ([`version-control.md`](./version-control.md)). The system is never in a long-lived broken state; at every commit, both old and new are live and the seam decides.
3. **Retire the husk.** When a slice carries no traffic, delete the dead legacy code in the *same or next* PR — do not let the husk linger. The migration is done when the seam routes nothing to the legacy path and the legacy code is gone. Consider removing the seam itself if it has no residual value.

**Reversibility is the invariant.** If a slice regresses, you flip its route back at the seam — you do not roll back a three-month rewrite. A migration step that cannot be reverted at the seam is not a Strangler Fig step; re-cut the seam so it can.

**When NOT to use it.** True greenfield (there is nothing to strangle). Systems small enough that a one-shot rewrite is genuinely lower-risk than standing up a seam — Fowler's own caveat. And cases where a clean seam genuinely cannot be cut (deeply entangled shared state with no abstraction boundary); there, *first* invest in Branch-by-Abstraction to create the seam, then strangle.

## 4. How it shows up across pentaglyph

| Surface | The Strangler Fig instance |
| --- | --- |
| **Doc-estate adoption** | [`how-to/adopt-existing-project.md`](../../../docs/how-to/adopt-existing-project.md) — strangle the legacy `docs/architecture.md` slice by slice, on the PR that next touches the relevant code. |
| **Architecture migration** | An adopter project's arc42 [§4 Solution Strategy](../01-artefacts/arc42/04-solution-strategy/README.md) records "migrations are Strangler-Fig, not big-bang" as a top decision, with the seam ADR under [§9](../01-artefacts/arc42/09-decisions/README.md). |
| **Kit self-migrations** | The kit's own operational-layer plugin migration ([ADR-0013](../01-artefacts/arc42/09-decisions/0013-adopt-claude-code-plugin-packaging.md)) ran a hybrid subtree+plugin window — a strangle with both mechanisms live until the legacy path carried nothing. |

## Related

- [ADR-0014](../01-artefacts/arc42/09-decisions/0014-bind-strangler-fig-migration-canon.md) — the decision to bind this canon
- [`version-control.md`](./version-control.md) — the per-slice branching model
- [`how-to/adopt-existing-project.md`](../../../docs/how-to/adopt-existing-project.md) — the doc-estate instance, end to end
- [`thinking-frameworks/`](./thinking-frameworks/README.md) — reasoning lenses for *deciding* a migration; this binding governs *sequencing* one

For lifecycle / when to update, see [`../WORKFLOW.md`](../WORKFLOW.md).
