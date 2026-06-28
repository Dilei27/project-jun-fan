# Inventory — Catálogo Completo do Legado QA Command Center

Classificação: **KEEP** = preservar na Phoenix | **IMPROVE** = manter com refatoração | **REMOVE** = descartar | **ARCHIVE** = guardar referência (não implementar agora)

---

## 1. PÁGINAS / ROTAS

### Django (14 templates)

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| **Home** (`home.html`) | Django | KEEP | Landing page central — gateway do ecossistema |
| **Product Detail** (`product_detail.html`) | Django | KEEP | Página individual de cada produto com problema/solução/stack/metrics |
| **Product Dashboard** (`product_dashboard.html`) | Django | ARCHIVE | Métricas mockadas sem fonte real — reativar quando houver dados |
| **Product Demo** (`product_demo.html`) | Django | ARCHIVE | Demo simulada sem produto real — reativar com funcionalidade real |
| **Project Detail** (`project_detail.html`) | Django | KEEP | Detalhamento de cada projeto com decisões técnicas |
| **Docs Index** (`docs_index.html`) | Django | KEEP | Landing da documentação com sidebar |
| **Doc Detail** (`doc_detail.html`) | Django | KEEP | Visualização de documento com seções |
| **Decisions** (`decisions.html`) | Django | KEEP | ADR board com cartões de decisão |
| **Hub** (`hub.html`) | Django | IMPROVE | Navegação por grid — pode ser integrada à home ou removida como página separada |
| **Analytics** (`analytics.html`) | Django | IMPROVE | Dados de sessão mockados — manter estrutura, conectar analytics real |
| **Framework** (`framework.html`) | Django | KEEP | Página conceitual do Robot/QA AI Framework |
| **Search** (`search.html`) | Django | KEEP | Busca textual com resultados em cards |
| **AI Dock** (embutido em `base.html`) | Django | KEEP | Input + respostas de IA contextual |

### Standalone HTML (7 seções em 1 página)

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| **Hero section** | Standalone | IMPROVE | Conteúdo relevante, tom pessoal excessivo — ajustar para Jun Fan |
| **Neural Graph** | Standalone | ARCHIVE | Conceito visual forte mas complexo — arquivar para v2 |
| **Impacto section** | Standalone | KEEP | Contadores de impacto com dados reais |
| **Smart Terminal** | Standalone | IMPROVE | Precursor do AI Dock — manter conceito, refatorar implementação |
| **Project Status** | Standalone | IMPROVE | Conteúdo útil — refazer como Cards padronizados |
| **Stack Técnica** | Standalone | KEEP | Tags de stack — já existe nos dados dos produtos |
| **Footer** | Standalone | KEEP | Créditos e links — adaptar para Horizon |

---

## 2. COMPONENTES REUTILIZÁVEIS

| Componente | Origem | Classificação | Justificativa |
|---|---|---|---|
| **Hero** | Ambos | KEEP | Seção principal de apresentação — adaptar para Horizon |
| **StatusStrip** | Django | KEEP | Barra de status com indicadores online/beta |
| **ProductCard** | Django | KEEP | Card de produto com badge, nome, descrição, stack, CTA |
| **ProjectCard** | Django | KEEP | Card de projeto linkável com status, contexto, impacto, stack |
| **Badge** | Ambos | KEEP | Tags de status (online, beta, concluído) |
| **Button** | Ambos | KEEP | CTAs primário, secundário, ghost |
| **Card** | Django | KEEP | Container base reutilizável |
| **Timeline** | Django | KEEP | Linha do tempo horizontal com marcos e conectores |
| **DocsSidebar** | Django | KEEP | Navegação lateral da documentação |
| **DecisionCard** | Django | KEEP | Cartão de decisão com contexto, trade-off, impacto, racional |
| **ArchitectureFlow** | Django | KEEP | Track horizontal de nós → flechas → nós |
| **AIInsightCard** | Django | KEEP | Card clicável com ícone + texto para navegação |
| **AI Dock** | Django | KEEP | Input + sugestões + resposta — expandir para Phoenix |
| **CommandPalette** | Django | KEEP | Overlay Ctrl+K com busca e navegação |
| **Skeleton / Loading** | Django | KEEP | Estados de carregamento |
| **Neural Graph** | Standalone | ARCHIVE | Canvas 2D com física — complexo para MVP |
| **Smart Terminal** | Standalone | IMPROVE | Input + comandos — refatorar como componente do AI Dock |
| **Boot Terminal** | Standalone | ARCHIVE | Animação de boot — guardar como referência de loading |
| **Impact Counters** | Standalone | KEEP | Animated counters com IntersectionObserver — adaptar como MetricCard |

---

## 3. CONTEÚDO

### Produtos

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| QA Command Center | Django (products.json) | KEEP | Produto principal da Phoenix |
| WhatsApp AI Assistant | Django (products.json) | KEEP | Produto real com roadmap |
| Vigilante AI | Django (products.json) | KEEP | Produto real com roadmap |

### Projetos

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| Automação ERP UAU | Django (projects.json) | KEEP | Projeto concluído com dados reais |
| WhatsApp AI Assistant | Django (projects.json) | KEEP | Projeto em andamento |
| Vigilante AI | Django (projects.json) | KEEP | Projeto em andamento |

### Timeline

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| 2018 — QA Manual | Django (timeline.json) | KEEP | Primeiro marco profissional |
| 2019 — Automação | Django | KEEP | Início em automação |
| 2020 — ERP Legado | Django | KEEP | Projeto relevante de automação desktop |
| 2022 — Playwright/API/Perf | Django | KEEP | Expansão técnica |
| 2024 — IA Aplicada | Django | KEEP | Virada para IA |
| 2025 — Odirlei Labs | Django | KEEP | Fundação do ecossistema |

### Decisões Técnicas

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| Django + PostgreSQL | Django (decisions.json) | ARCHIVE | Decisão do legado — não se aplica à Phoenix |
| Multi-tenant lógico | Django | ARCHIVE | Não aplicável ao portfólio |
| Horizon tokens | Django | KEEP | Decisão arquitetural ainda válida |
| IA assíncrona | Django | ARCHIVE | Decisão do backend Django |

### Documentação

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| Visão Geral | Django (docs.json) | KEEP | Overview do ecossistema |
| Setup e Ambiente | Django | KEEP | Guia de desenvolvimento |
| Produtos | Django | KEEP | Descrição dos produtos |
| Arquitetura | Django | KEEP | Decisões de design |

### AI Dock — Respostas

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| robot → Automação ERP UAU | Django (base.html) | KEEP | Conteúdo factual |
| vigilante → Vigilante AI | Django | KEEP | Conteúdo factual |
| whatsapp → WhatsApp AI | Django | KEEP | Conteúdo factual |
| arquitetura → Stack principal | Django | IMPROVE | Atualizar para stack Phoenix |
| tecnolog → Tecnologias | Django | IMPROVE | Atualizar para stack Phoenix |
| stack → Stack principal | Django | IMPROVE | Atualizar para stack Phoenix |
| começar → Setup | Django | KEEP | Guia local |

### AI Dock — Sugestões

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| "Explique o Vigilante AI" | Django (home.html) | KEEP | Pergunta válida |
| "Mostre decisões de arquitetura" | Django | KEEP | Pergunta válida |
| "Quais tecnologias domino?" | Django | IMPROVE | Reformular para "Quais tecnologias a Phoenix usa?" |

### Comandos do Terminal (Standalone)

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| odirlei --help | Standalone | IMPROVE | Renomear para contexto Phoenix |
| odirlei --skills | Standalone | IMPROVE | Conteúdo válido, comando precisa mudar |
| odirlei --experience | Standalone | IMPROVE | Conteúdo válido, comando precisa mudar |
| odirlei --ai | Standalone | IMPROVE | Conteúdo válido, comando precisa mudar |
| odirlei --devops | Standalone | IMPROVE | Conteúdo válido, comando precisa mudar |
| odirlei --projects | Standalone | IMPROVE | Conteúdo válido, comando precisa mudar |
| odirlei --contact | Standalone | IMPROVE | Conteúdo válido, comando precisa mudar |
| clear | Standalone | KEEP | Comando universal de terminal |

### Nós do Grafo Neural

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| QA CORE (central) | Standalone | ARCHIVE | Nó central do grafo — arquivar para v2 |
| Robot | Standalone | ARCHIVE | Nó satélite |
| Web/API | Standalone | ARCHIVE | Nó satélite |
| IA/RAG | Standalone | ARCHIVE | Nó satélite |
| DevOps | Standalone | ARCHIVE | Nó satélite |
| Processos | Standalone | ARCHIVE | Nó satélite |
| k6 Perf | Standalone | ARCHIVE | Nó satélite |

### Métricas de Impacto

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| 95% foco em rastreabilidade | Standalone | KEEP | Métrica real — migrar para metrics.json |
| 50+ projetos e automações | Standalone | KEEP | Métrica real — migrar para metrics.json |
| 10x aceleração CI/CD | Standalone | KEEP | Métrica real — migrar para metrics.json |
| 3 frentes (QA, IA, DevOps) | Standalone | KEEP | Métrica real — migrar para metrics.json |

### Métricas Django

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| 12 projetos | Django (products.json) | KEEP | Consolidar com métricas standalone |
| 15 automações | Django | KEEP | Consolidar com métricas standalone |
| 5 frameworks | Django | KEEP | Consolidar com métricas standalone |

### Tags de Stack

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| Python | Ambos | KEEP | Tecnologia principal |
| Robot Framework | Ambos | KEEP | Stack de automação |
| SikuliLibrary | Standalone | KEEP | Stack específica |
| Playwright | Ambos | KEEP | Stack de automação web |
| Cypress | Standalone | KEEP | Stack de automação web |
| k6 | Standalone | KEEP | Stack de performance |
| Docker | Ambos | KEEP | Stack de infra |
| Azure DevOps | Standalone | KEEP | Stack de CI/CD |
| GitHub Actions | Standalone | KEEP | Stack de CI/CD |
| LLMs | Standalone | KEEP | Stack de IA |
| RAG | Standalone | KEEP | Stack de IA |
| Agentes IA | Standalone | KEEP | Stack de IA |
| Django | Django | KEEP | Stack do legado |
| PostgreSQL | Django | KEEP | Stack do legado |
| LangChain | Django | KEEP | Stack de IA |

---

## 4. DESIGN

### Cores

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| --bg: #020617 (dark base) | Standalone | KEEP | Fundo escuro — alinhado com Horizon dark |
| --panel: rgba(15,23,42,.68) | Standalone | IMPROVE | Glassmorphism — usar tokens Horizon |
| --line: rgba(255,255,255,.13) | Standalone | IMPROVE | Bordas — usar tokens Horizon |
| --text: #f8fafc | Standalone | KEEP | Texto claro — manter |
| --muted: #94a3b8 | Standalone | KEEP | Texto secundário — manter |
| --cyan: #38d5ff | Standalone | REMOVE | Neon excessivo — substituir por accent Horizon |
| --blue: #4f8cff | Standalone | IMPROVE | Similar ao accent Horizon (--color-accent-qa) |
| --purple: #9b5cff | Standalone | REMOVE | Neon excessivo |
| --green: #36f2a6 | Standalone | REMOVE | Neon excessivo |
| --yellow: #ffd166 | Standalone | REMOVE | Não usado no Horizon |
| --red: #ff6b6b | Standalone | REMOVE | Não usado no Horizon |
| accentColor product 1: #4F8CFF | Django | IMPROVE | Usar token --color-accent-qa |
| accentColor product 2: #2DD4BF | Django | KEEP | Teal — manter como cor secundária |
| accentColor product 3: #F97316 | Django | KEEP | Orange — manter como cor secundária |

### Tipografia

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| Segoe UI | Standalone | REMOVE | Substituir por Inter (Horizon) |
| Consolas | Standalone | IMPROVE | Monospace para terminal — manter, mas ver alternativa Horizon |
| Inter | Django | KEEP | Fonte oficial do Horizon |
| Font weights: 400, 500, 600, 700 | Django | KEEP | Pesos padrão Horizon |

### Espaçamento

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| CSS spacing tokens (--space-1 a --space-8) | Django | KEEP | Sistema de spacing Horizon |
| padding/margin arbitrários (px) | Ambos | IMPROVE | Substituir por tokens Horizon |
| width: min(1240px, calc(100% - 40px)) | Standalone | KEEP | Layout constraint — manter |
| width: min(100% - 28px, 1240px) (mobile) | Standalone | KEEP | Mobile constraint — manter |

### Motion

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| @keyframes pulse (green dot) | Standalone | IMPROVE | Manter como indicador de status online |
| @keyframes float (panel) | Standalone | REMOVE | Efeito decorativo sem propósito |
| @keyframes blink (cursor) | Standalone | KEEP | Cursor de terminal — manter |
| IntersectionObserver counters | Standalone | KEEP | Animação sob demanda — boa prática |
| Boot typing effect | Standalone | ARCHIVE | Efeito interessante mas sem uso na Phoenix |
| Mouse spotlight (--mx, --my) | Standalone | REMOVE | Desnecessário, sem acessibilidade |
| hover: translateY(-4px) | Standalone | IMPROVE | Micro-interação — manter com tokens |
| transition: .25s | Standalone | KEEP | Transição genérica — manter |

### Efeitos

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| backdrop-filter: blur | Ambos | IMPROVE | Glassmorphism — manter com moderação |
| box-shadow glow | Standalone | REMOVE | Neon shadows — conflita com Horizon |
| box-shadow: 0 30px 100px rgba(0,0,0,.46) | Standalone | IMPROVE | Sombra de painel — manter com tokens |
| gradient backgrounds (radial) | Standalone | REMOVE | Fundo gradiente poluído — Horizon usa sólido |
| linear-gradient text | Standalone | REMOVE | Gradient text cyan/purple — não-Horizon |
| grid overlay (body::before) | Standalone | REMOVE | Grid de fundo — desnecessário |
| mask-image gradient | Standalone | REMOVE | Degradê no grid — complexidade visual |
| border: 1px solid var(--line) | Ambos | KEEP | Borda sutil — manter |

### Temas

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| Dark theme (--bg: #020617) | Standalone | KEEP | Tema escuro — alinhado com Horizon |
| CSS custom properties | Standalone | KEEP | Tokens via CSS vars — boa prática |
| CSS classes do horizon.css | Django | KEEP | Design system oficial |

### Responsividade

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| @media(max-width: 980px) | Standalone | IMPROVE | Breakpoint único — expandir para mobile/tablet/desktop |
| grid 1-col em mobile | Standalone | KEEP | Layout empilhado — manter |
| nav-links hidden sem alternativa | Standalone | REMOVE | Sem hamburger — precisa de nav mobile |
| font-size: 52px mobile | Standalone | KEEP | Heading responsivo — manter |
| overflow-wrap: anywhere | Standalone | KEEP | Prevenção de overflow — manter |

---

## 5. INTERAÇÕES / COMPORTAMENTOS

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| Ctrl+K Command Palette | Django | KEEP | Atalho essencial para navegação |
| Enter no AI Dock → fetch API | Django | IMPROVE | Adaptar para API real ou mock local |
| Clique em insight card → navega | Django | KEEP | Padrão de navegação — manter |
| Enter no terminal → interpreta comando | Standalone | IMPROVE | Incorporar no AI Dock |
| Clique em nó do grafo → atualiza detail | Standalone | ARCHIVE | Interação do grafo — arquivar |
| Mouse repulsion nos nós | Standalone | ARCHIVE | Física do grafo — arquivar |
| Contadores animados no scroll | Standalone | KEEP | IntersectionObserver — manter |
| Scroll suave (scroll-behavior: smooth) | Standalone | KEEP | Navegação suave — manter |
| Drag em nós do grafo | Standalone | ARCHIVE | Interação do grafo — arquivar |

---

## 6. INFRAESTRUTURA / DEPENDÊNCIAS

| Item | Origem | Classificação | Justificativa |
|---|---|---|---|
| Python 3.12+ | Django | ARCHIVE | Substituir por Node.js/Next.js |
| Django 6.0.6 | Django | REMOVE | Substituir por React/Next.js |
| PostgreSQL | Django | ARCHIVE | Banco relacional — não necessário para site estático |
| SQLite | Django | ARCHIVE | Dev database |
| Google Fonts (Inter) | Django | KEEP | Fonte Inter — manter |
| Lucide icons (CDN) | Django | IMPROVE | Ícones — substituir por versão local ou packaged |
| horizon.css | Django | KEEP | Design system — base da Phoenix |
| JSON files (5) | Django | KEEP | Fonte de dados estruturados |
| Canvas 2D API | Standalone | ARCHIVE | Renderização grafo — arquivar |
| IntersectionObserver | Standalone | KEEP | API nativa — manter |
| CSS custom properties | Standalone | KEEP | Tokens — manter e expandir |

---

## 7. RESUMO POR CLASSIFICAÇÃO

| Classificação | Contagem | Exemplos |
|---|---|---|
| **KEEP** | ~80 itens | Home, ProductCard, Timeline, Badge, métricas reais, JSONs, Inter font, dark theme, Command Palette |
| **IMPROVE** | ~35 itens | Hero (tom pessoal), Smart Terminal → AI Dock, cores neon → Horizon, espaçamento → tokens, mobile nav |
| **REMOVE** | ~15 itens | Mouse spotlight, grid overlay, Segoe UI, gradient text, neon glow, Django framework, Lucide CDN |
| **ARCHIVE** | ~18 itens | Neural Graph, Boot animation, Product Dashboard/Demo mockados, decisões do legado, Canvas grafo, nós do grafo |
