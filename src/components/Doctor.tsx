import { motion } from 'framer-motion';
import { CLINIC, useI18n } from '../i18n';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { useParallax } from '../hooks/useParallax';
import { PREMIUM } from '../utils/easings';
import '../styles/doctor.css';

/** Ver nota en Philosophy: el recorte debe ir en variantes para que el trigger funcione. */
const CLIP_DOWN = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 1.25, ease: PREMIUM } },
};

export default function Doctor() {
  const { t } = useI18n();
  const { ref, y } = useParallax(44);

  return (
    <section className="section doctor" id="doctora">
      <div className="shell doctor__grid">
        {/* -------------------------- Texto -------------------------- */}
        <div className="doctor__copy">
          <span className="eyebrow">{t.doctor.eyebrow}</span>

          <motion.p
            className="doctor__name"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.85, ease: PREMIUM }}
          >
            {t.doctor.name}
          </motion.p>
          <motion.p
            className="doctor__role"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            {t.doctor.role}
          </motion.p>

          <RevealText tag="h2" className="section-title doctor__title" delay={0.05} accent={['costumbre', 'habit']}>
            {t.doctor.title}
          </RevealText>

          {t.doctor.body.map((p, i) => (
            <motion.p
              key={i}
              className="doctor__p"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.85, delay: 0.1 + i * 0.12, ease: PREMIUM }}
            >
              {p}
            </motion.p>
          ))}

          <ul className="creds">
            {t.doctor.credentials.map((c, i) => (
              <motion.li
                key={c.label}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.62, delay: i * 0.08, ease: PREMIUM }}
              >
                <span className="creds__detail">{c.detail}</span>
                <span className="creds__label">{c.label}</span>
              </motion.li>
            ))}
          </ul>

          <div className="doctor__cta">
            <MagneticButton href={CLINIC.whatsapp} className="btn">
              {t.doctor.cta}
              <span className="btn__arrow">→</span>
            </MagneticButton>
          </div>
        </div>

        {/* ------------------------- Retrato ------------------------- */}
        <motion.div
          className="doctor__media"
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="doctor__frame arch" variants={CLIP_DOWN}>
            <motion.img
              src="/media/ceo.jpg"
              alt={`${t.doctor.name} — ${t.doctor.role}`}
              style={{ y, scale: 1.12 }}
              loading="lazy"
            />
          </motion.div>

          <div className="doctor__outline arch" aria-hidden />

          <motion.div
            className="doctor__badge"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.75, delay: 0.4, ease: PREMIUM }}
          >
            <img src="/media/logo-mark.png" alt="" />
            <span>
              12<em>+</em>
            </span>
            <small>{t.stats[0].label}</small>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
