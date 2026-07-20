import { footer, nav, site } from '@/lib/content';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-milk">
      <div aria-hidden className="hairline absolute inset-x-0 top-0 opacity-40" />
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
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
                <a href={site.telegram} target="_blank" rel="noreferrer" className="link-underline hover:text-milk">
                  Telegram · {site.telegramHandle}
                </a>
              </li>
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
