---
status: Draft
owner: <placeholder>
last-reviewed: <YYYY-MM-DD>
---

# arc42 §8 — Crosscutting Concepts

> Authoritative source: <https://docs.arc42.org/section-8/>
>
> This section answers: *what design rules apply across multiple building blocks?*

## What lives here

One file per concern. Common concerns:

| Suggested file              | Purpose                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `error-strategy.md`         | Error model, retry policy, circuit breakers, user-facing error contracts                                      |
| `auth-and-pii.md`           | Authentication, authorization, PII handling, data minimisation                                                |
| `observability.md`          | Logging, metrics, tracing, alerting conventions                                                               |
| `performance.md`            | Performance budgets, hot-path conventions, caching strategy                                                   |
| `state-management.md`       | Where state lives (client / server / both), idempotency rules                                                 |
| `testing-strategy.md`       | Mock vs live boundary, contract-test policy, fixture conventions, what runs in CI vs nightly vs release smoke |
| `internationalisation.md`   | i18n / l10n conventions                                                                                       |
| `accessibility.md`          | A11y baseline (WCAG level, screen-reader contract)                                                            |

Add files only for concerns that **actually span ≥ 2 building blocks**. A concern relevant to a single building block belongs in that building block's detailed-design file.

### Testing strategy — what `testing-strategy.md` should answer

A concrete testing rule sheet every building block must follow. The crosscutting **policy** lives here; per-module test inventories live in each `detailed-design/<module>.md §9` (see [`../../templates/3_module-detailed-design.md`](../../templates/3_module-detailed-design.md)).

Topics this file should cover:

1. **Mock boundary.** Which layers may use mocks (typically unit-level, in-process collaborators)? Which layers MUST hit a real dependency (broker sandbox, real DB via testcontainers, live LLM endpoint with golden recordings, real cloud SDK via Azurite / LocalStack / fake-gcs-server)? State the rule and the failure mode it prevents (e.g. "mocked broker hides settlement-date and partial-fill semantics that only the sandbox reproduces").
2. **Contract tests.** When the system exposes a public interface (Port / Protocol, REST API, message schema), define the contract-test mandate: which adapters are exercised, against which real backend, at what cadence. Pure mocks against a Port are insufficient — a Port without an adapter contract test is unverified.
3. **Live / sandbox tests.** Enumerate live or sandbox endpoints used in tests (paper-trading sandbox, real cloud emulators, market-data sanity feed). State which are mandatory before merge, which run nightly, which gate releases.
4. **Fixture / recording policy.** Where canonical recordings live, how they are refreshed, and the guard against silent drift (e.g. recording hash committed in repo, refresh ADR required).
5. **CI lanes.** What runs on every PR, what runs nightly, what runs on release. Why the split (cost vs feedback time vs flakiness budget).

Avoid restating tool-specific docs (pytest, vitest, Playwright) — link out and focus on the project-specific *rules*.

## How to write here

1. Use Template 0 (default) or Template 1 trimmed.
2. State the **rule** (the convention every building block must follow), then the **rationale** (why this rule, not alternatives).
3. Link out to library / framework docs rather than re-explaining how the underlying tool works.

For lifecycle / when to update, see [`../../WORKFLOW.md`](../../WORKFLOW.md).

## Cross-references

- §5 Building Blocks — each building block's detailed-design file declares which §8 concerns apply to it
- §9 Decisions — ADRs that justify a §8 rule (e.g. "Adopt OpenTelemetry as the tracing standard")
- §10 Quality — quality scenarios that motivate §8 rules
