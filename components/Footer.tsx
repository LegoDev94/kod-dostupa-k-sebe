import { contact, footer, nav, site } from '@/lib/content';
import Logo from './Logo';
import BookingForm from './BookingForm';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-milk">
      <div aria-hidden className="hairline absolute inset-x-0 top-0 opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_15%,transparent),transparent_66%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        {/* ─────────── Контакт ─────────── */}
        <div
          id="contact"
          className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          <div>
            <p className="eyebrow !text-gold-soft">{contact.eyebrow}</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.2vw,3.1rem)] font-light leading-[1.05] text-milk">
              {contact.titleTop}
              <br />
              <span className="italic text-gold-soft">{contact.titleBottom}</span>
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-milk/60">{contact.lead}</p>
            <p className="mt-6 flex items-center gap-2.5 text-[14px] text-milk/55">
              <span className="size-1.5 rounded-full bg-gold" />
              {site.location}
            </p>
          </div>

          <BookingForm />
        </div>

        {/* ─────────── Минимальная нижняя строка ─────────── */}
        <div className="mt-14 border-t border-milk/12 pt-8">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-6">
            <Logo variant="footer" showTagline />

            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] text-milk/55">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="link-underline transition-colors duration-300 hover:text-milk"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <a
                href={site.telegram}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="grid size-9 place-items-center rounded-full border border-milk/20 text-milk/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold-soft"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.9 4.4l-3.3 15.6c-.2 1.1-.9 1.4-1.8.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.3 13.5l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.3 1.6z" />
                </svg>
              </a>
              <a
                href={site.vk}
                target="_blank"
                rel="noreferrer"
                aria-label="VK"
                className="grid size-9 place-items-center rounded-full border border-milk/20 text-milk/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold-soft"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 16.9c-5.5 0-8.9-3.8-9-10.1h2.8c.1 4.6 2.2 6.5 3.7 6.9V6.8h2.6v3.9c1.5-.2 3.2-1.9 3.8-3.9h2.6c-.5 2.3-2.1 4-3.2 4.7 1.1.6 3 2.1 3.8 4.4h-2.9c-.6-1.8-2.1-3.2-4.1-3.4v3.4H13z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-milk/10 pt-6 text-[12px] leading-relaxed text-milk/40 sm:flex-row sm:items-start sm:justify-between">
            <p className="max-w-2xl">
              <span className="text-milk/60">{footer.disclaimerLead}</span>
              {footer.disclaimer}
            </p>
            <span className="shrink-0">
              © {year} {site.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
