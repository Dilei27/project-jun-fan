# Component Review — Legacy QA Command Center → Phoenix

## Classification Key

| Tag | Meaning |
|---|---|
| **REUSE** | Adopt as-is from existing `src/components/` or `src/features/` |
| **REFINE** | Port concept with modifications to fit Horizon / Phoenix architecture |
| **REBUILD** | Keep the idea but rewrite completely |
| **ARCHIVE** | Preserve concept for future consideration, not in MVP |
| **DISCARD** | Remove entirely — does not fit product direction |

---

## Standalone Single-Page (`/tmp/qa-command-center/index.html`)

| Component | Source | Classification | Target | Rationale |
|---|---|---|---|---|
| **Hero** | Standalone | **REBUILD** | `HeroCommandCenter` | Gradient text + badge concept is strong but needs full rewrite: Inter font, Horizon tokens, solid surfaces, product-first narrative. See `src/features/command-center/components/hero-command-center.tsx`. |
| **Neural Graph** | Standalone | **ARCHIVE** | — | Interactive canvas with spring physics and mouse repulsion is technically impressive but too complex, inaccessible, and outside Horizon's visual language. Preserve the skill-mapping concept for a future data-vis feature. |
| **Smart Terminal** | Standalone | **REBUILD** | AI Dock | The command-prompt interface is the precursor to the AI Dock. Rebuild as a structured AI interaction panel with suggestions, history, and context-aware responses. See `src/features/ai-dock/`. |
| **Boot Terminal** | Standalone | **REFINE** | `Skeleton` / Loading component | Character-by-character typing animation has loading-screen potential. Refine as a Horizon-compatible loading state with reduced motion support. |
| **Impact Counters** | Standalone | **REFINE** | `MetricCard` | Animated number counters are effective. Refine as a reusable `MetricCard` component in `src/components/ui/` with IntersectionObserver, reduced-motion respect, and Horizon typography. |
| **Mouse Spotlight** | Standalone | **DISCARD** | — | Radial gradient following cursor conflicts with reduced motion preferences, adds no functional value, and breaks on touch devices. |
| **Grid Background** | Standalone | **DISCARD** | — | CSS grid pattern overlay is visual noise. Horizon uses solid deep backgrounds (`#0B0F14`, `#070A0F`). |
| **Stack Tags** | Standalone | **REUSE** | `Badge` | Already covered by the `Badge` component in `src/components/ui/badge.tsx`. No new component needed. |

---

## Django Multi-Page (`archive/backend-draft/templates/core/`)

### Shared / Layout Components

| Component | Source | Classification | Target | Rationale |
|---|---|---|---|---|
| **Header / Nav** | Django | **REUSE** | `src/components/layout/header.tsx` | Already implemented. Django version used horizon CSS classes that map directly. |
| **Footer** | Django | **REUSE** | `src/components/layout/footer.tsx` | Already implemented. Links + copyright pattern is identical. |
| **Docs Sidebar** | Django | **REUSE** | `src/features/docs-sidebar/` | Navigation list pattern already exists in the feature module. |

### Feature Components

| Component | Source | Classification | Target | Rationale |
|---|---|---|---|---|
| **Status Strip** | Django | **REUSE** | `src/components/shared/status-strip.tsx` | Badges + product status layout is already implemented and matches Horizon. |
| **AI Insight Cards** | Django | **REUSE** | `src/components/shared/ai-insight-card.tsx` | Three-card layout with icons and labels is already in shared components. |
| **AI Dock** | Django | **REUSE** | `src/features/ai-dock/` | Input + suggestion chips + response area pattern already exists as a feature module. |
| **Command Palette** | Django | **REUSE** | `src/features/command-palette/` | Ctrl+K search overlay is already implemented as a separate feature. |

### Card Components

| Component | Source | Classification | Target | Rationale |
|---|---|---|---|---|
| **Product Card** | Django | **REUSE** | `src/components/cards/product-card.tsx` | Accent color strip + stack tags + detail link. Already implemented. |
| **Project Card** | Django | **REUSE** | `src/components/cards/project-card.tsx` | Status badge + context + impact metrics. Already implemented. |
| **Decision Card** | Django | **REUSE** | `src/components/cards/decision-card.tsx` | Context + rationale + tradeoffs layout. Already implemented. |

### Section / Page Components

| Component | Source | Classification | Target | Rationale |
|---|---|---|---|---|
| **Timeline** | Django | **REFINE** | `src/components/shared/timeline.tsx` | Django version uses horizontal track with nodes. Phoenix needs vertical timeline. Refine existing shared component. |
| **Architecture Flow** | Django | **REUSE** | `src/features/command-center/components/architecture-flow.tsx` | Step-arrow diagram showing product ecosystem. Already exists as exclusive component. |
| **Hero** | Django | **REBUILD** | `HeroCommandCenter` | Same as standalone hero — rebuild with product-first narrative. |

---

## Summary Count

| Classification | Count | Items |
|---|---|---|
| **REUSE** | 11 | Header, Footer, Docs Sidebar, Status Strip, AI Insight Cards, AI Dock, Command Palette, Product Card, Project Card, Decision Card, Architecture Flow |
| **REFINE** | 3 | Boot Terminal → Loading, Impact Counters → MetricCard, Timeline (horizontal → vertical) |
| **REBUILD** | 2 | Hero (standalone + Django), Smart Terminal → AI Dock |
| **ARCHIVE** | 1 | Neural Graph |
| **DISCARD** | 3 | Mouse Spotlight, Grid Background, Stack Tags (covered by Badge) |

**Total legacy components evaluated: 20**
