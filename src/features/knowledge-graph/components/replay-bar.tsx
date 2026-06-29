'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, X } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import { useReplay } from '../hooks/use-replay';
import { ReplayTimeline } from './replay-timeline';
import { ReplayControls } from './replay-controls';
import { ReplayStoryCard } from './replay-story-card';
import { ReplayBookmarks } from './replay-bookmarks';
import type { ReplayEvent, ReplayStage } from '../lib/replay-engine';

interface ReplayBarProps {
  onCameraTarget: (target: { clusterId: string; zoom?: number }) => void
  onReplayActive: (active: boolean) => void
}

export function ReplayBar({ onCameraTarget, onReplayActive }: ReplayBarProps) {
  const replay = useReplay()
  const [showPanel, setShowPanel] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<ReplayEvent | null>(null)

  // Track active state changes
  useEffect(() => {
    onReplayActive(replay.isActive)
  }, [replay.isActive, onReplayActive])

  // Camera target from replay engine
  const cameraCallbackRef = useRef(onCameraTarget)
  cameraCallbackRef.current = onCameraTarget

  useEffect(() => {
    replay.onCameraTarget((target) => {
      cameraCallbackRef.current(target)
    })
  }, [replay])

  // Event tracking
  useEffect(() => {
    replay.onEvent((event) => {
      setCurrentEvent(event)
      // Auto-clear after display duration
      const timer = setTimeout(() => setCurrentEvent(null), 3000)
      return () => clearTimeout(timer)
    })
  }, [replay])

  const handleJump = useCallback((index: number) => {
    replay.jumpTo(index)
  }, [replay])

  if (!showPanel && !replay.isActive) {
    return (
      <motion.button
        whileTap={m.tap.soft}
        onClick={() => setShowPanel(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border-subtle/40 text-[9px] text-text-muted hover:text-text-primary transition-all"
        style={{
          background: 'rgba(10, 14, 22, 0.6)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <History size={10} />
        Replay
      </motion.button>
    )
  }

  return (
    <AnimatePresence>
      {(showPanel || replay.isActive) && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.25, ease: m.easing.out }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 rounded-xl px-4 py-3"
          style={{
            minWidth: 400,
            background: 'rgba(10, 14, 22, 0.92)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(244,247,250,0.06)',
            boxShadow: '0 24px 48px -12px rgba(0,0,0,0.6)',
          }}
        >
          {/* Header row */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-text-muted/50">
              Knowledge Replay
            </span>
            {!replay.isActive && (
              <button
                onClick={() => setShowPanel(false)}
                className="p-0.5 rounded text-text-muted/30 hover:text-text-muted hover:bg-white/5 transition-all"
                aria-label="Fechar replay"
              >
                <X size={10} />
              </button>
            )}
          </div>

          {/* Timeline */}
          <div className="mb-3 px-1 group">
            <ReplayTimeline
              stages={replay.stages}
              currentIndex={replay.currentIndex}
              isActive={replay.isActive || showPanel}
              onJump={handleJump}
            />
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between">
            <ReplayControls
              isActive={replay.isActive}
              isPlaying={replay.state === 'playing'}
              isDone={replay.state === 'done'}
              speed={replay.speed}
              onPlay={() => replay.play()}
              onPause={() => replay.pause()}
              onNext={() => replay.next()}
              onPrev={() => replay.previous()}
              onRestart={() => replay.restart()}
              onSpeedChange={(s) => replay.setSpeed(s)}
            />

            {/* Bookmarks */}
            <ReplayBookmarks
              bookmarks={replay.bookmarks}
              currentIndex={replay.currentIndex}
              onJump={handleJump}
            />
          </div>
        </motion.div>
      )}

      {/* Story card */}
      {replay.currentStage && (
        <ReplayStoryCard
          stage={replay.currentStage}
          event={currentEvent}
          visible={replay.isActive}
        />
      )}
    </AnimatePresence>
  )
}
