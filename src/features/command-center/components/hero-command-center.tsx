import { Terminal, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroCommandCenter() {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle">
      <div className="max-w-[1440px] mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-accent-qa bg-accent-qa/10 border border-accent-qa/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Quality ecosystem online
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-text-primary mb-4 leading-[1.05] tracking-tight">
            QA Command Center
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-8">
            Hub central, portfólio vivo e cockpit do ecossistema de automação, QA e IA aplicada.
            Projetos, decisões técnicas, métricas e documentação em uma experiência coesa.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="#produtos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-qa text-white rounded-lg text-sm font-semibold hover:bg-accent-qa/90 transition-colors">
              Explorar produtos <ArrowRight size={16} />
            </Link>
            <Link href="/command-center/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface-elevated border border-border-subtle text-text-primary rounded-lg text-sm font-semibold hover:bg-surface-soft transition-colors">
              <Terminal size={16} /> Ver projetos
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-accent-qa/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent-whatsapp/5 blur-3xl pointer-events-none" />
    </section>
  );
}
