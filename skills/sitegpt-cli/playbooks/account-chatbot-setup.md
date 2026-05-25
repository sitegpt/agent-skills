---
title: Existing Account Chatbot Setup
impact: HIGH
impactDescription: Create or update a SiteGPT chatbot inside an authenticated SiteGPT account.
tags: account, chatbot, website, sitemap, knowledge, persona, instructions, settings
---

# Existing Account Chatbot Setup

Use this playbook when the human provides a SiteGPT token/profile, says they
already use SiteGPT, or asks to create/update a chatbot inside their current
account.

The goal is to configure a production account safely. Read existing state before
overwriting behavior.

## 1. Verify Account Context

```bash
sitegpt whoami --json
```

If unauthenticated:

```bash
sitegpt login
```

If the user mentions a named environment or account:

```bash
sitegpt profiles list
sitegpt profiles use <profile>
```

## 2. Clarify Purpose And Scope

Before configuring, know whether this is:

- A new chatbot in the account.
- An update to an existing chatbot.
- A full rebuild.
- A narrow change, such as adding knowledge or updating instructions.

Ask or infer purpose:

```text
What should this SiteGPT chatbot optimize for: customer support, marketing/site
guide, lead generation, docs/help, onboarding, or a mix?
```

For an existing chatbot, list before mutating:

```bash
sitegpt chatbots list --json
sitegpt chatbots get <chatbot-id> --json
```

## 3. Create Or Select The Chatbot

For a new chatbot:

```bash
sitegpt chatbots create "<Brand> Support" \
  --description "Answers questions about <Brand> products, pricing, docs, and support." \
  --json
```

For an existing chatbot, use the provided or discovered `<chatbot-id>`. Do not
create a duplicate unless the user asked for a new chatbot.

## 4. Inspect The Website

Use raw HTML for structured signals and browser/fetch tools for prose. Capture
brand/product name, value proposition, important URLs, support/sales email,
sitemap, tone, brand colors, and icons.

Do not invent company facts, pricing, policies, emails, or guarantees.

## 5. Add Or Update Knowledge Carefully

For a new chatbot, add the best source, usually sitemap:

```bash
sitegpt knowledge sitemap add \
  --chatbot <chatbot-id> \
  https://example.com/sitemap.xml \
  --only-main-content true \
  --json
```

For an existing chatbot, list current knowledge first:

```bash
sitegpt knowledge documents list --chatbot <chatbot-id> --json
sitegpt knowledge sync-jobs list --chatbot <chatbot-id> --json
```

Then add missing sources. Do not delete, disable, resync all, or bulk update
existing knowledge unless the user asked.

Plan-gated sync/scan frequencies may be downgraded by the API. Surface warnings
to the user.

## 6. Update Brand Settings Safely

For a new chatbot, apply extracted brand colors and upload icons.

```bash
sitegpt settings appearance update \
  --chatbot <chatbot-id> \
  --title "<Brand> Support" \
  --welcome "Hi! I can help with <Brand> questions." \
  --placeholder "Ask about <Brand>..." \
  --brand-color "#0F766E" \
  --brand-text-color "#FFFFFF" \
  --link-color "#0F766E" \
  --icon-position RIGHT
```

For an existing chatbot, read current settings before changing them:

```bash
sitegpt settings appearance get --chatbot <chatbot-id> --json
sitegpt settings general get --chatbot <chatbot-id> --json
```

Preserve existing brand choices unless the user asked for a refresh.

Upload local image files only:

```bash
sitegpt icons upload --chatbot <chatbot-id> bot /tmp/sitegpt-logo.png
sitegpt icons upload --chatbot <chatbot-id> chat-bubble /tmp/sitegpt-logo.png
```

## 7. Configure Persona Without Clobbering Existing Behavior

For a new chatbot, create and activate one strong default persona:

```bash
sitegpt personas add --chatbot <chatbot-id> --title "<Brand> support specialist" --file /tmp/sitegpt-persona.md --json
sitegpt personas use --chatbot <chatbot-id> <persona-id>
```

For an existing chatbot, list current personas first:

```bash
sitegpt personas list --chatbot <chatbot-id> --json
```

Add a new persona or update only with approval. Do not silently replace a
carefully tuned production persona.

## 8. Configure Instructions Deliberately

For a new chatbot:

```bash
sitegpt instructions add \
  --chatbot <chatbot-id> \
  --title "Grounded <Brand> assistant" \
  --file /tmp/sitegpt-instructions.md \
  --temperature 0.3 \
  --json
sitegpt instructions use --chatbot <chatbot-id> <instruction-id>
```

For an existing chatbot:

```bash
sitegpt instructions list --chatbot <chatbot-id> --json
```

Preserve active instructions unless the task is to improve or replace them.

## 9. Add Or Refine Starters And Followups

For a new chatbot, add 3-5 visitor-focused starters and followups.

```bash
sitegpt starters add --chatbot <chatbot-id> --title "What does <Brand> do?" --message "What does <Brand> do?" --json
sitegpt starters add --chatbot <chatbot-id> --title "Pricing" --message "Tell me about pricing and plans." --json
sitegpt followups add --chatbot <chatbot-id> --title "Contact support" --message "How can I contact support?" --json
```

For an existing chatbot, list current prompts first:

```bash
sitegpt starters list --chatbot <chatbot-id> --json
sitegpt followups list --chatbot <chatbot-id> --json
```

Add missing prompts or improve stale ones. Do not remove existing prompts without
approval.

## 10. Configure Lead And Support Settings With Care

For lead generation:

```bash
sitegpt settings lead-form update \
  --chatbot <chatbot-id> \
  --enabled true \
  --collect-name true \
  --collect-email true \
  --notification-email sales@example.com
```

For customer support:

```bash
sitegpt settings general update \
  --chatbot <chatbot-id> \
  --support-email support@example.com
```

For existing chatbots, read current lead/human-support settings before changing
routing or notification emails.

## 11. Verify And Handoff

```bash
sitegpt chatbots get <chatbot-id> --json
sitegpt knowledge documents list --chatbot <chatbot-id> --json
sitegpt personas list --chatbot <chatbot-id> --json
sitegpt instructions list --chatbot <chatbot-id> --json
sitegpt starters list --chatbot <chatbot-id> --json
sitegpt followups list --chatbot <chatbot-id> --json
sitegpt dashboard --chatbot <chatbot-id>
```

Test with realistic visitor messages:

```bash
sitegpt messages send --chatbot <chatbot-id> "What does this company do?" --json
sitegpt messages send --chatbot <chatbot-id> "How much does it cost?" --json
sitegpt messages send --chatbot <chatbot-id> "How can I contact support?" --json
```

Final report should include chatbot ID, dashboard link, knowledge sources,
persona/instructions changes, starters/followups, settings/icons, warnings, and
install snippet if requested.
