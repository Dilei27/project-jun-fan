'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Shield, GitBranch, Crosshair, Expand, Link2 } from 'lucide-react';

interface ContextActionsProps {
  actions: Array<{ label: string; action: string; href?: string }>
  onAction: (action: string) => void
  visible: boolean
}

const ACTION_ICONS: Record<string, typeof FileText> = {
  navigate: Link2,
  'focus-cluster': Crosshair,
  expand: Expand,
}

export function ContextActions({ actions, onAction, visible }: ContextActionsProps) {
  if (actions.length === 0) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-wrap gap-1 max-w-[240px]">
            {actions.slice(0, 4).map((action, i) => {
              const Icon = ACTION_ICONS[action.action] || GitBranch
              return (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                  onClick={() => onAction(action.action)}
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-[9px] text-text-muted hover:text-text-primary hover:bg-white/5 transition-all border border-transparent hover:border-border-subtle/30"
                >
                  <Icon size={8} className="text-text-muted/40" />
                  {action.label}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
