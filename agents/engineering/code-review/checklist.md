# Code Review — Validation Checklist

## Correctness
- [ ] Does the code do what the PR description claims?
- [ ] Are edge cases handled (null, undefined, empty arrays)?
- [ ] Are there any logic errors or race conditions?
- [ ] Do error boundaries cover new components?

## Code Style & Standards
- [ ] Does code pass ESLint and Prettier checks?
- [ ] Are naming conventions followed (files, components, functions, variables)?
- [ ] Are Horizon Design System tokens used instead of hardcoded values?
- [ ] Are imports organized and unused imports removed?

## TypeScript
- [ ] Are there any `any` types or `@ts-ignore` / `@ts-expect-error`?
- [ ] Are props and state properly typed?
- [ ] Are generics used appropriately?

## Testing
- [ ] Do new features include tests?
- [ ] Do bug fixes include a regression test?
- [ ] Do tests cover the failure/error paths?
- [ ] Do tests avoid testing implementation details?

## Accessibility
- [ ] Are all interactive elements keyboard accessible?
- [ ] Do images have meaningful alt text?
- [ ] Are color contrasts sufficient?
- [ ] Does `prefers-reduced-motion` disable unnecessary animations?

## Performance
- [ ] Are client components justified (could this be a server component)?
- [ ] Are large dependencies lazy-loaded?
- [ ] Are there unnecessary effect dependencies causing re-renders?
- [ ] Are images using `next/image` with proper sizes?
