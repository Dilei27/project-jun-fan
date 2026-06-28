export const APP_NAME = 'Jun Fan';
export const PROJECT_NAME = 'Project Jun Fan';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const ENABLE_AI_DOCK = process.env.NEXT_PUBLIC_ENABLE_AI_DOCK === 'true';
export const AI_DOCK_MODE = process.env.NEXT_PUBLIC_AI_DOCK_MODE || 'mock';
export const ENABLE_COMMAND_PALETTE = process.env.NEXT_PUBLIC_ENABLE_COMMAND_PALETTE !== 'false';

export const siteConfig = {
  name: APP_NAME,
  project: PROJECT_NAME,
  description: 'Plataforma front-end first de produtos, documentação e experiências técnicas.',
  url: APP_URL,
  author: 'Odirlei Alves',
} as const;
