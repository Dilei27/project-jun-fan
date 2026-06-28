# PRD — QA Command Center v2

## 1. Product Vision

> The QA Command Center is the first official product of Project Jun Fan. It demonstrates the ecosystem's capabilities through an interactive, narrative-driven experience that feels like a professional software product, not a portfolio.

---

## 2. Product Principles

Derived from analysis findings across all eight reviews:

| # | Principle | Source |
|---|-----------|--------|
| 1 | **Product first, portfolio second** — The legacy tried to be both and failed. Phoenix must choose product. Personal context is a subtle footer note, not the hero identity. | product-review:154 |
| 2 | **Interactive narrative over static display** — Terminal interaction, animated counters, and status strip created delight. The product must be explorable, not scrollable. | ux-review:148-158 |
| 3 | **Horizon compliance above all** — 8/10 legacy categories are non-compliant. Every pixel must use Horizon tokens. No gradients, no glow, no glassmorphism, no spotlights. | horizon-review:182-184 |
| 4 | **Content-driven, never hardcoded** — Zero text strings in JSX. All display content from `src/content/*.json`. Single source of truth across the ecosystem. | content-review:5 |
| 5 | **Motion with purpose, not decoration** — Keep boot animation (refined as loading). Keep animated counters (mapped to Horizon motion tokens). Discard float, spotlight, and all purely decorative effects. | motion-review:233-246 |

---

## 3. What the QA Command Center IS

- **First product** of the Project Jun Fan ecosystem
- **Interactive hub** for projects, decisions, metrics, and documentation
- **Demonstration** of Horizon Design System applied to a real product
- **Technical narrative** that explains engineering decisions and ecosystem architecture
- **Entry point** for the product ecosystem (QA, WhatsApp, Vigilante)
- **Cockpit** for the entire Jun Fan platform (from ux-review:125)

---

## 4. What it IS NOT

- **NOT a personal portfolio** — Remove "about me" excess, career timeline as primary narrative, and personal name as hero identity. (product-review:7, product-review:66-74)
- **NOT a dashboard** — Hero must be narrative-driven, not a wall of metrics. Metrics are supporting evidence, not the main attraction. (design-review:213)
- **NOT a landing page** — Must have depth and navigation. Multi-page with clear sections, not infinite scroll. (ux-review:141)
- **NOT a tech demo with neon effects** — No cyan-purple gradients, no glow shadows, no glassmorphism, no mouse spotlight, no CSS grid overlays. (horizon-review:159-165)
- **NOT a Django app with backend** — Zero backend, zero database, zero auth. Fully static Next.js build.

---

## 5. Target Audiences & Journeys

### Persona 1: Recrutador
**Goal:** Find skills, projects, and impact. Decide "should I interview this person?"
- **Entry:** Hero → Impact metrics → Projects → Contact
- **Needs:** Surface-level understanding of capabilities, clear CTA, scannable metrics
- **From ux-review:** Lead with product identity, surface impact in first viewport, add primary contact CTA

### Persona 2: Tech Lead
**Goal:** Evaluate technical depth, architecture decisions, code quality, stack fit.
- **Entry:** Architecture → Decisions → Stack → Projects
- **Needs:** ADR-level detail, architecture diagrams, code repository links, technical narrative
- **From ux-review:** Add Architecture section, surface decisions inline, add technical narrative section

### Persona 3: CTO
**Goal:** Evaluate ecosystem thinking, product strategy, integration vision, platform maturity.
- **Entry:** Ecosystem vision → Products → Hub → Roadmap
- **Needs:** Multi-product integration story, shared infrastructure narrative, roadmap teaser
- **From ux-review:** Add ecosystem overview, product hierarchy visualization, integration narrative

---

## 6. Functional Requirements

### P0 — MVP (Sprints 1-4)

| ID | Requirement | Source |
|----|-------------|--------|
| RF-01 | Hero with narrative (product title, tagline, ecosystem badge, CTAs) — no dashboard, no personal name | design-review:89-99 |
| RF-02 | Status Strip showing live product statuses (reuse shared component) | component-review:44 |
| RF-03 | Product Gateway / Product Grid with 3 ecosystem product cards (reuse ProductCard) | component-review:52 |
| RF-04 | Project listing at `/command-center/projects` with detail at `[slug]` | sprint-plan:32-57 |
| RF-05 | Problem / Solution / Stack / Impact sections on project detail | sprint-plan:34 |
| RF-06 | Metrics Grid with animated counters (refined from legacy use IntersectionObserver + `--motion-slow`) | motion-review:114-139 |
| RF-07 | Timeline component — vertical layout (refined from legacy horizontal), connected to timeline.json | component-review:61 |
| RF-08 | Skills Cloud with category grouping from skills.json | sprint-plan:63-83 |
| RF-09 | Decisions page at `/command-center/decisions` with DecisionCard reuse | sprint-plan:87-110 |
| RF-10 | Architecture Flow component showing ecosystem topology (reuse existing) | component-review:62 |

### P1 — Enhancement (Sprint 5)

| ID | Requirement | Source |
|----|-------------|--------|
| RF-11 | AI Dock with contextual suggestions based on current route | sprint-plan:115-137 |
| RF-12 | Search across all content (projects, decisions, docs, products) | discovery:66 |

### P2 — Future

| ID | Requirement | Source |
|----|-------------|--------|
| RF-13 | Interactive demo for each product (from legacy Django product_demo.html) | inventory:16 |
| RF-14 | Command Palette (Ctrl+K) for power navigation (already exists in shared features) | component-review:47 |

### ARCHIVE — Not in MVP

| ID | Requirement | Source |
|----|-------------|--------|
| RF-15 | Neural Graph — canvas-based skill visualization. Preserve concept for future data-viz feature. | component-review:20 |

---

## 7. Non-Functional Requirements

### Horizon Compliance
- **100% Horizon Design System compliance** — Fix all 8 violations identified in horizon-review:182-184
- Backgrounds: `#0B0F14` base (`--color-bg-base`), `#111821` surfaces (`--color-surface-default`)
- Borders: `--color-border-subtle` (`#263241`) and `--color-border-strong` (`#3A4658`)
- Text: `--color-text-primary` (`#F4F7FA`), `--color-text-secondary` (`#9AA6B8`), `--color-text-muted` (`#687385`)
- Accent: QA blue `#4F8CFF` (`--color-accent-qa`) — single accent, no multiple colors
- Typography: Inter (primary), JetBrains Mono (monospace)
- No gradients, no glow, no glassmorphism, no mouse spotlight, no grid overlays

### Infrastructure
- **Zero backend, zero database, zero auth** — Fully static Next.js export
- Build must pass with 0 errors, 0 lint warnings
- All content from `src/content/*.json` — no hardcoded text in JSX

### Responsiveness
- Mobile: 320px+ (single column, hamburger nav)
- Tablet: 768px+ (2-column grid)
- Desktop: 1440px+ (full layout, multi-column)

### Accessibility (from ux-review:162-189)
- Keyboard navigation — skip-to-content link, all interactive elements focusable via `:focus-visible`
- ARIA labels on all interactive elements
- `prefers-reduced-motion` respected at provider level — boot animation, counters, pulse disabled
- Contrast ratio 4.5:1 minimum (WCAG AA)
- No canvas elements without text fallback

### Motion (from motion-review)
- All animations mapped to Horizon motion tokens: `--motion-fast` (160ms), `--motion-normal` (280ms), `--motion-slow` (420ms)
- Boot animation: refined as CSS keyframe loading state, respects reduced motion
- Counter animation: 420ms ease-out via IntersectionObserver
- Pulse: 420ms, scale 1→1.15, opacity 1→0.7
- Discard: float, mouse spotlight, glow effects

---

## 8. Information Architecture

```
/command-center                              → Hero, Status Strip, Metrics, Product Gateway
/command-center/projects                     → Project grid listing
/command-center/projects/[slug]              → Problem / Solution / Stack / Impact
/command-center/decisions                    → Decision cards (context, rationale, trade-off, impact)
/command-center/timeline                     → Vertical timeline of ecosystem milestones
/command-center/architecture                 → Architecture Flow + ecosystem narrative
```

Navigation flow:
```
/command-center
  ├── Hero → CTA → /command-center/projects
  ├── Product Gateway → external product pages
  ├── Metrics → inline (no route)
  ├── Timeline → /command-center/timeline
  ├── Architecture → /command-center/architecture
  └── Status Strip → inline (no route)
        ├── Projects → /command-center/projects
        ├── Decisions → /command-center/decisions
        ├── Timeline → /command-center/timeline
        └── Architecture → /command-center/architecture
```

---

## 9. Design Guidelines

### Theme
- Horizon dark theme throughout
- Base: `#0B0F14` (`--color-bg-base`)
- Surfaces: `#111821` (`--color-surface-default`), `#151D27` (`--color-surface-elevated`)
- Soft surfaces: `#1B2430` (`--color-surface-soft`)

### Typography
- Primary: Inter (weights 400, 500, 600, 700)
- Mono: JetBrains Mono
- Scale: Horizon type scale (0.75rem — 3rem)

### Color
- **Single accent color:** QA blue `#4F8CFF` (`--color-accent-qa`)
- Secondary product accents: Teal `#2DD4BF`, Orange `#F97316` (from inventory:216-217)
- No cyan, no purple, no neon
- No gradient text — solid colors only

### Components
- Cards: solid `--color-surface-default` with `--color-border-subtle` — no glassmorphism
- Buttons: Horizon Button component — primary (`--color-accent-qa` bg), secondary (transparent + border), ghost (transparent + muted text)
- Badges: Horizon Badge component — `--color-success` for online, `--color-warning` for beta
- Status indicator: Pulse animation (420ms, scale 1→1.15) — no glow drop-shadow

### Effects to REMOVE (from design-review:201-207)
- Neon glows and shadows
- Grid overlay backgrounds
- Mouse spotlight
- Gradient text
- Glassmorphism panels
- Animated backgrounds

---

## 10. Content Requirements

| JSON File | Content | Status | Source |
|-----------|---------|--------|--------|
| `src/content/products.json` | Product names, descriptions, badges, CTAs | ✅ Exists | content-review:14-18 |
| `src/content/projects.json` | Project data: problem, solution, stack, impact | ✅ Exists | content-review:84-91 |
| `src/content/metrics.json` | Metric values, labels, descriptions | ✅ Exists | content-review:61-69 |
| `src/content/timeline.json` | Timeline entries with dates, titles, descriptions | ✅ Exists | content-review:16-17 |
| `src/content/skills.json` | Skill categories and items with proficiency | ⚠️ Verify | content-review:117-121 |
| `src/content/decisions.json` | Decision context, rationale, trade-off, impact | ✅ Exists | inventory:97-104 |
| `src/content/ai-dock.json` | AI commands, responses, suggestions | ❌ Create | content-review:27-56 |

**Rule:** No hardcoded text in JSX. Every string must be imported from a JSON file.

---

## 11. Acceptance Criteria

- [ ] Horizon Design System compliance verified (all tokens mapped, no violations)
- [ ] All content from `src/content/*.json` — zero hardcoded strings in JSX
- [ ] Responsive on mobile (320px), tablet (768px), desktop (1440px)
- [ ] Keyboard navigable — skip-to-content, focus-visible on all controls
- [ ] `prefers-reduced-motion` disables boot animation, counter animation, pulse
- [ ] `next build` passes with 0 errors
- [ ] `next lint` passes with 0 errors, 0 warnings
- [ ] No backend, no database, no auth — fully static export
- [ ] Neural graph removed (archived to future scope)
- [ ] Personal portfolio excess removed (name not in hero, no "about me", contact in footer only)
- [ ] All 8 horizon-review violations fixed
- [ ] All motion mapped to Horizon motion tokens
- [ ] All effects from design-review:201-207 removed

---

## Appendix: Analysis Sources

| Review | Key Findings Used |
|--------|-------------------|
| discovery.md | Full inventory of legacy pages, components, and interaction patterns |
| inventory.md | KEEP/IMPROVE/REMOVE/ARCHIVE classification for every legacy element |
| design-review.md | Visual analysis — Horizon vs legacy colors, typography, effects |
| ux-review.md | Personas (recruiter, tech lead, CTO), fatigue/delight analysis, accessibility |
| component-review.md | REUSE/REFINE/REBUILD/ARCHIVE/DISCARD for each component |
| content-review.md | Content migration audit — what's in JSON vs hardcoded |
| motion-review.md | Legacy animation audit mapped to Horizon motion tokens |
| horizon-review.md | Compliance scorecard — 8 violations to fix |
| product-review.md | Portfolio vs product identity crisis — the core strategic shift |
