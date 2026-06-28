# Test Strategy — Usage Examples

## Example 1: Test plan for a new feature

**Request:** "Create a test plan for the new 'Saved Searches' feature."

**Test Strategy would:**
- Review the PRD and design mockups
- Identify user journeys: save a search, view saved searches, delete a search, execute a saved search
- Assess risk: saved search data is JSON-driven → moderate risk if content structure changes
- Design test cases: 4 critical, 8 high, 4 medium, 2 low
- Map coverage: unit for save/delete logic, component for the saved searches panel, E2E for full journey
- Document edge cases: empty saved searches, duplicate names, search with no results

**Output:** `docs/tests/plans/saved-searches-test-plan.md` + test case inventory

## Example 2: Regression scope for a release

**Request:** "What should we test for the v2.3 release?"

**Test Strategy would:**
- Review changes between v2.2 and v2.3
- Identify affected areas: search, user profile, dashboard
- Recommend full regression for search and profile (high risk), targeted tests for dashboard (low risk)
- Estimate regression suite runtime: ~22 minutes (within 30 min budget)
- Flag 3 manual test cases for visual regression on new animation states

**Output:** Regression plan with scope, estimated time, and risk rationale

## Example 3: Coverage gap analysis

**Request:** "We found a bug in the JSON content loader that went to production."

**Test Strategy would:**
- Analyze the root cause — no test for malformed JSON input
- Identify coverage gap: JSON parsing utilities lack error handling tests
- Recommend 4 new test cases at the unit layer
- Add to risk assessment: JSON content changes should always trigger unit test reviews
- Escalate to QA Architect for process improvement

**Output:** Gap analysis report + recommended test cases
