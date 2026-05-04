---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-04
---

# C4 model diagrams

> Authoritative source: <https://c4model.com>
>
> Recommended toolchain: **Structurizr DSL** — <https://docs.structurizr.com/dsl> — for the canonical workspace, plus rendered exports (gitignored).

| File             | Purpose                                                                     |
| ---------------- | --------------------------------------------------------------------------- |
| `workspace.dsl`  | Single source of truth for L1–L3 (system context, containers, components)   |
| `exports/`       | Rendered `.png` / `.svg` output (gitignored — regenerated from `workspace.dsl`) |

## Levels

- **L1 — System Context**: who uses the system, what external systems it touches.
- **L2 — Container**: high-level technology choices (apps, services, datastores).
- **L3 — Component**: components inside each container.
- **L4 — Code**: only when needed; usually inline in arc42 §5 building-block notes.

## How to render

```bash
# Using the Structurizr CLI (https://docs.structurizr.com/cli)
structurizr-cli export -workspace workspace.dsl -format mermaid -output exports/
structurizr-cli export -workspace workspace.dsl -format plantuml -output exports/
```

## Hard rules

1. **`workspace.dsl` is the only source of truth.** Hand-drawn diagrams that diverge from it are bugs.
2. **`exports/` is gitignored.** Re-render on demand.
3. **Element names** in `workspace.dsl` must match exactly the names used in `arc42/05-building-blocks/` and `detailed-design/`.

## References

- C4 Model — <https://c4model.com>
- Structurizr DSL — <https://docs.structurizr.com/dsl>
- Mermaid C4 plugin — <https://mermaid.js.org/syntax/c4.html>
