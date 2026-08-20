# SiteGPT Agent Skills

Official SiteGPT skills for AI agents.

These skills teach agents how to use SiteGPT through the SiteGPT CLI so they can manage chatbots, knowledge, conversations, settings, team access, and account resources from an agent environment.

SiteGPT also publishes `https://sitegpt.ai/auth.md` for agent environments that
support Auth.md-style discovery of the anonymous try-before-signup onboarding
flow.

[![skills.sh](https://skills.sh/b/sitegpt/agent-skills)](https://www.skills.sh/sitegpt/agent-skills)

## Install

**As a Claude Code plugin** (also works in Cowork):

```
/plugin marketplace add sitegpt/agent-skills
/plugin install sitegpt@sitegpt
```

**With the skills CLI** (any agent environment that supports Agent Skills):

```
npx skills add sitegpt/agent-skills
```

Both deliver the same skill. This repository is dual-packaged: an Agent
Skills repo (skills.sh) and a Claude Code plugin marketplace
(`.claude-plugin/`).

## Available Skills

### sitegpt

Orientation skill: what SiteGPT is, which surface to use (CLI, MCP
connector, REST API, or no-signup onboarding), and where the deep
workflows live. Routes terminal work to `sitegpt-cli`.

### sitegpt-cli

Use the SiteGPT CLI to manage SiteGPT accounts and chatbots from AI agents such as Codex, Claude Code, Cursor, OpenCode, Gemini CLI, Windsurf, Cline, and other skill-compatible coding agents.

Use when:

- Creating a SiteGPT chatbot from a website.
- Creating a try-before-signup chatbot through agent-first onboarding when the
  user does not have a SiteGPT account yet.
- Adding knowledge from links, websites, sitemaps, files, YouTube videos, text, and connected data sources.
- Managing personas, instructions, settings, conversation starters, followups, and custom responses.
- Reading and managing conversations, messages, leads, tags, members, invites, usage, billing, and API tokens.
- Troubleshooting SiteGPT CLI command usage.

The skill is a single self-contained `SKILL.md`: the agent-facing workflow,
discovery brief, onboarding and account playbooks, command map, and safety
rules in one file. The SiteGPT CLI itself is the source of truth for exact
command syntax — agents run `sitegpt <command> --help` for flags, so the skill
deliberately does not duplicate a per-command reference.

## Install in Cursor

This repository is also a Cursor plugin (skills + the remote MCP server).
In Cursor, run `/add-plugin` and pick **SiteGPT**, or install from the
marketplace listing. The MCP server connects your SiteGPT account with
browser OAuth; the skills work with no account via agent-first onboarding.

## Installation

Install the SiteGPT CLI skill with the open `skills` CLI:

```bash
npx skills add sitegpt/agent-skills --skill sitegpt-cli
```

Install into a specific agent:

```bash
npx skills add sitegpt/agent-skills --skill sitegpt-cli -a codex
npx skills add sitegpt/agent-skills --skill sitegpt-cli -a claude-code
npx skills add sitegpt/agent-skills --skill sitegpt-cli -a cursor
```

Install globally:

```bash
npx skills add sitegpt/agent-skills --skill sitegpt-cli --global
```

List available skills without installing:

```bash
npx skills add sitegpt/agent-skills --list
```

Update installed skills later:

```bash
npx skills update sitegpt-cli
```

## SiteGPT CLI Prerequisite

The `skills` CLI installs this agent skill. The SiteGPT CLI is the actual command-line tool the agent will run after the skill is installed.

Install the SiteGPT CLI first:

```bash
npm install -g @sitegpt/cli
```

Then choose the right flow:

- **No SiteGPT account yet**: do not log in first. Ask the agent to run
  `sitegpt onboarding start <website-url>`, configure and test the temporary
  chatbot, then share the onboarding URL for preview and claim.
- **Existing SiteGPT account**: authenticate, then use normal account commands.

For existing accounts, authenticate with device login:

```bash
sitegpt login
```

You can also create an API token from the SiteGPT dashboard and save it manually:

```bash
sitegpt login --token <sitegpt-api-token>
```

## Example Prompts

Once the skill is installed, ask your agent:

```text
Try SiteGPT for https://example.com. Inspect the website, create a temporary chatbot, add knowledge, configure persona and instructions, test it, and give me the onboarding URL so I can preview and claim it.
```

```text
I already have a SiteGPT account. Create a chatbot for https://example.com inside my account, configure knowledge and branding, and give me the dashboard link.
```

```text
Audit my SiteGPT chatbot knowledge sources and resync any failed or stale documents.
```

```text
Show recent conversations for my SiteGPT chatbot, summarize unresolved issues, and tag the conversations that need human follow-up.
```

## Skill Structure

```text
skills/
  sitegpt-cli/
    SKILL.md
```

## Versioning And Releases

Skill versions live in `metadata.version` inside each `SKILL.md` and in the root `package.json`.

Releases are manual. When publishing a new version:

1. Update `package.json`.
2. Update `metadata.version` in each changed `SKILL.md`.
3. Update `CHANGELOG.md`.
4. Commit with `chore: release <version>`.
5. Create and push a matching Git tag, for example `v0.1.2`.
6. Create a GitHub Release for that tag.

Users who install through `npx skills add sitegpt/agent-skills` can update later with `npx skills update`.

## Related Links

- [SiteGPT](https://sitegpt.ai)
- [SiteGPT CLI on npm](https://www.npmjs.com/package/@sitegpt/cli)
- [SiteGPT CLI docs](https://sitegpt.ai/docs/cli)
- [skills.sh](https://www.skills.sh)
- [Agent Skills specification](https://agentskills.io)

## License

MIT
