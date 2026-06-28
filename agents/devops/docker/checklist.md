# Docker — Validation Checklist

## Dockerfile Quality
- [ ] Multi-stage build is used (deps → build → production)
- [ ] Base image tag is pinned (no `latest`)
- [ ] `npm ci` used instead of `npm install`
- [ ] `.dockerignore` excludes unnecessary files
- [ ] Layer ordering optimizes cache (package.json before source)
- [ ] Production stage is minimal (no dev dependencies, no source code)
- [ ] Healthcheck is configured
- [ ] Container runs as non-root user

## Performance & Size
- [ ] Production image is under 100MB
- [ ] Build time is optimized (cached layers, parallel stages)
- [ ] No unnecessary packages or files in production image
- [ ] Multi-platform build is configured (linux/amd64, linux/arm64)

## Security
- [ ] Image passes CVE scan (no critical or high vulnerabilities)
- [ ] No secrets or credentials baked into image
- [ ] Read-only root filesystem where possible
- [ ] Minimum required ports exposed
- [ ] Base images are up to date

## Development Experience
- [ ] `docker-compose up` starts the application with hot reload
- [ ] Source directory is mounted (not copied) for dev
- [ ] Environment variables are configurable via `.env`
- [ ] Container works on both x86 and ARM64
- [ ] Debugging tools (e.g., debug port) are optional, not default

## CI Integration
- [ ] Docker build is cached in CI
- [ ] Image is tagged with commit SHA and branch
- [ ] Image is pushed to registry on merge to main
- [ ] CI uses the same Dockerfile as local development
