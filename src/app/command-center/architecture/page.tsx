import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ArchitectureFlow } from '@/features/command-center/components/architecture-flow';

export default function ArchitecturePage() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      <Link href="/command-center/" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft size={14} /> Command Center
      </Link>

      <h1 className="text-3xl font-extrabold text-text-primary mb-2">Arquitetura</h1>
      <p className="text-text-secondary mb-8 max-w-xl">
        Como os produtos do ecossistema se conectam — do QA Command Center ao AI Dock, passando por WhatsApp AI e Vigilante AI.
      </p>

      <div className="mb-10">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Fluxo do Ecossistema</h2>
        <ArchitectureFlow />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-surface-default border border-border-subtle rounded-lg">
          <h3 className="text-sm font-semibold text-accent-qa mb-2">QA Command Center</h3>
          <p className="text-sm text-text-secondary">Hub central que nucleia projetos, decisões, métricas e documentação. Ponto de entrada único para o ecossistema.</p>
        </div>
        <div className="p-5 bg-surface-default border border-border-subtle rounded-lg">
          <h3 className="text-sm font-semibold text-accent-whatsapp mb-2">WhatsApp AI</h3>
          <p className="text-sm text-text-secondary">Módulo de atendimento inteligente. Consome dados do hub e alimenta o AI Dock com interações contextuais.</p>
        </div>
        <div className="p-5 bg-surface-default border border-border-subtle rounded-lg">
          <h3 className="text-sm font-semibold text-accent-vigilante mb-2">Vigilante AI</h3>
          <p className="text-sm text-text-secondary">Módulo de monitoramento com IA. Compartilha a mesma base de design, tokens e componentes do ecossistema.</p>
        </div>
      </div>
    </div>
  );
}
