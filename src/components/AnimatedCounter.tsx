import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  target: number;
  suffix?: string;
  duration?: number;
  /** Muestra 9600 como "9.6K". */
  compact?: boolean;
}

export default function AnimatedCounter({ target, suffix = '', duration = 1800, compact }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo: arranca rápido y frena — se lee como algo que "aterriza".
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  const shown = compact && target >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toLocaleString('es-DO');

  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  );
}
