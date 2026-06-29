/**
 * Force Simulation — física orgânica para o Knowledge Graph.
 *
 * Princípios:
 *  - Massa por tipo: produtos pesados, skills leves
 *  - Inércia: momentum preservado (velocity-based)
 *  - Atrito: damping configurável
 *  - Distância mínima: collision prevention
 *  - Gravidade ao centro: mantém coesão
 *  - Iteração via rAF (não bloqueia main thread)
 */

import { getNodeMass } from './node-identity';

export interface SimNode {
  id: string;
  type: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number | null; // fixed position (pinned)
  fy?: number | null;
  mass: number;
}

export interface SimEdge {
  source: string;
  target: string;
  weight?: number; // 0..1, thicker = stronger attraction
}

export interface SimulationConfig {
  width: number;
  height: number;
  repulsion: number;
  attraction: number;
  center: number;
  damping: number;
  minDistance: number;
  maxVelocity: number;
  iterations: number;
}

const DEFAULT_CONFIG: SimulationConfig = {
  width: 1200,
  height: 800,
  repulsion: 4200,
  attraction: 0.012,
  center: 0.0045,
  damping: 0.86,
  minDistance: 36,
  maxVelocity: 12,
  iterations: 140,
};

/**
 * Execute a single iteration step. Returns delta positions.
 */
function step(
  nodes: SimNode[],
  edges: SimEdge[],
  config: SimulationConfig,
  cooling: number,
): void {
  const forces: { fx: number; fy: number }[] = nodes.map(() => ({ fx: 0, fy: 0 }));

  // Repulsion (Coulomb-like)
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[j].x - nodes[i].x;
      const dy = nodes[j].y - nodes[i].y;
      const distSq = dx * dx + dy * dy;
      const dist = Math.max(Math.sqrt(distSq), 1);
      const minDist = config.minDistance;
      const effectiveDist = Math.max(dist, minDist);
      // Strong repulsion when too close (collision prevention)
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

  // Attraction (Hooke-like along edges)
  for (const edge of edges) {
    const si = nodes.findIndex(n => n.id === edge.source);
    const ti = nodes.findIndex(n => n.id === edge.target);
    if (si === -1 || ti === -1) continue;
    const dx = nodes[ti].x - nodes[si].x;
    const dy = nodes[ti].y - nodes[si].y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 0.5) continue;
    const targetDist = 100 + (edge.weight ?? 1) * 30;
    const displacement = dist - targetDist;
    const force = displacement * config.attraction;
    const fx = (dx / dist) * force;
    const fy = (dy / dist) * force;
    // Lightweight nodes get pulled more
    const siMass = nodes[si].mass;
    const tiMass = nodes[ti].mass;
    const siFactor = 1 / siMass;
    const tiFactor = 1 / tiMass;
    forces[si].fx += fx * siFactor;
    forces[si].fy += fy * siFactor;
    forces[ti].fx -= fx * tiFactor;
    forces[ti].fy -= fy * tiFactor;
  }

  // Center gravity (cohesion)
  for (let i = 0; i < nodes.length; i++) {
    forces[i].fx += (config.width / 2 - nodes[i].x) * config.center;
    forces[i].fy += (config.height / 2 - nodes[i].y) * config.center;
  }

  // Integrate (with mass, damping, max velocity)
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.fx != null && node.fy != null) {
      node.x = node.fx;
      node.y = node.fy;
      node.vx = 0;
      node.vy = 0;
      continue;
    }
    // a = F / m
    const ax = forces[i].fx / node.mass;
    const ay = forces[i].fy / node.mass;
    node.vx = (node.vx + ax * cooling) * config.damping;
    node.vy = (node.vy + ay * cooling) * config.damping;
    // Cap velocity
    const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
    if (speed > config.maxVelocity) {
      const scale = config.maxVelocity / speed;
      node.vx *= scale;
      node.vy *= scale;
    }
    node.x += node.vx;
    node.y += node.vy;
  }
}

/**
 * Deterministic hash from a string → 0..1.
 */
function deterministicRandom(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash = hash & hash;
  }
  return (Math.abs(hash) % 10000) / 10000;
}

/**
 * Seed initial positions for a graph.
 * Place nodes in concentric rings by mass (heavier in center).
 */
export function seedPositions(
  nodeIds: { id: string; type: string }[],
  width: number,
  height: number,
): SimNode[] {
  const cx = width / 2;
  const cy = height / 2;
  return nodeIds.map(({ id, type }, i) => {
    const angle = (i / nodeIds.length) * Math.PI * 2 + deterministicRandom(id) * 0.4;
    const mass = getNodeMass(type);
    // Heavier nodes closer to center
    const radiusFromMass = (1 / mass) * Math.min(width, height) * 0.4;
    const jitter = deterministicRandom(id + '-jitter') * 80;
    return {
      id,
      type,
      x: cx + Math.cos(angle) * (radiusFromMass + jitter),
      y: cy + Math.sin(angle) * (radiusFromMass + jitter),
      vx: 0,
      vy: 0,
      mass,
    };
  });
}

/**
 * Run simulation synchronously (used in useMemo).
 */
export function runSimulation(
  nodes: { id: string; type: string }[],
  edges: SimEdge[],
  config: Partial<SimulationConfig> = {},
): SimNode[] {
  const cfg: SimulationConfig = { ...DEFAULT_CONFIG, ...config };
  const simNodes = seedPositions(nodes, cfg.width, cfg.height);
  for (let iter = 0; iter < cfg.iterations; iter++) {
    const cooling = 1 - (iter / cfg.iterations) * 0.85;
    step(simNodes, edges, cfg, cooling);
  }
  return simNodes;
}

/**
 * Run simulation asynchronously with rAF, returning positions progressively.
 * Used for animated entry.
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
    for (let s = 0; s < stepsPerFrame && iter < cfg.iterations; s++) {
      const cooling = 1 - (iter / cfg.iterations) * 0.85;
      step(simNodes, edges, cfg, cooling);
      iter++;
    }
    const positions = new Map<string, { x: number; y: number }>();
    simNodes.forEach(n => positions.set(n.id, { x: n.x, y: n.y }));
    onProgress(positions, iter / cfg.iterations);
    if (iter < cfg.iterations) {
      raf = requestAnimationFrame(tick);
    } else {
      onComplete(positions);
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
