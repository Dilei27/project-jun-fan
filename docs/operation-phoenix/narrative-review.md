# Narrative Review — Project Aura

> Análise da jornada do usuário: história ou navegação de páginas?

---

## Fluxo Atual

```
Home (/) → 
  ├── Command Center (/command-center/) → 
  │   ├── Architecture (/command-center/architecture/)
  │   ├── Timeline (/command-center/timeline/)
  │   ├── Decisions (/command-center/decisions/)
  │   └── Projects (/command-center/projects/ → /command-center/projects/[slug]/)
  ├── Hub (/hub/)
  ├── Product (/produto/[slug]/ → /produto/[slug]/dashboard/, /produto/[slug]/demo/)
  ├── Project (/projeto/[slug]/)
  ├── Docs (/docs/ → /docs/[slug]/)
  ├── Decisions (/decisoes/)
  ├── Framework (/framework/)
  ├── Analytics (/analytics/)
  └── Search (/busca/)
```

---

## Perguntas & Respostas

### O usuário percorre uma história?
**Não.** Ele navega por páginas. Cada página é um container de informação, não um capítulo de uma história.

O que existe de narrativo:
- Timeline (2018 → 2025): única seção com progressão temporal
- "Absorb. Refine. Build." no README: fora da interface
- Boot Loader: tentativa de narrativa, mas controversa

### Ou apenas navega por páginas?
**Sim.** A experiência é: home → escolhe um link → leitura → volta → outro link. Não há sensação de progressão ou descoberta.

### Onde falta contexto?
1. **Home → Command Center**: a home apresenta "Project Jun Fan", o CC apresenta "QA Command Center". O visitante não entende a relação entre os dois.
2. **Hub**: o propósito do Hub não fica claro vs Home vs Command Center. São 3 portas de entrada para conteúdo similar.
3. **Framework**: surge sem contexto — o que é "Robot/QA AI Framework" e como se relaciona com os produtos?
4. **Analytics**: métricas soltas sem narrativa — o que significam?

### Onde existe excesso?
1. **Command Center**: 8 seções em sequência linear. O usuário faz scroll infinito sem hierarquia.
2. **3 CTAs na home**: competem pela atenção.
3. **Seções duplicadas**: Produtos aparecem na home, no CC, no Hub. Projetos idem.

### Quais telas precisam respirar?
1. **Command Center**: precisa de hierarquia — seções principais em destaque, secundárias colapsadas ou em subpáginas
2. **Home**: precisa de mais espaço para o hero e menos seções
3. **Product pages**: boa, mas Architecture Flow poderia ser mais visual

### Quais telas deveriam desaparecer?
1. **Hub (`/hub/`) vs Home**: funcionalidades sobrepostas. Hub tem 4 links + listas de produtos/projetos. Home tem produtos + projetos + insights. **Consolidar**: remover Hub ou transformá-lo em rota de admin.
2. **Analytics (`/analytics/`)**: 4 métricas estáticas (3+ produtos, 3+ projetos). Pouco valor para visitante. Manter apenas se houver dados reais.
3. **Framework (`/framework/`)**: conteúdo conceitual sem conexão clara com o resto. Parece página solta.

### Quais telas deveriam ser reorganizadas?
1. **Decisões**: `/decisoes/` e `/command-center/decisions/` são o mesmo conteúdo com layout diferente. Consolidar.
2. **Command Center**: seções longas demais para uma única página. Algumas seções (Skills, Architecture Flow) poderiam ser subpáginas.

---

## Proposta de Jornada Ideal (sem alterar rotas)

```
Primeiro impacto (Home):
  → Hero com identidade + mantra + CTA único
  → Badge de status do ecossistema
  → Seção "O Ecossistema" com os 3 produtos (GATEWAY, não lista)
  → CTA para Command Center

Exploração (Command Center):
  → Hero forte com identidade QA
  → Status + Métricas compactas
  → Seções PRINCIPAIS (Produtos, Projetos, Timeline)
  → Seções SECUNDÁRIAS colapsadas ou com "ver mais"
  → AI Dock como camada transversal

Profundidade:
  → Product pages com narrativa problema → solução → arquitetura → impacto
  → Project pages como casos reais
  → Docs como referência
```

---

## Score da Narrativa: 5.5/10

| Critério | Nota | Justificativa |
|---|---|---|
| História vs Páginas | 4 | Navega funcional, sem progressão narrativa |
| Contexto entre telas | 5 | Relação entre home, CC, hub, framework não é clara |
| Excesso de conteúdo | 5 | CC com 8 seções; Hub vs Home ambíguo |
| Respiração | 6 | Home boa; CC denso |
| Jornada de descoberta | 5 | Visitante precisa adivinhar o que explorar |
| Propósito do produto | 7 | Fica claro após ler, não ao olhar |
| **Média** | **5.5** | Precisa de narrativa visual e contextual |
