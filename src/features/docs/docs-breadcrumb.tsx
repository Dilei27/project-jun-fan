import Link from 'next/link';

export function DocsBreadcrumb({ current }: { current?: string }) {
  return (
    <nav aria-label="Caminho de navegação" className="mb-5 text-xs text-text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/" className="hover:text-text-primary">Início</Link></li>
        <li aria-hidden className="opacity-40">/</li>
        <li>{current ? <Link href="/docs/" className="hover:text-text-primary">Documentação</Link> : <span aria-current="page">Documentação</span>}</li>
        {current && <><li aria-hidden className="opacity-40">/</li><li aria-current="page" className="text-text-secondary">{current}</li></>}
      </ol>
    </nav>
  );
}
