'use client';

import type { ReactNode } from 'react';
import { safety } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { Stagger, StaggerItem } from './Reveal';

const ICONS: ReactNode[] = [
  // Образование и супервизия — медаль
  <>
    <circle cx="12" cy="9" r="5" />
    <path d="M9 13.2L7.5 21l4.5-2.6L16.5 21 15 13.2" />
  </>,
  // Без оценок — сердце (принятие)
  <path key="h" d="M12 20s-6.5-4.2-8.5-8.2C2 8.8 3.6 6 6.5 6 8.3 6 9.6 7 12 9.3 14.4 7 15.7 6 17.5 6c2.9 0 4.5 2.8 3 5.8C18.5 15.8 12 20 12 20z" />,
  // Конфиденциальность — замок
  <>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 018 0v3" />
  </>,
  // Прозрачность — глаз
  <>
    <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z" />
    <circle cx="12" cy="12" r="2.5" />
  </>,
];

export default function Safety() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-28 lg:py-32">
      <div className="hairline absolute inset-x-0 top-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_8%,transparent),transparent_68%)] blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading eyebrow={safety.eyebrow} title={safety.title} lead={safety.lead} />

        <Stagger className="flex flex-col" amount={0.15}>
          {safety.items.map((text, i) => (
            <StaggerItem key={i}>
              <div className="group flex items-center gap-6 border-b border-line py-6 first:pt-0">
                <span className="relative grid size-14 shrink-0 place-items-center rounded-full border border-line bg-milk text-gold-deep transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-gold/50 group-hover:shadow-[0_16px_34px_-16px_var(--color-gold)]">
                  {/* золотое кольцо-печать, проступающее на hover */}
                  <span className="absolute inset-1 rounded-full border border-dashed border-gold/0 transition-all duration-700 group-hover:rotate-90 group-hover:border-gold/40" />
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative transition-transform duration-500 group-hover:scale-110"
                  >
                    {ICONS[i]}
                  </svg>
                </span>
                <p className="text-[16.5px] leading-relaxed text-ink/85">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
