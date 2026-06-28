# System Architect — Validation Checklist

## Architecture Design
- [ ] Does the design follow the Horizon Design System token conventions?
- [ ] Is the component hierarchy documented and easy to reason about?
- [ ] Is state ownership clearly defined (no prop drilling antipatterns)?
- [ ] Are data fetching patterns consistent with JSON-driven content approach?
- [ ] Does the routing design leverage Next.js App Router correctly (layouts, loading.tsx, error.tsx)?

## Consistency
- [ ] Does the design conflict with any existing ADR?
- [ ] Are there duplicate or overlapping components?
- [ ] Is the naming convention consistent across the tree?
- [ ] Are cross-cutting concerns (auth, theming, analytics) handled consistently?

## Documentation
- [ ] Is the ADR complete with rationale and trade-offs?
- [ ] Are downstream agents (frontend-engineer, refactoring) informed?
