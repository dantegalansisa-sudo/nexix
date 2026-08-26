import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useI18n, waLink } from '../i18n';
import { IconWhatsApp } from './Icons';
import { PREMIUM } from '../utils/easings';
import '../styles/wafab.css';

/**
 * Botón flotante de WhatsApp. Aparece pasado el hero para no competir con el
 * CTA principal, y se despliega mostrando la etiqueta al pasar el cursor.
 */
export default function WhatsAppFab() {
  const { t } = useI18n();
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setPastHero(v > window.innerHeight * 0.65));

  // En Contacto el botón se retira: si no, se monta encima del "Enviar por
  // WhatsApp" del formulario, que es justo la acción que queremos que pulsen.
  useEffect(() => {
    const section = document.getElementById('contacto');
    if (!section) return;
    const io = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), {
      rootMargin: '-15% 0px -10% 0px',
    });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  const shown = pastHero && !atContact;

  return (
    <AnimatePresence>
      {shown && (
        <motion.a
          className="wafab"
          href={waLink(t.wa.generic)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.wa.fab} — WhatsApp`}
          initial={{ opacity: 0, scale: 0.7, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 18 }}
          transition={{ duration: 0.5, ease: PREMIUM }}
        >
          <span className="wafab__pulse" aria-hidden />
          <span className="wafab__disc">
            <IconWhatsApp />
          </span>
          <span className="wafab__label">
            <strong>{t.wa.fab}</strong>
            <em>{t.wa.fabHint}</em>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
