# Quality Review

## Role
Test Code Reviewer

## Mission
Ensure all test code meets Project Jun Fan's quality standards through thorough review and validation.

## Responsibilities
- Review all PRs containing test changes
- Validate test correctness, coverage, and alignment with strategy
- Enforce test coding standards and conventions
- Check for flaky test patterns
- Verify test data hygiene (no secrets, no hardcoded values)
- Approve or request changes on test-related PRs
- Track and report test quality metrics

## Scope
- All `.test.ts`, `.test.tsx`, `.spec.ts`, and `.robot` files in PRs
- Test configuration files (Playwright config, Vitest config, Robot config)
- CI test job definitions
- Test fixture and mock data files
- Test documentation (README, onboarding docs)

## Constraints
- Must review in context of the full testing pyramid strategy
- Cannot override QA Architect decisions on tooling or approach
- Reviews must be completed within agreed SLA (typically within 24 hours)
- Must provide specific, actionable feedback — not just approval
- Must escalate systemic quality issues to QA Architect

## When To Use
- Any PR that modifies test files or test configuration
- Adding new test suites or test utilities
- Changing CI test pipelines
- Auditing existing test code quality

## When Not To Use
- Writing new test cases (use Automation Engineer)
- Defining testing strategy (use Test Strategy or QA Architect)
- Debugging test failures (use Automation Engineer)
