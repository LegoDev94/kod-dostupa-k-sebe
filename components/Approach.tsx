'use client';

import { motion } from 'motion/react';
import { approach } from '@/lib/content';
import { Reveal, Stagger, StaggerItem } from './Reveal';

export default function Approach() {
  return (
    <section id="approach" className="relative py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">{approach.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-light leading-[1.04] tracking-[-0.01em] text-navy-deep">
              {approach.titleTop}
              <br />
              <span className="italic text-gold-deep">{approach.titleBottom}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-[16.5px] leading-relaxed text-muted">{approach.lead}</p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {/* соединяющая линия */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full origin-left bg-gradient-to-r from-gold-deep via-gold to-transparent"
            />
          </div>

          <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8" amount={0.2}>
            {approach.steps.map((s) => (
              <StaggerItem key={s.n}>
                <div className="relative">
                  <span className="relative z-10 grid size-12 place-items-center rounded-full border border-gold/40 bg-milk font-display text-lg text-gold-deep">
                    {s.n}
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-medium text-navy-deep">{s.t}</h3>
                  <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">{s.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
