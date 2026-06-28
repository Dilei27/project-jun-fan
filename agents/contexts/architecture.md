# Architecture — Project Jun Fan

## Front-End First Architecture

Project Jun Fan has zero backend dependencies. The application is entirely static and client-rendered (with server-side rendering at build time via Next.js). Every architectural decision serves one goal: **maintainability at scale without a backend.**

## Directory Structure and Rationale

### `src/app/`
Next.js App Router pages. Each route is a directory with a `page.tsx`. Layouts, loading states, and error boundaries live here. This is the entry point for every user-facing URL.

Why: File-based routing is the convention for Next.js. Keeping routes here and nothing else preserves clarity.

### `src/content/`
All authored content in JSON format. Products, pages, and features define their content here. No database, no CMS.

Why: Content is code. JSON is version-controllable, reviewable, and type-safe when paired with Zod or TypeScript `as const` assertions.

### `src/design-system/`
The Horizon Design System implementation. Contains tokens, primitives (Button, Input, Dialog, etc.), and design system utilities.

Why: Separating design system code from application code prevents coupling. Products consume Horizon as if it were an external library.

### `src/config/`
Site-wide configuration: navigation, metadata, feature flags, environment defaults.

Why: Configuration is not content (not translated, not product-specific) and not code (not business logic). It occupies its own layer.

### `src/features/`
Feature-specific components, hooks, and logic. Each feature is a subdirectory (e.g., `features/labs/`, `features/studio/`).

Why: Features encapsulate vertical slices of functionality. They can import from `design-system/` and `lib/` but not from other features.

### `src/components/`
Shared application components that are not design system primitives and not feature-specific. Examples: `Header`, `Footer`, `Layout`.

Why: These are the glue between the design system and features. They compose Horizon components into app-level patterns.

### `src/lib/`
Pure utility functions: formatting, validation, data transformation, constants. No React code.

Why: Keeping utilities pure and framework-agnostic makes them testable, portable, and tree-shakable.

### `src/types/`
Shared TypeScript types and interfaces used across the application. Feature-specific types live in the feature directory.

Why: Centralizing shared types prevents circular dependencies and makes type changes easier to audit.

## Data Flow

```
content/ (JSON) → lib/ (parse, validate) → design-system/ (primitives)
                                              ↓
                    components/ (compose primitives) → features/ (feature logic)
                                              ↓
                                        app/ (routes)
```

Data flows **down**. Content is parsed and validated by utilities, rendered through design system primitives, composed into application components, assembled into features, and finally routed by pages.

## Dependency Rules

- `app/` may import from anywhere
- `features/` may import from `design-system/`, `components/`, `lib/`, `types/`, `config/`
- `components/` may import from `design-system/`, `lib/`, `types/`, `config/`
- `design-system/` may import from `lib/`, `types/`
- `lib/` imports nothing from the project (only npm packages)
- `types/` imports nothing from the project

Violations are caught by ESLint import rules.
