# Engineering Handbook

## Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 16 | App Router, RSC, server actions, file-based routing |
| UI Runtime | React 19 | Concurrent features, hooks, server components |
| Language | TypeScript 5 | Strict mode, full type safety across the stack |
| Styling | Tailwind CSS 4 | Utility-first, JIT compilation, design tokens |
| Animation | Framer Motion 12 | Declarative animations, layout animations, gesture support |
| Icons | Lucide React | Consistent, tree-shakable icon set |
| Package Manager | pnpm | Fast, strict, disk-efficient |
| Containerization | Docker | Reproducible builds and deployments |
| Version Control | GitHub | PR-based workflow, Actions for CI/CD |

## Architecture Principles

1. **Front-end first** — The entire application lives in the browser. There is no backend.
2. **Composition over configuration** — Favor React component composition over config files or CLI generators.
3. **Colocation** — Place files as close as possible to where they are used.
4. **Static by default** — Use static generation (`generateStaticParams`) whenever possible.
5. **Progressive enhancement** — Core functionality works without JavaScript; JS adds interactivity.
6. **Type safety everywhere** — No `any`, no unchecked external data, no implicit `undefined`.

## Component Structure

### Server Components (default)
- Fetch and render data at build time or request time
- No state, no effects, no browser APIs
- File extension: `.tsx` (no `"use client"` directive)

### Client Components
- Add interactivity, state, effects, or browser APIs
- File extension: `.tsx` with `"use client"` as first line
- Minimize the client boundary — push interactivity to leaf components

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `camelCase.ts` (exported from `types/`)
- Content: `camelCase.json`

## Directory Structure

```
src/
├── app/           — Next.js App Router pages
├── components/    — Shared UI components
├── design-system/ — Horizon design system primitives
├── features/      — Feature-scoped components and logic
├── content/       — JSON content files
├── config/        — Site configuration
├── lib/           — Utility functions
├── types/         — Shared TypeScript types
└── styles/        — Global styles
```
