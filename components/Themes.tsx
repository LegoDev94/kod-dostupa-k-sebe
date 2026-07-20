'use client';

import type { ReactNode } from 'react';
import { themes } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { Stagger, StaggerItem } from './Reveal';
import SpotlightCard from './SpotlightCard';

// Тонкие иконки под смысл каждой темы
const ICONS: ReactNode[] = [
  // Тревога и выгорание — луна (покой, восстановление)
  <path key="i" d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" />,
  // Психосоматика — связь тело ↔ психика
  <>
    <circle cx="9" cy="12" r="5" />
    <circle cx="15" cy="12" r="5" />
  </>,
  // Тело и женская практика — лотос
  <>
    <path d="M12 21c-1.4-2.6-1.4-5.6 0-8.4 1.4 2.8 1.4 5.8 0 8.4z" />
    <path d="M12 21c-3-1.4-4.7-4-5-7 3 .6 5 2.4 5 4.9" />
    <path d="M12 21c3-1.4 4.7-4 5-7-3 .6-5 2.4-5 4.9" />
    <path d="M5 21h14" />
  </>,
  // Границы и самооценка — щит
  <path key="s" d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" />,
  // Страх проявляться — восход
  <>
    <path d="M3 18h18" />
    <path d="M7 18a5 5 0 0110 0" />
    <path d="M12 5v2M5.5 8.5l1.4 1.4M18.5 8.5l-1.4 1.4" />
  </>,
  // Жизненный переход — арка (порог)
  <>
    <path d="M5 21V8a7 7 0 0114 0v13" />
    <path d="M3 21h18" />
  </>,
];

export default function Themes() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-28 lg:py-32">
      <div className="hairline absolute inset-x-0 top-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_9%,transparent),transparent_68%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={themes.eyebrow} title={themes.title} />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" amount={0.1}>
          {themes.items.map((item, i) => (
            <StaggerItem key={i} className="h-full">
              <SpotlightCard>
                <div className="flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl border border-line bg-milk text-gold-deep transition-all duration-500 group-hover/spot:-translate-y-0.5 group-hover/spot:border-gold/45 group-hover/spot:shadow-[0_10px_24px_-14px_var(--color-gold)]">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-500 group-hover/spot:scale-110"
                      >
                        {ICONS[i]}
                      </svg>
                    </span>
                    <span className="font-display text-2xl leading-none text-gold-soft/70 transition-colors duration-500 group-hover/spot:text-gold-deep">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-7 font-display text-2xl font-medium text-navy-deep">{item.t}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{item.d}</p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
