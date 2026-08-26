import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { CLINIC, useI18n, waLink, type Lang } from '../i18n';
import MagneticButton from './MagneticButton';
import { PREMIUM } from '../utils/easings';
import '../styles/nav.css';

export default function Nav() {
  const { t, lang, setLang } = useI18n();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 60));

  // Con el menú móvil abierto el fondo no debe desplazarse.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const langs: Lang[] = ['es', 'en'];

  return (
    <>
      <motion.header
        className={`nav ${solid ? 'nav--solid' : ''}`}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: PREMIUM }}
      >
        <div className="nav__inner">
          <a
            href="#top"
            className="nav__brand"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label={CLINIC.name}
          >
            <img src="/media/logo-mark.png" alt="" className="nav__mark" />
            <span className="nav__brandtext">
              <span className="nav__name">MARTIS</span>
              <span className="nav__sub">Esthetic &amp; Dental</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Principal">
            {t.nav.links.map((l) => (
              <button key={l.id} className="nav__link" onClick={() => go(l.id)}>
                {l.label}
              </button>
            ))}
          </nav>

          <div className="nav__actions">
            <div className="lang" role="group" aria-label="Idioma / Language">
              {langs.map((l, i) => (
                <span key={l} className="lang__item">
                  {i > 0 && <span className="lang__sep">/</span>}
                  <button
                    className={`lang__btn ${lang === l ? 'is-active' : ''}`}
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                  >
                    {l.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>

            <div className="nav__cta">
              <MagneticButton href={waLink(t.wa.generic)} className="btn btn--sm">
                {t.nav.cta}
                <span className="btn__arrow">→</span>
              </MagneticButton>
            </div>

            <button
              className={`burger ${open ? 'is-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.72, ease: PREMIUM }}
          >
            <div className="menu__inner">
              <ul className="menu__list">
                {t.nav.links.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease: PREMIUM }}
                  >
                    <button onClick={() => go(l.id)}>
                      <em>{String(i + 1).padStart(2, '0')}</em>
                      {l.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="menu__foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                <a className="btn btn--light" href={waLink(t.wa.generic)} target="_blank" rel="noopener noreferrer">
                  {t.nav.cta}
                  <span className="btn__arrow">→</span>
                </a>
                <p>
                  {CLINIC.address}
                  <br />
                  {CLINIC.city}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
