'use client';

import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';

const NODES = [
  { id: 'odirlei', label: 'Odirlei Alves', color: '#4F8CFF', x: 50, y: 10, size: 22 },
  { id: 'qa', label: 'QA Engineer', color: '#22C55E', x: 50, y: 28, size: 16 },
  { id: 'robot', label: 'Robot Framework', color: '#EAB308', x: 25, y: 46, size: 14 },
  { id: 'python', label: 'Python', color: '#FB923C', x: 50, y: 46, size: 14 },
  { id: 'erp', label: 'ERP Desktop', color: '#687385', x: 75, y: 46, size: 12 },
  { id: 'knowledge', label: 'Knowledge', color: '#C084FC', x: 50, y: 64, size: 14 },
  { id: 'junfan', label: 'Jun Fan', color: '#4F8CFF', x: 50, y: 82, size: 18 },
];

const EDGES = [
  { from: 'odirlei', to: 'qa' },
  { from: 'qa', to: 'robot' },
  { from: 'qa', to: 'python' },
  { from: 'qa', to: 'erp' },
  { from: 'robot', to: 'knowledge' },
  { from: 'python', to: 'knowledge' },
  { from: 'erp', to: 'knowledge' },
  { from: 'knowledge', to: 'junfan' },
];

export function CareerKnowledgeGraph() {
  const nodeMap = new Map(NODES.map(n => [n.id, n]))

  return (
    <div className="rounded-xl p-5" style={{
      background: 'rgba(17, 24, 33, 0.6)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(244, 247, 250, 0.04)',
    }}>
      <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
        Career Graph
      </h2>

      <svg viewBox="0 0 100 95" className="w-full h-auto" style={{ maxHeight: 200 }}>
        {/* Edges */}
        {EDGES.map((edge, i) => {
          const from = nodeMap.get(edge.from)
          const to = nodeMap.get(edge.to)
          if (!from || !to) return null
          return (
            <motion.line
              key={`${edge.from}-${edge.to}`}
              x1={from.x} y1={from.y + from.size / 2}
              x2={to.x} y2={to.y - to.size / 2}
              stroke="rgba(244,247,250,0.08)"
              strokeWidth={0.8}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: m.easing.out }}
            />
          )
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const edgeCount = EDGES.filter(e => e.from === node.id || e.to === node.id).length
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: m.easing.out }}
            >
              {/* Halo */}
              <circle
                cx={node.x} cy={node.y} r={node.size * 1.3}
                fill={`${node.color}08`}
                opacity={0.6}
              />
              {/* Node */}
              <circle
                cx={node.x} cy={node.y} r={node.size / 2}
                fill={`${node.color}20`}
                stroke={node.color}
                strokeWidth={1.2}
              />
              {/* Label */}
              <text
                x={node.x} y={node.y}
                textAnchor="middle" dominantBaseline="central"
                fill="rgba(244,247,250,0.9)"
                fontSize={node.size > 16 ? 3.5 : 2.8}
                fontWeight={600}
                fontFamily="var(--font-sans)"
              >
                {node.label}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
