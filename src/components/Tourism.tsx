import { motion } from 'framer-motion';
import { CLINIC, useI18n } from '../i18n';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { PREMIUM } from '../utils/easings';
import '../styles/tourism.css';

const BAND = [
  { src: '/media/g-pasillo.jpg', alt: 'Pasillo principal de la clínica' },
  { src: '/media/g-estetica-sala.jpg', alt: 'Cabina de tratamientos faciales' },
  { src: '/media/g-recepcion.jpg', alt: 'Recepción de la clínica' },
];

export default function Tourism() {
  const { t } = useI18n();

  return (
    <section className="section tourism bg-crema" id="turismo">
      <div className="shell">
        <header className="tourism__head">
          <div>
            <span className="eyebrow">{t.tourism.eyebrow}</span>
            <RevealText tag="h2" className="section-title tourism__title" accent={['caribe', 'caribbean']}>
              {t.tourism.title}
            </RevealText>
          </div>
          <motion.div
            className="tourism__intro"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.85, delay: 0.14, ease: PREMIUM }}
          >
            <p className="lead">{t.tourism.body}</p>
            <div className="tourism__actions">
              <MagneticButton href={CLINIC.tourismUrl} className="btn">
                {CLINIC.tourismHandle}
                <span className="btn__arrow">↗</span>
              </MagneticButton>
              <MagneticButton href={CLINIC.whatsapp} className="btn btn--ghost">
                {t.tourism.cta}
              </MagneticButton>
            </div>
            <p className="tourism__note">{t.tourism.note}</p>
          </motion.div>
        </header>

        {/* Ruta de 4 pasos con hilo dorado detrás de los números */}
        <ol className="steps">
          <span className="steps__thread" aria-hidden />
          {t.tourism.steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: PREMIUM }}
            >
              <span className="steps__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Banda de imágenes a sangre */}
      <div className="tourism__band">
        {BAND.map((b, i) => (
          <motion.figure
            key={b.src}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: PREMIUM }}
          >
            <img src={b.src} alt={b.alt} loading="lazy" />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
