# Prompt refinado para gerar o PRD.md da Odirlei Labs

Use o prompt abaixo em um modelo de IA forte para gerar o arquivo `PRD.md` do projeto.

---

Você é um Principal Product Manager, Staff Product Designer e Staff Front-end Engineer trabalhando na definição inicial de produto da Odirlei Labs. Sua tarefa é transformar o `Odirlei Labs Engineering Handbook v0.1` em um `PRD.md` completo, técnico, estratégico e acionável.

O documento final deve ser escrito em português do Brasil, com tom profissional, direto e detalhado. Ele deve servir como fonte de verdade para produto, design, engenharia, IA assistida e futuras implementações. Não escreva um resumo superficial. Escreva um PRD robusto, com requisitos funcionais, requisitos não funcionais, jornadas de usuário, arquitetura conceitual, fases de entrega, critérios de aceite, riscos, decisões pendentes e backlog inicial.

## Contexto do produto

A Odirlei Labs deve ser tratada como um ecossistema de produtos, não como um portfólio comum. O objetivo é transformar projetos técnicos, automações, documentação e demonstrações em uma plataforma com identidade própria, maturidade visual e narrativa de produto.

Hoje existem três pilares principais:

1. QA Command Center: hub central, portfólio vivo e cockpit de carreira/produtos.
2. WhatsApp AI Assistant: assistente comercial conectado ao WhatsApp para pequenos negócios.
3. Vigilante AI: sistema de monitoramento por câmeras com IA assistida.

Também existe a visão futura de:

1. Odirlei Labs Hub: camada superior de navegação entre produtos.
2. Robot/QA AI Framework: framework de automação com IA aplicada a QA.

O QA Command Center deve nascer como ponto central da experiência. Ele não deve parecer apenas currículo digital, landing page ou dashboard genérico. Ele deve funcionar como uma plataforma explorável, onde visitantes conseguem entender trajetória, produtos, projetos, decisões técnicas, stack, automações, métricas, documentação e raciocínio de arquitetura.

## Objetivo do PRD.md

Crie um `PRD.md` que permita que uma pessoa, um time ou uma IA assistida implemente a primeira versão da Odirlei Labs com clareza. O documento precisa responder:

1. O que será construído.
2. Por que será construído.
3. Para quem será construído.
4. Quais problemas resolve.
5. Quais produtos entram no escopo.
6. Como a experiência deve funcionar.
7. Como a identidade visual deve se comportar.
8. Quais requisitos funcionais são necessários.
9. Quais requisitos não funcionais são obrigatórios.
10. Quais componentes e padrões devem existir.
11. Como será validado que a entrega está correta.
12. O que fica fora do escopo inicial.
13. Quais riscos e decisões ainda precisam ser acompanhados.

## Premissa central

A Odirlei Labs deve parecer uma empresa de software/produto, não um conjunto de experimentos pessoais. A interface deve transmitir calma, precisão, engenharia, confiança, clareza, inovação e futuro.

A estética deve ser futurista, mas silenciosa. Não deve usar clichês visuais de IA. Não deve parecer gamer, cyberpunk, neon exagerado, dashboard SaaS genérico ou template de portfólio.

Frase-guia:

> Construir sistemas que automatizam, explicam, monitoram e evoluem.

## Público-alvo

Considere pelo menos estes públicos no PRD:

1. Recrutadores técnicos que precisam entender senioridade, experiência e domínio técnico rapidamente.
2. Tech leads, engineering managers e founders que avaliam capacidade de arquitetura, produto e execução.
3. Clientes ou pequenos negócios interessados em automação, atendimento com IA ou monitoramento inteligente.
4. Desenvolvedores e QAs que querem explorar documentação, stack, decisões técnicas e demos.
5. O próprio mantenedor da Odirlei Labs, que precisa evoluir o ecossistema sem reinventar UI a cada novo produto.

## Problema a resolver

O problema principal não é apenas visual. É percepção, organização e escalabilidade.

Projetos técnicos bons podem parecer pequenos quando apresentados como repositórios soltos, páginas isoladas ou dashboards genéricos. A Odirlei Labs precisa resolver:

1. Organização: centralizar produtos, projetos, docs, demos, métricas e decisões.
2. Identidade: criar uma linguagem visual consistente e reconhecível.
3. Narrativa: explicar problema, solução, arquitetura, impacto e trade-offs de cada entrega.
4. Escalabilidade: permitir novos produtos usando o mesmo Product Language e o mesmo Design System.
5. Percepção de maturidade: comunicar senioridade técnica e visão de produto em poucos segundos.

## Direção de produto

A home não deve abrir como dashboard operacional. Ela deve abrir como hub de exploração.

A hierarquia correta da experiência é:

Home/Hero -> Hub de produtos -> Portfólio/Trajetória -> Projetos -> Detalhe do projeto -> Dashboard interno/demonstração -> Decisões técnicas -> Documentação.

Dashboards com métricas, gráficos e listas densas devem existir apenas dentro dos módulos, não como primeira impressão da plataforma.

## Produtos no escopo

Inclua no PRD uma seção dedicada para cada produto.

### QA Command Center

Função: hub central, portfólio vivo e cockpit do ecossistema.

Deve apresentar:

1. Identidade e posicionamento.
2. Trajetória profissional em QA, automação e IA aplicada.
3. Projetos principais com problema, solução, stack e impacto.
4. Produtos derivados do ecossistema.
5. Decisões técnicas e arquitetura.
6. Métricas de automação quando aplicável.
7. Documentação e demos.
8. Entrada para o AI Dock.

### WhatsApp AI Assistant

Função: produto de atendimento comercial para pequenos negócios.

Problema: pequenos negócios perdem tempo e oportunidades respondendo perguntas repetitivas, esquecendo agendamentos e deixando leads sem resposta.

Solução: assistente conectado ao WhatsApp comercial que responde dúvidas frequentes, coleta informações, qualifica clientes, sugere respostas, agenda horários, resume conversas e transfere para atendimento humano quando necessário.

Fluxo conceitual:

Mensagem do cliente -> entrada WhatsApp -> processamento -> contexto -> IA -> regra de negócio -> resposta/agendamento/resumo -> log.

### Vigilante AI

Função: produto de monitoramento residencial com IA assistida.

Problema: câmeras comuns geram muitos alertas inúteis e exigem verificação manual constante.

Solução: agente de monitoramento que detecta movimento, classifica eventos com IA, envia alertas, registra evidências, mantém histórico e reduz ruído distinguindo pessoa, animal, veículo, sombra ou movimento irrelevante.

Fluxo conceitual:

Câmera -> captura/evento -> detecção -> classificação IA -> regra de severidade -> alerta -> registro -> histórico.

### Odirlei Labs Hub

Função: camada superior de navegação entre produtos. Pode nascer dentro do QA Command Center e futuramente virar home independente.

### Robot/QA AI Framework

Função: módulo futuro para automação com IA aplicada a QA, geração de cenários, análise de logs, documentação e suporte a frameworks.

## Product Language e Design System

O PRD deve deixar claro que a Odirlei Labs precisa de uma linguagem de produto antes de telas finais.

Nome do Product Language: Odirlei Labs Product Language.

Nome provisório do Design System: Horizon Design System.

O Horizon deve conter:

1. Tokens de cor.
2. Tokens de tipografia.
3. Tokens de espaçamento.
4. Tokens de raio.
5. Tokens de sombra.
6. Tokens de motion.
7. Componentes base.
8. Componentes compostos.
9. Templates.
10. Padrões responsivos.
11. Microcopy.
12. Acessibilidade.
13. Regras para IA assistida.

Regra crítica: não usar valores soltos em componentes finais. Usar tokens.

## DNA visual obrigatório

O PRD deve registrar que o design deve absorver padrões das referências abaixo sem copiar telas:

1. Linear: calma, precisão, navegação, densidade controlada e motion discreto.
2. Raycast: command palette, velocidade e produtividade.
3. Arc: fluidez, personalidade e surpresa controlada.
4. Stripe: documentação como produto e hierarquia editorial.
5. Vercel/Geist: minimalismo técnico, tipografia e developer experience.
6. Apple HIG: clareza, refinamento e profundidade.
7. Figma: tokens, variáveis e design system escalável.
8. Framer: motion e páginas de produto.
9. Notion: modularidade e documentação viva.
10. Nothing/Rivian/Teenage Engineering: futurismo industrial, limpo e não-clichê.
11. Datadog/Grafana/Supabase/Retool: dashboards internos, não home.
12. Cursor/Perplexity/Claude/ChatGPT/Lovable: padrões de interação com IA, não estética visual.

## Diretrizes visuais obrigatórias

Inclua no PRD estas regras:

1. Dark mode premium como padrão.
2. Fundo grafite profundo, não preto puro.
3. Poucas cores por tela.
4. Uma cor de acento dominante por tela.
5. Tipografia Geist Sans + Geist Mono como direção preferida.
6. Motion discreto, funcional e consistente.
7. IA como camada funcional, não como decoração.
8. Home narrativa, não dashboard operacional.
9. Documentação com aparência de produto.
10. Componentes com estados completos: default, hover, focus, loading, empty, error e disabled quando aplicável.

Paleta inicial sugerida:

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

## Experiência esperada da home

Detalhe no PRD a estrutura da home inicial do QA Command Center:

1. Hero minimalista com marca, posicionamento e CTAs.
2. Linha de status discreta.
3. Product Gateway com cards para QA Command Center, WhatsApp AI, Vigilante AI e futuros produtos.
4. Timeline de trajetória profissional e técnica.
5. Expertise Graph conectando competências.
6. Featured Projects com problema, solução, stack e impacto.
7. AI Dock como camada de exploração contextual.
8. Engineering Notes com decisões técnicas e aprendizados.
9. Footer premium com GitHub, LinkedIn, docs, contato e status.

Exemplo de hero:

```text
ODIRLEI LABS
Build. Automate. Innovate.
QA Engineer | Automation Architect | AI Builder

CTAs: Explorar Command Center / Ver Produtos / Perguntar à IA
```

## AI Dock

Inclua uma seção específica para o AI Dock.

Função: permitir interação contextual com a plataforma. O visitante poderá perguntar sobre projetos, tecnologias, decisões técnicas, métricas, arquitetura e produtos.

Regras:

1. Não ocupar a home inteira.
2. Não parecer chatbot genérico.
3. Agir como copiloto do portfólio/produto.
4. Responder com fontes internas, cards, listas e links.
5. Conhecer o contexto da página atual.
6. Iniciar como botão flutuante discreto ou command modal.

Exemplos de perguntas:

1. “Quais projetos usam Robot Framework?”
2. “Explique o Vigilante AI.”
3. “Mostre decisões de arquitetura.”
4. “Quais tecnologias domino?”
5. “Quais projetos têm potencial comercial?”

## Componentes obrigatórios

O PRD deve listar componentes base e componentes exclusivos.

Componentes base:

1. Button.
2. Card.
3. Input.
4. Search input.
5. AI prompt input.
6. Sidebar.
7. Topbar.
8. Breadcrumb.
9. Tabs.
10. Command Palette.
11. Product Switcher.
12. Mobile Drawer.
13. Toast.
14. Alert.
15. Badge.
16. Status Dot.
17. Skeleton.
18. Empty State.
19. Error State.
20. Confirmation Modal.
21. Table.
22. KPI Row.
23. Chart Card.
24. Timeline.
25. Activity Feed.
26. Log Viewer.
27. Code Block.
28. Decision Record.

Componentes exclusivos:

1. Product Gateway Card.
2. AI Dock.
3. AI Insight.
4. Engineering Decision Card.
5. Mission Timeline.
6. Expertise Graph.
7. Product Status Strip.
8. Demo Frame.
9. Architecture Flow.
10. Lab Note.

## Jornadas de usuário

Crie jornadas detalhadas para pelo menos estes cenários:

1. Recrutador acessa a home, entende posicionamento, vê produtos, explora projetos e abre contato.
2. Tech lead avalia profundidade técnica, abre uma decisão de arquitetura, consulta documentação e valida stack.
3. Cliente de pequeno negócio acessa WhatsApp AI, entende problema/solução, vê demo e entende possível valor comercial.
4. Usuário residencial ou avaliador acessa Vigilante AI, entende fluxo de alertas e vê como a IA reduz ruído.
5. Desenvolvedor navega por documentação, arquitetura, setup e decisões técnicas.
6. Visitante usa AI Dock para perguntar sobre tecnologias, impacto e produtos.
7. Usuário mobile acessa pelo LinkedIn e consegue entender a proposta sem depender de desktop.

Cada jornada deve conter:

1. Persona.
2. Objetivo.
3. Entrada.
4. Passos.
5. Pontos de decisão.
6. Resultado esperado.
7. Métricas ou sinais de sucesso.

## Requisitos funcionais

Crie uma lista numerada e priorizada de requisitos funcionais. Use IDs como `RF-001`, `RF-002` etc.

Inclua, no mínimo, requisitos para:

1. Home do QA Command Center.
2. Product Gateway.
3. Página de produto padronizada.
4. Página de projeto/detalhe.
5. Documentação como produto.
6. AI Dock.
7. Command Palette.
8. Timeline profissional/técnica.
9. Featured Projects.
10. Engineering Decision Cards.
11. Demo Frame.
12. Architecture Flow.
13. Responsividade mobile.
14. Estados de loading, empty e error.
15. Conteúdo vindo de JSON/YAML/MDX, evitando hardcode desnecessário.

Para cada requisito, inclua:

1. Descrição.
2. Prioridade: Must, Should, Could.
3. Critérios de aceite.
4. Dependências quando existirem.

## Requisitos não funcionais

Crie requisitos não funcionais com IDs como `RNF-001`, `RNF-002` etc.

Inclua:

1. Performance percebida.
2. Acessibilidade.
3. Responsividade.
4. Consistência visual.
5. Uso de tokens.
6. Manutenibilidade.
7. Escalabilidade de conteúdo.
8. SEO básico.
9. Segurança para futuras integrações de IA.
10. Observabilidade mínima.
11. Suporte a reduced motion.
12. Compatibilidade com navegação por teclado.

## Stack recomendada

Considere esta stack como direção, mas registre decisões pendentes quando necessário:

1. Next.js ou React + Vite.
2. TypeScript.
3. Tailwind CSS com tokens.
4. Framer Motion para animações.
5. Lucide React para ícones.
6. MDX para documentação.
7. JSON/YAML para dados de projetos, timeline e decisões.

Estrutura recomendada:

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
    projects.json
    timeline.json
    decisions.json
  /lib
  /hooks
  /styles
```

## Escopo do MVP

Defina claramente um MVP realista. O PRD deve evitar ambição infinita.

MVP sugerido:

1. Home do QA Command Center como hub narrativo.
2. Product Gateway com três produtos principais.
3. Página padrão de produto para QA Command Center, WhatsApp AI e Vigilante AI.
4. Dados de projetos, timeline e decisões vindo de arquivos estruturados.
5. Horizon v0.1 com tokens e componentes essenciais.
6. AI Dock em versão mockada ou preparada para integração futura.
7. Documentação inicial em MDX ou markdown estruturado.
8. Responsividade mobile.
9. Estados essenciais de UI.

Fora do MVP:

1. Integração real com WhatsApp.
2. Integração real com câmeras.
3. IA generativa em produção sem backend seguro.
4. Dashboard operacional completo.
5. Autenticação avançada.
6. Multiusuário.
7. Analytics completo.

## Critérios de sucesso

Inclua critérios mensuráveis e qualitativos. Use os critérios abaixo como base:

1. Visitante entende em menos de 10 segundos que está vendo uma plataforma de produtos, não apenas portfólio.
2. Os três produtos principais parecem pertencer à mesma família.
3. A estética parece futurista sem parecer IA genérica.
4. A home preserva narrativa e não vira dashboard.
5. Cada produto tem página clara com problema, solução, arquitetura e demo.
6. A documentação parece parte da plataforma.
7. A IA é útil para explorar conteúdo.
8. O Design System reduz retrabalho.
9. Novas telas podem ser criadas seguindo padrões existentes.
10. O resultado transmite senioridade, arquitetura e visão de produto.

## Riscos

Inclua uma matriz de riscos com impacto, probabilidade e mitigação.

Riscos mínimos:

1. Excesso de ambição.
2. Resultado bonito, mas genérico.
3. Cópia excessiva de referências.
4. Home virar dashboard.
5. IA dominar a identidade visual.
6. Design System engessar cedo.
7. Conteúdo ficar hardcoded demais.
8. Mobile ficar secundário.

## Decisões pendentes

Inclua uma seção de decisões pendentes:

1. Nome final do Design System.
2. Fonte oficial: Geist ou Inter.
3. Framework final: Next.js ou Vite.
4. Forma inicial do AI Dock.
5. Primeiro produto a ser redesenhado em detalhe.
6. Nível de animação permitido.
7. Se o Hub será separado ou ficará dentro do Command Center.
8. Se o MVP terá IA real, mockada ou apenas preparada para integração.

## Backlog inicial

Gere um backlog inicial por épicos. Cada épico deve conter histórias de usuário e critérios de aceite.

Épicos mínimos:

1. Foundation/Horizon v0.1.
2. Home/Command Center Hub.
3. Product Gateway.
4. Product Pages.
5. Documentation Layer.
6. AI Dock.
7. Content System.
8. Responsiveness and Accessibility.
9. Motion and Interaction.
10. QA/Validation.

Formato sugerido para histórias:

```text
Como [persona], quero [ação], para [benefício].

Critérios de aceite:
1. ...
2. ...
3. ...
```

## Formato obrigatório do PRD.md

O arquivo final deve ter esta estrutura:

```markdown
# PRD.md - Odirlei Labs Product Ecosystem

## 1. Resumo executivo
## 2. Visão do produto
## 3. Objetivos e não objetivos
## 4. Público-alvo e personas
## 5. Problemas a resolver
## 6. Proposta de solução
## 7. Escopo do MVP
## 8. Fora de escopo
## 9. Produtos do ecossistema
## 10. Jornadas de usuário
## 11. Arquitetura conceitual da plataforma
## 12. Product Language e Horizon Design System
## 13. Requisitos funcionais
## 14. Requisitos não funcionais
## 15. Conteúdo, documentação e dados
## 16. AI Dock e camada de IA
## 17. Componentes e padrões de UI
## 18. Responsividade e acessibilidade
## 19. Motion language
## 20. Stack técnica recomendada
## 21. Métricas e critérios de sucesso
## 22. Backlog inicial
## 23. Roadmap por fases
## 24. Riscos e mitigação
## 25. Decisões pendentes
## 26. Checklist de aceite do MVP
## 27. Apêndice: referências e benchmark
```

## Regras de escrita

1. Seja detalhado, mas organizado.
2. Não invente integrações reais que ainda não existem; marque como futuro ou mock quando necessário.
3. Não reduza o projeto a uma landing page.
4. Não transforme a home em dashboard.
5. Não use linguagem vaga de marketing.
6. Priorize clareza operacional para implementação.
7. Use tabelas quando ajudarem requisitos, riscos, backlog e critérios.
8. Explique trade-offs relevantes.
9. Preserve a visão de ecossistema.
10. Inclua critérios de aceite verificáveis.

## Resultado esperado

Entregue apenas o conteúdo completo do arquivo `PRD.md`, pronto para ser salvo no repositório. Não inclua comentários fora do documento. Não diga que “como IA” você fará algo. Apenas gere o PRD final.
