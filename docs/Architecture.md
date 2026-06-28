# Architecture — Project Jun Fan

## Visão Geral

Project Jun Fan segue uma arquitetura **front-end first** com Next.js App Router. Todo o conteúdo é estático e servido via arquivos JSON. Não há banco de dados, backend operacional ou autenticação no MVP.

## Por que `content/`

O diretório `src/content/` centraliza todos os dados estruturados do ecossistema em arquivos JSON. Isso mantém o conteúdo desacoplado da lógica de apresentação, permitindo que qualquer componente consuma os mesmos dados sem duplicação.

Arquivos:
- `products.json` — dados dos 3 produtos
- `projects.json` — dados dos projetos
- `timeline.json` — marcos da trajetória
- `decisions.json` — registro de decisões arquiteturais
- `docs.json` — documentação estruturada
- `manifesto.json` — manifesto do Project Jun Fan
- `principles.json` — princípios de design e engenharia
- `philosophy.json` — filosofia e linguagem de produto

## Por que `design-system/`

Centraliza tokens e regras visuais do Horizon Design System. Separar tokens do código de componente garante que a identidade visual possa evoluir sem alterar implementações.

Arquivos:
- `tokens.ts` — todos os tokens consolidados
- `colors.ts` — paleta de cores
- `typography.ts` — definições tipográficas
- `spacing.ts` — escala de espaçamento
- `radius.ts` — escala de bordas
- `motion.ts` — definições de animação
- `theme.css` — variáveis CSS para fallback

## Por que `config/`

Centraliza navegação, rotas, constantes e metadados para evitar valores soltos pelo código. Qualquer alteração de URL, label ou configuração global é feita em um único lugar.

Arquivos:
- `navigation.ts` — links de navegação
- `constants.ts` — constantes do projeto
- `metadata.ts` — gerador de metadados SEO

## Por que `features/`

Componentes e lógica específicos de cada módulo do ecossistema. Separa o que é geral (reutilizável em `components/`) do que é específico de uma área.

Pastas:
- `ai-dock/` — componente do AI Dock
- `command-palette/` — componente da paleta de comandos
- `docs/` — sidebar de documentação
- `command-center/` — (futuro)
- `whatsapp-ai/` — (futuro)
- `vigilante-ai/` — (futuro)

## Por que `components/`

Componentes reutilizáveis e compartilháveis entre módulos. Organizados por categoria:

- `ui/` — primitivas genéricas (Button, Card, Badge, Skeleton)
- `layout/` — estrutura da página (Header, Footer)
- `cards/` — cards reutilizáveis (ProductCard, ProjectCard, DecisionCard, AIInsightCard)
- `shared/` — componentes diversos (StatusStrip, Timeline)
- `navigation/` — componentes de navegação (futuro)
- `docs/` — (vazio, componentes de docs estão em features/docs/)

## Por que `lib/`

Funções utilitárias puras sem efeitos colaterais:
- `content.ts` — loaders de dados JSON
- `search.ts` — busca textual em todo o conteúdo

## Por que `types/`

Tipos TypeScript centralizados para produtos, projetos, decisões, documentos e demais entidades do ecossistema. Garante consistência entre componentes e pages.
