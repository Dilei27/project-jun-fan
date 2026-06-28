# Refactoring — Validation Checklist

## Safety
- [ ] Is external behavior completely unchanged?
- [ ] Do all existing tests pass?
- [ ] Are the refactoring steps small enough to review?
- [ ] Is there a rollback plan for each change?

## Quality
- [ ] Does the refactored code meet current coding standards?
- [ ] Are TypeScript types improved (fewer `any`, better interfaces)?
- [ ] Are large components or functions successfully decomposed?
- [ ] Are design tokens used correctly (no hardcoded values)?
- [ ] Is the code more testable than before?

## Testing
- [ ] Were tests written for code that had none?
- [ ] Do tests cover the refactored logic adequately?
- [ ] Are flaky tests or test anti-patterns addressed?

## Migration
- [ ] If migrating a pattern, is there a clear migration path for remaining instances?
- [ ] Are deprecated patterns documented with their replacement?
