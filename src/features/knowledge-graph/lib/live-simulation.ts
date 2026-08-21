import { seedPositions, type SimEdge } from './force-simulation';

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
  homeX: number;
  homeY: number;
  phase: number;
}

export interface LiveSimulation {
  positions(): Map<string, { x: number; y: number }>;
  tick(): void;
  running(): boolean;
  beginDrag(id: string, x: number, y: number): void;
  dragTo(id: string, x: number, y: number): void;
  endDrag(id: string): void;
  applyMouse(point: { x: number; y: number } | null): void;
  reheat(value?: number): void;
}

const CFG = {
  repulsion: 1500,
  linkStrength: 0.05,
  centerPull: 0.0015,
  homeSpring: 0.0035,
  velocityDecay: 0.9,
  maxVelocity: 9,
  minDistance: 26,
  alphaStart: 1,
  alphaMin: 0.09,
  alphaDecay: 0.008,
  stepsPerTick: 1,
  warmupSteps: 120,
  warmupAlphaFloor: 0.6,
  residualAlpha: 0.5,
  dragAlpha: 0.4,
  releaseAlpha: 0.25,
  mouseRadius: 150,
  mousePush: 0.55,
  floatForce: 0.012,
};

function phaseFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash = hash & hash;
  }
  return (Math.abs(hash) % 628) / 100;
}

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
    homeX: n.x,
    homeY: n.y,
    phase: phaseFromId(n.id),
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
  let alpha = CFG.alphaStart;
  let tickCount = 0;
  let mouse: { x: number; y: number } | null = null;

  function step() {
    const cx = config.width / 2;
    const cy = config.height / 2;
    tickCount++;

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
      forces[node.idx].fx += (node.homeX - node.x) * CFG.homeSpring * node.mass;
      forces[node.idx].fy += (node.homeY - node.y) * CFG.homeSpring * node.mass;
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

    // Perpetual organic drift — the graph never sleeps
    for (const node of simNodes) {
      if (node.fx != null) continue;
      node.vx += Math.cos(tickCount * 0.025 + node.phase) * CFG.floatForce;
      node.vy += Math.sin(tickCount * 0.021 + node.phase * 1.3) * CFG.floatForce;
    }

    // Mouse repulsion — nodes flee the cursor like the QA Neural Graph
    if (mouse) {
      for (const node of simNodes) {
        if (node.fx != null) continue;
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0.5 && dist < CFG.mouseRadius) {
          const push = (1 - dist / CFG.mouseRadius) * CFG.mousePush;
          node.vx += (dx / dist) * push;
          node.vy += (dy / dist) * push;
        }
      }
    }

    alpha = Math.max(alpha * (1 - CFG.alphaDecay), CFG.alphaMin);
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
      return true;
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
      // Moving home means the node stays where you drop it
      n.homeX = x;
      n.homeY = y;
      alpha = Math.max(alpha, CFG.dragAlpha);
    },
    endDrag(id: string) {
      const n = byId.get(id);
      if (!n) return;
      n.fx = null;
      n.fy = null;
      alpha = Math.max(alpha, CFG.releaseAlpha);
    },
    applyMouse(point: { x: number; y: number } | null) {
      mouse = point;
    },
    reheat(value = 0.3) {
      alpha = Math.max(alpha, value);
    },
  };
}
