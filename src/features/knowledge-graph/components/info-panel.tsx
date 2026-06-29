'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Network,
  Link2,
  Sparkles,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { motion as m } from '@/design-system/motion';
import {
  getNodeColor,
} from '../lib/node-identity';
import type { GraphNode, GraphEdge } from '@/core';
import { entityLabels } from '@/core/types';
import type { Variants } from 'framer-motion';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1], delay: 0.08 + i * 0.05 },
  }),
};

interface InfoPanelProps {
  node: GraphNode | null;
  relatedEdges: GraphEdge[];
  allNodes: GraphNode[];
  onClose: () => void;
  onNavigate: (node: GraphNode) => void;
}

export function InfoPanel({
  node,
  relatedEdges,
  allNodes,
  onClose,
  onNavigate,
}: InfoPanelProps) {
  const color = node ? getNodeColor(node.type) : '#4F8CFF';

  const groupedConnections = groupConnections(relatedEdges, allNodes, node?.id ?? '');
  const connectionCount = relatedEdges.length;

  return (
    <AnimatePresence mode="wait">
      {node && (
        <motion.aside
          key={node.id}
          initial={{ opacity: 0, x: 40, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.98 }}
          transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
          className="jf-glass-modal absolute top-6 right-6 bottom-6 w-[400px] rounded-2xl overflow-hidden z-30 flex flex-col"
          style={{
            boxShadow:
              'inset 0 1px 0 0 rgba(244, 247, 250, 0.06), 0 0 0 1px rgba(79, 140, 255, 0.06), 0 24px 64px -16px rgba(0, 0, 0, 0.7), 0 32px 80px -16px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Top color accent bar */}
          <div
            aria-hidden
            className="h-px w-full"
            style={{
              background: `linear-gradient(to right, transparent, ${color}80, transparent)`,
            }}
          />

          {/* Header */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="px-6 pt-5 pb-4 border-b border-border-subtle/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}80` }}
                  />
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
                    {entityLabels[node.type] || node.type}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-text-primary tracking-[-0.015em] leading-snug">
                  {node.label}
                </h3>
              </div>
              <motion.button
                whileTap={m.tap.soft}
                whileHover={{ rotate: 90, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
                onClick={onClose}
                className="shrink-0 p-1.5 text-text-muted hover:text-text-primary rounded-md hover:bg-surface-soft transition-colors cursor-pointer"
                aria-label="Fechar painel"
              >
                <X size={16} />
              </motion.button>
            </div>
          </motion.div>

          {/* Content scrollable */}
          <div className="flex-1 overflow-y-auto">
            {/* Description */}
            {node.description && (
              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="px-6 py-4 border-b border-border-subtle/30"
              >
                <p className="text-sm text-text-secondary leading-relaxed">
                  {node.description}
                </p>
              </motion.div>
            )}

            {/* Connections */}
            {connectionCount > 0 && (
              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="px-6 py-4 border-b border-border-subtle/30"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Network size={12} className="text-text-muted" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
                    Conexões
                  </span>
                  <span className="text-[10px] text-text-muted">· {connectionCount}</span>
                </div>
                <div className="space-y-3">
                  {Object.entries(groupedConnections).map(([type, items]) => (
                    <div key={type}>
                      <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-1.5 block">
                        {entityLabels[type] || type} <span className="text-text-muted/60">({items.length})</span>
                      </span>
                      <div className="space-y-1.5">
                        {items.map(({ node: n, relation }) => (
                          <ConnectionItem
                            key={n.id}
                            node={n}
                            relation={relation}
                            onClick={() => onNavigate(n)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Insights (mock data based on type) */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              className="px-6 py-4 border-b border-border-subtle/30"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={12} className="text-text-muted" />
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
                  Insights
                </span>
              </div>
              <InsightsFor type={node.type} id={node.id} color={color} />
            </motion.div>

            {/* Links */}
            {node.url && (
              <motion.div
                custom={4}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="px-6 py-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Link2 size={12} className="text-text-muted" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
                    Links
                  </span>
                </div>
                <Link
                  href={node.url}
                  className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-accent-qa/8 border border-accent-qa/20 text-sm text-accent-qa hover:bg-accent-qa/12 transition-colors"
                >
                  <span className="flex-1">Abrir página</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.div>
            )}
          </div>

          {/* Footer meta */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="px-6 py-3 border-t border-border-subtle/40 flex items-center justify-between text-[10px] text-text-muted uppercase tracking-wider"
          >
            <span>id: {node.id}</span>
            <span>v2.0</span>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function ConnectionItem({
  node,
  relation,
  onClick,
}: {
  node: GraphNode;
  relation: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ x: 2, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-2.5 py-1.5 bg-surface-default/50 hover:bg-surface-soft/60 border border-border-subtle/30 rounded-lg text-left text-sm text-text-secondary transition-colors group cursor-pointer"
    >
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: getNodeColor(node.type) }}
        aria-hidden
      />
      <span className="flex-1 truncate group-hover:text-text-primary transition-colors">
        {node.label}
      </span>
      <span className="text-[10px] text-text-muted shrink-0">{relation}</span>
    </motion.button>
  );
}

function InsightsFor({ type, id, color }: { type: string; id: string; color: string }) {
  // Type-specific "insights" — semantic cards that look like real data
  const insights = generateInsights(type, id);
  if (insights.length === 0) {
    return (
      <p className="text-xs text-text-muted italic">
        Sem insights adicionais para este tipo.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2">
      {insights.map((insight, i) => (
        <div
          key={i}
          className="px-3 py-2.5 rounded-lg bg-surface-default/40 border border-border-subtle/30"
        >
          <div
            className="text-lg font-semibold tabular-nums tracking-tight"
            style={{ color }}
          >
            {insight.value}
          </div>
          <div className="text-[10px] text-text-muted mt-0.5 leading-tight">
            {insight.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function generateInsights(type: string, id: string) {
  // Deterministic pseudo-random based on id
  const seed = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const r = (n: number) => ((seed * 9301 + n * 49297) % 233280) / 233280;
  switch (type) {
    case 'product':
      return [
        { value: `${Math.round(80 + r(1) * 20)}%`, label: 'Status de produção' },
        { value: `${Math.round(r(2) * 50 + 10)}`, label: 'Dependências' },
      ];
    case 'project':
      return [
        { value: `${Math.round(r(3) * 30 + 5)}h`, label: 'Tempo investido' },
        { value: `${Math.round(r(4) * 100)}%`, label: 'Conclusão' },
      ];
    case 'doc':
      return [
        { value: `${Math.round(r(5) * 12 + 1)}`, label: 'Seções' },
        { value: `${Math.round(r(6) * 2000 + 200)}`, label: 'Leituras' },
      ];
    case 'decision':
      return [
        { value: `ADR-${Math.round(r(7) * 50 + 1).toString().padStart(3, '0')}`, label: 'Identificador' },
        { value: `${Math.round(r(8) * 12 + 1)}`, label: 'Consequências' },
      ];
    case 'mission':
      return [
        { value: `${Math.round(r(9) * 5 + 1)}`, label: 'Pilares' },
        { value: `${Math.round(r(10) * 100)}%`, label: 'Alinhamento' },
      ];
    default:
      return [];
  }
}

function groupConnections(
  edges: GraphEdge[],
  allNodes: GraphNode[],
  sourceId: string,
): Record<string, Array<{ node: GraphNode; relation: string }>> {
  const byType: Record<string, Array<{ node: GraphNode; relation: string }>> = {};
  for (const edge of edges) {
    const otherId = edge.source === sourceId ? edge.target : edge.source;
    const other = allNodes.find(n => n.id === otherId);
    if (!other) continue;
    if (!byType[other.type]) byType[other.type] = [];
    byType[other.type].push({ node: other, relation: edge.label || 'conecta' });
  }
  return byType;
}
