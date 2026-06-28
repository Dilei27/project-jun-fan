# Engineering Handbook — Project Jun Fan

## Princípios

1. **Simplicidade primeiro** — resolver o problema atual sem antecipar complexidade futura.
2. **Reutilização real** — componente só é criado se for usado em mais de um lugar.
3. **Conteúdo desacoplado** — dados nunca dentro de componentes. Usar JSON ou MDX.
4. **Design System como verdade** — tokens do Horizon são a única fonte de valores visuais.
5. **Front-end first** — zero backend no MVP. Servidor só para servir páginas.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5 |
| UI | Tailwind CSS 4 + Framer Motion 12 |
| Ícones | Lucide React |
| Conteúdo | JSON estático |
| Deploy | Docker + Node 22 |

## Estrutura de Componentes

```
components/ui/       # Primitivas (Button, Card, Badge)
components/layout/   # Shell (Header, Footer)
components/cards/    # Cards reutilizáveis
components/shared/   # Componentes diversos
features/            # Componentes específicos por módulo
```

## Regras para IA

- Não criar backend sem autorização
- Não criar banco de dados
- Não criar autenticação
- Não criar APIs reais
- Reutilizar componentes existentes
- Seguir tokens do Horizon
- Conteúdo sempre em JSON
- Justificar qualquer abstração nova
