'use client';

import { motion } from 'framer-motion';
import { Code2, AtSign, ArrowUpRight } from 'lucide-react';
import { motion as m } from '@/design-system/motion';
import { PROFILE } from '../data/profile';

const links = [
  { icon: <Code2 size={12} />, label: 'GitHub', href: PROFILE.contact.github, color: '#687385' },
  { icon: <AtSign size={12} />, label: 'LinkedIn', href: PROFILE.contact.linkedin, color: '#4F8CFF' },
  { icon: <AtSign size={12} />, label: 'Email', href: `mailto:${PROFILE.contact.email}`, color: '#22C55E' },
];

export function PublicPresence() {
  return (
    <div className="rounded-xl p-4" style={{
      background: 'rgba(17, 24, 33, 0.6)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(244, 247, 250, 0.04)',
    }}>
      <div className="flex items-center justify-center gap-6">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06, ease: m.easing.out }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all hover:bg-white/[0.02] group"
          >
            <span className="text-text-muted/50 group-hover:text-text-primary transition-colors">
              {link.icon}
            </span>
            <span className="text-[9px] text-text-muted/60 group-hover:text-text-primary transition-colors">
              {link.label}
            </span>
            <ArrowUpRight size={7} className="text-text-muted/20 group-hover:text-text-muted/50 transition-all" />
          </motion.a>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[7px] text-text-muted/20 ml-2"
        >
          {PROFILE.contact.email}
        </motion.div>
      </div>
    </div>
  )
}
