import { motion } from 'framer-motion';
import { useI18n } from '../i18n';
import RevealText from './RevealText';
import { PREMIUM } from '../utils/easings';
import '../styles/testimonials.css';

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } } };
const item = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: PREMIUM } },
};

export default function Testimonials() {
  const { t } = useI18n();

  return (
    <section className="section testimonials">
      <div className="shell">
        <header className="testimonials__head">
          <span className="eyebrow">{t.testimonials.eyebrow}</span>
          <RevealText tag="h2" className="section-title testimonials__title" accent={['aquí', 'here']}>
            {t.testimonials.title}
          </RevealText>
        </header>

        <motion.div
          className="testimonials__grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {t.testimonials.items.map((q) => (
            <motion.figure className="quote" key={q.name} variants={item} data-cursor="hover">
              <span className="quote__mark" aria-hidden>
                &ldquo;
              </span>
              <blockquote>{q.quote}</blockquote>
              <figcaption>
                <span className="quote__name">{q.name}</span>
                <span className="quote__city">{q.city}</span>
              </figcaption>
              <span className="quote__stars" aria-hidden>
                {'★★★★★'}
              </span>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
