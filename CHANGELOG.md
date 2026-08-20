# 0.4.0 (2026-08-20)

- Packaged as a Cursor plugin (`.cursor-plugin/` + `mcp.json`): skills plus
  the remote MCP server (`https://sitegpt.ai/mcp`, browser OAuth) install
  together via Cursor's marketplace or `/add-plugin`.
- Repo now triple-packaged: Agent Skills standard, Claude Code/Cowork
  plugin, Cursor plugin. Skill content unchanged.

# 0.3.0 (2026-07-23)

- New `sitegpt` orientation skill: what SiteGPT is, which surface to use
  (CLI, MCP connector, REST API, no-signup onboarding), where the deep
  workflows live. Terminal work routes to `sitegpt-cli`.
- Repository dual-packaged as a Claude Code / Cowork plugin
  (`.claude-plugin/`): `/plugin marketplace add sitegpt/agent-skills`,
  then `/plugin install sitegpt@sitegpt`.

# Changelog

## 0.2.1 - 2026-06-02

- Documented chatbot ownership transfer (`sitegpt chatbots transfer`) and direct member add (`sitegpt members add`) in the CLI command reference. Both are also available in the v2 API and MCP.

## 0.2.0 - 2026-05-30

- Consolidated the `sitegpt-cli` skill into a single self-contained `SKILL.md` (the sitegpt repo's published skill is now the one source of truth), removing the separate `playbooks/` and `commands/` files that had drifted from it.
- Rewrote the workflow around an explicit discovery brief, an account-flow question asked up front, translate-the-brief-into-config guidance, irreversible-delete confirmation, and `knowledge wait` / `--dry-run` / structured-error usage.
- Raised the `SKILL.md` line limit in the validator from 500 to 1000 to allow the consolidated single-file skill.

## 0.1.2 - 2026-05-25

- Clarified when agents should use agent-first onboarding versus an authenticated SiteGPT account.
- Added guidance that `PROFILE_NOT_CONFIGURED` should not block no-account onboarding.
- Added purpose-first chatbot setup guidance for customer support, marketing, lead generation, docs/help, onboarding, and mixed-use bots.
- Added a warning to avoid batching optional auth checks with required website inspection.
- Split website chatbot setup into explicit agent-first onboarding and existing-account playbooks.

## 0.1.1 - 2026-05-17

Initial public SiteGPT agent skills release.

- Added the `sitegpt-cli` skill.
- Added command references for authentication, chatbots, knowledge, sources, customization, settings, conversations, account/team/billing, tokens, and troubleshooting.
- Added the create-chatbot-from-website playbook.
- Added local skill validation.
