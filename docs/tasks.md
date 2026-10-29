# amops DevOS: Master Task Execution Ledger (tasks.md)

This document contains the exhaustive, granular task breakdown for both **Frontend** and **Backend** development across the entire amops DevOS platform. It tracks completion status, file targets, and execution order.

---

## Task Status Legend
- `[x]` **Completed:** Implemented, verified, and active in the codebase.
- `[~]` **In Progress:** Currently being implemented.
- `[ ]` **Pending:** Specified, queued for immediate execution.

## Current landing rebuild — 2026-10-27

### Cleanup follow-up — 2026-10-29

- [x] Trace active imports; remove superseded landing components, their unused helpers, and starter assets.
- [x] Uninstall unused direct packages and regenerate the npm lockfile without upgrading retained dependencies.
- [x] Remove orphan CSS/props and update frontend development instructions.
- [x] Validate full lint, production build/types, and the installed dependency tree.
- [x] Rerun all 11 browser tests against the rebuilt production server; all passed.

This replaces the old FE-1.0 visual direction. Prior completed entries below are historical;
they do not validate current runtime behavior or public feature claims.

- [x] **LP-0:** Read product documentation; replace landing blueprint; reconcile visual direction and recurring engineering rules.
- [x] **LP-1:** Audited routes, sample-data preview, existing primitives, imports, tokens, and documented availability.
- [x] **LP-2:** Built responsive landing, shared typed story/module content, four-step project walkthrough, foundations, architecture, and roadmap.
- [x] **LP-3:** Verified React/R3F peer compatibility; added lazy connection scene, reduced-motion/mobile HTML alternatives, and WebGL failure boundary.
- [x] **LP-4:** Wired controls, theme persistence, navigation/history, and preview/roadmap labels. Removed old components from the active landing composition; historical source files remain unused rather than deleting unrelated files.
- [x] **LP-5:** Inspected screenshots at 390/768/1440px in both themes; verified keyboard, small-screen controls, reduced motion, WebGL fallback, and preview navigation with Chromium. Physical-device touch testing is not claimed.
- [x] **LP-6:** Production build, TypeScript, scoped lint, 10 browser tests, and local production performance checks passed; measurements recorded in memory.

---

# 🎨 TRACK A: FRONTEND TASKS (Next.js 16, React 19, Tailwind CSS v4, shadcn/ui)

## Phase 0: Scaffolding & Foundation
- [x] **FE-0.1:** Initialize Next.js 16.4 App Router scaffolding with TypeScript and Turbopack.
- [x] **FE-0.2:** Establish Universal Enterprise Theme Engine (NUDL) with `.dark` and `:root` HSL tokens in `frontend/src/app/globals.css`.
- [x] **FE-0.3:** Install and configure `next-themes` with animated Sun/Moon toggle (`frontend/src/components/theme-toggle.tsx`).
- [x] **FE-0.4:** Fix root hydration mismatch (`suppressHydrationWarning` on `<html>` and `<body>`).
- [x] **FE-0.5:** Scaffolding essential `shadcn/ui` component suite in `frontend/src/components/ui/` (`dialog`, `dropdown-menu`, `card`, `badge`, `separator`, `tooltip`, `avatar`, `button`, `input`, `textarea`).
- [x] **FE-0.6:** Mandate 100% strict adherence to `lucide-react` icons across all UI modules.
- [x] **FE-0.7:** Fix collapsible sidebar rail header layout (centered 32×32px brand button with hover expand trigger).
- [x] **FE-0.8:** Codify Rocket SaaS Motion Design System into `.agents/skills/rocket-saas-motion-design/SKILL.md`.

---

## Phase 1: Project Management, Kanban & Executive Dashboard (ACTIVE PHASE)

### Sprint 1.0: High-Converting Awwwards/Rocket-SaaS Product Landing Page (COMPLETED)
- [x] **FE-1.0a: Framer Motion Engine & Design Tokens Setup**
  - Installed `framer-motion` for React 19.
  - Implemented infinite marquee keyframes and radial grid background patterns in `globals.css`.
  - Built `src/components/ui/tabs.tsx` utilizing Radix UI.
- [x] **FE-1.0b: Modular Landing Page Architecture** (`frontend/src/features/landing/`)
  - `Navbar.tsx`: Floating frosted glass header with brand monogram, links, live API health indicator, theme toggle, and "Launch Live App" CTA.
  - `HeroSection.tsx`: AuthKit theatrical overhead conical spotlight beam, kinetic word-by-word blur-to-focus stagger, live waveform telemetry HUD, and CLI command bar.
  - `MotherboardDiagram.tsx`: AuthKit WorkOS-tier silicon microprocessor motherboard chassis with golden pins, glowing processor die, and interactive peripheral chips (U1-SQL, U2-ASGI, U3-FLOW, U4-NPU).
  - `HardwareGraphicsGrid.tsx`: Advanced system controls featuring 360° sweeping Radar Sonar Scanner (`RadarSonar.tsx`), Hardware Cryptographic Enclave Keypad (`HardwareKeypad.tsx`), and multi-region server chassis.
  - `MarqueeIntegrations.tsx`: Continuous linear logo ribbon featuring PostgreSQL, Django 6, Next.js 16, Redis, Docker, and Kubernetes.
  - `InteractivePreview.tsx`: 3D perspective mouse tilt showcase window with floating metric badges.
  - `FeatureBento.tsx`: 6-engine bento grid with cursor-following spotlight shaders.
  - `InteractiveSchemaMatrix.tsx`: Living PostgreSQL schema routing machine with animated photon circuit pulses.
  - `SystemTelemetry.tsx`: Audited technical benchmark comparison table.
  - `PricingSection.tsx`: Dynamic capacity estimator slider (2 to 150+ devs).
  - `CtaBanner.tsx` & `Footer.tsx`: High-converting final CTA banner, operational status indicator, API swagger links, and versioning.
- [x] **FE-1.0c: Seamless Marketing <-> Live Workspace Navigation**
  - Integrated dual-mode state in `frontend/src/app/page.tsx` with instant transition between landing marketing canvas and the live DevOS workspace.
  - Added "← Landing" return button and "Product Overview" sidebar navigation item.
  - Full TypeScript build verification and clean Turbopack prerender without hydration mismatches.

### Sprint 1.1: Awesome Executive Command Center Dashboard (COMPLETED)
- [x] **FE-1.1: Dashboard Architecture & Route Setup**
  - Created `frontend/src/features/dashboard/` module structure (`DashboardOverview.tsx`, `StatCards.tsx`, `BurndownChart.tsx`, `WorkloadDistribution.tsx`, `ActivityFeed.tsx`, `types.ts`).
  - Wired top-level navigation tabs (`Dashboard` vs `Kanban Board`) in `frontend/src/app/page.tsx` with `Dashboard` as default view.
- [x] **FE-1.2: High-Impact KPI Stat Cards**
  - Implemented 4 executive metric cards:
    - *Sprint 1 Velocity* (42 pts, +18.4% trend, 87.5% progress bar).
    - *Sprint Completion* (68%, +12% 48h trend, 14 Done / 5 In Review / 3 In Progress).
    - *Active Team Capacity* (84% util, 4 engineers, 32/38 hrs).
    - *Critical Blockers* (0 open, system healthy, -2 resolved today).
  - Applied NUDL surface tokens (`bg-card/60`, subtle borders, radial hover flares, hover elevation).
- [x] **FE-1.3: Interactive Sprint Burndown & Velocity Visualizer**
  - Built responsive SVG sprint burndown chart with ideal dashed guideline vs actual gradient burn curve.
  - Interactive clickable/hoverable day nodes displaying date, story points remaining, and schedule status.
- [x] **FE-1.4: Team Workload & Capacity Heatmap**
  - Built workload allocation matrix displaying team members, assigned story points, capacity utilization bar, and avatar badges.
  - Near-limit warning indicator for team members approaching 100% capacity.
- [x] **FE-1.5: Real-Time Live Activity Pulse Feed**
  - Built real-time activity stream showing live engineering events: task moved to Done, PR merged, milestone reached, new issue logged.
  - Monospace ticket IDs (`NEX-101`) and event-specific status icons.
- [x] **FE-1.6: Rocket SaaS Staggered Motion Reveals**
  - Integrated card hover physics (`hover:-translate-y-1 hover:shadow-lg transition-all duration-300`) and radial flares.

### Sprint 1.2: Kanban Board Polish & End-to-End API Wiring
- [x] **FE-1.7: Drag-and-Drop Kanban Board UI** (Completed with mock state).
- [x] **FE-1.8: Linear-Grade Signal Priority Indicators** (Urgent alert, High 3 bars, Med 2 bars, Low 1 bar).
- [x] **FE-1.9: Task Creation Dialog** (`NewTaskModal.tsx` with title, description, priority, estimate, status).
- [ ] **FE-1.10: TanStack Query Provider & API Hooks**
  - Configure `QueryClientProvider` in root layout.
  - Build `useProjects()`, `useTasks(projectId)`, `useTaskMutations()` fetching from Django API (`http://127.0.0.1:8000/api/v1/`).
- [ ] **FE-1.11: Optimistic Drag-and-Drop Mutation**
  - Connect card drag drop event to `PATCH /api/v1/tasks/{id}/` (`status`, `order`).
  - Implement automatic rollback on server rejection.
- [ ] **FE-1.12: Task Detail Slide-Over Sheet / Drawer**
  - Build detail inspection drawer using shadcn/ui `sheet` or elevated modal with Markdown description, subtasks checklist, assignee selector, and label pills.
- [ ] **FE-1.13: Live Multi-User WebSocket Synchronization**
  - Connect client to Django Channels WebSocket room (`ws://127.0.0.1:8000/ws/projects/{id}/`).
  - Invalidate/update React Query cache automatically on incoming `task.moved` and `task.created` events.

---

## Phase 2: Collaborative Documentation (Wiki) Engine
- [ ] **FE-2.1: Document Tree Navigation** — Collapsible hierarchical folder/page sidebar with drag-and-drop reordering.
- [ ] **FE-2.2: Rich-Text / Markdown Editor** — TipTap or Slate editor with slash commands (`/h1`, `/task`, `/code`, `/table`), callout boxes, and syntax-highlighted code blocks.
- [ ] **FE-2.3: Document Revision History Viewer** — Visual diff inspector comparing page revisions with one-click restore.
- [ ] **FE-2.4: Instant Full-Text Search Modal** — Command palette modal (`⌘K`) with live fuzzy document search and keyword highlights.

---

## Phase 3: Real-Time Chat & Communications Engine
- [ ] **FE-3.1: Chat Channel Sidebar** — Public channels, private groups, and direct message lists with unread count badges.
- [ ] **FE-3.2: Message Feed & Virtualized Scroll** — High-performance message history with infinite scroll, date dividers, and Markdown message rendering.
- [ ] **FE-3.3: Interactive Message Actions** — Emoji reactions, threaded replies drawer, message edit/delete, and attachment previews.
- [ ] **FE-3.4: Live Presence & Typing Indicators** — Real-time online/away status dots and typing state bubbles.

---

## Phase 4: Notification Center & Cloud File Manager
- [ ] **FE-4.1: Notification Center Popover** — Bell icon popover with unread tabs, mark-all-as-read, and deep-links to tasks/messages.
- [ ] **FE-4.2: Sonner Accessible Toast System** — Real-time action feedback toasts with undo capabilities.
- [ ] **FE-4.3: File Explorer UI** — Grid/List file browser with folder navigation, file size badges, and storage usage progress meter.
- [ ] **FE-4.4: Drag-and-Drop File Uploader** — Multi-file upload dropzone with individual progress bars and cancellation.

---

## Phase 5: AI Assistants & Orchestration Interface
- [ ] **FE-5.1: AI Copilot Command Bar** — Floating AI prompt trigger (`⌘J`) for automated task breakdown and sprint planning.
- [ ] **FE-5.2: Automated User Story Generator Dialog** — Modal accepting requirements and streaming back structured stories, acceptance criteria, and subtasks.
- [ ] **FE-5.3: Document & PR Summarization Card** — One-click AI summarization chip attached to long documentation and pull requests.

---

## Phase 6: Git, Commits & CI/CD Pipelines Dashboard
- [ ] **FE-6.1: Pull Request & Commit Linkers** — Task card chips displaying linked GitHub/GitLab PR status (Open, Merged, Draft).
- [ ] **FE-6.2: CI/CD Build Pipeline Monitor** — Real-time build status indicators (Passing, Failing, In-Progress) with step-by-step log output view.

---

## Phase 7: CRM, Time Tracking & HR People Engine
- [ ] **FE-7.1: Active Task Time Tracker Widget** — Live stopwatch timer in top navigation header with billable/non-billable toggle.
- [ ] **FE-7.2: Weekly Timesheet Matrix** — Grid view for reviewing, editing, and submitting weekly logged hours.
- [ ] **FE-7.3: Sales Opportunity Pipeline (Deal Board)** — Kanban board customized for sales deal stages (Lead, Qualified, Demo, Proposal, Closed Won).
- [ ] **FE-7.4: Team Directory & People Directory** — Profile grid with department filters, contact cards, and timezone indicators.

---

## Phase 8: Analytics, Billing & Enterprise Administration
- [ ] **FE-8.1: Executive BI Dashboard** — Velocity charts, team allocation donuts, and exportable PDF reports.
- [ ] **FE-8.2: Subscription Tier & Usage Portal** — Stripe Customer Portal integration, seat count manager, and plan upgrade cards.
- [ ] **FE-8.3: Organization Settings & Audit Log Viewer** — Admin console for SAML SSO configuration, member role assignment, and paginated audit log table.

---

## Phase 9: Workflow Automation Builder & Marketplace
- [ ] **FE-9.1: Visual "If-This-Then-That" Automation Builder** — Node-based visual canvas for building automated triggers and actions.
- [ ] **FE-9.2: Plugin & App Marketplace Directory** — Directory of integrations (Slack, GitHub, Figma, Linear, Stripe) with one-click install buttons.

---
---

# ⚙️ TRACK B: BACKEND TASKS (Django 6.1 LTS, DRF, django-tenants, PostgreSQL, Channels, Celery)

## Phase 0: Scaffolding, Tenancy & Core Infrastructure
- [x] **BE-0.1:** Initialize Django 6.1.2 LTS monorepo backend with `pyproject.toml` and PostgreSQL connection.
- [x] **BE-0.2:** Configure `django-tenants` for schema-level isolation (`public` schema for tenants/users, dynamic schemas for organizations).
- [x] **BE-0.3:** Implement custom User model (`apps.accounts.User`) with UUID primary keys and JWT authentication.
- [x] **BE-0.4:** Implement Organization/Tenant domain routing (`apps.orgs.Organization`, `Domain`).
- [x] **BE-0.5:** Run database migrations for both `public` and `demo` schemas via `python manage.py migrate_schemas`.
- [x] **BE-0.6:** Configure `drf-spectacular` OpenAPI 3.0 generation (`schema.yaml`) with Swagger documentation at `/api/docs/swagger/`.
- [x] **BE-0.7:** Setup ASGI/WSGI entry points in `backend/config/` for asynchronous HTTP and WebSockets.

---

## Phase 1: Project Management, Analytics & Real-Time APIs (ACTIVE PHASE)

### Sprint 1.1: Dashboard Analytics & Metric Aggregators (IMMEDIATE BACKEND TASK)
- [ ] **BE-1.1: Dashboard Summary Endpoint**
  - Implement `GET /api/v1/projects/{id}/dashboard-summary/` returning:
    - Total tasks, active tasks, completed tasks, and completion percentage.
    - Story point burn rate and current sprint velocity.
    - Overdue task count and critical blocker count.
    - Distribution of tasks across statuses and priorities.
- [ ] **BE-1.2: Team Workload Aggregator Service**
  - Implement service method calculating story points and task count per assignee within active sprint.
  - Return capacity percentages and allocation flags.
- [ ] **BE-1.3: Real-Time Activity Log Stream Service**
  - Implement `ActivityLog` model or event audit feed tracking task status changes, assignments, and comments.
  - Expose paginated `GET /api/v1/projects/{id}/activity/`.

### Sprint 1.2: Kanban Endpoints Polish & Real-Time WebSockets
- [x] **BE-1.4: Domain Models (`apps.projects`)**
  - `Project`, `Milestone`, `Epic`, `Story`, `Task`, `Subtask`, `Label`, `Priority`, `Status` (Completed & migrated).
- [x] **BE-1.5: REST ViewSets & Serializers**
  - `ProjectViewSet`, `TaskViewSet`, `MilestoneViewSet`, `EpicViewSet`, `LabelViewSet`, `SubtaskViewSet` (Completed & tested).
- [x] **BE-1.6: Batch Kanban Card Reorder Endpoint**
  - Implement `POST /api/v1/tasks/reorder/` handling bulk positional updates within a transaction.
- [ ] **BE-1.7: Django Channels WebSocket Layer Configuration**
  - Configure `CHANNEL_LAYERS` with Redis backend in `backend/config/settings/base.py`.
  - Create WebSocket routing in `backend/config/asgi.py`.
- [ ] **BE-1.8: Task Kanban WebSocket Consumer**
  - Implement `TaskKanbanConsumer` in `backend/apps/projects/consumers.py`.
  - Broadcast room events: `task.created`, `task.updated`, `task.moved`, `task.deleted` to all active channel subscribers.
- [ ] **BE-1.9: Celery Background Task Assignment Worker**
  - Configure Celery task `dispatch_task_assignment_notification` triggered on `Task.save(update_fields=['assignee'])`.

---

## Phase 2: Documentation (Wiki) Engine Backend
- [ ] **BE-2.1: Document Domain Models (`apps.docs`)** — `Document`, `DocumentRevision`, `DocumentFolder`, `DocumentAttachment` with nested tree hierarchy.
- [ ] **BE-2.2: Document CRUD & Versioning ViewSets** — REST endpoints supporting draft saving, version history logging, and rollback actions.
- [ ] **BE-2.3: OpenSearch / Elasticsearch Full-Text Indexer** — Celery task reindexing document body text on publish for instant sub-200ms searches.
- [ ] **BE-2.4: Presigned S3/MinIO Attachment Upload Service** — Secure URL generator for direct document asset uploads.

---

## Phase 3: Real-Time Chat & Communications Engine Backend
- [ ] **BE-3.1: Chat Domain Models (`apps.chat`)** — `ChatChannel`, `ChannelMembership`, `ChatMessage`, `MessageReaction`, `MessageThread`.
- [ ] **BE-3.2: Django Channels Chat Consumer** — ASGI consumer handling real-time messaging, typing events, and message read receipts.
- [ ] **BE-3.3: Redis Presence Tracker** — Fast in-memory heartbeat tracking online/away status per tenant user.
- [ ] **BE-3.4: Push Notification Trigger** — Celery task dispatching mobile push/email when offline users are `@mentioned`.

---

## Phase 4: Notification Center & Cloud File Manager Backend
- [ ] **BE-4.1: Notification Model & Dispatcher (`apps.notifications`)** — Central notification queue supporting Email (SMTP), In-App, and WebPush.
- [ ] **BE-4.2: File Manager Models (`apps.files`)** — `StoredFile`, `Folder`, `FileShareLink` with storage quota calculation per tenant.
- [ ] **BE-4.3: Secure S3 Storage Connector** — Presigned upload/download URL generation with MIME-type validation.

---

## Phase 5: AI Assistants & LLM Orchestrator Backend
- [ ] **BE-5.1: AI Orchestrator Service (`apps.ai`)** — Abstracted LLM client supporting OpenAI (GPT-4o) and Anthropic (Claude 3.5 Sonnet).
- [ ] **BE-5.2: Sprint & Task Generation Prompt Pipeline** — Structured JSON prompt templates returning validated user stories and acceptance criteria.
- [ ] **BE-5.3: Tenant Token Usage & Rate Limiter** — Usage tracking per tenant to enforce subscription quotas.

---

## Phase 6: Git, Commits & CI/CD Integrations Backend
- [ ] **BE-6.1: Webhook Ingress Controller (`apps.integrations`)** — Secure webhook endpoint for GitHub/GitLab events (push, pull_request, workflow_run).
- [ ] **BE-6.2: Issue Key Parser & Linker Service** — Regex parser linking Git commit SHAs and PR numbers to `apps.projects.Task` (e.g. `NEX-101`).

---

## Phase 7: CRM, Time Tracking & HR People Engine Backend
- [ ] **BE-7.1: Time Tracking Models & ViewSets (`apps.timetracking`)** — `TimeEntry`, `Timesheet` with start/stop timer actions.
- [ ] **BE-7.2: CRM Pipeline Models (`apps.crm`)** — `Lead`, `Contact`, `Company`, `Deal`, `DealStage` with sales stage transition rules.
- [ ] **BE-7.3: HR Employee Records (`apps.hr`)** — `EmployeeProfile`, `TimeOffRequest`, `Asset` with approval workflows.

---

## Phase 8: Analytics, Billing & Enterprise Administration Backend
- [ ] **BE-8.1: Stripe Billing Integration (`apps.billing`)** — Stripe webhook consumer, subscription synchronization, and customer portal session generator.
- [ ] **BE-8.2: Immutable Audit Log Middleware** — Global request logger capturing write operations with user, tenant, IP, and timestamp.
- [ ] **BE-8.3: Enterprise SAML 2.0 / OIDC SSO Connector** — Single Sign-On provider integration for Okta, Azure AD, and Google Workspace.

---

## Phase 9: Workflow Automation Engine & Marketplace Backend
- [ ] **BE-9.1: Event Trigger & Action Evaluator (`apps.automation`)** — Dynamic rule engine parsing `trigger -> condition -> action` trees on domain events.
- [ ] **BE-9.2: Plugin Manifest Validator & Marketplace API** — Third-party app registration and permission-scoped API token generator.
