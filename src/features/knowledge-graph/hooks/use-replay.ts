'use client';

import { useRef, useSyncExternalStore, useCallback, useMemo } from 'react';
import { ReplayEngine, type ReplayCallbacks, type ReplayPlayState, type ReplayEvent, type ReplayStage } from '../lib/replay-engine';

export interface ReplayAPI {
  state: ReplayPlayState
  currentIndex: number
  currentStage: ReplayStage | null
  speed: 0.5 | 1 | 2
  isActive: boolean
  stages: ReplayStage[]
  bookmarks: ReplayStage[]
  play: () => void
  pause: () => void
  togglePlay: () => void
  next: () => void
  previous: () => void
  restart: () => void
  setSpeed: (speed: 0.5 | 1 | 2) => void
  jumpTo: (index: number) => void
  onStageChange: (fn: (stage: ReplayStage, index: number) => void) => void
  onCameraTarget: (fn: (target: { clusterId: string; zoom?: number }) => void) => void
  onEvent: (fn: (event: ReplayEvent, stageIndex: number) => void) => void
}

export function useReplay(): ReplayAPI {
  const engineRef = useRef<ReplayEngine | null>(null)

  if (!engineRef.current) {
    engineRef.current = new ReplayEngine()
  }

  const engine = engineRef.current

  const subscribe = useCallback(
    (fn: () => void) => engine.subscribe(fn),
    [engine],
  )

  const getSnapshot = useCallback(
    () => engine.playState,
    [engine],
  )

  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const callbacksRef = useRef<{
    onStageChange: ((stage: ReplayStage, index: number) => void)[]
    onCameraTarget: ((target: { clusterId: string; zoom?: number }) => void)[]
    onEvent: ((event: ReplayEvent, stageIndex: number) => void)[]
  }>({
    onStageChange: [],
    onCameraTarget: [],
    onEvent: [],
  })

  // Set up engine callbacks once
  if (engineRef.current && !('_initialized' in engine)) {
    (engine as any)._initialized = true
    engine.setCallbacks({
      onStageChange: (stage, index) => {
        for (const fn of callbacksRef.current.onStageChange) fn(stage, index)
      },
      onCameraTarget: (target) => {
        for (const fn of callbacksRef.current.onCameraTarget) fn(target)
      },
      onEvent: (event, stageIndex) => {
        for (const fn of callbacksRef.current.onEvent) fn(event, stageIndex)
      },
      onPlayStateChange: () => {},
      onComplete: () => {},
    })
  }

  const api = useMemo<ReplayAPI>(() => ({
    state,
    currentIndex: engine.currentIndex,
    currentStage: engine.currentStage,
    speed: engine.speed,
    isActive: engine.isActive,
    stages: engine.stages,
    bookmarks: engine.bookmarks,
    play: () => engine.play(),
    pause: () => engine.pause(),
    togglePlay: () => engine.togglePlay(),
    next: () => engine.next(),
    previous: () => engine.previous(),
    restart: () => engine.restart(),
    setSpeed: (s) => engine.setSpeed(s),
    jumpTo: (i) => engine.jumpTo(i),
    onStageChange: (fn) => { callbacksRef.current.onStageChange.push(fn) },
    onCameraTarget: (fn) => { callbacksRef.current.onCameraTarget.push(fn) },
    onEvent: (fn) => { callbacksRef.current.onEvent.push(fn) },
  }), [state, engine])

  return api
}
