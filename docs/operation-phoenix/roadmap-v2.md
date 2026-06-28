# Roadmap v2 — QA Command Center

## Overview

Six sprints to transform the legacy QA Command Center into the first product of Project Jun Fan. Based on PRD v2 and all eight analysis reviews.

**Cadence:** 2 weeks per sprint

---

## Sprint 1 — Foundation

**Objective:** Create the `/command-center` route with narrative hero, status strip, product gateway, and metrics grid. Establish the visual foundation with full Horizon compliance.

### Files to Create

| File | Purpose |
|------|---------|
| `src/app/command-center/page.tsx` | Route handler and page composition |
| `src/features/command-center/components/hero-command-center.tsx` | Narrative hero: product title, tagline, ecosystem badge, CTAs. No personal name. |
| `src/features/command-center/components/product-gateway.tsx` | 3-card product grid reusing `ProductCard` (QA, WhatsApp, Vigilante) |
| `src/features/command-center/components/metrics-grid.tsx` | Animated counter grid from metrics.json. IntersectionObserver + `--motion-slow` (420ms ease-out). Respects `prefers-reduced-motion`. |

### Files to Modify

| File | Change |
|------|--------|
| `src/components/shared/status-strip.tsx` | Verify importable from command-center without circular deps |
| `src/components/cards/product-card.tsx` | Verify accepts shape from `products.json` — accent strip, stack tags, detail link |

### Components Reused (from component-review)

| Component | Classification | Source |
|-----------|---------------|--------|
| StatusStrip | REUSE | component-review:44 |
| ProductCard | REUSE | component-review:52 |
| MetricCard / MetricsGrid | REFINE (counter animation) | component-review:23 |

### Horizon Compliance Check (horizon-review:182-184)

Must fix before end of sprint:
- [ ] Replace legacy `#020617` → `#0B0F14` (`--color-bg-base`)
- [ ] Replace glassmorphism `rgba(...)` → `#111821` (`--color-surface-default`)
- [ ] Replace white-alpha borders → `#263241` (`--color-border-subtle`)
- [ ] Replace `Segoe UI` → `Inter`
- [ ] Replace `#38d5ff` (cyan) → `#4F8CFF` (QA blue)
- [ ] Remove all glow effects, gradients, grid overlays, mouse spotlight

### Content Connected

- `src/content/products.json` — product names, descriptions, badges

### Validation Criteria

- [ ] `/command-center` renders Hero + StatusStrip + ProductGateway + MetricsGrid
- [ ] Hero uses product-first narrative ("QA Command Center", not a personal name)
- [ ] All backgrounds, borders, text, and accents use Horizon tokens (0 violations)
- [ ] Metrics animate on scroll (IntersectionObserver) with `--motion-slow` (420ms)
- [ ] Reduced motion: metrics show final values without animation
- [ ] `next build` passes with 0 errors
- [ ] No hardcoded text in JSX — all content from `products.json`, `metrics.json`

---

## Sprint 2 — Projects

**Objective:** Add project listing, detail pages with Problem/Solution/Stack/Impact sections. Wire to `projects.json`.

### Files to Create

| File | Purpose |
|------|---------|
| `src/app/command-center/projects/page.tsx` | Route handler for `/command-center/projects` |
| `src/app/command-center/projects/[slug]/page.tsx` | Route handler for `/command-center/projects/[slug]` |
| `src/features/command-center/components/project-grid.tsx` | Grid layout rendering `ProjectCard` instances |
| `src/features/command-center/components/project-detail.tsx` | Full detail: Problem, Solution, Stack, Impact sections |

### Files to Modify

| File | Change |
|------|--------|
| `src/components/cards/project-card.tsx` | Verify it accepts shape from `projects.json`; add optional `variant` prop for featured vs compact |

### Components Reused

| Component | Classification | Source |
|-----------|---------------|--------|
| ProjectCard | REUSE | component-review:53 |
| Badge | REUSE | component-review:26 |

### Content Connected

- `src/content/projects.json`

### Validation Criteria

- [ ] `/command-center/projects` lists all projects from `projects.json`
- [ ] Each card links to `/command-center/projects/[slug]`
- [ ] Detail page shows Problem, Solution, Stack, and Impact sections
- [ ] Unknown slug returns a 404 (Next.js `notFound()`)
- [ ] Detail page has back navigation to `/command-center/projects`
- [ ] `next build` passes with 0 errors

---

## Sprint 3 — Timeline + Skills

**Objective:** Add vertical timeline of ecosystem milestones and skills cloud with category grouping. Wire to `timeline.json` and `skills.json`.

### Files to Create

| File | Purpose |
|------|---------|
| `src/app/command-center/timeline/page.tsx` | Route handler for `/command-center/timeline` |
| `src/features/command-center/components/timeline-section.tsx` | Vertical timeline component (refined from legacy horizontal). Timeline entries with date, title, description. Milestone visual markers. |
| `src/features/command-center/components/skills-cloud.tsx` | Skills grouped by category with proficiency indicators. Uses Badge component for individual skills. |

### Files to Modify

| File | Change |
|------|--------|
| `src/app/command-center/page.tsx` | Add navigation links to `/command-center/timeline` |

### Components Reused

| Component | Classification | Source |
|-----------|---------------|--------|
| Timeline (refined) | REFINE — horizontal→vertical | component-review:61 |
| Badge | REUSE | component-review:26 |

### Content Connected

- `src/content/timeline.json`
- `src/content/skills.json` (verify all 12+ tags exist; add any missing from content-review:117-121)

### Validation Criteria

- [ ] Timeline entries render in correct chronological order
- [ ] Each entry shows date, title, and description
- [ ] Vertical timeline is fully responsive (single column on mobile, wider on desktop)
- [ ] SkillsCloud renders all categories from `skills.json`
- [ ] Skills show proficiency level (e.g., avançado, intermediário)
- [ ] `next build` passes with 0 errors

---

## Sprint 4 — Decisions + Architecture

**Objective:** Add architecture flow visualization and decisions page with ADR-style cards. Wire to `decisions.json`.

### Files to Create

| File | Purpose |
|------|---------|
| `src/app/command-center/decisions/page.tsx` | Route handler for `/command-center/decisions` |
| `src/app/command-center/architecture/page.tsx` | Route handler for `/command-center/architecture` |
| `src/features/command-center/components/decisions-list.tsx` | Grid of DecisionCard components from `decisions.json` |
| `src/features/command-center/components/architecture-flow.tsx` | Visual node-arrow diagram showing ecosystem topology |

### Files to Modify

| File | Change |
|------|--------|
| `src/components/cards/decision-card.tsx` | Verify it accepts shape from `decisions.json` — context, rationale, trade-off, impact |

### Components Reused

| Component | Classification | Source |
|-----------|---------------|--------|
| DecisionCard | REUSE | component-review:55 |
| ArchitectureFlow | REUSE | component-review:62 |

### Content Connected

- `src/content/decisions.json`

### Validation Criteria

- [ ] `/command-center/decisions` lists all decisions from `decisions.json`
- [ ] Each decision card shows context, rationale, trade-offs, and impact
- [ ] `/command-center/architecture` renders the ArchitectureFlow diagram
- [ ] Architecture narrative explains how QA, WhatsApp, and Vigilante connect (from ux-review:121-123)
- [ ] Links between command-center pages work correctly
- [ ] `next build` passes with 0 errors

---

## Sprint 5 — AI Dock + Polish

**Objective:** Add contextual AI Dock suggestions, search integration, motion refinements, and full Horizon compliance verification.

### Files to Create

| File | Purpose |
|------|---------|
| `src/features/command-center/context/ai-dock.context.ts` | React context linking current route to AI Dock suggestions |
| `src/features/command-center/hooks/use-contextual-suggestions.ts` | Hook returning mock suggestions based on active page |
| `src/features/command-center/components/boot-loader.tsx` | Boot animation as a one-time loading overlay using CSS keyframes, Inter font, Horizon tokens. Respects `prefers-reduced-motion`. |

### Files to Modify

| File | Change |
|------|--------|
| `src/features/ai-dock/` (existing) | Accept route context and render contextual suggestions |
| `src/features/command-center/page.tsx` | Integrate BootLoader for initial page load |
| All pages | Apply motion audit fixes from motion-review |

### Content Connected

- `src/content/ai-dock.json` (CREATE — migrate terminal commands and responses from content-review:27-56)

### Motion Audit (from motion-review)

| Animation | Sprint 5 Action |
|-----------|-----------------|
| Boot typing | REFINE: CSS keyframes + `--motion-slow` per line. Use Inter, not monospace. Disable on reduced motion. |
| Pulse (status) | REFINE: 420ms, scale 1→1.15, opacity 1→0.7. Remove glow. |
| Counter animation | REFINE: 420ms ease-out, IntersectionObserver. Verify reduced-motion skip. |
| Blink cursor | REUSE: `--motion-normal` (280ms) half-cycle |
| Button hover | ✅ Already correct — `--motion-fast` (160ms) |
| Card hover | ✅ Already correct — `--motion-normal` (280ms) |

### Horizon Compliance Re-Verification

- [ ] All 8 violations from horizon-review:182-184 fixed
- [ ] No gradient text anywhere
- [ ] No glow effects anywhere
- [ ] No glassmorphism on any surface
- [ ] no mouse spotlight, no grid overlay
- [ ] All fonts: Inter (primary) + JetBrains Mono (code)

### Validation Criteria

- [ ] AI Dock suggestions change based on current route
- [ ] Suggestions include internal links (e.g., "View projects →")
- [ ] Mock AI responses return without API call
- [ ] Boot animation plays on first visit, respects reduced motion
- [ ] All motion uses Horizon motion tokens
- [ ] `next build` passes with 0 errors
- [ ] `next lint` passes with 0 warnings

---

## Sprint 6 — Review + Release

**Objective:** Final audit across accessibility, responsiveness, performance, and documentation. Build and lint must pass cleanly.

### Tasks

| Area | Checklist |
|------|-----------|
| **Accessibility** | Skip-to-content link present; `:focus-visible` on all interactive elements; `aria-label` on icons and badges; `prefers-reduced-motion` disables boot animation, counters, and pulse; contrast ratio ≥ 4.5:1 on all text; keyboard navigation through all routes verified |
| **Responsiveness** | Test at 320px (mobile single-column), 768px (tablet 2-column), 1440px (desktop full layout). No horizontal overflow. All navigation works on touch. |
| **Performance** | No render-blocking resources. Images/icons locally bundled (no CDN dependency for Lucide). Next.js static export configured. |
| **Content Audit** | Zero hardcoded strings in JSX. Every text node comes from `src/content/*.json`. Verify `ai-dock.json` created and wired. |
| **Portfolio Remediation** | Personal name NOT in hero. "About me" sections removed. Contact is footer-only. Career timeline replaced with ecosystem milestone timeline. (From product-review:55-74) |
| **Build & Lint** | `next build` passes with 0 errors. `next lint` passes with 0 errors, 0 warnings. |
| **Documentation** | Update any README or architecture docs that reference the legacy Command Center. Add reference to PRD v2 and this roadmap. |

### Files to Modify

| File | Change |
|------|--------|
| Any sprint 1-5 file | Apply fixes from the audit |

### Validation Criteria

- [ ] Lighthouse Accessibility score ≥ 95
- [ ] No layout shift across 320px, 768px, 1440px breakpoints
- [ ] `prefers-reduced-motion` disables all non-essential animations
- [ ] All interactive elements have visible `:focus-visible` indicators (2px `--color-accent-qa` outline)
- [ ] `next build` passes with 0 errors
- [ ] `next lint` passes with 0 errors, 0 warnings
- [ ] Deprecated Command Center references removed from docs

---

## Release Checklist

- [ ] PRD v2 requirements met (all P0 items complete)
- [ ] All 8 horizon-compliance violations fixed
- [ ] No hardcoded content in JSX
- [ ] Responsive across all breakpoints
- [ ] Keyboard navigable
- [ ] Reduced motion respected
- [ ] Build + lint pass
- [ ] Portfolio excess removed (product-review compliance)
- [ ] Legacy references cleaned up
