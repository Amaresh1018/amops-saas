# Implementation Roadmap & Phases: amops DevOS

This roadmap breaks down the development of amops into discrete, verifiable engineering phases. Each phase represents a shippable milestone with distinct objectives, dependencies, and completion criteria.

---

## Phase Summary & Current Status

| Phase | Milestone Name | Status | Estimated Solo Duration |
| :--- | :--- | :--- | :--- |
| **Phase 0** | **Foundation, Core Platform & Multi-Tenancy** | **Completed** | 6–8 Weeks |
| **Phase 1** | **Project Management & Kanban Board Engine** | **In Progress** | 6–8 Weeks |
| **Phase 2** | **Documentation (Wiki) Engine** | **Not Started** | 4–6 Weeks |
| **Phase 3** | **Real-Time Chat & Presence Engine** | **Not Started** | 4–6 Weeks |
| **Phase 4** | **Notification Center & File Manager** | **Not Started** | 3–4 Weeks |
| **Phase 5** | **AI Assistants & Orchestration Engine** | **Not Started** | 4–6 Weeks |
| **Phase 6** | **Git & CI/CD Integrations Engine** | **Not Started** | 3–4 Weeks |
| **Phase 7** | **CRM, Time Tracking & HR Engines** | **Not Started** | 4–6 Weeks |
| **Phase 8** | **Analytics, Billing & Enterprise Admin Hardening** | **Not Started** | 4–6 Weeks |
| **Phase 9** | **Workflow Automation Engine & Marketplace** | **Not Started** | 4–6 Weeks |

---

## Detailed Phase Specifications

### Phase 0: Foundation, Core Platform & Multi-Tenancy

- **Status:** **Completed**
- **Objective:** Establish the production-grade monorepo foundation, local developer environment, multi-tenant database isolation, authentication, RBAC, and CI/CD pipelines.
- **Scope:**
  - Monorepo directory structure (`backend/`, `frontend/`, `infra/`, `docs/`).
  - Containerized local environment with Docker Compose (PostgreSQL 16, Redis 7, MinIO, OpenSearch).
  - Django 5.2 LTS setup with `django-tenants` for schema-level isolation.
  - User model with UUID primary keys, JWT authentication (`djangorestframework-simplejwt`), and social OAuth (Google/GitHub via `django-allauth`).
  - Next.js 16.x frontend scaffolding with TypeScript, Tailwind CSS, and shadcn/ui.
  - Automated OpenAPI schema export and typed client generation pipeline.
  - GitHub Actions CI workflow (linting, type checking, unit tests).
- **Features / Modules Involved:**
  - `apps.core`, `apps.accounts`, `apps.orgs`
  - Frontend auth layouts, tenant selector, dashboard shell
- **Dependencies:** None (Baseline initialization).
- **Deliverables:**
  - Running local Docker Compose stack with health-checked services.
  - Working registration, login, and tenant workspace creation.
  - Verified database schema separation where tenant data cannot be queried cross-tenant.
  - CI pipeline running and passing on GitHub Actions.
- **Completion Criteria:**
  - A user can register, create a new organization, receive a dedicated PostgreSQL schema, and log into the Next.js frontend with a valid JWT token.
  - Automated unit and integration tests achieve >= 80% coverage on core auth and tenant resolution.

---

### Phase 1: Project Management, Kanban & Dashboard Engine

- **Status:** **In Progress**
- **Objective:** Deliver the core project and task tracking engine with interactive drag-and-drop Kanban boards, sprint management, and an executive command center dashboard.
- **Scope & Progress:**
  - **Completed Elements:**
    - [x] **Backend Domain Models (`apps.projects`):** `Project`, `Milestone`, `Epic`, `Story`, `Task`, `Subtask`, `Label`, `Priority`, `Status`.
    - [x] **DRF ViewSets & Endpoints:** ViewSets with filtering, ordering, pagination, tenant isolation, and batch Kanban card reordering (`/api/v1/tasks/reorder/`).
    - [x] **Automated OpenAPI Type Pipeline:** Exported `schema.yaml` via `drf-spectacular` and generated typed TypeScript definitions into `frontend/src/lib/api/schema.d.ts`.
    - [x] **Universal Enterprise Theme Engine (NUDL):** Deep obsidian dark mode (`#0B0C0E`), crisp alabaster light mode (`#F7F8FA`), soft electric indigo accent (`#5E6AD2`), and dynamic theme toggle with `next-themes`.
    - [x] **shadcn/ui Component Foundation:** Fully implemented accessible primitives in `src/components/ui/` (`dialog`, `dropdown-menu`, `card`, `badge`, `separator`, `tooltip`, `avatar`, `button`, `input`, `textarea`).
    - [x] **Interactive Kanban Board UI:** Responsive column layout, status icons, story points, due dates, task cards with optimistic drag reordering.
    - [x] **Linear-Grade Micro-Typography:** Vertical signal-bar audio-meter priority indicators (Urgent red alert, High 3 bars, Med 2 bars, Low 1 bar) and monospace ticket IDs (`NEX-101`).
    - [x] **Lucide Icon Standard:** 100% strict adherence to `lucide-react` across all UI elements.
    - [x] **Motion Design System:** Codified Rocket SaaS motion patterns into `.agents/skills/rocket-saas-motion-design/SKILL.md` (scroll reveals, infinite marquees, container pinch, micro-interactions).
    - [x] **Hydration & Layout Hardening:** Fixed browser extension attribute collision (`cz-shortcut-listen`) and collapsed sidebar layout crowding.
  - **Current Priority Focus (Next Deliverable):**
    - [ ] **Awesome Executive Dashboard Engine:** Modern visual command center featuring:
      - High-impact KPI metric stat cards (Active Tasks, Sprint Velocity, Team Workload, Blockers).
      - Interactive sprint burndown and progress visualization.
      - Workload distribution and assignee allocation heatmaps.
      - Real-time activity pulse stream (task updates, PR merges, milestones reached).
      - Rocket SaaS inspired subtle scroll reveals and card elevation motion.
  - **Remaining Phase 1 Deliverables:**
    - [ ] **End-to-End API Wiring:** Connect TanStack Query (`@tanstack/react-query`) hooks to live Django endpoints (`/api/v1/projects/`, `/api/v1/tasks/`).
    - [ ] **Real-time WebSockets:** Live multi-user card drag sync using Django Channels.
    - [ ] **Celery Notifications:** Asynchronous task assignment and status alerts.
- **Features / Modules Involved:**
  - `apps.projects`, `frontend/src/features/projects`, `frontend/src/features/kanban`, `frontend/src/features/dashboard`
- **Dependencies:** Phase 0 (Authentication, Tenant Context, RBAC).
- **Completion Criteria:**
  - Users have access to both an executive overview dashboard and an interactive Kanban board.
  - Moving a card on the Kanban board updates the backend database within 150ms and broadcasts the update to all active workspace viewers.
  - Performance tests confirm smooth rendering with 1,000 tasks loaded.

---

### Phase 2: Documentation (Wiki) Engine

- **Status:** **Not Started**
- **Objective:** Provide a rich collaborative documentation and knowledge authoring tool with revision history and full-text search.
- **Scope:**
  - Document models supporting nested pages, sections, and revision logs.
  - Rich text and Markdown editor in Next.js (TipTap / Slate).
  - Document revision history and restore capability.
  - Full-text indexing of document content in OpenSearch / Elasticsearch.
  - Attachment upload support linked to S3/MinIO storage.
- **Features / Modules Involved:**
  - `apps.docs`, `frontend/src/features/docs`, OpenSearch indexing service
- **Dependencies:** Phase 0 (Auth, Multi-Tenancy, Storage Interface).
- **Deliverables:**
  - Nested document tree navigation in the workspace.
  - WYSIWYG editor saving clean Markdown/HTML content to PostgreSQL.
  - Global full-text search returning relevant documents with keyword highlighting.
- **Completion Criteria:**
  - Users can create, nest, edit, and revert document revisions.
  - Keyword search retrieves saved documents within 200ms.

---

### Phase 3: Real-Time Chat & Presence Engine

- **Status:** **Not Started**
- **Objective:** Enable real-time team communication with workspace channels, direct messages, message threads, and active user presence.
- **Scope:**
  - Models for Channel, ChannelMember, Message, Thread, Reaction, Presence.
  - Django Channels ASGI consumers with Redis pub/sub layer.
  - Next.js chat interface featuring virtualized message feeds and optimistic UI updates.
  - Typing indicators, read receipts, and online status badges.
  - File/media attachment handling in chat messages.
- **Features / Modules Involved:**
  - `apps.chat`, `frontend/src/features/chat`, Redis Channel layer
- **Dependencies:** Phase 0 (Auth, User Profiles, Redis Infrastructure).
- **Deliverables:**
  - Public/private workspace channels and 1-on-1 direct messaging.
  - Real-time message exchange with typing and online indicators.
  - Unread message tracking and history pagination.
- **Completion Criteria:**
  - 100 concurrent WebSocket connections exchange messages with < 50ms latency.
  - Sent messages appear instantly on sender UI and broadcast reliably to recipients.

---

### Phase 4: Notification Center & File Manager

- **Status:** **Not Started**
- **Objective:** Centralize all platform alerts across multiple delivery channels and provide a workspace cloud drive for file assets.
- **Scope:**
  - Notification dispatch service routing in-app badges, email (SMTP/SendGrid), and WebPush.
  - User notification preference management matrix.
  - Workspace File Manager models for folders, files, and versions.
  - S3/MinIO integration with presigned upload and download URLs.
  - File quota enforcement per tenant subscription.
- **Features / Modules Involved:**
  - `apps.notifications`, `apps.files`, `frontend/src/features/notifications`, `frontend/src/features/files`
- **Dependencies:** Phase 0 (Core Platform, S3 Storage, Celery Broker).
- **Deliverables:**
  - Notification bell dropdown with mark-as-read and filter capabilities.
  - Cloud file explorer with drag-and-drop upload and file previews (images/PDFs).
- **Completion Criteria:**
  - System events (e.g. task assignments, mentions) reliably generate in-app alerts and trigger background email dispatch within 5 seconds.
  - Users can upload and download files up to 100MB via secure presigned URLs.

---

### Phase 5: AI Assistants & Orchestration Engine

- **Status:** **Not Started**
- **Objective:** Embed generative AI capabilities across projects, docs, and chat for automated task breakdown, sprint estimation, and summarization.
- **Scope:**
  - AI orchestration service wrapping OpenAI (GPT-4) and Anthropic (Claude) APIs.
  - Prompt template manager and context builders with token usage tracking.
  - Asynchronous AI task execution via Celery to prevent HTTP request timeouts.
  - Interactive AI assistants in the UI: "Break down into tasks", "Summarize document", "Generate standup".
- **Features / Modules Involved:**
  - `apps.ai`, `frontend/src/features/ai`
- **Dependencies:** Phase 1 (Projects), Phase 2 (Docs).
- **Deliverables:**
  - Contextual AI action triggers across project tasks and doc pages.
  - Streaming or asynchronous completion cards in the frontend.
  - Tenant-level token usage tracking and quota limits.
- **Completion Criteria:**
  - Clicking "Generate User Stories" on an Epic produces structured tasks that can be saved directly to the database.
  - Token consumption is recorded against tenant quotas with rate limiting.

---

### Phase 6: Git & CI/CD Integrations Engine

- **Status:** **Not Started**
- **Objective:** Connect GitHub/GitLab repositories and CI/CD pipelines directly to projects and tasks.
- **Scope:**
  - Inbound webhook listeners for GitHub/GitLab (push, pull_request, workflow_run).
  - Linking commits and PRs to tasks via issue keys (e.g., `amops-123`).
  - CI/CD build status dashboard visualizing recent pipeline runs and durations.
- **Features / Modules Involved:**
  - `apps.integrations`, `frontend/src/features/integrations`
- **Dependencies:** Phase 1 (Project Management).
- **Deliverables:**
  - Webhook receiver verifying cryptographic signatures.
  - Task detail panel displaying linked commits and pull request statuses.
  - Pipeline dashboard showing build logs and failure indicators.
- **Completion Criteria:**
  - Merging a PR referencing a task updates the task status or logs an event on the task activity timeline.

---

### Phase 7: CRM, Time Tracking & HR Engines

- **Status:** **Not Started**
- **Objective:** Provide sales pipeline tracking, task-based time tracking, and lightweight human resource management.
- **Scope:**
  - CRM models: Lead, Contact, Company, Deal, Stage, Activity.
  - Time tracking: Start/stop timer widget, task time entries, and timesheet reports.
  - HR models: Employee directory, leave requests, attendance logs, and company holidays.
- **Features / Modules Involved:**
  - `apps.crm`, `apps.timetracking`, `apps.hr`
- **Dependencies:** Phase 0 (Core Platform, RBAC).
- **Deliverables:**
  - Visual sales pipeline with deal stages and revenue summaries.
  - Interactive timer logging billable hours to project tasks.
  - Employee leave submission and manager approval workflow.
- **Completion Criteria:**
  - Time entries can be aggregated into weekly timesheets and exported to CSV.
  - Deals can be transitioned through pipeline stages with activity logs.

---

### Phase 8: Analytics, Billing & Enterprise Admin Hardening

- **Status:** **Not Started**
- **Objective:** Implement business intelligence reporting, SaaS subscription billing with Stripe, and enterprise administration controls.
- **Scope:**
  - Analytics dashboards: Sprint burndown, team velocity, time utilization, and revenue metrics.
  - Stripe Billing integration: Subscription plans (Free, Pro, Enterprise), checkout sessions, customer portal, and webhooks.
  - Feature gating and tenant plan enforcement.
  - Enterprise controls: Audit log viewer, SAML/OIDC SSO configuration, session management.
- **Features / Modules Involved:**
  - `apps.analytics`, `apps.billing`, `apps.orgs`
- **Dependencies:** Phase 0 through Phase 7.
- **Deliverables:**
  - Interactive BI dashboard with Recharts/Chart.js.
  - End-to-end Stripe subscription workflow (upgrade, downgrade, cancel).
  - Searchable audit log console for organization owners.
- **Completion Criteria:**
  - Subscribing to a Pro plan immediately unlocks gated features (AI, advanced analytics) without manual intervention.
  - All critical tenant administrative actions are recorded in immutable audit logs.

---

### Phase 9: Workflow Automation Engine & Marketplace

- **Status:** **Not Started**
- **Objective:** Deliver a no-code workflow automation engine and a plugin marketplace for third-party extensions.
- **Scope:**
  - Event-trigger rule engine: Trigger (e.g. `task.completed`) -> Conditions -> Actions (e.g. send notification, post webhook).
  - Visual rule builder interface in Next.js.
  - Marketplace directory for third-party connectors (Calendar, Zoom, Slack, Figma).
- **Features / Modules Involved:**
  - `apps.automation`, `apps.marketplace`
- **Dependencies:** Phase 0 through Phase 8.
- **Deliverables:**
  - Rule builder executing user-configured automated actions.
  - Marketplace app directory with install/configure flows.
- **Completion Criteria:**
  - Creating an automation rule to notify a channel when a high-priority task is closed executes reliably upon task state change.
