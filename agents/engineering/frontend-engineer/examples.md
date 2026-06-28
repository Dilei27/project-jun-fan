# Frontend Engineer — Usage Examples

## Example 1: New Page Implementation

**Input:** "Build the project listing page per the system-architect's design."

**Action:** Frontend Engineer creates `app/projects/page.tsx` with server component, `ProjectCard` component with Horizon tokens, loading skeleton in `loading.tsx`, empty state message, and error boundary. Adds tests for each state.

## Example 2: Animation Enhancement

**Input:** "Add a staggered entrance animation to the timeline."

**Action:** Frontend Engineer uses Framer Motion's `staggerChildren` variant, applies only to `transform` and `opacity`, respects `prefers-reduced-motion`, and tests across viewport sizes.

## Example 3: JSON Content Integration

**Input:** "The hero section should pull content from `content/home.json`."

**Action:** Frontend Engineer reads the JSON at build time, creates typed interfaces for the content shape, implements the hero component with fallback values for missing fields, and adds a test for partial content.
