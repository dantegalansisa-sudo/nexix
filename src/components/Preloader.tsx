import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PREMIUM, CINEMATIC } from '../utils/easings';
import '../styles/preloader.css';

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setOpen(false), 2150);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {open && (
        <motion.div
          className="preloader"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.05, ease: CINEMATIC }}
        >
          <div className="preloader__inner">
            <motion.img
              src="/media/logo-mark.png"
              alt=""
              className="preloader__mark"
              initial={{ opacity: 0, y: 22, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: PREMIUM }}
            />
            <div className="preloader__rule">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.55, delay: 0.28, ease: [0.4, 0, 0.15, 1] }}
              />
            </div>
            <motion.p
              className="preloader__word"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.55 }}
            >
              Esthetic &amp; Dental Clinic Group
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
