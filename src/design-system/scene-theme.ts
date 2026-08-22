import { tokens } from './tokens';

export const horizonScene = {
  environment: {
    background: tokens.colors.bg.deep,
    fog: tokens.colors.bg.base,
    atmosphere: tokens.colors.surface.default,
  },
  core: {
    base: '#7FA9D8',
    shell: '#315681',
    energy: '#45C7F2',
    accent: tokens.colors.accent.whatsapp,
    hot: '#E8FAFF',
  },
  node: {
    dormant: '#536B86',
    structural: '#31577F',
    selected: '#63E4F4',
    path: '#DDF8FF',
  },
  edge: {
    dormant: '#3B5673',
    architect: '#6285AD',
    active: '#42CBEA',
    path: '#DDF8FF',
  },
  lighting: {
    key: '#D6E6FF',
    ambient: 0.31,
    keyIntensity: 1.22,
    coreIntensity: 2.15,
  },
  motion: {
    coreRotation: 0.0037,
    nodeRotation: 0.00075,
    nodePulse: 0.035,
  },
} as const;

// Stark Energy Art Direction — Knowledge Graph ONLY
// Dark machine. Controlled energy. Readable architecture.
export const starkGraph = {
  environment: {
    fogArchitect: '#0B1522',
    fogExplore: '#0D1117',
  },
  core: {
    // Layered energy reactor
    base: '#315E91',
    shellOuter: '#1C2D46',
    shellMid: '#315E91',
    shellInner: '#3E78B8',
    energy: '#39BFEF',
    hot: '#BCEFFF',
    nucleus: '#E8FAFF',
    accent: '#4C8FE0',
  },
  node: {
    // Material hierarchy
    dormant: '#1F3854',
    dormantRim: '#2E4A6E',
    structural: '#315E91',
    structuralRim: '#4C8FE0',
    secondary: '#264060',
    secondaryRim: '#3A6A99',
    ringEdge: '#3E78B8',
    ringInner: '#39BFEF',
    triangleFace: '#1F3854',
    triangleEdge: '#3E78B8',
    triangleRim: '#4C8FE0',
    active: '#39BFEF',
    selected: '#4FD8FF',
    path: '#E8FAFF',
  },
  edge: {
    dormant: '#1C2D46',
    dormantVisible: '#243B5A',
    structural: '#315E91',
    active: '#39BFEF',
    path: '#BCEFFF',
    pathCore: '#E8FAFF',
  },
  lighting: {
    ambient: 0.22,
    ambientArchitect: 0.28,
    key: '#A8C8F0',
    keyIntensity: 1.45,
    keyIntensityArchitect: 1.75,
    coreIntensity: 2.8,
    coreIntensityArchitect: 3.2,
    rimIntensity: 0.85,
  },
  halo: {
    color: '#39BFEF',
    opacity: 0.018,
    radius: 4.8,
  },
  particle: {
    color: '#39BFEF',
    opacity: 0.35,
  },
} as const;
