# Operation Phoenix — Sprint Plan

## Sprint 1 — Command Center Foundation

**Goal:** Establish the base route, scaffold the main layout components, and wire up product data.

### Files to create

| File | Purpose |
|---|---|
| `src/app/command-center/page.tsx` | Route handler for `/command-center` |
| `src/features/command-center/components/HeroCommandCenter.tsx` | Hero section with intro copy and CTA |
| `src/features/command-center/components/ProductIntro.tsx` | Product showcase section |
| `src/features/command-center/components/StatusStrip.tsx` | Live status indicator bar (reused from shared) |

### Files to modify

| File | Change |
|---|---|
| `src/components/shared/StatusStrip.tsx` | Ensure it can be imported by the Command Center without circular deps |

### Validation criteria

- [ ] Navigating to `/command-center` renders the page without errors
- [ ] `HeroCommandCenter`, `ProductIntro`, and `StatusStrip` all render
- [ ] Product data from `src/content/products.json` is consumed by `ProductIntro`
- [ ] `next build` completes without errors

---

## Sprint 2 — Projects Layer

**Goal:** Add project listing, detail pages, and reuse existing card components.

### Files to create

| File | Purpose |
|---|---|
| `src/app/command-center/projects/page.tsx` | Route handler for `/command-center/projects` |
| `src/app/command-center/projects/[slug]/page.tsx` | Route handler for `/command-center/projects/[slug]` |
| `src/features/command-center/components/ProjectGrid.tsx` | Grid layout rendering `ProjectCard` instances |
| `src/features/command-center/components/ProjectDetail.tsx` | Full project detail (Problem / Solution / Stack / Impact) |

### Files to modify

| File | Change |
|---|---|
| `src/components/cards/ProjectCard.tsx` | Verify it accepts the shape emitted by `src/content/projects.json`; add optional `variant` prop if needed |

### Validation criteria

- [ ] `/command-center/projects` lists all projects from `projects.json`
- [ ] Each card links to `/command-center/projects/[slug]`
- [ ] Detail page shows Problem, Solution, Stack, and Impact sections
- [ ] Navigating to an unknown slug returns a 404
- [ ] `next build` completes without errors

---

## Sprint 3 — Timeline + Skills

**Goal:** Render career timeline and skills cloud, ensure mobile responsiveness.

### Files to create

| File | Purpose |
|---|---|
| `src/features/command-center/components/TimelineSection.tsx` | Chronological timeline from `timeline.json` |
| `src/features/command-center/components/SkillsCloud.tsx` | Tag/filter cloud from `skills.json` |

### Files to modify

| File | Change |
|---|---|
| (none) | — |

### Validation criteria

- [ ] Timeline entries render in correct order with dates visible
- [ ] SkillsCloud renders all skill categories and items
- [ ] Both components are fully responsive (test 320 px, 768 px, 1440 px)
- [ ] `next build` completes without errors

---

## Sprint 4 — Decisions + Architecture

**Goal:** Show architectural decisions and a visual flow diagram.

### Files to create

| File | Purpose |
|---|---|
| `src/features/command-center/components/DecisionsList.tsx` | Lists decisions using `DecisionCard` |
| `src/features/command-center/components/ArchitectureFlow.tsx` | Visual dependency / architecture diagram |
| `src/app/command-center/decisions/[slug]/page.tsx` | Individual decision detail page |

### Files to modify

| File | Change |
|---|---|
| `src/components/cards/DecisionCard.tsx` | Verify it accepts the shape from `src/content/decisions.json` |

### Validation criteria

- [ ] `/command-center/decisions` lists all decisions from `decisions.json`
- [ ] Each `DecisionCard` links to `/command-center/decisions/[slug]`
- [ ] Decision detail page renders full content
- [ ] `ArchitectureFlow` renders an interactive or SVG-based diagram
- [ ] `next build` completes without errors

---

## Sprint 5 — AI Dock Integration

**Goal:** Connect the AI Dock to Command Center context and provide contextual suggestions.

### Files to create

| File | Purpose |
|---|---|
| `src/features/command-center/context/aiDock.context.ts` | React context linking current route to AI Dock |
| `src/features/command-center/hooks/useContextualSuggestions.ts` | Hook returning mock suggestions based on active page |

### Files to modify

| File | Change |
|---|---|
| `src/components/AIDock.tsx` | Accept route context and render suggestions |
| (AI Dock config / feature toggle) | Enable Command Center integration |

### Validation criteria

- [ ] AI Dock shows different suggestions on each Command Center sub-page
- [ ] Suggestions include internal links (e.g. "View projects →")
- [ ] Mock responses return without API call
- [ ] `next build` completes without errors

---

## Sprint 6 — Polish + Review

**Goal:** Audit UX, responsiveness, accessibility, motion, and documentation.

### Tasks

| Area | Checklist |
|---|---|
| **UX** | Review copy, spacing, color contrast, visual hierarchy, empty states |
| **Responsiveness** | Test at 320 px, 768 px, 1024 px, 1440 px; fix layout breaks |
| **Accessibility** | `aria-label` on interactive elements, focus-ring visible on all controls, `prefers-reduced-motion` respected |
| **Motion** | Transitions (enter/exit, hover, focus) should be 200–300 ms, easing consistent, no unnecessary animation |
| **Build & lint** | `next build` and `next lint` (or equivalent) pass with zero errors/warnings |
| **Docs** | Update any README or architecture docs that reference the old Command Center |

### Files to modify

| File | Change |
|---|---|
| Any sprint file above | Apply fixes from the audit |

### Validation criteria

- [ ] Lighthouse Accessibility score ≥ 95
- [ ] No layout shift across breakpoints
- [ ] `prefers-reduced-motion` disables non-essential animations
- [ ] All interactive elements have visible focus indicators
- [ ] `next build` and `next lint` pass cleanly
- [ ] Deprecated Command Center references are removed from docs
