'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { hero } from '@/lib/content';
import { asset } from '@/lib/asset';
import MagneticButton from './MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as const;

const wordReveal = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: '0%',
    transition: { duration: 1, delay: 0.35 + i * 0.12, ease: EASE },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [moved, setMoved] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // «Линза ясности» — координаты в процентах, сглаженные пружиной
  const xRaw = useMotionValue(50);
  const yRaw = useMotionValue(44);
  const x = useSpring(xRaw, { stiffness: 90, damping: 20, mass: 0.5 });
  const y = useSpring(yRaw, { stiffness: 90, damping: 20, mass: 0.5 });
  const r = useMotionValue(280);
  const ringSize = useTransform(r, (v) => v * 2.05);

  const mask = useMotionTemplate`radial-gradient(circle ${r}px at ${x}% ${y}%, transparent 0%, transparent 30%, rgba(0,0,0,0.6) 58%, rgba(0,0,0,1) 82%)`;
  const ringLeft = useMotionTemplate`${x}%`;
  const ringTop = useMotionTemplate`${y}%`;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 640;

    // На мобильном линза меньше и держится ниже — чтобы не мешать тексту
    const drift = isMobile
      ? { cx: 60, ax: 16, cy: 76, ay: 9 }
      : { cx: 50, ax: 26, cy: 46, ay: 18 };
    r.set(isMobile ? 150 : 280);

    // Дыхание линзы
    let breatheCtrl: ReturnType<typeof animate> | undefined;
    if (!reduced) {
      breatheCtrl = animate(r, isMobile ? [140, 178, 140] : [270, 320, 270], {
        duration: 9,
        repeat: Infinity,
        ease: 'easeInOut',
      });
    }

    const rect = () => ref.current?.getBoundingClientRect();
    let lastMove = -99999;

    const setFromClient = (cx: number, cy: number) => {
      const b = rect();
      if (!b) return;
      xRaw.set(((cx - b.left) / b.width) * 100);
      yRaw.set(((cy - b.top) / b.height) * 100);
    };

    const onMouse = (e: MouseEvent) => {
      lastMove = performance.now();
      setMoved(true);
      setFromClient(e.clientX, e.clientY);
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      lastMove = performance.now();
      setMoved(true);
      setFromClient(t.clientX, t.clientY);
    };

    // Дрейф линзы, когда указатель не двигается
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      if (!reduced && t - lastMove > 2000) {
        const e = (t - start) / 1000;
        xRaw.set(drift.cx + Math.sin(e * 0.45) * drift.ax);
        yRaw.set(drift.cy + Math.cos(e * 0.32) * drift.ay);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMouse, { passive: true });
    const node = ref.current;
    node?.addEventListener('touchmove', onTouch, { passive: true });

    return () => {
      breatheCtrl?.stop();
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      node?.removeEventListener('touchmove', onTouch);
    };
  }, [r, xRaw, yRaw]);

  const topWords = hero.titleTop.split(' ');

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 sm:pt-32"
    >
      {/* Фон на весь экран + линза ясности */}
      <motion.div
        aria-hidden
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        {/* Чёткий слой */}
        <Image
          src={asset('/images/hero.jpg')}
          alt="Золотой ключ на камне — код доступа к себе"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Матовое бело-полупрозрачное «стекло», прорезаемое линзой */}
        <motion.div
          style={{ maskImage: mask, WebkitMaskImage: mask }}
          className="absolute inset-0"
        >
          <Image
            src={asset('/images/hero.jpg')}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-105 object-cover blur-[10px]"
          />
          <div className="absolute inset-0 bg-white/32" />
        </motion.div>

        {/* Золотой ободок линзы */}
        <motion.div
          style={{
            left: ringLeft,
            top: ringTop,
            width: ringSize,
            height: ringSize,
            x: '-50%',
            y: '-50%',
          }}
          className="pointer-events-none absolute rounded-full opacity-70 blur-[2px]"
        >
          <div className="h-full w-full rounded-full bg-[radial-gradient(circle,transparent_58%,color-mix(in_oklab,var(--color-gold)_42%,transparent)_66%,transparent_76%)]" />
        </motion.div>

        {/* Читаемость текста слева + виньетка снизу */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--color-milk)_72%,transparent),color-mix(in_oklab,var(--color-milk)_20%,transparent)_45%,transparent_70%)]" />
        {/* На мобильном текст идёт по всей ширине — добавляем вертикальную вуаль */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-milk)_0%,color-mix(in_oklab,var(--color-milk)_78%,transparent)_40%,color-mix(in_oklab,var(--color-milk)_42%,transparent)_62%,transparent_82%)] sm:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,var(--color-milk),transparent)]" />
      </motion.div>

      {/* Контент */}
      <motion.div style={{ y: textY }} className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="eyebrow"
          >
            {hero.eyebrow}
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(3.4rem,10vw,7rem)] font-light leading-[0.92] tracking-[-0.01em] text-navy-deep">
            <span className="block overflow-hidden">
              {topWords.map((w, i) => (
                <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    variants={wordReveal}
                    custom={i}
                    initial="hidden"
                    animate="show"
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block italic text-gold-deep"
                variants={wordReveal}
                custom={topWords.length}
                initial="hidden"
                animate="show"
              >
                {hero.titleBottom}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
            className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink/80"
          >
            {hero.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#contact" className="btn btn-primary">
              {hero.ctaPrimary}
            </MagneticButton>
            <MagneticButton href="#approach" className="btn btn-ghost">
              {hero.ctaSecondary}
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted"
          >
            {hero.badges.map((b, i) => (
              <span key={b} className="flex items-center gap-2.5">
                {i > 0 && <span className="hairline h-4 w-px" />}
                <span className="size-1.5 rounded-full bg-gold" />
                {b}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Подсказка про интерактив */}
      <AnimatePresence>
        {!moved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="pointer-events-none absolute bottom-24 right-6 z-10 hidden items-center gap-2.5 rounded-full border border-line bg-milk/70 px-4 py-2 text-[12px] tracking-wide text-navy-deep backdrop-blur-md sm:flex md:right-10"
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="size-2 rounded-full bg-gold"
            />
            Наведите — туман расступится
          </motion.div>
        )}
      </AnimatePresence>

      {/* Индикатор прокрутки */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex max-w-7xl justify-center px-8 lg:justify-start"
      >
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-muted">
          <span className="relative flex h-10 w-6 justify-center rounded-full border border-line">
            <motion.span
              animate={{ y: [4, 14, 4], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-1.5 h-1.5 w-1 rounded-full bg-gold"
            />
          </span>
          Листайте вниз
        </div>
      </motion.div>
    </section>
  );
}
