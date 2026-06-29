'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Info, Weight, Route } from 'lucide-react';
import { getNodeColor } from '../lib/node-identity';
import type { GraphNode, GraphEdge } from '@/core';

interface RelationshipInspectorProps {
  edge: { source: string; target: string } | null
  allNodes: GraphNode[]
  allEdges: GraphEdge[]
  onClose: () => void
  onNodeClick: (nodeId: string) => void
}

const RELATION_LABELS: Record<string, string> = {
  references: 'Referencia',
  contains: 'Contém',
  originates: 'Origina',
  impacts: 'Impacta',
  generates: 'Gera',
  relates: 'Relaciona',
  uses: 'Usa',
  context: 'Contexto',
  depends_on: 'Depende de',
  implements: 'Implementa',
  documented_by: 'Documentado por',
  tested_by: 'Testado por',
  created_by: 'Criado por',
  affects: 'Afeta',
}

const RELATION_COLORS: Record<string, string> = {
  references: '#4F8CFF',
  contains: '#22C55E',
  originates: '#C084FC',
  impacts: '#EF4444',
  generates: '#F59E0B',
  relates: '#22D3EE',
  uses: '#9AA6B8',
  context: '#EAB308',
}

export function RelationshipInspector({ edge, allNodes, allEdges, onClose, onNodeClick }: RelationshipInspectorProps) {
  if (!edge) return null

  const source = allNodes.find(n => n.id === edge.source)
  const target = allNodes.find(n => n.id === edge.target)
  const edgeData = allEdges.find(
    e => (e.source === edge.source && e.target === edge.target) ||
         (e.source === edge.target && e.target === edge.source),
  )
  const relationType = edgeData?.type ?? 'relates'
  const relationLabel = RELATION_LABELS[relationType] ?? relationType
  const relationColor = RELATION_COLORS[relationType] ?? '#687385'

  return (
    <AnimatePresence>
      {edge && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 rounded-xl overflow-hidden"
          style={{
            width: 320,
            background: 'rgba(10, 14, 22, 0.94)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${relationColor}20`,
            boxShadow: `0 0 0 1px ${relationColor}10, 0 20px 48px -12px rgba(0,0,0,0.6)`,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: `1px solid ${relationColor}15` }}>
            <div className="flex items-center gap-1.5">
              <Route size={10} style={{ color: relationColor }} />
              <span className="text-[9px] font-medium uppercase tracking-[0.1em]" style={{ color: relationColor }}>
                {relationLabel}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-0.5 rounded text-text-muted/40 hover:text-text-muted hover:bg-white/5 transition-colors"
              aria-label="Fechar inspetor"
            >
              <X size={12} />
            </button>
          </div>

          {/* Body */}
          <div className="px-3 py-2.5">
            {/* Source → Target */}
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => onNodeClick(edge.source)}
                className="flex-1 flex items-center gap-1.5 px-2 py-1 rounded text-[10px] text-text-primary hover:bg-white/5 transition-colors text-left"
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: getNodeColor(source?.type ?? 'doc') }} />
                <span className="truncate font-medium">{source?.label ?? edge.source}</span>
              </button>
              <ArrowRight size={10} className="text-text-muted/30 shrink-0" />
              <button
                onClick={() => onNodeClick(edge.target)}
                className="flex-1 flex items-center gap-1.5 px-2 py-1 rounded text-[10px] text-text-primary hover:bg-white/5 transition-colors text-left"
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: getNodeColor(target?.type ?? 'doc') }} />
                <span className="truncate font-medium">{target?.label ?? edge.target}</span>
              </button>
            </div>

            {/* Direction */}
            <div className="flex items-center gap-1.5 text-[9px] text-text-muted/60 mb-2">
              <ArrowLeft size={8} />
              <span>Origem: {source?.label ?? edge.source}</span>
              <span className="text-text-muted/20">→</span>
              <span>Destino: {target?.label ?? edge.target}</span>
            </div>

            {/* Relationship type */}
            <div className="flex items-center gap-2 text-[9px] text-text-muted/50 mb-2">
              <Info size={8} />
              <span>Tipo: <span style={{ color: relationColor }}>{relationLabel}</span></span>
              {edgeData?.label && (
                <>
                  <span className="text-text-muted/20">·</span>
                  <span>{edgeData.label}</span>
                </>
              )}
            </div>

            {/* Weight indicator (mock) */}
            <div className="flex items-center gap-1.5 text-[9px] text-text-muted/50">
              <Weight size={8} />
              <span>Peso:</span>
              <span className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(w => (
                  <span
                    key={w}
                    className="w-2 h-1 rounded-sm"
                    style={{
                      background: w <= 3 ? relationColor : 'rgba(244,247,250,0.08)',
                    }}
                  />
                ))}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
