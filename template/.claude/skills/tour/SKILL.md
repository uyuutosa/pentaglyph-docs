---
name: tour
description: >
  pentaglyph kit のプロジェクトツアー (kit 版)。tour-guide エージェントを起動して、
  pentaglyph の全機能 (5 標準 binding / ADR-0010 layer-prefix / 14 templates / CLI /
  user manual / dogfooding) を Quick narrative / Guided by role / Menu / Ask の 4 mode
  で外観させる。pentaglyph 採用検討者・downstream user・upstream contributor・docs
  担当・AI agent 向け。Quick overview は箇条書きではなく narrative (2000-3000 字、
  背景 → 制約 → 決定 → 含意) で出す。深掘りは他 skill (`/explain`, `/doc-init` 等)
  や user manual に委譲する入口専用スキル。**この SKILL.md は pentaglyph kit が ship
  する template 版**で、downstream consumer はこの定義に自プロジェクト固有の説明を
  足して拡張できる (AI-clone リファレンス実装が `--scope=α/β/γ` で例示している)。
argument-hint: "(引数なし、起動時に 4 mode が提示される)"
disable-model-invocation: false
---

# /tour — pentaglyph kit プロジェクトツアー

pentaglyph kit を scaffold したプロジェクトで「pentaglyph の全機能を 30 分以内に外観し、次に何を見れば詳細がわかるか」を持ち帰れるようにする入口スキル。pentaglyph 採用検討者・downstream user・upstream contributor・新規 Claude Code 利用者向け。

## 既存スキルとの境界

- `/explain <対象>` — **特定**ファイル / 概念 / 関数の Diátaxis explanation を生成 (深掘り)
- `/doc-init` — docs 起ち上げを doc-orchestrator 経由で会話的に進める
- `/doc-status` `/doc-audit` — docs カバレッジ / 配置監査 (read-only)
- **`/tour` — kit 全体俯瞰の入口。詳細は上記スキルや user manual に誘導する。重複しない**

## このスキルがやること

1. `tour-guide` agent を `Task` ツール経由で起動する
2. agent が起動時に必ず 4 mode 選択肢を提示:
   - ① **Quick overview** — narrative で全体像 (2000-3000 字、背景 → 制約 → 決定 → 含意の段落構成、箇条書き不可)
   - ② **Guided tour by role** — pentaglyph 採用検討者 / downstream user / upstream contributor / docs 担当 / AI agent などの役割を聞き 15-20 分の深掘り **(推奨)**
   - ③ **Menu** — 8 セクションの目次 → reader が指定 → drill down
   - ④ **Ask me anything** — 自由質問

3. reader が「終わり」と言ったら、次の一歩 (CLI 導入 / tutorial / upstream PR / `/explain` 等) を案内して締める

## このスキルがやらないこと

- 新規 doc / コード / ADR を**書かない**。書きたくなったら `/doc-init` / `/spec` 等に委譲する
- Quick overview を箇条書きで終わらせない (agent §3.1 narrative 仕様)

## 起動方法

```text
/tour
```

引数なし。途中で別 mode に切り替えたい・別領域に移りたい等は自由に伝えてよい。

## downstream consumer による拡張

このスキル + agent (`agents/tour-guide.md`) は **template 版** で、pentaglyph 自体の説明のみを提供します。自プロジェクトに pentaglyph を導入したあと、`.claude/agents/tour-guide.md` を書き換えることで:

- scope 軸を追加 (例: scope α = 自プロジェクト独自、scope β = pentaglyph 単独、scope γ = 両方)
- curated spine §2 に project-specific な mission / tech stack / 9 phase 等を追加
- §3.2 Guided role に project-specific な role (例: backend dev / frontend dev) を追加

参考例: AI-clone PoC リファレンス実装 (https://github.com/uyuutosa/pentaglyph-docs リポ外で実装) が `--scope=α/β/γ` 拡張版を提供しています。

## 内部実装

`Task` ツールで `tour-guide` agent を `subagent_type=tour-guide` 指定で起動する。agent 定義: `.claude/agents/tour-guide.md`。

詳細な振る舞い仕様 (4 mode のハンドラ・curated spine の中身・dynamic drill-down のロジック) は agent 定義側に集約。本 SKILL.md は薄い dispatcher。

## このスキル完了時の docs 更新 (DoD)

本スキルは案内のみ・新規 doc を書かないため、docs 更新義務は無い。ただし reader が新規 doc 作成を希望した場合は適切な writer skill (`/doc-init`, `/spec`, `/explain` 等) に誘導する。

## 関連

- agent 定義: [`.claude/agents/tour-guide.md`](../../agents/tour-guide.md)
- pentaglyph user manual: [`docs/01-artefacts/user-manual/`](../../../docs/01-artefacts/user-manual/)
- 既存類似 skill: [`/explain`](../explain/SKILL.md), [`/doc-init`](../doc-init/SKILL.md)
- pentaglyph upstream: <https://github.com/uyuutosa/pentaglyph-docs>
