---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-23
source-project: QuantMind
audience: pentaglyph-docs maintainers
---

# Proposal — verification as a first-class pentaglyph deliverable

## Problem

A single discovery session in an adopter project (QuantMind, 2026-05-23) revealed that **pentaglyph ships five documentation frameworks (arc42 / C4 / MADR / Diátaxis / TiSDD) and zero of their verification counterparts**. The consequence in that project was two compounding defects:

### D1 — Architecture rules without fitness functions

`docs/design-guide/architecture-layers.md` (a pentaglyph-shipped template) mandates Hexagonal Port & Adapter at the Macro level, DDD bounded contexts with Anti-Corruption Layers at the Mid level, and a strict directory shape per context:

```
<project>/<context>/
├── domain/
├── ports/
├── adapters/
├── use_cases/
└── tests/
```

The document explicitly says rules are "lint-enforced (see ADR-0013 follow-ups)". The follow-ups never happened in the adopter, because **pentaglyph ships no lint config to enforce the rules**. Six months after adoption:

- Zero contexts had the subdirectory shape
- Direct context-to-context imports were the rule, not the exception
- A self-written "architecture verification" report claimed "0 violations across 66 files" while checking only 2 of ≥ 5 rules — *false assurance*

When the project installed `import-linter` and encoded the actual rules, 4 violations surfaced immediately.

### D2 — AI-agent contracts without enforcement

The kit ships `docs/AI_INSTRUCTIONS.md` (5 KB of mandatory reading for any AI agent touching `docs/`) and instructs adopters to wire it via `.claude/rules/documentation.md` auto-load. In the same session that found D1, the AI agent (Claude Code):

1. Received the auto-loaded rule on first edit
2. Summarised it as "Code change implies doc change in the same PR"
3. **Never opened the linked AI_INSTRUCTIONS / WORKFLOW / architecture-layers files**
4. Produced concrete code-coupled doc drift (a mermaid diagram referencing a path `quantmind/trading/ports/broker_port.py` that did not exist in the code, 3 occurrences) — a direct violation of AI_INSTRUCTIONS §4 #5

Both defects share one structural root cause: **pentaglyph specifies rules in prose without an executable mechanism to verify compliance**. This is the [architecture erosion phenomenon](https://onlinelibrary.wiley.com/doi/10.1002/smr.2423) Perry & Wolf named in 1992; the cure ([Ford / Parsons / Kua](https://nealford.com/books/buildingevolutionaryarchitectures.html) and [Cyrille Martraire](https://www.infoq.com/articles/book-review-living-documentation/)) is automated fitness functions and living documentation. **The cure is not what pentaglyph ships today.**

The published source frameworks confirm the gap is structural:

- **arc42** — [Tip 5-22](https://docs.arc42.org/tips/5-22/) "Document interfaces with unit tests" is a *tip*, not a section
- **MADR** — the "Validation" section is *optional* ([Zimmermann](https://ozimmer.ch/practices/2022/11/22/MADRTemplatePrimer.html))
- **C4 / Structurizr** — [`structurizr validate`](https://docs.structurizr.com/cli/validate) checks the model file, not whether the model matches code
- **Diátaxis** — a taxonomy, not enforcement
- **TiSDD** — design templates, no verification primitives

## Proposal — what pentaglyph v2 should ship

Three deliverable categories, prioritised P0 → P2.

### Category A — AI-agent enforcement primitives

| ID | Deliverable | Priority |
|---|---|---|
| **A1** | `template/.claude/skills/pentaglyph-onboard/SKILL.md` — a Skill that forces 3 `Read` tool calls on `AI_INSTRUCTIONS.md` / `WORKFLOW.md` / `architecture-layers.md` before any docs/* edit. Step 2 walks `AI_INSTRUCTIONS §6` 7-item self-check as a structured checklist. | P0 |
| **A2** | `template/.claude/hooks/pre-doc-edit.sh` — a `PreToolUse` hook that blocks `Write`/`Edit` to `docs/**` unless a session-scoped "onboard-completed" marker exists. ([Anthropic Hooks docs](https://docs.claude.com/en/docs/claude-code/hooks).) | P2 |
| **A3** | `pentaglyph init` adds `.claude/skills/pentaglyph-onboard/` and `.claude/rules/documentation.md` to the host project so adopters get enforcement by default. | P2 |
| **A4** | Update `template/docs/AI_INSTRUCTIONS.md §2` to lead with: "Step 0 — Run `Skill(pentaglyph-onboard)` first or stop." Make the skill invocation formally required, not just suggested. | P0 |

### Category B — Architecture fitness functions

| ID | Deliverable | Priority |
|---|---|---|
| **B1** | `template/.importlinter` — `import-linter` contracts encoding the 4 baseline rules from `architecture-layers.md`: domain purity / cross-context independence / transport-direction / horizontal-module-leaf. Adopter projects pull the file and see violations from day 1. | P0 |
| **B2** | `pentaglyph scaffold context <name>` — CLI subcommand that creates `<project>/<name>/{domain,ports,adapters,use_cases,tests}/` with `__init__.py` markers. Replaces audit with **creation-time enforcement** of the directory rule. | P1 |
| **B3** | Make MADR's `Validation:` section **mandatory** in pentaglyph's MADR profile. The 5_adr.md template gains a required section linking to a `tests/architecture/test_adr_<id>.py` fitness function stub. The scaffolder generates the stub. | P1 |
| **B4** | `template/.github/workflows/ci.yml` step running `lint-imports`. Violation = build failure. | P0 |
| **B5** | Extend the existing `lifecycle-monitor` agent (`template/.claude/agents/lifecycle-monitor.md`) to run all import-linter contracts + ADR-paired tests weekly and post a delta report. | P2 |

### Category C — Doc-code parity

| ID | Deliverable | Priority |
|---|---|---|
| **C1** | `pentaglyph audit doc-paths` — CLI subcommand that greps every `mermaid` / `python` / `typescript` code fence in `docs/**` for filepath-shaped strings and verifies each exists. The QuantMind D2 mermaid `quantmind/trading/ports/broker_port.py` was caught by manual review; this catches it automatically. | P1 |
| **C2** | `spec-writer` / `adr-writer` / `discovery-agent` (in `template/.claude/agents/`) gain a mandatory "verify referenced paths exist" step before returning. Agent reports become proof of verification, not assertion. | P1 |
| **C3** | `template/scripts/dump_openapi.py` + `template/scripts/gen_api_types.sh` for projects with HTTP APIs (drift detection between backend Pydantic / OpenAPI and frontend TS types). | P2 |

## Effort estimate

Total ≈ **1-2 person-weeks** for a first-cut.

| Item | Effort | Blocks others? |
|---|---|---|
| A1, A4 | Low (skill + wording change) | No |
| B1, B4 | Low (template files) | No |
| B2 | Medium (new CLI subcommand) | No (B1 is useful without B2) |
| B3 | Medium (template + scaffolder) | No |
| C1 | Medium (new CLI + regex over fences) | No |
| A2, A3, B5, C2, C3 | Mostly Low — polish, distribution, agent updates | No |

None of these are breaking changes to existing adopters; all are additive.

## Reference implementation (already shipped in the source adopter)

QuantMind, the project that surfaced this proposal, has already prototyped the P0 items as proof-of-concept. The shapes can be lifted directly:

| Pentaglyph v2 deliverable | Source adopter reference |
|---|---|
| A1 SKILL.md | `<adopter>/.claude/skills/pentaglyph-onboard/SKILL.md` |
| A4 wording change | (proposed in this RFC) |
| B1 `.importlinter` | `<adopter>/.importlinter` (4 contracts, 0 broken after refactor) |
| B4 CI workflow | `<adopter>/.github/workflows/ci.yml` (3 jobs: pytest / arch-fitness / openapi-drift) |
| C3 openapi scripts | `<adopter>/scripts/{dump_openapi.py,gen_api_types.sh}` |

The adopter's full reasoning trace is at `<adopter>/docs/01-artefacts/reports/2026-05-23_pentaglyph-v2-rfc.md` and the verification baseline at `<adopter>/docs/01-artefacts/reports/2026-05-23_arch-verification-v2.md`. Those files contain the QuantMind-specific code paths; this proposal generalises the pattern for upstream.

## Why this matters beyond one adopter

Every project that adopts pentaglyph today inherits the same defect. The pattern is invisible until someone explicitly tries to verify compliance — at which point the gap can be 6 months of drift wide. Shipping the verification primitives changes the default from **"rules that decay"** to **"rules that fail loudly"**, which is the entire point of [Ford et al.'s fitness function thesis](https://www.thoughtworks.com/insights/articles/fitness-function-driven-development).

## References

### Literature

- [Cockburn — *Hexagonal Architecture Explained* v1.1b (2025)](https://alistaircockburn.com/hexarch%20v1.1b%20DIFFS%2020250420-1012%20paper+epub.docx.pdf) — Hexagonal as discipline, not structure
- [Li et al. 2022 — *Understanding software architecture erosion*](https://onlinelibrary.wiley.com/doi/10.1002/smr.2423) — systematic mapping of the phenomenon
- [Ford, Parsons, Kua — *Building Evolutionary Architectures*](https://nealford.com/books/buildingevolutionaryarchitectures.html) — fitness functions
- [Martraire — *Living Documentation*](https://www.infoq.com/articles/book-review-living-documentation/) — tests-as-docs
- [Nygard 2011 — Documenting Architecture Decisions](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [Zimmermann — MADR Template Primer](https://ozimmer.ch/practices/2022/11/22/MADRTemplatePrimer.html)
- [arc42 Tip 5-22](https://docs.arc42.org/tips/5-22/)
- [Java Code Geeks (2026-05) — Why most ADRs are never read](https://www.javacodegeeks.com/2026/05/the-reason-most-architecture-decision-records-get-written-and-never-read-is-architectural-not-cultural.html)

### Tooling

- [import-linter](https://github.com/seddonym/import-linter) — Python, contracts-as-TOML — primary recommendation for B1
- [Tach](https://github.com/tach-org/tach) — Python, Rust-backed, public-interface declarations — alternative for B1
- [ArchUnit](https://www.archunit.org/) — Java/Kotlin reference (incl. [archunit-hexagonal](https://github.com/whiskeysierra/archunit-hexagonal))
- [PyTestArch](https://pypi.org/project/PyTestArch/) / [ArchUnitPython](https://github.com/LukasNiessen/ArchUnitPython) — fluent ArchUnit-style for pytest
- [pydeps](https://github.com/thebjorn/pydeps) — import graph viz + cycle detection
- [Context Mapper](https://contextmapper.org/) — DDD bounded-context DSL
- [Anthropic — Claude Code Hooks](https://docs.claude.com/en/docs/claude-code/hooks)
- [Anthropic — Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills)
