# Motion Review — Legacy Animations → Horizon Motion Tokens

## Horizon Motion Tokens (Reference)

| Token | Duration | Easing |
|---|---|---|
| `--motion-fast` | 160ms | ease-out |
| `--motion-normal` | 280ms | ease-out |
| `--motion-slow` | 420ms | ease-in-out |

All animations must respect `prefers-reduced-motion` at the provider level.

---

## Legacy Animations Inventory

### 1. Boot Typing Effect

| Property | Legacy Value | Assessment |
|---|---|---|
| **Source** | Standalone `index.html` | |
| **Mechanism** | `setInterval` character-by-character reveal | |
| **Interval** | 34ms | |
| **Lines** | 10 lines, sequential with delays | |
| **Cursor** | Blinking `|` via CSS opacity toggle (0.75s) | |

**Classification:** REFINE → Horizon motion token

**Recommendation:**
- Replace `setInterval` with CSS animation + `animation-delay` for each character/line
- Map to `--motion-slow` (420ms) per line reveal
- Cursor blink: `--motion-normal` (280ms) — REUSE
- Respect reduced motion: skip animation entirely, show final state

**New token mapping:**
| Element | Token | Notes |
|---|---|---|
| Line reveal | `--motion-slow` (420ms) | Stagger by line |
| Cursor blink | `--motion-normal` (280ms) | Opacity toggle |
| Character rate | — | CSS keyframes, not JS interval |

---

### 2. Neural Graph Physics

| Property | Legacy Value | Assessment |
|---|---|---|
| **Source** | Standalone `index.html` | |
| **Mechanism** | Custom spring simulation in `requestAnimationFrame` | |
| **Damping** | 0.985 | |
| **Node repulsion** | Distance-based force | |
| **Mouse interaction** | Repulsive spotlight on hover | |

**Classification:** ARCHIVE

**Recommendation:**
- Do not port to Phoenix MVP
- Physics-based animation has no equivalent in Horizon motion tokens
- If revived in future: use a declarative library (e.g., Framer Motion) instead of custom RAF

---

### 3. Pulse Animation

| Property | Legacy Value | Assessment |
|---|---|---|
| **Source** | Standalone `index.html` | |
| **CSS** | `scale(1.45)`, `opacity(0.55)` → `scale(1)`, `opacity(1)` | |
| **Duration** | 1.6s | |
| **Target** | Online status indicator (green dot) | |

**Classification:** REFINE → Horizon motion token

**Recommendation:**
- Reduce to `--motion-slow` (420ms) — 1.6s is too long
- Reduce scale to `1.15` (1.45 is too dramatic for Horizon)
- Adjust opacity from `0.55` to `0.7` (subtler)

**New definition:**
```css
@keyframes horizon-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.7; }
}
```

| Token | Override |
|---|---|
| Duration | 420ms |
| Scale range | 1 → 1.15 |
| Opacity range | 1 → 0.7 |

---

### 4. Float Animation

| Property | Legacy Value | Assessment |
|---|---|---|
| **Source** | Standalone `index.html` | |
| **CSS** | `translateY(-14px)` → `translateY(0)` | |
| **Duration** | 6s ease-in-out | |
| **Target** | Decorative badge element | |

**Classification:** DISCARD

**Recommendation:**
- Floating/levitating elements are atmospheric but not functional
- Horizon principle: "Motion functional e discreto" — this is purely decorative
- 6s cycle is too long and would feel disconnected from interaction
- Remove entirely

---

### 5. Counter Animation (Impact Metrics)

| Property | Legacy Value | Assessment |
|---|---|---|
| **Source** | Standalone `index.html` | |
| **Mechanism** | `setInterval` step-based increment | |
| **Interval** | 28ms | |
| **Detection** | IntersectionObserver trigger | |
| **Target** | 4 `<strong>` elements with `data-target` | |

**Classification:** REFINE → Horizon motion token

**Recommendation:**
- Keep the IntersectionObserver trigger pattern
- Replace JS interval with a single CSS `@property` animation or a requestAnimationFrame that respects reduced motion
- Map duration to `--motion-slow` (420ms) for full count — 28ms × 100 steps = 2.8s is too long
- Use `ease-out` easing so numbers slow near the target

**New mapping:**
| Element | Token | Notes |
|---|---|---|
| Counter duration | `--motion-slow` (420ms) | Ease-out deceleration |
| Trigger | IntersectionObserver | Unchanged |
| Reduced motion | Skip animation, show final value | Respect OS preference |

---

### 6. Blink Cursor

| Property | Legacy Value | Assessment |
|---|---|---|
| **Source** | Standalone `index.html` | |
| **CSS** | `opacity: 1` ↔ `opacity: 0` | |
| **Duration** | 0.75s | |

**Classification:** REUSE → Horizon motion token

**Recommendation:**
- Keep as-is but use `--motion-normal` (280ms) for the half-cycle
- Map full cycle to `560ms` (2 × 280ms)

**New mapping:**
```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
/* animation: blink var(--motion-normal) step-end infinite; */
```

---

### 7. Mouse Spotlight

| Property | Legacy Value | Assessment |
|---|---|---|
| **Source** | Standalone `index.html` | |
| **Mechanism** | `mousemove` → CSS custom property update | |
| **Visual** | Radial gradient following cursor | |

**Classification:** DISCARD

**Recommendation:**
- Conflicts with reduced motion preferences
- No functional value — purely decorative
- Breaks on touch devices
- Performance cost from `mousemove` handler
- Remove entirely

---

### 8. Focus-Visible

| Property | Legacy Value | Assessment |
|---|---|---|
| **Source** | Django templates (Horizon CSS) | |
| **CSS** | `2px solid --color-accent` outline | |
| **Offset** | 2px | |

**Classification:** ✅ Already correct

**Recommendation:**
- No changes needed. Already follows Horizon accessibility principles.
- Verify it's applied to all interactive elements in the new build.

---

### 9. Button Hover

| Property | Legacy Value | Assessment |
|---|---|---|
| **Source** | Django templates (Horizon CSS) | |
| **CSS** | `scale(1.02)` | |
| **Duration** | 160ms | |

**Classification:** ✅ Already correct

**Recommendation:**
- Already uses `--motion-fast` (160ms). No changes needed.
- Verify `will-change: transform` for performance.

---

### 10. Card Hover

| Property | Legacy Value | Assessment |
|---|---|---|
| **Source** | Django templates (Horizon CSS) | |
| **CSS** | `translateY(-2px)` | |
| **Duration** | 280ms | |

**Classification:** ✅ Already correct

**Recommendation:**
- Already uses `--motion-normal` (280ms). No changes needed.
- Verify border accent color change on hover is also mapped to same duration.

---

## Summary

| Animation | Legacy | Decision | Horizon Equivalent |
|---|---|---|---|
| Boot typing | 34ms interval, JS | **REFINE** | CSS keyframes, `--motion-slow` |
| Graph physics | 0.985 damping, RAF | **ARCHIVE** | — |
| Pulse | 1.6s, scale 1.45, opacity 0.55 | **REFINE** | 420ms, scale 1.15, opacity 0.7 |
| Float | 6s, translateY -14px | **DISCARD** | — |
| Counter | 28ms interval, JS | **REFINE** | 420ms ease-out, IntersectionObserver |
| Blink cursor | 0.75s opacity | **REUSE** | `--motion-normal` × 2 |
| Mouse spotlight | mousemove tracker | **DISCARD** | — |
| Focus-visible | 2px outline | ✅ Already correct | — |
| Button hover | scale 1.02, 160ms | ✅ Already correct | `--motion-fast` |
| Card hover | translateY -2px, 280ms | ✅ Already correct | `--motion-normal` |
