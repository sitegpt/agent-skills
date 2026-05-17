---
name: sitegpt-cli
description: Use when an AI agent needs to manage SiteGPT through the SiteGPT CLI, including authentication, profiles, chatbots, knowledge sources, custom responses, settings, personas, instructions, conversations, messages, leads, members, billing, tokens, or troubleshooting CLI command usage.
license: MIT
metadata:
  author: sitegpt
  organization: SiteGPT
  version: "0.1.1" # x-release-please-version
---

# SiteGPT CLI

Use the SiteGPT CLI to manage SiteGPT accounts and chatbots from a terminal or agent environment. Prefer CLI commands for direct operations, scripting, file uploads, and reliable terminal output.

The installed command is `sitegpt`.

## Prerequisite

Check whether the CLI is installed before starting:

```bash
sitegpt --version
```

If `sitegpt` is missing, ask the user before installing it:

```bash
npm install -g @sitegpt/cli
```

## Core Workflow

1. Verify authentication:
   ```bash
   sitegpt whoami --json
   ```
2. If unauthenticated, log in:
   ```bash
   sitegpt login
   ```
3. If the user mentions a named account or environment, inspect and switch profiles:
   ```bash
   sitegpt profiles list
   sitegpt profiles use <profile>
   ```
4. Discover exact syntax with contextual help before using unfamiliar commands:
   ```bash
   sitegpt --help
   sitegpt knowledge --help
   sitegpt knowledge documents --help
   sitegpt settings general --help
   ```

Use `--json` whenever you need IDs, pagination cursors, full nested data, or reliable parsing.

## Operating Mode

When the user asks for an outcome, do not stop at listing commands. Act like a SiteGPT implementation agent:

- Understand the user's business, website, docs, audience, and support needs.
- Create or update the right SiteGPT resources through the CLI.
- Parallelize independent work after required IDs exist.
- Verify results with list/get/status commands and, when useful, test messages.
- Report created IDs, dashboard links, knowledge sources, important warnings, and follow-up work.

If web/browser/fetch tools are available, inspect the website before creating or deeply customizing a chatbot. The SiteGPT CLI manages SiteGPT; it does not itself understand websites. If no web tools are available, create a conservative chatbot, ingest the sitemap/website, and tell the user deeper brand-specific customization needs website inspection.

## End-To-End Website Setup

For requests like "Create a chatbot for https://example.com", read [playbooks/create-chatbot-from-website.md](playbooks/create-chatbot-from-website.md) before acting. That playbook contains the full workflow for raw HTML inspection, brand colors/icons, sitemap selection, knowledge ingestion, persona/instructions, starters/followups, settings, verification, and final reporting.

Short path:

```bash
sitegpt chatbots create "<Brand> Support" --description "<short description>" --json
sitegpt knowledge sitemap add --chatbot <chatbot-id> https://example.com/sitemap.xml --only-main-content true --json
sitegpt personas add --chatbot <chatbot-id> --title "<Brand> support specialist" --file ./persona.md --json
sitegpt instructions add --chatbot <chatbot-id> --file ./instructions.md --temperature 0.3 --json
sitegpt dashboard --chatbot <chatbot-id>
```

Always prefer sitemap ingestion when a sitemap exists. If no sitemap is available, use `sitegpt knowledge website add`. If only a few pages matter, use `sitegpt knowledge links add`.

## Command Reference

For exact option names, enum values, defaults, and examples, read only the command reference that matches the user's task. Prefer `--help` at the closest command level when the installed CLI may be newer than this skill.

Use this command map to choose the right group:

- Authentication, profiles, global options, env vars: [commands/authentication.md](commands/authentication.md).
- Chatbots, dashboard links, embed snippets, icons: [commands/chatbots.md](commands/chatbots.md).
- Knowledge documents, links, websites, sitemaps, files, YouTube, text, sync jobs, Custom Responses: [commands/knowledge.md](commands/knowledge.md).
- Connected sources such as Notion, Google Drive, Dropbox, OneDrive, Box, SharePoint, Confluence, GitHub: [commands/sources.md](commands/sources.md).
- Personas, instructions, starters, followups: [commands/customization.md](commands/customization.md).
- Settings sections and field updates: [commands/settings.md](commands/settings.md).
- Conversations, messages, tags, leads: [commands/conversations.md](commands/conversations.md).
- Account profile, members, invites, usage, limits, billing: [commands/account-team-billing.md](commands/account-team-billing.md).
- API tokens, scopes, rotation, revocation: [commands/tokens.md](commands/tokens.md).
- Common errors and recovery: [commands/troubleshooting.md](commands/troubleshooting.md).

## Authentication And Scopes

Device login opens a browser approval page:

```bash
sitegpt login
sitegpt login --profile claude
```

Use existing tokens when the user provides one:

```bash
sitegpt login --token <sitegpt-api-token>
```

Request full access only when the task genuinely needs broad permissions:

```bash
sitegpt login --full-access
```

Request custom access for narrower agents:

```bash
sitegpt login --scope account:read --scope chatbots:read --scope knowledge:write
```

Do not expose full tokens in final output. Tokens are shown once when created. SiteGPT CLI/API tokens look like `sgpt_xxxxxxxxx`; treat them as opaque credentials.

Common scopes:

- Account: `account:read`, `account:write`
- Tokens: `tokens:read`, `tokens:write`
- Chatbots: `chatbots:read`, `chatbots:write`, `chatbots:delete`
- Knowledge: `knowledge:read`, `knowledge:write`, `knowledge:delete`
- Personas: `personas:read`, `personas:write`, `personas:delete`
- Instructions: `instructions:read`, `instructions:write`, `instructions:delete`
- Settings: `settings:read`, `settings:write`
- Conversations: `conversations:read`, `conversations:write`, `conversations:delete`
- Leads: `leads:read`, `leads:write`, `leads:delete`
- Members: `members:read`, `members:write`, `members:delete`
- Billing: `billing:read`

For the complete scope list supported by the installed CLI, run `sitegpt tokens create --help`.

## Important Behaviors

- Most chatbot operations require `--chatbot <chatbot-id>`.
- Never invent a chatbot, document, source, thread, lead, or token ID. List first if unknown.
- Use `sitegpt knowledge files add`, not `upload`.
- For links, website, and sitemap commands, `--only-main-content` defaults to `true`, matching dashboard behavior.
- Omit `thread-id` in `sitegpt messages send` to start a new conversation.
- The CLI sends messages as the user; do not try to send as AGENT or SYSTEM.
- Personas and instructions are separate from settings. Use `personas use` and `instructions use` to activate specific entries.
- Notion source selection happens inside Notion's OAuth permission screen. After Notion authorization, run ingest even if the pre-ingest document list is empty.
- To add more files to an existing OAuth/picker source, run `sitegpt knowledge sources authorize --chatbot <chatbot-id> <source-id>` again; do not create a duplicate source.
- Auto-sync refreshes known content. Sitemap auto-scan checks for added/deleted URLs. Both can be plan-gated.

## Safety Rules

- Use `--json` for machine-readable work.
- List before mutating when IDs are unknown.
- Read current settings before updating settings.
- Destructive commands require `--yes`; do not delete unless the user asked for deletion.
- Do not print full tokens or secrets in final answers.
- Prefer narrow scopes for specialized agents; use `--full-access` only when broad account management is needed.
- If a command fails, run the nearest `--help` level and retry with the documented syntax.

## Troubleshooting

`TOKEN_SCOPE_NOT_VALID` means the scope name is not accepted. Check `sitegpt tokens create --help`.

`TOKEN_SCOPE_NOT_ALLOWED` means the current token lacks a required scope. Log in with a broader token or ask the user to approve a token with the missing scope.

`UNKNOWN_COMMAND` usually means the command is at a different level. For example, Custom Responses live under:

```bash
sitegpt knowledge custom-responses ...
```

For local development only, include the API base during login:

```bash
sitegpt login --profile local --api-base <local-api-base-url>
```

After that, `--api-base` is stored in the profile and does not need to be repeated.
