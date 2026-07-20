'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { nav, site } from '@/lib/content';

const sectionIds = ['about', 'approach', 'services', 'practice', 'contact'];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Блокировка прокрутки при открытом меню
  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-line-soft/70 bg-milk/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Логотип */}
          <a href="#top" className="group flex items-center gap-3" aria-label={site.name}>
            <span className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-gold/40 bg-navy text-milk">
              <span className="font-display text-lg leading-none">Т</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-[17px] font-medium text-navy-deep">{site.name}</span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-gold-deep">
                {site.tagline}
              </span>
            </span>
          </a>

          {/* Навигация — десктоп */}
          <nav className="hidden items-center gap-1 md:flex">
            {nav.slice(0, 4).map((n) => {
              const id = n.href.replace('#', '');
              const isActive = active === id;
              return (
                <a
                  key={n.href}
                  href={n.href}
                  className={`relative rounded-full px-4 py-2 text-[13.5px] transition-colors duration-300 ${
                    isActive ? 'text-navy-deep' : 'text-muted hover:text-navy-deep'
                  }`}
                >
                  {n.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-navy px-5 py-2.5 text-[13.5px] font-medium text-milk shadow-[var(--shadow-lift)] transition-all duration-400 hover:bg-navy-deep sm:inline-flex"
            >
              Записаться
            </a>

            {/* Бургер — мобайл */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Меню"
              className="relative grid size-10 place-items-center rounded-full border border-line text-navy-deep md:hidden"
            >
              <span className="flex flex-col gap-[5px]">
                <span
                  className={`h-px w-5 bg-current transition-transform duration-300 ${
                    open ? 'translate-y-[6px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`h-px w-5 bg-current transition-opacity duration-300 ${
                    open ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`h-px w-5 bg-current transition-transform duration-300 ${
                    open ? '-translate-y-[6px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Индикатор прогресса */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-px origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-soft"
        />
      </header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col bg-milk/95 px-6 pb-10 pt-24 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-line-soft py-5 font-display text-3xl text-navy-deep"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto text-sm text-muted">
              <p className="text-gold-deep">{site.telegramHandle}</p>
              <p className="mt-1">{site.location}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
