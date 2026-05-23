---
paths:
  - "docs/client-engagement/**"
---

# Client Engagement Rule (auto-loaded for `docs/client-engagement/**`)

You are about to touch the **Project Engagement Layer (PEL)** — pentaglyph's 6th slot. PEL is not a single standard; it's a *binder* over eight well-known, AI-friendly primitives, each owning one slice of the engagement lifecycle. Before editing, internalise the constraints below.

## Authoritative reading

| File | When to consult |
| --- | --- |
| [`docs/client-engagement/README.md`](../../docs/client-engagement/README.md) | Always — the binder overview and primitive index |
| [`docs/STRATEGY.md` §2.6](../../docs/STRATEGY.md) | When deciding whether something belongs in PEL vs the other 5 slots |
| [`docs/WORKFLOW.md` §1](../../docs/WORKFLOW.md) | When choosing the right PEL template / file |
| [`docs/AI_INSTRUCTIONS.md` §2](../../docs/AI_INSTRUCTIONS.md) | The decision protocol you run before writing |

## The eight bound primitives (with authoritative sources)

| Slot | Primitive | Source URL |
| --- | --- | --- |
| Engagement charter | Agile Inception Deck | <https://agilewarrior.wordpress.com/2010/11/06/the-agile-inception-deck/> |
| Operating agreement | GitLab Handbook handbook-first pattern | <https://handbook.gitlab.com/> |
| Short-form weekly | Atlassian Priorities → Progress → Problems → Next | <https://www.atlassian.com/team-playbook/plays/weekly-team-updates> |
| Long-form cyclical | Basecamp Heartbeat + Amazon 6-pager prose | <https://world.hey.com/jason/what-s-in-a-heartbeat-4fd72d0e> / <https://www.sixpagermemo.com/blog/amazon-six-pager-template> |
| Forward roadmap | Now / Next / Later (Janna Bastow) | <https://productmanagementresources.com/now-next-later-roadmap/> |
| In-flight decisions | DACI (Atlassian) → archives to MADR | <https://www.atlassian.com/team-playbook/plays/daci> |
| Open-items ledger | RAID log | <https://asana.com/resources/raid-log> |
| New-initiative kickoff | Amazon PR/FAQ working-backwards memo | <https://workingbackwards.com/resources/working-backwards-pr-faq/> |

**Do not paraphrase any of these. Link out.**

## Hard rules specific to PEL

1. **Private-first.** Every file under `client-engagement/` is confidential unless `OPERATING-AGREEMENT.md` §5 explicitly says otherwise. This inverts GitLab Handbook's public-first default; PEL borrows the *single-source-of-truth* discipline but not the *public default*.
2. **One canonical voice per artefact.** Weekly updates (`01-artefacts/reports/<YYMMDD>/weekly.md`) are mechanical; Heartbeats (`01-artefacts/reports/<YYMMDD>/heartbeat.md`) are narrative prose; RAID rows are one-line; PR/FAQs are launch-press-release prose. Do not blur the formats.
3. **Promote within the cadence.** Anything decided in Slack / meeting / email that has decision implications must be promoted into PEL within the cadence stated in `OPERATING-AGREEMENT.md` §2. Untracked decisions = decisions that have not happened.
4. **Decisions archive cleanly.** When a `daci/` entry is approved, archive it to `decisions/` as MADR ([template 5](../../docs/01-artefacts/templates/5_adr.md)). Do not delete the DACI file — move it (so git history preserves the deliberation).
5. **Q → R triage promotion.** Items in `questions/Q-NNN.md` that become sharp enough for one-line triage get a `raid.md` row; the verbose file stays as the narrative home. Cross-link.
6. **Volatile vs durable.**
   - **Durable** (no date prefix, edited in place, supersede over delete): `CHARTER.md`, `OPERATING-AGREEMENT.md`, `NOW-NEXT-LATER.md`, `raid.md`, `decisions/`
   - **Volatile** (dated, append-only): `01-artefacts/reports/<YYMMDD>/`, `daci/YYYY-MM-DD-<slug>.md` (until archived), `kickoffs/`, `prfaqs/`, `questions/`
7. **Reports are never edited after publication.** Mistakes are corrected in the *next* report with a one-line "correction" note. The audit trail matters more than the polish.

## The 5 PEL templates that ship today (14–18)

- [`14_inception-deck.md`](../../docs/01-artefacts/templates/14_inception-deck.md) — for `CHARTER.md`
- [`15_weekly-update.md`](../../docs/01-artefacts/templates/15_weekly-update.md) — for `01-artefacts/reports/<YYMMDD>/weekly.md`
- [`16_heartbeat.md`](../../docs/01-artefacts/templates/16_heartbeat.md) — for `01-artefacts/reports/<YYMMDD>/heartbeat.md` and `01-artefacts/reports/narratives/`
- [`17_daci-decision.md`](../../docs/01-artefacts/templates/17_daci-decision.md) — for `daci/`, archives to `decisions/` using `5_adr.md` (MADR)
- [`18_raid-entry.md`](../../docs/01-artefacts/templates/18_raid-entry.md) — row format for `raid.md`

Templates 19 (PR/FAQ), 20 (Now/Next/Later), 21 (Kickoff) are planned for a follow-up release. Until shipped, follow the structure documented in the authoritative source URLs above and in each `client-engagement/<sub-dir>/README.md`.

## When the user asks for client-facing material

Default sequence:

1. Identify whether the request is **weekly** (mechanical update), **cyclical** (Heartbeat / narrative), **decision** (DACI / MADR), **risk** (RAID), **roadmap** (Now/Next/Later), or **kickoff** (PR/FAQ / charter).
2. Pick the matching template (9–13) or the matching durable file.
3. Honour the engagement's `OPERATING-AGREEMENT.md` cadence and channels — never invent a cadence the operating agreement doesn't establish.
4. Cross-link to `raid.md` rows and `decisions/` MADRs from any narrative — PEL's value compounds with cross-references.
5. Apply the project's voice / persona conventions (if `client-msg` / `client-report` style skills exist, defer to them for tone).

## Forbidden in PEL

- Paraphrasing any of the eight bound primitives instead of linking out.
- Mixing narrative prose into a `weekly.md` (it's mechanical) or bullets-of-bullets into a `heartbeat.md` (it's prose).
- Editing a published `01-artefacts/reports/<YYMMDD>/*.md` after the fact — file a correction in the next report.
- Treating any PEL file as shareable without first checking `OPERATING-AGREEMENT.md` §5.
- Adding a new PEL sub-directory without first updating `client-engagement/README.md` and `STRATEGY.md` §2.6.
