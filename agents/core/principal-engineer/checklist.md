# Principal Engineer — Validation Checklist

## Standards
- [ ] Are coding conventions documented and accessible to all agents?
- [ ] Does every rule have a clear rationale?
- [ ] Are conventions enforced by automated tooling where possible?
- [ ] Is there a process for proposing and reviewing new standards?

## Tooling
- [ ] Is ESLint configured with project-specific rules?
- [ ] Is Prettier integrated and consistent across the team?
- [ ] Is TypeScript in strict mode?
- [ ] Are pre-commit hooks or CI checks in place for linting/formatting?

## Testing
- [ ] Is the testing strategy documented?
- [ ] Are there defined coverage targets?
- [ ] Are test patterns consistent (same framework, same conventions)?
- [ ] Are CI gates in place for tests?

## Architecture Review
- [ ] Have all architecture ADRs been reviewed for production readiness?
- [ ] Are error handling, logging, and observability considered in every design?
- [ ] Is performance considered in every major design decision?
