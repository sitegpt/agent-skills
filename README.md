# SiteGPT Agent Skills

Official SiteGPT skills for AI agents.

These skills teach agents how to use SiteGPT through the SiteGPT CLI so they can manage chatbots, knowledge, conversations, settings, team access, and account resources from an agent environment.

[![skills.sh](https://skills.sh/b/sitegpt/agent-skills)](https://www.skills.sh/sitegpt/agent-skills)

## Available Skills

### sitegpt-cli

Use the SiteGPT CLI to manage SiteGPT accounts and chatbots from AI agents such as Codex, Claude Code, Cursor, OpenCode, Gemini CLI, Windsurf, Cline, and other skill-compatible coding agents.

Use when:

- Creating a SiteGPT chatbot from a website.
- Adding knowledge from links, websites, sitemaps, files, YouTube videos, text, and connected data sources.
- Managing personas, instructions, settings, conversation starters, followups, and custom responses.
- Reading and managing conversations, messages, leads, tags, members, invites, usage, billing, and API tokens.
- Troubleshooting SiteGPT CLI command usage.

The skill includes:

- `SKILL.md`: agent-facing workflow, command map, and safety rules.
- `playbooks/create-chatbot-from-website.md`: end-to-end website chatbot setup playbook.
- `commands/`: command-specific references so agents can load only the area they need.

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

Then authenticate:

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
Create a SiteGPT chatbot for https://example.com. Inspect the website, choose brand colors and icons, add the sitemap as knowledge, configure persona and instructions, and give me the chatbot dashboard link.
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
    commands/
      authentication.md
      chatbots.md
      knowledge.md
      sources.md
      customization.md
      settings.md
      conversations.md
      account-team-billing.md
      tokens.md
      troubleshooting.md
    playbooks/
      create-chatbot-from-website.md
```

## Versioning And Releases

The repo starts at `0.1.0`. Skill versions live in `metadata.version` inside each `SKILL.md`. Release Please is configured to keep those versions in sync with the repository version.

When a GitHub release is created, the release workflow packages each skill as a `.tar.gz` release asset. Users who install through `npx skills add sitegpt/agent-skills` can update later with `npx skills update`.

## Related Links

- [SiteGPT](https://sitegpt.ai)
- [SiteGPT CLI on npm](https://www.npmjs.com/package/@sitegpt/cli)
- [SiteGPT CLI docs](https://sitegpt.ai/docs/cli)
- [skills.sh](https://www.skills.sh)
- [Agent Skills specification](https://agentskills.io)

## License

MIT
