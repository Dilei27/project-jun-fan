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
