# Engineering Rules & Agent Guidelines: amops DevOS

This document serves as the **engineering contract** for all developers and AI coding agents working on amops. Every contribution must adhere to these rules.

## Product and UI consistency contract (2026-10-27)

- Read the root and applicable nested `AGENTS.md` on each task. Preserve user changes and deletions.
- Product intent comes from `executive_summary.md` and `nexus_implement_plan.md`; architecture from `architecture.md`.
- `design.md` owns the visual system; `landing_page_blueprint.md` owns the landing story. Older conflicting visual notes are superseded.
- Reuse existing primitives, hooks, utilities, and data before adding equivalents. Keep one typed source for repeated story steps, module descriptions, status labels, and destinations.
- Use shared semantic color, typography, spacing, and motion tokens. No independent landing palette or font stack. Verify both themes.
- Use Lucide for UI icons. Custom SVG diagrams, charts, connectors, and 3D geometry are allowed when they explain the product.
- Animation must communicate a product relationship or state change, with reduced-motion and non-WebGL alternatives.
- Label sample data and planned capabilities. Verify availability, security, performance, and pricing claims before publishing them.
- Update documentation and task status after material changes. Never call a specification an implemented or visually verified page.

---

## Coding Rules & Standards

### 1. Naming Conventions

| Context | Convention | Example | Notes |
| :--- | :--- | :--- | :--- |
| **Python Files & Modules** | `snake_case.py` | `task_service.py`, `tenant_middleware.py` | Descriptive, lower-case |
| **Python Classes & Models** | `PascalCase` | `Task`, `WorkspaceMembership`, `ProjectViewSet` | Specific and singular for models |
| **Python Functions & Methods** | `snake_case` | `calculate_sprint_velocity()`, `get_queryset()` | Verb-first for actions |
| **Python Constants** | `UPPER_SNAKE_CASE` | `DEFAULT_PAGE_SIZE`, `MAX_ATTACHMENT_BYTES` | Defined at module root or settings |
| **TypeScript Files (Components)** | `PascalCase.tsx` | `KanbanBoard.tsx`, `TaskCard.tsx` | One primary component per file |
| **TypeScript Files (Utilities/Hooks)** | `camelCase.ts` | `useWorkspace.ts`, `formatDate.ts` | Hook files prefixed with `use` |
| **TypeScript Types & Interfaces** | `PascalCase` | `TaskItem`, `WorkspaceResponse`, `UserRole` | Avoid `I` prefix (e.g., no `ITask`) |
| **CSS & Design Tokens** | `kebab-case` | `--color-background`, `bg-brand-primary` | Adhere to Tailwind token naming |
| **Database Tables & Columns** | `snake_case` | `project_milestones`, `assigned_user_id` | Pluralized tables, explicit FK IDs |
| **API Endpoints** | `kebab-case` (plural) | `/api/v1/projects/`, `/api/v1/user-profiles/` | Standard REST plural resource naming |

### 2. File & Component Organization

- **Backend (Django):**
  - Group domain logic into `apps/<app_name>/`.
  - Maintain clear separation: `models.py` (data), `serializers.py` (API contracts), `views.py` / `viewsets.py` (HTTP handlers), `services.py` (business logic), `consumers.py` (WebSockets), `tasks.py` (Celery background tasks).
  - Business logic belongs in **services**, never inside viewsets or serialiser methods.
- **Frontend (Next.js):**
  - Organize by feature in `src/features/<feature_name>/` (e.g., `src/features/kanban/components/`, `src/features/kanban/hooks/`).
  - Keep generic, shared UI primitives inside `src/components/ui/` (shadcn/ui convention).
  - Colocate component-specific sub-components within the feature folder rather than leaking them to global UI folders.

### 3. Imports & Module Hygiene

- **Python:**
  - Group imports in standard order (standard library, third-party libraries, local Django apps).
  - Use absolute imports within backend apps (e.g., `from apps.core.models import BaseModel`).
  - Never use wildcard imports (`from module import *`).
- **TypeScript:**
  - Order imports: React / Next.js core, third-party packages, internal paths using aliases (`@/components/...`, `@/lib/...`), relative styles/assets.
  - Eliminate unused imports and circular dependencies before committing.

### 4. Type Safety & Strictness

- **Python:**
  - All new service functions and utility methods must include Python type annotations (`typing` / built-in types).
  - Pass `mypy` strict type checking without errors.
- **TypeScript:**
  - Strict mode enabled (`"strict": true` in `tsconfig.json`).
  - Prohibit the use of `any`. Use `unknown`, generic parameters, or defined union types when types are dynamic.
  - Consume generated types from `src/lib/api/` for all network payloads.

---

## What to Use (Preferred Tools & Abstractions)

| Area | Preferred Abstraction / Library | Justification |
| :--- | :--- | :--- |
| **Backend API** | Django REST Framework (`viewsets.ModelViewSet`, `serializers.ModelSerializer`) | Standardized query handling, pagination, and permissions |
| **API Documentation** | `drf-spectacular` | Automated OpenAPI 3.0 specification generation |
| **Multi-Tenancy** | `django-tenants` & `django-tenant-users` | Schema-based tenant isolation in PostgreSQL |
| **Background Tasks** | Celery 5.x with Redis broker | Proven asynchronous task execution and periodic scheduling |
| **Real-Time** | Django Channels 4 (ASGI) | Native Django integration for WebSockets |
| **Frontend Styling** | Tailwind CSS + `clsx` + `tailwind-merge` (`cn` helper) | Prevents CSS bloat and handles conditional class merging |
| **Frontend UI Components** | `shadcn/ui` (built on Radix UI) | Accessible, unstyled, composable primitives |
| **Frontend Server State** | TanStack Query (`@tanstack/react-query`) | Automatic caching, invalidation, and background refetching |
| **Frontend Local State** | Zustand | Lightweight client-only state without boilerplate |
| **Form Handling** | React Hook Form + Zod | Minimal re-renders with declarative schema validation |
| **Icons** | **Lucide Icons (`lucide-react`)** | Standardized, accessible SVG icon set (MANDATORY across all frontend interfaces) |

---

## What to Avoid (Strict Prohibitions)

- **No Non-Lucide Icon Libraries:** Always use `lucide-react` exclusively for interface icons. Never install or import another icon library or draw replacement icon paths. Custom explanatory diagrams, charts, connectors, and scene geometry are permitted.
- **No Custom Tenancy Hacks:** Do not inject ad-hoc `WHERE tenant_id = ...` SQL queries. Tenancy must always route through the established `django-tenants` schema context or base tenant models.
- **No Direct Cross-Engine Queries:** Do not import models from engine A into engine B to run mutate queries. Emit an event to the Event Bus or call an exported service method.
- **No Hardcoded Values:** Never hardcode URLs, credentials, API keys, or design values (colors, margins, font sizes) in application code. Use environment variables and design tokens.
- **No Duplicate Utilities:** Always inspect `backend/apps/core/utils/` and `frontend/src/lib/` before writing string, date, or formatting helper functions.
- **No Inline Styles:** Do not use inline `style={{ ... }}` in React unless calculating dynamic geometric coordinates (e.g., Gantt bar widths). Use Tailwind tokens.
- **No Silent Exception Swallowing:** Do not write empty `except:` or `catch (e) {}` blocks. Every handled error must either be logged with context or surfaced gracefully.
- **No Monolithic View Functions:** Keep viewset actions concise. Delegate business rules to dedicated services.

---

## Dependency Rules

Before introducing any new third-party dependency:

1. **Verify Existing Libraries:** Check whether the Python standard library, Django, DRF, Next.js, or existing project dependencies already fulfill the requirement.
2. **Evaluate Footprint:** Avoid heavy libraries for trivial functions (e.g., do not import a library for simple date formatting if standard utils suffice).
3. **Check Licensing & Maintenance:** Ensure the library uses an OSI-approved permissive license (MIT, Apache 2.0, BSD) and is actively maintained.
4. **Registration:** New dependencies must be explicitly added to `pyproject.toml` / `requirements.txt` (backend) or `package.json` (frontend) and recorded in `docs/memory.md`.

---

## Error Handling Standards

### 1. Backend Error Responses
- API error payloads must follow a standardized JSON envelope:
  ```json
  {
    "error": {
      "code": "RESOURCE_NOT_FOUND",
      "message": "The requested task does not exist or you lack permission to view it.",
      "details": {}
    }
  }
  ```
- Use standard HTTP status codes:
  - `400 Bad Request` for validation failures.
  - `401 Unauthorized` for missing/expired JWT tokens.
  - `403 Forbidden` for tenant or RBAC permission violations.
  - `404 Not Found` for nonexistent resources.
  - `409 Conflict` for state conflicts (e.g., duplicate slug).
  - `500 Internal Server Error` for unhandled exceptions (logged to Sentry with trace ID).

### 2. Frontend Error Boundaries & Fallbacks
- Wrap route segments in Next.js `error.tsx` boundaries to catch rendering exceptions without crashing the shell.
- Form validation errors must highlight the offending input using Zod error messages.
- Network and mutation errors must trigger accessible toast notifications (`sonner` or shadcn toast) with recovery actions.

---

## Testing Rules & Quality Gates

| Test Layer | Tools | Scope & Requirements |
| :--- | :--- | :--- |
| **Backend Unit Tests** | `pytest`, `pytest-django` | Test models, service logic, and helper functions in isolation. |
| **Backend Integration Tests** | `pytest-django`, DRF `APITestCase` | Test API endpoints, tenant schema isolation, and RBAC permission checks. |
| **Frontend Unit / Component** | Vitest / Jest, React Testing Library | Test custom hooks, utility functions, and complex interactive UI components. |
| **End-to-End (E2E)** | Playwright | Verify critical user paths: authentication, tenant provisioning, task lifecycle. |

- **Coverage Standard:** Maintain a minimum of **80% code coverage** for all new service layers and API endpoints.
- **Tenant Isolation Verification:** Every new API endpoint test suite must include a test asserting that Tenant B cannot access or modify resources owned by Tenant A.

---

## AI Agent Operating Boundaries

When an AI coding agent acts on this repository, it must operate within the following boundaries:

1. **Context-First Verification:** Before generating code, read the relevant existing files and documentation. Verify whether abstractions already exist.
2. **Minimal Edit Scope:** Confine changes strictly to the task assigned. Do not refactor unrelated files, clean up arbitrary styling, or reformat untouched files.
3. **No Hallucinated APIs:** Verify library APIs and import paths against installed package versions before writing code.
4. **Preserve Existing Signatures:** Do not break existing method or API signatures without a documented migration and approval.
5. **Architectural Clarification:** If a user request contradicts the architectural design (e.g., requesting a direct cross-tenant database bypass), ask for clarification rather than silently violating the architecture.
6. **Documentation Maintenance:** Every significant implementation step must be reflected in `docs/memory.md`.

---

## Change Safety & Database Migrations

- **Multi-Tenant Schema Migrations:** All Django migrations must be compatible with `django-tenants`. Avoid operations that lock large tables or require manual downtime.
- **Additive Schema Evolution:** Prefer adding nullable fields or fields with defaults over destructive column drops.
- **Rollback Safety:** Every migration must be reversible. Verify that `python manage.py migrate <app> <previous_migration>` succeeds cleanly in development.
- **Sensitive Operations:** Any change modifying authentication, tenant resolution middleware, or RBAC permission checking must be accompanied by thorough unit and security test assertions.
