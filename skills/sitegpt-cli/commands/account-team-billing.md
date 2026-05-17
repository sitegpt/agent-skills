# Account, Team, Usage, And Billing

Use this reference for account profile, members, invites, usage, limits, subscription, and invoices.

## Account Profile

Account profile commands manage the authenticated user's SiteGPT profile. They do not manage chatbot settings.

```bash
sitegpt account show
sitegpt account show --json
sitegpt account update --name "New Name"
sitegpt account picture upload ./avatar.png
sitegpt account picture delete --yes
```

## Members And Invites

Members and invites manage chatbot team access.

```bash
sitegpt members list --chatbot <chatbot-id>
sitegpt members invite --chatbot <chatbot-id> person@example.com --role AGENT
sitegpt members remove --chatbot <chatbot-id> <user-id> --yes
sitegpt member-invites list --chatbot <chatbot-id>
sitegpt member-invites cancel --chatbot <chatbot-id> <invite-id> --yes
```

Common member roles: `AGENT`, `MANAGER`, `ADMIN`, `SUPER_ADMIN`.

## Usage, Limits, And Billing

These commands show account-level usage, limits, subscription, and invoice details.

```bash
sitegpt usage
sitegpt usage --json
sitegpt limits
sitegpt limits --json
sitegpt billing subscription
sitegpt billing subscription --json
sitegpt billing invoices
sitegpt billing invoices --json
```

`billing invoices` lists invoices, amounts, currencies, and links when available.
