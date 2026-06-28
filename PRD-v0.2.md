# PRD v0.2 - Project Jun Fan

**Status:** Fonte oficial para início das sprints do Project Jun Fan.
**Base:** PRD v0.1 preservado e evoluído.
**Papel deste documento:** orientar produto, design, arquitetura front-end, documentação, implementação assistida por IA e validação de qualidade.

Project Jun Fan não é um produto, SaaS, framework ou sistema comercial. Project Jun Fan é a filosofia de construção do ecossistema: absorver referências, refinar princípios e construir uma linguagem própria. Este PRD deve ser interpretado com essa lente em todas as decisões.

Princípio operacional:

> Absorb. Refine. Build.

## 1. Resumo Executivo

A Jun Fan será uma plataforma de produtos, documentação e demonstrações técnicas construída para apresentar automação, qualidade de software e inteligência artificial aplicada como um ecossistema coeso. O projeto não deve se comportar como um portfólio tradicional, uma landing page isolada ou um dashboard genérico. Ele deve transmitir maturidade de produto, pensamento sistêmico, clareza técnica e identidade visual própria.

No contexto do Project Jun Fan, a plataforma deve ser construída com disciplina de produto antes de velocidade de entrega. A prioridade não é adicionar funcionalidades rapidamente, mas criar uma fundação simples, reutilizável, consistente e preparada para sustentar todos os produtos do ecossistema sem overengineering.

O QA Command Center será o ponto inicial da experiência. Ele funcionará como hub central, portfólio vivo e cockpit de navegação para produtos, projetos, decisões técnicas, demos, métricas, documentação e recursos de IA assistida. A partir dele, o visitante poderá explorar os módulos WhatsApp AI Assistant e Vigilante AI, além de futuras iniciativas como Jun Fan Hub e Robot/QA AI Framework.

A plataforma será sustentada pelo Jun Fan Product Language e pelo Horizon Design System v0.1. O Horizon definirá tokens, componentes, padrões de layout, motion, microcopy, acessibilidade e regras para evolução de novas telas. A identidade deve ser premium, técnica, futurista e silenciosa, evitando estética genérica de IA, neon excessivo, visual gamer, cyberpunk ou templates SaaS sem personalidade.

O MVP deve entregar uma primeira versão navegável, responsiva e documentada, suficiente para validar a percepção de plataforma de produtos. Integrações reais com WhatsApp, câmeras e IA generativa em produção ficam fora do escopo inicial, mas a arquitetura deve preparar o caminho para essas evoluções.

## 2. Visão do Produto

A visão é transformar a Jun Fan em um Product Operating System pessoal e profissional: um ambiente navegável onde projetos deixam de ser cards estáticos e passam a ser produtos exploráveis, com narrativa, arquitetura, documentação, demos e raciocínio técnico.

Frase-guia:

> Construir sistemas que automatizam, explicam, monitoram e evoluem.

A plataforma deve fazer o visitante perceber que existe engenharia por trás de cada tela. O objetivo não é apenas mostrar que uma automação funciona, mas explicar qual problema foi entendido, como a solução foi desenhada, quais trade-offs existiram, qual stack foi usada e como aquilo poderia evoluir para produto comercial.

O futuro desejado é chegar ao nível 4/5 da maturidade visual definida no handbook:

| Nível | Descrição | Status Desejado |
|---|---|---|
| 1 | Portfólio comum com cards estáticos | Evitar |
| 2 | Portfólio premium com boa estética | Mínimo aceitável |
| 3 | Hub de produtos com páginas e demos | Alvo do MVP |
| 4 | Plataforma com identidade, docs e AI Dock compartilhados | Alvo principal |
| 5 | Product Operating System com IA contextual, dados e produtos interligados | Evolução avançada |

## 3. Objetivos e Não Objetivos

### Objetivos

1. Criar uma plataforma inicial com percepção clara de ecossistema de produtos.
2. Posicionar o QA Command Center como hub principal, não apenas como currículo ou dashboard.
3. Apresentar WhatsApp AI Assistant e Vigilante AI como produtos da mesma família visual e conceitual.
4. Estabelecer o Horizon Design System v0.1 com tokens e componentes essenciais.
5. Criar páginas de produto padronizadas com problema, solução, arquitetura, demo, stack e roadmap.
6. Separar conteúdo de apresentação de JSX ou componentes visuais, usando arquivos estruturados sempre que possível.
7. Criar uma documentação inicial que pareça parte da plataforma.
8. Implementar uma versão inicial do AI Dock como camada de exploração contextual, mockada ou preparada para integração futura.
9. Garantir responsividade, acessibilidade básica, boa performance percebida e motion funcional.
10. Produzir uma base que permita evoluir novos produtos sem reinventar navegação, cards, microcopy e tokens.

### Não Objetivos

1. Não implementar integração real com WhatsApp no MVP.
2. Não implementar integração real com câmeras no MVP.
3. Não publicar IA generativa em produção sem backend seguro, controle de contexto e estratégia de privacidade.
4. Não criar autenticação, multiusuário ou área administrativa completa no MVP.
5. Não construir dashboards operacionais completos para todos os produtos na primeira entrega.
6. Não copiar visualmente Linear, Raycast, Arc, Stripe, Vercel ou qualquer benchmark.
7. Não transformar a home em painel de métricas.
8. Não criar um Design System fechado demais antes de validar telas reais.

## 4. Público-Alvo e Personas

| Persona | Perfil | Necessidade Principal | Sinal de Sucesso |
|---|---|---|---|
| Recrutador técnico | Avalia experiência, senioridade e clareza profissional | Entender rapidamente o posicionamento e abrir contato | Consegue explicar a proposta em menos de 10 segundos |
| Tech lead/Engineering manager | Avalia profundidade técnica, arquitetura e autonomia | Ver decisões técnicas, stack, trade-offs e impacto | Abre páginas de arquitetura e projetos |
| Founder/cliente | Busca solução prática para automação, atendimento ou monitoramento | Entender valor comercial dos produtos | Explora WhatsApp AI ou Vigilante AI e vê demo |
| QA/Desenvolvedor | Quer entender ferramentas, automações, frameworks e documentação | Navegar por docs, setup, logs e decisões | Usa docs e command palette para encontrar conteúdo |
| Mantenedor | Evolui produtos e conteúdos ao longo do tempo | Criar novas telas sem retrabalho visual | Usa tokens, componentes e estrutura de conteúdo |
| Visitante mobile | Chega por LinkedIn, WhatsApp ou link direto | Entender proposta rapidamente no celular | Navega sem depender de desktop |

## 5. Problemas a Resolver

1. Projetos técnicos bons parecem menores quando aparecem como repositórios soltos, páginas simples ou dashboards genéricos.
2. A ausência de linguagem visual consistente dificulta que novos produtos pareçam parte da mesma família.
3. Um portfólio tradicional não comunica suficientemente arquitetura, decisões, impacto e visão de produto.
4. Dashboards na primeira dobra podem transmitir monitoramento genérico em vez de narrativa de produto.
5. IA pode virar decoração clichê se não for tratada como camada funcional.
6. Conteúdo hardcoded dificulta manutenção, evolução e reutilização.
7. Sem Design System, cada tela tende a ser criada no improviso.
8. Sem documentação integrada, o raciocínio técnico fica escondido.

## 6. Proposta de Solução

A solução é criar uma plataforma modular baseada em seis camadas:

| Camada | Função |
|---|---|
| Jun Fan Hub | Entrada conceitual para marca, produtos e navegação principal |
| QA Command Center | Cockpit central, portfólio vivo e hub inicial do ecossistema |
| Product Modules | Páginas e módulos para WhatsApp AI, Vigilante AI e futuros produtos |
| Documentation Layer | Docs, decisões técnicas, fluxos, arquitetura e setup |
| AI Layer | AI Dock, AI Insight, busca contextual e respostas com fontes internas |
| Horizon Design System | Tokens, componentes, motion, microcopy e padrões responsivos |

A home deve funcionar como experiência de entrada:

1. Hero minimalista com identidade e CTAs.
2. Linha de status discreta.
3. Product Gateway com cards grandes dos produtos.
4. Timeline de trajetória técnica.
5. Expertise Graph ou mapa de competências.
6. Featured Projects com problema, solução, stack e impacto.
7. AI Dock para perguntas contextuais.
8. Engineering Notes com decisões e aprendizados.
9. Footer premium com links e contato.

## 7. Escopo do MVP

O MVP deve validar a percepção de ecossistema, a linguagem visual e a estrutura de navegação. A entrega deve ser implementável em ciclos curtos.

### Incluído no MVP

1. Home do QA Command Center como hub narrativo.
2. Product Gateway com QA Command Center, WhatsApp AI Assistant e Vigilante AI.
3. Página padronizada para cada produto principal.
4. Página de detalhe para projetos selecionados.
5. Horizon Design System v0.1 com tokens, tipografia, cores, espaçamento, radius, motion e componentes essenciais.
6. AI Dock em versão mockada, estática ou preparada para conexão futura.
7. Command Palette em versão inicial para navegação local.
8. Documentation Layer inicial em Markdown/MDX.
9. Conteúdo estruturado em JSON/YAML/MDX para produtos, projetos, timeline e decisões.
10. Estados básicos de UI: default, hover, focus, loading, empty, error e disabled quando aplicável.
11. Responsividade para mobile, tablet, desktop e wide.
12. Acessibilidade básica: contraste, foco, labels, navegação por teclado e reduced motion.

### Critério de Corte do MVP

Se houver conflito entre estética avançada e clareza funcional, priorizar clareza. Se houver conflito entre componente genérico e componente novo, priorizar reutilização. Se houver conflito entre dashboard e narrativa, priorizar narrativa.

## 8. Fora de Escopo

1. Integração real com WhatsApp Business API.
2. Integração real com câmeras, RTSP, storage de vídeo ou detecção em tempo real.
3. Backend completo de IA generativa.
4. Login, permissões, multiusuário e billing.
5. Dashboard operacional completo com dados reais.
6. Analytics avançado de produto.
7. CMS completo.
8. Internacionalização completa.
9. Design System publicado como pacote separado.
10. Testes automatizados end-to-end extensivos para todos os fluxos.

## 9. Produtos do Ecossistema

### 9.1 QA Command Center

Função: hub central, portfólio vivo e cockpit do ecossistema.

Deve apresentar:

1. Posicionamento profissional e identidade Jun Fan.
2. Trajetória em QA manual, automação, ERP legado, web, API, performance e IA aplicada.
3. Projetos com problema, solução, impacto, stack e links.
4. Métricas relevantes, quando aplicável.
5. Decisões técnicas e architecture notes.
6. Entrada para documentação e AI Dock.
7. Acesso aos demais produtos.

Exemplo de narrativa:

> Eu construo automações, agentes e plataformas que transformam processos manuais em sistemas inteligentes, rastreáveis e reutilizáveis.

### 9.2 WhatsApp AI Assistant

Função: produto de atendimento comercial para pequenos negócios.

Problema: pequenos negócios perdem tempo e oportunidades respondendo perguntas repetitivas, esquecendo agendamentos e deixando leads sem resposta.

Solução: assistente conectado ao WhatsApp comercial que responde dúvidas frequentes, coleta informações, qualifica clientes, sugere respostas, agenda horários, resume conversas e transfere para atendimento humano quando necessário.

Fluxo conceitual:

```text
Mensagem do cliente -> Entrada WhatsApp -> Processamento -> Contexto -> IA -> Regra de negócio -> Resposta/Agendamento/Resumo -> Log
```

Telas futuras:

1. Dashboard de conversas.
2. Lista de clientes.
3. Detalhe de conversa.
4. Agenda.
5. Prompts e configurações.
6. Logs e auditoria.
7. AI Insight com resumo do dia.

Acento visual: `#2DD4BF`.

### 9.3 Vigilante AI

Função: produto de monitoramento residencial com IA assistida.

Problema: câmeras comuns geram muitos alertas inúteis e exigem verificação manual constante.

Solução: agente de monitoramento que detecta movimento, classifica eventos com IA, envia alertas, registra evidências, mantém histórico e reduz ruído distinguindo pessoa, animal, veículo, sombra ou movimento irrelevante.

Fluxo conceitual:

```text
Câmera -> Captura/Evento -> Detecção -> Classificação IA -> Regra de severidade -> Alerta -> Registro -> Histórico
```

Telas futuras:

1. Dashboard de câmeras.
2. Feed ao vivo.
3. Eventos recentes.
4. Timeline por câmera.
5. Detalhe de alerta.
6. Configurações de sensibilidade.
7. Regras de notificação.
8. Histórico com filtros.

Acento visual: `#F97316`.

### 9.4 Jun Fan Hub

Função: camada superior para todos os produtos. No MVP, pode existir como conceito embutido na home do QA Command Center. Futuramente pode virar home independente.

### 9.5 Robot/QA AI Framework

Função: módulo futuro para automação com IA aplicada a QA, geração de cenários, análise de logs, documentação e suporte a frameworks como Robot Framework, Playwright e automações de ERP legado.

## 10. Jornadas de Usuário

### Jornada 1 - Recrutador Técnico

| Campo | Descrição |
|---|---|
| Persona | Recrutador técnico |
| Objetivo | Entender posicionamento, senioridade e projetos relevantes rapidamente |
| Entrada | Link no LinkedIn, currículo ou mensagem direta |
| Passos | Abre home, lê hero, vê Product Gateway, explora Featured Projects, abre contato |
| Pontos de decisão | Se entende em poucos segundos que é plataforma; se encontra stack e impacto |
| Resultado esperado | Recrutador entende QA + Automação + IA aplicada e segue para contato |
| Sinais de sucesso | Clique em projeto, LinkedIn, GitHub ou contato; tempo mínimo de exploração de 1-2 minutos |

### Jornada 2 - Tech Lead ou Engineering Manager

| Campo | Descrição |
|---|---|
| Persona | Tech lead, engineering manager ou founder técnico |
| Objetivo | Avaliar profundidade técnica, arquitetura e autonomia |
| Entrada | Link direto ou indicação |
| Passos | Abre home, acessa projeto, lê problema/solução, abre Architecture Flow, consulta Decision Cards e docs |
| Pontos de decisão | Se decisões têm contexto, trade-off e impacto; se stack é clara |
| Resultado esperado | Confiança de que existe raciocínio técnico e capacidade de produto |
| Sinais de sucesso | Acesso a docs, leitura de decisões, clique em repositório ou contato |

### Jornada 3 - Cliente de Pequeno Negócio

| Campo | Descrição |
|---|---|
| Persona | Dono ou gestor de pequeno negócio |
| Objetivo | Entender valor do WhatsApp AI Assistant |
| Entrada | Link compartilhado em conversa ou apresentação |
| Passos | Abre produto WhatsApp AI, lê dor, vê fluxo, consulta demo mockada, entende handoff humano |
| Pontos de decisão | Se o produto parece prático e confiável; se evita promessa exagerada |
| Resultado esperado | Cliente entende como o assistente reduz repetição e melhora atendimento |
| Sinais de sucesso | Clique em contato, demo ou pergunta no AI Dock |

### Jornada 4 - Avaliador do Vigilante AI

| Campo | Descrição |
|---|---|
| Persona | Usuário residencial, avaliador técnico ou parceiro |
| Objetivo | Entender como o produto reduz ruído de alertas |
| Entrada | Product Gateway ou link direto |
| Passos | Abre Vigilante AI, lê problema, vê fluxo câmera-evento-IA-alerta, consulta exemplos de eventos |
| Pontos de decisão | Se a interface transmite controle sem medo; se classificação da IA é clara |
| Resultado esperado | Usuário entende que o produto prioriza precisão e calma |
| Sinais de sucesso | Exploração de demo, leitura de arquitetura, pergunta no AI Dock |

### Jornada 5 - Desenvolvedor ou QA

| Campo | Descrição |
|---|---|
| Persona | Desenvolvedor, QA ou automador |
| Objetivo | Entender stack, setup, arquitetura e decisões |
| Entrada | GitHub, docs ou página de projeto |
| Passos | Usa Command Palette, abre docs, lê setup, consulta decisões e code blocks |
| Pontos de decisão | Se docs são navegáveis e úteis; se não parecem README solto |
| Resultado esperado | Consegue entender como o projeto foi construído |
| Sinais de sucesso | Busca interna, navegação em docs, clique em repositório |

### Jornada 6 - Visitante Usando AI Dock

| Campo | Descrição |
|---|---|
| Persona | Recrutador, lead técnico, cliente ou visitante curioso |
| Objetivo | Fazer perguntas contextuais sobre produtos, tecnologias e decisões |
| Entrada | Botão flutuante, CTA do hero ou Command Palette |
| Passos | Abre AI Dock, escolhe sugestão, recebe resposta mockada com links internos |
| Pontos de decisão | Se a IA parece copiloto do portfólio e não chatbot genérico |
| Resultado esperado | Usuário encontra conteúdo relevante mais rápido |
| Sinais de sucesso | Clique em sugestão, abertura de link interno, permanência na plataforma |

### Jornada 7 - Visitante Mobile

| Campo | Descrição |
|---|---|
| Persona | Pessoa acessando pelo celular via LinkedIn ou WhatsApp |
| Objetivo | Entender proposta sem layout quebrado ou excesso de texto |
| Entrada | Link mobile |
| Passos | Abre home, vê hero compacto, product cards empilhados, timeline vertical e AI Dock flutuante |
| Pontos de decisão | Se a navegação é simples e os CTAs estão claros |
| Resultado esperado | Consegue explorar produtos e contato no celular |
| Sinais de sucesso | Scroll completo, clique em produto, CTA ou contato |

## 11. Arquitetura Conceitual da Plataforma

```text
Jun Fan Hub
  -> QA Command Center
    -> Home narrativa
    -> Projetos em destaque
    -> Timeline técnica
    -> Decisions
    -> Docs
  -> Product Modules
    -> WhatsApp AI Assistant
    -> Vigilante AI
    -> Robot/QA AI Framework futuro
  -> Documentation Layer
    -> Overview
    -> Arquitetura
    -> Setup
    -> Trade-offs
    -> Roadmap
  -> AI Layer
    -> AI Dock
    -> AI Insight
    -> Sugestões contextuais
  -> Horizon Design System
    -> Tokens
    -> Componentes
    -> Motion
    -> Microcopy
```

### Regras de Arquitetura de Informação

1. Home não é dashboard.
2. Dashboard vive dentro de produto ou módulo específico.
3. Cada produto deve ter uma página padronizada.
4. Cada projeto importante deve ter narrativa de problema, solução e impacto.
5. Cada decisão técnica relevante deve ter contexto, decisão, trade-off e impacto.
6. Documentação deve ser tratada como produto, não apêndice.

## 12. Product Language e Horizon Design System

### Princípios de Marca

1. Engenharia antes de decoração.
2. Clareza antes de impacto gratuito.
3. Movimento com função, nunca movimento apenas para impressionar.
4. Interface como sistema, não como tela isolada.
5. Futuro sem exagero visual.
6. IA como capacidade embutida, não como estética.
7. Portfólio como plataforma, não como currículo digital.
8. Produtos com identidade compartilhada.
9. Documentação como parte do produto.
10. Cada projeto deve revelar o raciocínio por trás da construção.

### DNA Visual

| Referência | Absorver | Evitar |
|---|---|---|
| Linear | Calma, navegação, hierarquia, motion discreto | Frieza impessoal |
| Raycast | Command Palette, velocidade, atalhos | Transformar tudo em launcher |
| Arc | Fluidez e surpresa controlada | Copiar padrões de browser sem necessidade |
| Stripe | Docs como produto | Visual financeiro ou branco demais |
| Vercel/Geist | Tipografia, minimalismo técnico | Minimalismo sem emoção |
| Apple HIG | Clareza e refinamento | Glassmorphism gratuito |
| Figma | Tokens e escalabilidade | Virar documentação de ferramenta |
| Framer | Motion e páginas de produto | Efeitos excessivos |
| Notion | Modularidade e docs vivos | Simplicidade excessiva |
| Nothing/Rivian | Futurismo industrial | Caricatura gadget |
| Datadog/Grafana | Dashboards internos | Home como painel operacional |

### Tokens Iniciais

```css
:root {
  --color-bg-base: #0B0F14;
  --color-bg-deep: #070A0F;
  --color-surface-default: #111821;
  --color-surface-elevated: #151D27;
  --color-surface-soft: #1B2430;
  --color-border-subtle: #263241;
  --color-border-strong: #3A4658;
  --color-text-primary: #F4F7FA;
  --color-text-secondary: #9AA6B8;
  --color-text-muted: #687385;
  --color-accent-qa: #4F8CFF;
  --color-accent-whatsapp: #2DD4BF;
  --color-accent-vigilante: #F97316;
  --color-accent-analytics: #A855F7;
  --color-accent-docs: #EAB308;
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --motion-fast: 160ms;
  --motion-normal: 280ms;
  --motion-slow: 420ms;
}
```

### Tipografia

1. Preferência: Geist Sans + Geist Mono.
2. Alternativa: Inter + Geist Mono ou JetBrains Mono.
3. Display: 56-72px, peso 600/700.
4. H1: 40-48px, peso 600.
5. H2: 30-36px, peso 600.
6. H3: 24-28px, peso 600.
7. Body: 15-16px.
8. Caption: 11-12px, uppercase moderado.
9. Métricas: números tabulares.

### Regras Visuais

1. Dark mode premium como padrão.
2. Fundo grafite profundo, não preto puro.
3. Uma cor de acento dominante por tela.
4. IA não deve definir a estética visual.
5. Cards devem ter hierarquia e respiro.
6. Ícones devem usar uma biblioteca consistente, preferencialmente Lucide.
7. Gradientes devem ser raros e funcionais.

## 13. Requisitos Funcionais

| ID | Requisito | Prioridade | Critérios de Aceite | Dependências |
|---|---|---|---|---|
| RF-001 | Home narrativa do QA Command Center | Must | Hero, status strip, Product Gateway, timeline, projetos, AI Dock e footer aparecem sem parecer dashboard | Horizon base |
| RF-002 | Product Gateway | Must | Exibe pelo menos 3 produtos com nome, status, descrição, stack, acento e CTA | Conteúdo de produtos |
| RF-003 | Página padrão de produto | Must | Cada produto tem cabeçalho, problema, solução, demo, arquitetura, decisões, métricas, roadmap e links | Componentes de produto |
| RF-004 | Página de detalhe de projeto | Must | Exibe problema, solução, stack, impacto, arquitetura, decisões e links | Conteúdo de projetos |
| RF-005 | Documentation Layer | Must | Existe área de docs com sidebar, breadcrumb, conteúdo legível, code blocks e links internos | MDX/Markdown |
| RF-006 | AI Dock inicial | Should | Abre por CTA ou botão, mostra sugestões, input e respostas mockadas com links internos | Conteúdo contextual |
| RF-007 | Command Palette | Should | Abre por botão/atalho, permite navegar para produtos, projetos, docs e contato | Rotas definidas |
| RF-008 | Timeline profissional/técnica | Must | Mostra evolução QA manual -> automação -> ERP -> web/API/performance -> IA -> Jun Fan | Conteúdo timeline |
| RF-009 | Featured Projects | Must | Cards exibem contexto, problema, solução, stack, resultado e CTA | Conteúdo de projetos |
| RF-010 | Engineering Decision Cards | Should | Cards exibem contexto, decisão, trade-off e impacto | Conteúdo decisions |
| RF-011 | Demo Frame | Should | Padroniza vídeos, screenshots ou previews com estado empty quando não houver demo real | Assets/demos |
| RF-012 | Architecture Flow | Should | Mostra fluxos em formato entrada -> processamento -> IA -> regra -> saída -> logs | Dados por produto |
| RF-013 | Responsividade mobile | Must | Home, product pages, docs e AI Dock funcionam até 640px | Layout responsivo |
| RF-014 | Estados de UI | Must | Componentes críticos têm loading, empty, error, disabled, hover e focus quando aplicável | Component library |
| RF-015 | Conteúdo estruturado | Must | Produtos, projetos, timeline e decisões não ficam hardcoded em JSX | JSON/YAML/MDX |
| RF-016 | Product Status Strip | Should | Exibe status discreto como online, beta, MVP, docs e last update | Conteúdo de status |
| RF-017 | Expertise Graph | Could | Exibe competências conectadas; pode começar como lista visual evolutiva | Dados de skills |
| RF-018 | Footer premium | Must | Exibe GitHub, LinkedIn, docs, contato e status | Links oficiais |
| RF-019 | Busca local simples | Could | Busca conteúdo básico de produtos/projetos/docs | Index local |
| RF-020 | Roadmap curto por produto | Should | Cada produto mostra próximos passos realistas | Conteúdo roadmap |

## 14. Requisitos Não Funcionais

| ID | Requisito | Prioridade | Critérios de Aceite |
|---|---|---|---|
| RNF-001 | Performance percebida | Must | Primeira renderização rápida, skeletons sutis e sem loading longo sem feedback |
| RNF-002 | Acessibilidade | Must | Contraste adequado, foco visível, labels e navegação por teclado nos fluxos principais |
| RNF-003 | Responsividade | Must | Layout funcional em mobile, tablet, desktop e wide |
| RNF-004 | Consistência visual | Must | Tokens e componentes Horizon usados em telas finais |
| RNF-005 | Manutenibilidade | Must | Conteúdo separado de componentes e organização clara de pastas |
| RNF-006 | Escalabilidade de conteúdo | Should | Novos produtos/projetos podem ser adicionados sem reescrever layouts |
| RNF-007 | SEO básico | Should | Títulos, descrições, heading hierarchy e metadados essenciais |
| RNF-008 | Segurança futura de IA | Must | Nenhuma chave ou segredo no cliente; IA real depende de backend seguro |
| RNF-009 | Observabilidade mínima | Could | Preparar pontos para analytics futuro sem acoplar no MVP |
| RNF-010 | Reduced motion | Must | Respeitar preferência do usuário por movimento reduzido |
| RNF-011 | Compatibilidade de teclado | Must | Command Palette, modais e AI Dock acessíveis por teclado |
| RNF-012 | Qualidade de microcopy | Should | Mensagens específicas, úteis e sem marketing vazio |

## 15. Conteúdo, Documentação e Dados

### Modelo de Conteúdo

O conteúdo deve ser estruturado para permitir evolução sem hardcode excessivo.

```text
/content
  products.json
  projects.json
  timeline.json
  decisions.json
  skills.json
  docs/
    overview.mdx
    architecture.mdx
    setup.mdx
```

### Estrutura de Produto

Cada produto deve conter:

1. `id`.
2. `name`.
3. `status`.
4. `shortDescription`.
5. `problem`.
6. `solution`.
7. `accentColor`.
8. `stack`.
9. `architectureFlow`.
10. `metrics`.
11. `roadmap`.
12. `links`.

### Estrutura de Projeto

Cada projeto deve conter:

1. Título.
2. Contexto.
3. Problema.
4. Solução.
5. Stack.
6. Impacto.
7. Status.
8. Decisões relacionadas.
9. Demo/screenshot quando existir.
10. Link para documentação ou repositório.

### Documentação como Produto

Cada documentação deve ter:

1. Overview.
2. Problema.
3. Objetivos.
4. Arquitetura.
5. Fluxos.
6. Stack.
7. Setup.
8. Variáveis de ambiente.
9. Como rodar.
10. Decisões técnicas.
11. Trade-offs.
12. Roadmap.
13. Screenshots.
14. Logs/demos.
15. FAQ.

## 16. AI Dock e Camada de IA

O AI Dock será uma assinatura do ecossistema. No MVP, ele pode ser mockado, mas deve parecer uma camada funcional de exploração contextual.

### Funções do AI Dock no MVP

1. Abrir por CTA no hero, botão flutuante ou Command Palette.
2. Exibir sugestões prontas.
3. Permitir digitação em input.
4. Retornar respostas mockadas ou estáticas com links internos.
5. Conhecer minimamente o contexto da página por mensagens específicas.
6. Evitar aparência de chatbot genérico.

### Perguntas Sugeridas

1. “Quais projetos usam Robot Framework?”
2. “Explique o Vigilante AI.”
3. “Compare WhatsApp AI e Vigilante AI.”
4. “Mostre decisões de arquitetura.”
5. “Quais tecnologias domino?”
6. “Quais projetos têm potencial comercial?”

### Regras para IA Real no Futuro

1. Chaves de API nunca devem ficar no cliente.
2. Respostas devem citar fontes internas.
3. Conteúdo privado não deve ser indexado sem revisão.
4. Logs e prompts devem ser tratados com cuidado.
5. A IA deve apoiar navegação e entendimento, não substituir a estrutura da interface.

## 17. Componentes e Padrões de UI

### Componentes Base

| Categoria | Componentes |
|---|---|
| Ações | Button, Icon Button, AI Action Button |
| Cards | Default Card, Product Card, Project Card, Metric Card, Status Card |
| Inputs | Text Input, Search Input, AI Prompt Input, Textarea, Select |
| Navegação | Sidebar, Topbar, Breadcrumb, Tabs, Command Palette, Product Switcher, Mobile Drawer |
| Feedback | Toast, Alert, Badge, Status Dot, Skeleton, Empty State, Error State, Confirmation Modal |
| Dados | Table, KPI Row, Chart Card, Timeline, Activity Feed, Log Viewer, Code Block, Decision Record |

### Componentes Exclusivos

| Componente | Função |
|---|---|
| Product Gateway Card | Entrada para módulos com status, stack, acento e CTA |
| AI Dock | Copiloto contextual da plataforma |
| AI Insight | Resumo, sugestão ou recomendação contextual |
| Engineering Decision Card | Explica contexto, decisão, trade-off e impacto |
| Mission Timeline | Apresenta evolução profissional/técnica |
| Expertise Graph | Mapa visual de competências conectadas |
| Product Status Strip | Linha discreta de status do ecossistema |
| Demo Frame | Moldura padronizada para vídeos, screenshots e previews |
| Architecture Flow | Visualização de fluxo técnico |
| Lab Note | Bloco editorial para aprendizados e hipóteses |

### Estados Obrigatórios

1. Default.
2. Hover.
3. Focus.
4. Active/current.
5. Loading.
6. Empty.
7. Error.
8. Disabled.

## 18. Responsividade e Acessibilidade

### Breakpoints

| Breakpoint | Faixa |
|---|---|
| Mobile | até 640px |
| Tablet | 641px a 1024px |
| Desktop | 1025px a 1440px |
| Wide | acima de 1440px |

### Regras Mobile

1. Hero com texto reduzido e CTAs claros.
2. Product cards em coluna.
3. Sidebar vira drawer ou navegação compacta.
4. AI Dock vira botão flutuante.
5. Tabelas viram cards.
6. Gráficos têm fallback simples.
7. Timeline vira vertical.

### Regras de Acessibilidade

1. Contraste suficiente em textos, botões e badges.
2. Estados de foco visíveis.
3. Inputs com labels ou aria-labels.
4. Status não dependem apenas de cor.
5. Ícones críticos têm texto ou aria-label.
6. Modais prendem foco e fecham com ESC.
7. Command Palette abre com foco no input.
8. Reduced motion respeitado.
9. Skeletons não piscam agressivamente.

## 19. Motion Language

### Princípios

1. Toda animação deve comunicar relação espacial, mudança de estado ou progresso.
2. Nada deve girar, explodir, piscar ou competir com o conteúdo.
3. Motion deve ser rápido, elegante e previsível.
4. A experiência deve parecer viva, não barulhenta.

### Durações

| Tipo | Duração |
|---|---|
| Microinteração | 120-180ms |
| Hover | 120-160ms |
| Entrada de card | 220-320ms |
| Transição de página | 280-420ms |
| Contador numérico | 700-1200ms |

### Padrões

1. Cards entram com `translateY(8px -> 0)` e `opacity 0 -> 1`.
2. Hover de card usa `translateY(-4px)`, borda mais visível e sombra leve.
3. Command Palette abre com escala `0.98 -> 1` e blur leve no fundo.
4. AI Insight surge como painel, não popup agressivo.
5. Sidebar active indicator desliza.

## 20. Stack Técnica Recomendada

### Stack Preferencial

1. Next.js ou React + Vite.
2. TypeScript.
3. Tailwind CSS com tokens.
4. Framer Motion para animações.
5. Lucide React para ícones.
6. MDX para documentação.
7. JSON/YAML para dados estruturados.

### Decisão Inicial Recomendada

Para o MVP, Next.js é recomendado se a documentação, rotas de produto e SEO forem prioridade. React + Vite é suficiente se o foco for prototipagem rápida sem necessidade inicial de SSR/SSG. A decisão final deve considerar o estado atual do repositório.

### Estrutura Recomendada

```text
/src
  /app ou /pages
  /components
    /ui
    /layout
    /product
    /ai
    /data
  /design-system
    tokens.ts
    theme.css
    motion.ts
  /content
    products.json
    projects.json
    timeline.json
    decisions.json
  /lib
  /hooks
  /styles
```

### Separação Crítica

1. Componentes de UI não devem conhecer regra de negócio.
2. Produtos devem usar componentes compartilhados.
3. Tokens não devem ficar espalhados.
4. Conteúdo não deve ficar hardcoded em JSX.
5. Novos componentes devem justificar por que não usam componentes existentes.

## 21. Métricas e Critérios de Sucesso

### Critérios Qualitativos

1. Visitante entende em menos de 10 segundos que está vendo uma plataforma de produtos.
2. Os três produtos principais parecem pertencer à mesma família.
3. A estética parece futurista sem parecer IA genérica.
4. A home preserva narrativa e não vira dashboard.
5. Cada produto tem página clara com problema, solução, arquitetura e demo.
6. A documentação parece parte da plataforma.
7. A IA é útil para explorar conteúdo.
8. O Design System reduz retrabalho.
9. Novas telas podem ser criadas seguindo padrões existentes.
10. O resultado transmite senioridade, arquitetura e visão de produto.

### Métricas de Produto Futuras

1. Taxa de clique em Product Gateway.
2. Cliques em contato, GitHub e LinkedIn.
3. Uso de Command Palette.
4. Uso do AI Dock.
5. Profundidade de navegação em docs.
6. Tempo médio em páginas de produto.
7. Número de projetos explorados por sessão.
8. Scroll depth da home.

## 22. Backlog Inicial

### Épico 1 - Foundation/Horizon v0.1

História: Como mantenedor, quero tokens e componentes base para criar telas consistentes.

Critérios de aceite:

1. Tokens de cor, espaçamento, raio, tipografia e motion definidos.
2. Componentes Button, Card, Badge, Input e Skeleton criados.
3. Estados hover, focus, loading e disabled implementados nos componentes críticos.

### Épico 2 - Home/Command Center Hub

História: Como visitante, quero entender a Jun Fan em poucos segundos para decidir o que explorar.

Critérios de aceite:

1. Hero com marca, posicionamento e CTAs.
2. Product Status Strip visível e discreto.
3. Seções principais renderizadas com boa hierarquia.

### Épico 3 - Product Gateway

História: Como visitante, quero ver os produtos disponíveis para navegar pelo ecossistema.

Critérios de aceite:

1. Cards de QA Command Center, WhatsApp AI e Vigilante AI aparecem.
2. Cada card tem status, descrição, stack e CTA.
3. Cada card usa apenas seu acento visual de forma controlada.

### Épico 4 - Product Pages

História: Como avaliador, quero abrir cada produto e entender problema, solução e arquitetura.

Critérios de aceite:

1. Página padrão renderiza dados de cada produto.
2. Architecture Flow aparece quando houver dados.
3. Demo Frame mostra preview ou estado empty útil.

### Épico 5 - Documentation Layer

História: Como desenvolvedor, quero acessar documentação clara e integrada à plataforma.

Critérios de aceite:

1. Docs têm sidebar, breadcrumb e conteúdo legível.
2. Code blocks e callouts seguem o visual Horizon.
3. Links internos conectam docs, projetos e decisões.

### Épico 6 - AI Dock

História: Como visitante, quero perguntar sobre projetos e produtos para encontrar informação rapidamente.

Critérios de aceite:

1. AI Dock abre por CTA ou botão flutuante.
2. Sugestões prontas são exibidas.
3. Respostas mockadas apontam para links internos.

### Épico 7 - Content System

História: Como mantenedor, quero adicionar conteúdo sem editar componentes visuais.

Critérios de aceite:

1. Produtos, projetos, timeline e decisões usam arquivos estruturados.
2. Componentes recebem dados por props.
3. Novo produto pode ser adicionado com alteração mínima.

### Épico 8 - Responsiveness and Accessibility

História: Como visitante mobile ou usuário de teclado, quero navegar sem barreiras.

Critérios de aceite:

1. Home e páginas principais funcionam em mobile.
2. Foco visível em elementos interativos.
3. Command Palette, AI Dock e modais funcionam com teclado.

### Épico 9 - Motion and Interaction

História: Como usuário, quero uma interface fluida que ajude a entender mudanças de estado.

Critérios de aceite:

1. Motion usa durações e easing definidos.
2. Reduced motion é respeitado.
3. Não há animações decorativas exageradas.

### Épico 10 - QA/Validation

História: Como mantenedor, quero validar que a experiência atende ao manifesto.

Critérios de aceite:

1. Checklist de identidade, UX, componentes, motion, conteúdo e técnico preenchido.
2. Teste manual em mobile e desktop realizado.
3. Nenhum estado crítico sem fallback.

## 23. Roadmap por Fases

### Fase 0 - Alinhamento e Preparação

Objetivo: consolidar documentação e decisões iniciais.

Entregas:

1. Handbook salvo.
2. Prompt refinado salvo.
3. PRD salvo.
4. Decisão inicial de stack registrada.
5. Inventário de conteúdo existente.

### Fase 1 - Sprint 1: Foundation Horizon ✅

Duração sugerida: 1 semana. (Concluída)

Entregas:

- [x] Tokens CSS/TS.
- [x] Tema dark base.
- [x] Button, Card, Badge, Input, Skeleton.
- [x] Layout shell inicial.
- [x] Estrutura de conteúdo.

### Fase 2 - Sprint 2: Home e Product Gateway

Duração sugerida: 1 semana.

Entregas:

- [x] Hero.
- [x] Product Status Strip.
- [x] Product Gateway.
- [x] Timeline inicial.
- [x] Featured Projects.
- [x] Footer.

### Fase 3 - Sprint 3: Product Pages e Project Detail

Duração sugerida: 1-2 semanas.

Entregas:

- [x] Template de produto.
- [x] QA Command Center page.
- [x] WhatsApp AI page.
- [x] Vigilante AI page.
- [x] Project detail page.
- [x] Architecture Flow e Demo Frame.

### Fase 4 - Sprint 4: Docs, Decisions e AI Dock

Duração sugerida: 1-2 semanas.

Entregas:

- [x] Documentation Layer inicial.
- [x] Engineering Decision Cards.
- [x] Command Palette.
- [x] AI Dock mockado.
- [x] AI Insight cards.

### Fase 5 - Sprint 5: Polimento, Responsividade e Validação

Duração sugerida: 1 semana.

Entregas:

- [x] Ajustes mobile.
- [x] Acessibilidade básica.
- [x] Reduced motion.
- [x] Revisão de microcopy.
- [x] Checklist final do MVP.
- [x] Preparação para deploy.

### Fase 6 - Pós-MVP

Entregas concluídas:

- [x] IA real com backend seguro (endpoint /api/ai-ask/ com CSRF via @csrf_exempt, respostas mockadas server-side).
- [x] Busca semântica (view search com filtro JSON, endpoint /api/search/, página /busca/).
- [x] Dashboards internos mockados/funcionais por produto (/produto/<slug>/dashboard/).
- [x] Demos interativas (/produto/<slug>/demo/ com simulação client-side e log de atividades).
- [x] Analytics (tracking session-based com página /analytics/).
- [x] Hub separado da home do QA Command Center (/hub/).
- [x] Robot/QA AI Framework (/framework/ com grid de conceitos, fluxo e roadmap).

## 24. Riscos e Mitigação

| Risco | Impacto | Probabilidade | Mitigação |
|---|---|---|---|
| Excesso de ambição | Alto | Alta | MVP com escopo fechado e fases claras |
| Visual bonito, mas genérico | Alto | Média | Usar narrativa pessoal, decisões técnicas e produto real |
| Cópia excessiva de referências | Médio | Média | Usar benchmarks como princípios, não moldes |
| Home virar dashboard | Alto | Alta | Dashboards apenas dentro de módulos |
| IA dominar identidade visual | Médio | Média | IA como camada funcional, não estética |
| Design System engessar cedo | Médio | Média | Manter Horizon v0.1 evolutivo |
| Conteúdo hardcoded demais | Alto | Média | JSON/YAML/MDX desde o MVP |
| Mobile ficar secundário | Médio | Média | Testar mobile em toda sprint |
| Motion virar ruído | Médio | Média | Seguir motion language e reduced motion |
| Falta de dados reais para demos | Médio | Alta | Usar demos mockadas claramente identificadas |

## 25. Decisões Pendentes

| Decisão | Opções | Recomendação Inicial | Momento de Decidir |
|---|---|---|---|
| Nome final do Design System | Horizon, Nova, Pulse, Atlas, Forward, Orbit | Manter Horizon v0.1 | Após primeira tela real |
| Fonte oficial | Geist, Inter | Geist Sans + Geist Mono | Sprint 1 |
| Framework | Next.js, React + Vite | Depende do repo; Next.js se docs/SEO forem prioridade | Antes da implementação |
| Forma do AI Dock | Botão flutuante, painel lateral, command modal | Botão flutuante + painel/modal | Sprint 4 |
| Primeiro produto redesenhado | QA, WhatsApp, Vigilante | QA Command Center | Sprint 2 |
| Nível de animação | Mínimo, moderado, expressivo | Moderado e funcional | Sprint 1/2 |
| Hub separado | Separado, dentro do QA | Dentro do QA no MVP | Pós-MVP [IMPLEMENTADO] |
| IA no MVP | Real, mockada, preparada | Mockada/preparada | Sprint 4 [IMPLEMENTADO via /api/ai-ask/] |

## 26. Checklist de Aceite do MVP

### Identidade

[x] Parece Jun Fan, não template genérico.
[x] Evita estética IA clichê.
[x] Tem sensação de futuro sem exagero.
[x] Usa apenas uma cor dominante por tela.
[x] Produtos parecem da mesma família.

### UX

[x] A proposta é clara em menos de 10 segundos.
[x] A ação principal está clara.
[x] A hierarquia visual está boa.
[x] A home não parece dashboard.
[x] O usuário entende onde clicar e para onde ir.

### Componentes

[x] Usa tokens.
[x] Usa componentes existentes.
[x] Componentes críticos têm estados necessários.
[x] Ícones estão consistentes.
[x] Tipografia segue escala definida.

### Motion

[x] Animações têm propósito.
[x] Durações estão adequadas.
[x] Não há neon, partículas ou efeitos exagerados.
[x] Reduced motion funciona.

### Conteúdo

[x] Textos são diretos.
[x] Páginas mostram problema, solução, impacto e arquitetura.
[x] Não há marketing vazio.
[x] Decisões técnicas têm contexto, trade-off e impacto.

### Técnico

[x] Layout responsivo.
[x] Navegação por teclado nos fluxos principais.
[x] Sem hardcode desnecessário de produtos/projetos.
[x] Documentação inicial existe.
[x] Nenhum segredo ou chave exposta.

## 27. Apêndice: Referências e Benchmark

| Referência | Sensação | Absorver | Evitar | Relevância |
|---|---|---|---|---|
| Linear | Calma, precisão, engenharia moderna | Navegação, motion discreto, hierarquia | Frieza impessoal | Alta |
| Raycast | Velocidade e comando | Command Palette, atalhos, produtividade | Virar launcher | Alta |
| Arc | Personalidade e fluidez | Surpresa controlada, transições | Copiar browser | Média/Alta |
| Stripe | Confiança e docs impecáveis | Docs como produto, exemplos | Visual financeiro | Alta |
| Vercel/Geist | Minimalismo técnico | Tipografia, grid, contraste | Minimalismo sem identidade | Alta |
| Apple HIG | Clareza e refinamento | Foco no conteúdo, profundidade | Efeitos de plataforma sem propósito | Alta |
| Microsoft Fluent 2 | Sistema maduro e acessível | Acessibilidade e consistência | Corporativo demais | Média |
| Figma | Sistema e colaboração | Tokens, variáveis, biblioteca | Virar documentação de ferramenta | Alta |
| Framer | Motion e landing | Microinterações, páginas de produto | Cara de template | Alta |
| Notion | Organização modular | Blocos e docs vivos | Simples demais | Média |
| Nothing | Futurismo industrial | Contraste, hardware feel | Caricatura gadget | Média/Alta |
| Rivian | Tecnologia premium calma | Controle, telemetria, sobriedade | Visual automotivo literal | Média |
| Teenage Engineering | Industrial e memorável | Grid, simplicidade radical | Experimental demais | Média |
| Datadog | Observabilidade | Métricas e alertas internos | Home operacional | Média |
| Grafana | Visualização técnica | Painéis e filtros | Dashboard genérico | Média |
| Supabase | Developer experience | Sidebar, docs, organização | Ferramenta backend demais | Média/Alta |
| Retool | Ferramentas internas | Tabelas e workflows | Admin sem identidade | Média |
| Cursor | IA no fluxo | IA contextual | Copiar IDE | Média |
| Perplexity | Busca e fontes | Respostas com referências | Virar buscador | Média |
| ChatGPT/Claude | Conversa assistida | Histórico e sugestões | Chat genérico | Baixa/Média |
| Lovable | Criação rápida com IA | Iteração e preview | Builder genérico | Média |

### Referências Base

1. Linear: https://linear.app/now/behind-the-latest-design-refresh
2. Raycast: https://www.raycast.com/
3. Arc: https://arc.net/
4. Stripe Docs: https://docs.stripe.com/
5. Markdoc: https://stripe.dev/blog/markdoc
6. Apple HIG: https://developer.apple.com/design/human-interface-guidelines
7. Microsoft Fluent 2: https://fluent2.microsoft.design/
8. Vercel Geist: https://vercel.com/geist/introduction
9. Vercel Design: https://vercel.com/design
10. Vercel Font: https://vercel.com/font
11. Figma Design Systems: https://www.figma.com/design-systems/
12. Framer: https://www.framer.com/
13. Framer AI: https://www.framer.com/ai/
14. Notion Brand Guidelines: https://www.notion.com/templates/category/brand-guidelines
15. Design Systems Motion: https://www.designsystems.com/5-steps-for-including-motion-design-in-your-system/
16. Uber Base Motion: https://base.uber.com/6d2425e9f/v/0/p/116184-motion

## 28. Manifesto Project Jun Fan

Project Jun Fan é a filosofia de construção do ecossistema. Ele existe para orientar como produtos, interfaces, documentos e sistemas devem nascer: não por impulso, não por cópia e não por acúmulo de funcionalidades, mas por absorção crítica, refinamento consciente e construção objetiva.

O princípio central é:

> Absorb. Refine. Build.

### 28.1 Filosofia

Absorver significa estudar boas referências sem copiar suas superfícies. O objetivo é entender princípios: por que uma navegação funciona, por que uma documentação parece confiável, por que uma interface transmite calma, por que um produto parece maduro.

Refinar significa descartar excesso. Nem toda boa prática é necessária. Nem todo padrão sofisticado melhora o produto. Nem toda tecnologia moderna serve ao momento atual. O refinamento transforma referências em linguagem própria.

Construir significa materializar uma solução simples, clara e reutilizável. O produto final deve parecer inevitável: cada seção, componente, animação e conteúdo deve ter motivo para existir.

### 28.2 Propósito

Project Jun Fan existe para evitar que a Jun Fan vire uma coleção de telas bonitas, demos isoladas ou ideias desconectadas. Ele cria uma disciplina de construção para que cada produto nasça dentro de um ecossistema coerente.

Esse propósito se traduz em cinco prioridades:

1. Construir uma fundação visual e técnica reaproveitável.
2. Criar narrativa de produto antes de ornamentação.
3. Reduzir decisões improvisadas em novas telas.
4. Evitar dependências e arquiteturas sem necessidade concreta.
5. Preservar uma identidade própria, mesmo absorvendo referências fortes.

### 28.3 Forma de Trabalho

Toda nova iniciativa deve passar por este fluxo:

1. Entender o problema que a tela, componente ou seção resolve.
2. Verificar se já existe componente, padrão ou token no Horizon Design System.
3. Reutilizar antes de criar.
4. Criar apenas quando houver diferença real de propósito ou comportamento.
5. Documentar a decisão quando ela afetar padrões futuros.
6. Validar responsividade, acessibilidade, narrativa e consistência visual.

### 28.4 Princípios

1. Simplicidade antes de sofisticação.
2. Reutilização antes de criação.
3. Clareza antes de impacto visual.
4. Narrativa antes de métrica.
5. Produto antes de template.
6. Tokens antes de valores soltos.
7. Documentação antes de memória informal.
8. Motion funcional antes de animação decorativa.
9. Evolução gradual antes de arquitetura prematura.
10. Identidade própria antes de cópia de referência.

## 29. Project Constraints

Esta seção define restrições mandatórias para qualquer pessoa ou IA que trabalhe no Project Jun Fan.

### 29.1 Natureza do Projeto

1. Project Jun Fan não é um produto final.
2. Project Jun Fan não é SaaS.
3. Project Jun Fan não é ERP.
4. Project Jun Fan não é sistema comercial.
5. Project Jun Fan não é framework.
6. Project Jun Fan não é backend.
7. Project Jun Fan é a filosofia e fundação de construção do ecossistema de produtos.

### 29.2 Escopo Técnico Preferencial

O projeto é predominantemente front-end e documentação. A arquitetura deve priorizar:

1. React.
2. Next.js.
3. TypeScript.
4. Tailwind CSS.
5. Framer Motion.
6. MDX.
7. JSON.
8. YAML.
9. Lucide.
10. Horizon Design System.
11. Documentação.
12. Narrativa.
13. Experiência do usuário.

### 29.3 Restrições de Complexidade

É proibido adicionar infraestrutura ou arquitetura sem necessidade concreta validada.

Não incluir no MVP:

1. RabbitMQ.
2. Celery.
3. Kafka.
4. Redis.
5. Mensageria.
6. Microserviços.
7. Kubernetes.
8. Docker Swarm.
9. Event Bus.
10. CQRS.
11. Event Sourcing.
12. Autenticação.
13. Multi Tenant.
14. Billing.
15. APIs complexas.
16. Backend complexo.
17. Banco de dados sem necessidade.

Se algum desses itens se tornar necessário em outro produto real, ele deve ser movido para evolução futura e justificado em ADR. A justificativa deve explicar problema real, alternativa mais simples considerada e custo de manutenção.

### 29.4 Restrições de Produto

1. Não transformar a home em dashboard operacional.
2. Não transformar o QA Command Center em sistema administrativo.
3. Não transformar AI Dock em chatbot genérico.
4. Não criar fluxos comerciais reais quando a intenção for demonstração/narrativa.
5. Não implementar integrações reais antes de validar a experiência e a documentação.
6. Não otimizar para escala inexistente.
7. Não criar área autenticada sem necessidade clara.

### 29.5 Justificativa

Essas restrições existem para preservar foco. O risco principal do projeto não é falta de capacidade técnica; é excesso de ambição antes de consolidar linguagem, narrativa e reutilização. A fundação deve nascer leve para evoluir com segurança.

## 30. AI Implementation Rules

Qualquer IA usada durante o desenvolvimento deve seguir estas regras. Elas são mandatórias e devem ser consideradas parte do contexto fixo do projeto.

### 30.1 Regras Gerais

1. A IA deve ler o PRD v0.2 antes de sugerir ou implementar mudanças.
2. A IA deve preservar o Jun Fan Product Language.
3. A IA deve seguir o Horizon Design System.
4. A IA deve reutilizar componentes existentes antes de criar novos.
5. A IA deve evitar duplicações de componente, estilo, dados e lógica.
6. A IA deve justificar qualquer novo componente, token, pasta ou dependência.
7. A IA nunca deve inventar infraestrutura.
8. A IA nunca deve adicionar backend complexo por padrão.
9. A IA nunca deve transformar o projeto em SaaS, ERP ou sistema comercial.
10. A IA deve preferir a solução menor que resolva corretamente o problema.

### 30.2 Antes de Implementar

Antes de escrever código, a IA deve responder implicitamente:

1. Qual problema esta mudança resolve?
2. Já existe componente ou padrão que atende?
3. O conteúdo pode vir de JSON, YAML ou MDX?
4. A alteração respeita o Horizon?
5. A alteração melhora narrativa ou apenas adiciona superfície?
6. Existe risco de duplicação?
7. Existe forma mais simples?

### 30.3 Durante a Implementação

1. Usar TypeScript quando o projeto estiver em React/Next.
2. Usar tokens em vez de valores soltos.
3. Manter componentes pequenos, nomeados e reaproveitáveis.
4. Separar dados de apresentação.
5. Evitar `useMemo` e `useCallback` por padrão, salvo necessidade concreta ou padrão do projeto.
6. Usar Framer Motion apenas quando motion comunicar estado, hierarquia ou transição.
7. Usar Lucide como biblioteca principal de ícones.
8. Preservar acessibilidade mínima.
9. Garantir responsividade desde a primeira versão.
10. Atualizar documentação quando a mudança altera comportamento, estrutura ou padrão.

### 30.4 Depois de Implementar

1. Verificar se a tela ainda parece Jun Fan.
2. Verificar se há duplicação de código ou componente.
3. Verificar se a mudança respeita o escopo front-end.
4. Verificar se o componente poderia ser mais simples.
5. Verificar se estados de UI relevantes existem.
6. Verificar se a documentação necessária foi atualizada.

## 31. Definition of Done

Uma sprint, tarefa ou entrega só pode ser considerada concluída quando atender a este checklist.

### 31.1 Produto e Narrativa

[ ] A entrega resolve um problema claro.
[ ] A entrega possui narrativa compreensível para o usuário.
[ ] A tela ou componente deixa claro o próximo passo.
[ ] A solução não transforma a home em dashboard.
[ ] A solução não adiciona funcionalidade sem propósito.

### 31.2 Design System

[ ] A entrega segue o Horizon Design System.
[ ] Tokens foram usados em vez de valores soltos.
[ ] Componentes existentes foram reutilizados quando possível.
[ ] Novos componentes têm justificativa clara.
[ ] Estados default, hover, focus, loading, empty, error e disabled foram considerados quando aplicável.
[ ] Ícones seguem Lucide ou a biblioteca padrão definida.

### 31.3 Código

[ ] Código compila sem erro.
[ ] TypeScript está correto.
[ ] Não há warnings relevantes no build/lint.
[ ] Não há duplicação desnecessária.
[ ] Não há componente gigante sem motivo.
[ ] Dados de produtos/projetos/timeline/decisões não foram hardcoded sem justificativa.
[ ] A estrutura de pastas existente foi respeitada.

### 31.4 UX, Acessibilidade e Responsividade

[ ] Responsividade validada em mobile, tablet e desktop.
[ ] Contraste mínimo validado visualmente.
[ ] Foco de teclado visível em elementos interativos.
[ ] Labels ou aria-labels existem quando necessários.
[ ] Reduced motion foi respeitado quando aplicável.
[ ] Motion não compete com o conteúdo.

### 31.5 Documentação

[ ] Documentação atualizada quando houve novo padrão, componente ou decisão.
[ ] Conteúdo em MDX/JSON/YAML atualizado quando necessário.
[ ] ADR criado quando houve decisão arquitetural relevante.
[ ] Checklist de aceite do MVP continua válido.

### 31.6 Escopo

[ ] Nenhuma infraestrutura proibida foi adicionada.
[ ] Nenhuma autenticação, billing, multi-tenant ou backend complexo foi introduzido.
[ ] Nenhuma dependência nova foi adicionada sem justificativa.
[ ] A solução segue simplicidade antes de sofisticação.

## 32. Anti Patterns

Esta seção lista padrões explicitamente proibidos ou fortemente desencorajados.

### 32.1 Produto

1. Criar página sem narrativa de problema, solução ou propósito.
2. Transformar produto em coleção de cards sem hierarquia.
3. Priorizar gráficos e métricas antes de contexto.
4. Tratar documentação como apêndice.
5. Criar AI Dock como chatbot genérico.
6. Usar linguagem de marketing vazia.

### 32.2 Design

1. Usar neon, partículas ou gradientes animados sem função.
2. Misturar bibliotecas de ícones sem necessidade.
3. Usar mais de uma cor dominante por tela.
4. Criar variações visuais sem token.
5. Criar animação diferente para cada componente.
6. Copiar visualmente referências como Linear, Raycast, Arc ou Stripe.

### 32.3 Código

1. Componentes gigantes que misturam layout, dados, regra e estilo.
2. Código duplicado por pressa.
3. Hardcode de conteúdo que deveria estar em JSON, YAML ou MDX.
4. Abstrações sem segundo uso real.
5. Helpers genéricos sem necessidade concreta.
6. Dependências novas para resolver problemas simples.
7. Pastas criadas por modismo e não por responsabilidade.
8. Estados de UI ignorados.

### 32.4 Arquitetura

1. Adicionar backend antes de validar necessidade.
2. Adicionar banco de dados para conteúdo estático simples.
3. Adicionar autenticação sem fluxo real.
4. Adicionar filas, workers ou mensageria no MVP.
5. Criar API complexa para dados que podem ser arquivos estáticos.
6. Criar arquitetura distribuída para produto predominantemente front-end.

## 33. Folder Philosophy

A estrutura de pastas deve comunicar intenção. Pastas não existem para parecer arquitetura madura; elas existem para reduzir acoplamento, facilitar localização e tornar evolução previsível.

### 33.1 Estrutura Recomendada e Justificativa

```text
/src
  /app ou /pages
  /components
    /ui
    /layout
    /product
    /ai
    /data
  /design-system
    tokens.ts
    theme.css
    motion.ts
  /content
    products.json
    projects.json
    timeline.json
    decisions.json
  /lib
  /hooks
  /styles
```

### 33.2 Filosofia por Pasta

| Pasta | Por que existe | O que não deve conter |
|---|---|---|
| `/src/app` ou `/src/pages` | Define rotas e composição de páginas | Regras complexas, dados hardcoded extensos ou componentes genéricos |
| `/components/ui` | Componentes primitivos reutilizáveis do Horizon | Conteúdo específico de produto |
| `/components/layout` | Estruturas de navegação, shell, sidebar, topbar e containers | Regras de negócio ou conteúdo editorial |
| `/components/product` | Componentes que representam produtos, projetos, gateways e páginas de produto | Estilos soltos fora dos tokens |
| `/components/ai` | AI Dock, AI Insight e padrões de exploração assistida | Integrações reais complexas no MVP |
| `/components/data` | Tabelas, timelines, cards de métrica e visualização de dados | Busca remota ou persistência sem necessidade |
| `/design-system` | Tokens, tema, motion e regras base do Horizon | Componentes de produto específicos |
| `/content` | Fonte estruturada de produtos, projetos, timeline e decisões | Código de renderização ou lógica visual |
| `/lib` | Funções utilitárias pequenas e reutilizáveis | Helpers genéricos sem uso real |
| `/hooks` | Hooks reutilizáveis com responsabilidade clara | Estado global prematuro |
| `/styles` | Estilos globais mínimos e imports do tema | Estilos específicos que pertencem a componentes |

### 33.3 Regra de Criação de Pasta

Criar uma nova pasta apenas quando houver responsabilidade clara, recorrente e diferente das pastas existentes. Se a pasta conter apenas um arquivo sem perspectiva concreta de expansão, preferir manter o arquivo próximo do local de uso.

## 34. Evolution Rules

Esta seção define como o projeto deve evoluir sem perder simplicidade.

### 34.1 Quando Reutilizar

Reutilizar componente existente quando:

1. A estrutura visual é semelhante.
2. A diferença é apenas texto, ícone, cor de acento ou estado.
3. O comportamento principal é igual.
4. A variação pode ser resolvida por props simples.
5. O componente existente continua legível após a adaptação.

### 34.2 Quando Criar Novo Componente

Criar novo componente apenas quando:

1. Há novo propósito semântico.
2. O comportamento é substancialmente diferente.
3. Reutilizar o componente existente criaria props excessivas ou condicionais confusos.
4. O componente será usado em mais de uma tela ou representa padrão claro do produto.
5. A criação reduz complexidade geral em vez de aumentá-la.

### 34.3 Quando Atualizar o Horizon Design System

Atualizar Horizon quando:

1. Um padrão visual aparece em pelo menos duas telas.
2. Um novo token é necessário para evitar valores soltos repetidos.
3. Um componente base precisa de estado ausente.
4. Um padrão de motion se repete.
5. Uma decisão melhora consistência entre produtos.

Não atualizar Horizon quando:

1. A necessidade é pontual.
2. A variação ainda não foi validada em tela real.
3. A mudança adiciona abstração antes de existir repetição.
4. A alteração quebra identidade visual sem ganho claro.

### 34.4 Quando Adicionar Dependência

Adicionar dependência apenas quando:

1. O problema é real e recorrente.
2. Implementar internamente seria mais arriscado ou caro.
3. A dependência é mantida, conhecida e compatível com a stack.
4. O impacto no bundle e manutenção foi considerado.
5. A decisão foi documentada quando relevante.

### 34.5 Quando Mover Algo para Futuro

Mover para evolução futura quando:

1. Depende de backend real.
2. Depende de autenticação.
3. Depende de dados sensíveis.
4. Depende de integrações externas.
5. Aumenta complexidade sem validar a experiência.
6. É útil, mas não necessário para provar o Product Language.

## 35. Architecture Decision Records

ADRs devem registrar decisões arquiteturais relevantes. Eles existem para preservar contexto e evitar que o projeto dependa de memória informal.

### 35.1 Quando Criar ADR

Criar ADR quando a decisão:

1. Afeta estrutura de pastas.
2. Introduz nova dependência.
3. Altera Horizon Design System.
4. Define padrão de dados ou documentação.
5. Move recurso para pós-MVP.
6. Rejeita arquitetura mais complexa.
7. Afeta múltiplos produtos do ecossistema.

### 35.2 Formato Recomendado

```md
# ADR-000 - Título da decisão

## Status
Proposto | Aceito | Substituído | Rejeitado

## Contexto
Qual problema ou trade-off levou à decisão.

## Decisão
O que será feito.

## Alternativas Consideradas
Quais opções foram avaliadas.

## Consequências
O que melhora, o que piora e qual custo futuro.

## Data
AAAA-MM-DD
```

### 35.3 ADRs Iniciais Preparados

| ADR | Status | Tema |
|---|---|---|
| ADR-001 | A criar | Escolha entre Next.js e React + Vite |
| ADR-002 | A criar | Forma inicial do AI Dock |
| ADR-003 | A criar | Estrutura final de `/content` |
| ADR-004 | A criar | Critério para promover componentes ao Horizon |
| ADR-005 | A criar | Decisão de manter backend fora do MVP |

## 36. Philosophy Before Code

Antes de implementar qualquer tela, componente, conteúdo ou padrão, a equipe deve responder:

1. Por que isso existe?
2. Qual problema resolve?
3. Quem utiliza?
4. Como evolui?
5. Pode ser reutilizado?

Se uma implementação não consegue responder a essas perguntas, ela provavelmente ainda não deve ser implementada.

### 36.1 Aplicação Prática

| Pergunta | Uso prático |
|---|---|
| Por que isso existe? | Evita features decorativas |
| Qual problema resolve? | Mantém foco em valor real |
| Quem utiliza? | Evita telas sem público claro |
| Como evolui? | Evita becos sem saída técnicos |
| Pode ser reutilizado? | Reduz duplicação e fortalece Horizon |

### 36.2 Critério de Bloqueio

Uma tarefa deve ser pausada ou refinada se:

1. A motivação for apenas “ficaria legal”.
2. A solução exigir infraestrutura não prevista.
3. O componente duplicar outro existente.
4. A tela não tiver narrativa.
5. A mudança enfraquecer o Product Language.

## 37. AI Context

Esta seção deve ser fornecida como contexto para futuras IAs que atuarem no projeto.

### 37.1 Contexto Curto

Você está trabalhando no Project Jun Fan, a filosofia de construção do ecossistema. Este projeto não é SaaS, ERP, sistema comercial, framework ou backend. Ele é a fundação front-end, narrativa, documental e visual para um ecossistema de produtos. A prioridade é construir uma plataforma de produtos com identidade própria, baseada no Jun Fan Product Language e no Horizon Design System.

### 37.2 O que Este Projeto É

1. Uma plataforma de produtos.
2. Um hub narrativo para QA Command Center, WhatsApp AI, Vigilante AI e futuros produtos.
3. Uma base visual e técnica para o ecossistema Jun Fan.
4. Um sistema de documentação viva.
5. Um ambiente front-end orientado por conteúdo estruturado.
6. Uma implementação prática do princípio Absorb. Refine. Build.

### 37.3 O que Este Projeto Não É

1. Não é SaaS.
2. Não é ERP.
3. Não é sistema comercial.
4. Não é backend.
5. Não é framework.
6. Não é dashboard operacional.
7. Não é área administrativa.
8. Não é produto com autenticação, billing ou multi-tenant.

### 37.4 Regras para IA em Modo Implementação

1. Não adicionar infraestrutura proibida.
2. Não criar backend sem solicitação explícita e ADR.
3. Não criar banco de dados para conteúdo que cabe em JSON, YAML ou MDX.
4. Não criar autenticação.
5. Não criar billing.
6. Não criar multi-tenant.
7. Não criar dashboard operacional na home.
8. Reutilizar componentes Horizon.
9. Manter narrativa de produto em todas as páginas.
10. Documentar decisões relevantes.

### 37.5 Prompt Base para Futuras IAs

```text
Você está trabalhando no Project Jun Fan.
Project Jun Fan não é SaaS, ERP, backend, framework ou sistema comercial.
É uma filosofia e fundação front-end para construir um ecossistema de produtos.
Siga o princípio Absorb. Refine. Build.
Preserve o Jun Fan Product Language e o Horizon Design System.
Reutilize componentes antes de criar novos.
Não invente infraestrutura.
Não adicione autenticação, multi-tenant, billing, filas, mensageria, microserviços ou banco sem decisão explícita registrada em ADR.
Use React/Next.js, TypeScript, Tailwind, Framer Motion, MDX, JSON/YAML e Lucide conforme o PRD v0.2.
Toda tela deve ter narrativa, responsividade, acessibilidade mínima, estados de UI e consistência visual.
```

## 38. Revisão Arquitetural v0.2

Esta revisão preserva a estrutura original do PRD e adiciona restrições para proteger o projeto contra overengineering.

### 38.1 Redundâncias Consolidadas Conceitualmente

1. AI Dock permanece como recurso de exploração contextual, não como backend de IA real no MVP.
2. Dashboards continuam restritos a módulos internos e demos, não à home.
3. Documentação permanece parte do produto, não seção auxiliar.
4. Horizon permanece evolutivo, não sistema fechado prematuramente.

### 38.2 Simplificações Arquiteturais

1. Conteúdo estruturado em JSON/YAML/MDX é preferível a banco de dados no MVP.
2. AI Dock mockado é preferível a IA real antes de validar narrativa e UX.
3. Componentes locais são preferíveis a biblioteca publicada no MVP.
4. Next.js é preferível quando rotas, docs e SEO forem prioridade; React + Vite continua aceitável para prototipagem rápida.
5. Nenhuma infraestrutura server-side deve ser adicionada sem problema real e ADR.

### 38.3 Fonte Oficial

O PRD v0.2 passa a ser a fonte oficial para as próximas sprints do Project Jun Fan. Em caso de conflito entre ideias novas e este documento, prevalece a opção mais simples, reutilizável e aderente ao Product Language.
