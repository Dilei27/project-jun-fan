# ADR-002 — Horizon Design System

## Status

Aceito

## Contexto

O ecossistema de produtos (QA Command Center, WhatsApp AI Assistant, Vigilante AI) precisa de identidade visual consistente. Sem um design system, cada produto desenvolveria sua própria aparência, gerando retrabalho e inconsistência.

## Decisão

Criar o Horizon Design System como camada visual compartilhada. Tokens de cor, tipografia, espaçamento, bordas e motion são definidos centralmente no Tailwind `@theme` e no arquivo `src/design-system/tokens.ts`. Componentes reutilizáveis em `src/components/ui/` implementam esses tokens.

## Consequências

- Positivas: consistência visual entre produtos, alterações globais via tokens, facilidade para onboarding de novos desenvolvedores.
- Negativas: abstração inicial requer planejamento; pode parecer overengineering em telas simples.
- Neutras: Tailwind v4 com `@theme` simplifica a integração dos tokens.

## Alternativas Consideradas

- CSS Modules: sem sistema de tokens nativo, propenso a deriva visual.
- Styled Components: runtime overhead desnecessário para SSR.
