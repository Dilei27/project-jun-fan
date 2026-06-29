'use client';

import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, ChevronDown } from 'lucide-react';
import { motion as m } from '@/design-system/motion';

interface ReplayControlsProps {
  isActive: boolean
  isPlaying: boolean
  isDone: boolean
  speed: 0.5 | 1 | 2
  onPlay: () => void
  onPause: () => void
  onNext: () => void
  onPrev: () => void
  onRestart: () => void
  onSpeedChange: (speed: 0.5 | 1 | 2) => void
}

export function ReplayControls({
  isActive, isPlaying, isDone, speed,
  onPlay, onPause, onNext, onPrev, onRestart, onSpeedChange,
}: ReplayControlsProps) {
  return (
    <div className="flex items-center gap-1">
      {/* Restart */}
      <motion.button
        whileTap={m.tap.soft}
        onClick={onRestart}
        className="p-1.5 rounded text-text-muted/50 hover:text-text-primary hover:bg-white/5 transition-all"
        aria-label="Reiniciar"
      >
        <RotateCcw size={12} />
      </motion.button>

      {/* Previous */}
      <motion.button
        whileTap={m.tap.soft}
        onClick={onPrev}
        className="p-1.5 rounded text-text-muted/50 hover:text-text-primary hover:bg-white/5 transition-all"
        aria-label="Anterior"
        disabled={isDone}
      >
        <SkipBack size={12} />
      </motion.button>

      {/* Play / Pause */}
      <motion.button
        whileTap={m.tap.soft}
        onClick={isPlaying ? onPause : onPlay}
        className="p-2 rounded-full flex items-center justify-center transition-all"
        style={{
          background: isActive ? 'rgba(79, 140, 255, 0.12)' : 'rgba(244,247,250,0.04)',
        }}
        aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
      >
        {isPlaying ? (
          <Pause size={14} className="text-accent-qa" />
        ) : (
          <Play size={14} className={isActive ? 'text-accent-qa' : 'text-text-muted'} />
        )}
      </motion.button>

      {/* Next */}
      <motion.button
        whileTap={m.tap.soft}
        onClick={onNext}
        className="p-1.5 rounded text-text-muted/50 hover:text-text-primary hover:bg-white/5 transition-all"
        aria-label="Próximo"
      >
        <SkipForward size={12} />
      </motion.button>

      {/* Speed */}
      <div className="relative ml-1">
        <button
          onClick={() => {
            const speeds: (0.5 | 1 | 2)[] = [0.5, 1, 2]
            const idx = speeds.indexOf(speed)
            onSpeedChange(speeds[(idx + 1) % speeds.length])
          }}
          className="flex items-center gap-0.5 px-1.5 py-1 rounded text-[9px] font-mono text-text-muted/50 hover:text-text-primary hover:bg-white/5 transition-all"
          aria-label="Velocidade"
        >
          {speed}x
          <ChevronDown size={6} />
        </button>
      </div>
    </div>
  )
}
