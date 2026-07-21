'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { survey, type SurveyQuestion } from '@/lib/content';
import { Reveal } from './Reveal';

type Answers = Record<string, string | string[] | boolean>;

const EASE = [0.22, 1, 0.36, 1] as const;
const questions = survey.questions;
const total = questions.length;

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 44 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -44 }),
};

export default function Survey() {
  const [phase, setPhase] = useState<'intro' | 'form' | 'done'>('intro');
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState('');
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const q = questions[step];

  const isValid = (question: SurveyQuestion): boolean => {
    const v = answers[question.id];
    if (!question.required) return true;
    if (question.type === 'checkbox') return Array.isArray(v) && v.length > 0;
    if (question.type === 'consent') return v === true;
    return typeof v === 'string' && v.trim().length > 0;
  };

  const clearTimer = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  };

  const goNext = () => {
    clearTimer();
    if (!isValid(q)) {
      setError(q.type === 'consent' ? survey.consentError : survey.requiredError);
      return;
    }
    setError('');
    if (step < total - 1) {
      setDir(1);
      setStep((s) => s + 1);
    } else {
      // Здесь можно подключить реальную отправку (Telegram-бот / e-mail / API)
      setPhase('done');
    }
  };

  const goBack = () => {
    clearTimer();
    setError('');
    if (step === 0) {
      setPhase('intro');
      return;
    }
    setDir(-1);
    setStep((s) => s - 1);
  };

  const setText = (id: string, value: string) => {
    setError('');
    setAnswers((a) => ({ ...a, [id]: value }));
  };

  const selectRadio = (id: string, opt: string) => {
    clearTimer();
    setError('');
    setAnswers((a) => ({ ...a, [id]: opt }));
    if (step < total - 1) {
      advanceTimer.current = setTimeout(() => {
        setDir(1);
        setStep((s) => Math.min(s + 1, total - 1));
      }, 430);
    }
  };

  const toggleCheckbox = (id: string, opt: string) => {
    setError('');
    setAnswers((a) => {
      const cur = Array.isArray(a[id]) ? (a[id] as string[]) : [];
      return {
        ...a,
        [id]: cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt],
      };
    });
  };

  const toggleConsent = (id: string) => {
    setError('');
    setAnswers((a) => ({ ...a, [id]: !a[id] }));
  };

  const progress = ((step + 1) / total) * 100;

  return (
    <section id="anketa" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-[440px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,color-mix(in_oklab,var(--color-gold)_9%,transparent),transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow">{survey.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.06] text-navy-deep balance">
            {survey.title}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-muted">{survey.intro}</p>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mx-auto mt-2 max-w-xl text-[16.5px] leading-relaxed text-muted">{survey.intro2}</p>
        </Reveal>
      </div>

      <Reveal delay={0.14}>
        <div className="relative mx-auto mt-10 max-w-xl px-5 sm:px-0">
          <div className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[2rem] border border-line bg-card p-7 shadow-[var(--shadow-soft)] sm:p-9">
            {/* золотой акцент сверху */}
            <span
              aria-hidden
              className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
            />

            <AnimatePresence mode="wait">
              {/* ─────────── Вступление ─────────── */}
              {phase === 'intro' && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex flex-1 flex-col items-center justify-center py-6 text-center"
                >
                  <span className="grid size-14 place-items-center rounded-full border border-gold/40 text-gold-deep">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 11l3 3 7-7" />
                      <path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9" />
                    </svg>
                  </span>
                  <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-navy-deep">
                    {survey.freeNote}
                  </p>
                  <button
                    onClick={() => {
                      setPhase('form');
                      setStep(0);
                      setDir(1);
                    }}
                    className="group/btn relative mt-7 w-full overflow-hidden rounded-full bg-navy px-6 py-3.5 text-[15px] font-medium text-milk shadow-[var(--shadow-lift)] transition-all duration-400 hover:-translate-y-0.5 hover:bg-navy-deep sm:w-auto sm:px-9"
                  >
                    <span className="relative z-10">{survey.startLabel}</span>
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-transform duration-[900ms] ease-out group-hover/btn:translate-x-full" />
                  </button>
                  <p className="mt-4 text-[12px] uppercase tracking-[0.18em] text-muted">
                    {survey.timeNote}
                  </p>
                </motion.div>
              )}

              {/* ─────────── Вопросы ─────────── */}
              {phase === 'form' && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-1 flex-col"
                >
                  {/* Прогресс */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.16em] text-muted">
                      <span>
                        {survey.stepLabel} {step + 1} {survey.ofLabel} {total}
                      </span>
                      {!q.required && <span className="text-gold-deep">{survey.optionalHint}</span>}
                    </div>
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-soft"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    </div>
                  </div>

                  <div className="relative flex-1">
                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.div
                        key={step}
                        custom={dir}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        <h3 className="font-display text-[1.6rem] font-medium leading-snug text-navy-deep">
                          {q.label}
                        </h3>
                        {q.comment && (
                          <p className="mt-2 text-[14px] leading-relaxed text-muted">{q.comment}</p>
                        )}

                        <div className="mt-6">{renderControl(q)}</div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Ошибка */}
                  <div className="min-h-[22px] pt-3">
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[13px] text-gold-deep"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Навигация */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <button
                      onClick={goBack}
                      className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[14px] text-navy-deep transition-colors duration-300 hover:border-gold/40 hover:text-gold-deep"
                    >
                      <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                      {survey.backLabel}
                    </button>
                    <button
                      onClick={goNext}
                      className="group/btn relative overflow-hidden rounded-full bg-navy px-7 py-3 text-[14px] font-medium text-milk shadow-[var(--shadow-lift)] transition-all duration-400 hover:-translate-y-0.5 hover:bg-navy-deep"
                    >
                      <span className="relative z-10 inline-flex items-center gap-2">
                        {step === total - 1 ? survey.submitLabel : survey.nextLabel}
                        {step !== total - 1 && <span>→</span>}
                      </span>
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-transform duration-[900ms] ease-out group-hover/btn:translate-x-full" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─────────── Спасибо ─────────── */}
              {phase === 'done' && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex flex-1 flex-col items-center justify-center py-8 text-center"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 15 }}
                    className="relative grid size-16 place-items-center rounded-full bg-navy text-2xl text-milk"
                  >
                    ✓
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0.7 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-full border border-gold/50"
                    />
                  </motion.span>
                  <h3 className="mt-6 font-display text-3xl text-navy-deep">{survey.successTitle}</h3>
                  <p className="mt-3 max-w-sm text-[15.5px] leading-relaxed text-muted">
                    {survey.successText}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );

  // ───────────── контролы ─────────────
  function renderControl(question: SurveyQuestion) {
    const v = answers[question.id];

    if (question.type === 'text') {
      return (
        <input
          autoFocus
          value={(v as string) || ''}
          onChange={(e) => setText(question.id, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              goNext();
            }
          }}
          placeholder={question.placeholder}
          maxLength={200}
          className="w-full rounded-2xl border border-line bg-milk px-4 py-3.5 text-[15px] text-ink outline-none transition-all duration-300 placeholder:text-muted/60 focus:border-gold/70 focus:bg-white focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-gold)_16%,transparent)]"
        />
      );
    }

    if (question.type === 'textarea') {
      return (
        <textarea
          autoFocus
          rows={4}
          value={(v as string) || ''}
          onChange={(e) => setText(question.id, e.target.value)}
          placeholder={question.placeholder}
          maxLength={1200}
          className="w-full resize-none rounded-2xl border border-line bg-milk px-4 py-3.5 text-[15px] text-ink outline-none transition-all duration-300 placeholder:text-muted/60 focus:border-gold/70 focus:bg-white focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-gold)_16%,transparent)]"
        />
      );
    }

    if (question.type === 'radio') {
      return (
        <div className="flex flex-col gap-2.5">
          {question.options!.map((opt) => {
            const selected = v === opt;
            return (
              <button
                type="button"
                key={opt}
                onClick={() => selectRadio(question.id, opt)}
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[15px] transition-all duration-300 ${
                  selected
                    ? 'border-gold/60 bg-gold/10 text-navy-deep'
                    : 'border-line bg-milk text-ink/85 hover:border-gold/30 hover:bg-cream'
                }`}
              >
                <span
                  className={`grid size-5 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                    selected ? 'border-gold bg-gold' : 'border-line'
                  }`}
                >
                  {selected && <span className="size-1.5 rounded-full bg-milk" />}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      );
    }

    if (question.type === 'checkbox') {
      const arr = Array.isArray(v) ? (v as string[]) : [];
      return (
        <div className="flex flex-col gap-2.5">
          {question.options!.map((opt) => {
            const selected = arr.includes(opt);
            return (
              <button
                type="button"
                key={opt}
                onClick={() => toggleCheckbox(question.id, opt)}
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[15px] transition-all duration-300 ${
                  selected
                    ? 'border-gold/60 bg-gold/10 text-navy-deep'
                    : 'border-line bg-milk text-ink/85 hover:border-gold/30 hover:bg-cream'
                }`}
              >
                <span
                  className={`grid size-5 shrink-0 place-items-center rounded-md border transition-colors duration-300 ${
                    selected ? 'border-gold bg-gold text-milk' : 'border-line'
                  }`}
                >
                  {selected && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      );
    }

    // consent
    return (
      <button
        type="button"
        onClick={() => toggleConsent(question.id)}
        className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left text-[14px] leading-relaxed transition-all duration-300 ${
          v === true ? 'border-gold/60 bg-gold/10 text-navy-deep' : 'border-line bg-milk text-muted hover:border-gold/30'
        }`}
      >
        <span
          className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors duration-300 ${
            v === true ? 'border-gold bg-gold text-milk' : 'border-line'
          }`}
        >
          {v === true && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </span>
        {question.label}
      </button>
    );
  }
}
