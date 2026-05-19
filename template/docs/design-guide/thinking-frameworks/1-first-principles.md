---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
framework: First Principles Thinking
stage: 1 — Frame the problem
binds: Aristotle (classical) — popularised in modern engineering by Elon Musk, Naval Ravikant
---

# First Principles Thinking — Stage 1: Frame the problem (bottom-up)

Strip the problem down to **irreducible truths** — facts that cannot be deduced from anything more basic in this context — and reconstruct the solution from those truths. Opposes "reasoning by analogy" ("we do X because that's how everyone does X").

## Authoritative source

- Classical origin: **Aristotle**, *Posterior Analytics* — "first principles are the truths that can be known immediately, without proof"
- Modern engineering popularisation: **Elon Musk** (Tesla / SpaceX battery-cost example): <https://jamesclear.com/first-principles>, <https://fs.blog/first-principles/>
- Naval Ravikant essays: <https://nav.al/>
- Don't re-author the philosophy — link out.

## When to use

- The **conventional approach** to a problem feels too expensive / slow / impossible — and you suspect the conventional approach is carrying inherited assumptions you don't actually need to honour
- You're at the **start of a design** where copying competitors / industry-standard solutions would lock in their constraints
- A **received-wisdom belief** (e.g., "SaaS must store user data", "every client report needs a status page") needs to be tested before you accept it

## When NOT to use

- The problem is **already concrete and well-bounded** — first-principles deconstruction is overkill
- You're in **execution mode** with a tight deadline — first-principles is a slow framing tool, not a quick decision tool
- The conventional approach is **obviously correct** and not the bottleneck — questioning it is intellectual masturbation

## Worked example — "Should SaaS X store user PHR data?"

**Conventional reasoning (by analogy)**: "Most health platforms store PHR data because users expect persistent access. Our competitors store it. Industry standard."

**First-principles reconstruction**:

1. *Irreducible truths*:
   - Users want to *see their data over time* (truth)
   - Users want to *control who else sees it* (truth)
   - Storage of PII creates *regulatory + breach liability* (truth)
   - Computing services exist that *process without storing* (truth — ephemeral / pass-through architectures)

2. *Reconstructed question*: do users want **the platform to hold the data**, or just **access to their data over time**?

3. *New solution space*: pass-through architecture where the parent app (Wellmira / NOBORI) holds PHR, and the SaaS only invokes when needed. This satisfies the user-side truths *without* the storage liability.

This is the actual reasoning that led to the Phase 2 SaaS "minimisation" design in this project — first-principles audit of the "must store data" assumption revealed it was inherited from competitors, not load-bearing.

## How to apply (5-minute version)

1. Write down the **received-wisdom solution** to the problem (1 sentence)
2. List **3–5 assumptions** that the received solution depends on
3. For each assumption: ask "is this irreducibly true, or is it inherited from how things are usually done?"
4. Cross out the inherited ones; rebuild the solution using only the true ones
5. If the rebuild is the same as the original — you've validated the received wisdom (still useful)

## Common failures

| Failure | Example | Fix |
| --- | --- | --- |
| Pseudo-first-principles | Quote Musk on Twitter, then implement the conventional approach anyway | Actually write down the assumptions and audit each |
| Reinvent the wheel needlessly | Question whether HTTP is the right protocol for a CRUD API | Apply first-principles only where the cost of conventional is genuinely high |
| Stop at the first layer | "We need a database. Databases store data. ∴ we need to store data." | Keep going — "do we need a database, or persistent state, or any state at all?" |
| Ignore second-order constraints | Reinvent auth from scratch | First-principles must include constraints like "we don't have a cryptography team" |

## Related

- [`./README.md`](./README.md) — directory overview + decision tree
- [`./1-issue-tree.md`](./1-issue-tree.md) — alternative Stage-1 framework (top-down decomposition); use Issue Tree when the framing is right, use First Principles when the framing might be wrong
- [`./_foundation-mece.md`](./_foundation-mece.md) — the irreducible-truths list should be MECE
