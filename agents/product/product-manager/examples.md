# Product Manager — Usage Examples

## Example 1: Defining a New Feature

**Request:** "We need a way to showcase project case studies."

**PM Response:**

- **Problem statement:** Visitors cannot explore detailed case studies for past projects, reducing conversion for consulting inquiries.
- **Proposed solution:** A `/case-studies` page with a filterable grid of project cards. Each card links to a dedicated case study page with hero image, challenge/approach/result sections, and a testimonial quote. Content sourced from `src/content/case-studies.json`.
- **Success criteria:** Page load under 2s, average session on case study pages > 60s, click-through to contact form increases by 15%.
- **Out of scope:** Video embeds, multi-language support, interactive prototypes.
- **Dependencies:** Content team must provide 3 case studies. Design system card component must be extended with hover overlay variant.

---

## Example 2: Prioritization Decision

**Request:** "Should we build dark mode or the search feature first?"

**PM Response:**

| Criteria | Dark Mode | Search |
|---|---|---|
| Effort | XL (touches every component) | M (one page, one component) |
| Impact | Medium (nice-to-have) | High (solves real user friction) |
| Risk | High (design system regressions) | Low (isolated feature) |

**Decision:** Search first. Dark mode deferred to next quarter with a dedicated design spike.

---

## Example 3: User Story

```markdown
As a site visitor
I want to filter the projects page by technology tag
So that I can quickly find examples relevant to my stack

Acceptance Criteria:
- [ ] Clicking a tag filters the grid to matching projects
- [ ] Active tag is visually highlighted (primary color, underline)
- [ ] Clicking the active tag removes the filter
- [ ] "Clear all" button appears when any filter is active
- [ ] Empty state: "No projects found for [tag]" with illustration
- [ ] URL updates to ?tag=nextjs for shareability
- [ ] Works with keyboard navigation (Tab, Enter, Escape)

Out of Scope:
- Multi-tag filtering (AND/OR logic)
- Search bar on the same page
- Sort controls
```
