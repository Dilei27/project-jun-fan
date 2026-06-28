# AI Workspace — Project Jun Fan

## Visão Geral

O Project Jun Fan possui uma infraestrutura completa para desenvolvimento assistido por IA. Esta infraestrutura está organizada no diretório `agents/` e contém agentes especializados, contextos permanentes, playbooks e templates.

## Arquitetura dos Agentes

```
agents/
├── core/           Agentes fundamentais do projeto
├── engineering/    Agentes de engenharia e código
├── product/        Agentes de produto e estratégia
├── design/         Agentes de design e identidade
├── qa/             Agentes de qualidade e testes
├── devops/         Agentes de infraestrutura
├── contexts/       Contexto permanente do projeto
├── playbooks/      Guias passo a passo
└── templates/      Templates reutilizáveis
```

Cada agente possui 4 arquivos:

| Arquivo | Propósito |
|---|---|
| `agent.md` | Nome, papel, missão, responsabilidades, escopo, restrições |
| `prompt.md` | Prompt operacional para interagir com o agente |
| `checklist.md` | Checklist de validação para entregas |
| `examples.md` | Exemplos reais de utilização |

## Contextos

Os contextos em `agents/contexts/` servem como memória permanente do projeto. Eles contêm informações estruturais que não mudam entre sprints:

- `project-context.md` — visão geral e filosofia
- `engineering-handbook.md` — stack e princípios de engenharia
- `product-language.md` — identidade e tom de voz
- `horizon-design-system.md` — tokens e regras visuais
- `architecture.md` — decisões arquiteturais
- `tech-stack.md` — tecnologias e versões

## Playbooks

Os playbooks em `agents/playbooks/` contêm guias passo a passo para atividades recorrentes do ciclo de desenvolvimento:

- Criar feature
- Revisar feature
- Revisar arquitetura
- Revisar design
- Revisar QA
- Release

## Templates

Os templates em `agents/templates/` fornecem estruturas padronizadas para documentação:

- `agent-template.md` — criar novos agentes
- `prd-template.md` — documentos de requisitos
- `adr-template.md` — registro de decisões arquiteturais
- `feature-template.md` — especificação de features
- `roadmap-template.md` — itens de roadmap
- `review-template.md` — revisões de código/arquitetura

## Evolução Futura

- Agentes podem ser refinados com base no uso real
- Novos playbooks podem ser adicionados conforme novos fluxos surgem
- Contextos devem ser atualizados quando a arquitetura do projeto mudar
- A estrutura atual suporta a criação de novos agentes sem modificar a infraestrutura existente
