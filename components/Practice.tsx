'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { practice } from '@/lib/content';
import { asset } from '@/lib/asset';
import { Reveal } from './Reveal';

const CYCLE = 4000; // мс на вдох / выдох

export default function Practice() {
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = setInterval(() => {
      setPhase((p) => (p === 'inhale' ? 'exhale' : 'inhale'));
    }, CYCLE);
    return () => clearInterval(id);
  }, [playing]);

  const inhale = phase === 'inhale';

  return (
    <section id="practice" className="relative py-24 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Текст */}
        <div>
          <Reveal>
            <p className="eyebrow">{practice.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-light italic leading-tight text-navy-deep">
              {practice.title}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-muted">{practice.lead}</p>
          </Reveal>

          <ol className="mt-9 space-y-5">
            {practice.steps.map((s, i) => (
              <Reveal key={i} delay={0.2 + i * 0.08}>
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-navy font-display text-sm text-milk">
                    {i + 1}
                  </span>
                  <p className="text-[16px] leading-relaxed text-ink/85">{s}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Интерактивный дыхательный круг */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-line shadow-[var(--shadow-soft)]">
            <Image
              src={asset('/images/breath.jpg')}
              alt=""
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,color-mix(in_oklab,var(--color-gold-deep)_22%,transparent))]" />

            {/* пульсирующие кольца */}
            {[0, 1].map((r) => (
              <motion.span
                key={r}
                aria-hidden
                className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-milk/40"
                animate={{ scale: [0.7, 1.9], opacity: [0.5, 0] }}
                transition={{ duration: CYCLE * 2 / 1000, repeat: Infinity, ease: 'easeOut', delay: r * (CYCLE / 1000) }}
              />
            ))}

            {/* центральный круг «дыхание» */}
            <motion.button
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? 'Пауза' : 'Начать дыхание'}
              className="absolute left-1/2 top-1/2 grid size-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-milk/50 bg-milk/15 text-center backdrop-blur-md"
              animate={{ scale: inhale ? 1.14 : 0.86 }}
              transition={{ duration: CYCLE / 1000, ease: 'easeInOut' }}
            >
              <span className="pointer-events-none select-none">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phase}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.5 }}
                    className="block font-display text-2xl text-milk"
                  >
                    {inhale ? 'Вдох' : 'Выдох'}
                  </motion.span>
                </AnimatePresence>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.24em] text-milk/70">
                  {playing ? practice.overlaySub : 'нажмите'}
                </span>
              </span>
            </motion.button>

            {/* подпись */}
            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-milk/30 bg-milk/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-milk/85 backdrop-blur-sm">
              <span className="size-1.5 animate-pulse rounded-full bg-milk" />
              {practice.overlayTitle}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
