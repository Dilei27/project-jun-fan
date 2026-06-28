# Playbook — Review a Feature

## Goal

Ensure every feature meets Project Jun Fan's standards for quality, consistency, and maintainability.

## Steps

### 1. Understand the scope

- [ ] Read the linked PRD or feature spec
- [ ] Review the PR description for context, decisions, and trade-offs
- [ ] Check that the PR is scoped to a single feature or concern

### 2. Review the code

- [ ] Verify directory structure follows `agents/contexts/architecture.md` dependency rules
- [ ] Check that components use Horizon design system primitives, not ad-hoc styling
- [ ] Confirm types are strict (no `any`, no `@ts-expect-error` without justification)
- [ ] Ensure content is in JSON files, not hardcoded in components
- [ ] Check for proper error, loading, and empty states
- [ ] Verify accessibility: semantic HTML, ARIA labels, keyboard navigation, focus management
- [ ] Confirm animation is purposeful and respects `prefers-reduced-motion`

### 3. Review the design

- [ ] Run the design review checklist (see `agents/playbooks/design-review.md`)

### 4. Build and test

- [ ] Check out the branch locally
- [ ] Run `pnpm install` and `pnpm build` — zero errors
- [ ] Run `pnpm lint` — zero warnings
- [ ] Manually test the feature in the browser

### 5. Provide feedback

- [ ] Leave specific, actionable comments
- [ ] Separate "must fix" (blocks merge) from "nice to have" (deferrable)
- [ ] Approve only when all "must fix" items are resolved
