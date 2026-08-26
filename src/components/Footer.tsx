import { CLINIC, useI18n, waLink } from '../i18n';
import '../styles/footer.css';

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer bg-dark">
      <div className="shell">
        <hr className="footer__rule" />

        <div className="footer__grid">
          <div className="footer__brand">
            <img src="/media/logo-full.png" alt={CLINIC.name} />
            <p>{t.footer.tagline}</p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            {t.nav.links.map((l) => (
              <button key={l.id} onClick={() => go(l.id)}>
                {l.label}
              </button>
            ))}
            <button onClick={() => go('contacto')}>{t.contact.eyebrow}</button>
          </nav>

          <address className="footer__contact">
            <span>{CLINIC.address}</span>
            <span>{CLINIC.city}</span>
            <a href={CLINIC.instagram} target="_blank" rel="noopener noreferrer">
              {CLINIC.instagramHandle}
            </a>
            <a href={waLink(t.wa.generic)} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </address>
        </div>

        <div className="footer__base">
          <span>
            © {year} {CLINIC.name}. {t.footer.rights}
          </span>
          <span className="footer__demo">{t.footer.demo}</span>
          <span>
            {t.footer.credit} — <strong>NEXIX Tech Studio</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
