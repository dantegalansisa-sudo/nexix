import { motion } from 'framer-motion';
import { useI18n } from '../i18n';
import RevealText from './RevealText';
import { useParallax } from '../hooks/useParallax';
import { PREMIUM } from '../utils/easings';
import '../styles/philosophy.css';

/**
 * El recorte vive en variantes, no en el propio elemento: con `clip-path: inset(100%)`
 * el navegador lo reporta fuera de pantalla y `whileInView` nunca dispararía.
 */
const CLIP_UP = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 1.25, ease: PREMIUM } },
};

export default function Philosophy() {
  const { t } = useI18n();
  const { ref, y } = useParallax(52);

  return (
    <section className="section philosophy" id="filosofia">
      <div className="shell philosophy__grid">
        {/* Imagen: el arco de mármol real de la clínica */}
        <motion.div
          className="philosophy__media"
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div className="philosophy__frame arch" variants={CLIP_UP}>
            <motion.img
              src="/media/g-espera.jpg"
              alt="Sala de espera de la clínica, con arcos y mobiliario en tonos crema"
              style={{ y, scale: 1.16 }}
              loading="lazy"
            />
          </motion.div>
          <div className="philosophy__outline arch" aria-hidden />
        </motion.div>

        {/* Texto */}
        <div className="philosophy__copy">
          <span className="eyebrow">{t.philosophy.eyebrow}</span>
          <RevealText tag="h2" className="section-title philosophy__title" accent={['estética']}>
            {t.philosophy.title}
          </RevealText>

          {t.philosophy.body.map((p, i) => (
            <motion.p
              key={i}
              className="philosophy__p"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.85, delay: 0.1 + i * 0.12, ease: PREMIUM }}
            >
              {p}
            </motion.p>
          ))}

          <ul className="pillars">
            {t.philosophy.pillars.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: PREMIUM }}
              >
                <span className="pillars__n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cita de la CEO — el corazón discursivo de la sección */}
      <div className="shell">
        <motion.blockquote
          className="pullquote"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: PREMIUM }}
        >
          <span className="pullquote__mark" aria-hidden>
            &ldquo;
          </span>
          <p>{t.philosophy.quote}</p>
          <footer>
            <span className="pullquote__name">{t.philosophy.quoteAuthor}</span>
            <span className="pullquote__role">{t.philosophy.quoteRole}</span>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
