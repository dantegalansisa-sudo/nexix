import { motion } from 'framer-motion';
import { useI18n, waLink } from '../i18n';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { PREMIUM } from '../utils/easings';
import '../styles/treatments.css';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.085, delayChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 46, scale: 0.975 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.68, ease: PREMIUM } },
};

export default function Treatments() {
  const { t } = useI18n();

  return (
    <section className="section treatments bg-crema" id="tratamientos">
      <div className="shell">
        <header className="treatments__head">
          <div>
            <span className="eyebrow">{t.treatments.eyebrow}</span>
            <RevealText tag="h2" className="section-title treatments__title" accent={['techo', 'roof']}>
              {t.treatments.title}
            </RevealText>
          </div>
          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.85, delay: 0.15, ease: PREMIUM }}
          >
            {t.treatments.lead}
          </motion.p>
        </header>

        <motion.div
          className="treatments__grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {t.treatments.items.map((item) => (
            <motion.article
              className="tcard"
              key={item.n}
              variants={card}
              whileHover={{ y: -9, transition: { duration: 0.28, ease: PREMIUM } }}
              data-cursor="hover"
            >
              <span className="tcard__n">{item.n}</span>
              <h3 className="tcard__title">{item.title}</h3>
              <p className="tcard__text">{item.text}</p>
              <ul className="tcard__list">
                {item.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
              <span className="tcard__glow" aria-hidden />
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="treatments__foot"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: PREMIUM }}
        >
          <hr className="hairline" />
          <MagneticButton href={waLink(t.wa.generic)} className="btn">
            {t.nav.cta}
            <span className="btn__arrow">→</span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
