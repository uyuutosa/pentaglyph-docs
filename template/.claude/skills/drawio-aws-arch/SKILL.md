---
name: drawio-aws-arch
description: 編集前提の AWS アーキ図を draw.io MCP で生成する。公式 AWS4 アイコン使用 + 平仄の取れたラベル / 余白 / 色で 1 枚の整った .drawio ファイルに仕上げ、docs/diagrams/aws-infra/ 配下に保存する。
argument-hint: [図のスコープ説明 (例: "M3 baseline インフラ" / "BF-01 E2E flow")]
disable-model-invocation: true
---

# drawio-aws-arch — AWS アーキ図 生成スキル

draw.io MCP (`mcp__drawio__*`) と公式 AWS4 アイコンを使って、**編集前提**の AWS インフラ図を生成する。クライアント報告・社内設計・ADR 添付に耐えるレベルの平仄を、毎回手で守らずに済むよう **rules を一元化** したもの。

MCP 接続 (初回 1 回): `claude mcp add --transport http drawio https://mcp.draw.io/mcp` → セッション再起動。詳細は jgraph 公式 <https://github.com/jgraph/drawio-mcp>。

## いつ起動するか

- 「AWS インフラ図描いて」「アーキ図 drawio で」「VPC 構成図」等の依頼
- `docs/impl-plans/` の ASCII 図を .drawio に格上げするとき
- `docs/arc42/07-deployment/` 配下の deployment view を新規 / 改訂するとき
- 既存 `docs/diagrams/aws-infra/*.drawio` を editorial review で整え直すとき

**起動しないケース**:
- 論理 view (Container / Component) → C4 (`docs/diagrams/c4/workspace.dsl`) が SoT
- シンプル flow / sequence (5 ノード以下) → Mermaid inline
- 高品質 1 枚絵 (クライアント表紙) → `/paperbanana`

棲み分け詳細: [`docs/diagrams/aws-infra/README.md`](../../../docs/diagrams/aws-infra/README.md)

---

## アーキテクチャ (paperbanana 型 agentic loop)

```
┌─────────────────────────────────────────────────────────────────┐
│  drawio-aws-arch skill (PDCA-driven)                            │
│                                                                 │
│  Step 1: scope confirm                                          │
│  Step 2: extract from spec docs                                 │
│  Step 3: mcp__drawio__search_shapes (公式 AWS4 style)           │
│  Step 4: author XML (Rule 1-5 を初版から尊重)                   │
│  Step 5: save .drawio                                           │
│  Step 6: mcp__drawio__create_diagram (browser preview, 任意)    │
│                                                                 │
│  ┌──── Step 6.5 PDCA loop (最大 3 iter) ────┐                  │
│  │                                          │                  │
│  │  6.5.a export_png.sh → PNG               │                  │
│  │  6.5.b Read(PNG) + vision critic         │                  │
│  │       (Hard rules § 1-5 + checklist §8)  │                  │
│  │  6.5.c Edit .drawio (差分修正)           │                  │
│  │  6.5.d 全 pass まで loop                 │                  │
│  │                                          │                  │
│  └──────────────────────────────────────────┘                  │
│                                                                 │
│  Step 7: クロスリンク追加 (impl-plan / ADR / deployment view)   │
│  Step 8: aws-infra/README.md 図リスト更新                       │
└─────────────────────────────────────────────────────────────────┘

依存:
- MCP: drawio (jgraph hosted, https://mcp.draw.io/mcp) — create_diagram + search_shapes
- Docker: rlespinasse/drawio-export — headless PNG export (1 回 pull、約 600MB)
- AI vision: Claude (本セッション) — PNG critic
- Helper: .claude/skills/drawio-aws-arch/scripts/export_png.sh
```

## ⚠️ Hard rules (絶対守る)

### Rule 1: アイコン下のラベルは **厳密に 2 行**

| 行 | 内容 | 例 |
|---|---|---|
| **Line 1** | サービス名 / コンポーネント名 (短縮 OK) | `Route 53`, `ALB`, `ECS Fargate Task`, `Bedrock` |
| **Line 2** | 役割 / 主要スペック 1 つ (簡潔に) | `hosted zone`, `Listener :443`, `0.5 vCPU / 1 GB`, `Sonnet 4.6` |

**禁止**:
- 3 行以上のラベル
- 環境変数名・IAM Action 名・URL path を icon label に書く (→ callout box へ)
- 1 行で長すぎるもの (~ 24 文字超を avoid)

**3 行目以上が必要な情報の置き場**:

| 情報の種類 | 置き場 |
|---|---|
| 環境変数名 (`BASIC_AUTH_*`, `BEDROCK_MODEL_*`) | **黄色 callout box** (`fillColor=#fff2cc`) |
| IAM Action (`bedrock:InvokeModel` 等) | **黄色 callout box** または edge label |
| API path / protocol (`/agui/*`, `HTTPS 443`) | **edge label** |
| 制約 / リスク (権限不足 / 単一障害点) | **ピンク callout box** (`fillColor=#f8cecc`) |
| コスト / 数値試算 | **黄色 callout box** |
| 凡例 | **グレー callout box** (`fillColor=#f5f5f5`) |

### Rule 2: アイコンサイズは **カテゴリごとに固定**

| カテゴリ | スタイル shape prefix | サイズ (W x H) | 備考 |
|---|---|---|---|
| **resourceIcon (円形 / 角丸)** | `shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.<svc>` | **78 x 78** | Bedrock / Route 53 / ECR 等 |
| **service icon (平板)** | `shape=mxgraph.aws4.<svc>` (resourceIcon を含まないもの) | **64 x 64** | ALB / IGW / Lambda / Parameter Store 等 |
| **CloudWatch Logs** (横長例外) | `shape=mxgraph.aws4.cloudwatch_logs` | **64 x 48** | aspect ratio が 4:3 固定 |
| **ACM cert** (縦長例外) | `shape=mxgraph.aws4.certificate_manager` | **50 x 64** | aspect ratio が 0.78 固定 |
| **IAM role** (横長例外) | `shape=mxgraph.aws4.role` | **80 x 44** | 帯型 |
| **ECS task** (縦長例外) | `shape=mxgraph.aws4.ecs_task` | **48 x 64** | 縦長アイコン |
| **container icon** | `shape=mxgraph.aws4.container_1/2/3` | **48 x 32** | task 配下に並べる |
| **umlActor (人物)** | `shape=umlActor` | **40 x 60** | client / operator 用 |

**禁止**: 自由 sizing。アスペクト比は AWS4 固定値を尊重 (`aspect=fixed` を style に必ず含める)。

### Rule 3: グリッドと余白

| 項目 | 値 |
|---|---|
| Canvas | `pageWidth=1500 pageHeight=950` (横長 16:10)、`gridSize=10` |
| **Icon 横間隔** (managed services 行) | center 間 **110px** (icon 78 + gap 32)。揃ってないと最初に気になる |
| **Icon 縦間隔** (上下に積むとき) | icon の bottom から次 icon の top まで **80px 以上** (ラベル 2 行 + 余白) |
| **グループ枠の内側 padding** | 上下 left/right とも **40px 以上** (枠線とアイコンが密着しない) |
| **VPC / Account / Cloud の入れ子間隔** | 各レベルで **20-30px** ずつ内側に寄せる |

### Rule 4: 色は **AWS 公式 + 凡例固定パレット**

| 用途 | 色 | 使い場 |
|---|---|---|
| AWS Cloud group stroke | `#232F3E` (深紺) | 最外グループ |
| AWS Account group stroke | `#CD2264` (マゼンタ) | account 境界 |
| VPC group stroke | `#879196` (グレー) | VPC 境界 |
| Public subnet group stroke + fill | `#7AA116` stroke / `#F2F6E8` fill (薄緑) | public subnet |
| Private subnet group stroke + fill | `#00A4A6` stroke / `#E6F2F2` fill (薄シアン) | private subnet |
| Edge — data plane | `#82B366` (緑) `strokeWidth=2` | HTTPS / TLS / data flow |
| Edge — control plane | `<service color>` `dashed=1` | cert / image pull / config inject |
| Edge — IAM assume | `#DD344C` (赤) `dashed=1` | role -> resource |
| Edge — LLM invoke (Bedrock) | `#01A88D` (teal) `strokeWidth=2` | Bedrock InvokeModel |
| Callout — quantitative | `fillColor=#fff2cc strokeColor=#d6b656` (黄) | コスト / SLO / 数値 |
| Callout — constraint / risk | `fillColor=#f8cecc strokeColor=#b85450` (ピンク) | 権限不足 / 単一障害点 |
| Callout — legend / meta | `fillColor=#f5f5f5 strokeColor=#666666` (グレー) | 凡例 |

**禁止**: AWS 公式色 (アイコン fillColor) を上書きする。`fillColor=#ED7100` 等の AWS 標準値はそのまま使う。

### Rule 5: 凡例 box は **必ず** 左上か右上に置く

最低限の凡例 (色の意味 + 線種 data/control plane 区別)。これがないと読み手が迷う。

```xml
<mxCell id="legend" value="Legend&#10;━━━ data plane&#10;┄┄┄ control plane / IAM&#10;green: client-facing&#10;teal: Bedrock&#10;orange: container&#10;purple: networking&#10;red: IAM" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontSize=10;align=left;verticalAlign=middle;spacing=6;" parent="1" vertex="1">
  <mxGeometry x="20" y="180" width="180" height="140" as="geometry" />
</mxCell>
```

---

## 標準テンプレ (mxGraphModel)

新規図は以下を起点に組み立てる。`<!-- N: ... -->` 行は **どこに何を置くか** の guide。

```xml
<mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1500" pageHeight="950" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />

    <!-- TITLE: y=20, font 14pt bold -->
    <mxCell id="title" value="<図タイトル> — <スコープ>&#10;Source: <impl-plan or ADR path>" ... />

    <!-- LEGEND: 左上 (20, 180) 180x140 -->
    <mxCell id="legend" ... />

    <!-- GROUPS (奥から手前へ): aws_cloud -> aws_account -> vpc -> subnets -->
    <mxCell id="aws_cloud" ... />        <!-- (200, 70, 1280, 860) -->
    <mxCell id="aws_account" ... />      <!-- (240, 110, 1200, 800) -->
    <mxCell id="vpc" ... />              <!-- (280, 320, 940, 560) -->
    <mxCell id="subnet_a" ... />         <!-- (320, 510, 440, 340) -->
    <mxCell id="subnet_b" ... />         <!-- (790, 510, 410, 340) -->

    <!-- MANAGED SERVICES 行: y=170, x=290 から 110px ずつ右へ -->
    <!-- resourceIcon 78x78 系 / service icon 64x64 系を混在させても OK、ただし -->
    <!-- 各 icon の center を y=210 揃えにし、サイズ違いは top alignment で見せる -->

    <!-- ACTOR: (60, 460, 40, 60) 左端中央 -->

    <!-- VPC 内部: IGW を上中央、ALB をその下、subnets に ECS task -->

    <!-- CALLOUT BOXES: 左下 (IAM constraint pink) / 右下 (cost yellow) -->

    <!-- EDGES: 最後にまとめて。data plane は太線、control plane は dashed -->
  </root>
</mxGraphModel>
```

---

## 実行手順

### Step 1: スコープ確認

ユーザーから受け取ったスコープを 1 図に収まる粒度に絞る。広すぎる場合は分割提案:
- ❌ "全 AWS インフラ" → 大きすぎる
- ✅ "Sprint 1 demo MVP", "M4 BF-01 E2E", "VPC + subnet topology only"

### Step 2: 設計書から要素を抽出

該当する impl-plan / ADR / deployment view を Read し、登場する AWS サービスを enumerate。各サービスに対し:
- **Line 1 label**: 短縮名
- **Line 2 label**: 役割を 1 句で
- **詳細**: callout 候補 or edge 候補

### Step 3: Shape style 検索

`mcp__drawio__search_shapes` で各サービスの公式スタイル文字列を取得。**aws4 を優先**、aws3 / aws3d は使わない (古い)。

```python
# Example: 必要そうな shape をまとめて検索
search_shapes("aws ecs fargate task")
search_shapes("aws application load balancer")
search_shapes("aws bedrock")
```

### Step 4: XML 組み立て

Hard rules § 1-5 を全部満たす形で mxGraphModel XML を組む。順序:

1. title (text cell, y=20)
2. legend (left, y=180)
3. groups (z-order が後ろになるよう先に書く: aws_cloud → account → vpc → subnets)
4. actors (umlActor)
5. icons (managed services row → VPC 内 IGW/ALB → subnet 内 task)
6. callout boxes (constraint pink 左下 / cost yellow 右下)
7. edges (data plane 太線 → control plane dashed → IAM dashed 赤)

### Step 5: ファイル保存

```
docs/diagrams/aws-infra/<kebab-name>.drawio
```

`<mxfile host="..." agent="claude-code-drawio-mcp" version="24.0.0"><diagram id="..." name="..."><mxGraphModel>...</mxGraphModel></diagram></mxfile>` でラップする (drawio editor が開けるように)。

### Step 6: MCP で render してインタラクティブ preview (任意)

```
mcp__drawio__create_diagram(xml=<mxGraphModel 部分のみ>)
```

browser tab で開く。ユーザーがリアルタイムで触る用。**この時点ではユーザーに「見てください」と聞かない** — Step 6.5 で AI 自身が検証する。

### Step 6.5: PDCA Visual Critic Loop (必須・最大 3 iter)

paperbanana と同じパターン: **export → AI 視認 → 規則違反検出 → revise → 再 export** を loop で回し、Hard rules § 1-5 + checklist § 完成前 8 項目を全て pass するまで続ける。

#### 6.5.a PNG export

```bash
.claude/skills/drawio-aws-arch/scripts/export_png.sh <path/to/diagram.drawio>
```

`rlespinasse/drawio-export` docker image (headless Electron) を起動して 1465 x 913 程度の PNG を `docs/diagrams/aws-infra/export/` に出力する。stdout に PNG path を返す。

**初回呼び出し時の前提**:

```bash
docker pull rlespinasse/drawio-export:latest   # 約 600MB、1 回だけ
```

#### 6.5.b AI vision critic

`Read` tool に PNG path を渡すと Claude の vision で読み取れる。読み取った直後に **§ 完成前 checklist (8 項目)** + **§ アンチパターン集** を 1 つずつ評価し、違反を列挙する。評価表テンプレ:

| # | Rule | Status (✅/⚠️/❌) | 違反箇所 (該当 cell id) | 具体的な修正方針 |
|---|---|---|---|---|
| 1 | Labels ≤ 2 lines | | | |
| 2 | Icon sizes by category | | | |
| 3 | Spacing 110px center | | | |
| ... | | | | |

`❌` が 1 つでもあれば revise 必須。`⚠️` は 2 つ以上で revise 検討。`✅` 揃いで loop 終了。

#### 6.5.c Revise

修正は **`Edit` tool で .drawio ファイルを差分編集** する (full rewrite より cell ID が安定する)。修正内容を 1 sentence で記録 (例: "SSM label を 3 行 → 2 行に短縮、`BASIC_AUTH_*` は callout box に移動")。

#### 6.5.d Loop control

```
iter = 0
while iter < 3:
  png_path = export_png.sh(drawio_path)
  critic_table = vision_critic(png_path)
  if all_pass(critic_table):
    break
  revise(critic_table, drawio_path)
  iter += 1

if iter == 3 and not all_pass:
  # 構造的な再設計が必要 — ユーザーに plan を提示して相談
  ask_user_question(...)
```

**ユーザーに見せるのは pass 後の最終 PNG のみ**。途中の iter は内部処理。

### Step 7: クロスリンク追加

該当する impl-plan / deployment view / ADR から `[../diagrams/aws-infra/<file>.drawio]` で参照を追加。孤立図を作らない。

### Step 8: aws-infra/README.md に行追加

`docs/diagrams/aws-infra/README.md` の「図のリスト」テーブルに新規行を追加 (ファイル / 内容 / 対応 doc)。

---

## ✅ 完成前 checklist (8 項目)

render 後にユーザーに見せる前に self-check する:

- [ ] **全アイコンのラベルが 2 行以内**である (3 行以上が 1 つでもあれば revise)
- [ ] **ラベルが隣のアイコンに侵食していない** (隣との center 間 110px、ラベル 24 文字超なし)
- [ ] **同カテゴリのアイコンサイズが揃っている** (resourceIcon 78 / service 64 等、Rule 2 表を踏襲)
- [ ] **凡例 box** が左上 or 右上に存在し、edge の色 / 線種を説明している
- [ ] **タイトル** + **Source: <impl-plan path>** が y=20 にある (図単体で出典が辿れる)
- [ ] **callout boxes** (constraint / cost) が独立 box として存在し、icon label に潜り込んでいない
- [ ] **edges に label** が付いている (data plane は protocol、control plane は意味、IAM は "assumed by")
- [ ] **VS Code drawio 拡張で開ける** (`mxfile` ラップ + well-formed XML)

---

## アンチパターン集 (やらない)

| ❌ Bad | 理由 | ✅ Good |
|---|---|---|
| `value="SSM Param Store\nBASIC_AUTH_USER\nBASIC_AUTH_PASSWORD"` (3 行 + 環境変数列挙) | アイコンが箱としての役割を超えてラベル肥大 | `value="SSM Param\nBasic Auth secrets"` + 黄色 callout に `BASIC_AUTH_USER` / `BASIC_AUTH_PASSWORD` を別記 |
| `value="Application Load Balancer\nListener :443 → forward\nLambda authorizer attached\nPath: /agui/* → backend, /* → frontend"` (4 行) | ALB の役割が伝わる前に読み疲れる | `value="ALB\n:443 + Lambda authz"` + edge label に `/agui/* → backend` |
| `value="Task Role\nbedrock:InvokeModel\nbedrock:InvokeModelWithResponseStream"` | IAM Action 名は icon label の責務外 | `value="Task Role\nBedrock invoke"` + 黄色 callout に Action 列挙 |
| icon size を 78x78 / 64x64 / 50x50 / 80x44 で混在 | 視覚ノイズ。何が重要か分からなくなる | カテゴリごとに固定 (Rule 2 表) |
| 凡例なし | 色の意味が伝わらない (緑 = client-facing? 環境? 安全?) | 必ず凡例 box を置く |
| `docs/diagrams/aws-infra/foo.drawio` を作って impl-plan からリンクしない | 孤立図 → 半年後に誰も知らない | impl-plan / ADR / deployment view から **必ず** リンク |
| 同 PR で `aws-infra/README.md` のテーブルを更新しない | 一覧と実体が drift | Step 8 を必ず実行 |

---

## トラブルシュート

| 症状 | 対処 |
|---|---|
| MCP `create_diagram` が "no transport" で失敗 | `claude mcp list` で drawio が ✓ Connected か確認。`/exit` → 再起動が必要 |
| `create_diagram` が "InputValidationError" | `<mxfile>` ラップなしの `<mxGraphModel>` だけ渡す必要あり |
| Render したら icon が全部白い四角 | style 文字列内の `aspect=fixed` が欠落 / size が aspect 違反。Rule 2 表のサイズに戻す |
| ラベルがアイコンに重なる | `verticalLabelPosition=bottom;verticalAlign=top;` を style に追加 |
| edges が他の cell の上に重なって読めない | 当該 edge cell を XML 末尾に移動 (z-order を上げる) |
| browser tab で開いたが drawio が render しない | `<mxGraphModel>` の `<root>` 直下 cell の `id="0"` `id="1"` が無いとパースされない |

---

## Export ディレクトリの扱い

`docs/diagrams/aws-infra/export/*.png` は **gitignore する** (生成物、サイズ大、PR review でノイズになる)。

```bash
echo "export/" >> docs/diagrams/aws-infra/.gitignore   # 初回のみ
```

クライアント報告で PNG が必要な場合のみ、別 location (`docs/豊田合成/報告資料/<YYMMDD>/`) に手動で copy。

---

## このスキル完了時の docs 更新 (DoD)

- **主責任** (必須): `docs/diagrams/aws-infra/<name>.drawio` を新規 / 改訂
- **主責任** (必須): `docs/diagrams/aws-infra/README.md` の図リストに行追加 / 更新
- **副責任** (該当時): 対応する `docs/impl-plans/*.md` / `docs/arc42/07-deployment/*.md` / `docs/arc42/09-decisions/NNNN-*.md` から該当 `.drawio` への link を追加
- **スキップ対象**: typo / 5px 未満の coord 調整のみの場合は README 更新不要

---

## 関連

- jgraph 公式 drawio MCP — <https://github.com/jgraph/drawio-mcp>
- rlespinasse/drawio-export — <https://github.com/rlespinasse/drawio-export> (docker image for PNG export)
- [`/diagram-render`](../diagram-render/SKILL.md) — Structurizr / PlantUML / Mermaid 系の SVG render (本 skill とは notation で棲み分け)
- 派生プロジェクト側で配置:
  - `docs/diagrams/aws-infra/README.md` (本 skill 初回起動時に生成)
  - `docs/diagrams/c4/workspace.dsl` (C4 論理 view, 別 SoT)

---

*Last updated: 2026-05-24 — v2: PDCA visual critic loop を追加 (rlespinasse/drawio-export + Claude vision)。paperbanana 同等の agentic 化。*

## Changelog

- **v2 (2026-05-24 夕方)**: PDCA loop (export → vision critic → revise) を Step 6.5 に追加。`rlespinasse/drawio-export` docker image 採用、`scripts/export_png.sh` helper 同梱。`docs/diagrams/aws-infra/.gitignore` で `export/` を除外。
- **v1 (2026-05-24 朝)**: 初版。Hard rules § 1-5 (label 2 行 / icon sizes / spacing / colors / legend) + checklist § 8 項目を Sprint 1 demo MVP 図のレビュー指摘から策定。
