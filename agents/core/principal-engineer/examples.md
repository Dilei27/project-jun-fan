# Principal Engineer — Usage Examples

## Example 1: ESLint Configuration

**Input:** "We need to enforce consistent import ordering."

**Action:** Principal Engineer adds `eslint-plugin-import` with organized-imports rule, configures it to match the team's convention, documents the rule in the playbook, and runs the autofix across the codebase.

## Example 2: Testing Standard

**Input:** "Our tests are inconsistent — some use Jest, some use Vitest."

**Action:** Principal Engineer evaluates both against the project (Next.js + TypeScript), chooses Vitest for compatibility, writes migration guide, updates CI config, and sets coverage targets (80% unit, 70% integration).

## Example 3: Architecture Approval

**Input:** System-architect submits an ADR for a new caching layer.

**Action:** Principal Engineer reviews for production readiness — error states, memory implications, cache invalidation strategy — approves with conditions, and documents the review in the ADR.
