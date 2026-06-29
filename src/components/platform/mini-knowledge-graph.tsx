'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MockAdapter } from '@/core/knowledge/adapters/mock-adapter';
import { KnowledgeRepository } from '@/core/knowledge/repositories/knowledge-repository';

interface MiniNode {
  id: string;
  label: string;
  href: string;
  color: string;
  x: number;
  y: number;
}

interface MiniEdge {
  from: number;
  to: number;
  color: string;
}

const positions: Record<string, { x: number; y: number }> = {
  home: { x: 80, y: 20 },
  'knowledge-graph': { x: 150, y: 50 },
  'command-center': { x: 50, y: 60 },
  docs: { x: 130, y: 90 },
  decisions: { x: 20, y: 100 },
  engine: { x: 85, y: 130 },
};

const connections: [string, string][] = [
  ['home', 'knowledge-graph'],
  ['home', 'command-center'],
  ['knowledge-graph', 'docs'],
  ['command-center', 'docs'],
  ['command-center', 'decisions'],
  ['docs', 'engine'],
  ['knowledge-graph', 'engine'],
  ['home', 'engine'],
];

const fallbackNodes: MiniNode[] = [
  { id: 'home', label: 'Home', href: '/', color: '#4F8CFF', x: 80, y: 20 },
  { id: 'kg', label: 'Graph', href: '/knowledge-graph/', color: '#22C55E', x: 150, y: 50 },
  { id: 'qa', label: 'QA', href: '/command-center/', color: '#C084FC', x: 50, y: 60 },
  { id: 'docs', label: 'Docs', href: '/docs/', color: '#EAB308', x: 130, y: 90 },
  { id: 'decisions', label: 'Decisões', href: '/decisoes/', color: '#FB923C', x: 20, y: 100 },
  { id: 'engine', label: 'Engine', href: '/', color: '#22D3EE', x: 85, y: 130 },
];

const fallbackEdges: MiniEdge[] = [];

export function MiniKnowledgeGraph() {
  const { nodes, edges } = useMemo(() => {
    try {
      const repo = new KnowledgeRepository(new MockAdapter());
      repo.initialize();
      const modules = repo.getAllModules();

      const moduleNodes: MiniNode[] = modules
        .filter(m => positions[m.id])
        .map(m => ({
          id: m.id,
          label: m.name,
          href: m.route,
          color: m.color,
          x: positions[m.id].x,
          y: positions[m.id].y,
        }));

      if (moduleNodes.length === 0) return { nodes: fallbackNodes, edges: fallbackEdges };

      const nodeMap = new Map(moduleNodes.map((n, i) => [n.id, i]));
      const moduleEdges: MiniEdge[] = [];

      for (const [fromId, toId] of connections) {
        const from = nodeMap.get(fromId);
        const to = nodeMap.get(toId);
        if (from !== undefined && to !== undefined) {
          const fromNode = moduleNodes[from];
          const toNode = moduleNodes[to];
          const colors = [fromNode.color, toNode.color];
          moduleEdges.push({ from, to, color: colors[(from + to) % colors.length] });
        }
      }

      return { nodes: moduleNodes, edges: moduleEdges };
    } catch {
      return { nodes: fallbackNodes, edges: fallbackEdges };
    }
  }, []);

  return (
    <Link href="/knowledge-graph/" className="block group">
      <div
        className="rounded-xl p-4 transition-all duration-300"
        style={{
          background: 'rgba(10, 14, 22, 0.6)',
          border: '1px solid rgba(244, 247, 250, 0.05)',
          boxShadow: '0 4px 16px -8px rgba(0,0,0,0.4)',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: '#22C55E' }} />
            <h3 className="text-xs font-semibold text-text-primary">Knowledge Graph</h3>
          </div>
          <ArrowRight size={12} className="text-text-muted/30 group-hover:text-accent-qa transition-colors" />
        </div>

        <svg width="170" height="150" viewBox="0 0 170 150" className="w-full max-w-[170px] mx-auto" aria-label="Mini knowledge graph">
          {edges.map((e, i) => (
            <motion.line
              key={i}
              x1={nodes[e.from].x}
              y1={nodes[e.from].y}
              x2={nodes[e.to].x}
              y2={nodes[e.to].y}
              stroke={e.color}
              strokeWidth="1"
              opacity="0.25"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.25 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {nodes.map((n, i) => (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <circle cx={n.x} cy={n.y} r="5" fill={n.color} opacity="0.15" />
              <circle cx={n.x} cy={n.y} r="3" fill={n.color} />
              <text
                x={n.x}
                y={n.y + 11}
                textAnchor="middle"
                fill="rgba(244, 247, 250, 0.5)"
                fontSize="7"
                fontWeight="500"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {n.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>
    </Link>
  );
}
