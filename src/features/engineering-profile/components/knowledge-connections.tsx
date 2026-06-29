'use client';

import { motion } from 'framer-motion';
import { Share2, Network, ClipboardCheck, BookOpen, GitBranch, Database, Siren } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import Link from 'next/link';

interface Connection {
  label: string
  href: string
  description: string
  icon: React.ReactNode
  color: string
}

const CONNECTIONS: Connection[] = [
  { label: 'Knowledge Graph', href: '/knowledge-graph', description: 'Grafo de conhecimento vivo', icon: <Network size={10} />, color: '#4F8CFF' },
  { label: 'Command Center', href: '/command-center', description: 'Central de comando e qualidade', icon: <Siren size={10} />, color: '#22C55E' },
  { label: 'Documentação', href: '/docs', description: 'Documentação viva da plataforma', icon: <BookOpen size={10} />, color: '#EAB308' },
  { label: 'Decisões', href: '/decisoes', description: 'Registro de decisões de arquitetura', icon: <GitBranch size={10} />, color: '#C084FC' },
  { label: 'Repository', href: '/repository', description: 'Análise estrutural do repositório', icon: <Database size={10} />, color: '#22D3EE' },
  { label: 'Engineering Review', href: '/review', description: 'Avaliação técnica por regras', icon: <ClipboardCheck size={10} />, color: '#FB923C' },
];

export function KnowledgeConnections() {
  return (
    <div className="rounded-xl p-5" style={{
      background: 'rgba(17, 24, 33, 0.6)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(244, 247, 250, 0.04)',
    }}>
      <div className="flex items-center gap-1.5 mb-4">
        <Share2 size={12} className="text-text-muted" />
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Conexões com a Plataforma</h2>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {CONNECTIONS.map((conn, i) => (
          <motion.div
            key={conn.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04, ease: m.easing.out }}
          >
            <Link
              href={conn.href}
              className="flex items-start gap-2 px-2.5 py-2 rounded-lg transition-all hover:bg-white/[0.02] group"
              style={{
                background: `${conn.color}06`,
                border: `1px solid ${conn.color}10`,
              }}
            >
              <span
                className="flex items-center justify-center w-5 h-5 rounded shrink-0 mt-0.5"
                style={{ background: `${conn.color}15`, color: conn.color }}
              >
                {conn.icon}
              </span>
              <div>
                <span className="text-[9px] font-medium text-text-primary group-hover:text-accent-qa transition-colors block">
                  {conn.label}
                </span>
                <span className="text-[7px] text-text-muted/40">{conn.description}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
