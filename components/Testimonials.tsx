'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { testimonials } from '@/lib/content';
import { Reveal } from './Reveal';

const DURATION = 6000;

export default function Testimonials() {
  const items = testimonials.items;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const id = setTimeout(() => setI((v) => (v + 1) % items.length), DURATION);
    return () => clearTimeout(id);
  }, [i, paused, items.length]);

  const cur = items[i];

  return (
    <section
      className="relative overflow-hidden bg-navy-deep py-24 text-milk sm:py-28 lg:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* атмосфера */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_22%,transparent),transparent_65%)] blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold-soft)_12%,transparent),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow !text-gold-soft">{testimonials.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-light leading-[1.04] text-milk balance">
              {testimonials.title}
            </h2>
          </Reveal>
        </div>

        {/* Витрина цитаты */}
        <Reveal delay={0.14}>
          <div className="relative mt-14 min-h-[240px] sm:min-h-[220px]">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-10 left-0 font-display text-[7rem] leading-none text-gold/40 sm:-top-14 sm:text-[9rem]"
            >
              “
            </span>
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative pt-6"
              >
                <blockquote className="font-display text-[clamp(1.5rem,3.4vw,2.6rem)] font-light leading-snug text-milk/95">
                  {cur.t}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-gold/20 font-display text-lg text-gold-soft">
                    {cur.n.charAt(0)}
                  </span>
                  <span className="text-milk/70">{cur.n}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Переключатели с прогрессом */}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-milk/12 pt-6">
          {items.map((t, idx) => {
            const active = idx === i;
            return (
              <button
                key={t.n}
                onClick={() => setI(idx)}
                className={`group relative py-2 text-left text-sm transition-colors duration-300 ${
                  active ? 'text-milk' : 'text-milk/40 hover:text-milk/70'
                }`}
              >
                <span className="font-display text-base">{t.n}</span>
                <span className="absolute -top-px left-0 h-px w-full bg-milk/15" />
                {active && (
                  <motion.span
                    key={`p-${i}-${paused}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? 0.001 : 1 }}
                    transition={{ duration: paused ? 0 : DURATION / 1000, ease: 'linear' }}
                    style={{ transformOrigin: 'left' }}
                    className="absolute -top-px left-0 h-px w-full bg-gold"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
