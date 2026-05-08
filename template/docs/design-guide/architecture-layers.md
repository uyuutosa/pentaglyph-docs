---
status: Draft
owner: <placeholder>
last-reviewed: <YYYY-MM-DD>
---

# Architecture layers — by granularity

> **Default starting point shipped by tetragram.** Customise the placeholders below to match your project. Lock the architectural commitment in an ADR under [`../arc42/09-decisions/`](../arc42/09-decisions/) (start from [`../templates/5_adr.md`](../templates/5_adr.md)) if your team agrees with the layering; this guide is then the *catalogue* the ADR points at.
>
> **Why this exists.** Codebases that span library + application + frontend tend to drift into three different review vocabularies. This guide gives reviewers and authors a single ladder — pick the granularity layer where the issue lives, then name the convention.

## The granularity ladder

| Layer | Question it answers                                   | Backend convention                       | Frontend convention                                            |
| ----- | ----------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------- |
| Macro | What is the system's external shape and infra seam?    | **Port & Adapter** (Hexagonal)            | **Container / Presentational** separation                       |
| Mid   | How is the domain partitioned and modelled?           | **DDD** tactical + strategic              | **Atomic Design** (Atoms→Molecules→Organisms→Templates→Pages)   |
| Micro | How do collaborators within a class / file relate?    | **GoF** (curated subset)                  | Framework idioms (e.g. React hooks, Vue composables)            |

A reviewer should pick a layer and name the violation. "This is hard to read" is incomplete; "this Aggregate imports an SDK type, breaking Hexagonal" is the form.

---

## Backend (recommended default)

### Macro — Hexagonal Port & Adapter

Each Bounded Context is shaped as:

```
<app>/<context>/
├── domain/         # Pure domain — Aggregates, Entities, VOs, Domain Services
│                   # FORBIDDEN imports: any framework / cloud SDK / HTTP client
├── ports/          # Protocols / abstract base classes the domain needs
├── adapters/       # Concrete implementations of ports/* against real infra
├── use_cases/      # Application services — orchestrate domain + ports
└── tests/          # Mirror tree (unit / integration / contract)
```

**Inversion rule.** `domain/` and `use_cases/` may import from `ports/` only. `adapters/` import from `ports/` and from external SDKs. Nothing in `domain/` may import from `adapters/`. Enforce with a lint rule (e.g. `import-linter`, ruff custom rule).

### Mid — DDD

**Strategic patterns.** Decompose the system into Bounded Contexts. Cross-context interactions go through **Anti-Corruption Layers** (translators in `<context>/adapters/<other-context>/`). Direct domain-to-domain imports between contexts are forbidden.

Replace the placeholder list below with your project's contexts (typical sizes: 3–8 contexts):

| Bounded Context  | Core concern                                               |
| ---------------- | ---------------------------------------------------------- |
| `<context-1>`    | <one-sentence summary of its responsibility>               |
| `<context-2>`    | <one-sentence summary of its responsibility>               |
| `<context-3>`    | <one-sentence summary of its responsibility>               |

**Tactical patterns.**

| Pattern              | Use it for                                                                                | Notes                                                                            |
| -------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Aggregate**        | A consistency boundary (transactional + invariant-protecting)                             | One Aggregate Root; Entities inside it are accessed only through the Root.        |
| **Entity**           | Identity-driven object inside an Aggregate                                                |                                                                                  |
| **Value Object**     | Immutable, equality-by-value                                                              | `Money(amount, currency)` is the canonical example.                              |
| **Repository**       | Aggregate-shaped persistence. One Repository per Aggregate Root. Returns Aggregates only. | Querying for projections is a read-side concern; do NOT extend Repository for it. |
| **Domain Service**   | Cross-Aggregate domain logic that doesn't naturally fit in one Aggregate                  |                                                                                  |
| **Domain Event**     | Something that has happened in the domain that other contexts may care about              |                                                                                  |
| **Specification**    | Reusable predicate over Aggregates                                                        |                                                                                  |
| **Factory** (DDD)    | Complex Aggregate construction (different from GoF Factory)                              | E.g. `Order.from_user_intent(...)`.                                              |

### Micro — GoF (curated)

Recommended (use freely):

- **Strategy** — for varying behaviour at a Port boundary
- **Factory** (GoF) — for adapter construction (often inside a DI Container)
- **Decorator** — for cross-cutting wrapping (logging, retry, telemetry)
- **Observer** — for Domain Event subscribers
- **Command** — for serializable user-intent representations
- **Specification** — for filterable predicates (overlaps DDD Specification)

Allowed (use if needed): Visitor, Iterator, Composite, Adapter (GoF — distinct from Hexagonal Adapter; rename to avoid confusion), Template Method, Chain of Responsibility, Memento.

Forbidden:

- **Singleton** — use a DI container instead. Process-global mutable state without DI is forbidden.
- **Service Locator** without DI — request the dependency, don't pull it from a registry.
- **God Object** — any class with > 7 public methods or > 300 lines is a smell; reviewer must justify in PR description.
- **Anaemic Domain Model** — Aggregates with only getters/setters and no behaviour; logic must live in the Aggregate, not in a Service.

---

## Frontend (recommended default; tighten to "MUST" once the FE codebase grows)

### Macro — Container / Presentational

```
web/
├── containers/     # Connect to state (queries, hooks, stores). Render minimal markup.
├── presentational/ # Pure render given props. No data fetching, no global state.
└── pages/          # Route-level Containers
```

**Container responsibilities.** Fetch data; subscribe to stores; handle mutations and routing; pass props to one Presentational child.

**Presentational responsibilities.** Render markup given props; expose callbacks via props (`onSubmit`, `onChange`); no data fetching, no global state.

### Mid — Atomic Design

| Level             | What it is                                                            |
| ----------------- | --------------------------------------------------------------------- |
| **Atom**          | Smallest possible UI primitive — one HTML element + styling           |
| **Molecule**      | A small group of atoms with a single, focused purpose                 |
| **Organism**      | Distinct section of an interface — composed of molecules and/or atoms |
| **Template**      | Page-level layout with placeholders, no real data                     |
| **Page**          | Specific instance of a Template with real data                        |

Pages are typically Containers; Templates / Organisms / Molecules / Atoms are typically Presentational. An Organism may rarely need its own Container if it has substantial isolated state — annotate with a comment explaining why.

### Micro — Framework idioms

Use the framework's native vocabulary; do not force GoF naming on framework constructs (e.g. don't call `useReducer` "Command pattern" in PR comments).

---

## Anti-patterns (any layer)

- **Domain importing adapter** — domain code referencing concrete SDK / adapter classes directly. Use Ports.
- **Aggregate exposing internal Entities** — returning a mutable internal collection. Provide methods that preserve invariants.
- **Repository returning DTOs** — Repositories return Aggregates. DTOs are an application/UI concern.
- **Singleton in domain** — global mutable state hidden as a class-with-static-method.
- **Container with rendering logic** — Container that has its own markup instead of delegating to a Presentational child.
- **Presentational with data fetching** — pure render contract violated.
- **Atomic-Design "Atom" that's really an Organism** — a primitive that internally has its own state machine. Promote it to Organism.

## How this maps to the C4 model

- **C4 L1 (system context)** — invariant under this convention; describes external systems regardless of internal layering.
- **C4 L2 (containers)** — each container hosts one or more Bounded Contexts.
- **C4 L3 (components)** — components inside a container map to {`domain` / `ports` / `adapters` / `use_cases` / Container / Presentational} layers.
- **C4 L4 (code)** — class-level diagrams; this is where GoF patterns surface.

## Cross-references

- ADR — lock the layering decision in an `arc42/09-decisions/NNNN-*.md` if the team agrees with this default.
- [`../arc42/05-building-blocks/`](../arc42/05-building-blocks/) — Bounded Context inventory.
- [`../arc42/08-crosscutting/`](../arc42/08-crosscutting/) — runtime cross-cutting concerns (security, observability, error strategy).
