'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, FileText, Shield, Siren, ChevronDown, Share2 } from 'lucide-react';
import Link from 'next/link';
import { MockAdapter } from '@/core/knowledge/adapters/mock-adapter';
import { KnowledgeRepository } from '@/core/knowledge/repositories/knowledge-repository';

const relationColors: Record<string, string> = {
  references: '#4F8CFF',
  contains: '#22C55E',
  originates: '#C084FC',
  impacts: '#EF4444',
  generates: '#F59E0B',
  relates: '#22D3EE',
  uses: '#9AA6B8',
  context: '#EAB308',
};

const relationLabels: Record<string, string> = {
  references: 'Referencia',
  contains: 'Contém',
  originates: 'Origina',
  impacts: 'Impacta',
  generates: 'Gera',
  relates: 'Relaciona',
  uses: 'Usa',
  context: 'Contexto',
};

function getRelationsForLabel(entityLabel: string): Array<{
  id: string; label: string; type: string; relation: string; href: string
}> {
  try {
    const repo = new KnowledgeRepository(new MockAdapter());
    repo.initialize();
    const all = repo.getAllNodes();
    const match = all.find(
      n => n.title.toLowerCase().includes(entityLabel.toLowerCase()) ||
           n.id.toLowerCase().includes(entityLabel.toLowerCase()),
    );
    if (!match) return [];

    const edges = repo.getIndex().getEdges(match.id);
    return edges.slice(0, 8).map(e => {
      const neighborId = e.source === match.id ? e.target : e.source;
      const neighbor = repo.getIndex().getById(neighborId);
      return {
        id: neighborId,
        label: neighbor?.title ?? neighborId,
        type: neighbor?.type ?? 'unknown',
        relation: e.type ?? 'relates',
        href: `/knowledge-graph/`,
      };
    });
  } catch {
    return [];
  }
}

export function LiveRelationships({ entityLabel }: { entityLabel: string | null }) {
  const [expanded, setExpanded] = useState(false);

  const relations = useMemo(
    () => entityLabel ? getRelationsForLabel(entityLabel) : [],
    [entityLabel],
  );

  if (!entityLabel || relations.length === 0) return null;

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        background: 'rgba(79, 140, 255, 0.03)',
        border: '1px solid rgba(79, 140, 255, 0.06)',
      }}
    >
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-2 px-3 py-2 text-[10px] text-text-muted hover:text-text-primary transition-colors"
      >
        <Share2 size={10} className="text-accent-qa/60" />
        <span className="font-medium">Relações ao vivo</span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto"
        >
          <ChevronDown size={8} className="text-text-muted/40" />
        </motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-2 space-y-1">
              {relations.map(r => (
                <Link
                  key={r.id}
                  href={r.href}
                  className="flex items-center gap-2 px-2 py-1 rounded text-[9px] text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
                >
                  <span className="w-1 h-1 rounded-full" style={{ background: relationColors[r.relation] || '#687385' }} />
                  <span className="truncate flex-1">{r.label}</span>
                  <span className="text-[7px] uppercase tracking-wider text-text-muted/40">
                    {relationLabels[r.relation] || r.relation}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
