'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/config/navigation';
import { motion as m } from '@/design-system/motion';
import { StatusDot } from '@/components/shared/status-dot';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (menuOpen) {
      requestAnimationFrame(() => setMenuOpen(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <motion.header
      data-jf-site-header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: m.duration.normal, ease: m.easing.out }}
      className="fixed top-0 left-0 right-0 z-50 bg-surface-default/40 backdrop-blur-xl border-b border-border-subtle/40"
      style={{
        boxShadow:
          'inset 0 1px 0 0 rgba(244, 247, 250, 0.04), 0 4px 24px -8px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 text-text-primary font-semibold text-sm tracking-wide transition-opacity duration-200 hover:opacity-80"
        >
          <span className="relative w-6 h-6 rounded bg-accent-qa flex items-center justify-center text-white text-xs font-bold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_2px_8px_-2px_rgba(79,140,255,0.4)]">
            JF
            <span
              aria-hidden
              className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-success"
              style={{ animation: 'pulse-dot 2.4s ease-in-out infinite' }}
            />
          </span>
          Jun Fan
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
          {navLinks.map(link => {
            const isActive = pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3 py-2 text-sm rounded-md transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:bg-accent-qa after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-100 ${
                  isActive
                    ? 'text-text-primary font-medium after:scale-x-100'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden md:flex items-center gap-1.5 text-[10px] text-text-muted">
            <StatusDot status="online" size={6} showHalo={false} />
            <span className="uppercase tracking-wider">Online</span>
          </span>
          <motion.button
            whileTap={m.tap.soft}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary rounded-md transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'x' : 'menu'}
                initial={{ opacity: 0, rotate: -45, scale: 0.85 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.85 }}
                transition={{ duration: m.duration.fast, ease: m.easing.out }}
                className="inline-flex"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: m.duration.normal, ease: m.easing.out }}
            className="md:hidden overflow-hidden border-t border-border-subtle/40 bg-surface-default/80 backdrop-blur-xl px-4"
            aria-label="Navegação mobile"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: m.stagger.tight, delayChildren: 0.05 } },
              }}
              className="py-2"
            >
              {navLinks.map(link => {
                const isActive = pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -8 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: m.duration.fast, ease: m.easing.out },
                      },
                    }}
                  >
                    <Link
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`block px-3 py-2.5 text-sm rounded-md transition-colors ${
                        isActive
                          ? 'text-text-primary font-medium bg-surface-soft'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-soft'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
