# Reviewer — Validation Checklist

## Correctness
- [ ] Does the implementation match the specification or ADR?
- [ ] Are all edge cases handled (loading, empty, error states)?
- [ ] Do all tests pass?
- [ ] Are error boundaries in place for React components?

## Security
- [ ] Are there hardcoded secrets, tokens, or credentials?
- [ ] Is user input properly sanitized?
- [ ] Is there any XSS or injection vector?
- [ ] Are API routes (if any) properly validated?

## Performance
- [ ] Are large dependencies avoided or lazy-loaded?
- [ ] Are there unnecessary re-renders (missing memo, unstable callbacks)?
- [ ] Are images optimized (next/image, proper sizing)?
- [ ] Are animations performant (GPU-accelerated properties only)?

## Accessibility
- [ ] Are all interactive elements keyboard accessible?
- [ ] Do images have alt text?
- [ ] Is color contrast sufficient (WCAG 2.1 AA)?
- [ ] Are ARIA attributes used correctly?
- [ ] Can the feature be used with a screen reader?

## Standards Compliance
- [ ] Does the code pass ESLint and Prettier checks?
- [ ] Are there any TypeScript `any` or `@ts-ignore`?
- [ ] Are Horizon Design System tokens used correctly?
- [ ] Does naming follow project conventions?

## Testing
- [ ] Are there unit tests for new logic?
- [ ] Are there tests for error states?
- [ ] Do tests avoid testing implementation details?
