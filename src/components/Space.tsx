import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useI18n } from '../i18n';
import RevealText from './RevealText';
import { PREMIUM } from '../utils/easings';
import '../styles/space.css';

export default function Space() {
  const { t } = useI18n();
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Carga diferida: el archivo pesado sólo entra cuando la sección se acerca.
  const near = useInView(stageRef, { once: true, margin: '400px' });

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });
  const colUp = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const colDown = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.96]);

  const left = t.space.gallery.slice(0, 4);
  const right = t.space.gallery.slice(4, 8);
  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play();
  };

  return (
    <section className="section space bg-dark" id="espacio">
      <div className="space__aura" aria-hidden />

      <div className="shell space__head">
        <div>
          <span className="eyebrow">{t.space.eyebrow}</span>
          <RevealText tag="h2" className="section-title space__title" accent={['guardia', 'down']}>
            {t.space.title}
          </RevealText>
        </div>
        <motion.p
          className="lead"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.85, delay: 0.15, ease: PREMIUM }}
        >
          {t.space.body}
        </motion.p>
      </div>

      {/* --------------- Composición: columnas + video --------------- */}
      <div className="shell space__stage" ref={stageRef}>
        <motion.div className="space__col" style={{ y: colUp }} aria-hidden>
          {left.map((g) => (
            <figure className="shot" key={g.src}>
              <img src={g.src} alt="" loading="lazy" />
              <figcaption>{g.label}</figcaption>
            </figure>
          ))}
        </motion.div>

        <motion.div className="space__video" style={{ scale: videoScale }}>
          <div className="space__videoframe arch">
            <video
              ref={videoRef}
              src={near ? '/media/clinic.mp4' : undefined}
              poster="/media/poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={t.space.playLabel}
            />
            <span className="space__videoline" aria-hidden />
          </div>

          <button className="soundbtn" onClick={toggleSound} aria-pressed={!muted}>
            <span className={`soundbtn__bars ${muted ? 'is-muted' : ''}`} aria-hidden>
              <i />
              <i />
              <i />
              <i />
            </span>
            {muted ? t.space.soundOn : t.space.soundOff}
          </button>
        </motion.div>

        <motion.div className="space__col" style={{ y: colDown }} aria-hidden>
          {right.map((g) => (
            <figure className="shot" key={g.src}>
              <img src={g.src} alt="" loading="lazy" />
              <figcaption>{g.label}</figcaption>
            </figure>
          ))}
        </motion.div>
      </div>

      {/* ------------- Tira arrastrable (móvil y tablet) ------------- */}
      <div className="space__striparea">
        <span className="space__hint">{t.space.galleryHint}</span>
        <div className="space__strip">
          {t.space.gallery.map((g) => (
            <figure className="shot shot--strip" key={g.src}>
              <img src={g.src} alt={g.label} loading="lazy" />
              <figcaption>{g.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
