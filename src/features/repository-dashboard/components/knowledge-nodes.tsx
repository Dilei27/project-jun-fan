'use client';

import { motion } from 'framer-motion';
import { Network, FileCode, Folder as FolderIcon, Package, BookOpen, TestTube, Siren } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import type { KnowledgeNode } from '@/core/knowledge';

const nodeIcons: Record<string, React.ReactNode> = {
  module:       <Package size={10} />,
  test:         <TestTube size={10} />,
  architecture: <FolderIcon size={10} />,
  document:     <BookOpen size={10} />,
  lab:          <Siren size={10} />,
};

const nodeColors: Record<string, string> = {
  module:       '#4F8CFF',
  test:         '#EF4444',
  architecture: '#22D3EE',
  document:     '#EAB308',
  lab:          '#FB923C',
};

interface KnowledgeNodesProps {
  nodes: KnowledgeNode[]
}

export function KnowledgeNodes({ nodes }: KnowledgeNodesProps) {
  const byType = groupBy(nodes, 'type')
  const typeEntries = Object.entries(byType).sort(([, a], [, b]) => b.length - a.length)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: m.easing.out }}
      className="rounded-xl p-4"
      style={{
        background: 'rgba(17, 24, 33, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(244, 247, 250, 0.04)',
      }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <Network size={12} className="text-text-muted" />
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Knowledge Nodes</h2>
        <span className="text-[9px] text-text-muted/40 ml-auto">{nodes.length} nós</span>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-3">
        {typeEntries.map(([type, items]) => {
          const color = nodeColors[type] ?? '#687385'
          return (
            <div
              key={type}
              className="flex flex-col items-center px-2 py-2 rounded-lg"
              style={{ background: `${color}08` }}
            >
              <span className="text-sm font-semibold tabular-nums" style={{ color }}>{items.length}</span>
              <span className="text-[7px] uppercase tracking-wider text-text-muted/50 mt-0.5">{type}</span>
            </div>
          )
        })}
      </div>

      <div className="space-y-0.5 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
        {nodes.slice(0, 60).map((node, i) => {
          const color = nodeColors[node.type] ?? '#687385'
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.008, ease: m.easing.out }}
              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/[0.02]"
            >
              <span
                className="flex items-center justify-center w-4 h-4 rounded shrink-0"
                style={{ background: `${color}15`, color }}
              >
                {nodeIcons[node.type] ?? <FileCode size={10} />}
              </span>
              <span className="text-[9px] text-text-primary truncate flex-1">{node.title}</span>
              <span className="text-[7px] text-text-muted/30 capitalize">{node.category}</span>
            </motion.div>
          )
        })}
        {nodes.length > 60 && (
          <p className="text-[8px] text-text-muted/30 text-center pt-2">
            +{nodes.length - 60} nós restantes
          </p>
        )}
      </div>
    </motion.div>
  )
}

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = String(item[key])
    ;(acc[k] ??= []).push(item)
    return acc
  }, {} as Record<string, T[]>)
}
