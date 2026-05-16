---
status: Proposed
owner: <placeholder>
last-reviewed: 2026-05-14
---

# ADR-0003: Apply the (day-1 × switching-cost × external-canon × domain-neutrality) criterion to all prescribe-vs-defer decisions

| Metadata  | Value                                                          |
| --------- | -------------------------------------------------------------- |
| Status    | **Proposed**                                                   |
| Type      | ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit     |
| Date      | 2026-05-14                                                     |
| Deciders  | pentaglyph upstream maintainer + adopting project PO            |
| Consulted | AI agents authoring downstream extensions                       |
| Informed  | All downstream pentaglyph adopters                              |
| Ticket    | Tracked via roadmap impl-plan 2026-05-14                        |

---

## Context and Problem Statement

Pentaglyph ships three operational defaults (Git Flow, AI-augmented PR template, Code Tours) and explicitly defers others (Sprint cadence, Ticket system, CI/CD specifics). The kit's `STRATEGY.md §9.1` justifies *why* Git Flow is prescribed — "every project needs it on day one and the cost of changing it later is high" — but does not state the criterion as a reusable rule, nor list the conditions that would make a deferred concern *eligible* for prescription in a future version.

This creates two problems:

1. **Inconsistent future decisions**. When the kit adds (or rejects) a new operational default — BDD bindings, observability conventions, accessibility checklists, OKR templates — there is no rule to point at. The choice becomes a one-off, and the kit's identity drifts toward "whatever the current maintainer thinks is useful".
2. **Self-deception risk** (see ADR-0005). Without a stated criterion, the kit can claim "we deliberately don't prescribe X" while in fact prescribing X implicitly through Layer B artefacts and `WORKFLOW.md`. A stated criterion makes the gap auditable.

This ADR extracts the implicit §9.1 reasoning, generalises it to a four-axis criterion, and binds it as the decision rule for every future "prescribe vs defer" choice in pentaglyph.

---

## Decision Drivers

- **DD-1 (highest)**: Predictability. Future contributors and downstream maintainers must be able to predict whether a new concern will be in-scope for pentaglyph or pushed to project-specific extension.
- **DD-2**: Self-consistency with [§2 "Do not re-author"](../../STRATEGY.md). A criterion that admits canon-bound prescriptions while rejecting in-house standards extends the §2 rule rather than undermining it.
- **DD-3**: Adoption cost for downstream projects. Over-prescription forces every adopter to write overrides; under-prescription forces every adopter to invent the same defaults. The criterion must balance these.
- **DD-4**: Auditability. The criterion must be applicable to existing prescriptions (Git Flow / AI-PR / Code Tours) without re-litigating them, and it must produce the same answer §9.1 already gave.

---

## Considered Options

1. **Codify §9.1 as a two-axis criterion (day-1 ∧ switching-cost)**. Minimal change; leaves canon and domain questions implicit.
2. **Codify §9.1 as a four-axis criterion (day-1 ∧ switching-cost ∧ external-canon ∧ domain-neutrality)**. Explicit on all four required conditions for prescription.
3. **No criterion; case-by-case**. Continue handling each prescription as a one-off ADR.

---

## Decision Outcome

**Chosen option: Option 2 — four-axis criterion**.

A new concern is eligible for prescription as a pentaglyph operational default **only if all four conditions hold**:

| Axis                   | Condition                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **day-1 necessity**    | Substantively every project needs *something* in this slot from day one. (Not: every project needs *this specific choice*.) |
| **switching cost**     | Changing the choice after adoption imposes meaningful, structural rework — not just renaming a file.                       |
| **external canon**     | There is a published, citable canon (book / spec / RFC / standards-body URL) that pentaglyph can bind by link-out.          |
| **domain neutrality**  | The choice is sensible across the kit's target domains (regulated / startup / AI-first / B2B SaaS / OSS / enterprise IT).   |

Failing any one axis defers the concern to project-specific extension. Passing all four makes the concern a candidate for a new ADR proposing prescription.

### Y-statement summary

> In the context of **deciding whether pentaglyph should prescribe a new operational default**, facing **inconsistent and drifting future decisions**, we decided for **a four-axis (day-1 ∧ switching-cost ∧ external-canon ∧ domain-neutrality) criterion** to achieve **predictable, auditable scope decisions**, accepting **that some genuinely valuable but in-house-defined practices remain outside the kit**.

---

## Pros and Cons of the Options

### Option 1: Two-axis (day-1 ∧ switching-cost)

- Pros:
  - Minimal: matches §9.1's literal text exactly.
  - Easy to apply.
- Cons:
  - Silent on canon. Allows pentaglyph to author its own standards — directly contradicts §2 "do not re-author".
  - Silent on domain neutrality. Lets the kit drift toward whatever vertical the current maintainer is working in.

### Option 2: Four-axis (chosen)

- Pros:
  - Closes the §2 contradiction by making canon-existence a required axis.
  - Closes the maintainer-drift risk by making domain-neutrality explicit.
  - Validates against existing prescriptions: Git Flow (Driessen 2010), AI-PR (Xiao et al. FSE 2024 + Anthropic conventions), Code Tours (MS CodeTour schema) — all four axes pass for all three.
- Cons:
  - Sets a higher bar for new prescriptions. Some genuinely useful practices without a canon (e.g. project-specific PR review checklists) cannot be brought in.

### Option 3: No criterion

- Pros:
  - Maximum flexibility per decision.
- Cons:
  - Defeats the purpose: the kit becomes a moving target. Adopters cannot predict future scope.
  - Contradicts MADR's own ethos (decisions deserve criteria).

---

## Consequences

### Positive

- Every future ADR proposing a new operational default must include an axis-by-axis evaluation table.
- Existing operational defaults (Git Flow, AI-PR, Code Tours) gain a retroactive consistency check; if any later fails an axis, that triggers a follow-up ADR (Deprecation or scope reduction).
- Downstream projects can request specific bindings (e.g. "bind Scrum Guide 2020") with a predictable acceptance path.

### Negative

- Some valuable, canon-less practices (e.g. domain-specific PR templates) cannot be upstreamed. They remain in downstream `design-guide/` only.
- The kit explicitly accepts that "useful but project-specific" is a category — some adopters may prefer a more opinionated kit and need to fork.

### Neutral

- The criterion does not bias toward more or fewer prescriptions; it only enforces that any prescription be defensible.
- The criterion does not freeze the *existing* set. Anything in the kit today that fails the criterion is subject to a Deprecation ADR.

### Follow-ups

- [ ] Audit existing operational defaults against all four axes; record results in [`docs/design-guide/version-control.md`](../../design-guide/version-control.md), [`docs/design-guide/ai-augmented-pr.md`](../../design-guide/ai-augmented-pr.md), [`docs/design-guide/code-tours.md`](../../design-guide/code-tours.md).
- [ ] Add an evaluation-table template to [`templates/5_adr.md`](../../templates/5_adr.md) §"Decision Drivers" so every future operational-default ADR includes the four-axis grid.

---

## Compliance / Validation

- Verification: every ADR under `arc42/09-decisions/` that proposes a new operational default must contain an axis-by-axis table evaluating the criterion. PR review enforces.
- Frequency: per-PR, with periodic audit each minor release.

---

## More Information

### Related ADRs

- Complementary: [ADR-0001](0001-adopt-five-layer-self-architecture.md) — the criterion is what justifies layer ②'s "bind canons only" rule.
- Complementary: [ADR-0002](0002-bind-canons-only-no-self-authored-standards.md) — the criterion's external-canon axis operationalises §2 + ADR-0002.
- Source: pentaglyph [`STRATEGY.md §9.1`](../../STRATEGY.md), which states the day-1 + switching-cost reasoning but does not generalise it.

### References

- Driessen, V. (2010). [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/).
- Xiao, T. et al. (2024). *Investigating and Designing for Trust in AI-Powered Code Review Suggestions*. FSE 2024.
- Atwood, J. (2008). [Hardware is cheap, programmers are expensive](https://blog.codinghorror.com/hardware-is-cheap-programmers-are-expensive/) — switching-cost framing.
