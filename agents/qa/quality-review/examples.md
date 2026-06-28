# Quality Review — Usage Examples

## Example 1: Reviewing an E2E test PR

**Request:** "Review PR #42 — new E2E tests for the checkout flow."

**Quality Review would:**
- Check that all checkout states are covered (empty cart, valid payment, error)
- Verify `data-testid` selectors are used instead of CSS classes
- Look for hardcoded timeouts or `waitForTimeout` calls
- Confirm test data is loaded from fixtures, not hardcoded
- Ensure the page object separates locators from logic
- Validate cleanup in `afterEach`/`teardown`

**Sample feedback:**
> "Line 34: Use `page.getByTestId('submit-btn')` instead of `page.locator('button.submit')`. Line 72: Hardcoded email address — move to fixture."
> "Approved with changes requested."

## Example 2: Reviewing Robot Framework tests

**Request:** "Review PR #58 — Robot Framework tests for the dashboard."

**Quality Review would:**
- Verify keywords are reusable and documented
- Check that variables are in `.yaml` files, not in test cases
- Confirm suite setup/teardown handles state properly
- Look for overlapping test cases between suites

**Sample feedback:**
> "The 'Open Dashboard' keyword is duplicated in both dashboard_tests.robot and navigation.resource.robot — consolidate into the resource file."

## Example 3: Systemic quality issue escalation

**Observation:** Multiple PRs show tests that use `setTimeout` instead of Playwright's built-in waiting.

**Quality Review would:**
- Identify the pattern across recent PRs
- Escalate to QA Architect with examples and recommendations
- Suggest adding a lint rule or CI check to catch this pattern
