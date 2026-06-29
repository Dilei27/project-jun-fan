'use client';

import { motion } from 'framer-motion';
import { Package, FileCode, Folder as FolderIcon } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import type { Module, ModuleType } from '@/core/repository';

const moduleColors: Record<ModuleType, string> = {
  application:     '#4F8CFF',
  library:         '#22C55E',
  service:         '#C084FC',
  tool:            '#FB923C',
  documentation:   '#EAB308',
  configuration:   '#22D3EE',
  test:            '#EF4444',
};

interface ModuleListProps {
  modules: Module[]
}

export function ModuleList({ modules }: ModuleListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: m.easing.out }}
      className="rounded-xl p-4"
      style={{
        background: 'rgba(17, 24, 33, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(244, 247, 250, 0.04)',
      }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <Package size={12} className="text-text-muted" />
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Módulos</h2>
        <span className="text-[9px] text-text-muted/40 ml-auto">{modules.length} módulos</span>
      </div>

      <div className="space-y-1">
        {modules.map((mod, i) => {
          const color = moduleColors[mod.type] ?? '#687385'
          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04, ease: m.easing.out }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-white/[0.02]"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-text-primary font-medium truncate">{mod.name}</p>
                <p className="text-[9px] text-text-muted/60 truncate">{mod.description}</p>
              </div>
              <div className="flex items-center gap-2 text-text-muted/40 shrink-0">
                <span className="flex items-center gap-0.5 text-[8px]">
                  <FolderIcon size={8} /> {mod.folders.length}
                </span>
                <span className="flex items-center gap-0.5 text-[8px]">
                  <FileCode size={8} /> {mod.files.length}
                </span>
              </div>
              <span
                className="text-[7px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{
                  background: `${color}15`,
                  color,
                }}
              >
                {mod.type}
              </span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
