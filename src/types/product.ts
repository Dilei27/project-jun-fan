export interface Product {
  id: string;
  name: string;
  status: 'online' | 'beta' | 'dev';
  shortDescription: string;
  problem: string;
  solution: string;
  accentColor: string;
  stack: string[];
  architectureFlow: string;
  metrics: Record<string, number>;
  roadmap: string[];
  links: { docs: string; repo: string };
}
