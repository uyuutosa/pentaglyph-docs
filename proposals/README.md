---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-23
---

# Proposals — upstream RFCs for the pentaglyph kit

This directory holds **upstream change proposals** sourced from adopter projects. A proposal is a dated file (`YYYY-MM-DD_<title-kebab>.md`) describing:

1. A concrete defect or gap discovered while operating pentaglyph in a real project
2. Why the defect is structural to the kit, not to the adopter's project
3. Specific deliverables that would close the gap if pentaglyph shipped them

Proposals are **not** ADRs — they are inputs to the kit's roadmap. Once accepted, they are normally implemented as a combination of:

- new templates / template revisions under `template/docs/01-artefacts/templates/`
- new CLI subcommands under `cli/`
- new `template/.claude/` skills, rules, hooks for AI-agent enforcement
- new guides under `docs/{tutorials,how-to,reference,explanation}/`
- new self-ADRs under `template/docs/01-artefacts/arc42/09-decisions/`

| Date | Title | Source project | Status |
|---|---|---|---|
| 2026-05-23 | [verification-as-first-class](2026-05-23_verification-as-first-class.md) | QuantMind | Draft |
