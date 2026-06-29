'use client';

import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import type { ReplayStage } from '../lib/replay-engine';

const clusterColors: Record<string, string> = {
  core: '#4F8CFF',
  knowledge: '#EAB308',
  products: '#22C55E',
  projects: '#C084FC',
  decisions: '#FB923C',
  skills: '#22D3EE',
};

interface ReplayBookmarksProps {
  bookmarks: ReplayStage[]
  currentIndex: number
  onJump: (index: number) => void
}

export function ReplayBookmarks({ bookmarks, currentIndex, onJump }: ReplayBookmarksProps) {
  if (bookmarks.length === 0) return null

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-1 mb-1.5">
        <Bookmark size={8} className="text-text-muted/40" />
        <span className="text-[7px] font-medium uppercase tracking-[0.12em] text-text-muted/40">
          Marcos
        </span>
      </div>
      {bookmarks.map((stage) => {
        const stageIndex = bookmarks.indexOf(stage)
        const color = clusterColors[stage.clusterId] ?? '#687385'
        return (
          <motion.button
            key={stage.id}
            whileTap={m.tap.soft}
            onClick={() => onJump(stageIndex)}
            className="flex items-center gap-1.5 px-2 py-1 rounded text-[8px] text-left w-full transition-all"
            style={{
              background: stageIndex === currentIndex ? `${color}10` : 'transparent',
              color: stageIndex === currentIndex ? color : 'rgba(244,247,250,0.5)',
            }}
          >
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: color }}
            />
            <span className="truncate">{stage.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
