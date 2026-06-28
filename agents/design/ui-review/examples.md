# UI Review Agent — Usage Examples

## Example 1: Visual Fidelity Bug

```markdown
## Bug #001: Chip component uses wrong text color

**Location:** Projects page — filter chips
**Severity:** M

### Expected
Chip text color should be `color-neutral-700` (#374151) per DS-014.

### Actual
Chip text color is `color-neutral-500` (#6B7280). Contrast ratio falls to 3.8:1 on the default background, below the 4.5:1 AA standard.

### Steps to Reproduce
1. Navigate to /projects
2. Observe any filter chip

### Evidence
[screenshot showing color comparison]

### Spec Reference
DS-014: Chip Component — Default variant
```

---

## Example 2: Accessibility Issue

```markdown
## Bug #002: Filter chips not keyboard accessible

**Location:** Projects page — filter bar
**Severity:** S

### Expected
Chips should be focusable via Tab and activatable via Enter/Space per DS-014 accessibility spec.

### Actual
Chips are rendered as `<div>` elements with `onClick` but no `tabindex`, `role`, or keyboard event handlers. They cannot be focused or activated via keyboard.

### Steps to Reproduce
1. Navigate to /projects
2. Press Tab repeatedly — chips are skipped
3. Attempt to press Enter on a chip — nothing happens

### Spec Reference
DS-014: Chip Component — Accessibility: `role="button"`, `tabindex="0"`, keyboard handlers for Enter and Space
```

---

## Example 3: Motion Bug

```markdown
## Bug #003: Card grid entrance uses wrong easing

**Location:** Projects page — card grid
**Severity:** L

### Expected
Cards should enter with `motion-ease-out` (cubic-bezier(0, 0, 0.2, 1)) per MOTION-003.

### Actual
Cards enter with `motion-ease-in-out` (cubic-bezier(0.4, 0, 0.2, 1)). The animation feels slower and less crisp.

### Steps to Reproduce
1. Navigate to /projects
2. Observe the card entrance animation
3. Record at 60fps and compare easing curve

### Spec Reference
MOTION-003: Card Grid Stagger Entrance
```

---

## Example 4: Full Review Summary

**Feature reviewed:** Case Studies page (`/case-studies`)

| # | Issue | Severity | Status |
|---|---|---|---|
| 001 | Hero image missing alt text | S | Open |
| 002 | Section heading font weight 700 instead of 600 | M | Open |
| 003 | Spacing between sections 48px instead of 64px | M | Open |
| 004 | "Read more" link not focusable via keyboard | S | Open |
| 005 | Exit animation missing from modal | L | Open |
| 006 | Mobile layout has horizontal scroll at 320px | S | Open |

**Overall assessment:** 6 issues found. 3 severity S issues must be fixed before release.
