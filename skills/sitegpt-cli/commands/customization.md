# Customization

Use this reference for personas, instructions, conversation starters, and conversation followups.

## Personas

Personas describe the chatbot's role, tone, and identity. They are separate from instructions and settings.

```bash
sitegpt personas list --chatbot <chatbot-id>
sitegpt personas get --chatbot <chatbot-id> <persona-id>
sitegpt personas add --chatbot <chatbot-id> --title "Support specialist" --file ./persona.md
sitegpt personas update --chatbot <chatbot-id> <persona-id> --title "New title"
sitegpt personas update --chatbot <chatbot-id> <persona-id> --file ./persona.md
sitegpt personas use --chatbot <chatbot-id> <persona-id>
sitegpt personas delete --chatbot <chatbot-id> <persona-id> --yes
```

Use `personas use` to make a specific persona active.

## Instructions

Instructions control response behavior, grounding, safety rules, and model temperature. They are separate from personas.

```bash
sitegpt instructions list --chatbot <chatbot-id>
sitegpt instructions get --chatbot <chatbot-id> <instruction-id>
sitegpt instructions add --chatbot <chatbot-id> --file ./instructions.md --temperature 0.4
sitegpt instructions update --chatbot <chatbot-id> <instruction-id> --file ./instructions.md
sitegpt instructions update --chatbot <chatbot-id> <instruction-id> --temperature 0.3
sitegpt instructions use --chatbot <chatbot-id> <instruction-id>
sitegpt instructions delete --chatbot <chatbot-id> <instruction-id> --yes
```

Use `instructions use` to make a specific instruction set active.

## Conversation Starters

Starters are buttons shown before the visitor sends a message.

```bash
sitegpt starters list --chatbot <chatbot-id>
sitegpt starters get --chatbot <chatbot-id> <starter-id>
sitegpt starters add --chatbot <chatbot-id> --title "Pricing" --message "Tell me about pricing."
sitegpt starters update --chatbot <chatbot-id> <starter-id> --title "New title"
sitegpt starters update --chatbot <chatbot-id> <starter-id> --message "New message"
sitegpt starters delete --chatbot <chatbot-id> <starter-id> --yes
sitegpt starters reorder --chatbot <chatbot-id> <starter-id-1> <starter-id-2>
```

## Conversation Followups

Followups are prompt buttons shown during or after a conversation. They can be normal prompts, links, or escalation actions.

```bash
sitegpt followups list --chatbot <chatbot-id>
sitegpt followups get --chatbot <chatbot-id> <followup-id>
sitegpt followups add --chatbot <chatbot-id> --title "Contact support" --message "How can I contact support?"
sitegpt followups add --chatbot <chatbot-id> --title "Open docs" --link https://example.com/docs --type LINK
sitegpt followups update --chatbot <chatbot-id> <followup-id> --title "New title"
sitegpt followups delete --chatbot <chatbot-id> <followup-id> --yes
sitegpt followups reorder --chatbot <chatbot-id> <followup-id-1> <followup-id-2>
```
