'use client';

import { useRef, type ReactNode } from 'react';

/**
 * Премиум-карточка: золотая подсветка границы и заливка, следящие за курсором,
 * плюс мягкий 3D-наклон. Всё через CSS-переменные — без ре-рендеров.
 */
export default function SpotlightCard({
  children,
  className = '',
  tilt = 5,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = outer.current;
    const inn = inner.current;
    if (!el || !inn) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    inn.style.setProperty('--mx', `${x}px`);
    inn.style.setProperty('--my', `${y}px`);
    inn.style.setProperty('--rx', `${(-(y / r.height - 0.5) * tilt).toFixed(2)}deg`);
    inn.style.setProperty('--ry', `${((x / r.width - 0.5) * tilt).toFixed(2)}deg`);
  };
  const onLeave = () => {
    const inn = inner.current;
    if (!inn) return;
    inn.style.setProperty('--rx', '0deg');
    inn.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={outer}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group/spot relative h-full [perspective:1100px] ${className}`}
    >
      <div
        ref={inner}
        className="relative h-full overflow-hidden rounded-[1.4rem] border border-line bg-card transition-[transform,box-shadow,border-color] duration-300 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] group-hover/spot:border-gold/25 group-hover/spot:shadow-[var(--shadow-soft)]"
      >
        {/* заливка-свечение под курсором */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
          style={{
            background:
              'radial-gradient(240px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--color-gold) 14%, transparent), transparent 60%)',
          }}
        />
        {/* золотая граница, следящая за курсором */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.4rem] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
          style={{
            background:
              'radial-gradient(260px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--color-gold) 80%, transparent), transparent 62%)',
            padding: '1px',
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
        <div className="relative z-10 h-full [transform:translateZ(0.01px)]">{children}</div>
      </div>
    </div>
  );
}
