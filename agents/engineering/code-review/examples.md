# Code Review — Usage Examples

## Example 1: Changes Requested

**Input:** PR adding a new filter bar component.

**Action:** Code review finds:
- Hardcoded colors instead of Horizon tokens (blocking)
- Missing loading state for async filter options (blocking)
- `useEffect` dependency missing from dependency array (blocking)
- Suggestion to use `useCallback` for the filter handler (non-blocking)

Verdict: CHANGES REQUESTED.

## Example 2: Approved

**Input:** PR fixing a typo in a JSON content file and updating the corresponding TypeScript interface.

**Action:** Small, clear change. Correctness verified. Interface matches the JSON structure. No style issues. Verdict: APPROVED.

## Example 3: Performance Concern

**Input:** PR adding a real-time search component using client-side filtering of 10,000 items.

**Action:** Code review flags the performance concern of filtering 10k items on every keystroke (blocking). Suggests debouncing, virtualization, or server-side filtering. Verdict: CHANGES REQUESTED.
