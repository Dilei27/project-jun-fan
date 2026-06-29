'use client';

import { motion } from 'framer-motion';
import { motion as m } from '@/design-system/motion';
import { PROFILE } from '../data/profile';
import type { Skill } from '../data/profile';

const CATEGORY_COLORS: Record<string, string> = {
  Automation: '#4F8CFF',
  Language: '#EAB308',
  Framework: '#22C55E',
  'CI/CD': '#22D3EE',
  Performance: '#FB923C',
  API: '#C084FC',
  Data: '#687385',
  AI: '#22C55E',
  Animation: '#C084FC',
  Styling: '#22D3EE',
  Architecture: '#EAB308',
  Domain: '#687385',
};

const LEVEL_DOT: Record<string, number> = {
  expert: 3,
  advanced: 2,
  intermediate: 1,
};

export function SkillsGraph() {
  const grouped = groupBy(PROFILE.skills, 'category') as Record<string, Skill[]>

  return (
    <div className="rounded-xl p-5" style={{
      background: 'rgba(17, 24, 33, 0.6)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(244, 247, 250, 0.04)',
    }}>
      <h2 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
        Skills & Conexões
      </h2>

      <div className="space-y-2">
        {Object.entries(grouped).map(([category, skills], ci) => {
          const catColor = CATEGORY_COLORS[category] ?? '#687385'
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: ci * 0.04, ease: m.easing.out }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1 h-1 rounded-full" style={{ background: catColor }} />
                <span className="text-[7px] uppercase tracking-wider font-medium" style={{ color: catColor }}>
                  {category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1 pl-2.5">
                {skills.map((skill, si) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: ci * 0.04 + si * 0.015, ease: m.easing.out }}
                    className="flex items-center gap-1.5 px-2 py-1.5 rounded transition-all hover:bg-white/[0.02]"
                    title={`${skill.name} — ${skill.projects.join(', ')}`}
                  >
                    {/* Level indicator */}
                    <div className="flex gap-[2px]">
                      {[1, 2, 3].map(level => (
                        <div
                          key={level}
                          className="w-[3px] h-[3px] rounded-full"
                          style={{
                            background: level <= LEVEL_DOT[skill.level] ? skill.color : 'rgba(244,247,250,0.08)',
                          }}
                        />
                      ))}
                    </div>

                    {/* Name */}
                    <span className="text-[9px] text-text-primary truncate flex-1">{skill.name}</span>

                    {/* Project count */}
                    <span className="text-[6px] text-text-muted/30">{skill.projects.length}p</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = String(item[key])
    ;(acc[k] ??= []).push(item)
    return acc
  }, {} as Record<string, T[]>)
}
