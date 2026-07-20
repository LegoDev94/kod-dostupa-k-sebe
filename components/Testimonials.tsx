'use client';

import { testimonials } from '@/lib/content';
import { Reveal, Stagger, StaggerItem } from './Reveal';

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 text-milk sm:py-28 lg:py-32">
      {/* атмосфера */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/4 top-0 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_22%,transparent),transparent_65%)] blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold-soft)_12%,transparent),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow !text-gold-soft">{testimonials.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-light leading-[1.04] text-milk balance">
              {testimonials.title}
            </h2>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3" amount={0.15}>
          {testimonials.items.map((t) => (
            <StaggerItem key={t.n} className="h-full">
              <figure className="group relative flex h-full flex-col rounded-3xl border border-milk/12 bg-milk/[0.04] p-8 backdrop-blur-sm transition-colors duration-500 hover:border-gold/40">
                <span className="font-display text-6xl leading-none text-gold/60">“</span>
                <blockquote className="-mt-4 flex-1 text-[16.5px] leading-relaxed text-milk/85">
                  {t.t}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-milk/12 pt-5 text-sm">
                  <span className="grid size-9 place-items-center rounded-full bg-gold/20 font-display text-base text-gold-soft">
                    {t.n.charAt(0)}
                  </span>
                  <span className="text-milk/70">{t.n}</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
