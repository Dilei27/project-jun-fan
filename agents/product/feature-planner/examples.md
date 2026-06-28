# Feature Planner — Usage Examples

## Example 1: Feature Definition

```markdown
## Feature: Technology Filter Bar
**Initiative:** Portfolio Experience
**Effort:** M

### Content Schema
The technology tags are derived from the existing `src/content/projects.json` — no new JSON file needed.

```json
{
  "source": "src/content/projects.json",
  "derived": "unique tech tags from projects[].tech (string[])",
  "cache": "computed at build time, no runtime processing"
}
```

### States
- **Default:** All tags rendered as inactive chips. Full project grid visible.
- **Loading:** N/A (data is static, loaded at build time)
- **Empty (no projects):** "No projects found" — fallback applied at page level, not filter level
- **Empty (filtered):** "No projects using [tag]" with search-again suggestion
- **Error:** N/A (build-time — if JSON is malformed, build fails)
- **Edge:** 20+ tags → horizontal scroll with fade gradient on overflow. Single project shown when filtered.

### Component Tree
```
FilterBar (new component)
└── ScrollContainer (DS: ScrollArea)
    └── FilterChip (DS: Chip component, new `active` variant)
└── ClearButton (DS: TextButton, show when filters.active.length > 0)
```

### Stories
- [ ] Render all unique tech tags from projects.json as inactive FilterChips — AC: chips render, no duplicates, sorted alphabetically
- [ ] Click tag to filter grid — AC: grid updates, active chip highlighted, URL updates to ?tech=tag
- [ ] Click active tag to remove filter — AC: filter removed, grid updates, URL updated
- [ ] "Clear all" button — AC: appears when ≥1 filter active, removes all filters
- [ ] Empty filter state — AC: when filter yields 0 results, show empty state component
- [ ] Overflow behavior — AC: scrollable with fade gradient when tags exceed container width
```

---

## Example 2: Shared Component Flag

**Observation:** Both the Technology Filter and the future Case Studies page need a filterable grid with chips.

**Recommendation:** Abstract `FilterBar` as a shared component with props:
- `tags: { label: string; value: string }[]`
- `onFilterChange: (active: string[]) => void`
- `variant: 'single' | 'multi'`

---

## Example 3: JSON Schema Design for Case Studies

```json
{
  "file": "src/content/case-studies.json",
  "type": "array, min 1, max 20",
  "fields": {
    "id": "string — kebab-case unique ID",
    "title": "string — max 100 chars",
    "client": "string — nullable",
    "tech": "string[] — min 1, max 10",
    "heroImage": "string — path to /public/images/case-studies/",
    "sections": [
      {
        "type": "challenge | approach | result | quote",
        "heading": "string — nullable if type=quote",
        "body": "string — Markdown supported",
        "image": "string — nullable"
      }
    ],
    "testimonial": {
      "quote": "string — nullable",
      "author": "string — nullable",
      "role": "string — nullable"
    }
  }
}
```
