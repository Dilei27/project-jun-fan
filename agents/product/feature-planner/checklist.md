# Feature Planner — Validation Checklist

## Decomposition
- [ ] Feature is scoped to a single page, section, or component
- [ ] Feature fits within the parent initiative boundaries
- [ ] Feature is independent enough to be built in one sprint
- [ ] All sub-features are identified and separated

## Content Schema
- [ ] JSON file path is specified
- [ ] Schema is typed (string, number, boolean, array, object)
- [ ] Nullable fields are marked
- [ ] Array min/max lengths are documented
- [ ] Example values are provided for every field
- [ ] Schema matches existing patterns in `src/content/`

## Component Mapping
- [ ] Every UI element maps to a Horizon Design System component
- [ ] New component requests include rationale and rough spec
- [ ] Component variants and props are specified
- [ ] Component tree is drawn

## State Coverage
- [ ] Default state is defined
- [ ] Loading state is defined (skeleton or spinner)
- [ ] Empty state is defined (message + optional CTA)
- [ ] Error state is defined (fallback UI)
- [ ] Edge cases are documented (single item, long text, missing fields, etc.)

## Acceptance Criteria
- [ ] Every story has acceptance criteria
- [ ] ACs are binary (pass/fail)
- [ ] ACs cover positive and negative scenarios
- [ ] ACs reference design system components by name
- [ ] Keyboard navigation and screen reader behavior are specified
- [ ] URL/route behavior is specified (if applicable)

## Dependencies
- [ ] Cross-feature dependencies are identified
- [ ] Shared component opportunities are flagged
- [ ] Design system gaps are noted (missing variants, missing components)
