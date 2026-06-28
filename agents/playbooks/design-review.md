# Playbook — Design System Compliance Review

## Goal

Ensure every UI change is consistent with the Horizon Design System and Project Jun Fan's visual principles.

## Steps

### 1. Token compliance

- [ ] Are all colors from the Horizon palette? (No hardcoded hex values)
- [ ] Are all font sizes from the Horizon type scale?
- [ ] Are all spacing values from the Horizon spacing scale?
- [ ] Are all border radii from the Horizon radius tokens?
- [ ] Check for any usage of `text-xs`, `text-lg`, etc. that doesn't match the scale

### 2. Component compliance

- [ ] Are form elements using Horizon `Input`, `Select`, `Button` components?
- [ ] Are interactive elements using the correct hover/focus/active/disabled states?
- [ ] Are dialog/overlay elements using Horizon `Dialog` with proper focus trapping?
- [ ] Are notifications using Horizon `Toast`?
- [ ] Check for any inline `<button>` or `<input>` that should use a design system component

### 3. Dark mode

- [ ] Does every new component or page render correctly in dark mode?
- [ ] Are there any hardcoded light-mode colors that don't switch?
- [ ] Do images and icons have appropriate dark mode treatment?

### 4. Responsive design

- [ ] Does the layout work at 320px (mobile)?
- [ ] Does the layout work at 768px (tablet)?
- [ ] Does the layout work at 1440px (desktop)?
- [ ] Are touch targets at least 44x44px on mobile?

### 5. Motion

- [ ] Do animations use Framer Motion, not CSS animations?
- [ ] Are animations disabled or reduced when `prefers-reduced-motion` is set?
- [ ] Do transitions serve a purpose (feedback, hierarchy, spatial awareness)?

### 6. Accessibility

- [ ] Is color contrast at least 4.5:1 for normal text and 3:1 for large text?
- [ ] Are focus indicators visible and consistent?
- [ ] Do interactive elements have visible keyboard focus styles?
- [ ] Are all images decorated with `alt` text (empty `alt=""` for decorative)?
