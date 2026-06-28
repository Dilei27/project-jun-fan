# Release Manager — Usage Examples

## Example 1: Planning a minor release

**Request:** "We're releasing v2.3.0 next week with the new search feature and dashboard improvements."

**Release Manager would:**
- Verify all feature PRs are merged to main
- Create `release/v2.3.0` branch from main
- Coordinate with QA for full regression testing
- Generate changelog from conventional commits since v2.2.0
- Categorize: 1 Feature (Search), 3 Improvements (Dashboard), 5 Bug Fixes, 2 Dependency Updates
- Share release plan with stakeholders
- Schedule release for Thursday (standard release day)

**Output:** Release branch + changelog + communication plan

## Example 2: Handling a hotfix

**Request:** "Critical bug in the search feature — results don't load. Need a fix now."

**Release Manager would:**
- Identify all commits needed for the fix
- Create `hotfix/v2.3.1` branch from `v2.3.0` tag
- Cherry-pick the fix commits
- Fast-track code review and QA approval
- Tag `v2.3.1` and deploy
- Announce the hotfix release
- Merge hotfix back to main

**Output:** Hotfix release + communication

## Example 3: Post-release review

**Request:** "Let's review the v2.3.0 release — it had issues in production."

**Release Manager would:**
- Gather metrics: time to deploy, regression pass rate, production errors
- Document issues: search results timeout, dashboard animation jank
- Identify root causes: missing performance tests, incomplete regression scope
- Recommend process changes: add load testing to regression, update regression checklist
- Schedule follow-up for next sprint

**Output:** Post-release review document + action items
