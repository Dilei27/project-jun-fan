# GitHub Actions — Validation Checklist

## Workflow Definition
- [ ] Workflow triggers are correct (pull_request, push, workflow_dispatch)
- [ ] Branch filters are properly configured
- [ ] No hardcoded secrets or tokens in workflow files
- [ ] All environment variables use `secrets.` or `vars.` context
- [ ] Matrix strategy is used for parallel test execution where appropriate
- [ ] Timeout per job is set (prevent runaway jobs)

## Performance & Caching
- [ ] npm dependencies are cached
- [ ] Playwright browsers are cached
- [ ] Docker layers are cached (if Docker workflow)
- [ ] Next.js build cache is persisted
- [ ] Jobs that can run in parallel are not sequential
- [ ] E2E tests are sharded if total runtime exceeds 15 minutes

## Test Integration
- [ ] Test reports are uploaded as artifacts
- [ ] Test results are posted as PR comments
- [ ] JUnit XML reports are generated for test analytics
- [ ] Screenshots and videos from failed Playwright tests are uploaded
- [ ] Coverage reports are generated and uploaded

## Security
- [ ] No secrets exposed in logs (GitHub Actions secret masking)
- [ ] `GITHUB_TOKEN` has minimum required permissions
- [ ] No third-party actions without version pinning (use SHA not tag)
- [ ] Workflow approval gates are configured for production deployments
- [ ] OIDC is used for cloud provider authentication where possible

## Reliability
- [ ] Workflows pass consistently (monitor success rate)
- [ ] Retry mechanism for flaky steps (e.g., network requests)
- [ ] Workflow duration is within acceptable limits
- [ ] Slack or email notifications on failure
- [ ] Workflow cleanup (delete old artifacts, cache management)
