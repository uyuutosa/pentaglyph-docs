---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-14
type: template
template-id: 10
---

# Product Backlog Item Refinement Template (Type 10)

> **Use case**: refine a single PBI (User Story / Bug / Task) up to "Ready" state before Sprint Planning. Captures DoR completion.
> **Lifecycle**: Layer A (Durable, lives with the PBI in the work-item system) or Layer B (`task-list/`) depending on whether the work-item system supports rich-text fields.
> **Canon**: [Scrum.org Definition of Ready](https://www.scrum.org/resources/blog/walking-through-definition-ready) — bound via [`design-guide/dod-dor.md`](../design-guide/dod-dor.md).
> **Length target**: 1 page per PBI. If refinement output exceeds 1 page, split the PBI.
>
> Delete this `> ...` guidance block after copying.

---

# PBI Refinement — <PBI title>

| Metadata | Value |
| --- | --- |
| PBI ID | <work-item ID> |
| Type | User Story / Bug / Task / Spike |
| Refined on | YYYY-MM-DD |
| Refined by | <names> |
| Target Sprint | NN (or "Backlog" if not yet committed) |
| DoR status | ✅ Ready / ⚠️ Partially ready / ❌ Not ready |

---

## 1. User-facing intent (for User Story type)

> Use the canonical Mike Cohn form. Skip this section for Bug / Task / Spike.

> As a **<persona or role>**,
> I want to **<capability>**,
> so that **<outcome / measurable value>**.

Linked persona: [`service-design/personas/<PE-NN>.md`](../service-design/personas/)

---

## 2. Acceptance Criteria

> Use Given/When/Then per [`design-guide/bdd-workflow.md`](../design-guide/bdd-workflow.md).

- **AC-1**:
  - Given <context>
  - When <action>
  - Then <observable outcome>
- **AC-2**: …

---

## 3. Definition of Ready checklist

> Default DoR — downstream may extend per [`design-guide/dod-dor.md`](../design-guide/dod-dor.md).

- [ ] **Independent** — the PBI can be worked without blocking on another PBI not in this Sprint.
- [ ] **Negotiable** — the team and PO have aligned on what's in scope and what's deferred.
- [ ] **Valuable** — the PBI has a stated user / business outcome (not just "refactor X").
- [ ] **Estimable** — the team can size it (Story Points / hours / T-shirt).
- [ ] **Small** — fits within one Sprint.
- [ ] **Testable** — at least one AC is concrete enough to verify.
- [ ] **Acceptance Criteria written in G/W/T form** (§2 above).
- [ ] **Dependencies identified** — external services, prerequisite PBIs, design assets.
- [ ] **Persona linked** (User Story type only).
- [ ] **Estimate recorded** in the work-item system.

If any box is unchecked, the PBI is **not** Ready. Park it for further refinement.

---

## 4. Out of scope (explicit)

> List what is intentionally deferred. Prevents scope creep during the Sprint.

- <deferred item 1> → tracked in <future PBI / future Sprint>
- <deferred item 2>

---

## 5. Dependencies

| Type | Name | Owner | Status |
| --- | --- | --- | --- |
| Upstream PBI | | | Resolved / In progress / Not started |
| External service | | | |
| Design asset | | | |

---

## 6. Estimate

| Method | Value | Confidence |
| --- | --- | --- |
| Story Points | | High / Medium / Low |
| Hours | | |
| T-shirt | XS / S / M / L / XL | |

If confidence is Low, consider splitting before commit.

---

## 7. References

- [Scrum.org — Walking Through the Definition of Ready](https://www.scrum.org/resources/blog/walking-through-definition-ready)
- Cohn, M. [User Stories Applied](https://www.mountaingoatsoftware.com/books/user-stories-applied). INVEST criteria.
- [`design-guide/dod-dor.md`](../design-guide/dod-dor.md) — the binding that defines DoR.
- [`design-guide/bdd-workflow.md`](../design-guide/bdd-workflow.md) — G/W/T grammar for AC.
- [`templates/6_persona.md`](./6_persona.md) — persona linked in §1.
