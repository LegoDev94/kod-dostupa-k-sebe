'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { contact, site } from '@/lib/content';
import { Reveal } from './Reveal';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputCls =
    'w-full rounded-2xl border border-line bg-milk px-4 py-3.5 text-[15px] text-ink outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-gold/60';

  return (
    <section id="contact" className="relative py-24 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Левая колонка */}
        <div>
          <Reveal>
            <p className="eyebrow">{contact.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5.4vw,4rem)] font-light leading-[1.02] text-navy-deep">
              {contact.titleTop}
              <br />
              <span className="italic text-gold-deep">{contact.titleBottom}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-muted">{contact.lead}</p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 space-y-4">
              <a
                href={site.telegram}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4"
              >
                <span className="grid size-11 place-items-center rounded-full border border-line text-gold-deep transition-colors duration-400 group-hover:border-gold/50">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.9 4.4l-3.3 15.6c-.2 1.1-.9 1.4-1.8.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.3 13.5l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.3 1.6z" />
                  </svg>
                </span>
                <span className="text-navy-deep">
                  <span className="block text-[12px] uppercase tracking-[0.16em] text-muted">
                    Telegram
                  </span>
                  <span className="link-underline">{site.telegramHandle}</span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full border border-line text-gold-deep">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <span className="text-navy-deep">
                  <span className="block text-[12px] uppercase tracking-[0.16em] text-muted">
                    Формат
                  </span>
                  {site.location}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Форма */}
        <Reveal delay={0.12}>
          <div className="relative rounded-[2rem] border border-line bg-card p-7 shadow-[var(--shadow-soft)] sm:p-9">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center py-14 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 16 }}
                    className="grid size-16 place-items-center rounded-full bg-navy text-2xl text-milk"
                  >
                    ✓
                  </motion.span>
                  <h3 className="mt-6 font-display text-3xl text-navy-deep">{contact.successTitle}</h3>
                  <p className="mt-3 text-[15.5px] text-muted">{contact.successText}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="mb-2 block text-[13px] font-medium text-navy-deep">
                      {contact.fields.name}
                    </label>
                    <input required maxLength={80} className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-2 block text-[13px] font-medium text-navy-deep">
                      {contact.fields.contact}
                    </label>
                    <input required maxLength={120} className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-2 block text-[13px] font-medium text-navy-deep">
                      {contact.fields.message}
                    </label>
                    <textarea
                      rows={4}
                      maxLength={800}
                      placeholder={contact.fields.placeholder}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-full">
                    {contact.submit}
                  </button>
                  <p className="text-[12.5px] leading-relaxed text-muted">{contact.consent}</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
