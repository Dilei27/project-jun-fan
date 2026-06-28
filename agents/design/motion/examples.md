# Motion Agent — Usage Examples

## Example 1: Card Grid Entrance Animation

```markdown
## Animation: Card Grid Stagger Entrance
**Component:** CardGrid
**Trigger:** Route change (navigating to /projects)

### Properties
- Property: `opacity`
  - From: `0`
  - To: `1`
- Property: `translateY`
  - From: `24px`
  - To: `0px`
- Duration: `motion-duration-300`
- Easing: `motion-ease-out`
- Stagger: `motion-stagger-normal` (60ms)
- Delay per card: `60ms * index`

### Accessibility
- `prefers-reduced-motion: reduce` → fade in only, no translateY, duration 150ms

### Framer Motion Example
```tsx
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1],
      delay: i * 0.06,
    },
  }),
};

<motion.div
  variants={cardVariants}
  initial="hidden"
  animate="visible"
  custom={index}
>
  <Card {...project} />
</motion.div>
```

### Performance Notes
- `opacity` and `transform` only — GPU accelerated
- No layout recalculations
```

---

## Example 2: Page Transition Spec

```markdown
## Animation: Page Route Transition
**Trigger:** `next/navigation` route change

### Shared Layout Animation
- Property: `borderRadius` (for shared elements with `layoutId`)
- Duration: `motion-duration-300`
- Easing: `motion-ease-in-out`

### Exit (old page)
- `opacity`: 1 → 0
- `scale`: 1 → 0.98
- Duration: `motion-duration-150`

### Entrance (new page)
- `opacity`: 0 → 1
- `scale`: 0.98 → 1
- Duration: `motion-duration-200`
- Delay: `50ms` (after exit)

### Accessibility
- `prefers-reduced-motion: reduce` → crossfade only (0.15s), no scale

### Framer Motion Example
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```
```

---

## Example 3: Micro-interaction — Button Press

```markdown
## Animation: Button Press
**Trigger:** `mousedown` / `touchstart`

### Press
- Property: `scale`
  - From: `1`
  - To: `0.97`
- Duration: `motion-duration-50`
- Easing: `motion-ease-in-out`

### Release
- Property: `scale`
  - From: `0.97`
  - To: `1`
- Duration: `motion-duration-150`
- Easing: `motion-ease-out`

### Performance
- Transform only — no paint or layout
```

---

## Example 4: Motion Audit Finding

**Issue:** Hero section uses `width` animation on page load — causes layout shift (CLS: 0.15).

**Fix:** Replace `width` animation with `scaleX` (transform-origin: left). CLS drops to 0.

**Verification:** Lighthouse CLS score improved from 0.15 to 0.0.
