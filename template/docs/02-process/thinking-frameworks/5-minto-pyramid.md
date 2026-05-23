---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-19
framework: Minto Pyramid Principle + SCQA
stage: 5 — Communicate
binds: Barbara Minto, *The Pyramid Principle* (1973, latest ed. 2009)
---

# Minto Pyramid + SCQA — Stage 5: Communicate

Structure any business / engineering communication so that:

1. **Answer first** — the main point goes at the top
2. **Supporting groups below** — each child is a reason / sub-point that supports its parent
3. **Each group is MECE** ([`_foundation-mece.md`](./_foundation-mece.md)) — mutually exclusive, collectively exhaustive
4. **SCQA opening** — set up the answer with Situation → Complication → Question → Answer

Works for any deliverable: 1-line Slack message, 1-page memo, 10-page report, 30-slide deck, 60-min presentation.

## Authoritative source

- **Barbara Minto**, *The Pyramid Principle: Logic in Writing and Thinking* (1973, latest ed. 2009): <https://www.barbaraminto.com/>
- Plain explainer: <https://slideworks.io/resources/the-pyramid-principle-mckinsey-toolbox-with-examples>, <https://modelthinkers.com/mental-model/minto-pyramid-scqa>
- Cultural note: this is the de-facto canon for consultant writing at McKinsey / BCG / Bain / investment banks
- Don't re-author — link out.

## When to use

- **Any** communication where the reader / listener needs to *act* on what you said (decide / approve / route / understand)
- **Especially**: weekly status updates, decision memos, executive summaries, Slack proposals, PR descriptions, client presentations
- When the reader is **busy** — answer-first means they get the conclusion even if they read only the first paragraph

## When NOT to use

- **Tutorial / teaching content** — Diátaxis tutorials are by-design narrative, not answer-first. Use [Diátaxis](https://diataxis.fr) instead
- **Reference docs** — API references are organised by topic, not by argument structure
- **Code** — code comments follow different conventions (`coding-style.md`)
- **Pure creative writing** — narratives, stories, ideation drafts

## SCQA template (the opening)

| Element | What it says |
| --- | --- |
| **S — Situation** | A fact the reader / listener already agrees with — sets common ground |
| **C — Complication** | Something happened / changed that disrupts the Situation — creates tension |
| **Q — Question** | The question that the Complication forces — what must be decided / understood |
| **A — Answer** | The main point (= top of the pyramid) — directly answers Q |

Then the body unfolds: each supporting argument is itself a pyramid (recursive structure).

## Worked example — Slack proposal

❌ **Without Pyramid** (chronological, no signal):
> Cinematic R&D の cooling-off period の件、藤原さんから 5/15 にご依頼があって、Phase 1 動作実証は完了したんですが、その先のシェア機能を考えると、市民が感情的にすぐシェアしてしまうリスクがあるなと思って、A〜E の 5 案を検討してみたんですけど、それぞれメリットデメリットがあって、どう思いますか？

✅ **With Pyramid + SCQA**:

> **24 時間 cooling-off (B 案) を推奨します**。
>
> *S*: Cinematic R&D は感情に強く訴える Layer 0 体験です。
> *C*: 市民が感情ピーク時に「家族に送信」を即決すると、冷静になった後で「公開したくなかった」と後悔するケースが想定されます。
> *Q*: 後悔を最小コストで防ぐ仕組みは？
> *A*: 24h cooling-off。理由 3 点：
>   1. 後悔窓を担保（**最重要**）
>   2. ユーザー操作を増やさない
>   3. Layer 別の複雑性を持ち込まない
>
> 5 option 比較は appendix。

Reader gets the recommendation in 1 line. Stakeholders who only have 10 seconds can decide. Stakeholders with 2 minutes get the reasoning. Stakeholders who want the option matrix go to appendix.

## Worked example — weekly status (Atlassian 4-block + Minto)

Each of the 4 blocks (Priorities / Progress / Problems / Next) is itself a mini-pyramid:

> ## Progress
> **The biggest move this week: agui-keel framework lift completed (607 → 145 lines, −76%).**
>
> Three supporting items:
> 1. Extraction complete — framework now ready for cross-project reuse
> 2. Backwards-compat maintained — no consumer-side breakage
> 3. CI green throughout — no behavioral regression
>
> Smaller items: 5 PRs merged for typo fixes, doc cross-link updates, …

The lead sentence is the answer; supporting bullets are MECE.

## Common failures

| Failure | Example | Fix |
| --- | --- | --- |
| Chronological / discovery order | "First I noticed X, then I investigated Y, then I found Z, so my conclusion is…" | Invert: state Z first, then "because Y, which we found by investigating X" |
| Buried lede | Recommendation in paragraph 4 | Move recommendation to sentence 1 |
| Non-MECE supporting groups | Reasons 1 and 2 overlap, and reason 4 doesn't actually support the parent | Apply [`_foundation-mece.md`](./_foundation-mece.md) at each pyramid level |
| Skip SCQA | Jump straight to the answer with no setup | Add 1-2 lines: Situation + Complication (skip Q if obvious) |
| Pyramid without answer | Pure analysis dump, no top-level claim | If you can't write the top of the pyramid, you don't yet have an answer — go back to Stage 2 |
| Apologetic hedging | "I think maybe we could possibly consider B" | State the answer cleanly; reserve hedging for the body where uncertainty is quantified |

## How to retrofit existing writing

If you have already-written prose that lacks Pyramid structure:

1. **Find the answer** — what's the single sentence the reader most needs?
2. **Move it to the top** — verbatim if possible
3. **Group the rest** — re-sort supporting paragraphs into 2-5 supporting groups (MECE)
4. **Add SCQA opening** if the answer needs setup
5. **Cut what doesn't support** — anything that doesn't fit a supporting group is appendix or deleted

Most reports / Slack posts shrink by 30-50% in this retrofit. The reader gets the same value in less time.

## Pairing with other frameworks

- **Communicates the output of** [`1-issue-tree.md`](./1-issue-tree.md) (analysis), [`2-hypothesis-driven.md`](./2-hypothesis-driven.md) (investigation), [`3-pareto-80-20.md`](./3-pareto-80-20.md) (prioritization), [`4-ooda-loop.md`](./4-ooda-loop.md) (after-action)
- **Pyramid grouping at every level** uses [`_foundation-mece.md`](./_foundation-mece.md)
- **PEL artefacts** (`client-engagement/01-artefacts/reports/`, `daci/`, `decisions/`) should all be Pyramid-structured

## Related

- [`./README.md`](./README.md) — directory overview + decision tree
- [`./_foundation-mece.md`](./_foundation-mece.md) — MECE is a core sub-principle of Pyramid
- [`../../client-engagement/01-artefacts/reports/README.md`](../../client-engagement/01-artefacts/reports/README.md) — PEL reports apply Pyramid by convention
