'use client';

import { Terminal, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { RevealText, FadeIn, HeroStage } from '@/components/shared/reveal';
import { HeroParallax } from '@/components/shared/hero-parallax';
import { CursorSpotlight } from '@/components/shared/cursor-spotlight';

export function HeroCommandCenter() {
  return (
    <HeroStage>
      <HeroParallax intensity={0.25}>
        <CursorSpotlight
          size={400}
          intensity={0.1}
          className="absolute inset-0"
          innerClassName="absolute inset-0"
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(79, 140, 255, 0.06), transparent 60%)',
            }}
          />
        </CursorSpotlight>
      </HeroParallax>

      <div className="relative max-w-[1440px] mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <FadeIn delay={0.05} y={6}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-accent-qa bg-accent-qa/8 border border-accent-qa/20 rounded-full shadow-[inset_0_1px_0_0_rgba(79,140,255,0.08)]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-qa jf-pulse-dot" />
              Quality ecosystem online
            </div>
          </FadeIn>

          <RevealText
            as="h1"
            delay={0.1}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-text-primary mb-5 leading-[1.02] tracking-[-0.025em] text-balance block"
          >
            QA Command Center
          </RevealText>

          <FadeIn delay={0.55} y={10}>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-10 text-balance">
              Hub central, portfólio vivo e cockpit do ecossistema de
              automação, QA e IA aplicada. Projetos, decisões técnicas,
              métricas e documentação em uma experiência coesa.
            </p>
          </FadeIn>

          <FadeIn delay={0.7} y={6}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#produtos"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-accent-qa text-white rounded-lg text-sm font-semibold transition-[box-shadow,background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_4px_16px_-4px_rgba(79,140,255,0.35)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_8px_24px_-6px_rgba(79,140,255,0.5)] hover:bg-accent-qa/95 hover:-translate-y-0.5"
              >
                Explorar produtos{' '}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/command-center/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-surface-elevated/60 backdrop-blur-sm border border-border-subtle/60 text-text-primary rounded-lg text-sm font-semibold transition-[box-shadow,background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[inset_0_1px_0_0_rgba(244,247,250,0.04)] hover:bg-surface-soft hover:border-border-strong hover:-translate-y-0.5"
              >
                <Terminal size={16} /> Ver projetos
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </HeroStage>
  );
}
