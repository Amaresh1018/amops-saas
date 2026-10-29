# Project: amops DevOS

## Project Overview

- **Project Name:** amops (amops Developer OS / Business Operating System)
- **One-line Description:** A unified, modular, multi-tenant business and developer operating system integrating project management, collaboration, AI assistance, CRM, and DevOps observability into a single platform.
- **Problem Being Solved:** Modern development and product teams suffer from fragmentation across disparate SaaS tools (Jira for tracking, Slack for chat, Notion for docs, GitHub for code, HubSpot for CRM, Stripe for billing). This fragmentation causes siloed context, high licensing costs, context switching, and fragmented data models.
- **Main Objective:** Provide an extensible all-in-one platform powered by a robust Core Platform Engine and 20 specialized engines, delivering native multi-tenancy, cross-module data flow, and AI acceleration.
- **Current Project Status:** **Active Implementation (Phase 1 In Progress)**
  - **Phase 0 (Foundation & Multi-Tenancy):** **Completed** — Monorepo setup, Django 6.1 LTS + PostgreSQL schema multi-tenancy (`django-tenants`), `public` and `demo` tenant schemas migrated, DRF OpenAPI 3.0 / drf-spectacular integration, and GitHub Actions CI.
  - **Phase 1 (Project Management & Kanban):** **In Progress** — Backend models (`Project`, `Milestone`, `Epic`, `Task`, `Subtask`, `Label`) & ViewSets implemented and tested; Next.js 16 drag-and-drop Kanban UI completed with `shadcn/ui`, Linear-grade signal priority indicators, dark/light theme engine, and Rocket SaaS motion design.
  - **Immediate Priority:** **Executive Command Center & Dashboard Engine** — Building a high-impact, modern visual dashboard (KPI metrics, sprint burndown, workload distribution, real-time activity stream, and motion design cards).

### Core Technology Stack

| Layer | Primary Technologies | Purpose / Role |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 16 (App Router) + React 19** | Server/Client rendering, routing, Turbopack bundling |
| **UI Component System** | **shadcn/ui (Radix UI Primitives)** | Accessible, composable, unstyled UI primitives under `src/components/ui/` |
| **Styling & Design** | **Tailwind CSS v4 + amops Design Language (NUDL)** | Bespoke HSL design tokens, utility-first styling, dark/light modes |
| **Motion Design** | **Rocket SaaS Motion Engine (`.agents/skills/`)** | Scroll reveals, infinite marquees, container squeeze, micro-interactions |
| **State & Data Fetching** | **TanStack Query + Zustand** | Server state caching, optimistic UI updates, client store |
| **Iconography** | **Lucide Icons (`lucide-react`)** | Standardized, accessible SVG icon library (MANDATORY across all UI modules) |
| **Backend Framework** | **Django 6.1 LTS + Django REST Framework** | Core API, business logic, ORM, contract-first OpenAPI export |
| **Multi-Tenancy** | **django-tenants** | Strict PostgreSQL schema-level tenant data isolation |
| **Database & Cache** | **PostgreSQL 17 + Redis 7** | Relational storage, tenant schemas, caching, Celery broker |

---

## Target Users

| Persona | Role / Description | Core Needs | Primary Objectives |
| :--- | :--- | :--- | :--- |
| **Engineering Leads & Devs** | Software engineers, tech leads, engineering managers | Unified issue tracking, Git/CI visibility, real-time discussions, and docs linked to code | Trace tasks from PR to deployment, review sprint health, automate workflows |
| **Product Managers & Scrum Masters** | PMs, delivery managers, product owners | Roadmaps, Kanban boards, sprint estimation, requirement documentation | Manage backlogs, prioritize user stories, analyze sprint velocity |
| **Cross-Functional Teams (Ops, HR, Sales)** | Operations managers, sales reps, HR personnel | Lightweight CRM deals, team directory, time tracking, shared company wiki | Log client interactions, track billable hours, access internal SOPs |
| **Organization Administrators** | Platform admins, workspace owners, enterprise buyers | Tenant administration, RBAC, SSO/SAML enforcement, audit logs, billing management | Enforce data isolation, provision workspace members, control licensing and quotas |
| **External Clients / Guests** | Clients, contractors, external stakeholders | Restricted visibility into select projects, deliverables, and invoices | Review project deliverables, upload assets, approve invoices securely |

---

## Core Features

### Status Legend
- **Implemented:** Code exists, verified, and running in the workspace.
- **Partially Implemented:** Functional implementation or scaffolding exists in the workspace.
- **Planned:** Architected and documented, pending implementation.

### Feature Matrix

| Feature / Engine | Status | Description & Purpose | Target Module / Location |
| :--- | :--- | :--- | :--- |
| **Core Platform Engine** | **Partially Implemented** | Multi-tenant foundation, auth models, tenant routing (`django-tenants`), public & demo schemas migrated, health check APIs. | `backend/apps/core/`, `backend/apps/accounts/`, `backend/apps/orgs/` |
| **Workspace & Teams** | **Partially Implemented** | Organization/Tenant hierarchy, domain routing, schema context isolation, workspace switcher UI. | `backend/apps/orgs/`, `frontend/src/app/` |
| **Project Management** | **Partially Implemented** | Full lifecycle models (Projects, Milestones, Epics, Tasks, Subtasks, Labels) & DRF ViewSets with batch reorder. | `backend/apps/projects/` |
| **Kanban / Boards** | **Partially Implemented** | Interactive drag-and-drop Kanban board UI, Linear-style signal priority badges, task modals, column counters. | `backend/apps/projects/`, `frontend/src/features/kanban/` |
| **Executive Dashboard** | **Planned (Immediate Priority)** | Command center with KPI metric cards, sprint health, velocity charts, workload distribution, and live activity feed. | `frontend/src/features/dashboard/`, `backend/apps/analytics/` |
| **Documentation (Wiki)** | Planned | Collaborative rich-text and Markdown knowledge authoring with nested pages, version history, and attachments. | `backend/apps/docs/`, `frontend/src/features/docs/` |
| **Chat & Real-Time Comms** | Planned | Real-time channels, direct messages, message threads, reactions, presence tracking via WebSockets. | `backend/apps/chat/`, `frontend/src/features/chat/` |
| **AI Assistants** | Planned | LLM integration (OpenAI/Claude) for automated sprint generation, task breakdown, document summarization, and standups. | `backend/apps/ai/`, `frontend/src/features/ai/` |
| **Git & CI/CD Integration** | Planned | SCM connectors (GitHub/GitLab) and pipeline trackers (GitHub Actions) linking commits, PRs, and builds to tasks. | `backend/apps/integrations/` |
| **Monitoring & Metrics** | Planned | System and application observability (Prometheus/Grafana, Sentry) exposing metrics, latency, and queue depths. | `backend/apps/monitoring/`, `infra/monitoring/` |
| **Time Tracking** | Planned | Clock-in/out timers, task-specific time logging, timesheet approvals, and billable hour calculations. | `backend/apps/timetracking/` |
| **HR / People** | Planned | Employee profiles, leave requests, attendance logging, and basic workforce asset tracking. | `backend/apps/hr/` |
| **CRM & Sales** | Planned | Lead capture, contact lists, deal stages, activity feeds, and sales opportunity pipelines. | `backend/apps/crm/` |
| **Client Portal** | Planned | Scoped external client view for task tracking, file review, feedback, and invoice settlement. | `backend/apps/client_portal/` |
| **Knowledge Base / FAQ** | Planned | Public/private documentation repository for FAQs, customer-facing guides, and standard operating procedures. | `backend/apps/kb/` |
| **Notification Center** | Planned | Centralized dispatch for in-app badges, email (SMTP), WebPush, and third-party webhooks. | `backend/apps/notifications/` |
| **File Manager** | Planned | Cloud object storage explorer (S3/MinIO) supporting folders, versioning, quotas, and preview generation. | `backend/apps/files/` |
| **Analytics & Reporting** | Planned | Cross-module BI dashboards (burndown, team velocity, revenue, utilization) with CSV/PDF export. | `backend/apps/analytics/` |
| **Billing & Subscriptions** | Planned | Tiered SaaS subscription management, Stripe integration, payment hooks, and tenant usage quotas. | `backend/apps/billing/` |
| **Automation Engine** | Planned | Rule-based event-trigger engine (Trigger -> Condition -> Action) for cross-module automations. | `backend/apps/automation/` |
| **Marketplace & Plugins** | Planned | Third-party extension registry, webhook connectors, and partner plugin integrations. | `backend/apps/marketplace/` |

---

## Product Scope

### Included in Scope
- **Multi-Tenant Architecture:** Strong isolation using PostgreSQL schemas per organization with shared public schemas for identity.
- **Unified Workspace Experience:** Single dashboard and UI design system covering projects, docs, chat, and settings.
- **Cross-Engine Event Bus:** Domain event publishing to decouple side-effects (e.g., task creation triggers notifications, search reindexing, and audit logs).
- **Contract-First APIs:** RESTful APIs with automated OpenAPI generation and typed client generation for the frontend.
- **Role-Based Access Control (RBAC):** Granular permissions per tenant, workspace, project, and document.
- **Tiered Monetization:** Feature gating across Free, Pro, and Enterprise subscription tiers.

### Explicitly Out of Scope
- **Standalone On-Premise Hardware Appliances:** amops is delivered as containerized cloud software (or self-hosted Docker/K8s), not proprietary hardware.
- **Full Accounting / ERP Replacement:** amops provides basic invoicing and time-billing hooks, not general ledger accounting or tax compliance engine replacement.
- **Full Video Conferencing Infrastructure:** amops supports chat, presence, voice notes, and integration with third-party tools (Zoom, Google Meet), but will not host proprietary WebRTC mesh/SFU video conferencing servers in the initial scope.
- **Public Social Media Publishing:** Social scheduling and consumer social networks are outside core B2B DevOS scope.

---

## Key User Journeys

### 1. Workspace Onboarding & Tenant Creation
```text
User Signs Up (Email/OAuth)
  ↓
Creates Organization / Workspace (Tenant Schema Provisioned)
  ↓
Invites Team Members with Defined Roles (Owner, Admin, Member)
  ↓
Arrives at Workspace Dashboard
```

### 2. Project Execution & Sprint Workflow
```text
Select Workspace
  ↓
Create Project & Milestones
  ↓
Add Tasks / User Stories (Optionally invoke AI Assistant for breakdown)
  ↓
Move Tasks on Drag-and-Drop Kanban Board
  ↓
Link Git Commits / Pull Requests via Webhooks
  ↓
Complete Task (Triggers Event Bus -> Notifications, Audit Log, Search Reindex)
```

### 3. Knowledge Base & Document Collaboration
```text
Navigate to Wiki / Docs Engine
  ↓
Create Nested Document Page
  ↓
Author Content using Rich Text / Markdown Editor
  ↓
Save Revision (Auto-indexed in OpenSearch / Elasticsearch)
  ↓
Request AI Summary or Share with Workspace Members
```

### 4. Real-Time Team Communication
```text
Open Chat Channel or Direct Message
  ↓
Send Real-Time Message / File Attachment via WebSocket
  ↓
Mention Teammate (@username)
  ↓
Notification Center Routes Alert (In-App Badge + Email Fallback)
```
