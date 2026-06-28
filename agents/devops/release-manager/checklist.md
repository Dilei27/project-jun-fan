# Release Manager — Validation Checklist

## Pre-Release
- [ ] Version number follows SemVer and matches the release scope
- [ ] Release branch `release/vX.Y.Z` is created from main
- [ ] All PRs targeted for this release are merged
- [ ] Full regression suite passes on the release branch
- [ ] QA sign-off obtained (QA Architect for major, Test Strategy for minor/patch)
- [ ] Changelog is generated and reviewed
- [ ] Release notes are written (human-readable, grouped by category)
- [ ] Stakeholders have been notified of the release plan

## Release Execution
- [ ] Git tag `vX.Y.Z` is created and pushed
- [ ] GitHub Release is created with changelog
- [ ] Release branch is merged back to main
- [ ] Release branch is deleted
- [ ] Docker image is tagged with release version
- [ ] Deployment to production is complete
- [ ] Smoke tests pass in production

## Post-Release
- [ ] Release announcement is sent
- [ ] Release metrics are recorded (time to deploy, pass rate, errors)
- [ ] Rollback plan is documented (even if not executed)
- [ ] Post-release review is scheduled
- [ ] Lessons learned are documented
- [ ] Action items from retrospective are tracked

## Hotfix
- [ ] Hotfix follows the hotfix process (not a shortcut)
- [ ] Cherry-picked commits are clearly documented
- [ ] Only fixes — no feature additions in hotfix
- [ ] Patch version is incremented correctly
- [ ] Hotfix branch is merged back to main

## Communication
- [ ] Release plan shared 1 week before major/minor release
- [ ] Release candidate shared with QAs and stakeholders
- [ ] Release notes are published at time of release
- [ ] Post-release summary sent within 24 hours
- [ ] Release calendar is updated
