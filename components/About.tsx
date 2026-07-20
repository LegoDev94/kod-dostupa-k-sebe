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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section id="about" ref={ref} className="relative bg-cream py-24 sm:py-28 lg:py-32">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Портрет */}
        <div className="relative order-1 mx-auto w-full max-w-md lg:order-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line shadow-[var(--shadow-soft)]"
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
          </motion.div>

          {/* декоративная золотая рамка со смещением */}
          <div
            aria-hidden
            className="absolute -bottom-5 -right-5 -z-10 hidden h-full w-full rounded-[2rem] border border-gold/40 lg:block"
          />
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

          {/* Статистика */}
          <Reveal delay={0.3}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {about.stats.map((s) => (
                <div key={s.label}>
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
