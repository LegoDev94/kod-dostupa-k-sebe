'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { about } from '@/lib/content';
import { asset } from '@/lib/asset';
import { Reveal } from './Reveal';
import Counter from './Counter';

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  // Мягкий 3D-наклон портрета под курсором
  const onMove = (e: React.MouseEvent) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = (-((e.clientY - r.top) / r.height - 0.5) * 6).toFixed(2);
    const ry = (((e.clientX - r.left) / r.width - 0.5) * 6).toFixed(2);
    el.style.setProperty('--rx', `${rx}deg`);
    el.style.setProperty('--ry', `${ry}deg`);
  };
  const onLeave = () => {
    const el = frameRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-cream py-24 sm:py-28 lg:py-32">
      <div className="hairline absolute inset-x-0 top-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-16 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_9%,transparent),transparent_68%)] blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Портрет */}
        <div
          className="group relative order-1 mx-auto w-full max-w-md [perspective:1200px] lg:order-none"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          {/* «Дышащая» золотая рамка */}
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.02, 1], opacity: [0.4, 0.75, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -inset-3 rounded-[2.4rem] border border-gold/40"
          />

          <motion.div
            ref={frameRef}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line shadow-[var(--shadow-soft)] transition-transform duration-300 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]"
          >
            <motion.div style={{ y: imgY }} className="absolute inset-[-6%]">
              <Image
                src={asset('/images/portrait.jpg')}
                alt={about.name}
                fill
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover"
              />
            </motion.div>

            {/* Печать — ключ «код доступа» */}
            <div className="absolute right-5 top-5 grid size-[58px] place-items-center rounded-full border border-milk/30 bg-navy-deep/45 text-gold-soft backdrop-blur-md">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="8" r="4" />
                <path d="M11 11l7 7M15 18h3v-3" />
              </svg>
            </div>

            {/* Световой блик на наведении */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[130%]"
            />
          </motion.div>
        </div>

        {/* Текст */}
        <div>
          <Reveal>
            <p className="eyebrow">{about.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-light leading-tight text-navy-deep">
              {about.name}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-2 text-[13px] uppercase tracking-[0.18em] text-gold-deep">
              {about.role}
            </p>
          </Reveal>

          <div className="mt-7 space-y-4">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.18 + i * 0.06}>
                <p className="text-[16px] leading-relaxed text-ink/85">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* Подпись-росчерк */}
          <Reveal delay={0.34}>
            <span className="mt-8 block font-script text-[2.9rem] leading-none text-gold-deep">
              Татьяна
            </span>
          </Reveal>

          {/* Статистика */}
          <Reveal delay={0.4}>
            <dl className="mt-10 grid grid-cols-3 gap-6">
              {about.stats.map((s) => (
                <div key={s.label} className="group/stat cursor-default">
                  <dd className="font-display text-[2.7rem] font-light leading-none text-navy transition-colors duration-500 group-hover/stat:text-gold-deep">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted">
                    {s.label}
                  </dt>
                  <span className="mt-3 block h-px w-0 bg-gold transition-all duration-500 group-hover/stat:w-10" />
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
