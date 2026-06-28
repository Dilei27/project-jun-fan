# Design System Agent — Usage Examples

## Example 1: Component Definition — Chip

```markdown
## Component: Chip

### Purpose
A compact label element for displaying tags, filters, or metadata.

### Anatomy
```
┌─────────────────┐
│ [icon]  Label × │
└─────────────────┘
```

### Props
| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| label | string | — | yes | Chip text content |
| variant | 'default' \| 'active' \| 'removable' | 'default' | no | Visual variant |
| icon | ReactNode | null | no | Optional leading icon |
| onRemove | () => void | null | no | Callback when remove (×) is clicked |
| disabled | boolean | false | no | Disables interaction |

### States
- **Default:** Neutral background, default text
- **Hover:** Slight background darken, cursor pointer
- **Focus:** Ring token `focus-ring` (2px offset)
- **Active (variant):** Primary color background, white text
- **Disabled:** 50% opacity, no pointer events

### Usage Guidelines
- **Do:** Use for filtering, tagging, and metadata display
- **Don't:** Use as a primary call-to-action button
- **Accessibility:** `role="button"`, `aria-pressed` for active variant, `aria-label="Remove [label]"` for removable variant

### Responsive
- sm: 24px height, 12px font
- md+: 28px height, 14px font

### Motion
- Hover: background color transition `motion-duration-150` ease-in-out
- Remove: scale to 0 + fade out, `motion-duration-200`
```

---

## Example 2: Token Addition Proposal

**Request:** New color token for success states.

**Proposal:**
| Token | Value | Usage |
|---|---|---|
| `color-success-50` | `#F0FFF4` | Background |
| `color-success-500` | `#48BB78` | Accent |
| `color-success-900` | `#22543D` | Text on success bg |

**Rationale:** Currently success states use green hex values inline. This creates inconsistency across toast, badge, and form validation components.

---

## Example 3: Component Variant Request Review

**Request:** Add a `ghost` variant to the Button component.

**Review:**
- **Purpose:** Secondary action with minimal visual weight (no background, no border)
- **Use cases:** Toolbar actions, dismissible controls, inline edit triggers
- **Risk:** Could be confused with TextButton if not visually distinct
- **Verdict:** ✅ Approved — variants now: `primary` | `secondary` | `ghost` | `text`
- **Action:** Roll into Button component doc; update Figma; add `ghost` motion spec
