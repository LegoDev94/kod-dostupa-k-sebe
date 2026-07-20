'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'motion/react';
import { site } from '@/lib/content';

// Деления «компаса/замка» вокруг монограммы
const TICKS = Array.from({ length: 24 }, (_, i) => {
  const a = (i * 15 - 90) * (Math.PI / 180);
  const major = i % 6 === 0;
  const ro = 46;
  const ri = major ? 39 : 42.5;
  return {
    x1: 50 + ri * Math.cos(a),
    y1: 50 + ri * Math.sin(a),
    x2: 50 + ro * Math.cos(a),
    y2: 50 + ro * Math.sin(a),
    major,
  };
});

export default function Logo({
  variant = 'header',
  showTagline = true,
  className = '',
}: {
  variant?: 'header' | 'footer';
  showTagline?: boolean;
  className?: string;
}) {
  const light = variant === 'footer';

  const rotate = useMotionValue(0);
  const hovering = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduced.current) return;
    const speed = hovering.current ? 46 : 0; // град/сек — крутится только при наведении
    if (speed) rotate.set(rotate.get() + (speed * delta) / 1000);
  });

  return (
    <a
      href="#top"
      aria-label={`${site.name} — ${site.tagline}`}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      className={`group flex items-center gap-3 ${className}`}
    >
      {/* Знак */}
      <span className="relative grid size-11 shrink-0 place-items-center">
        {/* Свечение */}
        <span className="pointer-events-none absolute inset-[-30%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_45%,transparent),transparent_68%)] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

        {/* Кольцо с делениями (вращается при наведении) */}
        <motion.svg
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden
          style={{ rotate }}
          className="absolute inset-0 size-full"
        >
          <circle
            cx="50"
            cy="50"
            r="47"
            stroke="var(--color-gold)"
            strokeWidth="1"
            className="[stroke-opacity:0.45] transition-[stroke-opacity] duration-500 group-hover:[stroke-opacity:0.95]"
          />
          {TICKS.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="var(--color-gold)"
              strokeWidth={t.major ? 1.5 : 0.8}
              strokeOpacity={t.major ? 0.9 : 0.4}
              strokeLinecap="round"
            />
          ))}
        </motion.svg>

        {/* Диск с монограммой */}
        <span
          className={`relative z-[1] grid size-[72%] place-items-center overflow-hidden rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] ring-1 ring-inset transition-transform duration-500 group-hover:scale-[1.06] ${
            light ? 'bg-milk/12 text-milk ring-white/12' : 'bg-navy text-milk ring-white/10'
          }`}
        >
          <span className="font-display text-[19px] leading-none">Т</span>
          {/* Блик */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/55 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-[130%]" />
        </span>
      </span>

      {/* Текстовый знак */}
      <span
        className={`flex-col leading-tight ${
          variant === 'header' ? 'hidden sm:flex' : 'flex'
        }`}
      >
        <span
          className={`font-display text-[17px] font-medium tracking-wide transition-[letter-spacing] duration-500 group-hover:tracking-[0.03em] ${
            light ? 'text-milk' : 'text-navy-deep'
          }`}
        >
          {site.name}
        </span>
        {showTagline && (
          <span
            className={`mt-0.5 w-fit bg-[linear-gradient(var(--color-gold),var(--color-gold))] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-px text-[10px] uppercase tracking-[0.24em] transition-[background-size] duration-500 group-hover:bg-[length:100%_1px] ${
              light ? 'text-gold-soft' : 'text-gold-deep'
            }`}
          >
            {site.tagline}
          </span>
        )}
      </span>
    </a>
  );
}
