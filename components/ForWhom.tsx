'use client';

import { forWhom } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { Stagger, StaggerItem } from './Reveal';
import SpotlightCard from './SpotlightCard';

export default function ForWhom() {
  return (
    <section id="for-whom" className="relative py-24 sm:py-28 lg:py-32">
      {/* атмосфера */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-16 h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--color-gold)_9%,transparent),transparent_70%)] blur-2xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={forWhom.eyebrow} title={forWhom.title} lead={forWhom.lead} />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" amount={0.1}>
          {forWhom.items.map((text, i) => (
            <StaggerItem key={i} className="h-full">
              <SpotlightCard>
                <div className="flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-[2.6rem] leading-none text-gold-soft transition-colors duration-500 group-hover/spot:text-gold-deep">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px flex-1 bg-line transition-colors duration-500 group-hover/spot:bg-gold/45" />
                    <span className="size-1.5 rounded-full bg-line transition-colors duration-500 group-hover/spot:bg-gold" />
                  </div>
                  <p className="mt-6 text-[16px] leading-relaxed text-ink/85">{text}</p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
