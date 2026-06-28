# QA Architecture Validation Checklist

## Test Pyramid Balance
- [ ] Unit tests exist for all utilities, hooks, and store logic
- [ ] Component tests cover every Horizon Design System component
- [ ] E2E tests cover critical user journeys
- [ ] Acceptance tests exist for every delivered user story
- [ ] Visual regression testing is configured for UI components

## Tooling & Configuration
- [ ] No conflicting or overlapping test frameworks
- [ ] All tests run in CI without manual intervention
- [ ] Test scripts are consistent across `package.json`, Docker, and CI
- [ ] Reporting is configured (JUnit XML, HTML reports, CI annotations)
- [ ] Test timeouts and retries are tuned per test layer

## Project Structure
- [ ] Test files follow the agreed naming convention
- [ ] Shared fixtures/mocks are in a single `tests/support/` location
- [ ] Page objects / component helpers are centralized
- [ ] Test data factories or JSON fixtures are version-controlled
- [ ] No hardcoded URLs, tokens, or secrets in test code

## Maintainability
- [ ] Tests are deterministic (no flaky tests, no shared mutable state)
- [ ] CI pipeline retries are handled at the test framework level
- [ ] Accessibility testing (axe-core or similar) is integrated
- [ ] Performance budgets are defined and tested
- [ ] Test documentation is current (onboarding README in tests/)

## Governance
- [ ] Test framework changes require architecture review
- [ ] New test dependencies are audited for size and license
- [ ] All agents can run the full test suite locally with one command
- [ ] Test execution order is deterministic
