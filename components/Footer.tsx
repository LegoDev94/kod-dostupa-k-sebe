import { contact, footer, nav, site } from '@/lib/content';
import Logo from './Logo';
import BookingForm from './BookingForm';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-milk">
      <div aria-hidden className="hairline absolute inset-x-0 top-0 opacity-40" />
      {/* атмосфера */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_16%,transparent),transparent_66%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        {/* ─────────── Заявка ─────────── */}
        <div
          id="contact"
          className="grid scroll-mt-24 gap-12 border-b border-milk/12 pb-16 lg:grid-cols-2 lg:gap-16"
        >
          <div>
            <p className="eyebrow !text-gold-soft">{contact.eyebrow}</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.04] text-milk">
              {contact.titleTop}
              <br />
              <span className="italic text-gold-soft">{contact.titleBottom}</span>
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-milk/65">{contact.lead}</p>

            <div className="mt-8 space-y-4">
              <a
                href={site.telegram}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4"
              >
                <span className="grid size-11 place-items-center rounded-full border border-milk/20 text-gold-soft transition-all duration-400 group-hover:-translate-y-0.5 group-hover:border-gold/50">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.9 4.4l-3.3 15.6c-.2 1.1-.9 1.4-1.8.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.3 13.5l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.3 1.6z" />
                  </svg>
                </span>
                <span className="text-milk">
                  <span className="block text-[12px] uppercase tracking-[0.16em] text-milk/50">
                    Telegram
                  </span>
                  <span className="link-underline">{site.telegramHandle}</span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full border border-milk/20 text-gold-soft">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <span className="text-milk">
                  <span className="block text-[12px] uppercase tracking-[0.16em] text-milk/50">
                    Формат
                  </span>
                  {site.location}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:pt-1">
            <BookingForm />
          </div>
        </div>

        {/* ─────────── Информация ─────────── */}
        <div className="grid gap-12 pt-16 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          {/* Бренд */}
          <div className="max-w-sm">
            <Logo variant="footer" showTagline={false} />
            <p className="mt-5 text-[15px] leading-relaxed text-milk/60">{footer.about}</p>
          </div>

          {/* Разделы */}
          <div>
            <h3 className="text-[12px] uppercase tracking-[0.22em] text-gold-soft">
              {footer.sectionsTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-[15px] text-milk/70">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-underline transition-colors hover:text-milk">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Связь */}
          <div>
            <h3 className="text-[12px] uppercase tracking-[0.22em] text-gold-soft">
              {footer.contactTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-[15px] text-milk/70">
              <li>
                <a href={site.vk} target="_blank" rel="noreferrer" className="link-underline hover:text-milk">
                  VK · сообщество
                </a>
              </li>
              <li className="text-milk/50">{site.location}</li>
            </ul>
          </div>
        </div>

        {/* Дисклеймер */}
        <p className="mt-16 max-w-3xl border-t border-milk/12 pt-8 text-[13px] leading-relaxed text-milk/45">
          <span className="text-milk/70">{footer.disclaimerLead}</span>
          {footer.disclaimer}
        </p>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 text-[13px] text-milk/50 sm:flex-row sm:items-center">
          <span>© {year} {site.name}</span>
          <span className="font-display text-base italic text-gold-soft">{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
