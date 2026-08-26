import { motion, type Variants } from 'framer-motion';
import { PREMIUM } from '../utils/easings';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

interface Props {
  children: string;
  className?: string;
  delay?: number;
  tag?: Tag;
  /** Palabras que se pintan en dorado itálico (comparación sin puntuación ni mayúsculas). */
  accent?: string[];
  once?: boolean;
}

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.062, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { y: '108%', rotate: 1.6 },
  visible: { y: 0, rotate: 0, transition: { duration: 0.92, ease: PREMIUM } },
};

/**
 * Titular que entra palabra por palabra desde detrás de una máscara.
 *
 * El disparador `whileInView` vive en el contenedor, nunca en las palabras:
 * cada palabra arranca desplazada fuera de su máscara `overflow:hidden`, así que
 * el navegador la reporta como invisible y nunca entraría en pantalla por sí sola.
 */
export default function RevealText({
  children,
  className = '',
  delay = 0,
  tag = 'h2',
  accent = [],
  once = true,
}: Props) {
  const MotionTag = motion[tag];
  const words = children.split(' ');
  const accentSet = new Set(accent.map((w) => w.toLowerCase()));

  return (
    <MotionTag
      className={`reveal-line ${className}`}
      variants={container}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
    >
      {words.map((w, i) => {
        const clean = w.replace(/[.,;:¿?¡!"'—]/g, '').toLowerCase();
        return (
          <span key={`${w}-${i}`} className="reveal-word">
            <motion.span
              style={{ display: 'inline-block' }}
              className={accentSet.has(clean) ? 'display-italic' : undefined}
              variants={word}
            >
              {w}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
