# amops frontend

Next.js application with a product landing page and a sample-data workspace preview.

## Local development

Run commands from this directory:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The landing page and preview do not require the backend.
The workspace preview uses local sample data; changes are not persisted to a server.

## Validation

```sh
npm run lint
npm run build
npx playwright install chromium
npm run test:landing
```

Browser tests start a production server on port 3100 if one is not already running.
Stop an older server before testing a newly built version.

To measure local production performance, start `npm run start -- --port 3100`
and run `node scripts/measure-landing.mjs` in another terminal.
Measurements are lab observations, not field-performance guarantees.

## Code ownership

- `src/features/landing/`: page composition, shared story/module data, responsive CSS,
  accessible walkthrough, and lazy React Three Fiber enhancement.
- `src/features/dashboard/` and `src/features/kanban/`: workspace preview.
- `src/components/ui/`: shared UI primitives currently used by the app.
- `src/lib/api/`: retained OpenAPI client foundation. Regenerate types with
  `npm run generate:api` after exporting `backend/schema.yaml`.
- `tests/`: landing navigation, appearance, motion, and fallback checks.

Read [project rules](../docs/rules.md), [design standards](../docs/design.md), and
[landing blueprint](../docs/landing_page_blueprint.md) before UI changes.
The current animation uses CSS and React Three Fiber; Motion/Framer Motion are not installed.
Three.js and `@types/three` are pinned to 0.182.0 while Fiber 9.8.2 internally
constructs `THREE.Clock`. Three.js r183+ deprecates that API. This compatibility
pin avoids the warning without filtering the console or patching dependencies.
Revisit it when a stable Fiber release migrates its internal clock; validate scene
timing and mount/unmount behavior before upgrading both packages together.
TanStack Query and a direct Zustand dependency can be introduced when real API wiring needs them.
