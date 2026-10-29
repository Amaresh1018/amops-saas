# Living Project Memory: amops

This document preserves historical context, architectural decisions, and current execution state. It is updated across engineering sessions to prevent duplicate codebase exploration and retain continuity.

---

## Current State

### 2026-10-29 — final brand: amops

- User selected `amops`. Applied lowercase branding to landing header/footer/copy, page metadata, current project documentation, Python project metadata, API title/description, and backend service label. Updated sample frontend ticket keys to AMP and the workspace monogram to `a`.
- Preserved historical memory entries, the physical workspace path, documentation filenames/links, database/container identifiers, credentials, and existing account email addresses. These are compatibility identifiers, not public branding; no infrastructure/data migration was performed.

### 2026-10-29 — Fiber/Three.js clock compatibility

- Traced repeated `THREE.Clock` deprecation warnings to Fiber 9.8.2's internal `new THREE.Clock()` at canvas creation, not to application animation code. npm still reports 9.8.2 as the stable Fiber release.
- Pinned `three` and `@types/three` exactly to 0.182.0, before the Clock deprecation in r183. This is a compatibility workaround, not a Timer migration; no console filtering, node_modules patch, or alpha upgrade used.
- Added a browser regression assertion that canvas mount and remount emit no Clock deprecation warning. Revisit the pin once stable Fiber replaces its internal Clock.
- Upstream context: https://github.com/pmndrs/react-three-fiber/issues/3741 and https://threejs.org/docs/pages/Clock.html.
- Shiploom is a naming candidate only. No rename or domain/trademark availability claim made.

### 2026-10-29 — duplicate hero controls removed

- Consolidated the hero's static stage labels and separate external selector into one clickable, keyboard-accessible stage row inside the graphic. Removed the external row and its unused responsive CSS.
- Selection still pauses playback and updates the shared story; pause/replay controls remain in the graphic footer.

### 2026-10-29 — frontend cleanup

- Audited static and dynamic imports from application entry points; retained the OpenAPI client/types as intentional backend-integration scaffolding.
- Deleted 28 unreachable TSX files: 16 superseded landing sections, six old graphics/motion helpers, and six unused UI components. Deleted five unreferenced Next.js starter SVGs (33 files total).
- Removed seven unused direct dependencies: `motion`, `framer-motion`, `@tanstack/react-query`, `zustand`, `@radix-ui/react-select`, `@radix-ui/react-tabs`, and `@radix-ui/react-tooltip`. npm removed 12 packages including transitive dependencies; its audit reported zero vulnerabilities. R3F's own transitive Zustand remains managed by npm where needed.
- Removed unused global marquee/grid/laser styles, the obsolete landing progress-marker CSS, unused `apiStatus` prop and secondary-button option. Converted unused availability-date export to a source comment and replaced the starter frontend README with project-specific instructions.
- No `.git` directory was present during cleanup. Deleted files, dependency manifests/lockfile, and relevant styles were copied first to `C:/Users/iamar/AppData/Local/Temp/nexus-cleanup-2026-10-29`. No backend files, product docs, environment files, or existing user deletions were removed/restored.
- Production build (including TypeScript), full frontend ESLint, and dependency-tree validation passed. Historical notes below that mention retained legacy files or installed Motion/Query packages describe earlier states and are superseded by this cleanup.
- All 11 browser regression tests passed against the cleaned production build, including preview navigation, both themes, responsive layouts, fallback behavior, and animation controls.

### 2026-10-29 — visible animation correction

- User feedback: the original Three.js enhancement was not visibly explaining the product. Its thin connection and sub-second marker movement were obscured by opaque HTML cards.
- Replaced the hidden ring/line treatment with an exposed, lit 3D handoff stage beneath the artifacts. The selected stage lifts and the context marker travels between stages; HTML labels and corresponding brief/discussion/PR/client-update cards explain the change.
- Added five-second automatic story progression, pause/play, replay, and pause-on-manual-selection. Offscreen/hidden-tab and reduced-motion gating remain; mobile retains the HTML story.
- Rebuilt production output; scoped lint passed. Eleven browser tests pass, including automatic progression, manual pause, replay, and canvas lifecycle. Inspected desktop hero and mobile full-page screenshots. The earlier performance measurements describe the previous implementation; this revision was not rebenchmarked.

### 2026-10-29 — landing page implemented

- Rebuilt the active `LandingPage` around a connected project: brief → task → discussion → pull request → client update. Added grouped product modules, shared foundations, architecture, honest roadmap, and working preview CTAs.
- Shared story/module data lives in `features/landing/content.ts`; hero and walkthrough use one state controller. Reused Button and ThemeToggle. CSS Module uses the global semantic palette and Geist fonts; light secondary-text token darkened to `#626976` after contrast checking (previous token failed 4.5:1 on the secondary panel).
- Added one dynamically imported R3F connection illustration, with on-demand animation, capped DPR, offscreen/hidden-tab gating, context-loss handling, and HTML fallback. Mobile/reduced-motion bypass the canvas. No decorative animation libraries added.
- Dependencies: `@react-three/fiber` 9.8.2 and `three` 0.186.1 (MIT; current registry releases checked, React peer range >=19 <19.4 matches installed 19.3.1); `@types/three` for TypeScript. Added `@playwright/test` as a development dependency for repeatable landing validation. Existing user package changes and both existing motion packages were preserved.
- Fixed existing Turbopack CSS rule to exclude `*.module.css`. Its forced global CSS handling stripped the module class mapping; screenshots caught the issue, and browser tests now assert heading styles load.
- Removed the hardcoded backend-health fetch from the public page/standalone preview. Added sample-data notice. Fixed browser back/forward navigation through the existing query-param store. Preview navigation does not require a backend.
- Validation: production build and TypeScript pass; ESLint passes for changed TS/TSX/config/test/measurement files. Ten Playwright tests pass: story controls, theme persistence, preview/history/return, six viewport/theme combinations, reduced-motion keyboard operation, unavailable WebGL fallback, and desktop canvas/offscreen lifecycle. No page errors or backend requests in the navigation test.
- Inspected full-page renders at 390px, 768px, and 1440px in light/dark. No horizontal overflow; mobile uses readable stacked HTML artifacts. These are Chromium checks, not a cross-browser or physical-device certification.
- Local performance (single cold-context run, Chromium, Windows host, production localhost server, 4x CPU throttle, 1.6Mbps down/750Kbps up, 150ms latency): mobile LCP 1752ms / CLS 0.01051 / JS 201008 encoded bytes; desktop HTML LCP 1900ms / CLS 0.000063 / JS 201008 bytes; desktop enhanced LCP 1964ms / CLS 0.000032 / JS 443495 bytes. Enhanced desktop adds ~242KB encoded JS. Mobile bypasses that enhancement. Targets met in this run; field performance and repeat-run statistical confidence are not claimed.
- Reproduce: `npm run build`, `npm run test:landing`; for lab measurements run production server on port 3100 then `node scripts/measure-landing.mjs`. Screenshot/trace artifacts are ignored under `frontend/test-results/`.
- Browser software-renderer warnings and Three.js's upstream Clock deprecation warning may appear; no application exceptions were observed in normal navigation. Old landing source files are disconnected but retained; no user deletions restored. No deployment, pricing activation, backend module release, or Figma publication performed.

### 2026-10-27 — product-led landing specification

- Reviewed the product, architecture, roadmap, engineering, design, and landing documents.
- Replaced the hardware-themed landing blueprint with a connected-project story: brief, task, discussion, code activity, client update.
- Recommended initial positioning for small software teams/agencies while retaining the broader business/enterprise vision.
- Standardized design guidance on the existing semantic indigo palette, Geist/Geist Mono, and supported light/dark modes.
- Added root `AGENTS.md` and recurring reuse/content-truth rules. Removed mandatory hardware spectacle and unsupported telemetry guidance from the active design specification.
- Proposed one lazy R3F hero enhancement with an accessible HTML baseline; no dependencies installed and no frontend implementation changed in this documentation pass.
- Implementation, compatibility checks, rendered visual review, and performance measurement are pending in `tasks.md`.
- Historical runtime/test statements below were not reverified. Roadmap completion does not establish current public availability. User-deleted `prins3_design_language.md` remains deleted.

### Historical snapshot — 2026-10-12

- **Last Updated:** 2026-10-12
- **Current Phase:** **Phase 1 — Project Management, Kanban & Executive Dashboard Engine**
- **Overall Status:** **Active Implementation** (Both servers running: Django 6.1 LTS on `127.0.0.1:8000` with `django-tenants` and migrated `demo` schema; Next.js 16.4 on `localhost:3000` with Turbopack, 0 hydration errors, 0 compilation warnings).

---

## What Has Been Completed

### 1. Foundation & Multi-Tenancy (Phase 0 — Complete)
- **Monorepo Architecture:** Structured into `backend/`, `frontend/`, `infra/`, `docs/`, and `.agents/skills/`.
- **Database Multi-Tenancy:** PostgreSQL schema isolation via `django-tenants`. Both `public` and `demo` tenant schemas are migrated (`migrate_schemas`).
- **Core Apps & Models:** Custom UUID User model (`apps.accounts`), Organization/Tenant hierarchy with domain routing (`apps.orgs`), and core base classes (`apps.core`).
- **Automated OpenAPI Pipeline:** `drf-spectacular` generating OpenAPI 3.0 specification (`schema.yaml`) with Swagger UI at `/api/docs/swagger/` and typed TypeScript definitions generated into `frontend/src/lib/api/schema.d.ts`.
- **CI/CD:** Automated GitHub Actions workflow (`.github/workflows/ci.yml`) for linting, typing, and unit test validation.

### 2. Design System & Frontend Architecture (Phase 1 — In Progress)
- **Universal Enterprise Theme Engine (NUDL):** Fully calibrated `.dark` and `:root` HSL tokens configured in `frontend/src/app/globals.css`.
  - Dark Canvas: `#0B0C0E` (Obsidian), Card `#12141A`, Popover `#171922`, Borders `rgba(255, 255, 255, 0.08)`.
  - Light Canvas: `#F7F8FA`, Card `#FFFFFF`, Borders `#E5E7EB`.
  - Primary Accent: `#5E6AD2` (Soft electric indigo, Linear-grade).
- **Bespoke Digital Craftsmanship & Editorial Creative Architecture (`frontend/src/features/landing/`):**
  - **AuthKit Theatrical Overhead Conical Spotlight:** Conical light beam shining from top center down through the hero canvas, illuminating the core DevOS workspace.
  - **AuthKit-Tier Silicon Motherboard Chassis (`MotherboardDiagram.tsx`):** Central microprocessor die with golden pins, glowing core socket, and interactive peripheral chips (U1-SQL, U2-ASGI, U3-FLOW, U4-NPU) with live diagnostic socket readouts.
  - **Hardware Graphic Subsystems (`HardwareGraphicsGrid.tsx`):** 360° sweeping Radar Sonar Scanner (`RadarSonar.tsx`), Hardware Cryptographic Enclave Keypad (`HardwareKeypad.tsx`), multi-region server chassis, and optimistic cache visualizer.
  - **Atmospheric Depth & Film Grain:** Implemented `FilmGrain.tsx` (hardware-accelerated SVG `feTurbulence` noise) and `.bg-blueprint-grid` with architectural registration crosshairs (`+ [LOC: ...]`), eliminating flat digital plastic aesthetics.
  - **Asymmetrical Editorial Hero:** Persona Studio-tier high-contrast typography ("THE OPERATING SYSTEM FOR *High-Velocity Teams*"), real-time latency readouts, and tactile CLI command bar.
  - **Refractive Specular Glass (`SpotlightCard.tsx`):** Mouse-tracking radial spotlight shader with top-down directional specular bevels (Recent Design / Aave standard).
  - **The Living Blueprint (`InteractiveSchemaMatrix.tsx`):** Interactive PostgreSQL schema routing simulator with animated photon circuit pulses (`animate-laser`) demonstrating physical schema boundaries and streaming real-time audit logs.
  - **Institutional Telemetry Matrix (`SystemTelemetry.tsx`):** Audited technical benchmarks (PostgreSQL schema vs shared SQL table, GDPR `DROP SCHEMA CASCADE`, sub-15ms Redis broadcast latency).
  - **Dynamic Resource Estimator (`PricingSection.tsx`):** Interactive team capacity slider (2 to 150 engineers) dynamically calculating runtime cost, schema allocations, and AI tokens across 3 transparent tiers.
  - **Seamless Navigation:** Dual-mode state in `page.tsx` transitioning between the marketing presentation and live DevOS workspace.
- **Theme Switching:** Dynamic, flicker-free light/dark/system mode switching with persistent storage via `next-themes` and animated Sun/Moon toggle.
- **shadcn/ui Component Suite:** Implemented unstyled primitives in `frontend/src/components/ui/`: `dialog`, `dropdown-menu`, `card`, `badge`, `separator`, `tooltip`, `avatar`, `button`, `input`, `textarea`, `tabs`.
- **Strict Icon Standard:** Mandated **Lucide Icons (`lucide-react`)** across all components with standardized stroke (`1.75px`) and dimensional tokens (`h-3.5 w-3.5`, `h-4 w-4`, `h-5 w-5`). Prohibited mixing with other icon packs.
- **Zero Hydration Mismatches & Clean Turbopack Build:** Verified with `npm run build` and live browser subagent inspection (0 hydration mismatches, 0 errors).
- **Collapsible Rail Navigation:** Overhauled sidebar header to prevent button collisions when collapsed: clean 32×32px centered brand mark that reveals expand icon on hover, plus header breadcrumb toggle.
- **Rocket SaaS Motion Architecture:** Reverse-engineered and codified high-converting motion design patterns into `.agents/skills/rocket-saas-motion-design/SKILL.md` and `docs/design.md`.

### 3. Project Management, Kanban & Executive Dashboard (Phase 1 — In Progress)
- **Executive Command Center Dashboard (`frontend/src/features/dashboard/`):**
  - KPI Stat Cards: Sprint Velocity (+18.4%), Sprint Completion (68%), Active Team Capacity (84%), Critical Blockers (0 open).
  - Interactive Sprint Burndown Visualizer: SVG burndown chart with ideal guideline vs actual burn curve and hoverable day data points.
  - Team Workload Heatmap: Capacity allocation matrix, progress bars, and limit warnings per team member.
  - Real-Time Live Activity Stream: Engineering event pulse feed with monospace ticket keys (`NEX-101`) and event-specific status icons.
- **Backend Domain Models (`apps.projects`):** `Project`, `Milestone`, `Epic`, `Story`, `Task`, `Subtask`, `Label`, `Priority`, `Status`.
- **DRF Endpoints & Tests:** `ProjectViewSet`, `TaskViewSet`, `MilestoneViewSet`, `EpicViewSet`, `LabelViewSet`, `SubtaskViewSet` with batch Kanban card reordering (`/api/v1/tasks/reorder/`). Verified 5/5 passing pytest tests.
- **Kanban Board UI (`frontend/src/features/kanban/`):** Interactive column layout, status icons, story points, due dates, task cards with optimistic drag reordering.
- **Linear-Grade Micro-Typography:** Vertical signal-bar audio-meter priority indicators (Urgent red alert, High 3 bars, Med 2 bars, Low 1 bar) and monospace ticket IDs (`NEX-101`).

---

## What Has NOT Been Completed Yet

1. **Frontend-to-Backend Live API Wiring (Immediate Priority):**
   - The Kanban board and dashboard currently operate with mock and local state; TanStack Query (`@tanstack/react-query`) hooks need to be hooked up to `GET /api/v1/tasks/`, `POST /api/v1/tasks/`, and `PATCH /api/v1/tasks/{id}/`.
2. **Real-Time Board Sync (WebSockets):**
   - Live multi-user card drag reflection across active browser windows via Django Channels is not yet implemented.
3. **Celery Task Assignment Notifications:**
   - Background worker task dispatch for email and in-app assignment alerts is planned.

---

## Important Architectural Decisions (Log)

| Decision | Date | Rationale | Context / Impact |
| :--- | :--- | :--- | :--- |
| **PostgreSQL Schema-based Multi-Tenancy** | 2026-10-07 | Balance strict data isolation with manageable infrastructure cost. | Uses `django-tenants`; global tables in `public` schema, tenant models in separate schemas. |
| **Modular Monolith in Monorepo** | 2026-10-07 | Avoid premature microservice overhead while enforcing domain boundaries. | Shared repo for `backend/`, `frontend/`, `infra/`; atomic commits and unified CI. |
| **Contract-First Type Sync** | 2026-10-07 | Eliminate manual type sync between Python and TypeScript. | `drf-spectacular` exports OpenAPI 3 spec; `openapi-ts` generates typed TS client. |
| **Universal Enterprise Theme Engine (NUDL)** | 2026-10-09 | Deliver an Awwwards / Linear-grade visual experience without copying proprietary assets. | Obsidian dark mode (`#0B0C0E`), crisp light mode (`#F7F8FA`), electric indigo accent (`#5E6AD2`). |
| **Strict Lucide Icon Mandate** | 2026-10-09 | Guarantee optical alignment, stroke weight balance, and uniform design language. | All UI components strictly use `lucide-react`; other icon sets prohibited. |
| **Rocket SaaS Motion Design System** | 2026-10-09 | Create high-converting, fluid micro-animations for enterprise SaaS dashboards. | Codified into `.agents/skills/rocket-saas-motion-design/SKILL.md`. |

---

## Recent Changes Log

| Date | Description | Author / Agent |
| :--- | :--- | :--- |
| **2026-10-12** | Exhaustively updated documentation suite (`project.md`, `phases.md`, `memory.md`, `architecture.md`) reflecting completed vs pending work, detailing the upcoming Executive Dashboard Engine priority. | Antigravity AI Agent |
| **2026-10-09** | Reverse-engineered `rocket-saas.io` animation and styling architecture; codified into new workspace skill `.agents/skills/rocket-saas-motion-design/SKILL.md` and added Section 12 to `docs/design.md`. | Antigravity AI Agent |
| **2026-10-09** | Fixed collapsed sidebar button collision artifact `[N][◨]` by introducing a single centered brand button with hover expand indicator and top header breadcrumb expand toggle. | Antigravity AI Agent |
| **2026-10-09** | Enforced strict Lucide icon standard (`lucide-react`) across `docs/design.md`, `docs/rules.md`, `docs/project.md`, and `docs/architecture.md`. | Antigravity AI Agent |
| **2026-10-09** | Eliminated console hydration error caused by browser extension attribute injection (`cz-shortcut-listen`) and dynamic runtime dates; added `suppressHydrationWarning` and deterministic ISO timestamps. | Antigravity AI Agent |
| **2026-10-09** | Implemented Universal Enterprise Color System (NUDL) with dark/light themes via `next-themes`, Linear-grade signal priority bars, and full `shadcn/ui` component suite. | Antigravity AI Agent |
| **2026-10-08** | Built Phase 1 interactive Drag-and-Drop Kanban Board UI (`frontend/src/features/kanban/`) and backend models (`apps.projects`). Migrated `demo` schema, exported OpenAPI spec, and verified 5/5 passing pytest tests. | Antigravity AI Agent |
| **2026-10-07** | Scaffolded Phase 0 foundation: Django 6.1.2 LTS backend with `django-tenants`, DRF, accounts/orgs apps, Next.js 16.4 App Router frontend, and Docker Compose stack. | Antigravity AI Agent |
| **2026-10-29** | Connected the amops workspace to the new GitHub repository baseline; added a locked Python dependency graph, CI checks, production container builds, and GHCR image delivery. Provider-specific deployment is pending a hosting target. | Codex |
| **2026-10-29** | Stabilized hosted CI on Ubuntu 24.04, scoped Ruff to core correctness checks, and bundled licensed Geist font files locally so clean Next.js builds do not fetch fonts at build time. | Codex |

---

## Next Planned Actions

1. **Design & Build the Executive Command Center Dashboard:**
   - Create high-impact overview page (`frontend/src/features/dashboard/`) with:
     - 4 KPI metric cards (Active Sprints, Issue Velocity, Team Capacity, Open Blockers) with trend sparklines.
     - Interactive Sprint Burndown & Velocity chart.
     - Workload Distribution & Team Capacity heatmap.
     - Live Real-Time Activity Pulse feed.
     - Rocket SaaS staggered scroll reveal animations.
2. **Wire Frontend to Live Django Backend API:**
   - Connect TanStack Query to `GET /api/v1/projects/` and `GET /api/v1/tasks/` for both the Dashboard and the Kanban board.
3. **Real-Time Live WebSockets:**
   - Implement Django Channels consumer for instant multi-user board and dashboard updates.
