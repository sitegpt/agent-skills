# AGENTS.md

Guidance for AI coding agents working in this repository.

## Overview

This repository contains official SiteGPT skills for AI agents. Skills follow the Agent Skills format used by the `skills` CLI and skills.sh.

## Structure

```text
skills/
  {skill-name}/
    SKILL.md
    commands/ (optional)
    playbooks/ (optional)
```

## Commands

```bash
npm test
npx skills add . --list
```

Run `npm test` before committing changes.

## Skill Rules

- `SKILL.md` must include YAML frontmatter with `name`, `description`, `license`, and `metadata.version`.
- The `name` must match the skill directory name.
- Use lowercase kebab-case skill names.
- The `description` is the trigger text agents see before loading the full skill, so include what the skill does and when to use it.
- Keep `SKILL.md` focused on agent behavior and core workflows.
- `commands/` and `playbooks/` are optional. Use them only when a skill is large enough that splitting genuinely helps; otherwise a single self-contained `SKILL.md` (up to 1000 lines) is fine and avoids drift.
- Do not include secrets, credentials, private customer data, or environment-specific tokens.

## Source Of Truth For `sitegpt-cli`

The `sitegpt-cli` skill is **synced, not authored here.** Its canonical source is the SiteGPT product repo at `public/agents/sitegpt-cli-skill.md` (the file served at `https://sitegpt.ai/agents/sitegpt-cli-skill.md` and digest-verified there). To change this skill, edit it in the product repo, then copy the body here under this repo's frontmatter and bump the version. Do not edit `skills/sitegpt-cli/SKILL.md` directly or re-split it into `commands/`/`playbooks/` — that re-introduces the exact drift this consolidation removed.

## Versioning

This repository uses manual releases.

- Keep `package.json` and each shipped `SKILL.md` `metadata.version` in sync.
- Update `CHANGELOG.md` when making release commits.
- Use release commit messages like `chore: release 0.1.2`.
- Create a matching Git tag such as `v0.1.2`.
- GitHub Releases are optional unless a packaged archive is needed.

## Adding A Skill

1. Create `skills/{skill-name}/SKILL.md`.
2. Add `commands/` or `playbooks/` only when the extra material should load on demand.
3. Run `npm test` and `npx skills add . --list`.

## What Not To Add

- Generated dependency folders.
- Per-skill README files unless they are meant for agents to read.
- Hidden executable behavior that is not clearly explained in `SKILL.md`.
- Product marketing copy that does not help an agent complete SiteGPT tasks.
