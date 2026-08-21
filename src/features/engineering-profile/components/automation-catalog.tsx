import { ExternalLink, GitFork } from 'lucide-react';
import catalog from '@/content/automation-catalog.json';
import type { AutomationCatalogItem } from '@/types';

const automationCatalog = catalog as AutomationCatalogItem[];

export function AutomationCatalog() {
  return (
    <section
      className="rounded-xl p-5"
      style={{
        background: 'rgba(17, 24, 33, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(244, 247, 250, 0.04)',
      }}
      aria-labelledby="automation-catalog-title"
    >
      <div className="flex items-center gap-1.5 mb-1">
        <GitFork size={12} className="text-accent-qa" />
        <h2 id="automation-catalog-title" className="text-[12px] font-semibold uppercase tracking-wider text-text-muted">
          Automações em destaque
        </h2>
      </div>
      <p className="text-[13px] text-text-muted/70 mb-4">
        Repositórios públicos curados como evidência técnica do ecossistema.
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        {automationCatalog.map(item => (
          <article key={item.id} className="rounded-lg border border-border-subtle/50 bg-surface-default/50 p-3">
            <span className="text-[10px] font-medium uppercase tracking-wider text-accent-qa">{item.tool}</span>
            <h3 className="mt-1 text-sm font-medium text-text-primary">{item.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-text-muted">{item.evidence}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {item.technologies.map(technology => (
                <span key={technology} className="rounded bg-surface-soft px-1.5 py-0.5 text-[10px] text-text-secondary">
                  {technology}
                </span>
              ))}
            </div>
            <div className="mt-3 flex gap-3 text-xs">
              <a href={item.repositoryUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent-qa hover:underline">
                Repositório <ExternalLink size={11} />
              </a>
              <a href={item.documentationUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent-qa hover:underline">
                Evidência <ExternalLink size={11} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
