# Project Jun Fan

[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-online-2ea44f?style=for-the-badge)](https://dilei27.github.io/project-jun-fan/)

**Live:** https://dilei27.github.io/project-jun-fan/

> Absorb. Refine. Build.

Project Jun Fan e uma plataforma estatica de produtos, conhecimento e documentacao tecnica. A experiencia de entrada e o Knowledge Core: entidades reais, relacionamentos, projetos, decisoes e documentacao formam um sistema navegavel.

## O Que E

- Knowledge Core visual e interativo para o ecossistema Jun Fan.
- Hub de produtos, projetos, automacao, QA e IA aplicada.
- Documentacao integrada com arquitetura, decisoes e filosofia de engenharia.
- Horizon Design System como linguagem de identidade, motion e cena.

## Arquitetura

```text
Home / Knowledge Core     Entrada cinematica e curada
Knowledge Explorer        Ferramenta tecnica com WebGL e fallback SVG
Knowledge Engine          Repositorio local, entidades e relacionamentos
Product Modules           Produtos, projetos, dashboards e demos
Documentation Layer       Docs, decisoes e referencias tecnicas
Horizon Design System     Tokens, cena, componentes e motion
```

A plataforma e front-end first: conteudo estruturado local, exportacao estatica e nenhuma dependencia de backend em runtime.

## Experiencia Do Grafo

- WebGL com React Three Fiber e fallback SVG quando WebGL nao esta disponivel.
- Modos Explorar e Arquiteto/X-Ray.
- Foco espacial, caminhos reais, Knowledge Travel e replay.
- Core com instrumentacao, telemetria local e movimento reduzido quando solicitado pelo sistema.
- Busca local, Command Palette e AI Dock com fontes internas.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js 16 / React 19 |
| Linguagem | TypeScript 5 |
| Estilos | Tailwind CSS 4 |
| Motion | Framer Motion |
| Cena 3D | Three.js, React Three Fiber, Drei |
| Conteudo | JSON versionado em `src/content/` |
| Testes de dominio | Vitest |
| Deploy | GitHub Pages com exportacao estatica |

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Validacao

```bash
npm test
npm run lint
npm run build
```

Para revisar a exportacao de producao localmente:

```bash
npx serve out
```

## Conteudo E Documentacao

- Produtos, projetos, decisoes e docs: `src/content/`.
- Conhecimento e relacoes: `src/core/knowledge/`.
- Knowledge Graph: `src/features/knowledge-graph/`.
- Horizon Design System: `src/design-system/`.
- Documentacao tecnica adicional: `docs/`.

A Visao Geral em `Documentacao` apresenta a origem do nome Jun Fan e a filosofia de engenharia: aprender com conhecimento existente, refinar pela experiencia e construir a proxima iteracao.

## Produtos Proprietarios

Alguns produtos, como Vigilante AI, aparecem apenas como previa publica. Codigo proprietario, credenciais, configuracoes reais, imagens, logs e integracoes privadas nao pertencem a este repositorio.

## Higiene Do Repositorio

Arquivos de release `.zip`, PRDs locais de trabalho e playbooks de execucao de PRD sao ignorados pelo Git. Documentacao publicada em `docs/` permanece versionada.

## Licenca

MIT - Odirlei Alves
