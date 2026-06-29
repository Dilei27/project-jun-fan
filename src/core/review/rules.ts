import type { ReviewFinding, ReviewCategory, ReviewSeverity, ReviewEvidence } from './types'

/* ─── Rule context (what a rule receives) ─── */

export interface RuleContext {
  knowledgeNodeCount: number
  fileCount: number
  moduleCount: number
  relationshipCount: number
  largestFileLines: number
  filesByCategory: Record<string, number>
  nodesByType: Record<string, number>
  modulesWithoutDocs: string[]
  circularDependencyCount: number
  unusedFiles: string[]
  duplicatedComponents: string[]
  modulesAboveThreshold: string[]
  untestedModules: string[]
}

/* ─── Rule interface ─── */

export interface ReviewRule {
  id: string
  name: string
  description: string
  category: ReviewCategory
  severity: ReviewSeverity
  run(ctx: RuleContext): Promise<ReviewFinding[]>
}

/* ─── Rule registry ─── */

class RuleRegistry {
  private rules = new Map<string, ReviewRule>()

  register(rule: ReviewRule): void {
    if (this.rules.has(rule.id)) {
      console.warn(`[RuleRegistry] Rule "${rule.id}" already registered — overwriting.`)
    }
    this.rules.set(rule.id, rule)
  }

  unregister(id: string): void {
    this.rules.delete(id)
  }

  get(id: string): ReviewRule | undefined {
    return this.rules.get(id)
  }

  getAll(): ReviewRule[] {
    return Array.from(this.rules.values())
  }

  getByCategory(category: ReviewCategory): ReviewRule[] {
    return this.getAll().filter(r => r.category === category)
  }

  clear(): void {
    this.rules.clear()
  }
}

export const ruleRegistry = new RuleRegistry()

/* ─── Helper ─── */

let findingCounter = 0
function findingId(): string {
  return `finding-${Date.now()}-${++findingCounter}`
}

function makeEvidence(entityId: string, entityType: string, entityName: string, detail: string): ReviewEvidence {
  return { entityId, entityType, entityName, detail }
}

/* ─── Mock Rules ─── */

export const duplicatedComponentsRule: ReviewRule = {
  id: 'rule-duplicated-components',
  name: 'Componentes Duplicados',
  description: 'Detecta componentes com responsabilidades sobrepostas que poderiam ser unificados.',
  category: 'architecture',
  severity: 'high',
  async run(ctx: RuleContext) {
    if (ctx.duplicatedComponents.length === 0) return []
    return [{
      id: findingId(),
      title: 'Componentes duplicados encontrados',
      description: `${ctx.duplicatedComponents.length} componentes compartilham responsabilidades similares e poderiam ser unificados.`,
      severity: 'high',
      confidence: 0.82,
      impact: 'Duplicação aumenta custo de manutenção e inconsistência visual.',
      category: 'architecture',
      relatedEntities: ctx.duplicatedComponents,
      ruleId: 'rule-duplicated-components',
      recommendation: 'Criar um design system centralizado e migrar componentes duplicados para ele.',
      status: 'open',
      evidence: ctx.duplicatedComponents.map(name =>
        makeEvidence(name, 'component', name, 'Responsabilidade sobreposta detectada'),
      ),
    }]
  },
}

export const duplicatedKeywordsRule: ReviewRule = {
  id: 'rule-duplicated-keywords',
  name: 'Palavras-chave Duplicadas',
  description: 'Detecta palavras-chave de teste duplicadas entre arquivos.',
  category: 'qa',
  severity: 'medium',
  async run(ctx: RuleContext) {
    return [{
      id: findingId(),
      title: 'Palavras-chave de teste compartilhadas',
      description: 'Palavras-chave de teste estão duplicadas em múltiplos arquivos. Extrair para recursos compartilhados reduz repetição.',
      severity: 'medium',
      confidence: 0.75,
      impact: 'Manutenção de testes duplicada; alterações precisam replicar em N arquivos.',
      category: 'qa',
      relatedEntities: ['src/tests/keywords.resource', 'src/tests/helpers.ts'],
      ruleId: 'rule-duplicated-keywords',
      recommendation: 'Extrair palavras-chave compartilhadas para um resource central.',
      status: 'open',
      evidence: [
        makeEvidence('file-6', 'file', 'exploration-engine.ts', 'Contém keywords de teste duplicadas'),
        makeEvidence('file-7', 'file', 'replay-engine.ts', 'Contém keywords de teste duplicadas'),
      ],
    }]
  },
}

export const unusedFilesRule: ReviewRule = {
  id: 'rule-unused-files',
  name: 'Arquivos Não Utilizados',
  description: 'Identifica arquivos órfãos sem nenhuma referência no código.',
  category: 'knowledge',
  severity: 'low',
  async run(ctx: RuleContext) {
    const unused = ctx.unusedFiles.length > 0 ? ctx.unusedFiles.slice(0, 3) : ['old-component.tsx', 'legacy-utils.ts']
    return [{
      id: 'finding-unused-files',
      title: 'Arquivos sem referência',
      description: `${unused.length} arquivos no projeto não são importados por nenhum outro arquivo.`,
      severity: 'low',
      confidence: 0.65,
      impact: 'Ruído no código e possível acúmulo de dívida técnica.',
      category: 'knowledge',
      relatedEntities: unused,
      ruleId: 'rule-unused-files',
      recommendation: 'Revisar arquivos órfãos e removê-los ou documentar sua finalidade.',
      status: 'open',
      evidence: [
        makeEvidence('unused-1', 'file', 'old-component.tsx', 'Nenhum import encontrado'),
        makeEvidence('unused-2', 'file', 'legacy-utils.ts', 'Nenhum import encontrado'),
      ],
    }]
  },
}

export const missingDocumentationRule: ReviewRule = {
  id: 'rule-missing-docs',
  name: 'Documentação Ausente',
  description: 'Verifica módulos que não possuem documentação associada.',
  category: 'documentation',
  severity: 'high',
  async run(ctx: RuleContext) {
    const missing = ctx.modulesWithoutDocs.length > 0 ? ctx.modulesWithoutDocs : ['Core', 'Design System']
    return [{
      id: findingId(),
      title: 'Módulos sem documentação',
      description: `${missing.length} módulos não possuem documentação associada no modelo de conhecimento.`,
      severity: 'high',
      confidence: 0.90,
      impact: 'Dificulta onboarding, auditoria e rastreabilidade de decisões.',
      category: 'documentation',
      relatedEntities: missing,
      ruleId: 'rule-missing-docs',
      recommendation: 'Criar documentos para cada módulo não documentado.',
      status: 'open',
      evidence: missing.map(name =>
        makeEvidence(name, 'module', name, 'Nenhum documento associado'),
      ),
    }]
  },
}

export const circularDependenciesRule: ReviewRule = {
  id: 'rule-circular-deps',
  name: 'Dependências Circulares',
  description: 'Detecta ciclos na dependência entre módulos.',
  category: 'architecture',
  severity: 'critical',
  async run(ctx: RuleContext) {
    const count = ctx.circularDependencyCount > 0 ? ctx.circularDependencyCount : 1
    return [{
      id: findingId(),
      title: 'Dependências circulares detectadas',
      description: `${count} ciclos de dependência encontrados entre módulos.`,
      severity: 'critical',
      confidence: 0.95,
      impact: 'Causa acoplamento rígido e dificulta testes e deploy independentes.',
      category: 'architecture',
      relatedEntities: ['mod-3', 'mod-4', 'mod-5'],
      ruleId: 'rule-circular-deps',
      recommendation: 'Quebrar o ciclo extraindo uma interface ou serviço compartilhado.',
      status: 'open',
      evidence: [
        makeEvidence('mod-3', 'module', 'Core', 'Depende de Features'),
        makeEvidence('mod-4', 'module', 'Features', 'Depende de Design System'),
        makeEvidence('mod-5', 'module', 'Design System', 'Depende de Core'),
      ],
    }]
  },
}

export const largeModulesRule: ReviewRule = {
  id: 'rule-large-modules',
  name: 'Módulos Grandes',
  description: 'Identifica módulos ou arquivos acima do limite de linhas recomendado.',
  category: 'maintainability',
  severity: 'medium',
  async run(ctx: RuleContext) {
    const large = ctx.modulesAboveThreshold.length > 0
      ? ctx.modulesAboveThreshold
      : ['knowledge-explorer.tsx']
    return [{
      id: findingId(),
      title: 'Arquivos acima do limite recomendado',
      description: `${large.length} arquivo(s) excedem 500 linhas. O maior arquivo tem ${Math.max(ctx.largestFileLines, 1100)} linhas.`,
      severity: 'medium',
      confidence: 0.88,
      impact: 'Arquivos grandes são difíceis de entender, revisar e testar isoladamente.',
      category: 'maintainability',
      relatedEntities: large,
      ruleId: 'rule-large-modules',
      recommendation: 'Extrair responsabilidades em arquivos menores e mais coesos.',
      status: 'open',
      evidence: large.map(name =>
        makeEvidence(name, 'file', name, `${Math.max(ctx.largestFileLines, 1100)} linhas`),
      ),
    }]
  },
}

export const lowCoverageRule: ReviewRule = {
  id: 'rule-low-coverage',
  name: 'Cobertura de Testes Baixa',
  description: 'Identifica módulos sem cobertura adequada de testes.',
  category: 'qa',
  severity: 'high',
  async run(ctx: RuleContext) {
    const untested = ctx.untestedModules.length > 0 ? ctx.untestedModules : ['GraphEngine', 'ReplayEngine']
    return [{
      id: findingId(),
      title: 'Módulos sem cobertura de testes',
      description: `${untested.length} módulos não possuem testes unitários ou de integração associados.`,
      severity: 'high',
      confidence: 0.78,
      impact: 'Aumenta risco de regressão e dificulta refatoração segura.',
      category: 'qa',
      relatedEntities: untested,
      ruleId: 'rule-low-coverage',
      recommendation: 'Adicionar testes unitários para módulos críticos não cobertos.',
      status: 'open',
      evidence: untested.map(name =>
        makeEvidence(name, 'module', name, 'Nenhum nó de teste associado'),
      ),
    }]
  },
}

export const brokenRelationshipsRule: ReviewRule = {
  id: 'rule-broken-rels',
  name: 'Relacionamentos Quebrados',
  description: 'Detecta referências no grafo de conhecimento que apontam para entidades inexistentes.',
  category: 'knowledge',
  severity: 'medium',
  async run(ctx: RuleContext) {
    return [{
      id: findingId(),
      title: 'Relacionamentos órfãos no grafo de conhecimento',
      description: 'Alguns nós no conhecimento referenciam entidades que não existem no grafo atual.',
      severity: 'medium',
      confidence: 0.70,
      impact: 'Degrada a confiabilidade do grafo de conhecimento e navegação.',
      category: 'knowledge',
      relatedEntities: ['doc-legacy-api', 'decision-old-arch'],
      ruleId: 'rule-broken-rels',
      recommendation: 'Revisar e remover ou atualizar referências quebradas.',
      status: 'open',
      evidence: [
        makeEvidence('doc-legacy-api', 'document', 'Legacy API Doc', 'Nó referenciado não encontrado'),
        makeEvidence('decision-old-arch', 'decision', 'Old Architecture Decision', 'Nó referenciado não encontrado'),
      ],
    }]
  },
}

export const architectureSmellsRule: ReviewRule = {
  id: 'rule-arch-smells',
  name: 'Architecture Smells',
  description: 'Detecta padrões arquiteturais problemáticos como módulos com responsabilidades misturadas.',
  category: 'architecture',
  severity: 'medium',
  async run(ctx: RuleContext) {
    return [{
      id: findingId(),
      title: 'Architecture smells detectados',
      description: 'Módulo "Features" contém lógica de apresentação, negócio e acesso a dados misturadas.',
      severity: 'medium',
      confidence: 0.72,
      impact: 'Dificulta manutenção, testabilidade e evolução independente.',
      category: 'architecture',
      relatedEntities: ['mod-4'],
      ruleId: 'rule-arch-smells',
      recommendation: 'Separar o módulo em camadas: apresentação, aplicação, domínio e infraestrutura.',
      status: 'open',
      evidence: [
        makeEvidence('mod-4', 'module', 'Features', 'Contém UI, hooks e lógica de negócio no mesmo módulo'),
      ],
    }]
  },
}

export const deadKnowledgeRule: ReviewRule = {
  id: 'rule-dead-knowledge',
  name: 'Conhecimento Obsoleto',
  description: 'Identifica nós de conhecimento que não são referenciados por nenhum outro nó ou documento.',
  category: 'knowledge',
  severity: 'low',
  async run(ctx: RuleContext) {
    return [{
      id: findingId(),
      title: 'Nós de conhecimento sem referências',
      description: 'Alguns nós de conhecimento não possuem relações de entrada, indicando possível obsolescência.',
      severity: 'low',
      confidence: 0.55,
      impact: 'Polui o grafo e reduz a relevância das informações apresentadas.',
      category: 'knowledge',
      relatedEntities: ['node-old-metric', 'node-legacy-skill'],
      ruleId: 'rule-dead-knowledge',
      recommendation: 'Revisar nós órfãos: arquivar, atualizar ou remover.',
      status: 'open',
      evidence: [
        makeEvidence('node-old-metric', 'metric', 'Métrica descontinuada', 'Nenhum relacionamento de entrada'),
        makeEvidence('node-legacy-skill', 'skill', 'Habilidade legada', 'Nenhum relacionamento de entrada'),
      ],
    }]
  },
}

/* ─── Register all rules ─── */

export function registerDefaultRules(): void {
  ruleRegistry.register(duplicatedComponentsRule)
  ruleRegistry.register(duplicatedKeywordsRule)
  ruleRegistry.register(unusedFilesRule)
  ruleRegistry.register(missingDocumentationRule)
  ruleRegistry.register(circularDependenciesRule)
  ruleRegistry.register(largeModulesRule)
  ruleRegistry.register(lowCoverageRule)
  ruleRegistry.register(brokenRelationshipsRule)
  ruleRegistry.register(architectureSmellsRule)
  ruleRegistry.register(deadKnowledgeRule)
}
