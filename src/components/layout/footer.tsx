'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { footerLinks } from '@/config/navigation';
import { motion as m } from '@/design-system/motion';

export function Footer() {
  return (
    <footer
      className="mt-auto border-t border-border-subtle/40"
      style={{
        background: 'linear-gradient(to bottom, transparent, rgba(11, 15, 20, 0.5))',
      }}
      role="contentinfo"
    >
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <motion.nav
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: m.stagger.tight, delayChildren: 0.1 } },
          }}
          className="flex flex-wrap justify-center gap-1 mb-4"
          aria-label="Links do rodapé"
        >
          {footerLinks.map(link => (
            <motion.div
              key={link.href}
              variants={{
                hidden: { opacity: 0, y: 4 },
                visible: { opacity: 1, y: 0, transition: { duration: m.duration.normal, ease: m.easing.out } },
              }}
            >
              <Link
                href={link.href}
                className="group relative inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary px-2 py-1 rounded-md transition-colors duration-200"
              >
                <span
                  aria-hidden
                  className="w-1 h-1 rounded-full bg-accent-qa opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-150"
                />
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-text-muted">
          <p>Project Jun Fan &mdash; Build. Automate. Innovate.</p>
          <span aria-hidden className="hidden sm:inline opacity-30">·</span>
          <span className="inline-flex items-center gap-1 tabular-nums">
            <span>v2.0.0</span>
            <span aria-hidden className="opacity-30">·</span>
            <span>Phase 2 — RC-1</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
