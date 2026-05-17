# Settings

Use this reference for chatbot settings. Settings are grouped by dashboard section. Use `get` before updates when you need current values.

Use section updates for single fields and JSON files for bulk edits.

```bash
sitegpt settings get --chatbot <chatbot-id>
sitegpt settings get --chatbot <chatbot-id> --json
sitegpt settings update --chatbot <chatbot-id> --file ./settings.json
sitegpt settings general get --chatbot <chatbot-id>
sitegpt settings general update --chatbot <chatbot-id> --file ./general.json
sitegpt settings general update --chatbot <chatbot-id> --support-email support@example.com
sitegpt settings general update --chatbot <chatbot-id> --history-count 8
sitegpt settings appearance get --chatbot <chatbot-id>
sitegpt settings appearance update --chatbot <chatbot-id> --brand-color "#0F766E"
sitegpt settings appearance update --chatbot <chatbot-id> --brand-text-color "#FFFFFF"
sitegpt settings appearance update --chatbot <chatbot-id> --icon-background-color "#0F766E"
sitegpt settings appearance update --chatbot <chatbot-id> --link-color "#0F766E"
sitegpt settings appearance update --chatbot <chatbot-id> --icon-shape CIRCLE --icon-position RIGHT
sitegpt settings chat-mode get --chatbot <chatbot-id>
sitegpt settings chat-mode set --chatbot <chatbot-id> AI
sitegpt settings localization get --chatbot <chatbot-id>
sitegpt settings localization update --chatbot <chatbot-id> --file ./localization.json
sitegpt settings advanced get --chatbot <chatbot-id>
sitegpt settings advanced update --chatbot <chatbot-id> --file ./advanced.json
sitegpt settings user-data get --chatbot <chatbot-id>
sitegpt settings user-data update --chatbot <chatbot-id> --file ./user-data.json
sitegpt settings lead-form get --chatbot <chatbot-id>
sitegpt settings lead-form update --chatbot <chatbot-id> --enabled true --collect-name true
sitegpt settings human-support get --chatbot <chatbot-id>
sitegpt settings human-support update --chatbot <chatbot-id> --enabled true
sitegpt settings webhooks get --chatbot <chatbot-id>
sitegpt settings webhooks update --chatbot <chatbot-id> --file ./webhooks.json
```

Section descriptions:

- `general`: support email, history count, and general chatbot behavior.
- `appearance`: brand colors, launcher position, icon shape, and visual style.
- `chat-mode`: AI or agent starting mode.
- `localization`: language and UI copy.
- `advanced`: advanced model, retrieval, and behavior settings.
- `user-data`: visitor detail collection.
- `lead-form`: lead capture form behavior.
- `human-support`: human handoff behavior.
- `webhooks`: webhook destinations and events.
