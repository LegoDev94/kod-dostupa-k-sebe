'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { faq } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-cream py-24 sm:py-28 lg:py-32">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />

        <div className="border-t border-line">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-display text-xl leading-snug transition-colors duration-300 sm:text-[1.6rem] ${
                        isOpen ? 'text-gold-deep' : 'text-navy-deep'
                      }`}
                    >
                      {item.q}
                    </span>
                    <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-line">
                      <span className="absolute h-px w-3.5 bg-current text-navy" />
                      <motion.span
                        animate={{ rotate: isOpen ? 0 : 90 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute h-px w-3.5 bg-current text-navy"
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-7 text-[16px] leading-relaxed text-muted">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
