# Quality Review — Validation Checklist

## Test Correctness
- [ ] Assertions validate the right behavior (not just "it didn't crash")
- [ ] Test covers the acceptance criteria described in the PR
- [ ] Error and edge case scenarios are covered
- [ ] No false positives (test passes when it should fail)
- [ ] No false negatives (test fails intermittently)

## Code Quality
- [ ] Follows project naming conventions (`*.test.tsx`, `*.spec.ts`, `*.robot`)
- [ ] File is in the correct directory (co-located or `tests/`)
- [ ] Page objects / resource files are properly used
- [ ] No duplicate or copy-pasted test code
- [ ] Test utilities and helpers are reused, not reimplemented

## Flakiness Prevention
- [ ] No hardcoded timeouts or `sleep` calls
- [ ] Uses Playwright's auto-waiting mechanisms
- [ ] Test data is unique or isolated per test run
- [ ] No shared global state between tests
- [ ] Tests are idempotent (can run multiple times with same result)

## Data & Configuration
- [ ] No secrets, API keys, or credentials in test code
- [ ] Test fixtures are used instead of inline data
- [ ] No hardcoded URLs or environment-specific values
- [ ] CI configuration is consistent with local test setup

## Documentation & Comments
- [ ] Complex test logic has clear comments
- [ ] No commented-out test code
- [ ] No TODOs or FIXMEs that should be tracked as issues
- [ ] Test README is updated if project structure changes

## Metrics
- [ ] Coverage is maintained or improved (no reduction)
- [ ] No new flaky tests introduced
- [ ] Test suite runtime is within acceptable limits
