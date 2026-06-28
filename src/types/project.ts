export interface Project {
  id: string;
  title: string;
  context: string;
  problem: string;
  solution: string;
  stack: string[];
  impact: string;
  status: string;
  decisions: string[];
  links: { docs: string; repo: string };
}
