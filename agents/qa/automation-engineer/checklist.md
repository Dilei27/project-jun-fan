# Automation Engineer Validation Checklist

## General
- [ ] Test is deterministic — same result every run
- [ ] No hardcoded values (URLs, ports, secrets, user data)
- [ ] Test code passes `npm run lint` and `npm run typecheck`
- [ ] No `console.log` or debug statements left in test code
- [ ] Test file follows naming convention and is in the correct directory

## Playwright E2E
- [ ] Uses `data-testid` selectors where possible
- [ ] Page objects encapsulate page interactions
- [ ] No `page.waitFor(ms)` — use built-in auto-waiting
- [ ] Tests clean up after themselves (no leftover state)
- [ ] Screenshots on failure are enabled

## Playwright Component
- [ ] Tests cover happy path, error states, and edge cases
- [ ] Animation states are verified (Framer Motion)
- [ ] Accessibility assertions are included (axe-core integration)
- [ ] Component is isolated — no external dependencies

## Robot Framework
- [ ] Keywords are reusable and documented
- [ ] Variables file separates test data from logic
- [ ] Test cases are independent and idempotent
- [ ] Suite setup/teardown properly manages test environments

## Unit Tests
- [ ] Pure functions have full input/output coverage
- [ ] Hooks are tested via `renderHook` from Testing Library
- [ ] No snapshot tests that are too large to review
- [ ] Mocks are scoped and restored after each test

## CI & Tooling
- [ ] All tests pass on local machine before pushing to CI
- [ ] CI test run completes within expected time budget
- [ ] Test artifacts (screenshots, videos, reports) are uploaded
- [ ] No new flaky tests introduced
