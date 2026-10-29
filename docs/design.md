# amops Design Language System (NDLS)

> Updated 2026-10-27: this document owns visual standards; [landing_page_blueprint.md](landing_page_blueprint.md) owns the public product story. Historical palettes and hardware mandates in older notes are superseded. Implementation must be checked against these rules; this document is not a visual QA report.

# Change History

| Version | Details | Changed By | Changed On |
| :--- | :--- | :--- | :--- |
| **v1.0** | Initial comprehensive release of the **amops Design Language System (NDLS)** specifications, encompassing color primitives, semantic tokens, three-tier typography, layout grammar, component behaviors, structural patterns, and keyboard accessibility. | Core Architecture & UI Team | 2026-10-07 |

---

## 1. Introduction

The **amops Design Language System (NDLS)** governs the user interface and interaction design for **amops DevOS**. It establishes the formal aesthetic standards, layout rules, component interaction states, and accessibility contracts across the Core Platform and its 20 modular engines.

This document serves as the single source of design truth for engineers, designers, and AI coding agents. It ensures that every screen, modal, and interactive widget across amops remains **visually unified, interaction-predictable, keyboard-accessible, and performance-stable**.

---

## 2. Purpose

The purpose of NDLS is to eliminate arbitrary styling choices and prevent fragmented user experiences. It standardizes:

- **Visual Design Foundations:** Curated color scales, responsive typography architectures, icon conventions, and spatial grids.
- **Interaction Contracts:** Universal component states (hover, focus, active, disabled, loading, error) and layout stability guarantees.
- **Component Specifications:** Exact dimensional, behavioral, and accessibility requirements for all UI building blocks.
- **Structural Layout Patterns:** Persistent application shells, navigation hierarchies, and engine workspaces.
- **Accessibility Baselines:** Keyboard navigation sequences, screen-reader semantics, and WCAG 2.1 AA compliance.

Every UI implementation in amops must strictly comply with the tokens and rules established in this specification.

---

## 3. Scope

### 3.1 In Scope
- Color palette tokens (Global brand accents, Light & Dark mode surfaces, Neutrals, Semantic states).
- Three-tier typographic system (Primitives → Semantic tokens → Component mappings).
- 8px spatial grid and dimensional grammar (heights, paddings, corner radiuses, icon containers).
- Standardized interaction states and feedback mechanisms.
- Comprehensive specifications for Action, Input, Selection, Data, Temporal, Feedback, and Utility components.
- Structural patterns for Authentication, Workspace Shells, Top Bar, Dashboard, and Engine Workspaces.
- Keyboard navigation shortcuts and accessibility matrices.

### 3.2 Out of Scope
- Backend database schema definitions (refer to [`docs/architecture.md`](file:///d:/Projects/Earning%20Projects/Nexus/docs/architecture.md)).
- REST API and WebSocket protocol specifications (refer to [`docs/architecture.md`](file:///d:/Projects/Earning%20Projects/Nexus/docs/architecture.md)).
- Product roadmap phases and milestones (refer to [`docs/phases.md`](file:///d:/Projects/Earning%20Projects/Nexus/docs/phases.md)).

---

## 4. Target Audience

This document is authored for:
- **Frontend Engineers:** Implementing Next.js 16 components, Tailwind CSS configurations, and shadcn/ui primitives.
- **AI Coding Agents:** Generating UI layouts, forms, and widgets that strictly match project conventions without hallucinating ad-hoc styling.
- **Product Designers:** Designing Figma specifications aligned with production tokens.
- **QA & Accessibility Engineers:** Validating visual consistency, responsive breakpoints, and keyboard operability.

---

## 5. Design Intent

amops DevOS is an enterprise developer operating system designed for intensive daily use. Its visual intent is characterized by:

- **Precision & Technical Restraint:** Every visual element serves an informational or workflow purpose; decorative ornamentation is avoided.
- **Density Without Clutter:** Maximizes data visibility across wide screens through compact padding and disciplined hierarchy.
- **Zero Layout Shift:** Interactive state transitions, loading skeletons, and expand/collapse actions must never trigger unexpected layout shifts.
- **Dark-Mode-First Engineering:** Designed from the ground up with a deep obsidian dark theme optimized for developer environments, paired with a crisp, low-glare light theme.
- **Keyboard-Driven Velocity:** Every primary workflow, modal, and table operation must be fully operable via keyboard shortcuts.

---

## 6. Visual Foundation

### 6.1 Brand Identity & Marks

| Variant | Placement | Visual Characteristics | Behavior |
| :--- | :--- | :--- | :--- |
| **Primary Wordmark** | Login pages, marketing shells, documentation headers | Full "amops DevOS" typographic wordmark with primary brand accent mark | Fixed aspect ratio (160 × 36px) |
| **Console Monogram** | Top-left of expanded Side Navigation | Stylized geometric 'N' monogram paired with workspace identifier | Displayed in Side Nav header; height 28px |
| **Collapsed Glyph** | Top-left of collapsed Side Navigation | Standalone 24 × 24px geometric 'N' glyph enclosed in subtle border container | Scaled for 64px width rail; displays tooltip on hover |

---

### 6.2 Color system and theme ownership

Use the existing shared semantic CSS variables in `frontend/src/app/globals.css`.
These values are the baseline for the landing and workspace, replacing earlier blue,
cyan, and violet brand palettes. Hex values belong only in token definitions.

| Role | CSS token | Dark | Light |
| --- | --- | --- | --- |
| Canvas | `--background` | #0B0C0E | #F7F8FA |
| Primary text | `--foreground` | #F4F4F6 | #0F1115 |
| Card | `--card` | #12141A | #FFFFFF |
| Elevated surface | `--popover` | #171922 | #FFFFFF |
| Subtle surface | `--secondary`, `--muted` | #191B24 | #F0F2F5 |
| Secondary text | `--muted-foreground` | #8A8F98 | #626976 |
| Brand/action | `--primary`, `--ring` | #5E6AD2 | #5E6AD2 |
| On-primary text | `--primary-foreground` | #FFFFFF | #FFFFFF |
| Hover surface | `--accent` | #212430 | #E5E7EB |
| Destructive | `--destructive` | #F43F5E | #E11D48 |

Existing border/input tokens remain shared. Before using them as required control
boundaries, verify contrast; decorative separators and interactive outlines have different needs.
Add success/warning/info tokens centrally when needed, with light and dark values and
measured contrast. Do not give every module a different accent palette.

Dark is the current default; light is a fully supported mode with a visible persisted toggle.
Respect the user's selection across landing and workspace. Never force dark inside a section.
Use semantic foreground/surface pairs and the shared theme provider.

Text needs measured contrast: 4.5:1 for normal text, 3:1 for large text;
required control boundaries and focus indicators need 3:1 against adjacent colors.
These are acceptance targets, not a blanket assertion that every existing component passes.
If a pair fails, change its central token or semantic usage, not a local hardcoded override.
WebGL colors must resolve these tokens and update when the theme changes.

---

> Product diagrams, chart paths, connectors, and 3D geometry are permitted custom graphics. The Lucide-only rule applies to interface icons, not explanatory graphics.

### 6.3 Typography System

amops enforces a **Three-Tier Typographic Architecture**:
1. **Tier 1 (Primitives):** Raw numerical values and font family declarations.
2. **Tier 2 (Semantic Tokens):** Structural tokens combining size, weight, line-height, and spacing.
3. **Tier 3 (Component Mappings):** Explicit mapping of semantic tokens to concrete UI elements.

#### Tier 1: Global Typographic Primitives

##### Font Families
- `font.family.display`: `"Geist"`, -apple-system, sans-serif *(Headings, metrics, page titles)*
- `font.family.body`: `"Geist"`, system-ui, -apple-system, sans-serif *(UI controls, tables, forms, docs)*
- `font.family.code`: `"Geist Mono"`, ui-monospace, monospace *(Git commits, task IDs, logs, code blocks)*

##### Font Weights
- `font.weight.regular`: `400`
- `font.weight.medium`: `500`
- `font.weight.semibold`: `600`
- `font.weight.bold`: `700`

##### Responsive Font Scales

| Token Name | Mobile Target | Desktop Target | Pixel Rem (Base 16px) |
| :--- | :--- | :--- | :--- |
| `font.size.2xs` | 10px | 11px | 0.6875rem |
| `font.size.xs` | 12px | 12px | 0.75rem |
| `font.size.sm` | 13px | 14px | 0.875rem |
| `font.size.base` | 15px | 16px | 1.0rem |
| `font.size.md` | 17px | 18px | 1.125rem |
| `font.size.lg` | 19px | 20px | 1.25rem |
| `font.size.xl` | 22px | 24px | 1.5rem |
| `font.size.2xl` | 28px | 32px | 2.0rem |
| `font.size.3xl` | 36px | 40px | 2.5rem |

##### Line Heights & Letter Spacing
- `line.height.tight`: `1.15` *(Hero headings, button labels)*
- `line.height.heading`: `1.25` *(H1 to H4 section titles)*
- `line.height.body`: `1.50` *(Standard application UI text)*
- `line.height.loose`: `1.65` *(Documentation articles, long-form content)*
- `letter.spacing.tight`: `-0.025em` *(Large display headings)*
- `letter.spacing.normal`: `0em` *(Default UI text)*
- `letter.spacing.wide`: `0.04em` *(Caps badges, table headers, task keys)*

---

#### Tier 2: Semantic Tokens

| Semantic Token | Family Ref | Size Ref | Weight Ref | Line Height | Tracking | Target Element |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `typo.display.hero` | `display` | `3xl` | `bold` | `tight` | `tight` | `<h1>` Dashboard overview |
| `typo.heading.page` | `display` | `2xl` | `semibold` | `heading` | `tight` | `<h1>` Engine title (Kanban, Docs) |
| `typo.heading.section` | `display` | `xl` | `semibold` | `heading` | `tight` | `<h2>` Section & modal titles |
| `typo.heading.subset` | `display` | `md` | `semibold` | `heading` | `normal` | `<h3>` Widget headers, card groups |
| `typo.body.default` | `body` | `sm` | `regular` | `body` | `normal` | `<p>` Primary UI text, task summaries |
| `typo.body.emphasis` | `body` | `sm` | `semibold` | `body` | `normal` | `<strong>` Form labels, active links |
| `typo.meta.caption` | `body` | `xs` | `regular` | `body` | `normal` | `<small>` Timestamps, helper text |
| `typo.meta.badge` | `body` | `2xs` | `semibold` | `tight` | `wide` | `<span>` Status tags (Uppercase) |
| `typo.action.button` | `body` | `sm` | `medium` | `tight` | `normal` | `<button>` Action triggers |
| `typo.code.inline` | `code` | `xs` | `medium` | `body` | `normal` | `<code>` Issue keys (`NEX-101`), SHAs |
| `typo.code.block` | `code` | `sm` | `regular` | `body` | `normal` | `<pre>` Log output, script editors |

---

#### Tier 3: Component Token Mapping

| Component | Target Text Area | Assigned Semantic Token | Transformation / Style Rule |
| :--- | :--- | :--- | :--- |
| **Card / Widget** | Container Heading | `typo.heading.subset` | Text high-contrast |
| | Widget Subtext / Description | `typo.meta.caption` | Text muted |
| **Kanban Card** | Issue Key (e.g. `NEX-42`) | `typo.code.inline` | Text muted, uppercase |
| | Task Title | `typo.body.default` | Text high-contrast, line-clamp-2 |
| | Story Points / Estimate | `typo.meta.caption` | Font medium |
| **Data Table** | Column Headers | `typo.meta.badge` | Text-transform uppercase, text muted |
| | Standard Cell Content | `typo.body.default` | Text body |
| | Identifier / Key Cell | `typo.code.inline` | Monospace tabular numbers |
| **Navigation Rail**| Main Nav Section Title | `typo.meta.badge` | Text-transform uppercase, text muted |
| | Nav Link Label | `typo.body.default` | Weight medium on active |
| **Forms** | Input Field Label | `typo.body.emphasis` | Text high-contrast |
| | Placeholder Text | `typo.body.default` | Text muted |
| | Under-field Helper / Error | `typo.meta.caption` | Transitions to error color on validation failure |

---

### 6.4 Iconography Standards (Strict Mandate: Lucide Icons)

amops enforces an absolute, universal standard for all iconography: **Lucide Icons (`lucide-react`) must be used exclusively across all components, modules, dialogs, and navigation elements.**

#### 6.4.1 Strict Icon Mandate & Prohibitions
- **Exclusive Library:** Always import icons from `lucide-react`.
- **Strictly Prohibited:** Never install, import, or introduce alternative icon libraries (e.g., FontAwesome, Heroicons, Material UI Icons, Tabler Icons, Feather, or custom SVG paths used as replacement icons).
- **Visual Cohesion:** Using a single icon library guarantees consistent stroke weights, corner radii, optical centers, and geometric balance across the entire platform.

#### 6.4.2 Rendering & Styling Rules
1. **Stroke Width:** Standardized to `strokeWidth={1.75}` (or `strokeWidth={2}` for micro indicators such as 12px priority dots). Never use hairline (`1px`) or heavy (`3px`) strokes.
2. **Color Inheritance:** Icons must inherit color via `currentColor` from parent text tokens (`text-muted-foreground`, `text-primary`, `text-destructive`, etc.) rather than hardcoded fill or stroke colors.
3. **Container Alignment:** All icons rendered within interactive buttons, pills, or list items must use flexbox centering (`inline-flex items-center justify-center shrink-0`).

#### 6.4.3 Dimensional Scale & Tailwind Class Mapping

| Token Name | Dimensions | Tailwind Classes | Container Size | Primary Usage & Context |
| :--- | :--- | :--- | :--- | :--- |
| `icon.size.xs` | 12 × 12px | `h-3 w-3` | 16 × 16px | Micro status dots, nested tree chevrons, compact metadata tags |
| `icon.size.sm` | 14 × 14px | `h-3.5 w-3.5` | 20 × 20px | Inline badges, table status indicators, helper tooltips, input clear buttons |
| `icon.size.md` | 16 × 16px | `h-4 w-4` | 24 × 24px | Default button prefixes, action menu items, dropdown rows, task cards |
| `icon.size.base`| 18 × 18px | `h-4.5 w-4.5` or `h-[18px] w-[18px]` | 28 × 28px | Navigation rail items, tabs, subheader action triggers |
| `icon.size.lg` | 20 × 20px | `h-5 w-5` | 32 × 32px | Section header icons, search bar trigger icons, modal title anchors |
| `icon.size.xl` | 24 × 24px | `h-6 w-6` | 40 × 40px | Empty state illustrations, feature announcement cards, high-level metrics |

#### 6.4.4 Accessibility Guidelines
- **Decorative Icons:** When an icon accompanies adjacent descriptive text (e.g., `<Button><Plus className="h-4 w-4" /> New Task</Button>`), add `aria-hidden="true"` to prevent screen reader redundancy.
- **Standalone Icon Buttons:** When a button contains only an icon (e.g., three-dot menu, close dialog, theme toggle), an explicit `aria-label` or `<Tooltip>` component with descriptive text is mandatory.

---

### 6.5 Layout Grammar & Spatial Rules

#### 6.5.1 Base Spacing System (8px Grid)

All layout margins, paddings, and component alignments must strictly follow the 8px spatial scale:

```text
4px (0.5x)  |  8px (1x)  |  16px (2x)  |  24px (3x)  |  32px (4x)  |  40px (5x)  |  48px (6x)  |  64px (8x)
```
*Note: A 4px half-step is permitted exclusively for tight icon-to-label gaps and compact badge padding.*

---

#### 6.5.2 Dimensional Standards Table

| Component | Height | Horizontal Padding | Vertical Padding | Corner Radius |
| :--- | :--- | :--- | :--- | :--- |
| **Button (Default)** | 40px | 16px | 8px | 8px (`rounded-lg`) |
| **Button (Compact)** | 32px | 12px | 6px | 6px (`rounded-md`) |
| **Button (Icon Only)** | 32 × 32px / 40 × 40px | 0px (Centered) | 0px | 6px / 8px |
| **Input / Dropdown (Default)**| 40px | 14px | 8px | 8px (`rounded-lg`) |
| **Input / Dropdown (Compact)**| 32px | 10px | 6px | 6px (`rounded-md`) |
| **Top Navigation Bar** | 56px | 20px | 0px | None (Border bottom) |
| **Side Navigation (Expanded)**| Full viewport | 12px | 16px | None (Border right) |
| **Side Navigation (Collapsed)**| Full viewport | 8px | 16px | None (Border right) |
| **Table Row (Comfortable)** | 48px | 16px | 10px | 0px |
| **Table Row (Compact)** | 36px | 12px | 6px | 0px |
| **Card / Widget Container** | Auto | 20px | 20px | 12px (`rounded-xl`) |
| **Modal / Dialog** | Auto (Max 680px) | 24px | 24px | 16px (`rounded-2xl`) |
| **Slide-Over Sheet** | Full viewport (w-480px)| 24px | 24px | None (Border left) |

---

#### 6.5.3 Form Spacing Standards

| Property | Value | Rule |
| :--- | :--- | :--- |
| **Label-to-Input Gap** | 6px | Explicit visual binding |
| **Input-to-Helper/Error Gap** | 4px | Proximity reinforces field context |
| **Field-to-Field Vertical Gap**| 16px | Standard spacing within form sections |
| **Section-to-Section Gap** | 32px | Dividing major form groups |

---

## 7. Global Interaction States

Every interactive component across amops must support applicable states from this standardized matrix. Interaction transitions must not cause layout shift.

| State | Purpose | Behavioral & Visual Rules |
| :--- | :--- | :--- |
| **Default** | Baseline idle state. | Clear affordance; no focus indicators; neutral surface contrast. |
| **Hover** (Mouse only) | Immediate pointer feedback. | Subtle surface shift (e.g. +4% brightness in dark mode); cursor pointer; zero layout shift. |
| **Focus** (Keyboard & Mouse) | Active element indicator. | Universal focus ring: `ring-2 ring-ring ring-offset-2`; remains visible during typing. |
| **Selected** | Persistent selection state. | Stronger emphasis than hover; persists across focus changes; accent border or subtle tint fill. |
| **Disabled** | Unavailable for interaction. | Opacity `0.45`; cursor `not-allowed`; removed from tab index; no hover/click listeners. |
| **Loading** | In-progress asynchronous task. | Disables repeated clicks; replaces label with spinner or shimmer; preserves fixed dimensions. |
| **Error** | Validation failure or API rejection. | Destructive token border outline; helper text reveals error message; does not rely solely on color. |
| **Read-Only** | Non-editable displayed value. | Visually differentiated from editable inputs; selectable text for copying; no focus ring. |
| **Mandatory** | Required form input modifier. | Displays destructive-color asterisk (`*`); communicated to screen readers via `aria-required="true"`. |

---

## 8. Component Guidelines (shadcn/ui Architecture)

amops standardizes on **shadcn/ui** (built on Radix UI unstyled primitives) as its foundational component system. Rather than using an opaque external widget library, components reside directly inside `src/components/ui/` and are styled using NDLS Tailwind CSS tokens.

### 8.0 Component Architecture: shadcn/ui Foundation
- **Component Source of Truth:** `frontend/src/components/ui/`
- **Configuration Manifest:** `components.json`
- **Icon Set Integration:** `lucide-react`
- **Theme Binding:** Direct mapping to NDLS CSS custom properties (`--primary`, `--background`, `--card`, etc.)
- **Accessibility Guarantee:** WAI-ARIA compliant keyboard focus, screen-reader semantics, and focus trapping provided by Radix primitives.

### 8.1 Action Components

#### 8.1.1 Buttons

- **Variants:**
  - `Primary`: Semantic primary background (`bg-primary text-primary-foreground`). Used once per view for primary CTA.
  - `Secondary`: Elevated surface fill (`bg-surface-elevated border border-border-subtle hover:bg-surface-hover`).
  - `Tertiary / Ghost`: Transparent fill with hover background. Used for low-emphasis utility actions.
  - `Destructive`: destructive-color background or outline. Reserved strictly for irreversible actions (delete, revoke).
  - `Icon Only`: Fixed square dimensions (32px or 40px) with centered Lucide icon and tooltip.

| Purpose | Usage Rules | Behavioral Rules |
| :--- | :--- | :--- |
| Trigger explicit system actions (Submit, Create, Delete). | • Max one Primary button per card or modal view.<br>• Destructive actions must never be styled as Primary.<br>• Every icon-only button must provide an `aria-label`. | • Clicking initiates immediate action or loading state.<br>• While loading, button width remains static to prevent jitter.<br>• Pressing Enter or Space activates focused button. |

---

#### 8.1.2 Action / Overflow Menus

| Purpose | Usage Rules | Behavioral Rules |
| :--- | :--- | :--- |
| Provide secondary actions in compact spaces (e.g. table rows). | • Triggered via three-dot horizontal icon (`MoreHorizontal`).<br>• Destructive options must appear last and be separated by a divider. | • Opens popover menu without pushing surrounding layout.<br>• Outside click or Escape dismisses menu.<br>• Selecting an action closes menu and returns focus to trigger. |

---

### 8.2 Input Components

#### 8.2.1 Text & Search Inputs

| Component | Purpose & Usage | Behavioral Rules |
| :--- | :--- | :--- |
| **Text Field** | Single-line user input for names, titles, and IDs. | Supports prefix icons, clear button, and character counts. Focus triggers focus ring. |
| **Password Field** | Secure input for passwords and API secrets. | Masked characters by default with eye icon (`Eye` / `EyeOff`) to toggle visibility. |
| **Search Input** | Global and filtered table searching. | Includes prefix search icon (`Search`) and shortcut chip (`⌘K` or `/`). Escape clears query. |
| **Textarea (Expandable)**| Multi-line markdown notes or task descriptions. | Expands vertically with content up to `max-h-96` before showing internal custom scrollbar. |

---

### 8.3 Selection Components

#### 8.3.1 Dropdowns & Selects

| Variant | Purpose | Behavioral Rules |
| :--- | :--- | :--- |
| **Single Select** | Select one option from a predefined list. | Popover opens below trigger; supports arrow-key navigation; Enter confirms selection. |
| **Select with Search** | Select an item from long lists (>8 items). | Opens popover with auto-focused filter input at top; filters options in real time. |
| **Multiselect** | Select multiple assignees, tags, or statuses. | Checkbox per option; selected values render as dismissible chips inside trigger. |
| **Toggle / Switch** | Binary persistent settings (Enable/Disable). | Immediate state change on click; Space key toggles; animates pill slider (150ms). |
| **Segmented Tabs** | Switch views in the same container. | Sliding pill indicator behind active tab; Arrow keys cycle tabs; zero layout shift. |

---

### 8.4 Data Components

#### 8.4.1 Data Table & Pagination

| Purpose | Usage Rules | Behavioral Rules |
| :--- | :--- | :--- |
| Display dense, structured records (tasks, logs, members). | • Column headers clearly labeled; right-align numeric cells.<br>• Must support sortable headers and row selection checkboxes. | • Hover highlights active row (`bg-surface-hover`).<br>• Sorting updates data immediately with subtle arrow indicator.<br>• Pagination controls navigate pages without page reload. |

---

### 8.5 Temporal Components

#### 8.5.1 Date & Time Pickers

| Purpose | Usage Rules | Behavioral Rules |
| :--- | :--- | :--- |
| Select sprint milestones, due dates, and schedule times. | • Must support localized formats (`YYYY-MM-DD` default for technical context).<br>• Range mode must clearly highlight start, end, and span. | • Clicking opens calendar popover; Arrow keys navigate days.<br>• Escape dismisses without saving; Enter confirms.<br>• Manual keyboard date entry supported. |

---

### 8.6 Process & Feedback Components

#### 8.6.1 Toast Notifications & Modals

| Component | Purpose & Rules | Behavioral Rules |
| :--- | :--- | :--- |
| **Toast** | Ephemeral feedback after actions (e.g. "Task created"). | Stacks in bottom-right; auto-dismisses in 4 seconds; includes close button and undo action. |
| **Dialog / Modal** | Focused task or critical confirmation. | Centered backdrop blur (`backdrop-blur-sm bg-black/60`); traps focus; Escape dismisses. |
| **Slide-over Sheet**| Deep task details, full comments, and activity log. | Slides from right viewport edge (w-480px or w-640px); keeps underlying workspace context visible. |
| **Tooltip** | Clarification on icon buttons and shortcuts. | Appears after 250ms hover delay; does not contain interactive elements; dismisses on scroll. |

---

## 9. Structural Layout Patterns

### 9.1 Authentication Shell (Login & Onboarding)

- Centered, minimalist card layout on themed canvas background (`bg-background`).
- Houses amops Wordmark, title, email/password form fields, social OAuth buttons (Google/GitHub), and link to self-hosted SSO.
- Strict keyboard tab sequence: Email → Password → Submit → Forgot Password → OAuth providers.

---

### 9.2 Application Console Shell

```text
+--------------------------------------------------------------------------------------------------+
| Top Bar (h-56px): [Workspace Monogram + Selector]   [Global Search: ⌘K]   [AI Assist] [Bell] [Avatar] |
+------------------------+-------------------------------------------------------------------------+
| Side Navigation        | Main Workspace Canvas                                                   |
| (Expanded: w-240px     |                                                                         |
|  Collapsed: w-64px)    | Sub-Header: Breadcrumbs / View Switcher (Kanban | List | Gantt) | Actions |
|                        +-------------------------------------------------------------------------+
| • Projects & Boards    |                                                                         |
| • Documentation (Wiki) | Engine Content Surface                                                  |
| • Real-Time Chat       | (Interactive Kanban columns, markdown editor, or live chat feed)        |
| • CRM & Pipeline       |                                                                         |
| • Time & HR            |                                                                         |
| • Integrations & CI    |                                                                         |
| • Analytics            |                                                                         |
| ─────────────────────  |                                                                         |
| • Workspace Settings   |                                                                         |
+------------------------+-------------------------------------------------------------------------+
```

#### 9.2.1 Side Navigation Rail
- **Expanded State (240px):** Full module titles, collapsible sub-menus, unread count badges, tenant switcher at bottom.
- **Collapsed State (64px):** Icon-only representation with tooltips on hover; retains active highlight; toggled via `⌘B` or collapse button.
- **Fixed Position:** Navigation remains static; content canvas scrolls independently.

#### 9.2.2 Top Utility Bar (56px)
- Fixed at top; houses workspace selector, global search button (`⌘K`), quick-create dropdown (`+`), AI Assistant trigger, notifications bell, and user profile.

---

### 9.3 Engine Workspaces

#### 9.3.1 Kanban Board Layout
- Horizontal scrolling container with column headers (Status, item count, quick-add button).
- Cards stack vertically with 8px gap. Dragging card displays 50% opacity placeholder and elevates active card with shadow and primary brand focus ring.

#### 9.3.2 Documentation (Wiki) Layout
- Three-column layout: Document tree hierarchy (220px) | Active document editor/viewer | Table of contents outline (180px).
- Editor uses distraction-free typography with floating formatting toolbar.

#### 9.3.3 Real-Time Chat Layout
- Left panel: Channels and direct messages list.
- Center panel: Virtualized message stream with sticky date separators and bottom-docked composer.
- Right panel (Collapsible): Thread replies, pinned attachments, channel member list.

---

## 10. Accessibility & Keyboard Navigation Standards

amops DevOS enforces strict WCAG 2.1 AA accessibility standards and comprehensive keyboard operation.

### 10.1 Global Keyboard Shortcuts

| Shortcut | Action | Scope |
| :--- | :--- | :--- |
| `⌘ + K` / `Ctrl + K` | Open Global Command Palette / Search | Universal |
| `⌘ + B` / `Ctrl + B` | Toggle Side Navigation Rail (Collapse / Expand) | Universal |
| `C` | Open Quick Create Task modal | Workspace views |
| `Escape` | Dismiss modal, close dropdown, deselect row | Universal |
| `?` | Show Keyboard Shortcuts cheat sheet | Universal |

---

### 10.2 Component Keyboard Interaction Matrix

#### 10.2.1 Modal & Dialog Navigation

| Key | Expected Behavior |
| :--- | :--- |
| `Tab` | Moves focus to next focusable element inside modal (traps focus inside). |
| `Shift + Tab` | Moves focus to previous focusable element inside modal. |
| `Escape` | Dismisses the modal and returns focus to the initiating element. |
| `Enter` | Activates the focused button or submits form. |

#### 10.2.2 Dropdown & Select Navigation

| Key | Expected Behavior |
| :--- | :--- |
| `Enter` / `Space` | Opens dropdown popover; selects focused option. |
| `Arrow Down` | Moves focus to next option in the list. |
| `Arrow Up` | Moves focus to previous option in the list. |
| `Escape` | Closes dropdown without making a selection. |

#### 10.2.3 Data Table Navigation

| Key | Expected Behavior |
| :--- | :--- |
| `Arrow Keys` | Moves active cell cursor across rows and columns. |
| `Space` | Toggles row selection checkbox. |
| `Enter` | Opens detail sheet for the active row. |

#### 10.2.4 Tabs & Segments

| Key | Expected Behavior |
| :--- | :--- |
| `Arrow Left` / `Arrow Right` | Moves active tab selection horizontally. |
| `Home` / `End` | Jumps to first / last tab in segment. |
| `Enter` / `Space` | Activates focused tab content. |

---

## 11. Design Enforcement Rules for Agents

1. **Token Exclusivity:** All colors, paddings, fonts, and borders must reference defined tokens. Never put raw HEX colors in components or introduce a second palette. Use semantic classes such as `bg-primary`, `text-foreground`, and `border-border`. Define new tokens centrally before use.
2. **Prevent Layout Shifting:** Skeletons and loading indicators must match the exact height and width of destination components.
3. **Contrast Compliance:** Text must achieve a minimum contrast ratio of `4.5:1` against its background in both dark and light modes.
4. **Keyboard Operability:** Every interactive component created must support keyboard focus indicators (`ring-2 ring-ring`) and key listeners.

---

## 12. Motion and graphics

Landing implementation tokens live in `features/landing/landing.module.css`: shared
content width/gutter, section spacing, marketing display/heading scales, and motion
durations. Marketing display text scales from 44px to 66px; section headings from
32px to 48px. Application typography above remains unchanged. These responsive
display tokens are intentional additions, not independent per-component font stacks.

Motion must explain a relationship, state change, or action. For the public page,
follow the connected-project storyboard in [landing_page_blueprint.md](landing_page_blueprint.md).

- Use a shared timing scale: fast 150ms, standard 220ms, narrative transition 500ms.
  Define these centrally during implementation; avoid per-component timing recipes.
- Prefer transform/opacity transitions. Avoid continuous blur, expensive filters,
  layout-property animation, and `transition-all`.
- Essential content is visible before animation; no entrance sequence blocks controls.
- Reduced motion removes camera movement, parallax, looping, and animated transitions.
- Pause offscreen and hidden-tab animation. A static composition must still explain the product.
- Long automatic motion requires a visible pause control. Do not use infinite marquees by default.
- One optional lazy canvas enhances the hero; all text and controls remain accessible HTML.
- Use the existing motion library consistently. Inspect imports before adding dependencies.
- The motion skill is a technique reference, not a requirement to apply every effect.

## 13. Product-first visual standards

- Use readable product artifacts: briefs, tasks, conversations, code links, client updates.
- Give every diagram a caption explaining its product meaning.
- Keep brand accents restrained and typography legible; no microscopic telemetry labels.
- Film grain, blueprint grids, glass effects, spotlights, hardware racks, radars, and packet logs
  are not mandatory. Include an effect only when it clarifies the product.
- Do not invent live metrics, customer evidence, certifications, or benchmark comparisons.
- Distinguish illustrative workflows, working previews, released capabilities, and roadmap plans.
- Reuse shared primitives and content data across responsive layouts; do not fork the design system.
- Preserve useful sections when changing a scoped portion of a page.
- Verify desktop/mobile, light/dark, keyboard, reduced-motion, and fallback states in the rendered UI.

