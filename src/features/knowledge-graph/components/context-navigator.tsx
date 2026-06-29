'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronDown, Layers } from 'lucide-react';
import { getNodeColor } from '../lib/node-identity';
import type { GraphNode } from '@/core';
import { useState } from 'react';

interface ContextNavigatorProps {
  stack: string[]
  allNodes: GraphNode[]
  onBack: () => void
  onNavigate: (nodeId: string) => void
}

export function ContextNavigator({ stack, allNodes, onBack, onNavigate }: ContextNavigatorProps) {
  const [expanded, setExpanded] = useState(false)

  if (stack.length === 0) return null

  const currentNode = stack[stack.length - 1]
  const current = allNodes.find(n => n.id === currentNode)

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-1.5 py-1 rounded text-[9px] text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
          aria-label="Voltar"
          title="Voltar"
        >
          <ChevronLeft size={10} />
        </button>

        {current && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="flex items-center gap-1 px-1.5 py-1 rounded text-[9px] text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors max-w-[140px]"
          >
            <span className="w-1 h-1 rounded-full" style={{ background: getNodeColor(current.type) }} />
            <span className="truncate">{current.label}</span>
            <ChevronDown size={8} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 mt-1 w-56 rounded-lg overflow-hidden"
            style={{
              background: 'rgba(17, 24, 33, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(244,247,250,0.06)',
              boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5)',
            }}
          >
            <div className="px-3 py-1.5 border-b border-white/5">
              <span className="text-[8px] font-medium uppercase tracking-wider text-text-muted/50 flex items-center gap-1">
                <Layers size={8} /> Pilha de navegação
              </span>
            </div>
            <div className="max-h-40 overflow-y-auto py-1">
              {stack.map((nodeId, i) => {
                const node = allNodes.find(n => n.id === nodeId)
                return (
                  <button
                    key={`${nodeId}-${i}`}
                    onClick={() => { onNavigate(nodeId); setExpanded(false) }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-[9px] text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors text-left"
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: getNodeColor(node?.type ?? 'doc') }}
                    />
                    <span className="truncate">{node?.label ?? nodeId}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
