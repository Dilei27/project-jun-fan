'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AtSign, FileText, UserRound, X } from 'lucide-react';
import Link from 'next/link';
import { PROFILE } from '@/features/engineering-profile/data/profile';
import { motion as m } from '@/design-system/motion';

export function ProfileDock() {
  const [open, setOpen] = useState(false);
  const [resumeLanguage, setResumeLanguage] = useState<'pt' | 'en'>('pt');

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: m.duration.normal, ease: m.easing.out }}
            className="jf-glass-modal absolute bottom-14 left-0 w-[min(20rem,calc(100vw-3rem))] rounded-xl p-3"
            style={{ boxShadow: 'var(--shadow-high)' }}
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <div>
                <p className="text-sm font-medium text-text-primary">Odirlei Alves</p>
                <p className="text-[10px] uppercase tracking-wider text-text-muted">QA Engineer</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded p-1 text-text-muted hover:text-text-primary" aria-label="Fechar perfil">
                <X size={15} />
              </button>
            </div>
            <div className="grid gap-2">
              <Link href="/profile/" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-lg bg-surface-soft/60 px-3 py-2 text-sm text-text-primary hover:bg-surface-soft">
                <UserRound size={14} className="text-accent-qa" /> Ver profile
              </Link>
              <a href={PROFILE.contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-surface-soft/60 hover:text-text-primary">
                <AtSign size={14} className="text-accent-qa" /> LinkedIn
              </a>
              <div className="flex items-center gap-2 rounded-lg px-1 pt-1">
                <div className="inline-flex rounded-md border border-border-subtle/60 p-0.5" aria-label="Idioma do currículo">
                  <button type="button" onClick={() => setResumeLanguage('pt')} aria-pressed={resumeLanguage === 'pt'} className={`rounded px-2 py-1 text-xs ${resumeLanguage === 'pt' ? 'bg-accent-qa text-white' : 'text-text-muted hover:text-text-primary'}`}>PT</button>
                  <button type="button" onClick={() => setResumeLanguage('en')} aria-pressed={resumeLanguage === 'en'} className={`rounded px-2 py-1 text-xs ${resumeLanguage === 'en' ? 'bg-accent-qa text-white' : 'text-text-muted hover:text-text-primary'}`}>EN</button>
                </div>
                <a href={PROFILE.contact.resumes[resumeLanguage]} download className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border-subtle/60 px-2 py-1.5 text-xs text-text-primary hover:border-accent-qa/50 hover:text-accent-qa">
                  <FileText size={13} /> {resumeLanguage === 'pt' ? 'Baixar currículo' : 'Download resume'}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        whileHover={{ y: -2, scale: 1.04 }}
        whileTap={m.tap.soft}
        onClick={() => setOpen(value => !value)}
        aria-label={open ? 'Fechar perfil e currículo' : 'Abrir perfil e currículo'}
        aria-expanded={open}
        className="flex h-12 items-center gap-2 rounded-full border border-border-subtle/60 bg-surface-elevated/90 px-4 text-sm font-medium text-text-primary shadow-[var(--shadow-mid)] backdrop-blur-xl hover:border-accent-qa/50"
      >
        <UserRound size={16} className="text-accent-qa" />
        <span className="hidden sm:inline">Perfil</span>
      </motion.button>
    </div>
  );
}
