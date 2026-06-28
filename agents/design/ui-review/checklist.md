# UI Review Agent — Validation Checklist

## Visual Fidelity
- [ ] Layout matches design spec (alignment, spacing, proportions)
- [ ] Typography matches spec (font family, weight, size, line height, letter spacing)
- [ ] Colors match design tokens (no hardcoded values, no off-spec hues)
- [ ] Iconography matches spec (icon set, size, stroke width)
- [ ] Images and media match spec (aspect ratio, fit, fallback)
- [ ] Shadows and radii match design tokens
- [ ] Responsive layout matches spec at all breakpoints

## Interaction States
- [ ] Hover state is implemented (with correct motion)
- [ ] Focus state is visible and meets contrast requirements
- [ ] Active/pressed state is implemented
- [ ] Disabled state is visually distinct and prevents interaction
- [ ] Loading state is shown during data processing
- [ ] Error state shows actionable message
- [ ] Empty state shows appropriate message and optional CTA

## Content States
- [ ] Default state renders correctly with sample data
- [ ] Empty data state is handled (empty array, no results, etc.)
- [ ] Error state handles missing or malformed data gracefully
- [ ] Edge cases tested: single item, very long text, special characters, null values

## Accessibility
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 normal text, 3:1 large text)
- [ ] All interactive elements are keyboard accessible (Tab, Enter, Escape, Arrow keys)
- [ ] Focus order follows visual order
- [ ] ARIA labels are present where needed
- [ ] Screen reader announces state changes (live regions, aria-live)
- [ ] Images have alt text (decorative images have `alt=""` or `aria-hidden="true"`)
- [ ] Touch targets are at least 44x44px

## Motion
- [ ] Animation duration matches motion token spec
- [ ] Easing curve matches motion token spec
- [ ] `prefers-reduced-motion` is respected
- [ ] No animation causes layout shift
- [ ] Stagger delays match spec where applicable

## Responsive & Cross-Browser
- [ ] Works at 375px width (mobile)
- [ ] Works at 768px width (tablet)
- [ ] Works at 1024px width (desktop)
- [ ] Works at 1440px width (wide desktop)
- [ ] Works in Chrome (latest)
- [ ] Works in Firefox (latest)
- [ ] Works in Safari (latest)
- [ ] No horizontal scroll on any breakpoint (intentional overflow excluded)
