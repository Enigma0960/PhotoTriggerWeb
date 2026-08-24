# PhotoTriggerWeb

Monorepo for the Project Iris web presence.

## Apps

- `apps/web` - Next.js and Payload CMS application.
- `apps/docs` - Astro Starlight documentation site.

## Local Development

```bash
pnpm install
docker compose up -d
pnpm dev:web
```

The docs app runs separately:

```bash
pnpm dev:docs
```

## Useful Commands

```bash
pnpm lint
pnpm format
pnpm build
```

Copy `apps/web/.env.example` to `apps/web/.env` before running the web app locally.
