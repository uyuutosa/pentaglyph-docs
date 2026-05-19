---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
---

# `decisions/` — client-visible decision log

This directory holds the **client-facing subset** of architectural / engagement decisions, recorded in **MADR v3.0** format (<https://adr.github.io/madr/>). The engineering team's full ADR corpus lives at [`../../01-artefacts/arc42/09-decisions/`](../../01-artefacts/arc42/09-decisions/); this directory holds the curated subset the client sponsor needs to see.

## Why a curated subset

Not every architectural decision is interesting to the client (e.g., choice of test framework, internal refactoring patterns). Not every engagement decision is architectural (e.g., scope changes, cadence changes). The intersection that *is* both:

- Architectural decisions with client visibility (technology choices that affect roadmap or budget)
- Engagement decisions with technical implication (scope changes, deferred features, alternative paths)

…lives here. The full engineering corpus stays in `01-artefacts/arc42/09-decisions/`, with cross-links for decisions that have both audiences.

## Format

Use the pentaglyph MADR template: [`../../01-artefacts/templates/5_adr.md`](../../01-artefacts/templates/5_adr.md).

File naming: `YYYY-MM-DD-<kebab-title>.md` (date prefix because client-visible decisions are not numbered sequentially with engineering ADRs).

## Lifecycle

Same as engineering ADRs: `Proposed → Accepted → Superseded`. Once `Accepted`, the file is immutable; replacements are *supersession* entries pointing at the original.

Decisions in flight (Driver / Approver / Contributors / Informed roles assigned but no final call yet) live in [`../daci/`](../daci/). When approved, they archive here as MADR entries.

## Cross-references

- [`../raid.md`](../raid.md) `D-NNN` rows are one-line summaries of entries in this directory
- [`../01-artefacts/reports/YYMMDD/heartbeat.md`](../01-artefacts/reports/) narrates major decisions in prose
- [`../../01-artefacts/arc42/09-decisions/`](../../01-artefacts/arc42/09-decisions/) holds the engineering full corpus

## Related

- [`../README.md`](../README.md) — PEL overview
- [`../../01-artefacts/templates/5_adr.md`](../../01-artefacts/templates/5_adr.md) — MADR template
