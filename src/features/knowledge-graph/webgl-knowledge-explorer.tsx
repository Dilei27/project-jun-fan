'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Maximize2, Menu, Move3D, RotateCcw, X } from 'lucide-react';
import { getFullGraph } from '@/core';
import { findShortestPath } from './lib/path-finder';
import { CLUSTERS } from './lib/cluster';
import { ReplayBar } from './components/replay-bar';

const KnowledgeScene = dynamic(() => import('./renderers/webgl/knowledge-scene').then(module => module.KnowledgeScene), { ssr: false });

export function WebGLKnowledgeExplorer({ onUseSvg }: { onUseSvg: (query?: string) => void }) {
  const graph = useMemo(() => getFullGraph(), []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [secondaryId, setSecondaryId] = useState<string | null>(null);
  const [overviewVersion, setOverviewVersion] = useState(0);
  const [mode, setMode] = useState<'explore' | 'architect'>('explore');
  const [quality, setQuality] = useState<'low' | 'standard' | 'ultra'>(() => typeof window !== 'undefined' && window.innerWidth < 768 ? 'low' : 'standard');
  const [toolbarOpen, setToolbarOpen] = useState(false);
  const selected = graph.nodes.find(node => node.id === selectedId) ?? null;
  const path = useMemo(() => selectedId && secondaryId ? findShortestPath(selectedId, secondaryId, graph.edges) : null, [graph.edges, secondaryId, selectedId]);
  const relatedNodes = useMemo(() => selectedId
    ? graph.edges
      .filter(edge => edge.source === selectedId || edge.target === selectedId)
      .map(edge => edge.source === selectedId ? edge.target : edge.source)
      .filter((id, index, ids) => ids.indexOf(id) === index)
      .map(id => graph.nodes.find(node => node.id === id))
      .filter((node): node is NonNullable<typeof node> => Boolean(node))
    : [], [graph.edges, graph.nodes, selectedId]);
  const selectNode = (id: string) => {
    if (selectedId === id && !secondaryId) { releaseFocus(); return; }
    if (!selectedId || secondaryId) { setSelectedId(id); setSecondaryId(null); return; }
    if (selectedId !== id) setSecondaryId(id);
  };
  const releaseFocus = () => { setSelectedId(null); setSecondaryId(null); setOverviewVersion(value => value + 1); };
  const travelTo = (id: string) => { setSelectedId(id); setSecondaryId(null); };
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
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const closeToolbar = () => { if (media.matches) setToolbarOpen(false); };
    media.addEventListener('change', closeToolbar);
    return () => media.removeEventListener('change', closeToolbar);
  }, []);

  return (
    <div className="relative h-full overflow-hidden bg-bg-deep">
      <KnowledgeScene className="absolute inset-0" onNodeSelect={selectNode} onEmptySpace={releaseFocus} onUnavailable={() => onUseSvg(selected?.label)} focusId={secondaryId ?? selectedId} selectedIds={[selectedId, secondaryId].filter((id): id is string => Boolean(id))} pathNodeIds={path?.nodeIds ?? []} pathEdgeKeys={Array.from(path?.edgeKeys ?? [])} mode={mode} quality={quality} overviewVersion={overviewVersion} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,12,18,0.45)_100%)]" />
      <div className="absolute left-4 top-[calc(1rem+env(safe-area-inset-top))] z-10 max-w-[15rem] md:left-6 md:top-6 md:max-w-sm">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent-qa">Knowledge Core</p>
        <h1 className="mt-1 text-lg font-bold tracking-[-0.03em] text-text-primary md:mt-2 md:text-2xl">Inteligência em movimento.</h1>
        <p className="mt-1 text-xs text-text-secondary md:mt-2 md:text-sm">Toque e arraste para navegar. Use dois dedos para aproximar.</p>
      </div>
      <div className="absolute right-6 top-6 z-10 hidden gap-2 md:flex">
        <Link href="/" className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle/60 bg-surface-elevated/80 px-2.5 py-1.5 text-xs text-text-secondary hover:text-text-primary"><ArrowLeft size={13} /> Core</Link>
        <button type="button" onClick={releaseFocus} className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle/60 bg-surface-elevated/80 px-2.5 py-1.5 text-xs text-text-secondary hover:text-text-primary"><RotateCcw size={13} /> Ajustar visão</button>
        <button type="button" onClick={() => onUseSvg(selected?.label)} className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle/60 bg-surface-elevated/80 px-2.5 py-1.5 text-xs text-text-secondary hover:text-text-primary"><Maximize2 size={13} /> Modo SVG</button>
      </div>
      <div className="absolute left-6 top-32 z-10 hidden gap-1 rounded-lg border border-border-subtle/60 bg-surface-elevated/80 p-1 text-xs md:flex">
        {(['explore', 'architect'] as const).map(item => <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-md px-2.5 py-1.5 ${mode === item ? 'bg-accent-qa text-white' : 'text-text-muted hover:text-text-primary'}`}>{item === 'explore' ? 'Explorar' : 'Arquiteto'}</button>)}
        <select aria-label="Qualidade da cena" value={quality} onChange={event => setQuality(event.target.value as typeof quality)} className="bg-transparent px-1 text-text-muted outline-none"><option value="low">Baixa</option><option value="standard">Padrão</option><option value="ultra">Alta</option></select>
      </div>
      <div className="absolute bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 z-10 flex items-center gap-2 rounded-md border border-border-subtle/50 bg-surface-elevated/80 px-3 py-2 text-xs text-text-muted md:bottom-6 md:left-6">
        <Move3D size={14} className="text-accent-qa" /> {graph.nodes.length} entidades reais · {graph.edges.length} relações
      </div>
      <div className="absolute right-4 top-[calc(0.75rem+env(safe-area-inset-top))] z-20 md:hidden">
        <button type="button" onClick={() => setToolbarOpen(open => !open)} className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-border-subtle/60 bg-surface-elevated/90 text-text-primary" aria-label={toolbarOpen ? 'Fechar controles' : 'Abrir controles'} aria-expanded={toolbarOpen}>
          {toolbarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        {toolbarOpen && <div className="absolute right-0 mt-2 flex w-44 flex-col gap-1 rounded-lg border border-border-subtle/60 bg-surface-elevated/95 p-1.5 shadow-[var(--shadow-high)] backdrop-blur-xl">
          <Link href="/" className="inline-flex items-center gap-2 rounded-md px-2.5 py-2 text-xs text-text-secondary"><ArrowLeft size={13} /> Voltar ao Core</Link>
          <button type="button" onClick={() => { releaseFocus(); setToolbarOpen(false); }} className="inline-flex items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs text-text-secondary"><RotateCcw size={13} /> Visão geral</button>
          <button type="button" onClick={() => onUseSvg(selected?.label)} className="inline-flex items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs text-text-secondary"><Maximize2 size={13} /> Modo SVG</button>
          <div className="mt-1 flex gap-1 border-t border-border-subtle/50 pt-1">
            {(['explore', 'architect'] as const).map(item => <button key={item} type="button" onClick={() => setMode(item)} className={`flex-1 rounded px-1.5 py-1.5 text-[10px] ${mode === item ? 'bg-accent-qa text-white' : 'text-text-muted'}`}>{item === 'explore' ? 'Explorar' : 'Arquiteto'}</button>)}
          </div>
        </div>}
      </div>
      <ReplayBar onCameraTarget={({ clusterId }) => focusReplayCluster(clusterId)} onReplayActive={() => {}} />
      {selected && (
        <aside className="absolute bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-4 right-4 z-10 w-auto max-h-[42svh] overflow-y-auto rounded-xl border border-border-subtle/60 bg-surface-elevated/90 p-4 shadow-[var(--shadow-high)] backdrop-blur-xl md:bottom-6 md:left-auto md:right-6 md:max-h-none md:w-[min(22rem,calc(100vw-3rem))]">
          <p className="text-[10px] uppercase tracking-[0.14em] text-accent-qa">{selected.type}</p>
          <h2 className="mt-1 text-base font-semibold text-text-primary">{selected.label}</h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{selected.description}</p>
          <p className="mt-3 text-xs text-text-muted">{secondaryId ? path ? `Caminho ativo com ${path.nodeIds.length - 1} relação(ões).` : 'Não há caminho conhecido entre essas entidades.' : 'Selecione uma segunda entidade para revelar o caminho mínimo.'}</p>
          <button type="button" onClick={releaseFocus} className="mt-3 text-xs uppercase tracking-[0.12em] text-text-muted hover:text-text-primary">← Overview</button>
          {relatedNodes.length > 0 && <div className="mt-3 border-t border-border-subtle/40 pt-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-text-muted">Relações diretas</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {relatedNodes.slice(0, 5).map(node => <button key={node.id} type="button" onClick={() => travelTo(node.id)} className="rounded-full border border-border-subtle/60 px-2 py-1 text-xs text-text-secondary hover:border-accent-qa/60 hover:text-text-primary">{node.label}</button>)}
            </div>
          </div>}
          {selected.url && <Link href={selected.url} className="mt-3 inline-flex text-sm text-accent-qa hover:underline">Abrir entidade</Link>}
        </aside>
      )}
    </div>
  );
}
