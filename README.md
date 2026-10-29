# amops

Developer operations workspace for planning projects and connecting the work
around them. This repository is the application monorepo for the Django API,
Next.js frontend, and local supporting services.

## Repository layout

- `backend/` — Django, Django REST Framework, and Channels API.
- `frontend/` — Next.js application and Playwright landing page checks.
- `infra/docker-compose.yml` — local PostgreSQL, Redis, MinIO, and OpenSearch.
- `docs/` — product, architecture, implementation, and deployment guidance.

## Local development

Start the supporting services with `docker compose -f infra/docker-compose.yml up -d`.
Install the Python project with [uv](https://docs.astral.sh/uv/):

```powershell
uv sync --extra dev
```

Install the frontend dependencies and start the app:

```powershell
cd frontend
npm ci
npm run dev
```

See the docs for backend environment configuration and product architecture.

## CI and container delivery

GitHub Actions validates backend configuration and OpenAPI, lints and builds
the frontend, and runs Playwright landing page checks. Passing pushes to `main`
publish backend and frontend images to GitHub Container Registry. Deployment to
a running environment awaits selection of a hosting provider; details and the
required runtime configuration are in [docs/deployment.md](docs/deployment.md).
