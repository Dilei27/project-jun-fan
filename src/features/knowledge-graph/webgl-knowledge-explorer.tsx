'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Maximize2, Move3D, RotateCcw } from 'lucide-react';
import { getFullGraph } from '@/core';
import { findShortestPath } from './lib/path-finder';
import { CLUSTERS } from './lib/cluster';
import { ReplayBar } from './components/replay-bar';

const KnowledgeScene = dynamic(() => import('./renderers/webgl/knowledge-scene').then(module => module.KnowledgeScene), { ssr: false });

export function WebGLKnowledgeExplorer({ onUseSvg }: { onUseSvg: () => void }) {
  const graph = useMemo(() => getFullGraph(), []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [secondaryId, setSecondaryId] = useState<string | null>(null);
  const [mode, setMode] = useState<'explore' | 'architect'>('explore');
  const [quality, setQuality] = useState<'low' | 'standard' | 'ultra'>(() => typeof window !== 'undefined' && window.innerWidth < 768 ? 'low' : 'standard');
  const selected = graph.nodes.find(node => node.id === selectedId) ?? null;
  const path = useMemo(() => selectedId && secondaryId ? findShortestPath(selectedId, secondaryId, graph.edges) : null, [graph.edges, secondaryId, selectedId]);
  const selectNode = (id: string) => {
    if (!selectedId || secondaryId) { setSelectedId(id); setSecondaryId(null); return; }
    if (selectedId !== id) setSecondaryId(id);
  };
  const releaseFocus = () => { setSelectedId(null); setSecondaryId(null); };
  const focusReplayCluster = (clusterId: string) => {
    const cluster = CLUSTERS.find(item => item.id === clusterId);
    const node = graph.nodes.find(item => cluster?.types.includes(item.type));
    if (node) { setSelectedId(node.id); setSecondaryId(null); }
  };
  useEffect(() => {
    const canvas = document.createElement('canvas');
    if (!canvas.getContext('webgl2')) onUseSvg();
  }, [onUseSvg]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') releaseFocus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <div className="relative h-full overflow-hidden bg-bg-deep">
      <KnowledgeScene className="absolute inset-0" onNodeSelect={selectNode} onEmptySpace={releaseFocus} onUnavailable={onUseSvg} focusId={secondaryId ?? selectedId} selectedIds={[selectedId, secondaryId].filter((id): id is string => Boolean(id))} pathNodeIds={path?.nodeIds ?? []} pathEdgeKeys={Array.from(path?.edgeKeys ?? [])} mode={mode} quality={quality} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,12,18,0.45)_100%)]" />
      <div className="absolute left-6 top-6 z-10 max-w-sm">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent-qa">Knowledge Core</p>
        <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-text-primary">Inteligência em movimento.</h1>
        <p className="mt-2 text-sm text-text-secondary">Arraste para orbitar, use a roda para aproximar e selecione entidades reais para revelar contexto.</p>
      </div>
      <div className="absolute right-6 top-6 z-10 flex gap-2">
        <button type="button" onClick={releaseFocus} className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle/60 bg-surface-elevated/80 px-2.5 py-1.5 text-xs text-text-secondary hover:text-text-primary"><RotateCcw size={13} /> Ajustar visão</button>
        <button type="button" onClick={onUseSvg} className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle/60 bg-surface-elevated/80 px-2.5 py-1.5 text-xs text-text-secondary hover:text-text-primary"><Maximize2 size={13} /> Modo SVG</button>
      </div>
      <div className="absolute left-6 top-32 z-10 flex gap-1 rounded-lg border border-border-subtle/60 bg-surface-elevated/80 p-1 text-xs">
        {(['explore', 'architect'] as const).map(item => <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-md px-2.5 py-1.5 ${mode === item ? 'bg-accent-qa text-white' : 'text-text-muted hover:text-text-primary'}`}>{item === 'explore' ? 'Explorar' : 'Arquiteto'}</button>)}
        <select aria-label="Qualidade da cena" value={quality} onChange={event => setQuality(event.target.value as typeof quality)} className="bg-transparent px-1 text-text-muted outline-none"><option value="low">Baixa</option><option value="standard">Padrão</option><option value="ultra">Alta</option></select>
      </div>
      <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 rounded-md border border-border-subtle/50 bg-surface-elevated/80 px-3 py-2 text-xs text-text-muted">
        <Move3D size={14} className="text-accent-qa" /> {graph.nodes.length} entidades reais · {graph.edges.length} relações
      </div>
      <ReplayBar onCameraTarget={({ clusterId }) => focusReplayCluster(clusterId)} onReplayActive={() => {}} />
      {selected && (
        <aside className="absolute bottom-6 right-6 z-10 w-[min(22rem,calc(100vw-3rem))] rounded-xl border border-border-subtle/60 bg-surface-elevated/90 p-4 shadow-[var(--shadow-high)] backdrop-blur-xl">
          <p className="text-[10px] uppercase tracking-[0.14em] text-accent-qa">{selected.type}</p>
          <h2 className="mt-1 text-base font-semibold text-text-primary">{selected.label}</h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{selected.description}</p>
          <p className="mt-3 text-xs text-text-muted">{secondaryId ? path ? `Caminho ativo com ${path.nodeIds.length - 1} relação(ões).` : 'Não há caminho conhecido entre essas entidades.' : 'Selecione uma segunda entidade para revelar o caminho mínimo.'}</p>
          {selected.url && <Link href={selected.url} className="mt-3 inline-flex text-sm text-accent-qa hover:underline">Abrir entidade</Link>}
        </aside>
      )}
    </div>
  );
}
