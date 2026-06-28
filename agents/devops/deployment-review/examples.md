# Deployment Review — Usage Examples

## Example 1: Validating a production deployment

**Request:** "We're deploying v2.3.0 to production. Validate the deployment plan."

**Deployment Review would:**
- Verify staging deployment is healthy with passing smoke tests
- Confirm Docker image tag `v2.3.0` exists and matches staging
- Check rollback plan: `v2.2.0` tag available, steps documented
- Verify deployment window (Thursday 10 AM) and on-call availability
- Review production readiness checklist
- Approve deployment or flag gaps

**Output:** Deployment approval with checklist confirmation

## Example 2: Creating a rollback plan

**Request:** "We need a rollback plan for the upcoming release."

**Deployment Review would:**
- Document rollback triggers: critical bug, >20% perf regression, accessibility failure
- Outline steps: notify team → revert Docker tag to `v2.2.0` → re-deploy → run smoke tests
- Verify `v2.2.0` Docker image is still in registry
- Test rollback procedure in staging environment
- Document estimated rollback time: ~8 minutes

**Output:** Rollback plan in deployment runbook

## Example 3: Investigating environment parity issue

**Request:** "The app works in staging but breaks in production."

**Deployment Review would:**
- Compare Docker images: are they the same tag?
- Check environment variables: are production-specific vars correct?
- Verify CDN and caching configuration
- Test with production config in staging (staging with production env vars)
- Identify root cause: missing `NEXT_PUBLIC_SITE_URL` in production

**Output:** Root cause analysis + fix for environment config
