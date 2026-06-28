# Content Review — Hardcoded Content Migration to JSON

## Principle

All display content in the legacy QA Command Center is hardcoded in HTML or JavaScript. In Phoenix, **every text string, metric, command, and label** must live in a structured JSON file under `src/content/`. This enables separation of concerns, easier editing, i18n readiness, and single-source-of-truth across products.

---

## Content Inventory

### 1. Hero Text

| Legacy Source | Content | Status | Target JSON |
|---|---|---|---|
| Standalone HTML | `QA Command Center` (title) | ✅ Already in `products.json` | `src/content/products.json` |
| Standalone HTML | `Quality Ecosystem Online` (badge) | ✅ Already in `products.json` | `src/content/products.json` |
| Standalone HTML | Hero subtitle + description | ✅ Already in `timeline.json` | `src/content/timeline.json` |
| Standalone HTML | CTA button labels (`Explore →`, `View Stack →`) | ⚠️ Need to add to `products.json` | `src/content/products.json` |

**Action:** Verify CTA labels exist in `products.json`. Add if missing.

---

### 2. Terminal Commands and Responses

| Legacy Source | Content | Status | Target |
|---|---|---|---|
| Standalone JS | 7 commands (`--help`, `--skills`, `--experience`, `--ai`, `--devops`, `--projects`, `--contact`) | ❌ Not migrated | `src/content/ai-dock.json` |
| Standalone JS | Multi-line command responses (e.g. `--skills` returns 5 lines of skill categories) | ❌ Not migrated | `src/content/ai-dock.json` |
| Standalone JS | `clear` command mapping | ❌ Not migrated | AI Dock handler logic |

**Legacy commands reference:**

| Command | Response Type |
|---|---|
| `--help` | 8-line help listing all commands |
| `--skills` | 5 skill categories with sub-items |
| `--experience` | 4 position entries with dates |
| `--ai` | 3 AI skill entries |
| `--devops` | 5 DevOps tool entries |
| `--projects` | 3 project descriptions |
| `--contact` | 3 contact methods |

**Action:** Create `src/content/ai-dock.json` with command → response mapping. Structure:

```json
{
  "commands": [
    {
      "trigger": "--help",
      "type": "list",
      "lines": ["Available commands:", "  --skills    Show technical skills", "..."]
    }
  ]
}
```

---

### 3. Metrics Values

| Legacy Source | Content | Status | Target JSON |
|---|---|---|---|
| Standalone HTML | `95%` (rastreabilidade) | ✅ Already in `metrics.json` | `src/content/metrics.json` |
| Standalone HTML | `50+` (projetos) | ✅ Already in `metrics.json` | `src/content/metrics.json` |
| Standalone HTML | `10x` (aceleração) | ✅ Already in `metrics.json` | `src/content/metrics.json` |
| Standalone HTML | `3` (frentes) | ✅ Already in `metrics.json` | `src/content/metrics.json` |

**Action:** Verify that label text (`rastreabilidade`, `projetos`, `aceleração`, `frentes`) exists in `metrics.json` alongside the values.

---

### 4. Impact Description Texts

| Legacy Source | Content | Status | Target JSON |
|---|---|---|---|
| Standalone HTML | `Rastreabilidade de ponta a ponta` | ✅ Already in `metrics.json` | `src/content/metrics.json` |
| Standalone HTML | `Projetos entregues` | ✅ Already in `metrics.json` | `src/content/metrics.json` |
| Standalone HTML | `Aceleração de deliverables` | ✅ Already in `metrics.json` | `src/content/metrics.json` |
| Standalone HTML | `Frentes de atuação` | ✅ Already in `metrics.json` | `src/content/metrics.json` |

---

### 5. Project Descriptions

| Legacy Source | Content | Status | Target JSON |
|---|---|---|---|
| Standalone HTML | QA Command Center project card | ✅ Already in `projects.json` | `src/content/projects.json` |
| Standalone HTML | Agente QA Azure project card | ✅ Already in `projects.json` | `src/content/projects.json` |
| Standalone HTML | Automation Stack project card | ✅ Already in `projects.json` | `src/content/projects.json` |

---

### 6. AI Dock Suggestions

| Legacy Source | Content | Status | Target |
|---|---|---|---|
| Django HTML | Suggestion chips (3-5 items) | ⚠️ Need to verify in AI Dock component | `src/features/ai-dock/` |

**Action:** Check if suggestion text is hardcoded in the component or already in a data file.

---

### 7. Neural Graph Data

| Legacy Source | Content | Status | Target |
|---|---|---|---|
| Standalone JS | 7 node labels (QA CORE, Robot, Web/API, IA/RAG, DevOps, Processos, k6 Perf) | 🗄️ ARCHIVE | Not needed for MVP |
| Standalone JS | 12 edge connections between nodes | 🗄️ ARCHIVE | Not needed for MVP |

**Action:** No migration needed. Archived for future skill-mapping feature.

---

### 8. Stack Tags

| Legacy Source | Content | Status | Target |
|---|---|---|---|
| Standalone HTML | 12 tech tags (Python, Robot Framework, Playwright, etc.) | ❌ Inline in component | `src/content/skills.json` |

**Action:** Verify `skills.json` contains all 12 tags. Add any missing entries.

---

## Data Flow Summary

```
Legacy HTML/JS                    Phoenix JSON
─────────────────                 ────────────
Hero titles/texts      ────────▶  products.json, timeline.json
CTA labels             ──❌───▶  Need to add to products.json
Terminal commands      ──❌───▶  Need ai-dock.json
Terminal responses     ──❌───▶  Need ai-dock.json
Metrics (95%, 50+)    ────────▶  metrics.json ✅
Metric descriptions    ────────▶  metrics.json ✅
Project cards          ────────▶  projects.json ✅
AI Dock suggestions    ──⚠️───▶  Verify in ai-dock/
Neural graph data      ──🗄️───▶  Archived
Stack tags             ──❌───▶  Verify in skills.json
```

## Migration Priority

| Priority | Content | Reason |
|---|---|---|
| P0 | Terminal commands + responses | Core AI Dock feature, blocked without data |
| P1 | CTA labels | Hero CTA buttons depend on this |
| P2 | Stack tags | Skills section blocked |
| P3 | AI Dock suggestions | Enhancement, fallback possible |
| — | Neural graph data | Not in MVP scope |
