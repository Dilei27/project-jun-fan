# Reviewer — Usage Examples

## Example 1: Code Review — Rejected

**Input:** Frontend-engineer submits a PR adding a new dashboard card.

**Action:** Reviewer finds hardcoded colors instead of Horizon Design System tokens and missing loading state. Verdict: REJECTED. Conditions: replace colors with tokens, add loading skeleton, and write a test for the empty state.

## Example 2: ADR Review — Approved with Conditions

**Input:** System-architect submits an ADR for a new caching strategy.

**Action:** Reviewer finds the design sound but notes missing cache invalidation strategy. Verdict: APPROVED WITH CONDITIONS. Conditions: add invalidation section before implementation begins.

## Example 3: Accessibility Review

**Input:** A new interactive timeline component.

**Action:** Reviewer checks keyboard navigation — finds arrow key handlers missing. Checks screen reader — finds timeline items lack `aria-label`. Reports both as critical issues.
