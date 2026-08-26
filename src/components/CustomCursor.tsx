import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE = 'a, button, input, select, textarea, [data-cursor="hover"]';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const dotX = useSpring(x, { damping: 34, stiffness: 900, mass: 0.25 });
  const dotY = useSpring(y, { damping: 34, stiffness: 900, mass: 0.25 });
  const ringX = useSpring(x, { damping: 26, stiffness: 210, mass: 0.6 });
  const ringY = useSpring(y, { damping: 26, stiffness: 210, mass: 0.6 });

  useEffect(() => {
    // Sólo en punteros finos: en táctil el cursor nativo debe seguir existiendo.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.body.classList.add('has-custom-cursor');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      // Delegación: un solo listener aunque el DOM cambie de idioma o de sección.
      const hovering = (e.target as Element | null)?.closest?.(INTERACTIVE);
      ringRef.current?.classList.toggle('cursor--hover', Boolean(hovering));
    };

    const leave = () => {
      x.set(-200);
      y.set(-200);
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        aria-hidden
      />
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        aria-hidden
      />
    </>
  );
}
