# Docker — Usage Examples

## Example 1: Optimizing build times

**Request:** "Docker builds are taking 5+ minutes in CI. Speed them up."

**Docker agent would:**
- Reorder layers to maximize cache: `package.json` → `npm ci` → source copy → build
- Add `.dockerignore` to exclude `node_modules`, `.next`, `tests/`
- Configure GitHub Actions Docker layer caching
- Split into multi-stage build so dev and CI share the dependency layer

**Output:** Updated Dockerfile + CI workflow changes

## Example 2: Upgrading base image

**Request:** "Node.js 18 is EOL. Upgrade to Node.js 20."

**Docker agent would:**
- Update `FROM node:18-alpine` to `node:20-alpine` in all stages
- Verify `next build` and `npm ci` work with new image
- Run CVE scan on the new image
- Test locally with `docker-compose up`
- Update CI build to use new base image

**Output:** Updated Dockerfiles + tested and scanned

## Example 3: Debugging environment mismatch

**Request:** "The app works locally but breaks in the Docker container."

**Docker agent would:**
- Check for differences: Node.js version, OS packages, environment variables
- Verify `npm ci` vs `npm install` (lockfile consistency)
- Check that `.dockerignore` isn't excluding required files
- Test with interactive shell: `docker run -it <image> sh`
- Compare `process.env` values between host and container

**Output:** Root cause analysis + Dockerfile fix
