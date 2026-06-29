'use client';

/**
 * AtmosphereBackground — camada fixa que sustenta todo o produto.
 *
 * Camadas (de baixo para cima):
 *  1. Base color (var(--color-bg-base))
 *  2. Ambient top-light (radial gradient)
 *  3. Ambient bottom-light (radial gradient sutil)
 *  4. Subtle horizontal "horizon" (1px line of light, very faint)
 *  5. Vignette (radial gradient nas bordas)
 *  6. SVG noise (filme granulado, ~2% opacity)
 *
 * Todas as camadas são `pointer-events: none` e `aria-hidden`.
 * O conteúdo fica acima via z-index de `depth.card`+.
 */

export function AtmosphereBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Camada 2: Top ambient light — luz que vem "do céu" */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 60% at 50% -10%, rgba(79, 140, 255, 0.06), transparent 60%)',
        }}
      />

      {/* Camada 3: Bottom ambient — luz de chão muito sutil */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 50% at 50% 110%, rgba(45, 212, 191, 0.03), transparent 60%)',
        }}
      />

      {/* Camada 4: Horizon line — uma linha horizontal de luz, quase imperceptível */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: '38%',
          height: '1px',
          background:
            'linear-gradient(to right, transparent 0%, rgba(79, 140, 255, 0.08) 50%, transparent 100%)',
        }}
      />

      {/* Camada 5: Vignette — escurecimento sutil nas bordas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 50%, rgba(0, 0, 0, 0.3) 100%)',
        }}
      />

      {/* Camada 6: SVG noise — granulado fino que adiciona densidade visual */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.025] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="atmosphere-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#atmosphere-noise)" />
      </svg>
    </div>
  );
}
