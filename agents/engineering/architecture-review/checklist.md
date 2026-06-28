# Architecture Review — Validation Checklist

## Consistency
- [ ] Does the design follow existing patterns in the codebase?
- [ ] Does it conflict with any existing ADR?
- [ ] Are Horizon Design System tokens respected in the design?
- [ ] Does the component naming align with established conventions?

## Feasibility
- [ ] Can this be implemented with Next.js + TypeScript + Tailwind?
- [ ] Does it require a backend that does not exist?
- [ ] Can the JSON content model support this design?
- [ ] Are there any dependency or browser compatibility concerns?

## Performance
- [ ] Are there unnecessary client components when server components would work?
- [ ] Is data fetching designed to minimize waterfalls?
- [ ] Are large data sets handled with pagination or virtualization?

## Maintainability
- [ ] Is the design simple enough for a new team member to understand?
- [ ] Are abstractions justified or premature?
- [ ] Is there a clear migration path from the current state?
