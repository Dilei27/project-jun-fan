'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';
import { Info } from 'lucide-react';

export function SectionHeading({ title, description, icon }: { title: string; description: string; icon?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <div className="group relative mb-4 flex items-center gap-1.5">
      {icon}
      <h2 className="text-[12px] font-semibold uppercase tracking-wider text-text-muted">{title}</h2>
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        aria-label={`Sobre ${title}`}
        aria-describedby={tooltipId}
        aria-expanded={open}
        className="rounded p-0.5 text-text-muted/50 transition-colors hover:text-accent-qa focus-visible:text-accent-qa"
      >
        <Info size={13} />
      </button>
      <span
        id={tooltipId}
        role="tooltip"
        className={`absolute left-0 top-full z-30 w-60 rounded-md border border-border-subtle/70 bg-surface-elevated px-2.5 py-2 text-xs normal-case tracking-normal text-text-secondary shadow-[var(--shadow-mid)] transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'}`}
      >
        {description}
      </span>
    </div>
  );
}
