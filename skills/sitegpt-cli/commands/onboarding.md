# Agent-First Onboarding

Use this reference when a human does not have a SiteGPT account yet, or asks an
agent to try SiteGPT from a website URL before signup.

Onboarding creates a temporary one-chatbot workspace. The agent configures and
tests that chatbot with a temporary token, then shares one onboarding URL where
the human can preview and claim it.

Agents that support Auth.md-style discovery can start from
`https://sitegpt.ai/auth.md`. When a terminal is available, prefer the CLI
commands below because they provide contextual help, JSON output, and the full
SiteGPT setup surface.

## Commands

```bash
sitegpt onboarding start <website-url>
sitegpt onboarding start <website-url> --agent-name <name> --agent-client-id <client-id> --json
SITEGPT_API_TOKEN=<temporary-token> sitegpt onboarding status <workspace-id>
SITEGPT_API_TOKEN=<temporary-token> sitegpt onboarding status <workspace-id> --json
SITEGPT_API_TOKEN=<temporary-token> sitegpt onboarding claim <workspace-id> --email user@example.com --plan GROWTH --interval MONTH
SITEGPT_API_TOKEN=<temporary-token> sitegpt onboarding delete <workspace-id> --yes
```

Command notes:

- `onboarding start`: public command. It does not require login and returns the
  temporary workspace, chatbot ID, temporary token, onboarding URL, status URL,
  and expiry.
- `onboarding status`: requires the temporary token or a profile containing that
  token. It returns workspace state, claim state, links, and setup checklist.
- `onboarding claim`: starts claim for a chosen email, plan, and interval. For
  new customers it returns a SiteGPT checkout URL. Existing subscribers should
  open the onboarding URL while signed in and claim from the page.
- `onboarding delete`: deletes an unclaimed workspace and revokes its temporary
  token. It requires `--yes`.

## Claim Options

Plans:

- `STARTER`
- `GROWTH`
- `SCALE`

Intervals:

- `MONTH`
- `YEAR`

## Setup Checklist

`sitegpt onboarding status --json` includes `data.setupChecklist`. Use it before
sharing the onboarding URL.

Checklist items cover:

- Knowledge documents.
- Persona.
- Instructions.
- Conversation starters.
- Follow-up prompts.
- Brand styling.

States:

- `DONE`: acceptable.
- `PENDING`: should be configured before sharing if possible.
- `WARNING`: usable but needs review.
- `UNKNOWN`: the API could not confirm the item; inspect manually.

## Recommended Flow

1. Start onboarding:
   ```bash
   sitegpt onboarding start https://example.com --json
   ```
2. Use `data.workspace.chatbotId` as `<chatbot-id>` and `data.apiToken` as the
   temporary token.
3. Configure knowledge, persona, instructions, starters, followups, settings,
   and icons with normal SiteGPT commands, always passing the temporary token:
   ```bash
   SITEGPT_API_TOKEN=<temporary-token> sitegpt knowledge sitemap add --chatbot <chatbot-id> https://example.com/sitemap.xml --json
   ```
4. Check status:
   ```bash
   SITEGPT_API_TOKEN=<temporary-token> sitegpt onboarding status <workspace-id> --json
   ```
5. Test the chatbot with realistic visitor questions.
6. Share `data.onboardingUrl` only after setup is useful.
7. If the user wants to claim, ask for email, plan, and interval, then run
   `onboarding claim`.

## Important Behavior

- The temporary token is scoped only to the onboarding chatbot.
- When the human claims the chatbot, SiteGPT transfers that token to the claimed
  user instead of revoking it. It remains scoped only to the chatbot and keeps
  its original expiry.
- Temporary onboarding tokens expire automatically. Deleted onboarding workspaces revoke the temporary token immediately.
- Do not ask the human to log in before a working preview exists unless they
  explicitly want to manage an existing SiteGPT account.
