# Motion Agent — Validation Checklist

## Motion Token Coverage
- [ ] Duration tokens cover all timing needs (50ms to 1000ms)
- [ ] Easing tokens are defined (in-out, out, in, spring)
- [ ] Stagger tokens are defined (fast, normal, slow)
- [ ] All tokens use the `motion-` prefix

## Animation Completeness
- [ ] Entrance animation is defined (property, from, to, duration, easing)
- [ ] Exit animation is defined (if applicable)
- [ ] Hover state animation is defined (for interactive elements)
- [ ] Focus state animation is defined (keyboard users)
- [ ] Loading/skeleton animation is defined (if applicable)
- [ ] Empty state animation is defined (if applicable)
- [ ] Error state animation is defined (if applicable)

## Performance
- [ ] Only GPU-accelerated properties are animated (opacity, transform)
- [ ] No layout-triggering properties (width, height, top, left, margin, padding)
- [ ] Animation completes within the allowed time budget (<300ms functional, <600ms celebratory)
- [ ] No animation causes layout shift (CLS > 0)
- [ ] Framer Motion's `layout` animations are used for position changes (not manual transforms)

## Accessibility
- [ ] `prefers-reduced-motion: reduce` is supported for every animation
- [ ] No essential information is conveyed only through animation
- [ ] Flashing animations respect WCAG 2.3.1 (no more than 3 flashes per second)
- [ ] Motion can be disabled globally without loss of functionality

## Consistency
- [ ] Animation uses design system motion tokens (not custom values)
- [ ] Similar components use similar motion specs
- [ ] Page transitions follow the established pattern
- [ ] Stagger delays are consistent across similar list/grid patterns

## Framer Motion Implementation
- [ ] Example code uses Framer Motion API correctly
- [ ] `AnimatePresence` is used for mount/unmount animations
- [ ] `layoutId` is used for shared layout animations
- [ ] Variants are used for coordinating multiple child animations
