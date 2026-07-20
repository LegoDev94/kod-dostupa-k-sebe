'use client';

import { services } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { Stagger, StaggerItem } from './Reveal';

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={services.eyebrow} title={services.title} lead={services.lead} />

        <Stagger className="mt-14 grid gap-5 lg:grid-cols-6" amount={0.1}>
          {services.items.map((item, i) => {
            const span = i < 3 ? 'lg:col-span-2' : 'lg:col-span-3';
            return (
              <StaggerItem key={item.t} className={span}>
                <a
                  href="#contact"
                  className="card group flex h-full flex-col p-7 sm:p-8"
                >
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-cream px-3 py-1 text-[12px] tracking-wide text-gold-deep">
                    <span className="size-1.5 rounded-full bg-gold" />
                    {item.p}
                  </span>
                  <h3 className="mt-6 font-display text-[1.75rem] font-medium leading-tight text-navy-deep">
                    {item.t}
                  </h3>
                  <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-muted">{item.d}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-navy transition-colors duration-400 group-hover:text-gold-deep">
                    {services.cta.replace('→', '')}
                    <span className="transition-transform duration-400 group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                </a>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
