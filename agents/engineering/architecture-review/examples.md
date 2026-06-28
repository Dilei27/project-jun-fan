# Architecture Review — Usage Examples

## Example 1: ADR Review — Significant Concerns

**Input:** System-architect proposes adding Redux for state management.

**Action:** Architecture Review identifies that Redux adds significant boilerplate for a zero-backend project where Zustand or Context would suffice. Verdict: SIGNIFICANT CONCERNS. Recommends Zustand instead.

## Example 2: Component Design Review — Minor Concerns

**Input:** A design proposes a deeply nested component tree for the settings page.

**Action:** Architecture Review notes the deep nesting will make testing difficult but acknowledges it maps well to the route structure. Verdict: MINOR CONCERNS. Suggests flattening where possible.

## Example 3: Integration Review

**Input:** Frontend-engineer proposes using a charting library.

**Action:** Architecture Review checks bundle size impact, evaluates against JSON content model, and approves the library with a condition to lazy-load it only on the relevant page.
