---
title: Create A SiteGPT Chatbot From A Website
impact: HIGH
impactDescription: End-to-end workflow for creating a branded, useful SiteGPT chatbot from a public website.
tags: chatbot, website, sitemap, knowledge, icons, persona, instructions, settings
---

# Create A Chatbot From A Website

Use this workflow when the user asks something like "Create a chatbot for https://example.com" or "Set up SiteGPT for this site."

First choose the correct delivery path before running authentication checks:

- **No SiteGPT account/token/profile yet, or the user wants to try SiteGPT
  before signup**: use agent-first onboarding. Start from the website URL,
  configure a temporary chatbot, test it, then share the onboarding URL for the
  human to preview and claim. `PROFILE_NOT_CONFIGURED` is expected and should
  not stop this flow.
- **Existing SiteGPT account/token/profile, or the user wants changes inside an
  existing account**: verify authentication and create/manage the chatbot
  directly in the account.

If a new customer explicitly wants to log in first and create their first
chatbot directly in their account, use the account path. Otherwise prefer
onboarding so the user sees a working chatbot before signup.

## 1. Inspect The Website

Use raw HTML (`curl` + search) for structured signals like colors, icons, manifests, and sitemap links. Use WebFetch/browser tools for prose-heavy understanding like value proposition, navigation, audience, and tone.

Before creating the chatbot, identify the purpose. If the user did not say, ask
one concise question:

```text
What should this SiteGPT chatbot optimize for: customer support, marketing/site
guide, lead generation, docs/help, onboarding, or a mix?
```

If the user is unavailable and you should proceed, infer the purpose from the
prompt and website, then state the assumption in the final report.

Gather:

- Brand or product name.
- Homepage title, meta description, and core value proposition.
- Main navigation labels and important URLs.
- Docs, pricing, contact, support, FAQ, blog, terms, privacy, and login URLs when visible.
- Support email, sales email, phone number, or contact form URL if published.
- Logo, favicon, or simple brand mark that can be saved as an image file.
- Brand colors from the raw HTML extraction procedure below.
- Open Graph/Twitter images, app icons, and product screenshots that can inform the chatbot's visual setup.
- Sitemap URLs from `robots.txt`, `<link rel="sitemap">`, `/sitemap.xml`, `/sitemap_index.xml`, or obvious CMS sitemap paths.
- Tone: formal, friendly, technical, playful, enterprise, healthcare/legal cautious, etc.

Do not invent company facts, pricing, policies, emails, or guarantees. If something is not visible, configure the chatbot to say it does not know and offer escalation/contact.

## 2. Extract Structural Signals From Raw HTML

Summarizing tools often strip or blur exact metadata such as hex colors, icon links, manifests, and sitemap links. Do not trust qualitative output like "appears to be blue-based" for appearance setup. Always inspect raw HTML before choosing brand colors or icons.

```bash
SITE_URL="https://example.com"
curl -sL "$SITE_URL" -o /tmp/sitegpt-page.html

grep -oE '#[0-9a-fA-F]{6}\b' /tmp/sitegpt-page.html \
  | sort | uniq -c | sort -rn | head -30

grep -iE 'theme-color|apple-touch-icon|rel="icon|manifest|og:image|twitter:image|sitemap' /tmp/sitegpt-page.html
curl -sL "$SITE_URL/robots.txt"
curl -I "$SITE_URL/sitemap.xml"
curl -I "$SITE_URL/sitemap_index.xml"
```

If a manifest is linked, fetch it and inspect colors/icons:

```bash
curl -sL "$SITE_URL/manifest.json"
```

Download the chosen icon or image to a local file and confirm format/dimensions before upload:

```bash
curl -sL "https://example.com/logo-icon.png" -o /tmp/sitegpt-brand-icon.png
file /tmp/sitegpt-brand-icon.png
```

Prefer assets in this order:

1. `apple-touch-icon` or large app icon.
2. Manifest icon with square dimensions.
3. Clean logo mark or favicon PNG/SVG converted to PNG.
4. Open Graph/Twitter image only if it contains a clear brand mark and can be cropped.

Only fall back to visual guesses or WebFetch's qualitative color description when raw HTML, CSS-visible variables, manifest, theme-color, and icon links provide no usable signal. If you pick a generic default such as `#2563EB`, treat that as a warning and re-check raw HTML before proceeding.

## 3. Draft A Chatbot Blueprint

Before mutating SiteGPT, decide:

- Primary purpose(s): customer support, marketing site guide, lead generation,
  sales qualification, docs/help, onboarding, or a mix.
- Chatbot title, usually `<Brand/Product> Support`.
- Chatbot description, one sentence about what it helps with.
- Best knowledge source: sitemap first, website crawl second, selected links third.
- Persona: the bot's role and voice.
- Instructions: grounding, uncertainty, escalation, privacy, lead capture, and forbidden behavior.
- Starter prompts: 3-5 first-click questions a visitor would naturally ask.
- Followup prompts: 3-5 useful next actions, including contact/support when appropriate.
- Settings: chat mode, support email, lead form/human support if appropriate, and appearance/icon updates.
- Brand assets: primary color, readable brand text color, link color, icon background, and local icon file paths.

## 4. Start The Right Workspace

### Agent-First Onboarding, No Account Yet

Start onboarding without asking the human to log in:

```bash
sitegpt onboarding start https://example.com --agent-name "<agent-name>" --json
```

Capture:

- `data.workspace.id` as `<workspace-id>`.
- `data.workspace.chatbotId` as `<chatbot-id>`.
- `data.apiToken` as the temporary setup token.
- `data.onboardingUrl` as the single human-facing preview and claim URL.

For every setup command after `onboarding start`, use the temporary token:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt chatbots get <chatbot-id> --json
```

Check readiness after major setup steps:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt onboarding status <workspace-id> --json
```

Inspect `data.setupChecklist`. Fix `PENDING`, `WARNING`, or `UNKNOWN` items when possible before sharing the onboarding URL.

After setup and testing, ask the human whether they want to claim the chatbot. If yes, ask for email, plan, and interval:

- Plan: `STARTER`, `GROWTH`, or `SCALE`.
- Interval: `MONTH` or `YEAR`.

Then create the claim:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt onboarding claim <workspace-id> --email user@example.com --plan GROWTH --interval MONTH --json
```

If `data.checkoutUrl` is present, return it. New customers complete checkout from SiteGPT's pricing page. If the email already has an active SiteGPT subscription, ask the human to open the onboarding URL while signed in and claim there so SiteGPT can attach the chatbot directly when quota is available.

If the setup is wrong or the human does not want it, delete the unclaimed workspace:

```bash
SITEGPT_API_TOKEN="<temporary-token>" sitegpt onboarding delete <workspace-id> --yes
```

After claim, the temporary token is transferred to the claimed user. It remains scoped only to that chatbot and keeps its original expiry, so the agent can continue final setup unless the user asks it to stop.

### Existing Account

For an existing account, verify auth first:

```bash
sitegpt whoami --json
```

If unauthenticated, run:

```bash
sitegpt login
```

Then create the chatbot directly in the account.

## 5. Create The Chatbot

Always request JSON so you can capture the ID:

```bash
sitegpt chatbots create "<Brand> Support" --description "<short description>" --json
```

Extract `chatbot.id` from the JSON response and use it for all following commands.

Skip this step for agent-first onboarding because `onboarding start` already created the temporary chatbot and returned `<chatbot-id>`.

## 6. Add Knowledge

Prefer sitemap ingestion when a sitemap is available:

```bash
sitegpt knowledge sitemap add --chatbot <chatbot-id> https://example.com/sitemap.xml --only-main-content true --json
```

If no sitemap is available, crawl the website:

```bash
sitegpt knowledge website add --chatbot <chatbot-id> https://example.com --depth 3 --max-links 100 --only-main-content true --json
```

If only a few relevant pages are discovered, add explicit links:

```bash
sitegpt knowledge links add --chatbot <chatbot-id> https://example.com/pricing https://example.com/docs --only-main-content true --json
```

Plan-gated sync/scan frequencies may be downgraded by the API. Surface warnings to the user.

## 7. Configure Persona And Instructions

Create temporary markdown files for persona and instructions, then add and activate them:

```bash
sitegpt personas add --chatbot <chatbot-id> --title "<Brand> support specialist" --file ./persona.md --json
sitegpt personas use --chatbot <chatbot-id> <persona-id>
sitegpt instructions add --chatbot <chatbot-id> --file ./instructions.md --temperature 0.3 --json
sitegpt instructions use --chatbot <chatbot-id> <instruction-id>
```

Persona should be short and identity-focused. Instructions should be operational and safety-focused. Strong defaults:

- Answer as the brand's helpful support assistant.
- Use only the chatbot's knowledge and visible website facts gathered during setup.
- Do not invent pricing, policies, legal terms, medical claims, availability, or integrations.
- If unsure, say what is known and suggest contacting support.
- Ask concise clarifying questions when the user's request is ambiguous.
- Keep answers practical and skimmable.
- Escalate or collect contact details when the user needs human help.

## 8. Add Starters And Followups

Create prompts that match the site's actual product and common visitor intent:

```bash
sitegpt starters add --chatbot <chatbot-id> --title "What does <Brand> do?" --message "Explain what <Brand> does and who it is for." --json
sitegpt starters add --chatbot <chatbot-id> --title "Pricing" --message "Tell me about pricing, plans, and what is included." --json
sitegpt starters add --chatbot <chatbot-id> --title "Getting started" --message "How do I get started with <Brand>?" --json
sitegpt followups add --chatbot <chatbot-id> --title "Contact support" --message "How can I contact support or sales?" --json
sitegpt followups add --chatbot <chatbot-id> --title "Show docs" --message "Point me to the most relevant documentation." --json
```

Use link-type followups when a high-confidence URL exists:

```bash
sitegpt followups add --chatbot <chatbot-id> --title "Open docs" --link https://example.com/docs --type LINK --json
```

## 9. Apply Settings And Icons

Use precise section commands where possible:

```bash
sitegpt settings chat-mode set --chatbot <chatbot-id> AI
sitegpt settings general update --chatbot <chatbot-id> --support-email support@example.com
sitegpt settings appearance update --chatbot <chatbot-id> --brand-color "#0F766E" --brand-text-color "#FFFFFF" --icon-background-color "#0F766E" --link-color "#0F766E" --icon-shape CIRCLE --icon-position RIGHT
sitegpt settings lead-form update --chatbot <chatbot-id> --enabled true --collect-name true
```

Only set support email or lead/human-support settings when the site or user provides the right details. Read section help before using unfamiliar flags:

```bash
sitegpt settings general --help
sitegpt settings appearance --help
sitegpt settings lead-form --help
sitegpt settings human-support --help
```

If you have saved a logo/favicon/bot image locally, upload it:

```bash
sitegpt icons upload --chatbot <chatbot-id> bot ./brand-icon.png
sitegpt icons upload --chatbot <chatbot-id> chat-bubble ./brand-icon.png
```

Use clean raster image files. Do not hotlink remote image URLs directly to icon commands. If icon upload fails because the asset is too large or the format is unsupported, convert it to a small PNG and retry.

## 10. Parallelize Safely

After the chatbot ID is known, independent tasks can run in parallel:

- Knowledge ingestion.
- Persona creation.
- Instruction creation.
- Starter creation.
- Followup creation.
- Icon upload.
- Appearance settings.
- Independent settings section updates.

Do not parallelize tasks that depend on returned IDs, such as `personas use` before `personas add` returns, or `instructions use` before `instructions add` returns. Avoid running multiple updates against the same settings section at the same time if they might overwrite each other.

## 11. Verify The Setup

Check the final state:

```bash
sitegpt chatbots get <chatbot-id> --json
sitegpt knowledge documents list --chatbot <chatbot-id> --json
sitegpt knowledge documents stats --chatbot <chatbot-id> --json
sitegpt personas list --chatbot <chatbot-id> --json
sitegpt instructions list --chatbot <chatbot-id> --json
sitegpt starters list --chatbot <chatbot-id> --json
sitegpt followups list --chatbot <chatbot-id> --json
sitegpt dashboard --chatbot <chatbot-id>
```

If documents are still pending or failed, do not claim the chatbot is fully trained. Tell the user ingestion is queued or report the failed documents and next retry/resync command.

If conversation testing is useful, ask a few site-specific questions:

```bash
sitegpt messages send --chatbot <chatbot-id> "What does this company do?" --json
sitegpt messages send --chatbot <chatbot-id> "How much does it cost?" --json
sitegpt messages send --chatbot <chatbot-id> "How can I contact support?" --json
```

## Quality Bar

A good end-to-end setup should feel specific to the website, not generic:

- Use the brand's actual name and product language.
- Apply discovered brand colors and a real brand icon whenever reliable assets are available.
- If the brand color or bot icon ends up generic, such as default blue `#2563EB` or no uploaded logo, treat the setup as incomplete and rerun raw HTML extraction.
- Make the widget feel visibly related to the source website on first load.
- Prefer sitemap ingestion over broad crawling when possible.
- Include docs/pricing/contact/support pages when they exist.
- Make starters reflect the product's real buyer/user questions.
- Make followups useful next actions, not filler.
- Keep instructions grounded and explicit about uncertainty.
- Avoid claiming the bot can do tasks SiteGPT cannot perform.
- Verify ingestion and configuration before telling the user it is done.

In the final response, summarize the chatbot name and ID, onboarding URL for no-account onboarding or dashboard link for existing-account setup, knowledge source and ingestion status, persona/instructions, starters/followups, settings/icons, warnings, and follow-up recommendations.
