export interface Decision {
  id: string;
  context: string;
  decision: string;
  rationale: string;
  tradeoffs: string;
  impact: string;
}

export interface SkillCategory {
  area: string;
  skills: string[];
  nivel: 'avancado' | 'intermediario' | 'iniciante';
}

export interface DocSection {
  heading: string;
  content: string;
}

export interface Doc {
  id: string;
  title: string;
  description: string;
  sections: DocSection[];
}
