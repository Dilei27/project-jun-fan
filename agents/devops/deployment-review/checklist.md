# Deployment Review — Validation Checklist

## Pre-Deployment
- [ ] All CI checks pass on the release commit
- [ ] Docker image is built and tagged correctly
- [ ] Image has passed CVE scan (no critical/high vulnerabilities)
- [ ] Staging deployment is successful and smoke tests pass
- [ ] QA sign-off is documented
- [ ] Release manager has approved the release
- [ ] Rollback plan is documented and reviewed
- [ ] Deployment window is scheduled and confirmed
- [ ] On-call engineer is available during deployment window
- [ ] Stakeholders are notified of deployment window

## Environment Parity
- [ ] Staging and production use the same Docker image
- [ ] Environment variables are consistent (except secrets and URLs)
- [ ] Feature flags are configured correctly for production
- [ ] CDN/static asset configuration is verified
- [ ] SSL certificates are valid and not expiring soon

## Deployment Execution
- [ ] Deployment follows the runbook step by step
- [ ] Canary or blue/green deployment strategy is used (if applicable)
- [ ] Smoke tests pass immediately after deployment
- [ ] Monitoring dashboards show normal metrics
- [ ] No error rate increase 15 minutes post-deployment
- [ ] Rollback plan is ready to execute if needed

## Rollback Readiness
- [ ] Previous known-good Docker tag is available
- [ ] Rollback steps are documented in the runbook
- [ ] Rollback can be completed within 10 minutes
- [ ] Rollback has been tested in staging
- [ ] Rollback triggers are clearly defined

## Post-Deployment
- [ ] Smoke tests continue to pass 30 minutes post-deployment
- [ ] Performance metrics are within expected range
- [ ] Error rate is at or below pre-deployment baseline
- [ ] Deployment record is created (date, version, changes, approvals)
- [ ] No regressions reported within 24 hours
