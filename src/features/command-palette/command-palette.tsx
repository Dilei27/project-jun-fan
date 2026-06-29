'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, FileSearch, Command, GitFork, Shield, FileText, BookOpen, Home, Activity } from 'lucide-react';
import Link from 'next/link';
import { searchAll } from '@/lib/search';
import { motion as m } from '@/design-system/motion';
import { EmptyState } from '@/components/shared/empty-state';

interface QuickAction {
  label: string
  href: string
  icon: typeof Home
  category: string
}

const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Início', href: '/', icon: Home, category: 'Navegação' },
  { label: 'Knowledge Graph', href: '/knowledge-graph/', icon: GitFork, category: 'Navegação' },
  { label: 'QA Command Center', href: '/command-center/', icon: Shield, category: 'Navegação' },
  { label: 'Documentação', href: '/docs/', icon: FileText, category: 'Navegação' },
  { label: 'Decision Center', href: '/decisoes/', icon: BookOpen, category: 'Navegação' },
  { label: 'Digital Twin', href: '/twin/', icon: Activity, category: 'Navegação' },
  { label: 'Timeline', href: '/command-center/timeline/', icon: Shield, category: 'Navegação' },
  { label: 'Arquitetura', href: '/command-center/architecture/', icon: Shield, category: 'Navegação' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mode, setMode] = useState<'search' | 'navigate'>('search');
  const inputRef = useRef<HTMLInputElement>(null);

  const searchResults = query.trim() ? searchAll(query) : [];
  const filteredActions = useMemo(() => {
    if (!query.trim()) return QUICK_ACTIONS;
    const q = query.toLowerCase();
    return QUICK_ACTIONS.filter(a => a.label.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
  }, [query]);

  const allResults = useMemo(() => {
    if (mode === 'navigate') return filteredActions.map(a => ({ type: a.category, title: a.label, url: a.href }));
    return searchResults;
  }, [mode, searchResults, filteredActions]);

  const results = query.trim() ? allResults : filteredActions.map(a => ({ type: a.category, title: a.label, url: a.href }));

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery('');
    setSelectedIndex(0);
    setMode('search');
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
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
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
          transition={{ duration: m.duration.fast, ease: m.easing.out }}
          className="jf-glass-subtle fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Paleta de comandos"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4 }}
            transition={{ duration: m.duration.normal, ease: m.easing.out }}
            className="jf-glass-modal w-full max-w-[560px] rounded-xl overflow-hidden"
            style={{
              boxShadow:
                'inset 0 1px 0 0 rgba(244, 247, 250, 0.06), 0 0 0 1px rgba(79, 140, 255, 0.06), 0 24px 64px -16px rgba(0, 0, 0, 0.7), 0 32px 80px -16px rgba(0, 0, 0, 0.5)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle/50">
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
              <span className="hidden sm:flex items-center gap-1 text-[9px] text-text-muted/40">
                <Command size={10} />
                <span
                  className="px-1 py-0.5 rounded cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setMode(m => m === 'search' ? 'navigate' : 'search')}
                >
                  {mode === 'search' ? 'Navegar' : 'Buscar'}
                </span>
              </span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs text-text-muted bg-surface-soft/60 rounded">
                ESC
              </kbd>
            </div>

            <AnimatePresence mode="wait">
              {results.length > 0 && (
                <motion.div
                  key={`results-${query}-${mode}`}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: m.duration.fast } }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: m.stagger.tight } },
                  }}
                  className="max-h-64 overflow-y-auto p-2"
                  role="listbox"
                >
                  {results.map((r, i) => (
                    <motion.div
                      key={`${r.type}-${r.title}`}
                      variants={{
                        hidden: { opacity: 0, y: 4 },
                        visible: { opacity: 1, y: 0, transition: { duration: m.duration.fast, ease: m.easing.out } },
                      }}
                    >
                      <Link
                        href={r.url}
                        onClick={handleClose}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
                          i === selectedIndex
                            ? 'bg-surface-soft/70 text-text-primary'
                            : 'text-text-secondary hover:bg-surface-default/60'
                        }`}
                        role="option"
                        aria-selected={i === selectedIndex}
                      >
                        <span className="text-[9px] uppercase tracking-wider text-text-muted w-20 shrink-0">
                          {r.type}
                        </span>
                        <span className="flex-1 truncate">{r.title}</span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {query && results.length === 0 && (
              <EmptyState
                icon={<FileSearch size={20} />}
                title="Nenhum resultado encontrado"
                description={`Não encontramos nada para "${query}". Tente outras palavras-chave ou explore a documentação.`}
              />
            )}

            {!query && results.length === 0 && (
              <EmptyState
                icon={<Sparkles size={20} />}
                title="Comece a pesquisar"
                description="Use palavras-chave como produto, projeto, decisão ou tecnologia para explorar o ecossistema."
              />
            )}

            <div className="hidden sm:flex items-center gap-4 px-4 py-2 border-t border-border-subtle/50 text-xs text-text-muted">
              <span><kbd className="px-1 py-0.5 bg-surface-soft/60 rounded">↑↓</kbd> Navegar</span>
              <span><kbd className="px-1 py-0.5 bg-surface-soft/60 rounded">Enter</kbd> Abrir</span>
              <span><kbd className="px-1 py-0.5 bg-surface-soft/60 rounded">⌘K</kbd> Alternar</span>
              <span><kbd className="px-1 py-0.5 bg-surface-soft/60 rounded">Esc</kbd> Fechar</span>
              <span className="text-text-muted/40">·</span>
              <button
                onClick={() => setMode(m => m === 'search' ? 'navigate' : 'search')}
                className="text-text-muted/60 hover:text-text-primary transition-colors cursor-pointer"
              >
                {mode === 'search' ? 'Modo navegação' : 'Modo busca'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
