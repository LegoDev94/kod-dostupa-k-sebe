'use client';

import { themes } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { Stagger, StaggerItem } from './Reveal';

export default function Themes() {
  return (
    <section className="relative bg-cream py-24 sm:py-28 lg:py-32">
      {/* мягкая верхняя граница */}
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={themes.eyebrow} title={themes.title} />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" amount={0.1}>
          {themes.items.map((item, i) => (
            <StaggerItem key={i}>
              <article className="card group flex h-full flex-col p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full border border-line bg-milk text-gold-deep transition-colors duration-500 group-hover:border-gold/50">
                    <span className="font-display text-lg leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </span>
                  <svg
                    className="size-5 -translate-x-2 text-gold opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium text-navy-deep">{item.t}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{item.d}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
