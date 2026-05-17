# Tokens And Scopes

Use this reference for scoped API tokens, token rotation, revocation, and common scopes.

Newly created or rotated tokens are shown once. Store them immediately and do not print full token values in final answers.

```bash
sitegpt tokens list
sitegpt tokens list --json
sitegpt tokens list --include-revoked --json
sitegpt tokens create --name "Knowledge agent" --scope account:read --scope chatbots:read --scope knowledge:read
sitegpt tokens create --name "Knowledge writer" --scope account:read --scope chatbots:read --scope knowledge:read --scope knowledge:write
sitegpt tokens create --name "One bot" --chatbot <chatbot-id> --scope knowledge:read
sitegpt tokens rotate <token-id>
sitegpt tokens revoke <token-id> --yes
```

Token options:

- `--name <name>`: human-readable token name.
- `--scope <scope>`: requested scope; repeatable.
- `--chatbot <id>`: restricts token to selected chatbots; repeatable.
- `--expires-in-days <days>`: token lifetime where supported.

Common scopes:

- Account: `account:read`, `account:write`
- Tokens: `tokens:read`, `tokens:write`
- Chatbots: `chatbots:read`, `chatbots:write`, `chatbots:delete`
- Knowledge: `knowledge:read`, `knowledge:write`, `knowledge:delete`
- Personas: `personas:read`, `personas:write`, `personas:delete`
- Instructions: `instructions:read`, `instructions:write`, `instructions:delete`
- Settings: `settings:read`, `settings:write`
- Starters: `starters:read`, `starters:write`, `starters:delete`
- Followups: `followups:read`, `followups:write`, `followups:delete`
- Conversations: `conversations:read`, `conversations:write`, `conversations:delete`
- Leads: `leads:read`, `leads:write`, `leads:delete`
- Members: `members:read`, `members:write`, `members:delete`
- Billing: `billing:read`

Some SiteGPT deployments may expose additional plan-gated or admin-gated scopes. Run `sitegpt tokens create --help` for the complete scope list accepted by the installed CLI.

If a scope fails, run:

```bash
sitegpt tokens create --help
sitegpt login --help
```
