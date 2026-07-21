'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { practice } from '@/lib/content';
import { asset } from '@/lib/asset';
import { Reveal } from './Reveal';

const INHALE = 4000; // вдох — 4 счёта
const EXHALE = 8000; // выдох — 8 счётов
const WORDS = ['есть', 'здесь', 'сейчас']; // три круга возвращения

export default function Practice() {
  const [breath, setBreath] = useState(0);
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [count, setCount] = useState(1);
  const [playing, setPlaying] = useState(true);

  // Смена фаз с разной длительностью
  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const dur = phase === 'inhale' ? INHALE : EXHALE;
    const t = setTimeout(() => {
      if (phase === 'inhale') setPhase('exhale');
      else {
        setBreath((b) => (b + 1) % WORDS.length);
        setPhase('inhale');
      }
    }, dur);
    return () => clearTimeout(t);
  }, [phase, breath, playing]);

  // Счёт внутри фазы
  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const max = phase === 'inhale' ? 4 : 8;
    setCount(1);
    let c = 1;
    const id = setInterval(() => {
      c = Math.min(max, c + 1);
      setCount(c);
    }, 1000);
    return () => clearInterval(id);
  }, [phase, breath, playing]);

  const inhale = phase === 'inhale';
  const dots = inhale ? 4 : 8;

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
                animate={{ scale: [0.7, 1.9], opacity: [0.45, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeOut', delay: r * 3.5 }}
              />
            ))}

            {/* центральный круг «дыхание» */}
            <motion.button
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? 'Пауза' : 'Начать дыхание'}
              className="absolute left-1/2 top-1/2 grid size-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-milk/50 bg-milk/15 text-center backdrop-blur-md"
              animate={{ scale: inhale ? 1.16 : 0.82 }}
              transition={{ duration: (inhale ? INHALE : EXHALE) / 1000, ease: 'easeInOut' }}
            >
              <span className="pointer-events-none flex select-none flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.24em] text-milk/70">
                  {inhale ? 'Вдох · 4' : 'Выдох · 8'}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${phase}-${breath}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.5 }}
                    className="mt-1.5 block font-display text-[1.7rem] leading-none text-milk"
                  >
                    {inhale ? 'Я' : `Я ${WORDS[breath]}`}
                  </motion.span>
                </AnimatePresence>
                {playing ? (
                  <span className="mt-2.5 flex gap-1">
                    {Array.from({ length: dots }).map((_, k) => (
                      <span
                        key={k}
                        className={`size-1 rounded-full transition-colors duration-300 ${
                          k < count ? 'bg-milk' : 'bg-milk/25'
                        }`}
                      />
                    ))}
                  </span>
                ) : (
                  <span className="mt-2.5 text-[10px] uppercase tracking-[0.24em] text-milk/70">
                    нажмите
                  </span>
                )}
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
