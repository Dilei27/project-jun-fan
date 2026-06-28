# AI Workspace — Project Jun Fan

Este diretório contém a infraestrutura de agentes especializados para desenvolvimento assistido por IA do Project Jun Fan.

## Filosofia

O Project Jun Fan foi projetado para ser compreendido por IAs apenas lendo sua documentação. Nenhum contexto externo é necessário.

## Estrutura

```
agents/
  README.md            ← Este arquivo
  manifest.json        ← Catálogo de agentes
  core/                ← Agentes fundamentais do projeto
  engineering/         ← Agentes de engenharia e código
  product/             ← Agentes de produto e estratégia
  design/              ← Agentes de design system e identidade
  qa/                  ← Agentes de qualidade e testes
  devops/              ← Agentes de infraestrutura e deploy
  contexts/            ← Contexto permanente do projeto
  playbooks/           ← Guias passo a passo
  templates/           ← Templates reutilizáveis
```

## Como Utilizar

1. Identifique o agente adequado para sua tarefa em `manifest.json`
2. Leia o `agent.md` do agente para entender seu papel e escopo
3. Siga o `prompt.md` para interagir com o agente
4. Consulte o `checklist.md` para validar entregas
5. Veja `examples.md` para exemplos reais

## Boas Práticas

- Sempre consultar os `contexts/` antes de iniciar uma tarefa
- Seguir os `playbooks/` para atividades recorrentes
- Usar `templates/` para documentação padronizada
- Um agente pode consultar outro agente quando o escopo ultrapassar sua especialidade
- Agentes trabalham juntos — nenhum agente substitui outro

## Como Criar um Novo Agente

1. Crie uma nova pasta dentro da categoria apropriada em `agents/`
2. Use o template em `agents/templates/agent-template.md`
3. Crie os 4 arquivos: `agent.md`, `prompt.md`, `checklist.md`, `examples.md`
4. Adicione o agente ao `manifest.json`
5. Documente seu contexto nos `contexts/` se necessário

## Como Evoluir um Agente

- Conteúdo desatualizado deve ser atualizado imediatamente
- Novos playbooks podem ser adicionados conforme novos fluxos surgem
- Templates podem ser refinados com base no uso real
- Contextos devem refletir o estado atual do projeto
