export interface AutomationCatalogItem {
  id: string;
  tool: 'Cypress' | 'k6' | 'Playwright';
  title: string;
  repositoryUrl: string;
  documentationUrl: string;
  technologies: string[];
  evidence: string;
  relationNote: string;
}
