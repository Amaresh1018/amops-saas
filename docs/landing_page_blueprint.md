# amops landing page — product story and build specification

Updated: 2026-10-27. Replaces the previous hardware-themed specification.
Status: implemented and locally validated on 2026-10-29. See `memory.md` for checks, measurements, and limits. This is not a deployment or a release of the planned product modules.

## Product and positioning

amops is a modular workspace for software teams: project delivery, team knowledge,
conversations, and business operations share organizational context through identity,
permissions, search, notifications, files, and events.

Sources: [executive summary](executive_summary.md), [implementation plan](nexus_implement_plan.md),
[product scope](project.md), and [architecture](architecture.md). Vision is not release evidence.

Recommended initial audience: small software teams and agencies. Their project-to-client
workflow provides a concrete story and reason to pay. The broader enterprise roadmap remains.
Within a few seconds, visitors must understand what amops does, who it helps, how its
modules connect, and what they can actually try today.

## Hero copy and composition

Eyebrow: **The connected workspace for software teams**

Headline: **From first brief to final delivery. One connected workspace.**

Supporting copy: **amops is being built to connect projects, docs, conversations,
code activity, and client work—so your team can follow the work without losing its context.**

Primary action: **Explore the preview**, opening the existing workspace demo after its
navigation is verified. Label sample data at the destination.
Secondary action: **See how it connects**, linking to the walkthrough.
Do not show signup, waitlist, sales, or payment controls without working destinations.

Use left-aligned copy and a large dimensional workspace illustration on desktop.
Stack the illustration below the copy on mobile. Spacious typography, restrained indigo,
and layered product surfaces should provide the visual identity.

## Signature graphic: one project, connected work

Follow **Customer portal launch**, task **NEX-104**, throughout the page.
Label the entire sequence **Illustrative workflow**. It is a product concept, not live activity.

Arrange a brief, task, conversation, pull request, and client update around a shared
workspace layer. Keep the task identifier visible as steps change. Each connection
must explain where context is reused.

| Step | Action | Graphic transition | Meaning |
| --- | --- | --- | --- |
| Plan | Select a requirement | Brief and task align; a link connects them | Keep the reason for the work beside the task. |
| Collaborate | Select the task discussion | Conversation moves into focus; task stays anchored | Decisions remain connected to relevant work. |
| Deliver | Select a linked pull request | Code activity joins the task; review state appears | Follow implementation alongside delivery progress. |
| Run the business | Select the project summary | Client update and sample time entry appear | Connect delivery to client visibility and billable work. |

Use HTML step buttons with selected states, visible focus, and readable captions outside
the canvas. A short opening transition may play once; the settled state must be immediately
useful. The visible hero now advances through the four handoffs every five seconds,
with pause/play and replay controls. Manual step selection pauses automatic playback.
Playback stops when offscreen, in a hidden tab, or when reduced motion is requested.
The desktop 3D stage is exposed below the cards: connected plates lift to show the
active workflow stage while a marker moves between them. Labels remain HTML.
On mobile, use stacked readable panels driven by the same data. No scroll hijacking,
required dragging, hover-only explanations, or shrinking desktop text to fit.

## Page sequence

| Order | Section | Content |
| --- | --- | --- |
| 1 | Navigation | Product, Workflow, Roadmap, theme toggle, preview action; real anchors only. |
| 2 | Hero | Product definition and connected-project illustration. |
| 3 | One project, every handoff | Four-step walkthrough with concrete explanations. Reuse the story data. |
| 4 | Start with delivery. Grow into operations. | Three module groups with explicit availability labels. |
| 5 | Shared foundations | Organization context, identity, permissions, events, search, files, notifications. |
| 6 | Built for developers. Designed to grow with your team. | API-first architecture, modular monolith, schema-based tenancy; evidence-backed claims. |
| 7 | What you can explore today | Preview versus roadmap, current development stage and next milestone. |
| 8 | Final action and footer | Repeat the working preview action and useful navigation. |

Module groups:
- **Deliver software:** projects, boards, milestones, Git/CI integrations, monitoring.
- **Keep context:** docs, knowledge base, chat, files, notifications, contextual AI.
- **Run the business:** CRM, client portal, time tracking, people, analytics, billing.

Automation and marketplace belong in the expansion roadmap. Explain shared services once.
Avoid twenty repeated cards with generic benefit statements.

The substantive architecture content formerly below “Engineered for developers.
Hardened for enterprise.” belongs in section 6. Use “hardened” only with supporting evidence.
Preserve useful existing content; rewrite material that is irrelevant, duplicated, or unsupported.

## Rendering decision

Use **React Three Fiber over Three.js for one progressively enhanced hero scene**.
Use HTML/CSS for product panels and transitions, with R3F for the exposed 3D handoff stage.
The purpose of depth is to explain relationships between work artifacts.

- Build the accessible HTML story and static composition first.
- Lazy-load a single client-only canvas after essential content is available.
- Start with simple reusable geometry; no downloaded models, postprocessing, or physics dependency.
- Keep essential text, controls, and links in HTML.
- Render on demand while idle; invalidate during transitions. Pause offscreen and in hidden tabs.
- Cap pixel ratio, reuse geometry/materials, and clean up resources on unmount.
- Read canvas colors from the same semantic tokens as the DOM; update both on theme changes.
- Reduced motion uses a settled composition and immediate step changes, without camera motion.
- WebGL failure/context loss falls back to the HTML composition with the same content and controls.
- Verify exact dependency peer ranges against installed React before installation. Do not force peers.
- If the canvas cannot meet acceptance checks, retain the CSS/SVG composition and the same story.

Official references:
[R3F installation and React pairing](https://r3f.docs.pmnd.rs/getting-started/installation),
[on-demand rendering and resource reuse](https://r3f.docs.pmnd.rs/advanced/scaling-performance).
Implementation uses R3F 9.8.2 and Three.js/types pinned to 0.182.0, with peer compatibility checked against React 19.3.1. The Three.js pin avoids the r183+ Clock deprecation warning from Fiber's internal clock until a stable upstream migration is available. The canvas enhances the connection graphic; readable product artifacts remain HTML. Mobile and reduced-motion layouts use the HTML/CSS version.

## Reuse and implementation boundaries

Follow [design.md](design.md) and [rules.md](rules.md).
Inspect existing components before creating new ones.

Suggested responsibilities under `features/landing/`:
- `LandingPage.tsx`: section composition.
- `content.ts`: typed copy, module status/evidence, story steps, CTA destinations.
- `ConnectedProject.tsx`: accessible controls, state, captions, fallback.
- `ConnectedProjectScene.tsx`: lazy WebGL enhancement.
- Section components only where they have distinct responsibilities.

Reuse shared Button, theme toggle, container, and typography primitives.
One controller feeds HTML, mobile, and canvas. One module registry feeds descriptions
and roadmap labels. Extract repeated structure when there is a real second use;
do not create a page-builder framework.

The dependency cleanup removed unused `motion` and `framer-motion` packages. Current
animation uses CSS and R3F; do not add another animation library without a concrete need.

## Availability, claims, and monetization

Public labels: **Preview** for sample-data UI, **Planned** for roadmap functionality,
**Available** only after checking the advertised behavior end to end.
Record evidence and verification date in the internal content entry.
An old checked task or a model definition is not sufficient release evidence.

Planning docs describe projects/boards as partially implemented; API wiring, docs,
chat, integrations, and business modules remain outstanding. Label the connected
workflow illustrative until those integrations are verified.

Free / Pro / Enterprise plus add-ons are the proposed business model. Exact prices,
limits, launch dates, and entitlements conflict across docs. Do not publish them before
reconciling the offering with actual onboarding and billing.
Initial conversion is the preview. Paid conversion requires a reliable daily workflow,
working onboarding, billing, and support.

No fabricated testimonials, customer logos, usage, latency, uptime, savings, benchmarks,
certifications, or compliance guarantees. Schema isolation is an architectural choice,
not proof of separate physical databases or certification.
Explain concrete AI tasks and human review; label planned AI capability accurately.

## Acceptance checks

- A new visitor can explain the product, audience, workflow, and current availability.
- Inspect rendered screenshots at 390px, 768px, and 1440px in both themes.
- No overflow, clipped headings, unreadable scene text, or placeholder destinations.
- Verify steps, CTAs, anchors, theme toggle, keyboard operation, and preview return navigation.
- Verify reduced motion, no-WebGL/error fallback, touch input, and offscreen/hidden-tab pause.
- Measure text/UI contrast. Essential content works without animation or canvas.
- Run relevant lint, type, and production-build checks; inspect console and hydration behavior.
- Compare initial JS and production performance before/after the scene. Target LCP <= 2.5s
  and CLS <= 0.1 under recorded mobile lab conditions; report these as targets until measured.
- Public landing renders without a backend health request or local development server.
- Review copy against release evidence; remove obsolete components only after checking imports.

Track implementation in [tasks.md](tasks.md).
