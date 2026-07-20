'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { hero } from '@/lib/content';
import { asset } from '@/lib/asset';
import MagneticButton from './MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as const;

const wordReveal = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 1, delay: 0.35 + i * 0.12, ease: EASE },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const topWords = hero.titleTop.split(' ');

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28">
      {/* Атмосфера фона */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_18%,transparent),transparent_65%)] blur-2xl" />
        <div className="absolute -right-32 top-1/3 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-navy)_12%,transparent),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--color-cream)_60%,transparent))]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Левая колонка — текст */}
        <motion.div style={{ y: textY }} className="relative">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="eyebrow"
          >
            {hero.eyebrow}
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(3.2rem,9vw,6.5rem)] font-light leading-[0.94] tracking-[-0.01em] text-navy-deep">
            <span className="block overflow-hidden">
              {topWords.map((w, i) => (
                <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    variants={wordReveal}
                    custom={i}
                    initial="hidden"
                    animate="show"
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block italic text-gold-deep"
                variants={wordReveal}
                custom={topWords.length}
                initial="hidden"
                animate="show"
              >
                {hero.titleBottom}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
            className="mt-8 max-w-xl text-[17px] leading-relaxed text-muted"
          >
            {hero.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#contact" className="btn btn-primary">
              {hero.ctaPrimary}
            </MagneticButton>
            <MagneticButton href="#approach" className="btn btn-ghost">
              {hero.ctaSecondary}
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted"
          >
            {hero.badges.map((b, i) => (
              <span key={b} className="flex items-center gap-2.5">
                {i > 0 && <span className="hairline h-4 w-px" />}
                <span className="size-1.5 rounded-full bg-gold" />
                {b}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Правая колонка — изображение с параллаксом */}
        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.3, ease: EASE }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-line shadow-[var(--shadow-soft)]">
            <Image
              src={asset('/images/hero.jpg')}
              alt="Золотой ключ на камне — код доступа к себе"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_55%,color-mix(in_oklab,var(--color-navy-deep)_28%,transparent))]" />
          </div>

          {/* Вращающееся кольцо-печать */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute -left-6 -top-6 hidden size-28 rounded-full border border-dashed border-gold/50 sm:block lg:-left-10"
          />

          {/* Плавающая подпись-стекло */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: EASE }}
            className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-line bg-milk/80 px-4 py-3 shadow-[var(--shadow-lift)] backdrop-blur-md sm:-left-8"
          >
            <span className="grid size-9 place-items-center rounded-full bg-navy text-milk">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="8" r="4" />
                <path d="M11 11l7 7M15 18h3v-3" />
              </svg>
            </span>
            <span className="text-[13px] leading-tight text-navy-deep">
              Ключ к себе —<br />
              <span className="text-gold-deep">в вашем темпе</span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Индикатор прокрутки */}
      <motion.div
        style={{ opacity: fade }}
        className="mx-auto mt-16 flex max-w-7xl justify-center px-8 lg:justify-start"
      >
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-muted">
          <span className="relative flex h-10 w-6 justify-center rounded-full border border-line">
            <motion.span
              animate={{ y: [4, 14, 4], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-1.5 h-1.5 w-1 rounded-full bg-gold"
            />
          </span>
          Листайте вниз
        </div>
      </motion.div>
    </section>
  );
}
