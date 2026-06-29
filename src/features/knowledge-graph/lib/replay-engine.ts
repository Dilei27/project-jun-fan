/**
 * ReplayEngine — Máquina de estados desacoplada para reprodução da evolução.
 *
 * Gerencia:
 *  - Etapas (stages) da evolução da plataforma
 *  - Play/Pause/Speed/Next/Prev/Restart
 *  - Eventos por etapa com temporização
 *  - Callbacks para câmera, highlight, eventos
 *
 * Nenhuma dependência de React, DOM ou interface.
 */

export type ReplaySpeed = 0.5 | 1 | 2;

export interface ReplayStage {
  id: string
  label: string
  description: string
  clusterId: string
  events: ReplayEvent[]
  bookmarked?: boolean
  future?: boolean
}

export interface ReplayEvent {
  type: 'node-appear' | 'edge-appear' | 'cluster-activate' | 'connection-burst' | 'milestone'
  message: string
  delay: number
}

export type ReplayPlayState = 'idle' | 'playing' | 'paused' | 'done';

export interface ReplayCallbacks {
  onStageChange: (stage: ReplayStage, index: number) => void
  onCameraTarget: (target: { clusterId: string; zoom?: number }) => void
  onEvent: (event: ReplayEvent, stageIndex: number) => void
  onPlayStateChange: (state: ReplayPlayState) => void
  onComplete: () => void
}

/* ─── Stages — evolução da plataforma ─── */

const STAGES: ReplayStage[] = [
  {
    id: 'foundation',
    label: 'Foundation',
    description: 'A base da plataforma foi estabelecida — missão, arquitetura e os primeiros produtos.',
    clusterId: 'core',
    bookmarked: true,
    events: [
      { type: 'milestone', message: 'Project Jun Fan — fundação estabelecida', delay: 0 },
      { type: 'node-appear', message: 'Arquitetura central definida', delay: 800 },
      { type: 'cluster-activate', message: 'Core Architecture ativo', delay: 1600 },
    ],
  },
  {
    id: 'knowledge-engine',
    label: 'Knowledge Engine',
    description: 'O Knowledge Engine tornou-se a fonte central de verdade da plataforma.',
    clusterId: 'knowledge',
    bookmarked: true,
    events: [
      { type: 'milestone', message: 'Knowledge Engine — fonte central de verdade', delay: 0 },
      { type: 'node-appear', message: 'Modelo de conhecimento unificado', delay: 600 },
      { type: 'edge-appear', message: 'Entidades conectadas ao engine', delay: 1200 },
    ],
  },
  {
    id: 'knowledge-graph',
    label: 'Knowledge Graph',
    description: 'O Knowledge Graph passou a representar visualmente todo o ecossistema.',
    clusterId: 'products',
    bookmarked: true,
    events: [
      { type: 'milestone', message: 'Knowledge Graph — ecossistema visual', delay: 0 },
      { type: 'node-appear', message: 'Produtos e projetos visíveis no grafo', delay: 500 },
      { type: 'connection-burst', message: 'Conexões entre entidades estabelecidas', delay: 1000 },
    ],
  },
  {
    id: 'qa-center',
    label: 'QA Command Center',
    description: 'O QA Command Center foi conectado ao grafo — métricas e qualidade integradas.',
    clusterId: 'projects',
    bookmarked: true,
    events: [
      { type: 'milestone', message: 'QA Command Center — qualidade integrada', delay: 0 },
      { type: 'node-appear', message: 'Métricas e testes conectados', delay: 700 },
      { type: 'cluster-activate', message: 'Cluster de QA ativado', delay: 1400 },
    ],
  },
  {
    id: 'living-docs',
    label: 'Living Docs',
    description: 'A documentação tornou-se viva — conectada ao código, decisões e componentes.',
    clusterId: 'knowledge',
    events: [
      { type: 'milestone', message: 'Living Documentation — docs conectadas', delay: 0 },
      { type: 'edge-appear', message: 'Docs vinculadas a decisões e componentes', delay: 800 },
    ],
  },
  {
    id: 'decision-center',
    label: 'Decision Center',
    description: 'Todas as ADRs e trade-offs centralizados com contexto e impacto visíveis.',
    clusterId: 'decisions',
    bookmarked: true,
    events: [
      { type: 'milestone', message: 'Decision Center — ADRs centralizadas', delay: 0 },
      { type: 'node-appear', message: 'Decisões técnicas catalogadas', delay: 600 },
      { type: 'connection-burst', message: 'Decisões conectadas a componentes', delay: 1200 },
    ],
  },
  {
    id: 'digital-twin',
    label: 'Digital Twin',
    description: 'O Engineering Digital Twin passou a espelhar cada componente da plataforma.',
    clusterId: 'skills',
    events: [
      { type: 'milestone', message: 'Digital Twin — componentes espelhados', delay: 0 },
      { type: 'cluster-activate', message: 'Twin Engine em operação', delay: 800 },
    ],
  },
  {
    id: 'platform-ecosystem',
    label: 'Platform Ecosystem',
    description: 'Todos os módulos integrados — contexto compartilhado, barra viva e ecossistema coeso.',
    clusterId: 'core',
    bookmarked: true,
    events: [
      { type: 'milestone', message: 'Ecossistema completo — plataforma integrada', delay: 0 },
      { type: 'connection-burst', message: 'Conexões entre todos os módulos', delay: 600 },
    ],
  },
  {
    id: 'sensei',
    label: 'Sensei (previsto)',
    description: 'O assistente inteligente que navegará pela plataforma automaticamente.',
    clusterId: 'core',
    future: true,
    events: [
      { type: 'milestone', message: 'Sensei — navegação inteligente (em planejamento)', delay: 0 },
    ],
  },
  {
    id: 'future-vision',
    label: 'Futuro',
    description: 'Repository Intelligence, Automation Intelligence, Impact Analysis e mais.',
    clusterId: 'core',
    future: true,
    events: [
      { type: 'milestone', message: 'Próximos módulos — expansão contínua', delay: 0 },
    ],
  },
];

/* ─── Engine ─── */

export class ReplayEngine {
  private _stages: ReplayStage[] = STAGES
  private _currentIndex = 0
  private _playState: ReplayPlayState = 'idle'
  private _speed: ReplaySpeed = 1
  private _callbacks: ReplayCallbacks | null = null
  private _timer: ReturnType<typeof setTimeout> | null = null
  private _eventQueue: Array<{ event: ReplayEvent; stageIndex: number }> = []
  private _listeners: Array<() => void> = []

  /* ─── Lifecycle ─── */

  setCallbacks(cbs: ReplayCallbacks) {
    this._callbacks = cbs
  }

  subscribe(fn: () => void) {
    this._listeners.push(fn)
    return () => {
      this._listeners = this._listeners.filter(l => l !== fn)
    }
  }

  private _notify() {
    for (const fn of this._listeners) fn()
  }

  /* ─── Getters ─── */

  get stages() { return this._stages }
  get currentIndex() { return this._currentIndex }
  get currentStage() { return this._stages[this._currentIndex] ?? null }
  get playState() { return this._playState }
  get speed() { return this._speed }
  get isActive() { return this._playState === 'playing' || this._playState === 'paused' }
  get bookmarks() { return this._stages.filter(s => s.bookmarked) }

  /* ─── Controls ─── */

  play() {
    if (this._playState === 'done') {
      this._currentIndex = 0
    }
    this._playState = 'playing'
    this._callbacks?.onPlayStateChange('playing')
    this._enterStage(this._currentIndex)
    this._notify()
  }

  pause() {
    if (this._playState !== 'playing') return
    this._playState = 'paused'
    this._clearTimer()
    this._callbacks?.onPlayStateChange('paused')
    this._notify()
  }

  togglePlay() {
    if (this._playState === 'playing') this.pause()
    else this.play()
  }

  next() {
    this._clearTimer()
    if (this._currentIndex < this._stages.length - 1) {
      this._currentIndex++
      if (this._playState === 'playing') {
        this._enterStage(this._currentIndex)
      }
    } else if (this._playState === 'playing') {
      this._complete()
    }
    this._notify()
  }

  previous() {
    if (this._currentIndex > 0) {
      this._clearTimer()
      this._currentIndex--
      if (this._playState === 'playing') {
        this._enterStage(this._currentIndex)
      }
    }
    this._notify()
  }

  restart() {
    this._clearTimer()
    this._currentIndex = 0
    this._playState = 'idle'
    this._callbacks?.onPlayStateChange('idle')
    this._notify()
  }

  setSpeed(speed: ReplaySpeed) {
    this._speed = speed
    this._notify()
  }

  jumpTo(index: number) {
    if (index < 0 || index >= this._stages.length) return
    this._clearTimer()
    this._currentIndex = index
    if (this._playState === 'playing') {
      this._enterStage(index)
    }
    this._notify()
  }

  /* ─── Internal ─── */

  private _enterStage(index: number) {
    const stage = this._stages[index]
    if (!stage) return

    this._callbacks?.onStageChange(stage, index)
    this._callbacks?.onCameraTarget({ clusterId: stage.clusterId })

    // Queue events with delays
    this._eventQueue = stage.events.map(e => ({ event: e, stageIndex: index }))
    this._processEventQueue()
  }

  private _processEventQueue() {
    if (this._playState !== 'playing') return

    const next = this._eventQueue.shift()
    if (!next) {
      // Stage complete — wait then advance
      this._timer = setTimeout(() => {
        if (this._playState === 'playing') {
          if (this._currentIndex < this._stages.length - 1) {
            this._currentIndex++
            this._enterStage(this._currentIndex)
            this._notify()
          } else {
            this._complete()
          }
        }
      }, 2000 / this._speed)
      return
    }

    this._callbacks?.onEvent(next.event, next.stageIndex)

    const delay = next.event.delay / this._speed
    this._timer = setTimeout(() => {
      this._processEventQueue()
    }, delay)
  }

  private _complete() {
    this._playState = 'done'
    this._callbacks?.onPlayStateChange('done')
    this._callbacks?.onComplete()
    this._notify()
  }

  private _clearTimer() {
    if (this._timer) {
      clearTimeout(this._timer)
      this._timer = null
    }
  }

  destroy() {
    this._clearTimer()
    this._callbacks = null
    this._listeners = []
  }
}
