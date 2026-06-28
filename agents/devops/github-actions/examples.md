# GitHub Actions — Usage Examples

## Example 1: Speeding up CI

**Request:** "CI takes 25 minutes. Get it under 15."

**GitHub Actions agent would:**
- Enable npm cache in setup-node step
- Cache Playwright browsers
- Add Next.js build cache persistence
- Run lint, typecheck, and unit tests in parallel jobs
- Shard Playwright e2e tests across 4 runners

**Output:** Updated `ci.yml` and `e2e.yml` with caching and parallelization

## Example 2: Adding a new workflow

**Request:** "Create a workflow that deploys to staging on every merge to main."

**GitHub Actions agent would:**
- Create `.github/workflows/deploy.yml`
- Trigger: `push` on `main` branch
- Steps: checkout → build Docker → push to registry → deploy to staging
- Add environment secrets for staging
- Configure Slack notification on success/failure

**Output:** `deploy.yml` workflow file

## Example 3: Debugging CI failure

**Request:** "The e2e workflow keeps failing on 'Browser not found'."

**GitHub Actions agent would:**
- Check if Playwright browsers are being installed correctly
- Verify cached browsers path matches Playwright config
- Add `npx playwright install --with-deps` step before tests
- Ensure Docker container has necessary system dependencies
- Review cache key to ensure browsers aren't stale

**Output:** Root cause analysis + workflow fix
