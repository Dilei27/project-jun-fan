/**
 * Node Identity — assinatura visual de cada tipo de entidade.
 *
 * Filosofia:
 *  - Cada tipo é reconhecido sem leitura
 *  - Forma, halo e glyph são únicos
 *  - Nenhum elemento é decorativo — comunica papel
 */

import type { EntityType } from '@/core/types';

export type NodeShape =
  | 'circle'
  | 'hexagon'
  | 'rounded-square'
  | 'diamond'
  | 'shield'
  | 'star'
  | 'pill'
  | 'ring'
  | 'dashed-circle';

export interface NodeIdentity {
  type: EntityType | string;
  label: string;
  shape: NodeShape;
  baseRadius: number;
  haloRadius: number;
  haloIntensity: number; // 0..1
  glyph: string; // 1-3 chars
  glyphSize: number;
  innerPattern: 'fill' | 'ring' | 'dot' | 'lines' | 'gradient' | 'none';
  rimLight: boolean; // top-edge highlight
  pulse: 'none' | 'breathing' | 'pulse-dot' | 'slow-rotate';
  borderStyle: 'solid' | 'dashed' | 'double';
  labelMode: 'inside' | 'outside' | 'none';
}

export const nodeIdentity: Record<string, NodeIdentity> = {
  product: {
    type: 'product',
    label: 'Produto',
    shape: 'circle',
    baseRadius: 32,
    haloRadius: 2.6,
    haloIntensity: 0.55,
    glyph: '',
    glyphSize: 12,
    innerPattern: 'ring',
    rimLight: true,
    pulse: 'breathing',
    borderStyle: 'solid',
    labelMode: 'outside',
  },
  project: {
    type: 'project',
    label: 'Projeto',
    shape: 'circle',
    baseRadius: 26,
    haloRadius: 2.3,
    haloIntensity: 0.4,
    glyph: '',
    glyphSize: 10,
    innerPattern: 'gradient',
    rimLight: true,
    pulse: 'none',
    borderStyle: 'dashed',
    labelMode: 'outside',
  },
  agent: {
    type: 'agent',
    label: 'Agente',
    shape: 'hexagon',
    baseRadius: 22,
    haloRadius: 2.4,
    haloIntensity: 0.45,
    glyph: 'AI',
    glyphSize: 9,
    innerPattern: 'fill',
    rimLight: true,
    pulse: 'pulse-dot',
    borderStyle: 'solid',
    labelMode: 'inside',
  },
  doc: {
    type: 'doc',
    label: 'Documentação',
    shape: 'rounded-square',
    baseRadius: 20,
    haloRadius: 2.2,
    haloIntensity: 0.35,
    glyph: '¶',
    glyphSize: 12,
    innerPattern: 'fill',
    rimLight: true,
    pulse: 'none',
    borderStyle: 'solid',
    labelMode: 'outside',
  },
  architecture: {
    type: 'architecture',
    label: 'Arquitetura',
    shape: 'diamond',
    baseRadius: 22,
    haloRadius: 2.2,
    haloIntensity: 0.35,
    glyph: '',
    glyphSize: 9,
    innerPattern: 'lines',
    rimLight: true,
    pulse: 'none',
    borderStyle: 'solid',
    labelMode: 'inside',
  },
  decision: {
    type: 'decision',
    label: 'Decisão',
    shape: 'shield',
    baseRadius: 20,
    haloRadius: 2.2,
    haloIntensity: 0.4,
    glyph: 'ADR',
    glyphSize: 8,
    innerPattern: 'fill',
    rimLight: true,
    pulse: 'none',
    borderStyle: 'solid',
    labelMode: 'outside',
  },
  mission: {
    type: 'mission',
    label: 'Missão',
    shape: 'star',
    baseRadius: 20,
    haloRadius: 2.3,
    haloIntensity: 0.4,
    glyph: '',
    glyphSize: 8,
    innerPattern: 'dot',
    rimLight: true,
    pulse: 'slow-rotate',
    borderStyle: 'solid',
    labelMode: 'outside',
  },
  timeline: {
    type: 'timeline',
    label: 'Marco',
    shape: 'pill',
    baseRadius: 18,
    haloRadius: 2,
    haloIntensity: 0.3,
    glyph: '',
    glyphSize: 9,
    innerPattern: 'fill',
    rimLight: true,
    pulse: 'none',
    borderStyle: 'solid',
    labelMode: 'inside',
  },
  technology: {
    type: 'technology',
    label: 'Tecnologia',
    shape: 'ring',
    baseRadius: 14,
    haloRadius: 1.8,
    haloIntensity: 0.25,
    glyph: '',
    glyphSize: 8,
    innerPattern: 'none',
    rimLight: false,
    pulse: 'none',
    borderStyle: 'solid',
    labelMode: 'none',
  },
  skill: {
    type: 'skill',
    label: 'Skill',
    shape: 'circle',
    baseRadius: 12,
    haloRadius: 1.6,
    haloIntensity: 0.2,
    glyph: '',
    glyphSize: 7,
    innerPattern: 'fill',
    rimLight: false,
    pulse: 'none',
    borderStyle: 'solid',
    labelMode: 'none',
  },
  metric: {
    type: 'metric',
    label: 'Métrica',
    shape: 'ring',
    baseRadius: 16,
    haloRadius: 1.9,
    haloIntensity: 0.3,
    glyph: '',
    glyphSize: 8,
    innerPattern: 'dot',
    rimLight: false,
    pulse: 'pulse-dot',
    borderStyle: 'solid',
    labelMode: 'inside',
  },
  lab: {
    type: 'lab',
    label: 'Laboratório',
    shape: 'dashed-circle',
    baseRadius: 18,
    haloRadius: 2,
    haloIntensity: 0.2,
    glyph: '◇',
    glyphSize: 10,
    innerPattern: 'fill',
    rimLight: false,
    pulse: 'none',
    borderStyle: 'dashed',
    labelMode: 'inside',
  },
} as const;

export const entityColors: Record<string, string> = {
  product: '#4F8CFF',
  project: '#60A5FA',
  agent: '#FB923C',
  doc: '#EAB308',
  architecture: '#22D3EE',
  decision: '#C084FC',
  mission: '#4ADE80',
  timeline: '#34D399',
  technology: '#FACC15',
  skill: '#94A3B8',
  metric: '#FBBF24',
  lab: '#64748B',
};

export function getNodeIdentity(type: string): NodeIdentity {
  return nodeIdentity[type] || nodeIdentity.skill;
}

export function getNodeColor(type: string): string {
  return entityColors[type] || entityColors.skill;
}

/**
 * Curva de massa por tipo: produtos são "pesados" (centro), skills são "leves" (periferia)
 */
export const massByType: Record<string, number> = {
  product: 4.0,
  mission: 3.5,
  architecture: 3.0,
  project: 2.5,
  agent: 2.2,
  decision: 1.8,
  metric: 1.6,
  doc: 1.4,
  timeline: 1.2,
  technology: 0.8,
  lab: 0.6,
  skill: 0.5,
};

export function getNodeMass(type: string): number {
  return massByType[type] ?? 1.0;
}

/**
 * Ordem de entrada cinematográfica (foundation → periféricos)
 */
export const entryWaveByType: Record<string, number> = {
  mission: 0, // propósito primeiro
  product: 1, // produtos são fundação
  architecture: 1,
  project: 2, // projetos vêm dos produtos
  agent: 2,
  decision: 3, // decisões são consequência
  metric: 3,
  doc: 3,
  timeline: 4, // contexto
  technology: 4,
  lab: 4,
  skill: 5, // skills são periféricos
};

export function getEntryWave(type: string): number {
  return entryWaveByType[type] ?? 3;
}
