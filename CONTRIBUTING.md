# Contribuindo com o Project Jun Fan

## Fluxo de Contribuição

1. Faça um fork do repositório
2. Crie uma branch: `git checkout -b feature/nome-da-feature`
3. Faça suas alterações
4. Rode `npm run build` para validar
5. Faça commit seguindo conventional commits
6. Abra um Pull Request

## Padrão Arquitetural

- **Front-end first**: zero backend no MVP
- **Conteúdo em JSON**: nunca hardcoded em componentes
- **Componentes reutilizáveis**: UI primitives em `components/ui/`, específicos em `features/`
- **Design System**: seguir tokens do Horizon, nunca valores soltos

## Trabalhando com IA

Toda IA contribuindo neste projeto deve:

1. Reutilizar componentes existentes antes de criar novos
2. Seguir os tokens do Horizon Design System
3. Manter conteúdo em `src/content/`, nunca hardcoded
4. Não criar backend, banco de dados ou autenticação
5. Justificar qualquer abstração nova
6. Usar português (pt-BR) na interface, inglês no código

## Como Abrir Issues

- **Bug**: descreva o comportamento esperado vs atual, passos para reproduzir, ambiente
- **Feature**: descreva o problema a ser resolvido, não a solução técnica

## Como Criar Pull Requests

- Título claro e descritivo
- Descrição com motivação e abordagem
- Referencie a Issue relacionada
- Garanta que o build passa (`npm run build`)
- Mantenha o escopo focado em uma única alteração

## Código de Conduta

Este projeto segue um [Código de Conduta](CODE_OF_CONDUCT.md). Seja respeitoso, colaborativo e construtivo.
