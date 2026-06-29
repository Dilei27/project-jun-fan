/* ─── Types ─── */

export interface CareerEntry {
  id: string
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
  results: string[]
  knowledge: string[]
  projects: string[]
  highlight: boolean
}

export interface EngineeringPillar {
  id: string
  title: string
  description: string
  color: string
  icon: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level: 'expert' | 'advanced' | 'intermediate'
  projects: string[]
  color: string
}

export interface ImpactMetric {
  label: string
  value: number
  suffix: string
  description: string
  color: string
}

export interface FeaturedProject {
  id: string
  title: string
  summary: string
  technologies: string[]
  status: 'active' | 'concluded' | 'maintained'
  link: string
  color: string
}

export interface PhilosophyStatement {
  id: string
  statement: string
  explanation: string
  color: string
}

export interface ContactInfo {
  github: string
  linkedin: string
  email: string
}

export interface ProfileData {
  name: string
  title: string
  subtitles: string[]
  tagline: string
  bio: string
  career: CareerEntry[]
  pillars: EngineeringPillar[]
  skills: Skill[]
  impactMetrics: ImpactMetric[]
  featuredProjects: FeaturedProject[]
  philosophy: PhilosophyStatement[]
  contact: ContactInfo
}

/* ─── Data ─── */

export const PROFILE: ProfileData = {
  name: 'Odirlei Alves',
  title: 'QA Engineer & Automation Architect',
  subtitles: [
    'Engineering Intelligence Builder',
    'Knowledge-Driven Developer',
  ],
  tagline: 'Building software through knowledge, quality and automation.',
  bio: 'QA Engineer especializado em automação de testes, arquitetura de qualidade e engenharia de conhecimento. Criador do Project Jun Fan — uma plataforma inteligente que transforma software em conhecimento vivo.',

  career: [
    {
      id: 'junfan',
      company: 'Project Jun Fan',
      role: 'Criador & Arquiteto',
      period: '2025 — Presente',
      description: 'Criação de uma plataforma de inteligência de engenharia que une conhecimento, qualidade e arquitetura em um ecossistema vivo. Liderança técnica de todas as frentes: Knowledge Graph, Engineering Twin, Repository Intelligence, Review Engine e Living Profile.',
      technologies: ['Next.js', 'TypeScript', 'React', 'Framer Motion', 'Tailwind CSS', 'Design System'],
      results: [
        'Plataforma com 40+ páginas estáticas e zero erros de build',
        'Knowledge Graph com clusters, replay engine e hover vivo',
        'Engineering Review Engine com 10 regras de análise',
        'Repository Intelligence Engine para análise estrutural',
      ],
      knowledge: ['Arquitetura de software', 'Knowledge Engineering', 'Design Systems', 'Visualização de dados', 'Domain-driven design'],
      projects: ['Project Jun Fan', 'QA Command Center', 'Engineering Twin'],
      highlight: true,
    },
    {
      id: 'blueservice',
      company: 'Blue Service',
      role: 'Analista de Testes e Automação',
      period: '2023 — 2025',
      description: 'Responsável pela estratégia de automação de testes em aplicações ERP desktop e web. Criação de frameworks do zero, integração com pipelines CI/CD e mentoria técnica do time de qualidade.',
      technologies: ['Robot Framework', 'Python', 'Cypress', 'Playwright', 'Azure DevOps', 'k6', 'ERP Desktop'],
      results: [
        'Criação de pipeline de testes automatizados do zero',
        'Cobertura de testes crítica em aplicação ERP legada',
        'Redução de 70% no tempo de execução de testes',
        'Integração contínua com Azure DevOps',
      ],
      knowledge: ['Automação de testes', 'ERP Desktop', 'CI/CD pipelines', 'Testes de performance com k6', 'Mentoria técnica'],
      projects: ['ERP Automation', 'Test Framework Architecture'],
      highlight: false,
    },
    {
      id: 'bankme',
      company: 'Bankme',
      role: 'Analista de Automação de Testes',
      period: '2023 — 2023',
      description: 'Atuação em testes automatizados em aplicações financeiras, com foco em confiabilidade, rastreabilidade e qualidade de dados.',
      technologies: ['Robot Framework', 'Python', 'Postman', 'Azure DevOps', 'SQL'],
      results: [
        'Implementação de suite de testes para pipeline financeiro',
        'Criação de relatórios automatizados de qualidade',
        'Melhoria na rastreabilidade de defeitos',
      ],
      knowledge: ['Testes em sistemas financeiros', 'Qualidade de dados', 'Relatórios de qualidade'],
      projects: ['Financial Test Suite'],
      highlight: false,
    },
    {
      id: 'globaltec',
      company: 'Globaltec',
      role: 'Analista de Automação de Testes',
      period: '2021 — 2023',
      description: 'Atuação em testes de sistemas ERP web e desktop. Desenvolvimento de keywords customizadas Robot Framework, automação de fluxos críticos e integração com ferramentas de gestão de qualidade.',
      technologies: ['Robot Framework', 'Python', 'Postman', 'ERP', 'SQL', 'Azure DevOps'],
      results: [
        'Criação de biblioteca de keywords para ERP',
        'Automação de mais de 200 casos de teste',
        'Redução de esforço manual em 60%',
      ],
      knowledge: ['ERP Web', 'Custom Robot libraries', 'Test management', 'Banco de dados SQL'],
      projects: ['ERP Automation'],
      highlight: false,
    },
  ],

  pillars: [
    {
      id: 'quality',
      title: 'Quality Engineering',
      description: 'Qualidade como disciplina de engenharia, não como etapa final. Testes, métricas e monitoramento integrados ao ciclo de desenvolvimento.',
      color: '#22C55E',
      icon: 'Q',
    },
    {
      id: 'automation',
      title: 'Automação',
      description: 'Automação com propósito: reduzir esforço repetitivo, aumentar confiabilidade e liberar tempo para análise crítica.',
      color: '#4F8CFF',
      icon: 'A',
    },
    {
      id: 'architecture',
      title: 'Arquitetura',
      description: 'Sistemas pensados para evoluir. Arquitetura como organismo vivo, não como planta engessada.',
      color: '#C084FC',
      icon: '†',
    },
    {
      id: 'knowledge',
      title: 'Knowledge Engineering',
      description: 'Conhecimento como ativo principal. Plataformas que aprendem, conectam e evoluem com o time.',
      color: '#EAB308',
      icon: 'K',
    },
    {
      id: 'ai',
      title: 'Inteligência Artificial',
      description: 'IA aplicada à engenharia: automação inteligente, análise preditiva e assistência contextual.',
      color: '#FB923C',
      icon: 'AI',
    },
    {
      id: 'devops',
      title: 'DevOps',
      description: 'Integração contínua, entrega confiável e infraestrutura como código. Qualidade desde o commit.',
      color: '#22D3EE',
      icon: 'D',
    },
  ],

  skills: [
    { id: 'robot-framework', name: 'Robot Framework', category: 'Automation', level: 'expert', projects: ['ERP Automation', 'Test Framework Architecture', 'Financial Test Suite'], color: '#4F8CFF' },
    { id: 'python', name: 'Python', category: 'Language', level: 'advanced', projects: ['ERP Automation', 'Test Framework Architecture', 'Financial Test Suite'], color: '#EAB308' },
    { id: 'playwright', name: 'Playwright', category: 'Automation', level: 'advanced', projects: ['ERP Automation', 'Playwright Challenge'], color: '#22C55E' },
    { id: 'cypress', name: 'Cypress', category: 'Automation', level: 'advanced', projects: ['ERP Automation'], color: '#22D3EE' },
    { id: 'typescript', name: 'TypeScript', category: 'Language', level: 'advanced', projects: ['Project Jun Fan', 'QA Command Center'], color: '#4F8CFF' },
    { id: 'nextjs', name: 'Next.js', category: 'Framework', level: 'advanced', projects: ['Project Jun Fan'], color: '#687385' },
    { id: 'react', name: 'React', category: 'Framework', level: 'advanced', projects: ['Project Jun Fan', 'QA Command Center'], color: '#22D3EE' },
    { id: 'azure-devops', name: 'Azure DevOps', category: 'CI/CD', level: 'expert', projects: ['ERP Automation', 'Test Framework Architecture', 'Financial Test Suite'], color: '#4F8CFF' },
    { id: 'k6', name: 'k6', category: 'Performance', level: 'intermediate', projects: ['ERP Automation'], color: '#FB923C' },
    { id: 'postman', name: 'Postman', category: 'API', level: 'advanced', projects: ['ERP Automation', 'Financial Test Suite'], color: '#FB923C' },
    { id: 'sql', name: 'SQL', category: 'Data', level: 'advanced', projects: ['ERP Automation', 'Financial Test Suite'], color: '#C084FC' },
    { id: 'llm', name: 'LLMs', category: 'AI', level: 'intermediate', projects: ['Project Jun Fan'], color: '#22C55E' },
    { id: 'framer-motion', name: 'Framer Motion', category: 'Animation', level: 'advanced', projects: ['Project Jun Fan'], color: '#C084FC' },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'Styling', level: 'advanced', projects: ['Project Jun Fan'], color: '#22D3EE' },
    { id: 'knowledge-graph', name: 'Knowledge Graph', category: 'Architecture', level: 'advanced', projects: ['Project Jun Fan'], color: '#EAB308' },
    { id: 'erp', name: 'ERP Desktop', category: 'Domain', level: 'advanced', projects: ['ERP Automation'], color: '#687385' },
  ],

  impactMetrics: [
    { label: 'Pipelines criados', value: 12, suffix: '', description: 'Pipelines de CI/CD do zero', color: '#4F8CFF' },
    { label: 'Automações', value: 350, suffix: '+', description: 'Casos de teste automatizados', color: '#22C55E' },
    { label: 'Projetos', value: 8, suffix: '', description: 'Projetos de engenharia', color: '#C084FC' },
    { label: 'Tecnologias', value: 16, suffix: '', description: 'Linguagens, frameworks e ferramentas', color: '#EAB308' },
    { label: 'Redução de esforço', value: 70, suffix: '%', description: 'Redução em execução manual', color: '#FB923C' },
  ],

  featuredProjects: [
    {
      id: 'jun-fan',
      title: 'Project Jun Fan',
      summary: 'Plataforma de inteligência de engenharia. Knowledge Graph, Digital Twin, Repository Intelligence, Review Engine, Living Profile e muito mais.',
      technologies: ['Next.js', 'TypeScript', 'React', 'Framer Motion', 'Tailwind CSS'],
      status: 'active',
      link: '/',
      color: '#4F8CFF',
    },
    {
      id: 'qa-command-center',
      title: 'QA Command Center',
      summary: 'Central de qualidade com dashboards, métricas e visualização de resultados de teste.',
      technologies: ['Next.js', 'TypeScript', 'React'],
      status: 'active',
      link: '/command-center',
      color: '#22C55E',
    },
    {
      id: 'playwright-challenge',
      title: 'Playwright Challenge',
      summary: 'Desafio técnico de automação com Playwright, demonstrando boas práticas de Page Objects, fixtures e relatórios.',
      technologies: ['Playwright', 'TypeScript', 'Node.js'],
      status: 'concluded',
      link: '#',
      color: '#22D3EE',
    },
    {
      id: 'api-challenge',
      title: 'API Challenge',
      summary: 'Desafio de automação de API com Robot Framework, validando contratos e fluxos de negócio.',
      technologies: ['Robot Framework', 'Python', 'Postman'],
      status: 'concluded',
      link: '#',
      color: '#FB923C',
    },
  ],

  philosophy: [
    {
      id: 'knowledge-first',
      statement: 'Knowledge first.',
      explanation: 'Antes de automatizar, documentar ou testar, é preciso entender. Conhecimento estruturado é a base de toda engenharia sólida.',
      color: '#EAB308',
    },
    {
      id: 'automation-purpose',
      statement: 'Automation with purpose.',
      explanation: 'Automação não é sobre substituir pessoas. É sobre eliminar repetição para que pessoas possam pensar. Cada teste automatizado deve responder a uma pergunta de negócio.',
      color: '#4F8CFF',
    },
    {
      id: 'living-architecture',
      statement: 'Architecture as a living system.',
      explanation: 'Arquitetura não é planta. É organismo. Deve evoluir com o conhecimento, com o time e com os problemas que resolve.',
      color: '#C084FC',
    },
    {
      id: 'observable-quality',
      statement: 'Quality is observable.',
      explanation: 'Qualidade não se define, se observa. Métricas, dashboards e visualizações transformam qualidade subjetiva em engenharia objetiva.',
      color: '#22C55E',
    },
    {
      id: 'evolving-docs',
      statement: 'Documentation must evolve.',
      explanation: 'Documentação parada é dívida técnica. Documentação viva é conhecimento que anda junto com o código.',
      color: '#22D3EE',
    },
  ],

  contact: {
    github: 'https://github.com/anomalyco',
    linkedin: 'https://linkedin.com/in/odirlei-alves',
    email: 'odirlei.alves@email.com',
  },
}
