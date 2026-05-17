# External Data Sources

Use this reference for connected knowledge sources such as Notion, Google Drive, Dropbox, OneDrive, Box, SharePoint, Confluence, and GitHub.

External sources connect SiteGPT to third-party systems. OAuth/picker connectors return an authorization URL. After approval and file selection, list documents and ingest the selected source content.

```bash
sitegpt knowledge sources list --chatbot <chatbot-id>
sitegpt knowledge sources create --chatbot <chatbot-id> --connector GOOGLE_DRIVE --name "Drive docs"
sitegpt knowledge sources create --chatbot <chatbot-id> --connector NOTION --name "Notion docs"
sitegpt knowledge sources create --chatbot <chatbot-id> --connector DROPBOX --name "Dropbox docs"
sitegpt knowledge sources create --chatbot <chatbot-id> --connector ONEDRIVE --name "OneDrive docs"
sitegpt knowledge sources create --chatbot <chatbot-id> --connector BOX --name "Box docs"
sitegpt knowledge sources create --chatbot <chatbot-id> --connector SHAREPOINT --name "SharePoint docs"
sitegpt knowledge sources create --chatbot <chatbot-id> --connector CONFLUENCE --domain site.atlassian.net
sitegpt knowledge sources create --chatbot <chatbot-id> --connector GITHUB --name "Docs repo" --owner <owner> --api-key <github-token>
sitegpt knowledge sources get --chatbot <chatbot-id> <source-id>
sitegpt knowledge sources update --chatbot <chatbot-id> <source-id> --name "New name"
sitegpt knowledge sources authorize --chatbot <chatbot-id> <source-id>
sitegpt knowledge sources documents --chatbot <chatbot-id> <source-id>
sitegpt knowledge sources ingest --chatbot <chatbot-id> <source-id>
sitegpt knowledge sources revoke --chatbot <chatbot-id> <source-id> --yes
```

Supported connectors: `NOTION`, `GOOGLE_DRIVE`, `DROPBOX`, `ONEDRIVE`, `BOX`, `SHAREPOINT`, `CONFLUENCE`, `GITHUB`.

## OAuth And Picker Sources

For Google Drive, Dropbox, OneDrive, Box, and SharePoint:

1. Create the source.
2. Open the returned authorization URL.
3. Approve access and select files.
4. Run `sources documents`.
5. Run `sources ingest`.

To add more files to an existing OAuth/picker source, reopen the picker for the same source:

```bash
sitegpt knowledge sources authorize --chatbot <chatbot-id> <source-id>
```

Do not create a duplicate source just to select more files.

## Notion

Notion is different from file-picker sources. Page/database selection happens inside Notion's OAuth permission screen, and SiteGPT discovers selected pages during ingest.

After Notion authorization, run ingest even if `sitegpt knowledge sources documents` is empty:

```bash
sitegpt knowledge sources ingest --chatbot <chatbot-id> <source-id>
```

An empty pre-ingest Notion document list does not by itself mean no pages were selected.

## GitHub

GitHub uses an API token rather than an OAuth picker:

```bash
sitegpt knowledge sources github repos --chatbot <chatbot-id> --source <source-id>
sitegpt knowledge sources github files --chatbot <chatbot-id> --source <source-id> --owner <owner> --repo <repo> --branch <branch>
sitegpt knowledge sources ingest --chatbot <chatbot-id> <source-id> --repo <repo> --branch <branch> --pattern "docs/**"
```

## Confluence

Confluence uses spaces and pages:

```bash
sitegpt knowledge sources confluence spaces --chatbot <chatbot-id> --source <source-id>
sitegpt knowledge sources confluence pages --chatbot <chatbot-id> --source <source-id> --space <space-id>
sitegpt knowledge sources ingest --chatbot <chatbot-id> <source-id> --page <page-id>
```
