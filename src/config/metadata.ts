import { siteConfig } from './constants';

export function generateMetadata(title?: string, description?: string) {
  return {
    title: title ? `${title} — ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
  };
}
