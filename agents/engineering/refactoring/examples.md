# Refactoring — Usage Examples

## Example 1: Component Decomposition

**Input:** A 400-line `DashboardPage` component handling data fetching, state, and rendering.

**Action:** Refactoring extracts data fetching into a custom hook, separates the chart section into `<DashboardChart />`, the summary into `<DashboardSummary />`, and adds typed interfaces for the data model. All existing tests pass.

## Example 2: Pattern Migration

**Input:** Several pages still use the Pages Router (`pages/`) while the project has migrated to App Router.

**Action:** Refactoring migrates each page one at a time — converts `getStaticProps` to server components, moves files to `app/` directory, validates each migration with existing tests.

## Example 3: Type Improvement

**Input:** The codebase has 200+ instances of `any` and several files with `@ts-ignore`.

**Action:** Refactoring starts with the most-used module, replaces `any` with proper types, adds interfaces for API response shapes, removes `@ts-ignore` directives, and reports progress for the remaining instances.
