import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-20 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-text-muted bg-surface-soft border border-border-subtle rounded-full">
        Error 404
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-3">
        Página não encontrada
      </h1>
      <p className="text-text-secondary max-w-md mx-auto mb-8">
        Esta página não existe no ecossistema Jun Fan. Pode ter sido movida ou o link pode estar incorreto.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-qa text-white rounded-lg text-sm font-medium hover:bg-accent-qa/90 transition-colors"
      >
        <ArrowLeft size={16} /> Voltar ao início
      </Link>
    </div>
  );
}
