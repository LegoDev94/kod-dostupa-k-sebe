'use client';

import { safety } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { Stagger, StaggerItem } from './Reveal';

export default function Safety() {
  return (
    <section className="relative bg-cream py-24 sm:py-28 lg:py-32">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading eyebrow={safety.eyebrow} title={safety.title} lead={safety.lead} />

        <Stagger className="flex flex-col" amount={0.15}>
          {safety.items.map((text, i) => (
            <StaggerItem key={i}>
              <div className="flex items-start gap-5 border-b border-line py-6 first:pt-0">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-gold/40 text-gold-deep">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 6L9 17l-5-5" />
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
