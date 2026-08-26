import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useI18n, waLink } from '../i18n';
import MagneticButton from './MagneticButton';
import AnimatedCounter from './AnimatedCounter';
import { PREMIUM } from '../utils/easings';
import '../styles/hero.css';

export default function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__glow" aria-hidden />

      <div className="shell hero__grid">
        {/* ---------- Columna de texto ---------- */}
        <motion.div className="hero__copy" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: PREMIUM }}
          >
            {t.hero.eyebrow}
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
                      transition={{ duration: 1.05, delay: 0.45 + (li * 3 + i) * 0.075, ease: PREMIUM }}
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
                      transition={{ duration: 1.05, delay: 0.78, ease: PREMIUM }}
                    >
                      {t.hero.titleAccent}
                    </motion.span>
                  </span>
                )}
              </span>
            ))}
          </h1>

          <motion.p
            className="hero__lead lead"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.95, ease: PREMIUM }}
          >
            {t.hero.lead}
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 1.08, ease: PREMIUM }}
          >
            <MagneticButton href={waLink(t.wa.generic)} className="btn">
              {t.hero.ctaPrimary}
              <span className="btn__arrow">→</span>
            </MagneticButton>
            <MagneticButton
              className="btn btn--ghost"
              newTab={false}
              onClick={() => document.getElementById('espacio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.hero.ctaSecondary}
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* ---------- Columna del video vertical ---------- */}
        <motion.div
          className="hero__media"
          style={{ y: videoY }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: PREMIUM }}
        >
          <motion.div
            className="hero__archwrap"
            animate={{ y: [0, -13, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="hero__arch arch">
              <motion.video
                style={{ scale: videoScale }}
                src="/media/clinic-loop.mp4"
                poster="/media/poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label={t.hero.videoTag}
              />
              <span className="hero__archline" aria-hidden />
            </div>

            <div className="hero__tag">
              <span className="hero__pulse" aria-hidden />
              {t.hero.videoTag}
            </div>

            {/* Sello circular giratorio que muerde la columna de texto */}
            <div className="hero__seal" aria-hidden>
              <svg viewBox="0 0 200 200" className="hero__sealsvg">
                <defs>
                  <path
                    id="sealpath"
                    d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
                    fill="none"
                  />
                </defs>
                <text>
                  <textPath href="#sealpath" startOffset="0">
                    MARTIS ESTHETIC &amp; DENTAL CLINIC GROUP · SAN PEDRO DE MACORÍS ·
                  </textPath>
                </text>
              </svg>
              <img src="/media/logo-mark.png" alt="" className="hero__sealmark" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ---------- Franja de cifras ---------- */}
      <motion.div
        className="shell"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.3, ease: PREMIUM }}
      >
        <div className="hero__stats">
          {t.stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat__value">
                <AnimatedCounter target={s.value} suffix={s.suffix} compact={s.value >= 1000} />
              </span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        aria-hidden
      >
        <span>{t.hero.scroll}</span>
        <i />
      </motion.div>
    </section>
  );
}
