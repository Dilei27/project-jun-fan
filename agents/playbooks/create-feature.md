# Playbook — Create a New Feature

## Prerequisites

- [ ] A PRD or feature spec has been approved (see `templates/feature-template.md`)
- [ ] You have read `agents/contexts/architecture.md` for dependency rules
- [ ] You have read `agents/contexts/engineering-handbook.md` for conventions

## Steps

### 1. Plan the feature

- [ ] Define the component tree and data flow
- [ ] Identify which directory each piece belongs to (`features/`, `components/`, `app/`, etc.)
- [ ] List design system primitives needed; escalate to Horizon if something is missing
- [ ] Write a brief plan and share it for quick alignment

### 2. Create content

- [ ] Add JSON content files to `src/content/` for any authored text or data
- [ ] Define TypeScript types for the content structure (in `types/` or colocated)
- [ ] Write a validation schema (Zod or manual) in `lib/`

### 3. Build components

- [ ] Start from the leaves: build design system primitives first, then compose upward
- [ ] Create feature components in `src/features/<feature-name>/`
- [ ] Create shared components in `src/components/` if used outside this feature
- [ ] Add loading states, empty states, and error boundaries
- [ ] Add Framer Motion animations for entry/exit and layout transitions

### 4. Wire the route

- [ ] Create the route directory in `src/app/` following Next.js App Router conventions
- [ ] Add the page component, loading state (`loading.tsx`), and error boundary (`error.tsx`)
- [ ] Update navigation config in `src/config/`

### 5. Test

- [ ] Run `pnpm build` — confirm zero TypeScript and ESLint errors
- [ ] Test all interaction states (hover, focus, active, disabled)
- [ ] Test responsive behavior at 320px, 768px, 1024px, 1440px
- [ ] Test dark mode
- [ ] Test with JavaScript disabled (core content should render)

### 6. Submit

- [ ] Create a feature branch from `main`
- [ ] Commit with conventional commit format: `feat(<scope>): <description>`
- [ ] Open a PR and fill out the review template (see `templates/review-template.md`)
- [ ] Request reviews from engineering and design
