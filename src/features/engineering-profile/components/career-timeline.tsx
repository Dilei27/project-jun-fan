'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Briefcase, ExternalLink } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import { PROFILE } from '../data/profile';

const companyColors: Record<string, string> = {
  'Project Jun Fan': '#4F8CFF',
  'Blue Service': '#22C55E',
  'Bankme': '#EAB308',
  'Globaltec': '#C084FC',
};

export function CareerTimeline() {
  const [openId, setOpenId] = useState<string | null>('junfan')

  return (
    <div className="rounded-xl p-5" style={{
      background: 'rgba(17, 24, 33, 0.6)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(244, 247, 250, 0.04)',
    }}>
      <div className="flex items-center gap-1.5 mb-4">
        <Briefcase size={12} className="text-text-muted" />
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Trajetória</h2>
      </div>

      <div className="relative space-y-0">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: 'rgba(244,247,250,0.06)' }} />

        {PROFILE.career.map((entry, i) => {
          const color = companyColors[entry.company] ?? '#687385'
          const isOpen = openId === entry.id

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08, ease: m.easing.out }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : entry.id)}
                className="flex items-start gap-3 w-full text-left py-2 group"
              >
                {/* Dot */}
                <div
                  className="w-[15px] h-[15px] rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all"
                  style={{
                    borderColor: color,
                    background: isOpen ? `${color}20` : 'transparent',
                  }}
                >
                  <div
                    className="w-[5px] h-[5px] rounded-full transition-all"
                    style={{
                      background: color,
                      transform: isOpen ? 'scale(1.6)' : 'scale(1)',
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-text-primary">{entry.company}</span>
                    {entry.highlight && (
                      <span
                        className="text-[7px] px-1 py-0.5 rounded uppercase font-medium"
                        style={{ background: `${color}15`, color }}
                      >
                        Atual
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-text-muted/80">{entry.role}</span>
                    <span className="text-[8px] text-text-muted/40">{entry.period}</span>
                  </div>
                </div>

                <ChevronDown
                  size={10}
                  className="text-text-muted/30 transition-transform mt-1"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {/* Expanded details */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: m.easing.out }}
                    className="overflow-hidden"
                  >
                    <div className="pl-[31px] pb-3 space-y-3">
                      <p className="text-[10px] text-text-muted/70 leading-relaxed">
                        {entry.description}
                      </p>

                      {/* Technologies */}
                      <div>
                        <span className="text-[8px] uppercase tracking-wider text-text-muted/40 mb-1 block">Tecnologias</span>
                        <div className="flex flex-wrap gap-1">
                          {entry.technologies.map(t => (
                            <span
                              key={t}
                              className="text-[8px] px-1.5 py-0.5 rounded"
                              style={{ background: 'rgba(244,247,250,0.04)', color: 'rgba(244,247,250,0.6)' }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Results */}
                      <div>
                        <span className="text-[8px] uppercase tracking-wider text-text-muted/40 mb-1 block">Resultados</span>
                        <ul className="space-y-0.5">
                          {entry.results.map(r => (
                            <li key={r} className="flex items-start gap-1 text-[9px] text-text-muted/60">
                              <span className="text-success mt-0.5 shrink-0">▸</span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Knowledge acquired */}
                      <div>
                        <span className="text-[8px] uppercase tracking-wider text-text-muted/40 mb-1 block">Conhecimento adquirido</span>
                        <div className="flex flex-wrap gap-1">
                          {entry.knowledge.map(k => (
                            <span
                              key={k}
                              className="text-[8px] px-1.5 py-0.5 rounded"
                              style={{
                                background: `${color}10`,
                                color,
                              }}
                            >
                              {k}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
