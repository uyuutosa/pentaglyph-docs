---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-17
diataxis: reference
audience: anyone choosing a `--profile` flag
---

# Profile reference

> **What this is:** the exact list of sections each `--profile` installs, derived from the CLI source (`cli/src/lib/profiles.ts`) so it stays accurate. For *which profile to pick* in a given situation, see [how-to/adopt-existing-project.md](../how-to/adopt-existing-project.md).

```bash
pentaglyph init <target> --profile=<minimal|standard|full>
```

If `--profile` is omitted, the default is **`standard`**.

---

## Always installed (regardless of profile)

These sections are unconditional — every profile installs them.

| Section | Path | Purpose |
| --- | --- | --- |
| Root files | `docs/INDEX.md`, `docs/STRATEGY.md`, `docs/WORKFLOW.md`, `docs/AI_INSTRUCTIONS.md` | The four entry-point files. Without them the kit does not function. |
| `templates` | `docs/templates/` | All authoring templates (see [template-index.md](./template-index.md)). |

---

## `minimal` — architecture spine only

```text
docs/
├── INDEX.md          STRATEGY.md          WORKFLOW.md          AI_INSTRUCTIONS.md
├── templates/        ← always
└── arc42/            ← §1–§12 stubs + 09-decisions/ (MADR ADRs)
```

**Use when:**

- The project is a library, prototype, or single-team internal tool.
- You want the lightest possible scaffold to start.
- You are adopting pentaglyph on an existing codebase (see [how-to/adopt-existing-project.md](../how-to/adopt-existing-project.md)).

**Skipped:** C4 diagrams, detailed-design, api-contract, design-guide, all Layer B (impl-plans / task-list / postmortems / reports / cost-estimates), user-manual.

---

## `standard` — recommended default

```text
docs/
├── INDEX.md          STRATEGY.md          WORKFLOW.md          AI_INSTRUCTIONS.md
├── templates/        ← always
├── arc42/            ← §1–§12
├── diagrams/         ← C4 Structurizr DSL
├── detailed-design/  ← per-module specs
├── api-contract/     ← OpenAPI / GraphQL / MCP / RPC schemas
├── design-guide/     ← operational conventions
├── impl-plans/       ← dated implementation plans (Layer B)
├── postmortems/      ← incident retrospectives (Layer B)
└── reports/          ← one-shot research / evaluation reports (Layer B)
```

**Use when:**

- A normal product team with multiple modules.
- You have public APIs / RPC / GraphQL endpoints that need a contract surface.
- AI agents modify code regularly and you need the *code change → doc change* loop to bite.

**Skipped:** `task-list/`, `cost-estimates/`, `user-manual/`.

This is **the default profile**. If you do not know which to pick, this is it.

---

## `full` — customer-facing product

```text
docs/                 ← everything in `standard`
├── …
├── task-list/        ← sprint-scoped task breakdowns (Layer B)
├── cost-estimates/   ← cost projections (Layer B)
└── user-manual/      ← Diátaxis quadrants for end-user docs
    ├── tutorials/
    ├── how-to/
    ├── reference/
    └── explanation/
```

**Use when:**

- You ship a UI or API to actual users (internal or external).
- You need persona-/journey-driven end-user docs (Diátaxis).
- You track sprint-level work in-repo (rare but legitimate for some teams).

---

## Profile sections at a glance

| Section | `minimal` | `standard` | `full` |
| --- | :---: | :---: | :---: |
| `templates/` | ✅ | ✅ | ✅ |
| `arc42/` | ✅ | ✅ | ✅ |
| `diagrams/` (C4) | — | ✅ | ✅ |
| `detailed-design/` | — | ✅ | ✅ |
| `api-contract/` | — | ✅ | ✅ |
| `design-guide/` | — | ✅ | ✅ |
| `impl-plans/` | — | ✅ | ✅ |
| `postmortems/` | — | ✅ | ✅ |
| `reports/` | — | ✅ | ✅ |
| `task-list/` | — | — | ✅ |
| `cost-estimates/` | — | — | ✅ |
| `user-manual/` | — | — | ✅ |

The four entry-point root files (`INDEX.md`, `STRATEGY.md`, `WORKFLOW.md`, `AI_INSTRUCTIONS.md`) are installed unconditionally and are omitted from the table above.

---

## Overriding with `--include`

Use `--include` to pick an explicit list, ignoring the profile:

```bash
pentaglyph init ./my-app --include=arc42,detailed-design,api-contract --ai=claude
```

`--include` always installs the unconditional root files and `templates/` in addition to whatever you list.

If you find yourself reaching for `--include` more than once, your real intent is probably a different profile.

---

## Upgrading later

You do not have to re-init to add a section. `pentaglyph add <section>` is idempotent and only writes the directory you name:

```bash
pentaglyph add user-manual ./my-app
pentaglyph add task-list   ./my-app
pentaglyph add cost-estimates ./my-app
```

If you find you have run four or more `add` calls, you have effectively reached the next profile up. Note that in your team handbook so newcomers start at the right level.

---

## Known caveats

1. **`service-design`, `governance`, `metrics` are NOT in any predefined profile.** They exist under `template/docs/` and are valid `--include` values, but no profile (including `full`) installs them by default. Use them explicitly:
   ```bash
   pentaglyph init ./my-app --profile=full --include=arc42,diagrams,detailed-design,api-contract,design-guide,impl-plans,task-list,postmortems,reports,cost-estimates,user-manual,service-design,governance,metrics
   # or, more typically, add them after init:
   pentaglyph add service-design ./my-app
   pentaglyph add governance ./my-app
   pentaglyph add metrics ./my-app
   ```
   They are opt-in because most projects do not need them, but adopting teams should know they are available.
2. **There is no `--profile=enterprise` or similar tier.** Custom mixes of regulated-process scaffolding (heavy governance, SLSA attestations, etc.) are out of scope for the CLI; build them on top of `full` and check the result into your project's own repo.
3. **`--ai=claude` installs more than `.claude/rules/documentation.md`.** It also drops the full `.claude/` tree (agents + skills) into the target. See [ai-targets.md](./ai-targets.md) for details.

---

## Related

- [ai-targets.md](./ai-targets.md) — what each `--ai=<target>` installs
- [template-index.md](./template-index.md) — which templates live under `templates/`
- [`../../../../cli/README.md`](../../../../cli/README.md) — full CLI flag reference
- [`../../../../cli/src/lib/profiles.ts`](../../../../cli/src/lib/profiles.ts) — the source of truth this page is generated from
