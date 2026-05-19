---
status: Draft
owner: pentaglyph upstream maintainer + downstream PO (Digital Twin PoC reference adopter)
last-reviewed: 2026-05-16
---

# pentaglyph `docs/` 配下の explicit layer-prefixed directories 移行ロードマップ

| メタ情報         | 値                                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| 作成日           | 2026-05-16                                                                                                        |
| 有効期限（目安） | 2026-06-30（Phase 5 完了想定）                                                                                    |
| ステータス       | 📋 Draft（PO 承認待ち、mass-rename 実行前の go/no-go ゲートあり）                                                  |
| 親 ADR           | [ADR-0010](../arc42/09-decisions/0010-explicit-layer-prefixed-directories.md) — 採用判断                          |
| 関連 ADR         | [ADR-0001](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md) (5+1 層) / [ADR-0004](../arc42/09-decisions/0004-layer-separation-contracts.md) (依存方向) / [ADR-0007](../arc42/09-decisions/0007-automation-layer-contract.md) (Layer ③ は repo root) |
| 関連 case-study  | [2026-05-16_digital-twin-downstream-process-binding.md](../../../case-studies/2026-05-16_digital-twin-downstream-process-binding.md) — この移行が surface された経緯 |
| 関連 impl-plan   | [2026-05-14_pentaglyph-self-architecture-roadmap.md](./2026-05-14_pentaglyph-self-architecture-roadmap.md)（5+1 層を確立した親ロードマップ。本書はその上で**ディレクトリ可視化**を実装する具体パッチ） |
| 影響範囲         | pentaglyph upstream（kit 本体）+ 全 downstream consumer（subtree / npm install）                                  |
| 起票者           | Yu (PO) + Claude Code 補助                                                                                        |

---

## 0. TL;DR

[ADR-0010](../arc42/09-decisions/0010-explicit-layer-prefixed-directories.md) の決定を実装する。`docs/` 配下のディレクトリを `01-artefacts/` / `02-process/` / `04-governance/` / `05-measurement/` に明示プレフィックス化し、レイヤ membership をパスから読めるようにする。Layer ⓪ はディレクトリを持たず、Layer ③ は repo root に留まる（変更なし）。

> **Pre-flight 要件（不変）**: 進行中の PR / worktree を merge or close してから着手する。`develop` が単一の安定点になっている状態でないと subtree pull が衝突を起こす。

---

## 0.5 現状スナップショット — 2026-05-17 時点（Phase 0.4 ゲート bypass で実行中）

> **2026-05-17 PO 判断**: Phase 0.4（active PR 解消）ゲートを bypass し、Sprint 8 中に restructure を実行する。理由: paperwork + binding が完成し migrate script + 53 ユニットテストで安全性が verify されたため、Sprint 9 開始まで待つ価値が薄れた。他 active PR (#815 / #817 / #801 / #809 / #816) との merge 競合は手動 rebase で対応する（特に #809 が `docs/01-artefacts/detailed-design/infra/ci-cd/` を触っている場合に注意）。

## 0.6 旧スナップショット — 2026-05-16 時点（履歴保持）

セッション 2026-05-16 終了時点。本ロードマップは **Phase 0.4 (active PR/worktree 解消) で停止**している。再開時はこのスナップショットの状態と現状を比較し、blocker が解消されているか確認すること。

### Blocking — active PRs (5 件、downstream ADO)

| PR# | Title | Source branch | Author |
|-----|-------|--------------|--------|
| #816 | refactor(backend): move assets/ + prompts/ to shared/ #AB#1625 | feature/AB1625-backend-src-shared-layer-move | Sato |
| #817 | fix(tier-3): modal a11y campaign + 5 bugs / +44 tests #AB#1634 | feature/strict-review-tier3 | Jang |
| #815 | fix(tier-2): 11 modal/markdown bugs + coverage gap fill (+140 tests) #AB#1615 | feature/strict-review-phase2-tier2 | Jang |
| #809 | ci(cd): add DocsLifecycle stage for WikiSync after AB#1261 #AB#909 | feature/AB909-cd-wikisync | Sato |
| #801 | test(area5): B2 + B7 scenarios + gap audit roadmap (post-#795) | feature/AB1229-area345-scenario-stubs | Jang |

### Blocking — active worktrees (2 件)

- `feature/AB1625-backend-src-shared-layer-move` ← PR #816 と紐付き
- `feature/AB1607-scrum-cadence-binding` ← case-study Track 1 の作業中

prunable worktree 3 件（`worktree-agent-*`）は再開前に `git worktree prune` で削除可能。

### 既に着手済 (paperwork + 準備実装)

セッション 2026-05-16 で以下が完了している:

- [x] [ADR-0010 upstream](../arc42/09-decisions/0010-explicit-layer-prefixed-directories.md) (Proposed)
- [x] ADR-0034 downstream (Proposed) — lives in the downstream consumer's own `docs/01-artefacts/arc42/09-decisions/0034-adopt-layer-prefixed-directories.md`
- [x] 本 impl-plan (Draft)
- [x] paperbanana 仕様 [`assets/layers.txt`](../../assets/layers.txt) + 画像 [`assets/layers.png`](../../assets/layers.png)
- [x] `pentaglyph-self-architecture.md §3` に layers.png 埋め込み + ADR-0010 への参照

セッション 2026-05-17 で以下が完了している:

- [x] **Phase 1.6a 完了 — migrate スクリプト実装**: [`scripts/docs/migrate_layer_paths.py`](../../../../../scripts/docs/migrate_layer_paths.py) を実装。`--scope=upstream | downstream | both` + `--apply` 付き。冪等性あり、fenced code block 除外、17 件のユニットテスト ([`scripts/docs/tests/test_migrate_layer_paths.py`](../../../../../scripts/docs/tests/test_migrate_layer_paths.py)) 全件パス
- [x] dry-run 検証完了: upstream で 30 ファイル / 161 件置換、downstream で 490 ファイル / 3155 件置換を確認
- [x] [ライフサイクル 3 ルール binding](../../design-guide/ai-augmented-lifecycle.md) (upstream Layer ②) + [downstream ADO Agile 具象 binding](../../../../../docs/02-process/ai-lifecycle-binding.md) + 6 skills / 2 agents / `.claude/rules/azure-devops.md` / `CLAUDE.md` DoD 更新 — PR #820 でレビュー中

### 再開プロトコル

1. 上記 5 PR が全て `Closed`（merged）または `Removed` 状態になったか `az repos pr list --status active` で確認
2. active worktree が `/home/yu/proj/ACN/五十嵐さんBot` のみになったか `git worktree list` で確認
3. ADR-0010 / ADR-0034 を `Proposed → Accepted` に PO 承認で昇格
4. Phase 0.6 で `git tag pre-layer-restructure-YYYY-MM-DD` をバックアップ tag として打つ
5. Phase 1 に着手

### 推奨着手タイミング

- **Sprint 9 開始時** (2026-05-19 月曜 想定) — Sprint 8 active PR が金曜までに自然 merge する前提
- Sprint 8 Review (`/sprint-review` 完走) 直後に Phase 0.6 → Phase 1 を開始

---

## 1. 背景・動機

[ADR-0010 §Context](../arc42/09-decisions/0010-explicit-layer-prefixed-directories.md#context-and-problem-statement) で詳述しているため要約のみ:

1. レイヤ membership が `pentaglyph-self-architecture.md §3.1` の表を引かないと判別できない
2. 依存方向違反（Layer ① → Layer ② など）が path 文字列に visual signal を残さない
3. 層認識 lint（ADR-0004 Follow-up）が hard-code lookup table を要する

これらは 2026-05-16 の downstream Layer ② binding 作業（Digital Twin PoC ケーススタディ、`ai-augmented-lifecycle.md` 起草）で具体的に friction として顕在化した。

---

## 2. 範囲とゴール

### 2.1 In scope

- **pentaglyph upstream** (`libs/pentaglyph-docs/template/docs/`) のディレクトリ再配置
- 全 internal cross-reference (`.md` / `.dsl` / `.py` / `.ts` / `.json` / `.yaml`) の path 書き換え
- `cli/` scaffolder の出力テンプレート更新（新規プロジェクトが新構造で初期化されるよう）
- `pentaglyph-self-architecture.md` の §3 Container view + paperbanana 画像（[layers.png](../../../assets/layers.png)）の説明を新パスに更新
- `STRATEGY.md` / `WORKFLOW.md` / `AI_INSTRUCTIONS.md` / `INDEX.md` / `README.md` の path 例を新構造へ
- **downstream consumer** (`docs/` + `.claude/` + `CLAUDE.md`) の同期適用（Digital Twin PoC を reference consumer として使う）
- Wiki sync スクリプトの path mapping 更新（downstream のみ）

### 2.2 Out of scope

- 層認識 lint (`scripts/docs/lint_layer_citations.py`) の実装 — ADR-0004 Follow-up として別 impl-plan
- npm パッケージ `@uyuutosa/pentaglyph` の major version bump 詳細 — リリース時に決定
- Layer ③ Automation のディレクトリ再配置（`.claude/` / `cli/` / `scripts/docs/` は repo root のまま、ADR-0007 で確定済）
- 各カノン内部の構造変更（arc42 §1-§12、Diátaxis quadrants、MADR `0001-…md` 命名はすべて不変）

### 2.3 完了条件 (DoD)

- [ ] 全 `docs/` 配下が新ディレクトリ構造に移動済
- [ ] 全 internal リンクが解決する（link check CI green）
- [ ] `pentaglyph-self-architecture.md` の Mermaid Container view と paperbanana 画像の path 表記が新構造を反映
- [ ] CLI scaffolder が新構造で出力する（`bunx pentaglyph init test-project` のスナップショットテスト pass）
- [ ] downstream の `.claude/rules/*` `.claude/skills/*` `.claude/agents/*` `CLAUDE.md` が全て新 path を参照
- [ ] downstream Wiki sync (`scripts/doc-sync-full.py` 等) が新 path から Wiki にアップロードできる
- [ ] downstream consumers 向けの migration guide が公開されている（README にリンク）

---

## 3. Phase 計画

### Phase 0 — Pre-flight + 承認ゲート（着手前必須）

| Step | 内容 | 所要 | 担当 |
|------|------|------|------|
| 0.1  | ADR-0010 を `Accepted` に昇格（PO 承認） | 10 min | PO |
| 0.2  | 本 impl-plan のレビュー + 承認 | 30 min | PO + Claude |
| 0.3  | active PR / worktree の洗い出し（`git worktree list` + `gh pr list --state open`） | 15 min | Claude |
| 0.4  | active PR の merge or close（mass rename と競合するため） | 可変 | PO |
| 0.5  | `develop` が clean / `main` が unbroken な状態を確認 | 5 min | Claude |
| 0.6  | バックアップ tag を打つ（`pre-layer-restructure-2026-05-16`） | 5 min | Claude |

**Go/No-go ゲート**: 0.4 が完了するまで Phase 1 に進まない。中途半端な PR が残った状態で mass rename すると revert コストが爆発する。

### Phase 1 — Upstream pentaglyph リストラ（mass rename + link rewrite）

**作業場所**: `libs/pentaglyph-docs/template/docs/`

| Step | 内容 | コマンド / 手順 |
|------|------|----------------|
| 1.1  | 新ディレクトリ作成 | `mkdir -p docs/01-artefacts docs/02-process docs/04-governance docs/05-measurement` |
| 1.2  | Layer ① 配下を `01-artefacts/` 配下へ移動 | `git mv arc42 api-contract detailed-design diagrams service-design templates user-manual impl-plans postmortems reports cost-estimates task-list 01-artefacts/` |
| 1.3  | Layer ② を `02-process/` へリネーム | `git mv design-guide/* 02-process/ && rmdir design-guide` |
| 1.4  | Layer ④ を `04-governance/` へリネーム | `git mv governance/* 04-governance/ && rmdir governance` |
| 1.5  | Layer ⑤ を `05-measurement/` へリネーム | `git mv metrics/* 05-measurement/ && rmdir metrics` |
| 1.6  | 全 markdown / dsl / py / ts / json の cross-reference を一括書き換え | `python3 scripts/docs/migrate_layer_paths.py --apply`（要新規実装 1.6a） |
| 1.6a | 書き換えスクリプトを新規実装 | regex マッピング: `01-artefacts/arc42/ → 01-artefacts/arc42/`、`02-process/ → 02-process/`、`04-governance/ → 04-governance/`、`05-measurement/ → 05-measurement/` ほか全カノン dir。エスケープ・URL fragment・コードブロック内除外を要処理 |
| 1.7  | root の `STRATEGY.md` / `WORKFLOW.md` / `AI_INSTRUCTIONS.md` / `INDEX.md` / `README.md` の path 例 / 表 / 章立てを新構造に更新 | 手動 + diff レビュー |
| 1.8  | `pentaglyph-self-architecture.md §3.1` の "Container directory" 列を新パスに更新 | 既に `layers.png` で新パス表記済。Mermaid Container view 内の Container コンテナ説明と整合させる |
| 1.9  | `cli/` scaffolder のテンプレート出力構造を新ディレクトリへ更新 | `cli/src/index.ts` + テンプレート構造を path 込みで再生成 |
| 1.10 | スナップショットテスト追加: `bunx pentaglyph init <tmp> && ls -R <tmp>/docs/` が `01-artefacts/...` を含む | `cli/test/scaffold.test.ts` 新規 |

### Phase 2 — Upstream バリデーション

| Step | 内容 |
|------|------|
| 2.1  | 全 markdown link check (`scripts/docs/check_links.py` 既存 or 新規 `npx markdown-link-check`) → 100% resolve |
| 2.2  | Mermaid 図のレンダリング確認（必要なら `/diagram-render` 相当） |
| 2.3  | paperbanana 画像（[layers.png](../../assets/layers.png)）が `pentaglyph-self-architecture.md` から正しく相対参照される |
| 2.4  | `bunx pentaglyph init` スナップショットテスト pass |
| 2.5  | `bunx pentaglyph doc-status` が新構造で動作する（Phase 4 の auditor がレイヤ別 coverage を出せる） |

### Phase 3 — Upstream リリース + 公開

| Step | 内容 |
|------|------|
| 3.1  | npm `@uyuutosa/pentaglyph` の major version bump（`0.x.y → 1.0.0` or `1.x.y → 2.0.0`） |
| 3.2  | CHANGELOG / Migration guide を README に追加（旧 → 新 path mapping table） |
| 3.3  | `git tag vX.0.0` + GitHub Release 作成 |
| 3.4  | `cli/PUBLISH.md` の publish 手順に従い publish |

### Phase 4 — downstream consumer subtree pull + リストラ

**作業場所**: `/` (本リポ root)

| Step | 内容 |
|------|------|
| 4.1  | `git subtree pull --prefix=libs/pentaglyph-docs pentaglyph develop --squash` で upstream Phase 3 を取り込む |
| 4.2  | 本リポ独自 `docs/` 配下にも同じ rename を適用（Phase 1 と同型、ただし対象は `docs/`、downstream 独自 dirs (`features/`, `archive/`, etc.) も `01-artefacts/` 配下へ） |
| 4.3  | 全 cross-reference 書き換え（migrate_layer_paths.py を本リポ root 起点で再実行） |
| 4.4  | `CLAUDE.md` の docs 構造節 + 全 ADR 表のリンク + `## 設計ドキュメント` 表を新 path に書き換え |
| 4.5  | `.claude/rules/*.md` 全件: documentation--docs-**, azure-devops.md ほか、path を含むすべての rule を grep + 書き換え |
| 4.6  | `.claude/skills/*/SKILL.md` 全件: feature, bugfix, doc-sync, daily-report, sprint-* など docs/ を参照する全スキル |
| 4.7  | `.claude/agents/*.md` 全件: spec-writer, adr-writer, prd-writer, manual-manager, daily-report など |
| 4.8  | Wiki sync スクリプト (`scripts/doc-sync-full.py`, `.claude/skills/doc-sync/SKILL.md` 内の path mapping) を新 path 対応 |
| 4.9  | pre-commit hooks のチェック対象 path を更新 (`scripts/hooks/pre-commit`) |

### Phase 5 — Downstream バリデーション

| Step | 内容 |
|------|------|
| 5.1  | 全 markdown link check |
| 5.2  | `bunx pentaglyph doc-status` (or 同等) で新構造の coverage が出る |
| 5.3  | `/doc-sync` 試走 → Wiki に新 path で正しく upload される |
| 5.4  | 既存スキル（`/feature` `/bugfix` `/daily` 等）の dry-run で path 解決エラーが出ない |
| 5.5  | `npm run lint` / `cd backend && uv run pytest` / Terraform validate などビルド系を一通り pass |
| 5.6  | 主要な ADO Wiki ページ（`/Documentation` `/Sprints/Sprint-9/Goal` 等）が新 path で参照されている |

### Phase 6 — ライフサイクル 3 ルール実装を新構造で再開（次の作業）

Phase 5 完了後、本ロードマップで一時停止していたライフサイクル 3 ルール実装（review-gate / PR-unit / unparented 禁止）を再開する。新規ファイルは最初から新構造の path に配置:

- pentaglyph upstream:
  - `template/docs/02-process/ai-augmented-lifecycle.md`（NEW）
  - `template/docs/02-process/ai-augmented-pr.md` §3.6 PR-unit cross-ref（既存に追記）
  - `template/docs/02-process/dev-cycle.md` lifecycle pointer（既存に追記）
- downstream consumer:
  - `docs/02-process/ai-lifecycle-binding.md`（NEW、ADO Agile tool binding）
  - `.claude/rules/azure-devops.md` 3 ルール明文化
  - `.claude/skills/{feature,bugfix,pr,deploy,sync-status,workitem,ado-audit}/SKILL.md`
  - `.claude/agents/{dev-orchestrator,scrum-master}.md`
  - `CLAUDE.md` DoD 更新

詳細は別 impl-plan or 直接実装に進む。

---

## 4. リスクと緩和

| リスク | 影響 | 緩和策 |
|--------|------|--------|
| **mass-rename 中の merge 競合** | 進行中の PR が一斉に壊れる | Phase 0.4 で active PR を強制終結。完了後 Phase 1 着手 |
| **subtree pull 衝突** | upstream の rename が downstream local 変更と衝突 | upstream を必ず先行（Phase 1-3）、downstream は subtree pull のみ受け取る形にする |
| **link check 漏れ** | 移行後にデッドリンクが残存 | Phase 2.1 / Phase 5.1 で link check を必ず実行。検出された全件を Phase 終了前に修復 |
| **ADO Wiki 同期破綻** | downstream Wiki が壊れ、Sprint Review が見れない | Phase 5.3 で `/doc-sync` を dry-run + 1 ページ実走で検証してから一括同期 |
| **CLI scaffolder 破綻** | 新規プロジェクト初期化が失敗 | Phase 1.10 スナップショットテストで検出。Phase 3 publish 前に必ず pass |
| **paperbanana 画像 path 壊れ** | self-architecture.md で画像が表示されない | Phase 2.3 で明示確認。assets/ の相対 path は不変なのでリスク低 |
| **NPM consumers の breaking change** | 旧 path に依存する downstream が壊れる | Phase 3.2 で Migration guide を CHANGELOG + README に明記。major version bump で SemVer 違反を回避 |
| **古い branch の long-tail revival** | 数週間後に古い branch が新 develop に merge され壊れる | Phase 0.6 のバックアップ tag から `git diff` を取って復旧 path mapping を提供 |

---

## 5. ロールバック手順

万一 Phase 1-2 の途中で致命的問題が発生した場合:

```bash
# upstream: バックアップ tag に戻す
git -C libs/pentaglyph-docs reset --hard pre-layer-restructure-2026-05-16

# downstream: subtree squash 直前 commit に戻す（Phase 4.1 を巻き戻し）
git revert <subtree-pull-commit>
```

Phase 3 (npm publish) 後は npm 側ロールバックが不可能なため、Phase 3 着手前に **24 時間の cooling-off period** を入れる（Phase 2 完了 → 翌日 Phase 3）。

---

## 6. 推定工数 + スケジュール

| Phase | 推定工数 | 推奨担当 | 並列可否 |
|------|--------|----------|----------|
| 0 (Pre-flight) | 1-2 h | PO + Claude | 単独 |
| 1 (Upstream rename) | 4-6 h | Claude（migrate_layer_paths.py 実装含む） | 単独 |
| 2 (Upstream validate) | 1-2 h | Claude | 単独 |
| 3 (Upstream release) | 30 min | PO | Phase 2 完了から 24h 後 |
| 4 (Downstream apply) | 6-8 h | Claude（CLAUDE.md + .claude/* 大量更新） | 単独 |
| 5 (Downstream validate) | 1-2 h | Claude + PO | 単独 |
| 6 (Lifecycle resume) | 別 impl-plan | — | Phase 5 完了後 |

**合計**: 13-20 時間。1 日集中作業 + 1 日バリデーション + 24h cooling-off + 1 日 downstream で **約 3-4 日**。

---

## 7. Open questions

- **Q1**: 本ロードマップは upstream の publish 前提だが、AI-clone 内のみで先行運用する選択肢もありうる（subtree 化と publish を遅らせる）。これを取るか。
  - 仮置答え: **Phase 1-2 を upstream side で先行 → Phase 3 publish は AI-clone 適用後の安定確認を経て**。すなわち Phase 順序は **1 → 2 → 4 → 5 → 3**（cooling-off 期間中に downstream で実戦テスト）。Phase 1-2 を済ませてから判断。
- **Q2**: 旧 path への symlink を一時的に残すか？
  - 仮置答え: **残さない**。ADR-0010 の効果（layer-readable path）を弱める。旧 path に依存する自動化は migration guide に従い書き換え必須。
- **Q3**: `案件特化` ディレクトリ（downstream 独自の `features/`, `paper/`, `引継ぎ/`, `調査/` 等）はどこに入れる？
  - 仮置答え: **すべて `01-artefacts/` 配下**。これらはすべて Layer ① Artefacts に該当する（書かれたもの・成果物）。`features/` は volatile artefact、`paper/`/`調査/` は reference artefact。
- **Q4**: arc42 内部 ADR 番号と Layer 番号が同じ桁数で混在（`docs/01-artefacts/arc42/09-decisions/0010-….md`）。混乱しないか？
  - 仮置答え: **arc42 §1-§12 は arc42 canon の prescribed 番号**で、Layer 番号とは別軸。コンテキストで判別可能（path の浅さで層、深い場所で arc42 章）。

---

## 8. References

- [ADR-0010 — explicit layer-prefixed directories](../arc42/09-decisions/0010-explicit-layer-prefixed-directories.md) — 本 impl-plan の親判断
- [ADR-0001 — 5-layer self-architecture](../arc42/09-decisions/0001-adopt-five-layer-self-architecture.md) — 層の定義
- [ADR-0004 — layer separation contracts](../arc42/09-decisions/0004-layer-separation-contracts.md) — 依存方向
- [ADR-0007 — automation layer contract](../arc42/09-decisions/0007-automation-layer-contract.md) — Layer ③ は repo root
- [pentaglyph-self-architecture.md](../arc42/05-building-blocks/pentaglyph-self-architecture.md) — Container view（[layers.png](../../assets/layers.png) embed 済）
- [2026-05-14_pentaglyph-self-architecture-roadmap.md](./2026-05-14_pentaglyph-self-architecture-roadmap.md) — 親ロードマップ
- [2026-05-16_digital-twin-downstream-process-binding.md](../../../case-studies/2026-05-16_digital-twin-downstream-process-binding.md) — この移行が surface された経緯
