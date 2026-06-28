# Playbook — Architecture Review

## Goal

Ensure architectural decisions align with Project Jun Fan principles and remain sustainable as the project grows.

## When to Run

- Before introducing a new directory or top-level module
- Before adding a new external dependency
- When a feature requires crossing existing architecture boundaries
- Quarterly as a health check on the current architecture

## Steps

### 1. Review dependency rules

- [ ] Verify `src/` directory dependency rules from `agents/contexts/architecture.md` are enforced
- [ ] Check for circular imports (run `madge` or similar tool)
- [ ] Confirm no feature imports from another feature

### 2. Review data flow

- [ ] Trace data from content JSON → parse → render → user
- [ ] Verify no unexpected side effects in the data pipeline
- [ ] Ensure content validation is in `lib/`, not in components

### 3. Review component boundaries

- [ ] Confirm server vs. client component split is correct
- [ ] Check that client boundaries are pushed to leaf components
- [ ] Verify `"use client"` directives are necessary and minimal

### 4. Review external dependencies

- [ ] Is the dependency necessary? Could the functionality be built with existing tools?
- [ ] Is it well-maintained? Check GitHub stars, recent releases, bundle size
- [ ] Does it support tree-shaking? Check the import pattern
- [ ] Does it conflict with existing dependencies (e.g., duplicate React)?

### 5. Review build and performance

- [ ] Check `pnpm build` output for unexpected chunks or large bundles
- [ ] Verify `generateStaticParams` is used where pages are data-driven
- [ ] Confirm no server-side dependencies leaked into client bundles

### 6. Document findings

- [ ] File an ADR for any approved architectural changes (see `templates/adr-template.md`)
- [ ] Update architecture docs if the review reveals outdated information
