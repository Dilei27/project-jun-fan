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
    fogArchitect: '#102033',
    fogExplore: '#111D2B',
  },
  core: {
    // Layered energy reactor
    base: '#4B82B7',
    shellOuter: '#294966',
    shellMid: '#4B82B7',
    shellInner: '#67A9DD',
    energy: '#52D4F5',
    hot: '#D1F6FF',
    nucleus: '#E8FAFF',
    accent: '#66A9F0',
  },
  node: {
    // Material hierarchy
    dormant: '#345874',
    dormantRim: '#5682A8',
    structural: '#4B82B7',
    structuralRim: '#75B9F0',
    secondary: '#416987',
    secondaryRim: '#5E94BD',
    ringEdge: '#67A9DD',
    ringInner: '#52D4F5',
    triangleFace: '#345874',
    triangleEdge: '#67A9DD',
    triangleRim: '#75B9F0',
    active: '#52D4F5',
    selected: '#75E4FF',
    path: '#E8FAFF',
  },
  edge: {
    dormant: '#294966',
    dormantVisible: '#3E6687',
    structural: '#5A96C9',
    active: '#52D4F5',
    path: '#D1F6FF',
    pathCore: '#E8FAFF',
  },
  lighting: {
    ambient: 0.34,
    ambientArchitect: 0.4,
    key: '#C6E5FF',
    keyIntensity: 1.7,
    keyIntensityArchitect: 2,
    coreIntensity: 3.35,
    coreIntensityArchitect: 3.8,
    rimIntensity: 1.05,
  },
  halo: {
    color: '#52D4F5',
    opacity: 0.028,
    radius: 4.8,
  },
  particle: {
    color: '#52D4F5',
    opacity: 0.48,
  },
} as const;
