# Horizon Design System Compliance — Legacy QA Command Center

## Comparison Methodology

Each legacy visual element is checked against the Horizon Design System tokens defined in `docs/Horizon-Design-System.md` and implemented in `src/design-system/`. Elements are marked as:

| Status | Meaning |
|---|---|
| ✅ | Compliant — no changes needed |
| ⚠️ | Partially compliant — minor adjustments needed |
| ❌ | Non-compliant — must change |

---

## 1. Background Colors

| Context | Legacy Value | Horizon Token | Horizon Value | Status |
|---|---|---|---|---|
| Page background | `#020617` | `--color-bg-deep` | `#070A0F` | ❌ |
| Panel / card surface | `rgba(15, 23, 42, 0.68)` | `--color-surface-default` | `#111821` | ❌ |
| Elevated panel | `rgba(30, 41, 59, 0.6)` | `--color-surface-elevated` | `#151D27` | ❌ |
| Tag / soft surface | — | `--color-surface-soft` | `#1B2430` | ❌ (missing) |

**Issues:**
- Legacy uses transparency (`rgba`) for glassmorphism effect
- Horizon mandates solid background colors for accessibility and visual consistency
- Legacy base (`#020617`) is significantly darker than Horizon (`#070A0F`)

**Action:** Replace all `rgba(...)` backgrounds with solid Horizon surface tokens. Change base from `#020617` to `#0B0F14` or `#070A0F`.

---

## 2. Borders

| Context | Legacy Value | Horizon Token | Horizon Value | Status |
|---|---|---|---|---|
| Panel borders | `rgba(255, 255, 255, 0.13)` | `--color-border-subtle` | `#263241` | ❌ |
| Strong borders | `rgba(255, 255, 255, 0.2)` | `--color-border-strong` | `#3A4658` | ❌ |

**Issues:**
- Legacy uses white-with-alpha for borders
- Horizon uses solid hex values at specific gray tones

**Action:** Replace all `rgba(...)` borders with `--color-border-subtle` (#263241) for default and `--color-border-strong` (#3A4658) for emphasis.

---

## 3. Text Colors

| Context | Legacy Value | Horizon Token | Horizon Value | Status |
|---|---|---|---|---|
| Primary text | `#f8fafc` | `--color-text-primary` | `#F4F7FA` | ⚠️ |
| Secondary text | — | `--color-text-secondary` | `#9AA6B8` | ❌ (missing) |
| Muted text | `#94a3b8` | `--color-text-muted` | `#687385` | ❌ |

**Analysis:**
- Primary: `#f8fafc` vs `#F4F7FA` — difference is minimal (∆E < 1), visually identical. Low priority but should still standardize.
- Muted: `#94a3b8` is significantly lighter than Horizon's `#687385`. Legacy muted text will appear louder than intended in Horizon.

**Action:** Replace all text colors with Horizon text tokens. Primary `#F4F7FA`, secondary `#9AA6B8`, muted `#687385`.

---

## 4. Accent Colors

| Context | Legacy Value | Horizon Token | Horizon Value | Status |
|---|---|---|---|---|
| QA accent | `#38d5ff` (cyan) | QA Command Center | `#4F8CFF` (blue) | ❌ |
| Secondary accent | `#9b5cff` (purple) | — (not in Horizon) | — | ❌ |
| Success | `#36f2a6` (green) | `--color-success` | `#22C55E` | ❌ |
| Warning | `#ffd166` (yellow) | `--color-warning` | `#F59E0B` | ❌ |
| Error | `#ff6b6b` (red) | `--color-danger` | `#EF4444` | ❌ |

**Analysis:**
- Legacy uses a cyan accent (`#38d5ff`) which is neon and feels "cyberpunk"
- Horizon assigns `#4F8CFF` (a corporate blue) to QA Command Center
- All semantic colors differ between legacy and Horizon

**Action:** Replace `#38d5ff` with `#4F8CFF` for all accent references. Replace all semantic colors with Horizon equivalents.

---

## 5. Typography

| Property | Legacy | Horizon | Status |
|---|---|---|---|
| Primary font | `Segoe UI`, sans-serif | `Inter`, sans-serif | ❌ |
| Monospace font | `Consolas`, monospace | `JetBrains Mono` / `Fira Code` | ❌ |
| Scale | Custom (rem values) | 0.75rem — 3rem | ⚠️ |

**Action:**
- Replace `Segoe UI` with `Inter` throughout
- Replace `Consolas` with `JetBrains Mono`
- Verify font sizes match Horizon scale

---

## 6. Border Radius

| Context | Legacy Value | Horizon Radius | Status |
|---|---|---|---|
| Navigation | `24px` | `--radius-xl` (24px) | ✅ |
| Cards / panels | `32px` / `24px` | `--radius-lg` (16px) / `--radius-xl` (24px) | ⚠️ |
| Buttons | `12px` / `8px` | `--radius-md` (12px) / `--radius-sm` (8px) | ✅ |
| Input fields | `12px` | `--radius-md` (12px) | ✅ |

**Analysis:**
- Panels at `32px` radius exceed Horizon's maximum (`24px`). Reduce to `--radius-xl`.
- Navigation at `24px` matches `--radius-xl` — correct.

**Action:** Standardize all radii to Horizon tokens. Replace `32px` with `24px` (`--radius-xl`).

---

## 7. Spacing

| Property | Legacy | Horizon | Status |
|---|---|---|---|
| System | Custom values | 4px scale | ❌ |
| Scale | Inconsistent | 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 | ❌ |

**Action:** Audit all padding, margin, and gap values. Replace with nearest Horizon spacing token.

---

## 8. Shadows

| Property | Legacy | Horizon | Status |
|---|---|---|---|
| Card shadow | Heavy with blur (glassmorphism) | Subtle (solid surfaces) | ❌ |
| Glow effects | Neon cyan/purple box-shadow | None | ❌ |

**Issues:**
- Legacy relies on `backdrop-filter: blur` + semi-transparent backgrounds + colored shadows
- Horizon uses solid surfaces with minimal shadow (if any)

**Action:** Remove all glow effects. Remove `backdrop-filter: blur`. Use solid Horizon surface colors for depth instead of shadows.

---

## 9. Gradients

| Property | Legacy | Horizon | Status |
|---|---|---|---|
| Text gradients | Cyan-to-purple (`#38d5ff` → `#9b5cff`) | Solid colors | ❌ |
| Background gradients | Radial cyan glow | Solid `--color-bg-base` | ❌ |

**Analysis:**
- Gradient text is a signature legacy visual but Horizon explicitly uses solid colors
- The only exception could be the product badge (`Quality Ecosystem Online`), but even that should use solid Horizon accent

**Action:** Replace all gradient text with solid `--color-text-primary`. Replace radial background glows with solid `--color-bg-deep`.

---

## 10. Visual Effects to Remove

| Effect | Legacy | Horizon | Action |
|---|---|---|---|
| Glassmorphism | `backdrop-filter: blur(20px)` | Solid surfaces | Remove |
| Neon glow | `box-shadow: 0 0 20px cyan` | No glow | Remove |
| Grid background | CSS `background-image` grid pattern | Solid dark | Remove |
| Mouse spotlight | Radial gradient on mousemove | No cursor effects | Remove |

---

## Compliance Scorecard

| Category | Status | Items to Fix |
|---|---|---|
| Backgrounds | ❌ | 4 replacements |
| Borders | ❌ | 2 replacements |
| Text colors | ⚠️ | 3 replacements (1 low priority) |
| Accent colors | ❌ | 5 replacements |
| Typography | ❌ | 2 font families |
| Border radius | ⚠️ | 1 reduction (32px → 24px) |
| Spacing | ❌ | Full audit needed |
| Shadows | ❌ | Remove all glow + blur |
| Gradients | ❌ | Remove all gradients |
| Effects | ❌ | 4 effects to remove |

**Total: 8 ❌, 2 ⚠️, 0 ✅**

The legacy visual system is fundamentally incompatible with Horizon. A rebuild (not refactor) is required for visual compliance.
