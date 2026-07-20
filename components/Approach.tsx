'use client';

import { useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { approach } from '@/lib/content';
import { Reveal } from './Reveal';

const ICONS: ReactNode[] = [
  // Психика — озарение
  <>
    <path d="M9.5 17.5h5M10 20.5h4" />
    <path d="M12 3a6 6 0 00-3.8 10.6c.5.4.8 1 .8 1.7v.2h6v-.2c0-.7.3-1.3.8-1.7A6 6 0 0012 3z" />
  </>,
  // Тело — фигура
  <>
    <circle cx="12" cy="5" r="2.2" />
    <path d="M12 7.5v6M8.4 10.4l3.6-1 3.6 1M9 20.5l3-6 3 6" />
  </>,
  // Смыслы — якорь (опора)
  <>
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v13M8.5 11h7" />
    <path d="M5 14a7 7 0 0014 0" />
  </>,
  // Действие — шаг вперёд
  <path key="a" d="M5 12h13M12 6l6 6-6 6" />,
];

export default function Approach() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ['start 78%', 'end 62%'],
  });
  const fill = useTransform(scrollYProgress, [0.02, 0.98], ['0%', '100%']);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n = v <= 0.03 ? 0 : Math.min(approach.steps.length, Math.floor(v * approach.steps.length + 0.35));
    setActive((prev) => (prev === n ? prev : n));
  });

  const nodeIcon = (i: number) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[i]}
    </svg>
  );

  const nodeCls = (on: boolean) =>
    `grid size-14 place-items-center rounded-full border transition-all duration-500 ${
      on
        ? 'border-transparent bg-navy text-milk shadow-[0_16px_34px_-14px_var(--color-gold)] scale-105'
        : 'border-line bg-milk text-gold-deep'
    } group-hover/step:border-transparent group-hover/step:bg-navy group-hover/step:text-milk group-hover/step:shadow-[0_16px_34px_-14px_var(--color-gold)] group-hover/step:scale-105`;

  return (
    <section id="approach" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_8%,transparent),transparent_68%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
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

        <div ref={stepsRef} className="mt-16">
          {/* Десктоп — горизонтальный путь */}
          <div className="relative hidden lg:block">
            <div className="absolute left-[12.5%] right-[12.5%] top-7 h-px -translate-y-1/2 bg-line">
              <motion.div
                style={{ width: fill }}
                className="h-full bg-gradient-to-r from-gold-deep via-gold to-gold-soft"
              />
            </div>
            <div className="grid grid-cols-4 gap-8">
              {approach.steps.map((s, i) => (
                <div key={s.n} className="group/step relative flex flex-col items-center text-center">
                  <span className="relative z-10 bg-milk px-1">
                    <span className={nodeCls(i < active)}>{nodeIcon(i)}</span>
                  </span>
                  <span className="mt-6 font-display text-sm tracking-[0.2em] text-gold-deep">
                    {s.n}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-medium text-navy-deep">{s.t}</h3>
                  <p className="mt-2.5 max-w-[15rem] text-[15px] leading-relaxed text-muted">{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Мобайл/планшет — вертикальный таймлайн */}
          <div className="relative lg:hidden">
            <div className="absolute left-7 top-6 bottom-6 w-px -translate-x-1/2 bg-line">
              <motion.div
                style={{ height: fill }}
                className="w-full bg-gradient-to-b from-gold-deep via-gold to-gold-soft"
              />
            </div>
            <div className="space-y-9">
              {approach.steps.map((s, i) => (
                <div key={s.n} className="group/step relative flex items-start gap-5">
                  <span className="relative z-10 shrink-0 bg-milk py-1">
                    <span className={nodeCls(i < active)}>{nodeIcon(i)}</span>
                  </span>
                  <div className="pt-1.5">
                    <span className="font-display text-sm tracking-[0.2em] text-gold-deep">{s.n}</span>
                    <h3 className="mt-1 font-display text-2xl font-medium text-navy-deep">{s.t}</h3>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
