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

This repository uses Release Please on `main`.

- Use conventional commit prefixes such as `feat:` and `fix:` so Release Please can generate the next release.
- Release Please updates `package.json` and `metadata.version` in shipped `SKILL.md` files. Skill versions must keep the `# x-release-please-version` marker on the `metadata.version` line so the generic updater can find them.
- When a release is created, GitHub Actions packages each skill under `skills/` as a `.tar.gz` release asset.
- Do not manually bump skill versions unless explicitly asked; let the release PR do that after the initial version.

## Adding A Skill

1. Create `skills/{skill-name}/SKILL.md`.
2. Add `commands/` or `playbooks/` only when the extra material should load on demand.
3. Add the skill's `SKILL.md` path to `release-please-config.json` as a generic extra file, and add `# x-release-please-version` to the `metadata.version` line.
4. Run `npm test` and `npx skills add . --list`.

## What Not To Add

- Generated dependency folders.
- Per-skill README files unless they are meant for agents to read.
- Hidden executable behavior that is not clearly explained in `SKILL.md`.
- Product marketing copy that does not help an agent complete SiteGPT tasks.
