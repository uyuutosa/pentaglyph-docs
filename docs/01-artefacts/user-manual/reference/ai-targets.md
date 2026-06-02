---
status: Draft
owner: <placeholder>
last-reviewed: 2026-05-17
diataxis: reference
audience: anyone choosing an `--ai` flag
---

# AI-target reference

> **What this is:** the exact list of files each `--ai=<target>` installs, derived from the CLI source (`cli/src/commands/init.ts`). For *how to use* a target day-to-day, see the matching how-to guide ([use-with-claude-code.md](../how-to/use-with-claude-code.md) for the Claude flow).

```bash
pentaglyph init <target> --ai=<claude|cursor|copilot|generic>
```

If `--ai` is omitted, the default is **`generic`**. The other targets install editor-specific auto-load hooks that point at the same underlying `docs/AI_INSTRUCTIONS.md`.

---

## What every target installs

Regardless of `--ai`, every project gets:

| File | Purpose |
| --- | --- |
| `docs/AI_INSTRUCTIONS.md` | The protocol the AI agent must follow when touching `docs/`. **This is the source of truth — the editor-specific hooks just point at it.** |
| `docs/WORKFLOW.md` | The canonical placement / lifecycle rules `AI_INSTRUCTIONS.md` resolves to. |

The editor hooks below are *additive*. They make the AI agent **automatically read** the protocol whenever its working directory matches `docs/**`, without the user having to remind it.

---

## `claude` — most fully integrated

```text
<target>/
├── .claude/
│   ├── rules/
│   │   ├── documentation.md      ← auto-load when editing docs/**
│   │   ├── version-control.md    ← auto-load globally (Git Flow + Conventional Commits)
│   │   └── dialogue-style.md     ← auto-load globally (consultative dialogue)
│   ├── agents/
│   │   ├── adr-writer.md
│   │   ├── architect-agent.md
│   │   ├── completeness-auditor.md
│   │   ├── discovery-agent.md
│   │   ├── doc-orchestrator.md
│   │   └── spec-writer.md
│   └── skills/
│       ├── diagram-render/
│       ├── doc-fill/
│       ├── doc-init/
│       ├── doc-status/
│       └── explain/
```

**Use when:** Your team uses Claude Code as the primary AI assistant.

**What it gives you beyond the auto-load rule:**

- **6 specialist agents** the orchestrator can dispatch — discovery, architecture, ADR drafting, spec writing, completeness auditing.
- **5 skills** that wrap multi-step doc work behind a single `/doc-init`, `/doc-fill`, `/doc-status`, `/diagram-render`, `/explain` command.
- Three auto-load rules covering documentation, version-control conventions, and dialogue style.

This is **the most powerful target** by a wide margin. If you have a choice, pick `claude`.

---

## `cursor` — auto-load only

```text
<target>/
└── .cursor/
    └── rules/
        └── docs.md     ← copy of .claude/rules/documentation.md
```

**Use when:** Your team uses Cursor.

**What it gives you:**

- The auto-load rule wakes up whenever Cursor's working context overlaps `docs/**`.
- The content of `docs.md` is bit-identical to Claude's `documentation.md`. The protocol is the same; only the file path the editor reads from differs.

**What it does NOT give you:** agents and skills are Claude-specific. There is no equivalent surface in Cursor today (as of 2026-05).

---

## `copilot` — auto-load only

```text
<target>/
└── .github/
    └── copilot-instructions.md     ← copy of .claude/rules/documentation.md
```

**Use when:** Your team uses GitHub Copilot Chat as the primary AI assistant.

**What it gives you:**

- `.github/copilot-instructions.md` is GitHub's [native auto-load surface](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot) for repository-level Copilot context. Every chat message in this repo will include the protocol.

**What it does NOT give you:** agents, skills, or the broader `.claude/` rule set.

---

## `generic` — no editor hook

```text
<target>/
└── (no editor-specific files)
```

**Use when:**

- You use an AI agent that has no editor-integrated auto-load surface (e.g. a CLI agent, a custom MCP client, a self-hosted assistant).
- You want to keep the project's editor configuration uncluttered.

**What it gives you:** the `docs/AI_INSTRUCTIONS.md` file ships as usual; you must instruct the agent to read it manually at the start of each session:

> "Read `docs/AI_INSTRUCTIONS.md` and follow pentaglyph rules whenever you touch `docs/`."

---

## Target capabilities at a glance

| Capability | `claude` | `cursor` | `copilot` | `generic` |
| --- | :---: | :---: | :---: | :---: |
| `docs/AI_INSTRUCTIONS.md` installed | ✅ | ✅ | ✅ | ✅ |
| Auto-load on `docs/**` edits | ✅ | ✅ | ✅ | — |
| Auto-load globally (not just docs) | ✅ | — | ✅ | — |
| Version-control + dialogue-style rules | ✅ | — | — | — |
| Specialist agents (6) | ✅ | — | — | — |
| Skills (5) | ✅ | — | — | — |

The asymmetry is unavoidable: `cursor` and `copilot` only have auto-load rule surfaces. Claude Code is the only target today that supports agents and skills.

---

## Switching targets after `init`

You do not have to re-init to switch targets. Re-run with `--force --ai=<new-target>`:

```bash
bunx --bun @uyuutosa/pentaglyph init . --profile=standard --ai=cursor --force
```

Re-running with a new target installs the new target's files but does **not** remove the old target's. Delete the unused `.claude/` / `.cursor/` / `.github/copilot-instructions.md` manually if you want a clean switch.

---

## Caveats

1. **Targets are not mutually exclusive.** If your team is mixed (some Claude, some Cursor), run `init` multiple times with different `--ai` flags. The targets do not conflict.
2. **`cursor` and `copilot` copy the *same content* as Claude's `documentation.md`.** This is intentional — the protocol is editor-agnostic. If a future protocol revision diverges per editor, this page should be updated to reflect that.
3. **Agents and skills are not yet portable.** The 6 specialist agents under `.claude/agents/` reference Claude Code's Task tool surface. They would need substantial adaptation for non-Claude environments.

---

## Related

- [profiles.md](./profiles.md) — what `--profile` installs
- [template-index.md](./template-index.md) — what `templates/` ships with
- [`../how-to/use-with-claude-code.md`](../how-to/use-with-claude-code.md) — daily workflow with `--ai=claude`
- [`../../../../cli/README.md`](../../../../cli/README.md) — full CLI flag reference
- [`../../../../cli/src/commands/init.ts`](../../../../cli/src/commands/init.ts) — the source of truth this page is generated from
