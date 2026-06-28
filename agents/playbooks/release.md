# Playbook — Release

## Goal

Deliver a stable, tested release to production with minimal risk and clear communication.

## Prerequisites

- [ ] All PRs for the release are merged into `main`
- [ ] The release has been QA-reviewed (see `agents/playbooks/qa-review.md`)
- [ ] No known critical or major bugs are open

## Steps

### 1. Prepare the release branch

- [ ] Create a release branch from `main`: `git checkout -b release/v<version>`
- [ ] Update the version in `package.json` following semver
- [ ] Update `CHANGELOG.md` with all changes since the last release
- [ ] Commit: `chore(release): v<version>`

### 2. Run final checks

- [ ] `pnpm install` — clean install
- [ ] `pnpm build` — production build, zero errors
- [ ] `pnpm lint` — zero warnings
- [ ] `pnpm test` — all tests pass (if test suite exists)
- [ ] Run a Lighthouse audit on the production build

### 3. Build and tag

- [ ] `docker build -t junfan:<version> .`
- [ ] Tag the release: `git tag v<version>`
- [ ] Push tags: `git push origin v<version>`

### 4. Deploy

- [ ] Push Docker image to container registry
- [ ] Deploy to production environment
- [ ] Verify the deployment: smoke test key pages and flows

### 5. Post-release

- [ ] Create a GitHub Release with release notes (generated from CHANGELOG)
- [ ] Merge release branch back into `main` (fast-forward)
- [ ] Notify the team in the designated channel
- [ ] Archive the release branch

## Versioning

Follow semver: `MAJOR.MINOR.PATCH`

- **MAJOR** — Breaking changes to architecture, design system tokens, or content schema
- **MINOR** — New features, new components, non-breaking additions
- **PATCH** — Bug fixes, performance improvements, documentation

## Release checklist template

```
## Release v<version>

### Changes
- <list of changes>

### QA status
- [ ] QA passed

### Deployment
- [ ] Docker image pushed: junfan:<version>
- [ ] Production deployed
- [ ] Smoke test passed

### Communication
- [ ] GitHub Release created
- [ ] Team notified
```
