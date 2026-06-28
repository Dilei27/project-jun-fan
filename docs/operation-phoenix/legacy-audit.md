# Auditoria do Legado — QA Command Center

## Visão geral do legado

O QA Command Center é um portfólio interativo de página única (78 linhas HTML) construído com HTML puro, CSS inline e JavaScript vanilla. Foi desenvolvido como um "Command Center" pessoal de Odirlei Alves, QA Engineer, combinando elementos de terminal, grafo neural e painéis de métrica. Todo o código reside em um único arquivo `/tmp/qa-command-center/index.html`, sem dependências externas (sem frameworks, sem bundlers, sem CDNs).

## Inventário de telas/seções

| Seção | Descrição |
|---|---|
| **Hero** | Cabeçalho com gradiente no nome, badge "Quality ecosystem online", subtítulo, descrição e CTA buttons |
| **Neural Graph** | Grafo interativo com canvas + nós HTML posicionados no topo, arestas desenhadas em tempo real |
| **Impacto** | 4 contadores animados com IntersectionObserver (rastreabilidade, projetos, aceleração, frentes) |
| **Smart Terminal** | Terminal interativo que responde a comandos predefinidos e faz roteamento por intenção |
| **Project Status** | 3 cards de status (QA Command Center, Agente QA Azure, Automation Stack) |
| **Stack Técnica** | Tags de stack (Python, Robot Framework, Playwright, Docker, etc.) |

## Inventário de componentes

| Componente | Descrição |
|---|---|
| **Boot terminal** | Animação de digitação que simula boot de um sistema, com linhas sequenciais e cursor piscante |
| **Graph canvas** | Canvas 2D com nós físicos (mola/repulsão) conectados por arestas, com mouse spotlight repulsivo |
| **Command input** | Input de texto com handler de teclado que interpreta comandos exatos ou mapeia intenções |
| **Impact counters** | 4 elementos `<strong>` com `data-target` que animam numericamente ao entrar na viewport |

## Inventário de conteúdo

| Tipo | Conteúdo |
|---|---|
| **Textos** | Nome, títulos, descrições, bio, footer |
| **Métricas** | 95% rastreabilidade, 50+ projetos, 10x aceleração, 3 frentes |
| **Comandos** | 8 comandos (--help, --skills, --experience, --ai, --devops, --projects, --contact, clear) |
| **Respostas** | 8 respostas textuais predefinidas em `terminalResponses` |
| **Nós do grafo** | 7 nós (QA CORE, Robot, Web/API, IA/RAG, DevOps, Processos, k6 Perf) |
| **Tags de stack** | 12 tags técnicas |

## Inventário visual

| Elemento | Descrição |
|---|---|
| **Tema** | Dark — fundo `#020617` com gradientes radiais e lineares |
| **Paleta** | Cyan (`#38d5ff`), blue (`#4f8cff`), purple (`#9b5cff`), green (`#36f2a6`), yellow (`#ffd166`), red (`#ff6b6b`) |
| **Grid background** | Grid de 72px com opacidade 3.5% via `background-image` + `mask-image` |
| **Mouse spotlight** | Círculo radial cyan que segue o mouse via CSS custom properties |
| **Tipografia** | `Segoe UI` como primary, `Consolas` para terminais |
| **Glassmorphism** | Painéis com `backdrop-filter: blur`, bordas semitransparentes |
| **Neon** | Sombra green no pulse, sombra cyan/purple nos gradientes, glow nos nós do grafo |

## Riscos

| Risco | Descrição |
|---|---|
| **Neon excessivo para Horizon** | O visual neon/cyberpunk não se alinha ao design system Horizon (sóbrio, limpo, acessível) |
| **Single page com 78 linhas** | Todo o conteúdo + estilo + script em um arquivo — insustentável para evolução |
| **Conteúdo hardcoded** | Textos, comandos, respostas, nós do grafo, métricas — tudo fixo no HTML |
| **Sem mobile nav** | Menu desktop com `display:none` em mobile — sem hamburger, sem drawer |
| **Acessibilidade** | Sem ARIA, sem contraste adequado em vários elementos, sem suporte a reduced motion |
| **Manutenção** | CSS inline impede reuso; JS sem modularização |

## Oportunidades

| Oportunidade | Descrição |
|---|---|
| **Interactive graph concept** | Ideia de grafo neural conectando skills é forte — pode ser adaptada como feature visual |
| **Smart terminal concept** | Terminal como interface de navegação/descoberta tem potencial (precursor do AI Dock) |
| **Boot animation** | Animação de boot pode ser reutilizada como loading screen ou transição |
| **Métricas de impacto** | Conteúdo de métricas é relevante e verdadeiro — deve ser preservado |
| **Portfolio vivo** | Conceito de command center é marcante e diferenciado |

## Recomendação de migração

1. **Refazer com Horizon** — reconstruir o portfólio usando o design system Horizon (Inter, tokens, sólido escuro, acessibilidade)
2. **Extrair conteúdo para JSON** — textos, métricas, comandos, nós do grafo em arquivos JSON separados
3. **Criar multi-page** — separar em páginas dedicadas (Home, Skills, Projetos, Contato) com navegação e rotas
4. **Refinar componentes** — Boot animation → loading/AI Dock; Smart Terminal → Command Palette; contadores → MetricCard
5. **Descartar excessos visuais** — remover mouse spotlight, grid background, neon exagerado, Segoe UI
