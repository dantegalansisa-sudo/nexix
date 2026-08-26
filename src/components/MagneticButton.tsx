import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  radius?: number;
  strength?: number;
  newTab?: boolean;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

/** CTA que se inclina hacia el cursor cuando entra en su radio magnético. */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = 'btn',
  radius = 110,
  strength = 0.3,
  newTab = true,
  type = 'button',
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    if (Math.hypot(dx, dy) < radius + Math.max(r.width, r.height) / 2) {
      setPos({ x: dx * strength, y: dy * strength });
    }
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const inner = href ? (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ display: 'inline-block' }}
    >
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 190, damping: 18, mass: 0.5 }}
      >
        {inner}
      </motion.div>
    </div>
  );
}
