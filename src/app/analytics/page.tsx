import { getProducts, getProjects, getDocs, getDecisions } from '@/lib/content';
import { FileText, GitBranch, Lightbulb, Layers } from 'lucide-react';

export default function AnalyticsPage() {
  const products = getProducts();
  const projects = getProjects();
  const docs = getDocs();
  const decisions = getDecisions();

  const stats = [
    { label: 'Produtos', value: products.length, icon: Layers },
    { label: 'Projetos', value: projects.length, icon: GitBranch },
    { label: 'Documentos', value: docs.length, icon: FileText },
    { label: 'Decisões', value: decisions.length, icon: Lightbulb },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-text-primary mb-2">Analytics</h1>
      <p className="text-text-secondary mb-8 max-w-xl">Visão geral do ecossistema Jun Fan.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="p-5 bg-surface-default border border-border-subtle rounded-lg text-center">
              <Icon size={20} className="text-accent-qa mx-auto mb-2" />
              <div className="text-3xl font-bold text-text-primary">{stat.value}</div>
              <div className="text-sm text-text-muted mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-5 bg-surface-default border border-border-subtle rounded-lg">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Produtos</h2>
          <div className="space-y-3">
            {products.map(p => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <span className="text-text-primary">{p.name}</span>
                <span className={`text-xs ${p.status === 'online' ? 'text-success' : 'text-warning'}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 bg-surface-default border border-border-subtle rounded-lg">
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Projetos</h2>
          <div className="space-y-3">
            {projects.map(p => (
              <div key={p.id} className="flex items-center justify-between text-sm">
                <span className="text-text-primary">{p.title}</span>
                <span className={`text-xs ${p.status === 'concluido' ? 'text-success' : 'text-warning'}`}>
                  {p.status === 'concluido' ? 'Concluído' : 'Em andamento'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
