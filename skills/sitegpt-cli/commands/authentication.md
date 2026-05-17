# Authentication And Profiles

Use this reference for login, local profiles, global options, and environment overrides.

## Global Usage

```bash
sitegpt --help
sitegpt --version
sitegpt <command> --help
sitegpt <command> <subcommand> --help
```

Common global options:

- `--json`: print machine-readable JSON for automation and ID extraction.
- `--profile <name>` or `-p <name>`: use a saved local CLI profile.
- `--api-base <url>`: override the SiteGPT API base URL for one command.
- `--help`: show contextual help for the current command level.

Common environment variables:

- `SITEGPT_API_TOKEN`: token override for the current command.
- `SITEGPT_API_BASE`: API base URL override.
- `SITEGPT_PROFILE`: profile name override.

## Login

Authentication stores a SiteGPT token in a local profile. The default login flow opens a browser approval page and stores the approved token.

```bash
sitegpt login
sitegpt login --profile <profile>
sitegpt login --api-base <api-base-url>
sitegpt login --token <sitegpt-api-token>
sitegpt login --full-access
sitegpt login --scope account:read --scope chatbots:read
sitegpt login --chatbot <chatbot-id>
sitegpt login --expires-in-days 30
sitegpt whoami
sitegpt whoami --json
sitegpt logout
```

Use `login --token` when the user provides a dashboard-created API token. Use `--full-access` only when broad account management is needed. Use repeated `--scope` and `--chatbot` for narrower automation.

SiteGPT CLI/API tokens look like `sgpt_xxxxxxxxx`. Treat token values as opaque credentials.

## Profiles

Profiles are local named configurations. Each profile stores an API base URL and token.

```bash
sitegpt profiles list
sitegpt profiles show <profile>
sitegpt profiles use <profile>
sitegpt profiles set-default <profile>
sitegpt profiles delete <profile>
```

Use profiles for separate accounts, environments, or permission sets. `profiles use` and `profiles set-default` make a profile the default for later commands.
