# Design System Agent — Validation Checklist

## Component Completeness
- [ ] Component has a clear, one-sentence purpose
- [ ] Anatomy diagram is included (text or ASCII)
- [ ] All props are documented with type, default, required flag, and description
- [ ] All variants are documented with usage guidance
- [ ] All interactive states are covered (default, hover, focus, active, disabled)
- [ ] Error and loading states are documented (if applicable)
- [ ] Responsive behavior is defined for sm, md, lg, xl

## Token Usage
- [ ] No hardcoded color values — all colors use design tokens
- [ ] No hardcoded spacing — all margins/padding use spacing tokens
- [ ] No hardcoded typography — all text uses font tokens
- [ ] No hardcoded radii or shadows — all use radius/shadow tokens
- [ ] Motion values reference motion tokens

## Accessibility
- [ ] Component meets WCAG 2.1 AA contrast ratios
- [ ] Keyboard interaction model is documented
- [ ] ARIA roles and attributes are specified
- [ ] Focus indicators are visible and meet 3:1 contrast
- [ ] Screen reader behavior is documented
- [ ] Touch target size is at least 44x44px for interactive elements

## Guidelines
- [ ] Do/Don't examples are included
- [ ] Common misuse patterns are documented
- [ ] Component composition guidance is provided (what parent/children are expected)
- [ ] Component is referenced in all consuming PRDs and feature definitions

## Review
- [ ] Component has been reviewed by the Branding agent (visual alignment)
- [ ] Component has been reviewed by the Motion agent (animation specs)
- [ ] Component has been reviewed by at least one engineer (implementability)
- [ ] Figma spec is in parity with the documented component
