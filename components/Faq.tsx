'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { faq } from '@/lib/content';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-cream py-24 sm:py-28 lg:py-32">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />

        <div className="flex flex-col">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div
                  className={`group relative overflow-hidden rounded-2xl border transition-colors duration-400 ${
                    isOpen ? 'border-gold/30 bg-milk' : 'border-transparent hover:bg-milk/60'
                  } mb-2`}
                >
                  {/* золотой акцент слева при раскрытии */}
                  <span
                    className={`absolute left-0 top-0 h-full w-[3px] bg-gold transition-transform duration-500 ${
                      isOpen ? 'scale-y-100' : 'scale-y-0'
                    }`}
                    style={{ transformOrigin: 'top' }}
                  />
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-5 px-5 py-6 text-left sm:px-6"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-display text-lg leading-none transition-colors duration-300 ${
                        isOpen ? 'text-gold-deep' : 'text-gold-soft/70'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`flex-1 font-display text-xl leading-snug transition-colors duration-300 sm:text-[1.5rem] ${
                        isOpen ? 'text-gold-deep' : 'text-navy-deep'
                      }`}
                    >
                      {item.q}
                    </span>
                    <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-gold/40">
                      <span className="absolute h-px w-3.5 bg-navy" />
                      <motion.span
                        animate={{ rotate: isOpen ? 0 : 90 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute h-px w-3.5 bg-navy"
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
                        <p className="max-w-xl pb-7 pl-[3.25rem] pr-6 text-[16px] leading-relaxed text-muted">
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
