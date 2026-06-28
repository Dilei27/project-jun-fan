# System Architect — Usage Examples

## Example 1: New Feature Component Tree

**Input:** "Add a project timeline view to the dashboard."

**Action:** System Architect designs the component hierarchy (`TimelinePage → TimelineContainer → TimelineItem`), defines data flow from JSON content source, specifies loading/error states with Next.js conventions, and documents it in an ADR.

## Example 2: State Management Decision

**Input:** "Our dashboard state is getting unwieldy with Context."

**Action:** System Architect evaluates Zustand vs Context vs Jotai against project constraints (zero backend, JSON-driven). Decides on Zustand for complex state, documents trade-offs, and updates the architecture ADR.

## Example 3: Route Restructure

**Input:** "We need to add a settings section with nested pages."

**Action:** System Architect designs the route group with parallel routes and shared layout, ensuring the token-based theming system passes through correctly, and notifies frontend-engineer of the new route structure.
