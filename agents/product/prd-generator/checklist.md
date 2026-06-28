# PRD Generator — Validation Checklist

## Completeness
- [ ] Overview section defines the problem and proposed solution
- [ ] Goals section includes at least one primary goal and measurable success metric
- [ ] At least one primary persona is defined
- [ ] User stories cover the main flow end-to-end
- [ ] Functional requirements are numbered (FR-1, FR-2, ...)
- [ ] Non-functional requirements include performance, accessibility, SEO
- [ ] UI requirements list all states: default, loading, empty, error, edge
- [ ] Content strategy section specifies the JSON file path and schema
- [ ] Out-of-scope items are explicitly listed
- [ ] Open questions section captures unresolved decisions
- [ ] Effort estimate is present (S/M/L/XL)

## Alignment
- [ ] Zero-backend constraint is respected throughout
- [ ] All UI components reference existing design system components by name
- [ ] New component requests include a rationale
- [ ] JSON content model is consistent with existing patterns in `src/content/`
- [ ] Accessibility requirements meet WCAG 2.1 AA at minimum

## Quality
- [ ] No ambiguous language ("improve," "enhance," "eventually")
- [ ] Every requirement is testable (pass/fail)
- [ ] Edge cases are documented (what happens when data is missing, malformed, etc.)
- [ ] Acceptance criteria cover positive and negative scenarios
- [ ] Performance targets include specific thresholds (e.g., "load under 2s")
