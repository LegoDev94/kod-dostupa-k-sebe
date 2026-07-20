'use client';

import { forWhom } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { Stagger, StaggerItem } from './Reveal';

export default function ForWhom() {
  return (
    <section id="for-whom" className="relative py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={forWhom.eyebrow}
          title={forWhom.title}
          lead={forWhom.lead}
        />

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {forWhom.items.map((text, i) => (
            <StaggerItem key={i}>
              <div className="group relative h-full bg-milk p-7 transition-colors duration-500 hover:bg-cream sm:p-8">
                <span className="font-display text-2xl text-gold-soft transition-colors duration-500 group-hover:text-gold-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-4 text-[16px] leading-relaxed text-ink/85">{text}</p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
