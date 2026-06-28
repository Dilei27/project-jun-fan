# Core Governance — Project Core

> Regras permanentes para o núcleo do ecossistema.

---

## Princípios

1. **Core é a única fonte de verdade.** Nenhum dado duplicado.
2. **Toda entidade tem um único identificador.** Sempre `id`.
3. **Toda entidade tem um tipo.** Sempre `type` no schema.
4. **Relacionamentos são explícitos.** Nunca implícitos por convenção de nome.
5. **Nenhum componente acessa `content/` diretamente.** Sempre via Core.
6. **Core não depende de UI.** Core é puramente lógico.

---

## Regras de Dados

### Regra 1: Fonte Única de Verdade
```
❌ content/products.json E content/qa-command-center.json
✅ Apenas content/products.json (ou um arquivo por produto, mas não ambos)
```

### Regra 2: Sem Duplicação
```
❌ Product.stack contém tecnologia que está em content/technologies.json
✅ Product.stack contém string[] que referencia entries em content/technologies.json
```

### Regra 3: IDs Únicos
```
❌ product.id = "whatsapp-ai" e project.id = "whatsapp-ai"
✅ product.id = "whatsapp-ai" e project.id = "whatsapp-ai-project"
```

### Regra 4: Relacionamentos por ID
```
❌ relatedProjects: ["Automação ERP UAU"] (string solta)
✅ relatedProjects: ["automacao-erp-uau"] (ID que matcha com projects.json)
```

### Regra 5: Dados Sempre em JSON
```
❌ Dados em JS/TS dentro de componentes
✅ Dados em content/*.json
```

---

## Regras de Componentes

### Regra 6: Componentes recebem dados por props
```
❌ function ProductCard() { const data = getProducts(); ... }
✅ function ProductCard({ product }: { product: Product }) { ... }
```

### Regra 7: Nenhum import direto de content/
```
❌ import data from '@/content/products.json'
✅ import { getProducts } from '@/core/loaders/product-loader'
```

### Regra 8: Queries no Core, não nos componentes
```
❌ products.filter(p => p.status === 'online') (no componente)
✅ core.queries.search('', { filters: { status: 'online' } })
```

---

## Regras de Arquitetura

### Regra 9: Core não importa UI
```
❌ import { Card } from '@/components/ui/card' (dentro de core/)
✅ core/ é puro TypeScript, sem JSX
```

### Regra 10: Core não importa features
```
❌ import { AIDock } from '@/features/ai-dock' (dentro de core/)
✅ core/ não sabe que AI Dock existe
```

### Regra 11: Features importam Core, não o contrário
```
✅ features/ai-dock importa core/queries/search
❌ core/ importa features/ai-dock
```

### Regra 12: UI importa Core, não o contrário
```
✅ components/ importa core/
❌ core/ importa components/
```

---

## Regras de Evolução

### Regra 13: Add-only
Sempre que possível, adicionar em vez de modificar ou remover. Adicionar é seguro.

### Regra 14: Deprecate antes de Remover
Mover para `deprecated` por 1 versão antes de remover. Marcar com `status: archived`.

### Regra 15: Nova Entidade = Novo Arquivo
Cada entidade tem seu próprio arquivo em `core/entities/` e `core/loaders/`.

### Regra 16: Nova Query = Nova Função no Core
Queries são adicionadas como métodos em `core/queries/`.

---

## Penalidades por Violação

| Violação | Consequência |
|---|---|
| Dado duplicado | Tech debt — deve ser consolidado |
| Componente acessa content/ diretamente | Rejeitado em code review |
| Core importa UI | Rejeitado em code review |
| ID duplicado | Bug — conflito de entidades |
| Relacionamento implícito | Rejeitado — deve ser explícito |

---

## Checklist para Novo Produto

- [ ] Entry em `content/products.json` com schema válido
- [ ] IDs únicos (não conflitam com outras entidades)
- [ ] Relacionamentos em `content/relationships.json` (se aplicável)
- [ ] Core retorna o produto em `getAll()`
- [ ] Search indexa o novo produto
- [ ] Knowledge Graph inclui o nó
- [ ] AI Dock responde perguntas sobre o produto

---

## Checklist para Nova Entidade

- [ ] Schema em `core/entities/<name>.ts`
- [ ] Loader em `core/loaders/<name>-loader.ts`
- [ ] Queries em `core/queries/` (se aplicável)
- [ ] Barrel export em `core/index.ts`
- [ ] Teste de loader (se aplicável)
- [ ] Relacionamentos mapeados
