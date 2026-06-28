# Roadmap Planner — Usage Examples

## Example 1: Quarterly Roadmap

```markdown
# Roadmap: Q3 2025

## Theme 1: Portfolio Experience
- Initiative 1.1: Project page redesign — @ana — L — in progress
  - Dependencies: Design system Card v2 component (Design team, ETA: Jul 15)
  - Target: August
- Initiative 1.2: Technology filter — @bob — M — planned
  - Dependencies: Initiative 1.1 complete (Card component needed)
  - Target: September
- Initiative 1.3: Case studies section — @cat — XL — planned
  - Dependencies: Content team to provide 3 case studies (ETA: Aug 1)
  - Target: October (early Q4)

## Theme 2: Performance & SEO
- Initiative 2.1: Core Web Vitals audit — @bob — S — planned
  - Dependencies: None
  - Target: July

## Theme 3: Design System
- Initiative 3.1: Motion token library — @design-team — M — in progress
  - Dependencies: motion agent spec complete
  - Target: August

## Capacity
- Total: 40 SP/sprint
- Allocated: 32 SP/sprint (80%)
- Buffer: 8 SP/sprint (20%)

## Risks
- Content team may not deliver case studies by Aug 1 — Medium probability, High impact
  - Mitigation: Prepare placeholder templates; reduce scope to 2 case studies if needed
- Card v2 component may slip — Low probability, Medium impact
  - Mitigation: Init 1.2 can proceed with Card v1 interim
```

---

## Example 2: RICE Scoring

| Initiative | Reach | Impact | Confidence | Effort | RICE Score |
|---|---|---|---|---|---|
| Tech filter | 2000 users/mo | 0.8 | 90% | 5 days | 288 |
| Dark mode | 2000 users/mo | 0.3 | 60% | 15 days | 24 |
| Case studies | 500 users/mo | 0.9 | 80% | 20 days | 18 |

**Result:** Tech filter scores highest — schedule first.

---

## Example 3: Capacity Rebalancing

**Situation:** Initiative 1.1 (Project page redesign) is taking 2 weeks longer than estimated.

**Action:**
- Slide Initiative 1.2 (Tech filter) by 2 weeks
- Reduce Initiative 3.1 scope (motion tokens) from XL to L to free capacity
- Communicate delays to stakeholders with updated target dates
- Buffer absorbs 1 week; 1 week of scope reduction needed
