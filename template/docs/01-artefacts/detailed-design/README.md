---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-04
---

# detailed-design — per-module implementation specs (HOW)

> **Use Template 3** ([`../01-artefacts/templates/3_module-detailed-design.md`](../01-artefacts/templates/3_module-detailed-design.md)) for everything in this directory.

This directory holds the implementation HOW for each module. arc42 §5 (`../01-artefacts/arc42/05-building-blocks/`) is a navigation index that points here; the actual data models, API contracts, error handling, and design intent live in the per-module files below.

## File layout

```text
01-artefacts/detailed-design/
├── README.md                           # this file
├── <module-1>.md                       # Template 3 instance per module
├── <module-2>.md
└── <subsystem>/                        # group related modules in subdirectories if it grows large
    ├── <module-3>.md
    └── <module-4>.md
```

## Naming

`<module-name>.md` in lower-kebab-case, matching the building-block name in `01-artefacts/arc42/05-building-blocks/` and the element name in `01-artefacts/diagrams/c4/workspace.dsl`. Synonyms across these three locations are bugs.

## Cross-references from each module file

Each module file should link out to:

- The PRD that motivated it (`01-artefacts/arc42/03-context-and-scope/prds/<file>.md`)
- The ADRs that shaped it (`01-artefacts/arc42/09-decisions/NNNN-...md`)
- The crosscutting concerns that apply to it (`01-artefacts/arc42/08-crosscutting/<concern>.md`)
- The API contract (`01-artefacts/api-contract/<module>.md`)
- The use cases that exercise it (`01-artefacts/arc42/03-context-and-scope/use-cases/<file>.md`)

For lifecycle / when to update, see [`../WORKFLOW.md`](../WORKFLOW.md).
