# Automation Engineer — Usage Examples

## Example 1: Adding E2E tests for a new feature

**Request:** "The new search page needs E2E tests."

**Automation Engineer would:**
- Create `tests/e2e/search.spec.ts` with user scenarios
- Build a `SearchPage.page.ts` page object
- Test empty state, results state, error state, loading state
- Use JSON fixture for search results mock
- Verify accessibility with axe-core integration

## Example 2: Debugging a flaky test

**Request:** "The login test fails randomly in CI but passes locally."

**Automation Engineer would:**
- Check for race conditions (animations, async data loading)
- Look for shared test data that may conflict with parallel runs
- Review if `waitForNavigation` or similar patterns are misused
- Add `page.waitForLoadState('networkidle')` if needed
- Link the fix to the flaky test tracking issue

## Example 3: Writing a Robot Framework acceptance test

**Request:** "Write acceptance criteria for the user profile feature."

**Automation Engineer would:**
- Create `UserProfile.robot` with Given/When/Then scenarios
- Define reusable keywords in `profile.resource.robot`
- Set up test data in `profile_vars.yaml`
- Cover: view profile, edit profile, validation errors, cancel edit
- Test runs against the same Playwright browser under the hood
