'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AtSign, FileText } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import { PROFILE } from '../data/profile';

export function HeroExperience() {
  const [resumeLanguage, setResumeLanguage] = useState<'pt' | 'en'>('pt');
  const resumeLabel = resumeLanguage === 'pt' ? 'Baixar currículo' : 'Download resume';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: m.easing.out }}
      className="relative rounded-2xl overflow-hidden px-8 py-14 mb-8"
      style={{
        background: [
          'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(79,140,255,0.08), transparent 70%)',
          'radial-gradient(ellipse 50% 40% at 70% 60%, rgba(196,132,252,0.05), transparent 60%)',
          'rgba(10, 14, 22, 0.4)',
        ].join(', '),
        border: '1px solid rgba(244,247,250,0.04)',
      }}
    >
      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: m.easing.out }}
        className="text-3xl font-bold text-text-primary tracking-tight"
      >
        {PROFILE.name}
      </motion.h1>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: m.easing.out }}
        className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-2"
      >
        <span className="text-base font-medium text-accent-qa">{PROFILE.title}</span>
        {PROFILE.subtitles.map((s, i) => (
          <span key={s} className="text-xs text-text-muted/60">
            {i > 0 && <span className="mr-2 text-text-muted/20">·</span>}
            {s}
          </span>
        ))}
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: m.easing.out }}
        className="text-sm text-text-muted/70 mt-3 max-w-2xl leading-relaxed"
      >
        {PROFILE.tagline}
      </motion.p>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: m.easing.out }}
        className="text-xs text-text-muted/50 mt-2 max-w-xl leading-relaxed"
      >
        {PROFILE.bio}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.52, ease: m.easing.out }}
        className="mt-5 flex flex-wrap gap-2"
      >
        <a
          href={PROFILE.contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle/60 bg-surface-default/70 px-3 py-2 text-xs font-medium text-text-primary transition-colors hover:border-accent-qa/50 hover:text-accent-qa"
        >
          <AtSign size={13} /> LinkedIn
        </a>
        <div className="inline-flex rounded-lg border border-border-subtle/60 bg-surface-default/70 p-0.5" aria-label="Idioma do currículo">
          <button
            type="button"
            onClick={() => setResumeLanguage('pt')}
            aria-pressed={resumeLanguage === 'pt'}
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${resumeLanguage === 'pt' ? 'bg-accent-qa text-white' : 'text-text-muted hover:text-text-primary'}`}
          >
            PT
          </button>
          <button
            type="button"
            onClick={() => setResumeLanguage('en')}
            aria-pressed={resumeLanguage === 'en'}
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${resumeLanguage === 'en' ? 'bg-accent-qa text-white' : 'text-text-muted hover:text-text-primary'}`}
          >
            EN
          </button>
        </div>
        <a
          href={PROFILE.contact.resumes[resumeLanguage]}
          download
          className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle/60 bg-surface-default/70 px-3 py-2 text-xs font-medium text-text-primary transition-colors hover:border-accent-qa/50 hover:text-accent-qa"
        >
          <FileText size={13} /> {resumeLabel}
        </a>
      </motion.div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: m.easing.out }}
        className="h-px mt-6 origin-left"
        style={{
          background: 'linear-gradient(90deg, rgba(79,140,255,0.3), rgba(196,132,252,0.1), transparent)',
        }}
      />
    </motion.div>
  )
}
