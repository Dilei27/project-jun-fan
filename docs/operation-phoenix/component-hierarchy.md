# Component Hierarchy — Project Aura

> Análise de hierarquia visual, competição e ruído entre componentes.

---

## Estado Atual

### Home
```
[Header]                    → z-40, fixed, backdrop
[Hero]                      → h1 + p + 3 CTAs (tudo mesmo peso)
  ├── h1: Project Jun Fan   → extrabold, 4xl
  ├── p                     → text-lg, text-secondary
  └── 3 CTAs               → primary + 2 secondary (competem)
[Produtos seção]
  ├── h2                    → text-xl semibold
  ├── "Ver completo"        → link discreto
  └── 3 ProductCards        → hover com lift
[Projetos seção]
  ├── h2                    → text-xl semibold (mesmo estilo)
  └── 3 ProjectCards
[Insights seção]
  ├── h2                    → text-xl semibold (mesmo)
  └── 3 AIInsightCards
[Footer]                    → links centralizados
```

### Problema: TUDO TEM O MESMO PESO VISUAL

- Todos os h2 usam `text-xl font-semibold` — nenhuma seção se destaca
- Hero é texto puro sem elemento visual de destaque
- 3 CTAs no hero têm mesmo tamanho, apenas cores diferentes
- Cards têm tamanhos similares entre produtos, projetos e insights

---

## Qual Componente Deve Chamar Atenção

| Prioridade | Componente | Estratégia |
|---|---|---|
| 1 | **Hero (h1)** | Fonte maior, badge de status, glow sutil, entrada com motion |
| 2 | **CTA primário** | Único destaque (bg-accent-qa); os demais secundários |
| 3 | **ProductCards** | Maiores que ProjectCards, com accent color na borda |
| 4 | **Timeline entries** | Primeira com ring, ano em accent color |
| 5 | **AI Dock button** | Fixed, circular, accent color — já se destaca |

## Qual Deve Permanecer Discreto

| Componente | Justificativa |
|---|---|
| Header nav links | São auxiliares; não devem competir com hero |
| Footer links | Esperados, não chamativos |
| Badge de status | Tag pequena, informativa |
| "Ver completo" links | São call-to-action secundários |
| Skeleton | Só aparece em loading — ausente |
| Skills tags | Tags pequenas, sem destaque |

---

## Existe Competição Visual?

**Sim, em várias áreas:**

1. **Home hero**: 3 CTAs competem. QA Command Center deveria ser o único primário. Docs e Hub deveriam ser secundários (ghost).
2. **Command Center**: 4 metric cards com números grandes (3xl bold) competem com product cards. Métricas são suporte, não protagonistas.
3. **Frame/Página**: decisões, projects, timeline têm "ver mais" links que competem entre si.
4. **SkillsCloud**: tags com 3 níveis de destaque (avancado=accent, intermediário=secondary, iniciante=muted) — o "iniciante" ainda atrai atenção por ser tag.

---

## Existe Ruído?

**Sim, moderado:**

1. **animate-pulse** no badge "Quality ecosystem online" — pisca desnecessariamente
2. **Glows duplos** no hero do CC (bg-accent-qa/5 + bg-accent-whatsapp/5) — um já seria suficiente
3. **No footer**, links GitHub e Contato com href="#" — links não-funcionais são ruído
4. **SkillsCloud** com 6 categorias e 20+ tags — densidade alta para informação complementar

---

## Existe Redundância?

**Sim:**

| Redundância | Onde |
|---|---|
| ProductGateway | Home, Command Center, Hub |
| FeaturedProjects | Home, Command Center |
| StatusStrip | Command Center (único lugar — ok) |
| AIInsightCards | Home, Command Center (idêntico) |
| Timeline | Home (não), CC (sim), Timeline page (sim) — home não tem |
| Decisão list | CC mostra 2 + link; /decisoes/ mostra todas |

---

## Proposta de Hierarquia (Quick Wins)

1. **Home hero**: h1 maior (5xl), badge de status, 1 CTA primário + 1 secundário
2. **Seções**: hero com py-20, seções com py-12 (diferenciar)
3. **ProductCards**: manter tamanho; ProjectCards: um pouco menores (text-base vs text-lg)
4. **Command Center**: hero py-28 (já é grande); métricas compactas (grid 4, numbers menores); skills e architecture mover para subpáginas
5. **animate-pulse**: remover do badge de status (deixar estático com dot verde)
6. **Links "#"**: remover ou comentar até ter URL real

---

## Score de Hierarquia: 5.5/10

| Critério | Nota |
|---|---|
| Diferenciação entre seções | 4 |
| Destaque do CTA principal | 5 |
| Balanceamento de cards | 6 |
| Ruído visual | 6 |
| Redundância | 5 |
| Clareza de navegação | 7 |
| **Média** | **5.5** |
