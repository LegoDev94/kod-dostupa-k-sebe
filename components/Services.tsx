'use client';

import type { ReactNode } from 'react';
import { services } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { Stagger, StaggerItem } from './Reveal';
import SpotlightCard from './SpotlightCard';

const ICONS: ReactNode[] = [
  // Консультация — диалог
  <>
    <path d="M4 5h10a2 2 0 012 2v4a2 2 0 01-2 2H8l-4 3V5z" />
    <path d="M9 15v1a2 2 0 002 2h5l4 3v-9a2 2 0 00-2-2h-1" />
  </>,
  // Психосоматика — сердце
  <path key="h" d="M12 20s-6.5-4.2-8.5-8.2C2 8.8 3.6 6 6.5 6 8.3 6 9.6 7 12 9.3 14.4 7 15.7 6 17.5 6c2.9 0 4.5 2.8 3 5.8C18.5 15.8 12 20 12 20z" />,
  // Женская практика — лотос
  <>
    <path d="M12 21c-1.4-2.6-1.4-5.6 0-8.4 1.4 2.8 1.4 5.8 0 8.4z" />
    <path d="M12 21c-3-1.4-4.7-4-5-7 3 .6 5 2.4 5 4.9" />
    <path d="M12 21c3-1.4 4.7-4 5-7-3 .6-5 2.4-5 4.9" />
    <path d="M5 21h14" />
  </>,
  // Карта перехода — карта-маршрут
  <>
    <path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z" />
    <path d="M9 4v14M15 6v14" />
  </>,
  // Наставничество — росток
  <>
    <path d="M12 21v-9" />
    <path d="M12 13c-.2-3-2.2-4.8-5-4.8-.2 3 1.8 4.8 5 4.8z" />
    <path d="M12 11.2c.2-2.6 2-4.2 4.6-4.2.2 2.6-1.8 4.2-4.6 4.2z" />
  </>,
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_8%,transparent),transparent_68%)] blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={services.eyebrow} title={services.title} lead={services.lead} />

        <Stagger className="mt-14 grid gap-5 lg:grid-cols-6" amount={0.1}>
          {services.items.map((item, i) => {
            const span = i < 3 ? 'lg:col-span-2' : 'lg:col-span-3';
            return (
              <StaggerItem key={item.t} className={`h-full ${span}`}>
                <a href="#contact" className="block h-full">
                  <SpotlightCard>
                    <div className="flex h-full flex-col p-7 sm:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid size-12 place-items-center rounded-2xl border border-line bg-milk text-gold-deep transition-all duration-500 group-hover/spot:-translate-y-0.5 group-hover/spot:border-gold/45">
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
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1 text-[12px] tracking-wide text-gold-deep">
                          <span className="size-1.5 rounded-full bg-gold" />
                          {item.p}
                        </span>
                      </div>

                      <h3 className="mt-6 font-display text-[1.75rem] font-medium leading-tight text-navy-deep">
                        {item.t}
                      </h3>
                      <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-muted">{item.d}</p>

                      <span className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-navy transition-colors duration-400 group-hover/spot:text-gold-deep">
                        Записаться
                        <span className="transition-transform duration-400 group-hover/spot:translate-x-1.5">
                          →
                        </span>
                      </span>
                    </div>
                  </SpotlightCard>
                </a>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
