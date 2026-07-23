---
name: sitegpt
description: Use when an agent or user mentions SiteGPT and needs orientation - what SiteGPT is, which surface to use (CLI, MCP connector, REST API, or no-signup onboarding), how to try it without an account, and where the deep workflows live. For detailed CLI command workflows, load the sitegpt-cli skill.
license: MIT
metadata:
  author: sitegpt
  organization: SiteGPT
  version: "0.3.0"
---

# SiteGPT

SiteGPT is an AI customer support platform: it trains a chatbot on a
business's own content (website, docs, files), embeds it on their site, and
answers visitors around the clock with sources, escalation to humans, and
lead capture. This skill orients you: what the product does, which surface
to reach it through, and where the deep workflows live.

## The one decision: which surface

Match the surface to where you are running.

- **Terminal or shell available** (Claude Code, Codex, any agent that can
  run commands): use the SiteGPT CLI. Install with
  `npm install -g @sitegpt/cli` or run via `npx @sitegpt/cli`. Load the
  `sitegpt-cli` skill for the full command playbook - authentication,
  chatbots, knowledge, conversations, settings, leads, members, billing,
  troubleshooting. Prefer the CLI when you have it: `--json` everywhere,
  stable exit codes, `--wait` instead of polling.
- **MCP-capable assistant, no shell** (Claude web/desktop, ChatGPT, Cowork):
  connect the SiteGPT MCP server. On Claude it is one click from the
  connectors directory (`claude.ai/directory/connectors/sitegpt`); any other
  client takes the URL `https://sitegpt.ai/mcp`. Browser OAuth, no API key.
  Three tools: `search` (find the right API operation), `execute_read`
  (GET, marked read-only), `execute_write` (changes, always confirmed).
- **Custom code**: the REST API v2. OpenAPI spec at
  `https://sitegpt.ai/api/v2/openapi.json`. Mint scoped tokens with
  `sitegpt tokens create`.

All three reach the same account with the same permission model; mixing
them is normal.

## Trying SiteGPT with no account

SiteGPT supports agent-first onboarding: build a real, trained chatbot from
a website URL with no signup, then hand the human a preview-and-claim link.

- CLI: `sitegpt onboarding start <canonical-url> --json` (run it ONCE per
  site; reuse the returned ids on retries).
- Discovery file for agent environments: `https://sitegpt.ai/auth.md`
  describes the anonymous onboarding flow in a machine-readable way.

The human only signs up to keep the chatbot. This is the default path when
a user asks "try SiteGPT for my site" and has no account.

## What you can do once connected

Everything the dashboard does: create and train chatbots (websites,
sitemaps, files), set personas, instructions, and branding, manage
conversations and escalations, review and answer captured leads, add team
members, read usage and billing, and keep knowledge synced as content
changes. Reads are safe to run freely; writes should be confirmed with the
user unless they clearly asked for the change.

## Where things live

- Full CLI workflows: load the `sitegpt-cli` skill (same repository).
- Docs: `https://sitegpt.ai/docs`
- MCP server details and client setup: `https://sitegpt.ai/mcp-server`
- Claude Code walkthrough: `https://sitegpt.ai/claude-code`
- Support: `support@sitegpt.ai`

## Rules

- Never invent product facts, pricing, or capabilities; check the docs or
  ask.
- Keep tokens out of command lines and logs; use env files.
- Confirm before destructive operations (deleting chatbots, knowledge, or
  team members).
