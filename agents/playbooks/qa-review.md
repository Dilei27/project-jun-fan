# Playbook — QA Review

## Goal

Catch functional, visual, and edge-case issues before code reaches production.

## Steps

### 1. Functional testing

- [ ] Do all interactive elements respond correctly (click, tap, keyboard)?
- [ ] Do forms validate input and show appropriate error messages?
- [ ] Do links and navigation work end-to-end?
- [ ] Do loading states display while content is being fetched?
- [ ] Do error boundaries catch and display errors gracefully?

### 2. Visual testing

- [ ] Compare screenshots against Figma designs or the previous baseline
- [ ] Check for visual regressions (unintended layout shifts, missing styles)
- [ ] Verify fonts are loading correctly (no FOUT/FOIT)
- [ ] Verify icons are rendering at the correct size

### 3. Responsive testing

- [ ] Test on mobile viewport (320px–428px)
- [ ] Test on tablet viewport (768px–1024px)
- [ ] Test on desktop viewport (1280px–1920px)
- [ ] Rotate device orientation on mobile/tablet
- [ ] Test with browser zoom at 200%

### 4. Cross-browser testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### 5. Accessibility testing

- [ ] Run automated aXe or Lighthouse a11y audit
- [ ] Navigate with keyboard only (Tab, Enter, Escape, arrow keys)
- [ ] Test with a screen reader (VoiceOver, NVDA)
- [ ] Verify all toggles, dialogs, and menus announce their state

### 6. Performance testing

- [ ] Run Lighthouse — target 90+ on all categories
- [ ] Check bundle size — no unexpected large chunks
- [ ] Verify images are properly sized and optimized

### 7. Edge cases

- [ ] Empty states (no data, empty list, etc.)
- [ ] Error states (network failure, invalid data, etc.)
- [ ] Boundary states (very long text, special characters, etc.)
- [ ] Rapid interactions (double-click, fast tabbing, etc.)

### 8. Report

- [ ] Log all issues with browser, OS, viewport, and steps to reproduce
- [ ] Tag issues by severity: critical, major, minor, cosmetic
- [ ] Verify fixes and close issues
