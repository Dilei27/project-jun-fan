'use client';

import type { NodeShape } from '../lib/node-identity';

interface NodeShapeProps {
  shape: NodeShape;
  r: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
}

/**
 * Shape renderer — gera path SVG para cada tipo de nó.
 * Garante identidade visual sem leitura.
 */
export function NodeShapeSVG({
  shape,
  r,
  fill,
  stroke = 'none',
  strokeWidth = 0,
  strokeDasharray,
}: NodeShapeProps) {
  const path = shapePath(shape, r);
  const inner = innerShapeFor(shape, r);
  return (
    <g>
      <path
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />
      {inner}
    </g>
  );
}

function shapePath(shape: NodeShape, r: number): string {
  switch (shape) {
    case 'circle':
    case 'dashed-circle':
      // Circle approximated as cubic bezier
      const k = 0.5522847498 * r;
      return `M ${-r} 0 C ${-r} ${-k} ${-k} ${-r} 0 ${-r} C ${k} ${-r} ${r} ${-k} ${r} 0 C ${r} ${k} ${k} ${r} 0 ${r} C ${-k} ${r} ${-r} ${k} ${-r} 0 Z`;
    case 'hexagon': {
      const angle = Math.PI / 3;
      let d = '';
      for (let i = 0; i < 6; i++) {
        const x = r * Math.cos(angle * i - Math.PI / 2);
        const y = r * Math.sin(angle * i - Math.PI / 2);
        d += (i === 0 ? 'M ' : ' L ') + x.toFixed(3) + ' ' + y.toFixed(3);
      }
      return d + ' Z';
    }
    case 'rounded-square': {
      const c = r * 0.32;
      return `M ${-r + c} ${-r} L ${r - c} ${-r} Q ${r} ${-r} ${r} ${-r + c} L ${r} ${r - c} Q ${r} ${r} ${r - c} ${r} L ${-r + c} ${r} Q ${-r} ${r} ${-r} ${r - c} L ${-r} ${-r + c} Q ${-r} ${-r} ${-r + c} ${-r} Z`;
    }
    case 'diamond': {
      return `M 0 ${-r} L ${r} 0 L 0 ${r} L ${-r} 0 Z`;
    }
    case 'shield': {
      return `M 0 ${-r} L ${r} ${-r * 0.4} L ${r} ${r * 0.3} Q ${r} ${r * 0.85} 0 ${r * 1.15} Q ${-r} ${r * 0.85} ${-r} ${r * 0.3} L ${-r} ${-r * 0.4} Z`;
    }
    case 'star': {
      const outer = r;
      const inner = r * 0.42;
      const points = 4;
      const angleStep = Math.PI / points;
      let d = '';
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outer : inner;
        const angle = angleStep * i - Math.PI / 2;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        d += (i === 0 ? 'M ' : ' L ') + x.toFixed(3) + ' ' + y.toFixed(3);
      }
      return d + ' Z';
    }
    case 'pill': {
      // Horizontal pill
      const w = r * 1.4;
      const h = r * 0.7;
      return `M ${-w + h} ${-h} L ${w - h} ${-h} Q ${w} ${-h} ${w} 0 Q ${w} ${h} ${w - h} ${h} L ${-w + h} ${h} Q ${-w} ${h} ${-w} 0 Q ${-w} ${-h} ${-w + h} ${-h} Z`;
    }
    case 'ring': {
      return shapePath('circle', r);
    }
    default:
      return shapePath('circle', r);
  }
}

function innerShapeFor(
  shape: NodeShape,
  r: number,
): React.ReactNode {
  switch (shape) {
    case 'circle':
    case 'hexagon':
    case 'rounded-square':
    case 'diamond':
    case 'shield':
    case 'pill':
      return null;
    case 'ring':
      return (
        <circle
          r={r * 0.45}
          fill="rgba(244, 247, 250, 0.85)"
        />
      );
    case 'star':
      return (
        <circle r={r * 0.25} fill="rgba(244, 247, 250, 0.9)" />
      );
    case 'dashed-circle':
      return null;
    default:
      return null;
  }
}

/**
 * Inner pattern overlay (lines, dot, etc.) for shapes that need it
 */
export function NodeInnerPattern({
  shape,
  r,
}: {
  shape: NodeShape;
  r: number;
  color: string;
}) {
  if (shape === ('architecture' as NodeShape)) {
    return (
      <g stroke="rgba(244, 247, 250, 0.35)" strokeWidth="1" fill="none">
        <line x1={-r * 0.5} y1={-r * 0.3} x2={r * 0.5} y2={-r * 0.3} />
        <line x1={-r * 0.5} y1={0} x2={r * 0.5} y2={0} />
        <line x1={-r * 0.5} y1={r * 0.3} x2={r * 0.5} y2={r * 0.3} />
      </g>
    );
  }
  if (shape === ('mission' as NodeShape)) {
    return (
      <circle r={r * 0.18} fill="rgba(244, 247, 250, 0.95)" />
    );
  }
  if (shape === ('metric' as NodeShape)) {
    return (
      <circle r={r * 0.35} fill="none" stroke="rgba(244, 247, 250, 0.7)" strokeWidth="1" />
    );
  }
  return null;
}

/**
 * Rim light — light incident on the top edge of a node
 */
export function NodeRimLight({ shape, r }: { shape: NodeShape; r: number }) {
  if (shape === 'star') {
    return (
      <ellipse
        cx={0}
        cy={-r * 0.55}
        rx={r * 0.32}
        ry={r * 0.08}
        fill="rgba(244, 247, 250, 0.35)"
      />
    );
  }
  if (shape === 'diamond') {
    return (
      <line
        x1={-r * 0.35}
        y1={-r * 0.5}
        x2={r * 0.35}
        y2={-r * 0.5}
        stroke="rgba(244, 247, 250, 0.4)"
        strokeWidth="1.5"
      />
    );
  }
  if (shape === 'shield') {
    return (
      <path
        d={`M ${-r * 0.4} ${-r * 0.7} Q 0 ${-r * 0.85} ${r * 0.4} ${-r * 0.7}`}
        fill="none"
        stroke="rgba(244, 247, 250, 0.35)"
        strokeWidth="1.5"
      />
    );
  }
  // Default: ellipse at top
  return (
    <ellipse
      cx={0}
      cy={-r * 0.55}
      rx={r * 0.55}
      ry={r * 0.15}
      fill="rgba(244, 247, 250, 0.18)"
    />
  );
}
