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
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Портрет */}
        <div
          className="relative order-1 mx-auto w-full max-w-md [perspective:1200px] lg:order-none"
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

            {/* Печать-медальон «15+ лет» */}
            <div className="absolute right-5 top-5 grid size-[72px] place-items-center rounded-full border border-milk/30 bg-navy-deep/45 text-center text-milk backdrop-blur-md">
              <div>
                <div className="font-display text-xl leading-none">15+</div>
                <div className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-milk/75">лет</div>
              </div>
            </div>
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
            <div className="mt-6 flex items-center gap-4">
              <span className="font-script text-[2.6rem] leading-none text-gold-deep">
                Татьяна
              </span>
              <span className="hairline h-px flex-1" />
            </div>
          </Reveal>

          {/* Статистика */}
          <Reveal delay={0.4}>
            <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-line pt-8">
              {about.stats.map((s) => (
                <div key={s.label} className="group/stat">
                  <span className="mb-3 block h-px w-8 bg-gold/50 transition-all duration-500 group-hover/stat:w-14" />
                  <dd className="font-display text-[2.4rem] font-light leading-none text-navy">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
