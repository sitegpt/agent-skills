# Knowledge

Use this reference for knowledge documents, links, websites, sitemaps, files, YouTube, text, sync jobs, and Custom Responses.

Most commands require `--chatbot <chatbot-id>`. Prefer `--json` when you need document IDs or ingestion status.

## Documents

Documents are individual trained, pending, failed, or queued knowledge items inside a chatbot.

```bash
sitegpt knowledge documents list --chatbot <chatbot-id>
sitegpt knowledge documents list --chatbot <chatbot-id> --json
sitegpt knowledge documents list --chatbot <chatbot-id> --status SUCCESS
sitegpt knowledge documents list --chatbot <chatbot-id> --source LOCAL_FILE
sitegpt knowledge documents list --chatbot <chatbot-id> --state failed
sitegpt knowledge documents get --chatbot <chatbot-id> <document-id>
sitegpt knowledge documents get --chatbot <chatbot-id> <document-id> --json
sitegpt knowledge documents get --chatbot <chatbot-id> <document-id> --content --json
sitegpt knowledge documents stats --chatbot <chatbot-id>
sitegpt knowledge documents edit --chatbot <chatbot-id> <document-id> --file ./updated-content.md
sitegpt knowledge documents resync --chatbot <chatbot-id> --document <document-id>
sitegpt knowledge documents resync --chatbot <chatbot-id> --state failed
sitegpt knowledge documents delete --chatbot <chatbot-id> --document <document-id> --yes
sitegpt knowledge documents delete --chatbot <chatbot-id> --state failed --yes
sitegpt knowledge documents update-config --chatbot <chatbot-id> --document <document-id> --sync WEEKLY
sitegpt knowledge documents update-config --chatbot <chatbot-id> --document <document-id> --only-main-content true
sitegpt knowledge documents update-config --chatbot <chatbot-id> --document <document-id> --include-selector main
sitegpt knowledge documents update-config --chatbot <chatbot-id> --document <document-id> --exclude-selector nav
sitegpt knowledge documents update-config --chatbot <chatbot-id> --document <document-id> --header "User-Agent: SiteGPT"
```

Bulk selector options:

- `--document <id>`: selects a document; repeatable.
- `--state trained|pending|failed|all`: selects by dashboard training state.
- `--source <source>`, `--status <status>`, `--type <type>`: filters by ingestion metadata.
- `--query <text>`: filters by text search where supported.
- `--all`: selects every matching document.

## Add Knowledge

Prefer `sitemap add` when a sitemap exists, `website add` when you need a crawl from a starting URL, and `links add` when you know exact URLs.

```bash
sitegpt knowledge links add --chatbot <chatbot-id> https://example.com/a https://example.com/b
sitegpt knowledge links add --chatbot <chatbot-id> https://example.com/a --only-main-content true
sitegpt knowledge links add --chatbot <chatbot-id> https://example.com/a --sync WEEKLY
sitegpt knowledge website add --chatbot <chatbot-id> https://docs.example.com
sitegpt knowledge website add --chatbot <chatbot-id> https://docs.example.com --depth 3 --max-links 200
sitegpt knowledge website add --chatbot <chatbot-id> https://docs.example.com --include-path /docs --exclude-path /blog
sitegpt knowledge website add --chatbot <chatbot-id> https://docs.example.com --allowed-domain docs.example.com
sitegpt knowledge website add --chatbot <chatbot-id> https://docs.example.com --only-main-content true
sitegpt knowledge sitemap add --chatbot <chatbot-id> https://example.com/sitemap.xml
sitegpt knowledge sitemap add --chatbot <chatbot-id> https://example.com/sitemap.xml --scan WEEKLY
sitegpt knowledge youtube add --chatbot <chatbot-id> https://www.youtube.com/watch?v=...
sitegpt knowledge files add --chatbot <chatbot-id> ./guide.pdf ./faq.docx
sitegpt knowledge text update --chatbot <chatbot-id> --file ./faq.md
```

Important options:

- `--only-main-content true|false`: defaults to `true`; strips common page chrome and keeps main content.
- `--sync NEVER|DAILY|WEEKLY|MONTHLY`: recurring content refresh.
- `--scan NEVER|DAILY|WEEKLY|MONTHLY`: sitemap-only recurring URL discovery.
- `--include-selector <selector>`: CSS selector to include; repeatable.
- `--exclude-selector <selector>`: CSS selector to exclude; repeatable.
- `--header "Name: value"`: allowed scrape request header; repeatable.

Use `sitegpt knowledge files add`, not `upload`.

## Sync Jobs

Sync jobs are recurring knowledge maintenance jobs. They refresh known content or scan sitemaps for URL additions/deletions. Deleting a sync job disables its schedule; it does not delete existing documents.

```bash
sitegpt knowledge sync-jobs list --chatbot <chatbot-id>
sitegpt knowledge sync-jobs list --chatbot <chatbot-id> --json
sitegpt knowledge sync-jobs get --chatbot <chatbot-id> <job-id>
sitegpt knowledge sync-jobs update --chatbot <chatbot-id> <job-id> --sync WEEKLY
sitegpt knowledge sync-jobs update --chatbot <chatbot-id> <job-id> --scan MONTHLY
sitegpt knowledge sync-jobs delete --chatbot <chatbot-id> <job-id> --yes
```

Sync and scan frequencies may be plan-gated.

## Custom Responses

Custom Responses are manual question-and-answer overrides in the Knowledge section.

```bash
sitegpt knowledge custom-responses list --chatbot <chatbot-id>
sitegpt knowledge custom-responses list --chatbot <chatbot-id> --json
sitegpt knowledge custom-responses list --chatbot <chatbot-id> --state OPEN
sitegpt knowledge custom-responses list --chatbot <chatbot-id> --source MANUALLY_ADDED
sitegpt knowledge custom-responses get --chatbot <chatbot-id> <custom-response-id>
sitegpt knowledge custom-responses add --chatbot <chatbot-id> --question "Question?" --answer "Answer."
sitegpt knowledge custom-responses update --chatbot <chatbot-id> <custom-response-id> --answer "Updated answer."
sitegpt knowledge custom-responses delete --chatbot <chatbot-id> <custom-response-id> --yes
```

Common state filter values: `OPEN`, `UPDATED`, `ALL`.
