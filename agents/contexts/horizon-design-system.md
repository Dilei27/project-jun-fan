# Horizon Design System

Horizon is the design system for Project Jun Fan. It lives in `src/design-system/` and provides the visual and interaction foundation for every product.

## Design Tokens

All tokens are defined in Tailwind CSS 4 configuration and exposed as CSS custom properties.

### Colors

| Token | Purpose |
|-------|---------|
| `--color-surface` | Background surfaces |
| `--color-surface-alt` | Elevated surfaces (cards, modals) |
| `--color-border` | Borders and dividers |
| `--color-text-primary` | Primary body text |
| `--color-text-secondary` | Secondary / muted text |
| `--color-accent` | Primary interactive color |
| `--color-accent-hover` | Hover state for accent |
| `--color-success` | Positive / success states |
| `--color-warning` | Warning states |
| `--color-error` | Error / destructive states |

### Typography

| Token | Size | Weight | Line Height |
|-------|------|--------|-------------|
| `display` | 4rem / 64px | 700 | 1.1 |
| `heading-1` | 2.5rem / 40px | 600 | 1.2 |
| `heading-2` | 2rem / 32px | 600 | 1.25 |
| `heading-3` | 1.5rem / 24px | 600 | 1.3 |
| `body` | 1rem / 16px | 400 | 1.6 |
| `body-small` | 0.875rem / 14px | 400 | 1.6 |
| `caption` | 0.75rem / 12px | 500 | 1.5 |

### Spacing

Spacing uses a 4px base unit: `0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem, 8rem`.

### Border Radius

| Token | Value |
|-------|-------|
| `radius-sm` | 4px |
| `radius-md` | 8px |
| `radius-lg` | 12px |
| `radius-xl` | 16px |
| `radius-full` | 9999px |

## Components

All components in `src/design-system/` follow these rules:

1. **Accept `className`** — Every component accepts a `className` prop for one-off overrides.
2. **Forward refs** — Use `React.forwardRef` for interactive components.
3. **Support `asChild`** — Where appropriate, support slot-based composition via Radix-like `asChild`.
4. **Export types** — Export component props as TypeScript types.
5. **Dark mode** — Every component supports light and dark mode via Tailwind's `dark:` variant.
6. **Accessible** — All interactive components meet WCAG 2.1 AA at minimum.

## Component Catalog

| Component | Status |
|-----------|--------|
| Button | Stable |
| Input | Stable |
| Select | Stable |
| Dialog | Stable |
| Toast | Stable |
| Tooltip | Stable |
| Badge | Stable |
| Card | Stable |
| Tabs | In progress |
| Table | Planned |
| Drawer | Planned |
