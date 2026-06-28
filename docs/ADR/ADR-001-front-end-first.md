# ADR-001 — Front-end First

## Status

Aceito

## Contexto

O Project Jun Fan foi inicialmente construído com Django + Python, incluindo backend completo com ORM, banco SQLite, sessões e admin. Essa stack adicionava complexidade desnecessária para um projeto que não precisa de backend operacional.

O MVP do Project Jun Fan não requer autenticação, banco de dados, API real, mensageria ou qualquer processamento server-side além de servir páginas estáticas e conteúdo JSON.

## Decisão

Migrar de Django + Python para Next.js + React + TypeScript + Tailwind CSS + Framer Motion. Todo o conteúdo é servido via arquivos JSON estáticos no diretório `src/content/`. O backend Django original foi arquivado em `archive/backend-draft/` para referência.

## Consequências

- Positivas: zero dependências de banco, deploy simplificado, build estático possível, ecossistema front-end moderno.
- Negativas: conteúdo dinâmico (como formulários ou analytics real) exigiria backend separado.
- Neutras: conteúdo JSON precisa ser editado manualmente ou via ferramenta externa.

## Alternativas Consideradas

- Manter Django: overengineering para o escopo do MVP.
- React + Vite: perderia SSR/SEO e estrutura de páginas do Next.js.
