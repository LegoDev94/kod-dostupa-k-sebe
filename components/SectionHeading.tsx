'use client';

import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  light = false,
  className = '',
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}) {
  const isCenter = align === 'center';
  return (
    <div
      className={`${isCenter ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}
    >
      <Reveal>
        <p className={`eyebrow ${light ? '!text-gold-soft' : ''}`}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-4 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-light leading-[1.04] tracking-[-0.01em] balance ${
            light ? 'text-milk' : 'text-navy-deep'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-[16.5px] leading-relaxed ${
              light ? 'text-milk/70' : 'text-muted'
            } ${isCenter ? 'mx-auto max-w-xl' : ''}`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
