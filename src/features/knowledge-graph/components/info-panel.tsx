'use client';

import { motion } from 'framer-motion';
import { X, ArrowUpRight, ChevronRight } from 'lucide-react';
import { getNodeColor, getNodeIdentity } from '../lib/node-identity';
import { getClusterForType } from '../lib/cluster';
import { entityLabels } from '@/core/types';
import type { GraphNode, GraphEdge } from '@/core';
import Link from 'next/link';

interface InfoPanelProps {
  node: GraphNode | null;
  onClose: () => void;
  edges: GraphEdge[];
  allNodes: GraphNode[];
}

function RelationList({ title, nodes }: { title: string; nodes: GraphNode[] }) {
  if (nodes.length === 0) return null;
  return (
    <div className="py-2">
      <h4 className="text-[9px] font-medium uppercase tracking-[0.14em] text-text-muted/50 mb-1.5">
        {title} <span className="text-text-muted/30">({nodes.length})</span>
      </h4>
      <div className="space-y-0.5">
        {nodes.slice(0, 8).map(n => (
          <div key={n.id} className="flex items-center gap-1.5 text-[10px] text-text-muted">
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ backgroundColor: getNodeColor(n.type) }}
            />
            <span className="truncate">{n.label}</span>
          </div>
        ))}
        {nodes.length > 8 && (
          <div className="text-[8px] text-text-muted/30 pt-0.5">
            +{nodes.length - 8} mais
          </div>
        )}
      </div>
    </div>
  );
}

function QuickLink({ href, label }: { href?: string; label: string }) {
  if (!href) return null;
  return (
    <Link
      href={href}
      className="flex items-center gap-1 text-[10px] text-accent-primary/70 hover:text-accent-primary transition-colors"
    >
      {label}
      <ArrowUpRight size={10} />
    </Link>
  );
}

export function InfoPanel({ node, onClose, edges, allNodes }: InfoPanelProps) {
  if (!node) return null;

  const relatedEdgeIds = edges
    .filter(e => e.source === node.id || e.target === node.id)
    .map(e => (e.source === node.id ? e.target : e.source));
  const relatedNodes = allNodes.filter(n => relatedEdgeIds.includes(n.id));

  const cluster = getClusterForType(node.type);
  const identity = getNodeIdentity(node.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute right-3 top-3 bottom-3 w-72 z-20 rounded-lg overflow-hidden"
      style={{
        background: 'rgba(10, 14, 22, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.04)',
        boxShadow: '0 24px 48px -12px rgba(0,0,0,0.5)',
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ borderBottom: `1px solid ${getNodeColor(node.type)}15` }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: getNodeColor(node.type) }}
            />
            <div className="min-w-0">
              <div className="text-[8px] font-medium uppercase tracking-[0.14em] text-text-muted/50">
                {entityLabels[node.type] || identity.label}
              </div>
              <div className="text-[9px] font-medium text-text-primary truncate">
                {node.label}
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-text-muted/40 hover:text-text-muted hover:bg-white/5 transition-colors flex-shrink-0"
          aria-label="Fechar painel"
        >
          <X size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="px-3 py-2 overflow-y-auto h-[calc(100%-40px)]">
        {/* Cluster badge */}
        <div className="flex items-center gap-1.5 mb-2">
          <span
            className="text-[8px] font-medium uppercase tracking-[0.12em] px-1.5 py-0.5 rounded"
            style={{
              color: cluster.color,
              backgroundColor: `${cluster.color}10`,
              border: `1px solid ${cluster.color}20`,
            }}
          >
            {cluster.label}
          </span>
          {node.description && (
            <span className="text-[7px] text-text-muted/30">· {node.type}</span>
          )}
        </div>

        {/* Full description */}
        {node.description && (
          <div className="text-[10px] text-text-muted/70 leading-relaxed mb-3">
            {node.description}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-white/5 mb-2" />

        {/* Relations heading */}
        {relatedNodes.length > 0 && (
          <RelationList title="Relacionados" nodes={relatedNodes} />
        )}

        {/* Group / URL info */}
        {node.group && (
          <>
            <div className="h-px bg-white/5 my-2" />
            <div className="py-1">
              <h4 className="text-[9px] font-medium uppercase tracking-[0.14em] text-text-muted/50 mb-1.5">
                Grupo
              </h4>
              <div className="text-[10px] text-text-muted/70">{node.group}</div>
            </div>
          </>
        )}
        {node.url && (
          <div className="py-1">
            <QuickLink href={node.url} label="Ver detalhes" />
          </div>
        )}

        {/* Edge detail */}
        {edges.filter(e => e.source === node.id || e.target === node.id).length > 0 && (
          <>
            <div className="h-px bg-white/5 my-2" />
            <div className="py-1">
              <h4 className="text-[9px] font-medium uppercase tracking-[0.14em] text-text-muted/50 mb-1.5">
                Conexões diretas
              </h4>
              <div className="space-y-0.5">
                {edges
                  .filter(e => e.source === node.id || e.target === node.id)
                  .slice(0, 6)
                  .map(edge => {
                    const targetId = edge.source === node.id ? edge.target : edge.source;
                    const target = allNodes.find(n => n.id === targetId);
                    return (
                      <div key={`${edge.source}-${edge.target}`} className="flex items-center gap-1 text-[9px] text-text-muted/60">
                        <ChevronRight size={8} />
                        <span
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: getNodeColor(target?.type ?? 'doc') }}
                        />
                        <span className="truncate">{target?.label ?? targetId}</span>
                        {edge.label && (
                          <span className="text-text-muted/30 ml-auto flex-shrink-0">
                            {edge.label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                {edges.filter(e => e.source === node.id || e.target === node.id).length > 6 && (
                  <div className="text-[8px] text-text-muted/30 pt-0.5">
                    +{edges.filter(e => e.source === node.id || e.target === node.id).length - 6} mais
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
