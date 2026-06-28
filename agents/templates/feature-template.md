# Feature Specification — `<feature-name>`

> Detailed specification for a single feature. Smaller scope than a PRD; follows a PRD when one exists.

## Summary

<!-- One-paragraph description of the feature. -->

## Component Tree

```
<Page>
  <FeatureLayout>
    <Header />
    <ContentArea>
      <ComponentA />
      <ComponentB />
    </ContentArea>
    <Footer />
  </FeatureLayout>
</Page>
```

## Data Flow

<!-- Describe how data moves from content JSON to the rendered page. -->

1. Content loaded from `src/content/<name>/`
2. Parsed and validated by `src/lib/<name>.ts`
3. Rendered by `<FeatureComponent>`

## Files to Create

| File | Purpose |
|------|---------|
| `src/features/<name>/...` | Feature components |
| `src/content/<name>/...` | Content JSON |
| `src/lib/<name>.ts` | Validation / parsing |
| `src/app/<route>/...` | Route files |

## States

### Loading

<!-- Description of loading state UI -->

### Empty

<!-- Description of empty state UI -->

### Error

<!-- Description of error state UI -->

### Edge Cases

<!-- List of edge cases and how they are handled -->

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
