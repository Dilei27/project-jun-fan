/**
 * Force Simulation — física orgânica para o Knowledge Graph.
 *
 * Princípios v2:
 *  - Distribuição inicial por anéis de tipo (não aglomerado central)
 *  - Ângulo dourado para espaçamento uniforme dentro de cada anel
 *  - Força de cluster por tipo (mantém categorias coesas)
 *  - Center gravity fraco (apenas coesão suave)
 *  - Estabilização por energia (não por iteração fixa)
 *  - 70-80% de ocupação do viewport
 */

import { getNodeMass } from './node-identity';

export interface SimNode {
  id: string;
  type: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number | null;
  fy?: number | null;
  mass: number;
}

export interface SimEdge {
  source: string;
  target: string;
  weight?: number;
}

export interface SimulationConfig {
  width: number;
  height: number;
  repulsion: number;
  attraction: number;
  center: number;
  cluster: number;
  damping: number;
  minDistance: number;
  maxVelocity: number;
  maxIterations: number;
  energyThreshold: number;
}

const DEFAULT_CONFIG: SimulationConfig = {
  width: 1400,
  height: 900,
  repulsion: 1800,
  attraction: 0.04,
  center: 0.0004,
  cluster: 0.003,
  damping: 0.88,
  minDistance: 18,
  maxVelocity: 8,
  maxIterations: 500,
  energyThreshold: 0.05,
};

/**
 * Anel por tipo (0 = centro, 5 = periferia).
 * Ring radius = ringIndex / maxRing * usableRadius
 */
const TYPE_RING: Record<string, number> = {
  mission: 0,
  product: 1,
  architecture: 1,
  project: 2,
  agent: 2,
  decision: 3,
  metric: 3,
  doc: 3,
  timeline: 4,
  technology: 4,
  lab: 4,
  skill: 5,
};
const MAX_RING = 5;

function deterministicRandom(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash = hash & hash;
  }
  return (Math.abs(hash) % 10000) / 10000;
}

/**
 * Target ring radius for a node type, as fraction of usable area.
 */
export function getTypeTargetRadius(type: string, width: number, height: number): number {
  const ring = TYPE_RING[type] ?? MAX_RING;
  const usable = Math.min(width, height) * 0.42;
  const t = (ring + 0.5) / (MAX_RING + 1);
  return t * usable;
}

/**
 * Seed positions using golden-angle spiral within type-based rings.
 * Each node type occupies its own ring; nodes within a ring are
 * distributed uniformly via the golden angle (137.5°).
 */
export function seedPositions(
  nodeIds: { id: string; type: string }[],
  width: number,
  height: number,
): SimNode[] {
  const cx = width / 2;
  const cy = height / 2;
  const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

  // Group nodes by type
  const byType = new Map<string, typeof nodeIds>();
  for (const n of nodeIds) {
    const list = byType.get(n.type);
    if (list) list.push(n);
    else byType.set(n.type, [n]);
  }

  const result: SimNode[] = [];
  for (const [, group] of byType) {
    const mass = getNodeMass(group[0].type);
    const targetR = getTypeTargetRadius(group[0].type, width, height);

    for (let i = 0; i < group.length; i++) {
      const { id, type } = group[i];
      const angle = i * GOLDEN_ANGLE + deterministicRandom(id) * 0.15;
      const ringSpread = Math.min(width, height) * 0.08;
      const r = targetR + (deterministicRandom(id + '-r') - 0.5) * ringSpread;
      result.push({
        id,
        type,
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: 0,
        vy: 0,
        mass,
      });
    }
  }

  return result;
}

/**
 * Single simulation step with all forces.
 */
function step(
  nodes: SimNode[],
  edges: SimEdge[],
  config: SimulationConfig,
  cooling: number,
): number {
  const forces: { fx: number; fy: number }[] = nodes.map(() => ({ fx: 0, fy: 0 }));
  const cx = config.width / 2;
  const cy = config.height / 2;

  // 1. Repulsion (Coulomb-like, Barnes-Hut simplification for N²)
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[j].x - nodes[i].x;
      const dy = nodes[j].y - nodes[i].y;
      const distSq = dx * dx + dy * dy;
      const dist = Math.max(Math.sqrt(distSq), 1);
      const minDist = config.minDistance;
      const effectiveDist = Math.max(dist, minDist);
      const collisionBoost = dist < minDist ? (minDist / dist) ** 2 : 1;
      const force = (config.repulsion * collisionBoost) / (effectiveDist * effectiveDist);
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      forces[i].fx -= fx;
      forces[i].fy -= fy;
      forces[j].fx += fx;
      forces[j].fy += fy;
    }
  }

  // 2. Attraction along edges (Hooke-like)
  for (const edge of edges) {
    const si = nodes.findIndex(n => n.id === edge.source);
    const ti = nodes.findIndex(n => n.id === edge.target);
    if (si === -1 || ti === -1) continue;
    const dx = nodes[ti].x - nodes[si].x;
    const dy = nodes[ti].y - nodes[si].y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 0.5) continue;
    const targetDist = 60 + (edge.weight ?? 1) * 20;
    const displacement = dist - targetDist;
    const force = displacement * config.attraction;
    const fx = (dx / dist) * force;
    const fy = (dy / dist) * force;
    const siMass = nodes[si].mass;
    const tiMass = nodes[ti].mass;
    const siFactor = 1 / siMass;
    const tiFactor = 1 / tiMass;
    forces[si].fx += fx * siFactor;
    forces[si].fy += fy * siFactor;
    forces[ti].fx -= fx * tiFactor;
    forces[ti].fy -= fy * tiFactor;
  }

  // 3. Cluster force — pull each node toward its type ring
  for (let i = 0; i < nodes.length; i++) {
    const targetR = getTypeTargetRadius(nodes[i].type, config.width, config.height);
    const dx = nodes[i].x - cx;
    const dy = nodes[i].y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 0.5) continue;
    const displacement = dist - targetR;
    const force = displacement * config.cluster;
    forces[i].fx -= (dx / dist) * force;
    forces[i].fy -= (dy / dist) * force;
  }

  // 4. Center gravity (very gentle cohesion)
  for (let i = 0; i < nodes.length; i++) {
    forces[i].fx += (cx - nodes[i].x) * config.center;
    forces[i].fy += (cy - nodes[i].y) * config.center;
  }

  // Integrate
  let totalEnergy = 0;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.fx != null && node.fy != null) {
      node.x = node.fx;
      node.y = node.fy;
      node.vx = 0;
      node.vy = 0;
      continue;
    }
    const ax = forces[i].fx / node.mass;
    const ay = forces[i].fy / node.mass;
    node.vx = (node.vx + ax * cooling) * config.damping;
    node.vy = (node.vy + ay * cooling) * config.damping;
    const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
    if (speed > config.maxVelocity) {
      const scale = config.maxVelocity / speed;
      node.vx *= scale;
      node.vy *= scale;
    }
    node.x += node.vx;
    node.y += node.vy;
    totalEnergy += speed * speed;
  }
  return totalEnergy / nodes.length;
}

/**
 * Run simulation synchronously until stable or max iterations.
 * Returns final node positions.
 */
export function runSimulation(
  nodes: { id: string; type: string }[],
  edges: SimEdge[],
  config: Partial<SimulationConfig> = {},
): SimNode[] {
  const cfg: SimulationConfig = { ...DEFAULT_CONFIG, ...config };
  const simNodes = seedPositions(nodes, cfg.width, cfg.height);

  for (let iter = 0; iter < cfg.maxIterations; iter++) {
    const cooling = 1 - (iter / cfg.maxIterations) * 0.9;
    const energy = step(simNodes, edges, cfg, cooling);
    if (energy < cfg.energyThreshold && iter > 20) break;
  }

  return simNodes;
}

/**
 * Compute bounding box from positions.
 */
export function computeBoundingBox(
  positions: Array<{ x: number; y: number }>,
  padding = 0,
): { minX: number; minY: number; maxX: number; maxY: number; centerX: number; centerY: number; width: number; height: number } {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of positions) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  minX -= padding;
  minY -= padding;
  maxX += padding;
  maxY += padding;
  return {
    minX, minY, maxX, maxY,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
    width: maxX - minX,
    height: maxY - minY,
  };
}

/**
 * Run simulation asynchronously with progressive rAF updates.
 */
export function createSimulationRunner(
  nodes: { id: string; type: string }[],
  edges: SimEdge[],
  config: Partial<SimulationConfig> = {},
  onProgress: (positions: Map<string, { x: number; y: number }>, progress: number) => void,
  onComplete: (positions: Map<string, { x: number; y: number }>) => void,
): { start: () => void; cancel: () => void } {
  const cfg: SimulationConfig = { ...DEFAULT_CONFIG, ...config };
  const simNodes = seedPositions(nodes, cfg.width, cfg.height);
  let iter = 0;
  let raf = 0;
  let cancelled = false;

  const tick = () => {
    if (cancelled) return;
    const stepsPerFrame = 3;
    for (let s = 0; s < stepsPerFrame && iter < cfg.maxIterations; s++) {
      const cooling = 1 - (iter / cfg.maxIterations) * 0.9;
      const energy = step(simNodes, edges, cfg, cooling);
      iter++;
      if (energy < cfg.energyThreshold && iter > 20) {
        iter = cfg.maxIterations;
        break;
      }
    }
    const map = new Map<string, { x: number; y: number }>();
    simNodes.forEach(n => map.set(n.id, { x: n.x, y: n.y }));
    const progress = Math.min(1, iter / cfg.maxIterations);
    onProgress(map, progress);
    if (iter < cfg.maxIterations) {
      raf = requestAnimationFrame(tick);
    } else {
      onComplete(map);
    }
  };

  return {
    start: () => {
      cancelled = false;
      raf = requestAnimationFrame(tick);
    },
    cancel: () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    },
  };
}
