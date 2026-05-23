---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
---

# `prfaqs/` — working-backwards memos for new initiatives

This directory holds **Amazon PR/FAQ working-backwards memos** (<https://workingbackwards.com/resources/working-backwards-pr-faq/>) used to scope and kick off new initiatives *before* implementation work begins. The discipline: write the press-release-as-if-launched first, then the customer FAQ, and let those two documents force clarity on what the initiative actually delivers.

## Why PR/FAQ specifically

For client-engagement work, the PR/FAQ format is the modern de-facto answer to "what does a kickoff memo look like?" — taught at Amazon for two decades, popularised externally by Bryar & Carr's *Working Backwards* (2021), heavily covered by Andreessen Horowitz, [a16z](https://a16z.com/podcast/amazon-narratives-memos-working-backwards-from-release-more/), [First Round](https://review.firstround.com/), and dozens of PM blogs. LLMs produce well-structured PR/FAQs zero-shot.

## When to write a PR/FAQ

- A new initiative is moving from `NOW-NEXT-LATER.md` *Later* → *Next* and needs to be scoped before being committed.
- The initiative has client-visible deliverables (a launch, a new capability, a public feature).
- The scope is at minimum a cycle's worth of work — smaller items go straight to `weekly.md` priorities without a PR/FAQ.

## When NOT to write a PR/FAQ

- The work is incremental (bug fixes, refactoring, optimisation). Use `weekly.md`.
- The work is internal-only (no client-visible release). Use `01-artefacts/arc42/` design docs.
- The work is a decision, not a delivery. Use `daci/` → `decisions/` (MADR).

## Structure

A PR/FAQ is two documents in one file:

1. **PR (Press Release)** — 1 page, written as if the initiative has shipped. Headline, sub-headline, problem statement, solution, quote from leadership, quote from customer, availability, call to action.
2. **FAQ (Customer + Internal)** — 5-10 pages, anticipating the questions a customer, sponsor, or skeptical reviewer would ask.

Use the template (planned: [`../../01-artefacts/templates/14_pr-faq.md`](../../01-artefacts/templates/14_pr-faq.md), follow-up release) once available. Until then, follow the structure at <https://workingbackwards.com/resources/working-backwards-pr-faq/>.

## File naming

`YYYY-MM-DD_<kebab-launch-name>.md` (8-digit date prefix; PR/FAQs are less frequent than weekly reports).

## Lifecycle

`Draft → Reviewed → Approved → Launched → Retrospected`

After launch, a `Retrospected` PR/FAQ is annotated with what the launch actually looked like vs. what was predicted. This becomes a learning artefact — and the delta feeds the next initiative's PR/FAQ.

## Cross-references

- [`../NOW-NEXT-LATER.md`](../NOW-NEXT-LATER.md) *Later* items often link to draft PR/FAQs
- [`../decisions/`](../decisions/) records the approval / rejection decision for a PR/FAQ
- [`../01-artefacts/reports/YYMMDD/heartbeat.md`](../01-artefacts/reports/) narrates the launch when a PR/FAQ ships

## Related

- [`../README.md`](../README.md) — PEL overview
- *Working Backwards* (Bryar & Carr, 2021) — book reference
- <https://workingbackwards.com/resources/working-backwards-pr-faq/> — authoritative template
