import Link from 'next/link';
import { getProducts, getProjects } from '@/lib/content';
import { ArrowRight, Beaker, BookOpen, GitBranch, Shield } from 'lucide-react';

const hubLinks = [
  { href: '/', icon: Shield, label: 'QA Command Center', desc: 'Cockpit principal do ecossistema' },
  { href: '/produto/whatsapp-ai/', icon: Beaker, label: 'WhatsApp AI', desc: 'Assistente comercial inteligente' },
  { href: '/produto/vigilante-ai/', icon: GitBranch, label: 'Vigilante AI', desc: 'Monitoramento com IA' },
  { href: '/docs/', icon: BookOpen, label: 'Documentação', desc: 'Guias, setup e arquitetura' },
];

export default function HubPage() {
  const products = getProducts();
  const projects = getProjects();

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-2">Jun Fan Hub</h1>
      <p className="text-text-secondary mb-10 max-w-xl">Explore o ecossistema de produtos, projetos e documentação.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {hubLinks.map(link => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}
              className="flex flex-col gap-3 p-5 bg-surface-default border border-border-subtle rounded-lg hover:bg-surface-elevated hover:border-border-strong transition-all group">
              <Icon size={24} className="text-accent-qa" />
              <div>
                <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent-qa transition-colors">{link.label}</h3>
                <p className="text-xs text-text-muted mt-0.5">{link.desc}</p>
              </div>
              <ArrowRight size={14} className="text-text-muted group-hover:text-accent-qa mt-auto self-end" />
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Produtos</h2>
          <div className="space-y-3">
            {products.map(p => (
              <Link key={p.id} href={`/produto/${p.id}/`}
                className="flex items-center justify-between p-3 bg-surface-default border border-border-subtle rounded-lg hover:bg-surface-elevated transition-colors">
                <span className="text-sm font-medium text-text-primary">{p.name}</span>
                <span className="text-xs text-text-muted">{p.status}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Projetos</h2>
          <div className="space-y-3">
            {projects.map(p => (
              <Link key={p.id} href={`/projeto/${p.id}/`}
                className="flex items-center justify-between p-3 bg-surface-default border border-border-subtle rounded-lg hover:bg-surface-elevated transition-colors">
                <span className="text-sm font-medium text-text-primary">{p.title}</span>
                <span className="text-xs text-text-muted">{p.status === 'concluido' ? 'Concluído' : 'Em andamento'}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
