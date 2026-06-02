---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-17
diataxis: explanation
audience: anyone wondering why the kit binds exactly these five
---

# Why five standards (and not four, and not one)

> **What this is:** the per-standard rationale for the five that pentaglyph bundles. The short version is in [`STRATEGY.md §2`](../../../../template/docs/STRATEGY.md#2-adopted-standards); this page is the long version, including the standards we considered and rejected.

Pentaglyph binds five external standards into one opinionated layout:

| # | Standard | Authoritative source | Question it answers |
| --- | --- | --- | --- |
| 1 | **arc42** | <https://arc42.org/overview/> | *How is the system organised?* |
| 2 | **C4 model** | <https://c4model.com> | *What does it look like at each zoom level?* |
| 3 | **MADR v3.0** | <https://adr.github.io/madr/> | *Why did we choose this over alternatives?* |
| 4 | **Diátaxis** | <https://diataxis.fr> | *How do users learn this product?* |
| 5 | **TiSDD** | <https://www.thisisservicedesigndoing.com/methods> | *How is the service experienced end-to-end?* |

Each answers a different question. Removing any one leaves a gap the others cannot fill. Adding a sixth would either duplicate or fight the existing five.

This page walks each choice, then walks what we *did not* pick.

---

## Two design constraints behind the choice

Before the per-standard rationale, two constraints that ruled out a lot of alternatives:

### Constraint 1 — AI agents must already know the standard

LLMs as of 2026 have been trained on millions of pages of arc42 examples, C4 diagrams, MADR ADRs, Diátaxis documentation, and TiSDD service-design literature. When you tell Claude *"write an ADR in MADR v3.0 format"*, it does not need to be taught what that means.

A custom in-house meta-standard, however elegant, would have to be taught from scratch every session. The cost is real — both in prompt tokens and in inference-time accuracy. Pentaglyph's bet is that **standing on standards the agent already knows is worth more than inventing a marginally better one**.

This constraint immediately ruled out: bespoke arc42 alternatives, custom ADR formats, and anything Wikipedia would not call a "named methodology".

### Constraint 2 — Each standard must have a single authoritative URL

We refuse to host the canonical version of any external standard inside pentaglyph. The kit links out; the kit does not paraphrase. This is what keeps pentaglyph from being a *fork* of the external standards (and inheriting the maintenance burden of being a fork).

This constraint ruled out: standards that exist only in books with no web canonical (DDD by Eric Evans, parts of Architectural Decisions by Olaf Zimmermann), and standards with multiple competing canonicals (anything with a healthy community fork).

The five that survive both constraints are the five pentaglyph bundles.

---

## 1. arc42 — the architecture spine

[arc42](https://arc42.org/overview/) is a template for architecture documentation organised into 12 sections (§1 Introduction → §12 Glossary).

**Why arc42:**

- It is the most widely adopted *open* architecture-documentation template in industry. Adoption matters; obscure standards rot.
- The 12-section structure has been stable since ~2012 with minor revisions, which is unusually long for a documentation standard. Stability is a feature.
- It is *partial-coverage-friendly*: a project can fill §1, §3, §5, §9 and skip the rest. Many standards demand all-or-nothing; arc42 explicitly endorses progressive coverage.
- It plays well with AI agents because every section has a stable name and a stable purpose.

**What arc42 does not cover:**

- Decisions in narrative form (filled by **MADR** below).
- Multi-zoom-level diagrams (filled by **C4**).
- End-user-facing docs (filled by **Diátaxis**).
- Service-level customer experience (filled by **TiSDD**).

That set of *complementary gaps* is exactly what the other four standards address.

---

## 2. C4 model — multi-zoom diagrams

[C4](https://c4model.com) is Simon Brown's four-level zoom model: **System Context → Container → Component → Code**.

**Why C4:**

- It is *the* canonical multi-zoom architecture-diagram approach. The level names are universal vocabulary.
- The Structurizr DSL gives us a single source of truth (`workspace.dsl`) from which multiple diagrams render. This makes the diagrams maintainable; bespoke per-tool diagrams are not.
- It composes with arc42 cleanly — arc42 §3 (Context) is C4 Level 1, arc42 §5 (Building Blocks) is C4 Level 2/3.

**Why not pure UML, or per-team bespoke diagrams:**

- UML's surface area is too large; teams use 5% of it inconsistently and the diagrams stop communicating.
- Bespoke per-team diagrams do not survive team turnover. Every newcomer has to learn the local convention.

**What C4 does not cover:**

- Decisions about *why* the architecture took its current shape (MADR fills this).
- Behaviour over time (sequence diagrams — these are optional UML add-ons C4 explicitly allows).

---

## 3. MADR v3.0 — decision records

[MADR](https://adr.github.io/madr/) (Markdown Architectural Decision Records) is the most widely adopted ADR format. v3.0 is the current revision.

**Why MADR:**

- ADRs in general are the highest-leverage low-effort document type in software architecture. The case for them is exhaustively argued in [`why-code-change-doc-change.md`](./why-code-change-doc-change.md) and below.
- v3.0 specifically chose the right amount of structure: enough to be machine-readable, not enough to feel bureaucratic.
- It is widely understood — any senior engineer recognises an ADR-shaped document on sight.

**Why ADRs at all (the *real* question):**

The most common objection to ADRs is *"can we not just leave decisions in PR descriptions / Slack / commit messages?"*. The answer is no, for one specific reason: **decisions need to outlive their channel**. PR descriptions are read once and then never again. Slack threads expire. Commit messages are searched by hash, which presupposes you already know what you are looking for.

An ADR sits in a stable, indexed, browsable directory (`arc42/09-decisions/`). Six months later, a new hire scrolling the directory finds the decision *they did not know they needed to find*. That is the value. No other channel produces this.

**Why not heavyweight alternatives** (RFC processes, formal Architecture Review Boards):

- MADR is 1 page of Markdown. RFC processes typically demand 5–20 pages.
- The marginal benefit of an RFC over an ADR is small (slightly better discussion structure) and the marginal cost is large (~5× the writing effort).
- The right place for an RFC is a major architectural shift (microservices migration, language change). Routine decisions should be ADRs.

---

## 4. Diátaxis — end-user documentation

[Diátaxis](https://diataxis.fr) is Daniele Procida's four-quadrant model for user documentation: **Tutorial / How-to / Reference / Explanation**.

**Why Diátaxis:**

- It is the only widely-adopted documentation framework that makes the *reader's intent* the primary axis. The four quadrants map to "I want to learn", "I want to fix a thing", "I want to look something up", "I want to understand". Other models (DITA, Information Mapping) start from the *content type*, which is less actionable for an author.
- Adopted by Django, Gatsby, FastAPI, Numpy, GitLab, and dozens of major OSS projects. The vocabulary travels.
- Maps directly to a single directory structure (`user-manual/{tutorials,how-to,reference,explanation}/`). No bikeshedding required.

**Why pentaglyph itself follows Diátaxis** (the file you are reading is in `docs/explanation/`):

This is dogfooding. Pentaglyph is documentation infrastructure; its own user manual must be built on the same standards it promotes. The fact that you can navigate this manual using its own taxonomy is a load-bearing demonstration.

**What Diátaxis does not cover:**

- Anything not aimed at users (internal architecture, decision history, runtime traces).
- Service-level experience design (filled by TiSDD).

---

## 5. TiSDD — service design

[TiSDD](https://www.thisisservicedesigndoing.com/methods) (*This Is Service Design Doing*, Stickdorn et al., 2018) is the canonical method bank for service design — personas, journey maps, service blueprints.

**Why TiSDD:**

- It is the dominant published reference for service-design methodology. Like the others, it has stable vocabulary that AI agents recognise.
- It plays the same role for *service-experience design* that Diátaxis plays for end-user docs: the same product needs both, and pretending they are the same surface produces bad outputs.
- It composes with arc42 cleanly — TiSDD outputs (personas, journeys, blueprints) live under `arc42/03-context-and-scope/` (or a dedicated `service-design/` directory), which is the existing home for "what the system means to its users".

**Why TiSDD is the fifth standard, not the first** (and is sometimes optional):

Service design matters when you are shipping a *service* — a product that has frontstage and backstage components, with real users interacting with real support / sales / onboarding flows. For pure libraries or internal tools, TiSDD is overkill; `--profile=minimal` omits it.

The kit was originally named `tetragram` (four standards) before TiSDD joined. The promotion of TiSDD to a peer standard reflects the observation that *most teams adopting pentaglyph were shipping services, not just libraries*. The fifth standard fills the gap.

**Why not pure UX-research literature** (Cooper, Norman, Nielsen):

- That literature is method-rich but format-poor. TiSDD specifically provides reusable artefact shapes (persona, journey map, service blueprint) that map to template files.
- The artefact shapes are what pentaglyph needs. Methodology is left to the standard's own URL.

---

## What we considered and rejected

The shortlist of standards we considered binding included:

| Standard | Why rejected |
| --- | --- |
| **DITA** (Darwin Information Typing Architecture) | Heavy XML tooling; orthogonal to AI-readable Markdown. |
| **DocBook** | Same — XML era, hard for AI agents to parse compared to MADR/Diátaxis Markdown. |
| **TOGAF** | Enterprise-architecture framework; too large for software-system documentation. Useful at the *organisation* level, not the *project* level. |
| **ISO/IEC/IEEE 42010** | Architecture-description standard; arc42 already operationalises its concepts in a lighter form. |
| **SAFe documentation conventions** | Tied to a specific (heavyweight) process. We wanted process-agnostic. |
| **DDD strategic patterns (Bounded Contexts, Context Maps)** | Excellent methodology but no canonical *document format*. Use DDD as a way of thinking; record the outputs in arc42 §3 + §5. |
| **OpenAPI / AsyncAPI** | Already inside pentaglyph under `api-contract/`, but as a specification format, not a documentation standard. Not a peer of the five. |
| **Conway diagrams / Wardley mapping** | Useful tools but not documentation standards in the pentaglyph sense. Outputs go into arc42 §3 or `reports/`. |

The pattern across rejections: either too heavy (DITA, TOGAF, DocBook), too narrow (OpenAPI), or no canonical artefact format (DDD, Wardley).

---

## "Why not just one standard?"

This is the most common objection. The answer has three parts:

### Each standard answers a question the others cannot.

The table at the top of this page is not aesthetic. If you tried to use *only* arc42, you would need a homegrown decision format, homegrown user docs, homegrown diagrams. Each homegrown surface is a maintenance liability — and worse, AI agents have no prior on how to use it.

### The standards were designed independently and compose cleanly.

This is the surprising part. arc42, C4, MADR, Diátaxis, TiSDD do not overlap. They were created by different communities, decades apart, and yet they fit together because each addresses a distinct concern. The directory layout under `template/docs/` is the proof — every section maps to exactly one standard's question.

### The cost of "many standards" is paid once, in vocabulary.

The fear is that bundling five standards is five times the cognitive load. In practice, a developer learns the five names once (about 30 minutes of reading), and the day-to-day cost is *lower* than a single-standard kit — because every artefact has an obvious home, and the agent does not have to ask the user where things go.

---

## "Why not six standards?"

Pentaglyph is at five and intends to stay at five. The constraint that ruled out a sixth:

> **A new standard must answer a question the existing five cannot, and must compose cleanly with the existing layout.**

We have evaluated candidates for a sixth slot (TDD / BDD methodology, threat modelling standards like STRIDE, accessibility standards like WCAG, observability frameworks like OpenTelemetry semantic conventions). All of these are *valuable*, but each one either:

- Answers a question already covered by one of the five (e.g., BDD output → fits inside arc42 §6 or a Use Case),
- Is process methodology rather than artefact format (e.g., TDD — there is no document shape, only a practice),
- Is too domain-specific to belong in a general-purpose kit (e.g., WCAG conformance reports — relevant only to UI-shipping projects).

If a future candidate clears the bar, pentaglyph will become *hexaglyph*. Until then, five is the right number.

---

## Practical implication

When you pick a doc template in pentaglyph, you are picking the *standard the doc belongs to*. That mapping is:

| You picked… | You are working in… |
| --- | --- |
| Template 1, 3 — architecture / module spec | **arc42** |
| Anything with a C4 diagram | **C4** |
| Template 5 — ADR | **MADR** |
| Anything under `user-manual/` | **Diátaxis** |
| Template 6 / 7 / 8 — persona / journey / blueprint | **TiSDD** |

If you ever find yourself writing a doc that *does not* fit one of these five, that is a strong signal you are either reinventing one of them, or you are in the volatile-docs layer (impl-plans, postmortems, reports, cost-estimates), where no standard governs the format.

---

## Related

- [`../../../../template/docs/STRATEGY.md`](../../../../template/docs/STRATEGY.md) — the kit's own taxonomy, including the layered architecture
- [why-pentaglyph.md](./why-pentaglyph.md) — the broader argument for the kit
- [why-code-change-doc-change.md](./why-code-change-doc-change.md) — the central rule that gives the five standards their teeth
- [`../reference/template-index.md`](../reference/template-index.md) — which template each standard maps to
