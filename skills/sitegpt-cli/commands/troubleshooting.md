# Troubleshooting

Use the closest `--help` level when syntax is unclear. Help output includes available subcommands, enum values, defaults, and examples.

```bash
sitegpt tokens create --help
sitegpt login --help
sitegpt knowledge --help
sitegpt knowledge documents --help
sitegpt settings --help
sitegpt settings appearance --help
sitegpt conversations --help
```

Common errors:

- `TOKEN_SCOPE_NOT_VALID`: the scope string is not supported.
- `TOKEN_SCOPE_NOT_ALLOWED`: the current token lacks the required scope.
- `UNKNOWN_COMMAND`: the command exists at a different level; run the nearest `--help`.
- `AUTHORIZATION_HEADER_REQUIRED` or `TOKEN_NOT_VALID`: log in again or switch profiles.

Custom Responses live under:

```bash
sitegpt knowledge custom-responses ...
```

For local development only, include the API base during login:

```bash
sitegpt login --profile local --api-base <local-api-base-url>
```

After that, `--api-base` is stored in the profile and does not need to be repeated.
