---
name: sitegpt-cli
description: Use when an AI agent needs to manage SiteGPT through the SiteGPT CLI, including authentication, profiles, chatbots, knowledge sources, custom responses, settings, personas, instructions, conversations, messages, leads, members, billing, tokens, or troubleshooting CLI command usage.
license: MIT
metadata:
  author: sitegpt
  organization: SiteGPT
  version: "0.1.2"
---

# SiteGPT CLI

Use the SiteGPT CLI to manage SiteGPT accounts and chatbots from a terminal or agent environment. Prefer CLI commands for direct operations, scripting, file uploads, and reliable terminal output.

The installed command is `sitegpt`.

SiteGPT also publishes `https://sitegpt.ai/auth.md` for agents that support
Auth.md-style discovery. Use that file when an agent environment wants to
discover the anonymous try-before-signup registration endpoint. Use this skill
when the agent can run the SiteGPT CLI.

## Prerequisite

Check whether the CLI is installed before starting:

```bash
sitegpt --version
```

If `sitegpt` is missing, ask the user before installing it:

```bash
npm install -g @sitegpt/cli
```

## Choose The Right CLI Flow First

Decide the flow before any authentication checks:

- **User says "use SiteGPT for this website", "create a chatbot for this
  business", "try SiteGPT", or does not provide a SiteGPT token/profile**: use
  agent-first onboarding. Do not ask the human to sign in first. Create a
  temporary preview chatbot, configure it, test it, then share the onboarding URL
  for preview and claim.
- **User provides a token/profile, says they already use SiteGPT, or asks to
  update an existing chatbot/account**: use authenticated account management.
  Check authentication and manage resources directly in that account.

`PROFILE_NOT_CONFIGURED` is not a blocker for agent-first onboarding. It only
means no saved account profile exists. Continue with `sitegpt onboarding start`
instead of stopping or asking the human to log in.

If the user is new to SiteGPT but explicitly wants to authenticate first and
create the chatbot directly in their account, that is also fine; use the account
flow. Otherwise default to onboarding because it creates value before signup.

## Clarify Chatbot Purpose

Before creating or configuring a chatbot, know what job the chatbot should do.
Purpose drives the persona, instructions, starter prompts, lead capture, support
handoff, and which pages matter most.

If the user already states the purpose, use it directly. Examples:

- "customer support chatbot" -> support-first persona, accurate answers,
  uncertainty handling, escalation/contact instructions.
- "lead generation bot" -> conversion-aware persona, qualification questions,
  lead form, sales/contact followups.
- "marketing website assistant" -> product explainer, navigation help, pricing
  and feature discovery, helpful CTAs.
- "docs/help bot" -> technical grounding, citations/sources, careful unknowns.

If the purpose is missing or ambiguous, ask one concise question before creating
the chatbot:

```text
What should this SiteGPT chatbot optimize for: customer support, marketing/site
guide, lead generation, docs/help, onboarding, or a mix?
```

If the user is unavailable and the task should proceed autonomously, infer the
most likely purpose from the prompt and website, then state the assumption in
your final report. For a generic public business website, default to a balanced
marketing guide + customer support bot.

## Core Workflow

For agent-first onboarding, start with the website URL, not an account login. It
is fine to check `sitegpt --version` and inspect the website first, but do not
run `sitegpt whoami` as a required step:

```bash
sitegpt onboarding start https://example.com --json
```

This does not require login. It returns a temporary one-chatbot token, chatbot ID, and onboarding URL. Use the temporary token to finish setup:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt onboarding status <workspace-id> --json
```

After capturing the temporary token, keep using it through `SITEGPT_API_TOKEN`
instead of logging in. Do not echo the token, do not include the full token in
final output, and do not ask the human to create a token unless the onboarding
start command fails.

The status response includes `data.setupChecklist`; fix pending, warning, or unknown checklist items when possible before sharing the onboarding URL. After the human claims the chatbot, the same temporary token is transferred to the claimed SiteGPT user, stays scoped only to that chatbot, and keeps its original expiry.

For existing SiteGPT accounts or direct account management:

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

### Avoid Cancelled Setup Work

Some agent runtimes cancel parallel tool calls when one command returns a
non-zero exit code. Do not put optional auth checks in the same shell command or
parallel batch as required website inspection.

Good:

```bash
sitegpt --version
sitegpt whoami --json || true
```

Then independently inspect the website and continue with onboarding if auth is
not configured.

Bad:

```bash
sitegpt whoami --json && curl -sL https://example.com -o /tmp/page.html
```

For agent-first onboarding, missing auth is expected. Website inspection and
`sitegpt onboarding start` should still continue.

## Operating Mode

When the user asks for an outcome, do not stop at listing commands. Act like a SiteGPT implementation agent:

- Understand the user's business, website, docs, audience, and support needs.
- Identify the chatbot purpose before setup: customer support, marketing site
  guide, lead generation, sales qualification, product docs, onboarding, or a
  combination.
- Create or update the right SiteGPT resources through the CLI.
- Parallelize independent work after required IDs exist.
- Verify results with list/get/status commands and, when useful, test messages.
- Report created IDs, onboarding URLs for no-account onboarding or dashboard links for account setup, knowledge sources, important warnings, and follow-up work.

If web/browser/fetch tools are available, inspect the website before creating or deeply customizing a chatbot. The SiteGPT CLI manages SiteGPT; it does not itself understand websites. If no web tools are available, create a conservative chatbot, ingest the sitemap/website, and tell the user deeper brand-specific customization needs website inspection.

## End-To-End Website Setup

For requests like "Create a chatbot for https://example.com", first read
[playbooks/create-chatbot-from-website.md](playbooks/create-chatbot-from-website.md)
to choose the path. Then use the path-specific playbook:

- No account / try-before-signup:
  [playbooks/agent-first-onboarding-chatbot.md](playbooks/agent-first-onboarding-chatbot.md).
- Existing SiteGPT account:
  [playbooks/account-chatbot-setup.md](playbooks/account-chatbot-setup.md).

Both playbooks cover knowledge, brand settings, persona, instructions, starters,
followups, verification, and handoff, but the onboarding path optimizes for a
polished preview before signup while the account path protects existing
production account state.

Short path for no-account onboarding:

```bash
sitegpt onboarding start https://example.com --json
SITEGPT_API_TOKEN="<temporary-token>" sitegpt knowledge sitemap add --chatbot <chatbot-id> https://example.com/sitemap.xml --only-main-content true --json
SITEGPT_API_TOKEN="<temporary-token>" sitegpt onboarding status <workspace-id> --json
```

Short path for an existing account:

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

- Agent-first onboarding for users without a SiteGPT account yet: [commands/onboarding.md](commands/onboarding.md).
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
