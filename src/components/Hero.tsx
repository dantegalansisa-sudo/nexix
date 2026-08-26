import { useRef, useState, type ComponentType } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useI18n, waLink } from '../i18n';
import MagneticButton from './MagneticButton';
import VideoModal from './VideoModal';
import { IconLeaf, IconPlay, IconScan, IconShield, IconSpark } from './Icons';
import { PREMIUM } from '../utils/easings';
import '../styles/hero.css';

const MINI_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  scan: IconScan,
  leaf: IconLeaf,
  spark: IconSpark,
  shield: IconShield,
};

export default function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.09]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 56]);

  return (
    <>
      <section className="hero" id="top" ref={ref}>
        <div className="hero__wash" aria-hidden />
        <div className="hero__blob" aria-hidden />

        <div className="shell hero__grid">
          {/* ------------------------- Columna de texto ------------------------- */}
          <motion.div className="hero__copy" style={{ y: copyY }}>
            <motion.span
              className="hero__badge"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease: PREMIUM }}
            >
              <i aria-hidden />
              {t.hero.badge}
            </motion.span>

            <h1 className="hero__title">
              {[t.hero.titleA, t.hero.titleB].map((line, li) => (
                <span className="hero__line" key={li}>
                  {line.split(' ').map((w, i) => (
                    <span className="reveal-word" key={i}>
                      <motion.span
                        style={{ display: 'inline-block' }}
                        initial={{ y: '110%', rotate: 2 }}
                        animate={{ y: 0, rotate: 0 }}
                        transition={{ duration: 1.05, delay: 0.4 + (li * 3 + i) * 0.075, ease: PREMIUM }}
                      >
                        {w}
                      </motion.span>
                    </span>
                  ))}
                  {li === 1 && (
                    <span className="reveal-word">
                      <motion.span
                        className="display-italic"
                        style={{ display: 'inline-block' }}
                        initial={{ y: '110%', rotate: 2 }}
                        animate={{ y: 0, rotate: 0 }}
                        transition={{ duration: 1.05, delay: 0.74, ease: PREMIUM }}
                      >
                        {t.hero.titleAccent}
                      </motion.span>
                    </span>
                  )}
                </span>
              ))}
            </h1>

            <motion.p
              className="hero__lead"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.9, ease: PREMIUM }}
            >
              {t.hero.lead}
            </motion.p>

            <motion.div
              className="hero__cta"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 1.02, ease: PREMIUM }}
            >
              <MagneticButton href={waLink(t.wa.generic)} className="btn">
                {t.hero.ctaPrimary}
                <span className="btn__arrow">→</span>
              </MagneticButton>

              <MagneticButton className="playbtn" newTab={false} onClick={() => setVideoOpen(true)}>
                <span className="playbtn__disc">
                  <IconPlay />
                </span>
                {t.hero.ctaSecondary}
              </MagneticButton>
            </motion.div>

            <motion.ul
              className="hero__mini"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 1.18, ease: PREMIUM }}
            >
              {t.hero.mini.map((m) => {
                const Icon = MINI_ICONS[m.icon] ?? IconSpark;
                return (
                  <li key={m.label}>
                    <Icon className="hero__miniicon" />
                    {m.label}
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>

          {/* ------------------------- Columna de imagen ------------------------- */}
          <motion.div
            className="hero__media"
            initial={{ opacity: 0, y: 54 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.35, delay: 0.45, ease: PREMIUM }}
          >
            <span className="hero__dots" aria-hidden />

            <motion.div className="hero__photo" style={{ y: photoY }}>
              <motion.img
                src="/media/hero-patient.jpg"
                alt=""
                style={{ scale: photoScale }}
              />
            </motion.div>

            {/* Tarjeta flotante: el sello de trayectoria */}
            <motion.div
              className="hero__card"
              initial={{ opacity: 0, x: -26, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 1.25, ease: PREMIUM }}
            >
              <img src="/media/logo-mark.png" alt="" />
              <div>
                <strong>12+</strong>
                <span>{t.stats[0].label}</span>
              </div>
            </motion.div>

            {/* Sello circular giratorio */}
            <div className="hero__seal" aria-hidden>
              <svg viewBox="0 0 200 200" className="hero__sealsvg">
                <defs>
                  <path id="sealpath" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" fill="none" />
                </defs>
                <text>
                  <textPath href="#sealpath" startOffset="0">
                    MARTIS CLINIC GROUP · SAN PEDRO DE MACORÍS ·&#160;
                  </textPath>
                </text>
              </svg>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          aria-hidden
        >
          <span>{t.hero.scroll}</span>
          <i />
        </motion.div>
      </section>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
}
