# Conversations, Messages, Tags, And Leads

Use this reference for support operations: conversations, messages, tags, and captured leads.

## Conversations

Conversations are visitor chat threads. Use these commands for support review, tagging, resolving, escalation, deletion, and switching back to AI handling.

```bash
sitegpt conversations list --chatbot <chatbot-id>
sitegpt conversations list --chatbot <chatbot-id> --status open --json
sitegpt conversations list --chatbot <chatbot-id> --tag <tag-id>
sitegpt conversations get --chatbot <chatbot-id> <thread-id>
sitegpt conversations get --chatbot <chatbot-id> <thread-id> --json
sitegpt conversations update --chatbot <chatbot-id> <thread-id> --resolved true
sitegpt conversations update --chatbot <chatbot-id> <thread-id> --tag <tag-id>
sitegpt conversations star --chatbot <chatbot-id> <thread-id>
sitegpt conversations unstar --chatbot <chatbot-id> <thread-id>
sitegpt conversations resolve --chatbot <chatbot-id> <thread-id>
sitegpt conversations unresolve --chatbot <chatbot-id> <thread-id>
sitegpt conversations read --chatbot <chatbot-id> <thread-id>
sitegpt conversations unread --chatbot <chatbot-id> <thread-id>
sitegpt conversations delete --chatbot <chatbot-id> <thread-id> --yes
sitegpt conversations bulk --chatbot <chatbot-id> --action resolve --thread <thread-id>
sitegpt conversations escalate --chatbot <chatbot-id> <thread-id> --message "Please follow up."
sitegpt conversations switch-to-ai --chatbot <chatbot-id> <thread-id>
```

## Messages

Messages are entries inside a conversation thread. Sending without a thread ID starts a new conversation. The CLI sends as the visitor/user.

```bash
sitegpt messages list --chatbot <chatbot-id> <thread-id>
sitegpt messages list --chatbot <chatbot-id> <thread-id> --json
sitegpt messages send --chatbot <chatbot-id> "Start a new conversation"
sitegpt messages send --chatbot <chatbot-id> <thread-id> "Continue this conversation"
sitegpt messages react --chatbot <chatbot-id> <thread-id> <message-id> --reaction POSITIVE
sitegpt messages edit --chatbot <chatbot-id> <thread-id> <message-id> --content "Updated content"
```

Reaction values: `POSITIVE`, `NEGATIVE`, `NEUTRAL`.

## Tags

Tags label conversations for support workflows.

```bash
sitegpt tags list --chatbot <chatbot-id>
sitegpt tags get --chatbot <chatbot-id> <tag-id>
sitegpt tags add --chatbot <chatbot-id> "Priority"
sitegpt tags update --chatbot <chatbot-id> <tag-id> --name "VIP"
sitegpt tags delete --chatbot <chatbot-id> <tag-id> --yes
```

## Leads

Leads are captured visitor/contact records. Use lead commands to review, update, star, archive, unarchive, or delete leads.

```bash
sitegpt leads list --chatbot <chatbot-id>
sitegpt leads list --chatbot <chatbot-id> --status open --json
sitegpt leads get --chatbot <chatbot-id> <lead-id>
sitegpt leads update --chatbot <chatbot-id> <lead-id> --name "Name"
sitegpt leads update --chatbot <chatbot-id> <lead-id> --phone "+1..."
sitegpt leads star --chatbot <chatbot-id> <lead-id>
sitegpt leads unstar --chatbot <chatbot-id> <lead-id>
sitegpt leads archive --chatbot <chatbot-id> <lead-id>
sitegpt leads unarchive --chatbot <chatbot-id> <lead-id>
sitegpt leads delete --chatbot <chatbot-id> <lead-id> --yes
sitegpt leads bulk --chatbot <chatbot-id> --action archive --lead <lead-id>
```
