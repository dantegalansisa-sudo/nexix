import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n';
import { IconAward, IconHeart, IconPin, IconSpark, IconTag } from './Icons';
import { PREMIUM } from '../utils/easings';
import '../styles/truststrip.css';

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  heart: IconHeart,
  award: IconAward,
  spark: IconSpark,
  tag: IconTag,
  pin: IconPin,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: PREMIUM } },
};

/** Banda de confianza que monta sobre el borde del hero, como en la referencia. */
export default function TrustStrip() {
  const { t } = useI18n();

  return (
    <div className="trust">
      <motion.div
        className="shell trust__card"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {t.trust.items.map((it) => {
          const Icon = ICONS[it.icon] ?? IconSpark;
          return (
            <motion.div className="trust__item" key={it.title} variants={item}>
              <span className="trust__icon">
                <Icon />
              </span>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
