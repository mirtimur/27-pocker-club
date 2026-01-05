Deployment instructions

This repository is configured to deploy the static site to GitHub Pages using GitHub Actions. The workflow triggers on push to the `main` branch.

How it works:
- Push your changes to `main`.
- GitHub Actions will build/upload the contents of the repository root to GitHub Pages.
- The site will be available at: https://mirtimur.github.io/27-pocker-club

If the URL doesn't work after a few minutes, go to the repository Settings → Pages to check status.

Local backend (skeleton)

There is a minimal backend skeleton under `server/` with Socket.IO handlers and simple auth routes (in-memory user store for now). To run locally with Postgres:

1. Start services:

```bash
cd /Users/timurmir/Projects/Pocker/pocker-site
docker compose -f docker-compose.backend.yml up --build
```

2. Server will be available at http://localhost:3000 and exposes Socket.IO.

Notes:
- This is a starting skeleton: auth currently uses in-memory store. We'll switch to Postgres/Supabase and persist data in next steps.
- The server uses a crypto RNG for shuffle and deals cards server-side.
