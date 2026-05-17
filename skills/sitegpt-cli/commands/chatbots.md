# Chatbots And Icons

Use this reference for chatbot creation, listing, metadata updates, dashboard links, embed snippets, and visual icon assets.

Most SiteGPT resources are scoped to a chatbot. List first when the chatbot ID is unknown.

## Chatbots

```bash
sitegpt chatbots list
sitegpt chatbots list --json
sitegpt chatbots get <chatbot-id>
sitegpt chatbots get <chatbot-id> --json
sitegpt chatbots create "Support Bot" --description "Answers support questions"
sitegpt chatbots create "Support Bot" --description "Answers support questions" --json
sitegpt chatbots update <chatbot-id> --title "New title"
sitegpt chatbots update <chatbot-id> --description "New description"
sitegpt chatbots delete <chatbot-id> --yes
sitegpt dashboard --chatbot <chatbot-id>
sitegpt installation snippet --chatbot <chatbot-id>
```

Command notes:

- `chatbots list`: lists chatbots accessible to the current user/token.
- `chatbots get`: fetches one chatbot.
- `chatbots create`: creates a chatbot and returns its ID.
- `chatbots update`: updates chatbot metadata.
- `chatbots delete`: deletes a chatbot; requires `--yes`.
- `dashboard`: prints or opens the dashboard URL for a chatbot.
- `installation snippet`: prints chat URL, widget script URL, and embed code.

## Icons

Icon commands upload or remove local image files for chatbot visuals. Download remote images first; do not pass a remote image URL as the file path.

```bash
sitegpt icons upload --chatbot <chatbot-id> bot ./bot.png
sitegpt icons upload --chatbot <chatbot-id> person ./person.png
sitegpt icons upload --chatbot <chatbot-id> agent ./agent.png
sitegpt icons upload --chatbot <chatbot-id> watermark ./watermark.png
sitegpt icons upload --chatbot <chatbot-id> chat-bubble ./bubble.png
sitegpt icons delete --chatbot <chatbot-id> bot --yes
sitegpt icons delete --chatbot <chatbot-id> chat-bubble --yes
```

Icon types:

- `bot`: avatar for AI messages.
- `person`: fallback visitor/user avatar.
- `agent`: fallback human-agent avatar.
- `watermark`: watermark image where enabled.
- `chat-bubble`: launcher bubble image.
