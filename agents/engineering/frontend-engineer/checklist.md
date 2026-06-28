# Frontend Engineer — Validation Checklist

## Implementation
- [ ] Does the implementation match the system-architect's component design?
- [ ] Are Horizon Design System tokens used for colors, typography, and spacing?
- [ ] Is the component responsive across all breakpoints?
- [ ] Are Next.js App Router conventions followed (layouts, loading.tsx, error.tsx)?
- [ ] Are all states handled: loading, empty, error, success?

## Code Quality
- [ ] Does the code pass ESLint and Prettier?
- [ ] Are there any TypeScript errors or `any` types?
- [ ] Are component props properly typed with interfaces?
- [ ] Are event handlers and callbacks stable (useCallback where needed)?
- [ ] Are large components broken into smaller, testable pieces?

## Animations
- [ ] Are Framer Motion animations performant (transform/opacity only)?
- [ ] Do animations respect `prefers-reduced-motion`?

## Testing
- [ ] Are there tests for the component's primary behavior?
- [ ] Are edge cases (empty data, error state) tested?
- [ ] Do tests avoid testing implementation details?
