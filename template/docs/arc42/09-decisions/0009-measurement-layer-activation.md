---
status: Proposed
owner: <placeholder>
last-reviewed: 2026-05-14
---

# ADR-0009: Activate Layer ⑤ Measurement (optional) — when, what, and the dogfooding baseline

| Metadata  | Value                                                          |
| --------- | -------------------------------------------------------------- |
| Status    | **Proposed**                                                   |
| Type      | ADR (Type 5 / MADR v3.0 / arc42 §9) — self-ADR for the kit     |
| Date      | 2026-05-14                                                     |
| Deciders  | pentaglyph upstream maintainer + adopting project PO            |
| Consulted | downstream maintainers running pentaglyph in CI                 |
| Informed  | all pentaglyph users                                            |
| Ticket    | Tracked via roadmap impl-plan 2026-05-14 Phase 5                |

---

## Context and Problem Statement

[ADR-0001](0001-adopt-five-layer-self-architecture.md) introduces Layer ⑤ Measurement as the kit's sixth concern layer, but explicitly marks it **optional** with no concrete activation criteria. [ADR-0007](0007-automation-layer-contract.md) §3 reserves `metrics/` as the destination for Layer ⑤ outputs and `scripts/docs/metrics_*.py` as Layer ③ Automation producers, but does not specify what those scripts measure, when they should run, or how downstream projects opt in.

Without an explicit activation contract:

- Adopters can't tell whether to wire metric scripts into CI, and what to do with the output.
- Future contributors can't predict whether a new metric proposal will be in scope.
- The kit ships scripts that may or may not be supported — credibility risk.

This ADR closes the gap by:

1. Naming the **5 metric categories** the kit supports (3 implemented today, 2 reserved for future expansion).
2. Defining **when downstream projects should activate** Layer ⑤ (criteria + signal).
3. Establishing a **dogfooding baseline** so the kit itself is held to the same metric discipline it asks of others.

---

## Decision Drivers

- **DD-1 (highest)**: Honesty about scope. Optional means optional — adopters must be able to skip Layer ⑤ entirely without losing kit value.
- **DD-2**: Predictability for future metric additions. The 5-category enumeration is the criterion for in-scope vs out-of-scope.
- **DD-3**: Layer-writes discipline. Per [ADR-0007](0007-automation-layer-contract.md), metric scripts read all layers and write only to stdout / `metrics/`. This ADR confirms.
- **DD-4**: Dogfooding. The kit applies its own discipline to itself via [`baseline.md`](../../metrics/baseline.md).

---

## Considered Options

1. **Skip Layer ⑤ entirely**. Drop the optional layer from [ADR-0001](0001-adopt-five-layer-self-architecture.md); ship without measurement.
2. **Ship scripts but no activation criteria**. Adopters figure it out themselves.
3. **5-category activation contract** (chosen). Enumerate categories, give criteria, dogfood.
4. **Mandatory Layer ⑤**. Force every adopter to run metrics in CI.

---

## Decision Outcome

**Chosen option: Option 3 — 5-category activation contract**.

### 3.1 The 5 categories

| # | Category | Status | Script | What it measures |
| --- | --- | --- | --- | --- |
| 1 | **Coverage** | ✅ implemented | [`scripts/docs/metrics_coverage.py`](../../../scripts/docs/metrics_coverage.py) | arc42 §1-§12 + detailed-design + use-cases / PRDs existence + substantive-content coverage |
| 2 | **Freshness** | ✅ implemented | [`scripts/docs/metrics_freshness.py`](../../../scripts/docs/metrics_freshness.py) | Durable-doc `last-reviewed` age distribution + staleness warnings |
| 3 | **ADR throughput** | ✅ implemented | [`scripts/docs/metrics_adr.py`](../../../scripts/docs/metrics_adr.py) | ADR Status distribution + monthly throughput + stale-Proposed flag |
| 4 | **Doc rot detection** | 🔜 future | TBD | Broken cross-references + spec/code divergence heuristics |
| 5 | **Adoption (kit-level only)** | 🔜 future | TBD | Public downstream-project count + binding diversity (DORA-style for the kit itself) |

Additional categories require a follow-up ADR superseding or amending this one.

### 3.2 Activation criteria for downstream projects

**Activate Layer ⑤** when any of the following holds:

- The project has > 50 durable docs (manual freshness review no longer scales).
- The team has ≥ 3 active engineers (coordination via metrics scales better than ad-hoc review).
- A regulatory or contractual audit requires measurable doc discipline (medical / financial / public-sector).
- The team feels their docs are silently rotting (subjective but real — common signal in 6+ month-old projects).

**Skip Layer ⑤** when:

- Solo / 1-2 engineer project. Direct review covers the surface.
- Early prototype (< 3 months old). Premature measurement creates noise.
- The team explicitly prefers periodic manual audits over CI-driven metrics.

The decision is reversible: a project may activate / deactivate Layer ⑤ at any time without disturbing layers ⓪-④.

### 3.3 What activation looks like

1. **Wire scripts into CI**. Run all three (`coverage`, `freshness`, `adr`) against the project's `docs/` on every PR; emit markdown / JSON to a CI artefact.
2. **Set thresholds**. Add a CI gate (e.g. coverage ≥ 80%, no rotten docs, no ADRs Proposed > 30 days). Tighten over time.
3. **Periodic snapshots**. Commit dated snapshot files to `docs/metrics/snapshots/YYYY-MM-DD_*.md` for trend tracking.
4. **Wire dashboards** (optional). Pipe JSON output to Grafana / Datadog / custom MkDocs plugin.

### 3.4 Dogfooding baseline

The kit itself runs the 3 implemented scripts against its own `template/docs/` and commits the snapshot to [`template/docs/metrics/baseline.md`](../../metrics/baseline.md). The baseline is updated on every kit minor-version bump.

Current baseline (2026-05-14):

- Coverage: 58/58 substantive (100%); 2 placeholder sections (use-cases, prds) intentionally empty.
- Freshness: 40/61 fresh (<30d), 21 missing `last-reviewed` (mostly arc42 section READMEs that use placeholder dates).
- ADRs: 8 total (0001-0008), all `Proposed` pending PO acceptance.

### Y-statement summary

> In the context of **defining when and how Layer ⑤ Measurement is activated**, facing **the tension between making the layer truly optional and ensuring it has a coherent contract when used**, we decided for **a 5-category enumeration (3 implemented + 2 future) with explicit activation criteria + a dogfooded baseline** to achieve **optional-by-default, scalable-by-activation Measurement that downstream projects can predictably adopt**, accepting **that some adopters will skip Layer ⑤ entirely and that the kit must support both code paths**.

---

## Pros and Cons of the Options

### Option 1: Skip Layer ⑤ entirely

- Pros:
  - Smallest kit surface.
- Cons:
  - Adopters who want measurement build it from scratch.
  - The kit's documentation discipline (freshness / coverage) is unprovable.

### Option 2: Ship scripts but no activation criteria

- Pros:
  - Scripts exist; adopters can use them.
- Cons:
  - Adopters can't predict whether new metric proposals fit the kit's scope.
  - No dogfooding — credibility risk.

### Option 3: 5-category activation contract (chosen)

- Pros:
  - Clear scope. Adopters know what to expect.
  - Dogfooded — adopters can verify the kit applies its own discipline.
  - Optional remains genuinely optional.
- Cons:
  - 2 of 5 categories are documented but not implemented. Adopters wanting categories 4-5 wait or implement themselves.

### Option 4: Mandatory Layer ⑤

- Pros:
  - Forces measurement discipline.
- Cons:
  - Defeats the "optional" framing from [ADR-0001](0001-adopt-five-layer-self-architecture.md).
  - Small / early-stage projects suffer setup overhead with no benefit.

---

## Consequences

### Positive

- The kit ships measurable, dogfooded discipline.
- Future metric proposals route through this ADR (or a follow-up amending §3.1).
- Downstream adopters get an activation playbook, not a vague "consider measuring".

### Negative

- Two categories (doc rot, adoption) are listed but not implemented — adopters wanting them must wait or contribute upstream.
- The CLI subcommand requires Python 3.10+ on PATH; adopters on Python-less systems either run scripts via Python container or skip the CLI (direct script invocation).

### Neutral

- Layer ⑤ does not change behaviour for adopters who skip it.
- The 5-category enumeration is not a permanent ceiling — follow-up ADRs may add categories 6+.

### Follow-ups

- [ ] Implement category 4 (doc rot detection): broken-link scanner + spec/code divergence heuristic. Estimated 3-5 days.
- [ ] Implement category 5 (adoption): only applicable to the kit upstream itself. Public scan via GitHub Code Search API. Estimated 2-3 days.
- [ ] Add `--coverage-threshold=N` and `--no-rotten` flags to `bunx pentaglyph metrics` for CI gate use.
- [ ] Add a GitHub Action template (`.github/workflows/metrics.yml`) that adopters can copy.

---

## Compliance / Validation

- Verification:
  - The 3 implemented Python scripts in `scripts/docs/` exist and run end-to-end against `template/docs/` (verified by the baseline).
  - `bunx pentaglyph metrics` wraps the 3 scripts (verified by integration smoke test, forthcoming).
  - [`template/docs/metrics/baseline.md`](../../metrics/baseline.md) exists and is updated on every minor-version bump.
- Frequency: per-PR + per-release.

---

## More Information

### Related ADRs

- Builds on: [ADR-0001](0001-adopt-five-layer-self-architecture.md) — names Layer ⑤ as optional.
- Operationalises: [ADR-0007](0007-automation-layer-contract.md) — Layer ③ scripts produce Layer ⑤ outputs.
- Complements: [ADR-0008](0008-governance-layer-contract.md) — `adr-accept-protocol.md` references the `metrics_adr.py` stale-Proposed flag.

### References

- [`STRATEGY.md §12 Layer ⑤ Measurement`](../../STRATEGY.md)
- [`scripts/docs/README.md`](../../../../scripts/docs/README.md)
- [`template/docs/metrics/README.md`](../../metrics/README.md)
- [`template/docs/metrics/baseline.md`](../../metrics/baseline.md)
- Forsgren, Humble, Kim (2018). [Accelerate](https://itrevolution.com/product/accelerate/) — DORA framework, candidate for future Layer ⑤ metric category 5.
