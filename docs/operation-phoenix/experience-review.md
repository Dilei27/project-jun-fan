# Experience Review — Project Identity

> Continuidade e identidade entre todas as páginas do ecossistema.

---

## O Estado Atual

| Página | Tem Identidade Jun Fan? | Observação |
|---|---|---|
| Home (`/`) | ✅ Sim | Hero com badge, mantra, produtos, projetos |
| Command Center (`/command-center/`) | ✅ Sim | Hero, status, métricas, produtos |
| CC Architecture (`/command-center/architecture/`) | ✅ Sim | ArchitectureFlow + cards dos módulos |
| CC Timeline (`/command-center/timeline/`) | ✅ Sim | Timeline vertical com ring |
| CC Decisions (`/command-center/decisions/`) | ✅ Sim | Decision cards com labels |
| CC Projects (`/command-center/projects/`) | ✅ Sim | ProjectGrid |
| CC Project Detail (`/command-center/projects/[slug]/`) | ✅ Sim | ProjectDetail component |
| Hub (`/hub/`) | ⚠️ Parcial | Layout ok, conteúdo ambíguo vs Home |
| Docs (`/docs/`) | ✅ Sim | DocsSidebar + cards |
| Doc Detail (`/docs/[slug]/`) | ✅ Sim | Sidebar + article |
| Product (`/produto/[slug]/`) | ✅ Sim | Problem/solution, architecture flow |
| Product Dashboard (`/produto/[slug]/dashboard/`) | ⚠️ Parcial | Dashboard genérico, métricas limitadas |
| Product Demo (`/produto/[slug]/demo/`) | ⚠️ Parcial | Demo funcional, visual básico |
| Project (`/projeto/[slug]/`) | ✅ Sim | Problem/solution, stack, impact |
| Decisions (`/decisoes/`) | ✅ Sim | DecisionCards |
| Framework (`/framework/`) | ⚠️ Parcial | Página conceitual, sem conexão explícita |
| Analytics (`/analytics/`) | ❌ Não | Dados limitados, proposta genérica |
| Search (`/busca/`) | ✅ Sim | Input + resultados |

---

## Existe Continuidade?

**Sim, em 80% das páginas.** Os elementos que garantem continuidade:

- **Header fixo** — idêntico em todas as páginas
- **Footer** — idêntico em todas as páginas
- **Tokens Horizon** — cores, espaçamento, tipografia
- **Card patterns** — mesmo estilo em ProductCard, ProjectCard, DecisionCard
- **Layout containers** — `max-w-[1440px] mx-auto px-6 py-10`
- **Back links** — `ArrowLeft` com "Voltar" / "Command Center" / etc.
- **Badges** — mesmas variantes (default, success, warning, danger)
- **Botões** — primary (bg-accent-qa) e secondary (bg-surface-elevated)

---

## Existe Identidade?

**Sim, mas com pontos fracos:**

### O que funciona:
- A identidade escura + azul + bordas sutis está presente
- "JF" no header + "Jun Fan" em todas as páginas
- ProductCards com border-l accent
- Timeline vertical com ring
- Status strip com 3 produtos
- AI Dock como elemento transversal

### O que não funciona (ou enfraquece):
- **Hub** — propósito ambíguo (vs Home)
- **Analytics** — não parece parte do ecossistema (dados genéricos)
- **Framework** — página conceitual solta
- **Product Dashboard** — métricas genéricas demais
- **Product Demo** — UI básica, sem refinamento visual

### Cada tela parece parte do mesmo produto?
**Na maioria, sim.** Mas as páginas Analytics, Framework e Hub parecem "estrangeiras" — usam os mesmos tokens, mas não carregam a mesma personalidade.

---

## O Que Precisa Melhorar

### Prioridade Alta
1. **Analytics** — ou recebe dados reais e se torna parte do ecossistema, ou é removida
2. **Hub** — consolidar com Home ou definir propósito único
3. **Framework** — mover para subpágina ou documentação

### Prioridade Média
4. **Product Dashboard** — métricas mais ricas com contexto
5. **Product Demo** — refinamento visual (icon steps, transições)
6. **Decisions duplicadas** — `/decisoes/` e `/command-center/decisions/`

### Prioridade Baixa
7. **Search page** — poderia ter sugestões/queries rápidas
8. **CC Architecture page** — poderia ter mais conteúdo visual

---

## Checklist de Consistência por Página

Para cada página, verificar:

- [ ] Header com "JF" + "Jun Fan"
- [ ] Footer com links do ecossistema
- [ ] Container max-w-[1440px] px-6 py-10
- [ ] Título H1 em text-3xl font-extrabold
- [ ] Subtítulo em text-text-secondary
- [ ] Cards seguem padrão Horizon
- [ ] Back link presente (quando aplicável)
- [ ] Cores usam tokens (não valores soltos)
- [ ] Espaçamento segue escala 4px
- [ ] Hover states presentes em elementos interativos

---

## Nota de Consistência: 7.0/10

| Critério | Nota |
|---|---|
| Continuidade visual | 8 |
| Header/Footer consistentes | 9 |
| Card patterns consistentes | 8 |
| Páginas que "destoam" | 5 (Analytics, Framework, Hub) |
| Identidade transversal (AI Dock, CP) | 8 |
| **Média** | **7.0** |
