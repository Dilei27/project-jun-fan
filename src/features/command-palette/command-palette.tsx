'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { searchAll } from '@/lib/search';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim() ? searchAll(query) : [];

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') handleClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      window.location.href = results[selectedIndex].url;
      handleClose();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Paleta de comandos"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="w-full max-w-[560px] bg-surface-elevated border border-border-subtle rounded-xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle">
          <Search size={18} className="text-text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Pesquisar produtos, projetos, docs..."
            className="flex-1 bg-transparent text-text-primary text-sm placeholder:text-text-muted outline-none"
            aria-label="Pesquisar"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs text-text-muted bg-surface-soft rounded">
            ESC
          </kbd>
        </div>

        {results.length > 0 && (
          <div className="max-h-64 overflow-y-auto p-2" role="listbox">
            {results.map((r, i) => (
              <Link
                key={`${r.type}-${r.title}`}
                href={r.url}
                onClick={handleClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  i === selectedIndex ? 'bg-surface-soft text-text-primary' : 'text-text-secondary'
                }`}
                role="option"
                aria-selected={i === selectedIndex}
              >
                <span className="text-xs uppercase tracking-wider text-text-muted w-20 shrink-0">{r.type}</span>
                <span className="flex-1 truncate">{r.title}</span>
              </Link>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-text-muted">
            Nenhum resultado para &ldquo;{query}&rdquo;
          </div>
        )}

        <div className="hidden sm:flex items-center gap-4 px-4 py-2 border-t border-border-subtle text-xs text-text-muted">
          <span><kbd className="px-1 py-0.5 bg-surface-soft rounded">↑↓</kbd> Navegar</span>
          <span><kbd className="px-1 py-0.5 bg-surface-soft rounded">Enter</kbd> Abrir</span>
          <span><kbd className="px-1 py-0.5 bg-surface-soft rounded">Esc</kbd> Fechar</span>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
