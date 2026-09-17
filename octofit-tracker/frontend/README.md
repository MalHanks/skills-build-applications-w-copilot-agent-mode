# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

For Codespaces, `VITE_CODESPACE_NAME` must be defined, for example in `.env.local`:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, API requests use:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If it is unset, the app safely falls back to `http://localhost:8000/api`.
