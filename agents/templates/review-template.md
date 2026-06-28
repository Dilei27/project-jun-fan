# Review — `<PR title or feature name>`

> Template for code, architecture, and design reviews.

## Reviewer

<!-- Who is performing the review? -->

## Review Type

Code Review / Architecture Review / Design Review / QA Review

## Scope

<!-- What is being reviewed? Link to PR, branch, or commit. -->

## Checklist

### Correctness

- [ ] Code behaves as specified in the requirements
- [ ] Edge cases are handled
- [ ] Error states are properly managed

### Architecture

- [ ] Follows `src/` dependency rules
- [ ] Server/client component split is correct
- [ ] No unnecessary abstractions

### Design System

- [ ] Uses Horizon tokens and components
- [ ] Dark mode supported
- [ ] Responsive at all breakpoints

### TypeScript

- [ ] Strict mode compatible
- [ ] No `any` types without justification
- [ ] Props are fully typed

### Performance

- [ ] No unnecessary re-renders
- [ ] Images are optimized
- [ ] Bundle impact is reasonable

### Accessibility

- [ ] Semantic HTML used
- [ ] Keyboard navigable
- [ ] Screen reader compatible

## Findings

### Must Fix (blocks merge)

- Finding 1

### Should Fix (recommended before merge)

- Finding 1

### Nice to Have (deferrable)

- Finding 1

## Decision

Approve / Changes Requested / Blocked

## Comments

<!-- Additional notes, questions, or context. -->
