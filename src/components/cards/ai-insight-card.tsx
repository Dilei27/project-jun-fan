import { Lightbulb } from 'lucide-react';
import Link from 'next/link';

const insights = [
  { title: 'Automação ERP', href: '/projeto/automacao-erp-uau/', desc: '960 min → 192 min' },
  { title: 'WhatsApp AI', href: '/produto/whatsapp-ai/', desc: 'LangChain + GPT' },
  { title: 'Vigilante AI', href: '/produto/vigilante-ai/', desc: 'Classificação IA' },
];

export function AIInsightCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {insights.map(item => (
        <Link
          key={item.title}
          href={item.href}
          className="flex items-start gap-3 p-4 bg-surface-default border border-border-subtle rounded-lg hover:bg-surface-elevated hover:border-border-strong transition-all group"
        >
          <Lightbulb size={20} className="text-accent-qa shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-text-primary group-hover:text-accent-qa transition-colors">{item.title}</h4>
            <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
