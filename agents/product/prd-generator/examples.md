# PRD Generator — Usage Examples

## Example 1: Full PRD Fragment

```markdown
# PRD: Project Filter by Technology

## Overview
- **Problem:** Visitors browse 30+ projects but cannot narrow down by tech stack.
- **Proposed solution:** Add a tag-based filter to the `/projects` page. Tags match the `tech` array in each project's JSON entry.
- **Target release:** Sprint 12

## Goals & Success Metrics
- Primary goal: Reduce time-to-find-relevant-project by 40%
- Success metrics: Average filter usage per session > 0.5, click-through rate from filtered projects to detail page > 25%

## Functional Requirements
- FR-1: Render all unique technology tags as clickable chips above the project grid
- FR-2: Clicking a tag filters the grid to only projects containing that tag in their `tech` array
- FR-3: Active tag is visually distinct (Horizon Design System: `Chip` component with `active` variant)
- FR-4: Clicking the active tag removes the filter
- FR-5: "Clear all" button resets all active filters
- FR-6: URL query parameter `?tech=` updates on filter change (supports comma-separated values)
- FR-7: Empty state shows "No projects using [tech] yet" with fallback illustration

## Content Strategy
- JSON file: `src/content/projects.json`
- Tags derived from `projects[].tech` array at build time
- No new JSON file needed
```

---

## Example 2: User Story with Edge Cases

```markdown
- **Story:** As a visitor I want to filter by multiple technologies so that I can find full-stack examples
  - [ ] Selecting tech A then tech B shows projects that use both
  - [ ] Removing tech A preserves tech B filter
  - [ ] URL reflects all active filters: ?tech=nextjs,typescript
  - [ ] If no projects match all selected tags, show empty state
  - [ ] Max 5 tags selectable (UX constraint — more would crowd the filter bar)
```

---

## Example 3: Out of Scope Flag

```
❌ Does the PRD propose any backend dependency?
→ Yes: "Save user's last active filter in a database"
→ Resolution: Replaced with localStorage-based persistence (JSON-driven, zero-backend)
```

---

## Example 4: Design System Cross-Reference

```
❌ UI requirement references a custom card component
→ Should reference: Horizon Design System `Card` component with `interactive` variant
→ If the interactive variant doesn't exist, add a new component request with rationale
```
