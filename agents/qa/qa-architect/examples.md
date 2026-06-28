# QA Architect — Usage Examples

## Example 1: Evaluating a new visual testing tool

**Request:** "Should we adopt Chromatic for visual regression, or stick with Playwright's built-in screenshot comparison?"

**QA Architect would:**
- Compare both against selection criteria (TypeScript support, CI integration, cost, maintainability)
- Evaluate integration effort with current Playwright setup
- Run a spike with both, documenting trade-offs
- Recommend Chromatic for component-level visual diffs and Playwright snapshots for page-level

**Output:** Decision record + spike results

## Example 2: Test pyramid audit

**Request:** "Our test suite takes 45 minutes to run. Where do we optimize?"

**QA Architect would:**
- Profile test execution times per layer
- Check if too many tests are at the wrong level (e.g., E2E testing unit-level logic)
- Recommend shifting tests down the pyramid
- Suggest parallelisation and sharding improvements

**Output:** Audit report with migration plan

## Example 3: Onboarding a new QA agent

**Request:** "Set up the testing environment for a new automation engineer."

**QA Architect would:**
- Verify the test infrastructure README is current
- Create a setup script if missing
- Document the framework decisions and rationale
- Provide a walkthrough of the test project structure

**Output:** Updated onboarding docs + environment verification
