'use client';

import { motion } from 'motion/react';
import { community, site } from '@/lib/content';
import { Reveal } from './Reveal';
import MagneticButton from './MagneticButton';

export default function Community() {
  return (
    <section className="relative py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-[linear-gradient(135deg,var(--color-cream),var(--color-sand))] px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* декор */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_20%,transparent),transparent_65%)] blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-navy)_10%,transparent),transparent_65%)] blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute -left-10 top-1/2 hidden size-40 -translate-y-1/2 rounded-full border border-dashed border-gold/25 lg:block"
          />

          <Reveal>
            <p className="eyebrow">{community.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.08] text-navy-deep balance">
              {community.title}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href={site.telegram} className="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.9 4.4l-3.3 15.6c-.2 1.1-.9 1.4-1.8.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.3 13.5l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.3 1.6z" />
                </svg>
                {community.telegramLabel}
              </MagneticButton>
              <MagneticButton href={site.vk} className="btn btn-ghost">
                {community.vkLabel}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
