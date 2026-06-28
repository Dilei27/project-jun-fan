# Content Rhythm — Project Aura

> Análise do ritmo de leitura, densidade e respiros.

---

## Onde Existem Blocos Muito Grandes

| Página | Problema | Solução |
|---|---|---|
| Command Center | 8 seções contínuas sem pausa visual | Reduzir para 5-6 seções principais; mover Skills e Architecture para subpáginas |
| Doc detail | Parágrafos contínuos sem quebras | Doc JSON tem sections, mas content é texto puro — adicionar listas, destaques |
| Decision cards | 3 parágrafos (Racional, Trade-offs, Impacto) sem destaque visual | Já tem labels (bold uppercase) — manter, mas adicionar mais espaço entre blocos |
| Product pages | Architecture Flow como texto linear | Manter, mas reduzir densidade |

---

## Onde Faltam Títulos

| Página | Problema |
|---|---|
| Home | Hero não tem subtítulo ou badge; "Produtos" e "Projetos" são títulos funcionais |
| Framework | Bom, títulos e subtítulos presentes |
| Hub | "Jun Fan Hub" + subtítulo ok, mas propósito ainda ambíguo |

---

## Onde Faltam Respiros

| Página | Problema | Solução |
|---|---|---|
| Command Center | Seções separadas apenas por `mb-16` | Adicionar separadores visuais sutis (borda, background alternado) |
| Home | Todas as seções com mesmo `mb-16` | Hero com mais py, seções com menos mb |
| Decisions list | Cards empilhados sem separação | `space-y-4` já existe, poderia ter mais gap |
| MetricsGrid | 4 cards pequenos com muito espaço | Grid 4 colunas é bom, mas em mobile 2 colunas pode ser denso |

---

## Onde Existem Cards Demais

| Página | Cards | Avaliação |
|---|---|---|
| Command Center | 3 product cards + 3 project cards + 3 insight cards + 2 decision cards + 4 metrics + skills tags + 6 flow steps | **Excesso.** 21+ elementos visuais em uma página |
| Home | 3 product cards + 3 project cards + 3 insight cards | **Ok.** 9 cards é aceitável |
| Framework | 6 concept cards + 6 flow steps + 3 roadmap cards | **Excesso para uma página conceitual** |

---

## Onde Existem Métricas Demais

| Página | Métricas | Avaliação |
|---|---|---|
| Command Center | 4 métricas (95%, 50+, 10x, 3) | **Ok em quantidade, fracas em conteúdo** — sem fonte, sem contexto |
| Analytics | 4 contadores + listas | **Dados limitados** — 3 produtos, 3 projetos não justificam página |
| Product pages | 3 métricas por produto | **Ok**, mas dashboard replica mesmas métricas |

---

## Onde Existe Excesso de Texto

| Página | Problema | Solução |
|---|---|---|
| Home hero descrição | "Fundação front-end first para plataforma de produtos, documentação e experiências técnicas de automação, QA e IA aplicada." — 22 palavras | Reduzir para 10-12 palavras + badge |
| Command Center hero | Parágrafo de 3 linhas | Manter, já conciso |
| Decision cards | 4 blocos de texto (context, rationale, tradeoffs, impact) | Manter labels e adicionar collapsible para detalhes |

---

## Propostas de Melhoria (Quick Wins)

1. **Home**: adicionar badge de status, reduzir texto do hero, adicionar subtítulo "Absorb. Refine. Build."
2. **Command Center**: reduzir para 5 seções visíveis (mover Skills e Architecture para subpáginas)
3. **Separadores visuais**: adicionar bg alternado ou bordas sutis entre seções principais
4. **Metrics**: adicionar contexto ("desde 2018", "baseado em projetos reais")
5. **Framework**: mover para Labs ou subpágina (página conceitual não justifica rota própria)

---

## Score do Ritmo de Conteúdo: 6.0/10

| Critério | Nota |
|---|---|
| Blocos de texto | 6 |
| Hierarquia de títulos | 6 |
| Respiros entre seções | 5 |
| Densidade de cards | 5 |
| Densidade de métricas | 7 |
| Excesso de texto | 6 |
| **Média** | **6.0** |
