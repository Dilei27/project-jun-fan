'use client';

import Link from 'next/link';
import { GitBranch, Command, FileText, Shield, BarChart3, Home, ArrowRight } from 'lucide-react';

export interface CrossNavLink {
  label: string;
  href: string;
  icon: typeof GitBranch;
  color: string;
}

interface CrossNavProps {
  module: string;
  links?: CrossNavLink[];
}

const moduleLinks: Record<string, CrossNavLink[]> = {
  home: [
    { label: 'Knowledge Graph', href: '/knowledge-graph/', icon: GitBranch, color: '#22C55E' },
    { label: 'QA Command Center', href: '/command-center/', icon: Command, color: '#C084FC' },
    { label: 'Documentação', href: '/docs/', icon: FileText, color: '#EAB308' },
    { label: 'Decisões', href: '/decisoes/', icon: Shield, color: '#FB923C' },
  ],
  qa: [
    { label: 'Knowledge Graph', href: '/knowledge-graph/', icon: GitBranch, color: '#22C55E' },
    { label: 'Decisões', href: '/decisoes/', icon: Shield, color: '#C084FC' },
    { label: 'Documentação', href: '/docs/', icon: FileText, color: '#EAB308' },
    { label: 'Home', href: '/', icon: Home, color: '#4F8CFF' },
  ],
  graph: [
    { label: 'QA Command Center', href: '/command-center/', icon: Command, color: '#C084FC' },
    { label: 'Documentação', href: '/docs/', icon: FileText, color: '#EAB308' },
    { label: 'Architecture', href: '/command-center/architecture/', icon: BarChart3, color: '#22D3EE' },
    { label: 'Home', href: '/', icon: Home, color: '#4F8CFF' },
  ],
};

export function CrossNav({ module }: CrossNavProps) {
  const links = moduleLinks[module] || moduleLinks.home;

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: 'rgba(10, 14, 22, 0.6)',
        border: '1px solid rgba(244, 247, 250, 0.05)',
        boxShadow: '0 4px 16px -8px rgba(0,0,0,0.4)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#4F8CFF' }} />
        <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
          Navegação rápida
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg transition-all duration-200 group"
              style={{
                background: 'rgba(244, 247, 250, 0.02)',
              }}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                style={{
                  background: `${link.color}10`,
                  border: `1px solid ${link.color}15`,
                }}
              >
                <Icon size={11} style={{ color: link.color }} />
              </div>
              <span className="flex-1 text-[11px] text-text-secondary group-hover:text-text-primary transition-colors truncate">
                {link.label}
              </span>
              <ArrowRight size={9} className="text-text-muted/20 group-hover:text-accent-qa transition-colors shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
