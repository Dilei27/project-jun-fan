# Project Architect — Usage Examples

## Example 1: New Epic Definition

**Input:** "We need a user dashboard showing project progress."

**Action:** Project Architect decomposes this into milestones — data model, API layer, UI components, integration tests — assigns each to the appropriate agent, and records the decision in an ADR.

## Example 2: Priority Conflict

**Input:** Frontend engineer wants to rewrite animations while system-architect wants to finalize the component tree.

**Action:** Project Architect evaluates both against the current milestone goal (launch MVP). Decides to defer animation work, records rationale, and communicates to both agents.

## Example 3: Roadmap Review

**Input:** Quarterly roadmap review.

**Action:** Project Architect reads all ADRs, reviews milestone completion, interviews agents for blockers, and produces an updated roadmap with revised priorities and timelines.
