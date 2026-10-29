FROM ghcr.io/astral-sh/uv:0.9.5 AS dependencies

ENV UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy
WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN uv sync --locked --no-dev --no-install-project

FROM python:3.12-slim AS runtime
ENV PATH="/app/.venv/bin:$PATH" \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app/backend
WORKDIR /app/backend
RUN groupadd --system app && useradd --system --gid app --home-dir /app app
COPY --from=dependencies --chown=app:app /app/.venv /app/.venv
COPY --chown=app:app backend/ ./
USER app
EXPOSE 8000
CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "config.asgi:application"]
