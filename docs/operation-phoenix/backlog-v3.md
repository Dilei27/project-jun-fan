# Backlog v3 — Project Jun Fan

> Gerado pela RC-01 Product Polish Review Board.
> Organizado por categorias de impacto x esforço.

---

## Quick Wins (Alto Impacto, Baixo Esforço)

| # | Item | Tipo | Justificativa |
|---|---|---|---|
| QW-01 | Remover duplicação Timeline / TimelineSection | cleanup | Código idêntico em 2 arquivos; consolidar em components/shared |
| QW-02 | Remover import duplicado da fonte Inter | performance | Google Fonts em globals.css + next/font em layout.tsx |
| QW-03 | Aplicar motion.variants do motion.ts nos componentes | design token | Tokens existem mas não são consumidos |
| QW-04 | Remover pastas vazias (hooks/, providers/, utils/, styles/, features/*/data|hooks|sections|utils/) | cleanup | Dead weight no escopo do projeto |
| QW-05 | Mover AIInsightCards dados para JSON | content | Dados hardcoded no componente |
| QW-06 | Extrair constantes de AI Dock para content JSON | content | Respostas hardcoded no componente |
| QW-07 | Adicionar loading.tsx global e error.tsx global | ux | Missing states — fallback para Next.js default |
| QW-08 | Adicionar not-found.tsx personalizado | ux | Missing state — experiência quebrada atualmente |
| QW-09 | Trocar links "#" por links reais ou removê-los | conteúdo | Links de docs e repo apontam para "#" |
| QW-10 | Aplicar ENABLE_AI_DOCK no layout condicionalmente | config | Constante definida mas não usada |
| QW-11 | Substituir blur-3xl do hero por token Horizon | design token | Valor solto sem token |
| QW-12 | Remover prefers-color-scheme: dark redundante em theme.css | cleanup | Mesmos valores já definidos no :root |

---

## Nice to Have (Médio Impacto, Médio Esforço)

| # | Item | Tipo | Justificativa |
|---|---|---|---|
| NH-01 | Home com narrativa visual + "Absorb. Refine. Build." | ux | Home sem storytelling; manifesto não aparece |
| NH-02 | Hierarquia visual no Command Center (seções com pesos diferentes) | ux | 8 seções com mesmo heading style; sobrecarga |
| NH-03 | Boot Loader opcional (verificar localStorage se já visto) | ux | 1.4s obrigatório atrasa experiência recorrente |
| NH-04 | Motion de entrada em cards (usar motion.variants) | motion | Cards aparecem sem animação; motion.ts já define |
| NH-05 | Mobile menu com AnimatePresence (slide down) | ux | Menu mobile aparece sem transição |
| NH-06 | SkillsCloud filtrar/expor nível adequadamente | ux | "iniciante" em IA pode prejudicar percepção |
| NH-07 | Métricas com fonte/ano/referência | conteúdo | 50+, 10x, 3 sem contexto |
| NH-08 | Nested layouts (ex: command-center layout próprio) | arquitetura | Root layout único para tudo; subnavegação ajudaria |
| NH-09 | Skeleton ser usado em páginas com loading state | ux | Skeleton existe mas não é usado |
| NH-10 | JetBrains Mono importado ou removido de globals.css | cleanup | Token --font-mono aponta para fonte não carregada |
| NH-11 | Product page com ArchitectureFlow dinâmico por produto | ux | ArchitectureFlow é genérico (defaultSteps) |
| NH-12 | Footer links (GitHub, Contato) usar config/navigation | cleanup | Hardcoded no footer |

---

## Future Ideas (Alto Impacto, Alto Esforço)

| # | Item | Tipo | Justificativa |
|---|---|---|---|
| FI-01 | Modo claro (light mode) | ux | PRD menciona como futuro; ampliaria percepção |
| FI-02 | Multi-idioma (pt-BR + en) | ux | Abrir para audiência internacional |
| FI-03 | Grafo de expertise interativo (D3/vis) | produto | SkillsCloud atual é lista estática |
| FI-04 | Product Switcher (dropdown entre produtos) | navegação | Navegação atual não permite troca rápida de produto |
| FI-05 | Architecture Pipeline visual com graph | produto | Mapear dependências entre módulos |
| FI-06 | Demo interativa real para cada produto | produto | Demo atual é genérica com steps fixos |
| FI-07 | Dashboard operacional por produto | produto | Dashboards mockados existem mas são limitados |
| FI-08 | Search com preview expandido e keyboard shortcuts | ux | Command Palette é bom mas search preview é limitado |
| FI-09 | Breadcrumbs de navegação | ux | Profundidade de navegação sem breadcrumb |
| FI-10 | Analytics real com charts | produto | Página /analytics/ existe mas é estática |
| FI-11 | System status / uptime indicator | ux | StatusStrip é bom, mas poderia incluir mais info |

---

## Labs (Exploração / Pesquisa)

| # | Item | Área | Hipótese |
|---|---|---|---|
| LB-01 | MDX para documentação avançada | content | Docs.json atual é bom mas MDX permitiria rich content |
| LB-02 | AI real (serverless, sem Celery/RabbitMQ) | ai | AI Dock mockado; real exigiria backend seguro |
| LB-03 | GitHub Sync (GitHub Actions CI/CD) | devops | Pipeline de deploy automatizado |
| LB-04 | ADR workflow automatizado | devops | Gerar ADRs a partir de PRs |
| LB-05 | Temas dinâmicos por produto | design | Cada produto ter variação sutil do tema base |

---

## Research (Pesquisa Técnica)

| # | Item | Questão |
|---|---|---|
| RE-01 | next/font vs Google Fonts para performance | Qual a abordagem ideal para carregar fontes? |
| RE-02 | Framer Motion vs CSS animations para card grids | Qual performa melhor em grids de 12+ cards? |
| RE-03 | SSG vs ISR para conteúdo que muda pouco | JSON em SSG requer rebuild; ISR seria melhor? |
| RE-04 | Bundle size de framer-motion no mobile | Framer adiciona ~30KB; vale para animações mínimas? |

---

## Knowledge Graph

| # | Item | Descrição |
|---|---|---|
| KG-01 | Mapa visual de competências | Conectar skills, projetos, produtos e decisões |
| KG-02 | Dependências entre módulos | Mostrar como QA → WhatsApp → Vigilante se conectam |
| KG-03 | Linha do tempo interativa | Timeline atual é estática; poderia ser clicável |

---

## AI Dock

| # | Item | Prioridade |
|---|---|---|
| AI-01 | Sugestões contextuais por página | Média |
| AI-02 | Respostas com mais profundidade e fontes | Média |
| AI-03 | Histórico de conversa | Baixa |
| AI-04 | Feedback do usuário (útil/não útil) | Baixa |
| AI-05 | AI real via serverless function | Alta (quando houver backend) |

---

## Voice

| # | Item | Descrição |
|---|---|---|
| VC-01 | Comandos de voz no AI Dock | "Mostre projetos de automação" |
| VC-02 | Navegação por voz | "Ir para Command Center" |
| VC-03 | Status do ecossistema por áudio | "Qual o status do Vigilante AI?" |

---

## Mobile

| # | Item | Prioridade |
|---|---|---|
| MB-01 | Bottom navigation bar | Média |
| MB-02 | AI Dock como bottom sheet | Média |
| MB-03 | Gestos de swipe para navegação | Baixa |
| MB-04 | PWA support | Baixa |
| MB-05 | Touch feedback otimizado | Baixa |

---

## Architecture Pipeline

| # | Item | Descrição |
|---|---|---|
| AP-01 | Pipeline de review arquitetural | Processo automatizado para revisão de ADRs |
| AP-02 | Graph de dependências | Visualização de como módulos se conectam |
| AP-03 | ADR workflow | Criação, revisão e aprovação de ADRs |
| AP-04 | Reuse map automático | Identificar oportunidades de reutilização |
