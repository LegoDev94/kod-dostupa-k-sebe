import Image from 'next/image';
import { site } from '@/lib/content';
import { asset } from '@/lib/asset';

export default function Logo({
  variant = 'header',
  showTagline = true,
  className = '',
}: {
  variant?: 'header' | 'footer';
  showTagline?: boolean;
  className?: string;
}) {
  const light = variant === 'footer';

  return (
    <a
      href="#top"
      aria-label={`${site.name} — ${site.tagline}`}
      className={`group flex items-center gap-3 ${className}`}
    >
      {/* Знак — круглый герб */}
      <span className="relative size-11 shrink-0">
        {/* свечение на hover */}
        <span className="pointer-events-none absolute inset-[-28%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_42%,transparent),transparent_66%)] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

        <span
          className={`absolute inset-0 overflow-hidden rounded-full shadow-[0_8px_20px_-10px_rgba(20,25,45,0.55)] ring-1 ring-inset transition-transform duration-500 group-hover:scale-[1.06] ${
            light ? 'ring-white/25' : 'ring-gold/40'
          }`}
        >
          <Image
            src={asset('/images/logo.png')}
            alt={site.name}
            fill
            sizes="44px"
            priority
            className="scale-[1.42] object-cover"
          />
          {/* блик */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-[130%]" />
        </span>
      </span>

      {/* Текстовый знак */}
      <span
        className={`flex-col leading-tight ${variant === 'header' ? 'hidden sm:flex' : 'flex'}`}
      >
        <span
          className={`font-display text-[17px] font-medium tracking-wide transition-[letter-spacing] duration-500 group-hover:tracking-[0.03em] ${
            light ? 'text-milk' : 'text-navy-deep'
          }`}
        >
          {site.name}
        </span>
        {showTagline && (
          <span
            className={`mt-0.5 w-fit bg-[linear-gradient(var(--color-gold),var(--color-gold))] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-px text-[10px] uppercase tracking-[0.24em] transition-[background-size] duration-500 group-hover:bg-[length:100%_1px] ${
              light ? 'text-gold-soft' : 'text-gold-deep'
            }`}
          >
            {site.tagline}
          </span>
        )}
      </span>
    </a>
  );
}
