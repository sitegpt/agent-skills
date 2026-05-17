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
- Put exact command references in `commands/`.
- Put goal-based workflows in `playbooks/`.
- Do not include secrets, credentials, private customer data, or environment-specific tokens.

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
