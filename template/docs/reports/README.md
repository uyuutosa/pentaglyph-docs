---
status: Stable
owner: <placeholder>
last-reviewed: 2026-05-04
---

# reports — one-shot research and evaluation reports

> **Layer B (volatile, dated, append-only).** For findings that are timestamped to a moment of evaluation and not expected to remain current.

## File naming

`YYYY-MM-DD_<kebab-title>.md`

Examples:

- `2026-05-04_vendor-comparison-vector-databases.md`
- `2026-05-11_load-test-results-checkout-flow.md`

## What belongs here

- Vendor / library comparisons
- One-shot benchmark results
- Spike / proof-of-concept findings
- Customer interview synthesis
- Data analyses
- **AI-assisted session handoffs** — when a substantive multi-hour collaboration with an AI assistant produces decisions, scaffolding, and follow-up work, write a dated handoff so the next session (or the next person) can resume cold. See "AI session handoffs" below.

## What does NOT belong here

- Anything that should remain current → put it in Layer A (e.g. `arc42/10-quality/` for SLO benchmarks).
- Architectural decisions → write an ADR under `arc42/09-decisions/` instead.
- Bug retrospectives → use [`../postmortems/`](../postmortems/).

## AI session handoffs

When this directory is used to capture an AI-assistant session, add the following fields to the front-matter so the conversation is reproducible and discoverable:

```yaml
---
status: Stable
owner: <project-name>
last-reviewed: YYYY-MM-DD
assistant: Claude Opus 4.7 (1M context)            # or whichever model + variant
session-id: <session-uuid>                          # the AI tool's session id
session-log: ~/.claude/projects/<encoded-cwd>/<session-uuid>.jsonl  # local-only path; see below
---
```

**Conversation log location (Claude Code).** Sessions are written to `~/.claude/projects/<encoded-cwd>/<session-uuid>.jsonl` where `<encoded-cwd>` is the absolute project path with every non-alphanumeric character replaced by `-` (e.g. `/Users/me/proj` → `-Users-me-proj`). The file is JSON-Lines, one event per line: user messages, assistant messages, tool uses, tool results. See [Claude Code docs — Work with sessions](https://code.claude.com/docs/en/agent-sdk/sessions).

**Path is local-only.** `~/...` resolves to the author's machine and is not portable. Treat it as a personal-use breadcrumb. For shareable transcripts, write a readable extract to `<date>_<title>__transcript.md` alongside the handoff (manually redact secrets / personal context).

**Body structure for a handoff report.** Use these sections, in order:

1. **TL;DR** — one paragraph: what was decided, what was built, what is unblocked, what is still open.
2. **Decisions made this session** — list with cross-links to ADRs (existing or to-be-created).
3. **Artefacts produced** — files created / modified, organised by area (docs / code / config), each linked.
4. **Tests / verification run** — any commands actually executed and their outcome (e.g. `pytest 15/15 passed`).
5. **Open issues** — link to a sibling [`../task-list/<date>_*.md`](../task-list/) entry rather than duplicating; one line summary per item.
6. **Next-session priorities** — what the next agent / human should pick up first, with the source-of-decision link.
7. **Inconsistencies / known bugs introduced** — be honest; future-you needs this.

For lifecycle, see [`../WORKFLOW.md`](../WORKFLOW.md).
