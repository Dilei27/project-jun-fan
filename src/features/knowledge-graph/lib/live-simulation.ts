import { seedPositions, getTypeTargetRadius, type SimEdge } from './force-simulation';

export interface LiveSimNode {
  id: string;
  type: string;
  idx: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number | null;
  fy: number | null;
  mass: number;
  degree: number;
}

export interface LiveSimulation {
  positions(): Map<string, { x: number; y: number }>;
  tick(): void;
  running(): boolean;
  beginDrag(id: string, x: number, y: number): void;
  dragTo(id: string, x: number, y: number): void;
  endDrag(id: string): void;
  reheat(value?: number): void;
}

const CFG = {
  repulsion: 2400,
  linkStrength: 0.05,
  centerPull: 0.0022,
  clusterPull: 0.0007,
  velocityDecay: 0.72,
  maxVelocity: 14,
  minDistance: 22,
  alphaDecay: 0.012,
  alphaMin: 0.02,
  stepsPerTick: 2,
  warmupSteps: 70,
  warmupAlphaFloor: 0.5,
  residualAlpha: 0.55,
  dragAlpha: 0.45,
  dragMoveAlpha: 0.35,
  releaseAlpha: 0.28,
};

export function createLiveSimulation(
  nodes: { id: string; type: string }[],
  edges: SimEdge[],
  config: { width: number; height: number } = { width: 1400, height: 900 },
): LiveSimulation {
  const seeded = seedPositions(nodes, config.width, config.height);
  const simNodes: LiveSimNode[] = seeded.map((n, i) => ({
    id: n.id,
    type: n.type,
    idx: i,
    x: n.x,
    y: n.y,
    vx: 0,
    vy: 0,
    fx: null,
    fy: null,
    mass: n.mass,
    degree: 0,
  }));
  const byId = new Map(simNodes.map(n => [n.id, n]));

  const degree = new Map<string, number>();
  const links: Array<{ s: LiveSimNode; t: LiveSimNode; target: number }> = [];
  for (const edge of edges) {
    const s = byId.get(edge.source);
    const t = byId.get(edge.target);
    if (!s || !t) continue;
    degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1);
    degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1);
    links.push({ s, t, target: 0 });
  }
  for (const n of simNodes) n.degree = degree.get(n.id) ?? 0;
  for (const l of links) l.target = 85 + Math.min((l.s.degree + l.t.degree) * 4, 120);

  const forces: { fx: number; fy: number }[] = simNodes.map(() => ({ fx: 0, fy: 0 }));
  let alpha = 1;

  function step() {
    const cx = config.width / 2;
    const cy = config.height / 2;

    for (let i = 0; i < forces.length; i++) {
      forces[i].fx = 0;
      forces[i].fy = 0;
    }

    for (let i = 0; i < simNodes.length; i++) {
      for (let j = i + 1; j < simNodes.length; j++) {
        const a = simNodes[i];
        const b = simNodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const boost = dist < CFG.minDistance ? (CFG.minDistance / dist) ** 2 : 1;
        const strength = (CFG.repulsion * boost * (a.mass + b.mass) * 0.5) / (dist * dist);
        const fx = (dx / dist) * strength;
        const fy = (dy / dist) * strength;
        forces[a.idx].fx -= fx;
        forces[a.idx].fy -= fy;
        forces[b.idx].fx += fx;
        forces[b.idx].fy += fy;
      }
    }

    for (const link of links) {
      const dx = link.t.x - link.s.x;
      const dy = link.t.y - link.s.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.5) continue;
      const displacement = dist - link.target;
      const force = displacement * CFG.linkStrength;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      const sFactor = 1 / link.s.mass;
      const tFactor = 1 / link.t.mass;
      forces[link.s.idx].fx += fx * sFactor;
      forces[link.s.idx].fy += fy * sFactor;
      forces[link.t.idx].fx -= fx * tFactor;
      forces[link.t.idx].fy -= fy * tFactor;
    }

    for (const node of simNodes) {
      const targetR = getTypeTargetRadius(node.type, config.width, config.height);
      const dx = node.x - cx;
      const dy = node.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.5) continue;
      const pull = (dist - targetR) * CFG.clusterPull;
      forces[node.idx].fx -= (dx / dist) * pull * node.mass;
      forces[node.idx].fy -= (dy / dist) * pull * node.mass;
    }

    for (const node of simNodes) {
      forces[node.idx].fx += (cx - node.x) * CFG.centerPull * node.mass;
      forces[node.idx].fy += (cy - node.y) * CFG.centerPull * node.mass;
    }

    for (const node of simNodes) {
      if (node.fx != null && node.fy != null) {
        node.x = node.fx;
        node.y = node.fy;
        node.vx = 0;
        node.vy = 0;
        continue;
      }
      const ax = forces[node.idx].fx / node.mass;
      const ay = forces[node.idx].fy / node.mass;
      node.vx = (node.vx + ax * alpha) * CFG.velocityDecay;
      node.vy = (node.vy + ay * alpha) * CFG.velocityDecay;
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (speed > CFG.maxVelocity) {
        const scale = CFG.maxVelocity / speed;
        node.vx *= scale;
        node.vy *= scale;
      }
      node.x += node.vx;
      node.y += node.vy;
    }

    alpha = Math.max(alpha * (1 - CFG.alphaDecay), 0);
  }

  for (let i = 0; i < CFG.warmupSteps; i++) {
    alpha = Math.max(alpha, CFG.warmupAlphaFloor);
    step();
  }
  alpha = CFG.residualAlpha;

  return {
    positions() {
      const map = new Map<string, { x: number; y: number }>();
      for (const n of simNodes) map.set(n.id, { x: n.x, y: n.y });
      return map;
    },
    tick() {
      for (let i = 0; i < CFG.stepsPerTick; i++) step();
    },
    running() {
      if (alpha > CFG.alphaMin) return true;
      return simNodes.some(n => n.fx != null);
    },
    beginDrag(id: string, x: number, y: number) {
      const n = byId.get(id);
      if (!n) return;
      n.fx = x;
      n.fy = y;
      n.x = x;
      n.y = y;
      n.vx = 0;
      n.vy = 0;
      alpha = Math.max(alpha, CFG.dragAlpha);
    },
    dragTo(id: string, x: number, y: number) {
      const n = byId.get(id);
      if (!n) return;
      n.fx = x;
      n.fy = y;
      alpha = Math.max(alpha, CFG.dragMoveAlpha);
    },
    endDrag(id: string) {
      const n = byId.get(id);
      if (!n) return;
      n.fx = null;
      n.fy = null;
      alpha = Math.max(alpha, CFG.releaseAlpha);
    },
    reheat(value = 0.3) {
      alpha = Math.max(alpha, value);
    },
  };
}
