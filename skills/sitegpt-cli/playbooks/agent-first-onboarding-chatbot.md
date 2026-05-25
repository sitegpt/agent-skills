---
title: Agent-First Onboarding Chatbot
impact: HIGH
impactDescription: Build a polished SiteGPT chatbot preview before the human creates or signs into a SiteGPT account.
tags: onboarding, chatbot, website, sitemap, knowledge, persona, instructions, settings
---

# Agent-First Onboarding Chatbot

Use this playbook when the human does not have a SiteGPT account, did not provide
a SiteGPT token/profile, or asks to try SiteGPT from a website URL.

The goal is to create value before signup: build, brand, train, and test a
temporary chatbot, then share the onboarding URL where the human can preview and
claim it.

## 1. Start Without Login

Do not require `sitegpt whoami` or `sitegpt login` before this flow.
`PROFILE_NOT_CONFIGURED` is expected and is not a blocker.

```bash
sitegpt onboarding start https://example.com --agent-name "<agent-name>" --json
```

Capture:

- `data.workspace.id` as `<workspace-id>`.
- `data.workspace.chatbotId` as `<chatbot-id>`.
- `data.apiToken` as `<temporary-token>`.
- `data.onboardingUrl` as the single human-facing preview and claim URL.

For every setup command after `onboarding start`, pass the temporary token:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt chatbots get <chatbot-id> --json
```

Do not print the full temporary token in final output.

## 2. Clarify Purpose And Inspect The Website

Before configuring, know what job the chatbot should do. If the user did not
say, ask:

```text
What should this SiteGPT chatbot optimize for: customer support, marketing/site
guide, lead generation, docs/help, onboarding, or a mix?
```

If the user is unavailable and you should proceed, infer the purpose from the
prompt and website, then state the assumption in the final report.

Inspect the website with raw HTML for structured signals and browser/fetch tools
for prose. Capture brand name, value proposition, important URLs, contact email,
sitemap, tone, colors, icons, and product language.

## 3. Add Knowledge For A Strong First Preview

Prefer sitemap ingestion. It usually gives the cleanest coverage.

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt knowledge sitemap add \
  --chatbot <chatbot-id> \
  https://example.com/sitemap.xml \
  --only-main-content true \
  --json
```

If no sitemap exists, crawl the website:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt knowledge website add \
  --chatbot <chatbot-id> \
  https://example.com \
  --depth 3 \
  --max-links 100 \
  --only-main-content true \
  --json
```

If only specific pages matter, add selected links:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt knowledge links add \
  --chatbot <chatbot-id> \
  https://example.com/pricing \
  https://example.com/docs \
  https://example.com/contact \
  --only-main-content true \
  --json
```

## 4. Configure Brand Settings Before Sharing

The preview should feel like the user's website immediately.

Use raw HTML/CSS/manifest signals for colors and icons. Download remote icons to
local files before upload.

```bash
curl -sL https://example.com/logo-icon.png -o /tmp/sitegpt-logo.png
file /tmp/sitegpt-logo.png
```

Upload a clean icon when available:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt icons upload --chatbot <chatbot-id> bot /tmp/sitegpt-logo.png
SITEGPT_API_TOKEN="<temporary-token>" sitegpt icons upload --chatbot <chatbot-id> chat-bubble /tmp/sitegpt-logo.png
```

Apply appearance:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt settings appearance update \
  --chatbot <chatbot-id> \
  --title "<Brand> Support" \
  --welcome "Hi! I can help with <Brand> questions." \
  --placeholder "Ask about <Brand>..." \
  --brand-color "#0F766E" \
  --brand-text-color "#FFFFFF" \
  --link-color "#0F766E" \
  --icon-shape CIRCLE \
  --icon-position RIGHT
```

## 5. Create One Strong Persona

Create a single default persona that matches the purpose:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt personas add \
  --chatbot <chatbot-id> \
  --title "<Brand> support specialist" \
  --file /tmp/sitegpt-persona.md \
  --json
SITEGPT_API_TOKEN="<temporary-token>" sitegpt personas use --chatbot <chatbot-id> <persona-id>
```

For customer support, emphasize accuracy, friendly escalation, and clear next
steps. For marketing/lead generation, emphasize concise product explanation,
qualification, and conversion-safe CTAs. For docs/help, emphasize grounded,
source-based answers and careful unknowns.

## 6. Create One Active Instruction Set

Instructions should cover grounding, uncertainty, escalation/contact behavior,
and purpose-specific rules.

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt instructions add \
  --chatbot <chatbot-id> \
  --title "Grounded <Brand> assistant" \
  --file /tmp/sitegpt-instructions.md \
  --temperature 0.3 \
  --json
SITEGPT_API_TOKEN="<temporary-token>" sitegpt instructions use --chatbot <chatbot-id> <instruction-id>
```

Strong defaults:

- Use SiteGPT knowledge first.
- Do not invent prices, policies, legal terms, availability, or integrations.
- Say when the knowledge does not contain the answer.
- Offer the visible support/sales contact when relevant.
- Keep answers concise and practical.
- Ask a clarifying question when needed.

## 7. Add Starters And Followups For Easy Testing

Use prompts a visitor would naturally click.

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt starters add --chatbot <chatbot-id> --title "What does <Brand> do?" --message "What does <Brand> do?" --json
SITEGPT_API_TOKEN="<temporary-token>" sitegpt starters add --chatbot <chatbot-id> --title "Pricing" --message "Tell me about pricing and plans." --json
SITEGPT_API_TOKEN="<temporary-token>" sitegpt starters add --chatbot <chatbot-id> --title "Getting started" --message "How do I get started?" --json
SITEGPT_API_TOKEN="<temporary-token>" sitegpt followups add --chatbot <chatbot-id> --title "Contact support" --message "How can I contact support?" --json
SITEGPT_API_TOKEN="<temporary-token>" sitegpt followups add --chatbot <chatbot-id> --title "Compare options" --message "Can you help me choose the right option?" --json
```

For lead generation, include qualification and contact next steps. For docs/help,
include docs, troubleshooting, and setup prompts.

## 8. Configure Lead Or Support Settings Only When Useful

If the purpose is lead generation and the site/user provides a sales email:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt settings lead-form update \
  --chatbot <chatbot-id> \
  --enabled true \
  --collect-name true \
  --collect-email true \
  --notification-email sales@example.com
```

If the purpose is customer support and the site/user provides a support email:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt settings general update \
  --chatbot <chatbot-id> \
  --support-email support@example.com
```

## 9. Verify With Checklist And Test Messages

Check setup checklist:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt onboarding status <workspace-id> --json
```

Fix `PENDING`, `WARNING`, or `UNKNOWN` checklist items when possible.

Test realistic visitor questions:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt messages send --chatbot <chatbot-id> "What does this company do?" --json
SITEGPT_API_TOKEN="<temporary-token>" sitegpt messages send --chatbot <chatbot-id> "How much does it cost?" --json
SITEGPT_API_TOKEN="<temporary-token>" sitegpt messages send --chatbot <chatbot-id> "How can I contact support?" --json
```

## 10. Share And Claim

Share `data.onboardingUrl` only after the chatbot is useful. If the human wants
to claim, ask for email, plan, and interval:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt onboarding claim <workspace-id> \
  --email user@example.com \
  --plan GROWTH \
  --interval MONTH \
  --json
```

If `data.checkoutUrl` is present, give it to the human. If the email already has
an active subscription, ask the human to open the onboarding URL while signed in
and claim there.

If the setup is wrong or the human does not want it:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt onboarding delete <workspace-id> --yes
```
