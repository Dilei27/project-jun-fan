import Link from 'next/link';
import { ArrowLeft, ExternalLink, FlaskConical } from 'lucide-react';
import { PageEntry } from '@/components/shared/page-entry';
import historicalQa from '@/content/historical-qa.json';

export default function HistoricalQaPage() {
  return (
    <PageEntry className="max-w-[1440px] mx-auto px-6 py-10">
      <Link
        href="/command-center/projects/"
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={14} /> Projetos
      </Link>

      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-qa/30 bg-accent-qa/8 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-qa mb-4">
          <FlaskConical size={14} /> Arquivo técnico
        </div>
        <h1 className="text-3xl font-extrabold text-text-primary mb-3 tracking-[-0.025em]">
          Projetos históricos de QA
        </h1>
        <p className="text-text-secondary leading-7">
          Laboratórios, desafios e automações que formaram a base prática do ecossistema Jun Fan.
          Eles ficam separados dos produtos atuais para preservar contexto e hierarquia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {historicalQa.map(project => (
          <article
            key={project.title}
            className="jf-lift flex flex-col rounded-lg border border-border-subtle/60 bg-surface-default/80 p-5"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="rounded-md border border-border-subtle/60 bg-surface-soft px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                {project.category}
              </span>
              <span className="text-xs text-text-muted">arquivo</span>
            </div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">{project.title}</h2>
            <p className="text-sm leading-6 text-text-secondary mb-4">{project.summary}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map(item => (
                <span key={item} className="rounded-md border border-border-subtle/60 px-2 py-1 text-xs text-text-muted">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-3 text-sm">
              {project.documentationUrl && (
                <a
                  href={project.documentationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-accent-qa hover:text-text-primary transition-colors"
                >
                  Documentação <ExternalLink size={14} />
                </a>
              )}
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors"
              >
                Repositório <ExternalLink size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </PageEntry>
  );
}
