'use client';

import { useEffect, useState, useRef } from 'react';
import { getFullGraph } from '@/core';
import type { GraphNode } from '@/core';

interface Dims {
  vw: number; vh: number;
  cw: number; ch: number;
  sw: number; sh: number;
  cx: number; cy: number;
}

export function DebugGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dims, setDims] = useState<Dims>({ vw: 0, vh: 0, cw: 0, ch: 0, sw: 0, sh: 0, cx: 0, cy: 0 });

  const data = getFullGraph();

  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const el = containerRef.current;
      if (!el) return;
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      const r = el.getBoundingClientRect();
      const svg = svgRef.current;
      const sw = svg?.clientWidth ?? 0;
      const sh = svg?.clientHeight ?? 0;
      setDims({ vw, vh, cw, ch, sw, sh, cx: r.left, cy: r.top });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const issues: string[] = [];
  if (data.nodes.length === 0) issues.push('Nenhum nó carregado');
  const missingId = data.nodes.find(n => !n.id);
  if (missingId) issues.push(`Nó sem ID: ${missingId.label}`);
  const missingLabel = data.nodes.find(n => !n.label);
  if (missingLabel) issues.push(`Nó sem label: ${missingLabel.id}`);
  const missingType = data.nodes.find(n => !n.type);
  if (missingType) issues.push(`Nó sem type: ${missingType.id}`);

  const first = data.nodes[0];
  const cols = 8;
  const cellW = 170;
  const cellH = 32;
  const padX = 16;
  const padY = 16;

  return (
    <div className="h-full w-full flex flex-col bg-[#0d0d0d] text-green-400 font-mono">
      {/* Debug info bar */}
      <div className="shrink-0 px-3 py-1.5 border-b border-green-900/40 text-[11px] leading-relaxed space-y-0.5">
        <div className="flex flex-wrap gap-x-6 gap-y-0.5">
          <span>Viewport: <b>{dims.vw}×{dims.vh}</b></span>
          <span>Container: <b>{dims.cw}×{dims.ch}</b> at ({dims.cx},{dims.cy})</span>
          <span>SVG: <b>{dims.sw}×{dims.sh}</b></span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-0.5">
          <span>Nodes: <b>{data.nodes.length}</b></span>
          <span>Edges: <b>{data.edges.length}</b></span>
          <span>First: <b>{first ? `${first.id} (${first.type})` : '—'}</b></span>
          {issues.length > 0 && <span className="text-red-400">⚠ {issues.join(' | ')}</span>}
        </div>
      </div>

      {/* SVG canvas — NO viewBox, NO transform, NO simulation */}
      <div ref={containerRef} className="flex-1 min-h-0 relative">
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{ background: '#111' }}
        >
          {/* SVG border frame */}
          <rect x="0.5" y="0.5" width="100%" height="100%" fill="none" stroke="green" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

          {/* Corner markers */}
          <circle cx="0" cy="0" r="6" fill="#ff4444" />
          <text x="10" y="4" fill="#ff4444" fontSize="11" fontWeight="bold">TL (0,0)</text>

          <circle cx="100%" cy="0" r="6" fill="#ff4444" />
          <text x="-80" y="4" fill="#ff4444" fontSize="11" fontWeight="bold">TR (100%,0)</text>

          <circle cx="0" cy="100%" r="6" fill="#ff4444" />
          <text x="10" y="-4" fill="#ff4444" fontSize="11" fontWeight="bold">BL (0,100%)</text>

          <circle cx="100%" cy="100%" r="6" fill="#ff4444" />

          {/* Center marker */}
          <circle cx="50%" cy="50%" r="6" fill="#ffcc00" />
          <text x="50%" y="50%" dx="10" dy="4" fill="#ffcc00" fontSize="11" fontWeight="bold">Center (50%,50%)</text>

          {/* Crosshair at center */}
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#ffcc00" strokeWidth="0.5" opacity="0.3" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#ffcc00" strokeWidth="0.5" opacity="0.3" />

          {/* Grid of real nodes */}
          {data.nodes.map((node, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = padX + col * cellW;
            const y = padY + row * cellH;
            return (
              <g key={node.id}>
                <circle cx={x} cy={y} r="3" fill="#4F8CFF" />
                <text x={x + 6} y={y + 1} fill="#c0c0c0" fontSize="9">{node.id.length > 28 ? node.id.slice(0, 27) + '…' : node.id}</text>
                <text x={x + 6} y={y + 10} fill="#666" fontSize="7">{node.type}</text>
              </g>
            );
          })}

          {/* Bottom-right label */}
          <text x="100%" y="100%" dx="-8" dy="-4" textAnchor="end" fill="green" fontSize="9" opacity="0.5">
            SVG w/o viewBox — {data.nodes.length} nodes
          </text>
        </svg>

        {/* Floating summary */}
        <div className="absolute bottom-2 left-2 bg-black/70 border border-green-800/40 rounded px-2 py-1 text-[10px] text-green-500/70">
          Container: {dims.cw}×{dims.ch}px | SVG: {dims.sw}×{dims.sh}px
        </div>
      </div>
    </div>
  );
}
