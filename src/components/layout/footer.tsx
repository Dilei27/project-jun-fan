import Link from 'next/link';
import { footerLinks } from '@/config/navigation';

export function Footer() {
  return (
    <footer className="border-t border-border-subtle mt-auto" role="contentinfo">
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <nav className="flex flex-wrap justify-center gap-4 mb-4" aria-label="Links do rodapé">
          {footerLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">GitHub</a>
          <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">Contato</a>
        </nav>
        <p className="text-center text-xs text-text-muted">
          Project Jun Fan &mdash; Build. Automate. Innovate.
        </p>
      </div>
    </footer>
  );
}
