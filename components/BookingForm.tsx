'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { contact } from '@/lib/content';

export default function BookingForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputCls =
    'w-full rounded-xl border border-milk/15 bg-white/5 px-4 py-3 text-[14.5px] text-milk outline-none transition-all duration-300 placeholder:text-milk/35 focus:border-gold/60 focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-gold)_18%,transparent)]';
  const labelCls = 'mb-1.5 block text-[12.5px] font-medium text-milk/80';

  return (
    <div className="relative rounded-3xl border border-milk/12 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-7">
      <span
        aria-hidden
        className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center py-10 text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 15 }}
              className="relative grid size-14 place-items-center rounded-full bg-milk text-xl text-navy-deep"
            >
              ✓
              <motion.span
                initial={{ scale: 0.6, opacity: 0.7 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full border border-gold/60"
              />
            </motion.span>
            <h3 className="mt-5 font-display text-2xl text-milk">{contact.successTitle}</h3>
            <p className="mt-2 text-[15px] text-milk/60">{contact.successText}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>{contact.fields.name}</label>
                <input required maxLength={80} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{contact.fields.contact}</label>
                <input required maxLength={120} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>{contact.fields.message}</label>
              <textarea
                rows={3}
                maxLength={800}
                placeholder={contact.fields.placeholder}
                className={`${inputCls} resize-none`}
              />
            </div>
            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="group/btn relative shrink-0 overflow-hidden rounded-full bg-milk px-8 py-3 text-[14.5px] font-medium text-navy-deep transition-all duration-400 hover:-translate-y-0.5 hover:bg-white"
              >
                <span className="relative z-10">{contact.submit}</span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-transform duration-[900ms] ease-out group-hover/btn:translate-x-full" />
              </button>
              <p className="text-[11.5px] leading-relaxed text-milk/40 sm:max-w-[19rem]">
                {contact.consent}
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
