# CI/CD and deployment

## Continuous integration

`.github/workflows/ci.yml` runs on pull requests to `main`, pushes to `main`,
version tags (`v*.*.*`), and manual dispatch. It checks the backend with Ruff,
Django system checks, OpenAPI validation, and migration drift detection. It
checks the frontend with ESLint, a production build, and the Playwright landing
page suite. The backend check uses an ephemeral PostgreSQL service. Secrets for
production are not used in CI.

## Container delivery

When checks pass on a branch push or version tag, the workflow builds and pushes
the backend and frontend images to GitHub Container Registry:

- `ghcr.io/amaresh1018/amops-saas/backend`
- `ghcr.io/amaresh1018/amops-saas/frontend`

Images receive branch or version tags and an immutable commit SHA tag. Pull
requests build and validate the code but do not publish images. The workflow
uses the repository's `GITHUB_TOKEN`; no registry password needs to be added.

## Deployment target

The implementation plan identifies Kubernetes or AWS ECS/Fargate as possible
targets but does not select a provider, environment, domain, or runtime secrets.
Therefore, CI delivers deployable images to GHCR, while automatic staging and
production rollout remain pending that infrastructure decision. Once selected,
add environment-scoped GitHub variables/secrets and a provider-specific deploy
job that pulls the immutable commit-SHA images. Do not deploy with Django's
development secret or `DEBUG=true`.

The backend image starts Daphne and expects PostgreSQL connection settings via
`POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, and
`POSTGRES_PORT`, as well as a strong `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=false`,
and an appropriate host configuration. The current backend settings still
default `ALLOWED_HOSTS` to `*`; tighten that application setting before exposing
the service publicly. The frontend image serves the Next.js standalone build on
port 3000.
