---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-16
diataxis: how-to
audience: teams retrofitting pentaglyph onto a live codebase
---

# How to adopt pentaglyph in an existing project

> **Problem this guide solves:** you have an existing codebase with ad-hoc docs (or no docs), and you want pentaglyph to stick. How do you adopt it without spending three sprints retroactively documenting the past?

The short answer: **do not retro-document the past.** Adopt pentaglyph for *future* changes, then back-fill the few legacy concepts that are actively load-bearing. This guide walks the staged adoption that has the best success rate in practice.

---

## TL;DR

1. Run `pentaglyph init` with `--profile=minimal`.
2. Fill in **arc42 §1, §3, §5, §9 only**. Skip §2/§4/§6/§7/§8/§10/§11/§12 until you actually need them.
3. **Do not write ADRs for past decisions.** Only for decisions you make from now on, *and* for the 3–5 most load-bearing legacy decisions someone keeps re-litigating.
4. Migrate any existing ad-hoc docs into pentaglyph layout one at a time, on the PR that next changes them.
5. After 4–6 weeks, evaluate whether to upgrade to `--profile=standard` (adds detailed-design, api-contract, design-guide, impl-plans, postmortems, reports).

---

## Phase 0 — Don't do these things

Before the staged plan, the **anti-patterns** that kill adoption:

| Anti-pattern | What goes wrong |
| --- | --- |
| Spend a sprint writing all past ADRs | Stalls real work; nobody reads them; team perceives pentaglyph as overhead |
| Run `pentaglyph init --profile=full` on day 1 | 14 directories appear; nobody knows which to fill; analysis paralysis |
| Auto-generate docs from code with an LLM | Produces high-volume, low-signal text that *looks* canonical but rots immediately |
| Make "fill in arc42" a separate work-item | Detaches doc writing from code work, which is exactly the failure pentaglyph fixes |
| Move every existing `README.md` into pentaglyph layout in one PR | Diff-bomb that nobody can review |

If you find yourself doing any of these, stop and re-read this section.

---

## Phase 1 — Minimal scaffold (Day 1, ~30 minutes)

From your repo root:

```bash
bunx --bun @uyuutosa/pentaglyph init . --profile=minimal --ai=claude --name="My App"
```

`--profile=minimal` gives you:

- `docs/AI_INSTRUCTIONS.md`, `docs/WORKFLOW.md`, `docs/STRATEGY.md`, `docs/INDEX.md`
- `docs/templates/` (the authoring shapes)
- `docs/arc42/` (the §1–§12 stubs)
- `.claude/rules/documentation.md` (the AI auto-load rule)

That is it. No `detailed-design/`, no `api-contract/`, no `user-manual/` — yet. See [reference/profiles.md](../reference/profiles.md) for what each profile contains.

> **Why `minimal`?** A bigger profile is a temptation to fill everything. The cost of unfilled directories is *high*: they make the repo look poorly maintained and they confuse newcomers. Empty arc42 stubs are tolerable because the structure itself is informative. Empty `detailed-design/` is not.

Commit:

```bash
git add docs/ .claude/
git commit -m "docs: adopt pentaglyph scaffold (minimal profile)"
```

This is one PR. It changes nothing about your code, and reviewers can approve it without reading 800 files.

---

## Phase 2 — Fill four arc42 sections only (Week 1)

Open these four files and write the minimum that captures *current reality*. Do not aspire; describe.

| File | What goes in it | Length |
| --- | --- | --- |
| `docs/arc42/01-introduction-and-goals/` | What does this product do? Who is it for? What are its 2–3 quality goals? | 1–2 pages |
| `docs/arc42/03-context-and-scope/` | What systems does it integrate with? What is *out* of scope? | 1 page + a C4 system-context diagram (or a placeholder noting "to be drawn") |
| `docs/arc42/05-building-blocks/` | What modules / services exist *right now*? Just list them with a one-line purpose each | 1 table |
| `docs/arc42/09-decisions/` | Empty for now. Just confirm `0000-template.md` is present | 0 |

The remaining arc42 sections — constraints (§2), solution strategy (§4), runtime view (§6), deployment view (§7), crosscutting (§8), quality requirements (§10), risks (§11), glossary (§12) — wait until you have a concrete reason to fill them. The arc42 standard explicitly endorses partial coverage; do not feel obligated.

> **Hard rule:** describe the system as it *is today*. If a section makes you write *"we plan to…"*, you are writing the wrong artefact. That belongs in `impl-plans/` (Phase 5+).

---

## Phase 3 — Start the *code change → doc change* habit (Week 2 onward)

This is the only phase that matters long-term.

On the next non-trivial PR you open:

1. Identify the affected modules and look them up in `docs/arc42/05-building-blocks/`.
2. If a building-block entry exists, update its one-line summary if the change shifts what the module does.
3. If the change adds a public API, create `docs/detailed-design/<module>.md` from `templates/3_module-detailed-design.md` and describe the new API there. (Yes, you are now using a directory that `--profile=minimal` did not create — go ahead and create it.)
4. If the change involves a non-obvious decision someone might question later, write an ADR using `templates/5_adr.md`.

Ask Claude to help (per [how-to/use-with-claude-code.md](./use-with-claude-code.md)):

> "I am about to push this diff. Apply pentaglyph's code change → doc change rule. List doc updates I need to make in *this* PR, citing `docs/WORKFLOW.md §2`."

The first three or four PRs feel awkward. By PR five, it stops being a separate activity.

---

## Phase 4 — Back-fill load-bearing legacy decisions only (Week 2–4)

Do not write ADRs for every choice your team has ever made. Write them for the **3–5 decisions someone keeps re-litigating**.

A practical heuristic: in the last six months, which decisions has someone asked *"why did we choose X again?"* about? Those are the ADR candidates. For each one:

1. Open `templates/5_adr.md`.
2. Fill it from memory + a 10-minute chat with whoever was there.
3. Mark `Status: Accepted` and `Date: <when the decision was actually made, not today>`.
4. Add a footnote: *"Retroactively recorded YYYY-MM-DD."*

Three to five back-filled ADRs is enough. More than that and you are doing the anti-pattern from Phase 0.

---

## Phase 5 — Migrate existing ad-hoc docs (Week 3 onward, opportunistic)

You probably have a `docs/architecture.md` or a `README.md` with a section that should really be a module detailed-design. **Do not move them all at once.** Move them one at a time, on whichever PR next touches the relevant code.

A useful prompt for Claude when you hit one of these:

> "This PR changes `src/auth/`. There is an old `docs/architecture.md` with a section called *Authentication*. Migrate that section into `docs/detailed-design/auth.md` using `templates/3_module-detailed-design.md`. Delete the migrated section from `architecture.md` and replace it with a one-line link."

After 4–8 weeks of this, the legacy doc shrinks naturally. Eventually you delete it.

---

## Phase 6 — Upgrade the profile (Week 4–6, optional)

When you find yourself *needing* a directory `--profile=minimal` did not create — say, you start tracking implementation plans dated by sprint — run:

```bash
bunx --bun @uyuutosa/pentaglyph add impl-plans .
# or, all in one go:
bunx --bun @uyuutosa/pentaglyph add api-contract .
bunx --bun @uyuutosa/pentaglyph add detailed-design .
bunx --bun @uyuutosa/pentaglyph add design-guide .
```

`add` is idempotent and only writes the directories you name. No need to re-init.

If you find you have used four or more `add` sections, you have effectively upgraded to `--profile=standard`. Reflect that in your team handbook so newcomers run the same.

---

## A timeline you can show your team

| Week | Activity | Effort |
| --- | --- | --- |
| 0 | `pentaglyph init --profile=minimal` | 30 min |
| 1 | Fill arc42 §1, §3, §5 | 2–3 hours |
| 1–4 | Apply *code change → doc change* on every PR | ~10 min per PR |
| 2–4 | Back-fill 3–5 load-bearing ADRs | 30 min each |
| 3 onward | Migrate ad-hoc docs opportunistically | When you happen to touch the code |
| 4–6 | Upgrade profile if you actually need it | 5 min per `add` |

Total deliberate effort in the first month: **roughly one day of work, spread across four weeks, *plus* a small tax on every PR**. The tax is the point — that is where the value lives.

---

## When *not* to adopt pentaglyph

A few project shapes do not benefit:

- **Throwaway scripts / one-shot prototypes.** Cost > benefit. A single `README.md` is enough.
- **Pure documentation repositories** (e.g. a guides site). Use Diátaxis directly; pentaglyph's arc42 + ADR layer adds nothing.
- **Codebases that will be deleted in < 3 months.** ADRs and detailed-design pay off across team turnover and time — they do not pay off in 90 days.

Everything else, including small teams, benefits.

---

## Related

- [tutorials/getting-started.md](../tutorials/getting-started.md) — first-run on a fresh project
- [how-to/use-with-claude-code.md](./use-with-claude-code.md) — daily Claude workflow
- [how-to/choose-the-right-template.md](./choose-the-right-template.md) — what to write when
- [reference/profiles.md](../reference/profiles.md) — minimal / standard / full
- [explanation/why-pentaglyph.md](../explanation/why-pentaglyph.md) — why this exists at all
