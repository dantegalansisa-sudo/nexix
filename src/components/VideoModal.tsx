import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '../i18n';
import { IconClose, IconSound } from './Icons';
import { PREMIUM } from '../utils/easings';
import '../styles/videomodal.css';

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Reproductor del recorrido de la clínica. El video es vertical 9:16, así que
 *  se muestra a altura completa y el fondo oscuro hace de passe-partout. */
export default function VideoModal({ open, onClose }: Props) {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Al cerrar se detiene y se rebobina: si se reabre, arranca desde el principio.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (open) {
      v.currentTime = 0;
      void v.play().catch(() => undefined);
    } else {
      v.pause();
      setMuted(true);
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="vmodal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={t.hero.videoTag}
        >
          <motion.div
            className="vmodal__frame"
            initial={{ y: 44, scale: 0.94 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 30, scale: 0.96 }}
            transition={{ duration: 0.72, ease: PREMIUM }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src="/media/clinic.mp4"
              poster="/media/poster.jpg"
              muted={muted}
              loop
              playsInline
              controls={false}
            />

            <div className="vmodal__bar">
              <span className="vmodal__tag">{t.hero.videoTag}</span>
              <button
                className="vmodal__sound"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? t.hero.soundOn : t.hero.soundOff}
              >
                <IconSound muted={muted} />
                <span>{muted ? t.hero.soundOn : t.hero.soundOff}</span>
              </button>
            </div>
          </motion.div>

          <button className="vmodal__close" onClick={onClose} aria-label={t.nav.close}>
            <IconClose />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
