---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
layer: 4
---

# ADR `Proposed → Accepted` protocol

> **Layer ④ Governance.** Defines the bar an ADR must clear to leave `Proposed` and become `Accepted` (and therefore immutable per [`arc42/09-decisions/README.md`](../arc42/09-decisions/README.md)).

## Why this protocol matters

Per [`arc42/09-decisions/README.md`](../arc42/09-decisions/README.md), an ADR's body becomes **immutable once Accepted**. After that point, the decision can only be changed by a *new* ADR that supersedes it. Therefore the bar for `Accepted` is meaningful — it is the point at which the kit (or the project) commits to a decision.

Without an explicit protocol, the `Proposed → Accepted` transition becomes informal: whoever feels the ADR is "done enough" flips the flag. This produces two failure modes:

1. **Premature acceptance**: an ADR with weak rationale is accepted, then later contradicted, requiring re-litigation.
2. **Indefinite Proposed**: an ADR sits in `Proposed` forever because no one feels authorised to flip it. The decision is *de facto* taken (because the code follows it) but not recorded.

This protocol fixes both by stating who decides, what evidence is required, and what the failure modes look like.

## Checklist for moving `Proposed → Accepted`

An ADR may transition to `Accepted` when **all** of the following hold:

### Structural completeness (mechanical)

- [ ] Front-matter `status: Proposed` is present.
- [ ] Metadata table has Date, Deciders, Consulted, Informed filled (not `<placeholder>`).
- [ ] §"Decision Drivers" lists **≥ 3** drivers in priority order.
- [ ] §"Considered Options" lists **≥ 2** options.
- [ ] §"Decision Outcome" names a chosen option with a Y-statement in Olaf Zimmermann form.
- [ ] §"Pros and Cons of the Options" covers every considered option.
- [ ] §"Consequences" includes Positive, Negative, Neutral subsections (one of them may be `(none yet)` but the heading must exist).
- [ ] §"Compliance / Validation" specifies how the decision is enforced ongoing.
- [ ] §"More Information / Related ADRs" links related ADRs.

### Substantive review (judgement)

- [ ] **Reviewer count met**: at minimum **1 peer** has read the ADR end-to-end and stated agreement or signed-off concerns. Project may raise the bar (e.g. 2 peers + 1 architect for cross-cutting ADRs).
- [ ] **Drivers cover the actual concerns**: not a fabricated list to hit the ≥ 3 threshold.
- [ ] **Options are genuine alternatives**: not strawmen. Each Considered Option must be one a reasonable engineer might have chosen.
- [ ] **Consequences include the negative**: an ADR with no negative consequences is suspect — most decisions have downsides.
- [ ] **The §9.1 four-axis criterion** ([ADR-0003](../arc42/09-decisions/0003-apply-day1-switching-cost-canon-criterion.md)) is explicitly evaluated for any new operational default proposal.

### Acceptor identified

- [ ] The Acceptor role from [`raci.md`](./raci.md) is named for this artefact type.
- [ ] The Acceptor has explicitly approved (via PR review approval / written sign-off / commit by themselves).

## Acceptor by ADR type

Per [`raci.md`](./raci.md):

| ADR type | Default Acceptor |
| --- | --- |
| Cross-cutting (project-level) | architect, or PO if no architect role exists |
| Kit-meta (self-ADR) | upstream pentaglyph maintainer |
| Module-local (inside a Module Detailed Design §7) | the module owner |

## Procedure (step by step)

1. **Author drafts** ADR with `status: Proposed`.
2. **Author requests review** (open PR, ping reviewers).
3. **Reviewers** check the structural checklist above and approve or comment.
4. **Author addresses comments**.
5. **Acceptor** verifies the substantive checklist is met.
6. **Acceptor flips the status** to `Accepted` and merges the PR.
7. **Acceptor records date** in the Metadata table (acceptance date can be added even though body is otherwise immutable — date is metadata, not body).

## What if the checklist is not met?

| Issue | Action |
| --- | --- |
| Structural completeness fails | Reject PR. Author fills missing sections, resubmits. |
| Substantive review concern (drivers / options / consequences) | PR comment requesting changes. ADR body is still editable while `Proposed`. |
| Acceptor unavailable | Project defines an alternate Acceptor in `<downstream>/docs/governance/raci.md`. |
| Reviewer disagrees with the chosen option | Reviewer authors a competing ADR with their preference, both go to Acceptor for choice. Or reviewer comments are recorded in §"Pros and Cons" as a Con on the chosen option. |
| ADR sits in `Proposed` > 30 days | Acceptor decides: accept, reject (status `Rejected`), or close as deprecated (status `Deprecated`). Indefinite `Proposed` is forbidden. |

## What about `Rejected`?

An ADR may transition to `Rejected` when the team explicitly chooses not to make the proposed change. Reasons (recorded in a `Rejection rationale` section added to the ADR before status change):

- The problem was misdiagnosed.
- A competing ADR was preferred.
- The proposal failed the four-axis criterion.
- The project deferred the decision indefinitely.

`Rejected` ADRs are kept in `arc42/09-decisions/` for traceability — future readers benefit from knowing what was considered and not chosen.

## What about `Superseded by NNNN`?

If a previously `Accepted` ADR is contradicted by a new decision:

1. Author the new ADR with `Supersedes: NNNN` in front-matter and a §"Why this supersedes ADR-NNNN" section.
2. Accept the new ADR per this protocol.
3. The new ADR's Acceptor edits the old ADR's status to `Superseded by MMMM` (where MMMM is the new ADR number). **This is the only edit allowed to an Accepted ADR's body — only the status field, in metadata.**

## Override path

A downstream project may strengthen or relax this protocol by writing `<downstream>/docs/governance/adr-accept-protocol.md`. Common overrides:

- **Regulated industries**: require 2 peer reviewers + 1 Quality Officer.
- **Solo / small projects**: relax to "author = acceptor" with a 24-hour cool-down period.
- **OSS projects**: replace with an RFC vote (e.g. lazy consensus / supermajority).

## References

- [`arc42/09-decisions/README.md`](../arc42/09-decisions/README.md) — MADR v3.0 file format and authoring rules.
- [`raci.md`](./raci.md) — who is the Acceptor by artefact type.
- [MADR v3.0](https://adr.github.io/madr/) — canonical format.
- [Michael Nygard (2011)](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) — original ADR pattern.
- [ADR-0006](../arc42/09-decisions/0006-self-adr-strict-madr-discipline.md) — kit-level discipline this protocol enforces.
- [ADR-0008](../arc42/09-decisions/0008-governance-layer-contract.md) — Layer ④ contract.
