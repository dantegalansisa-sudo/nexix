/**
 * Iconos de línea dibujados a mano sobre una retícula de 24×24.
 * Trazo fino y esquinas redondeadas para que acompañen al dorado sin gritar.
 */

type P = { className?: string };

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const IconHeart = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 20.2s-7.3-4.4-7.3-9.4A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.3 2.6c0 5-7.3 9.4-7.3 9.4Z" />
  </svg>
);

export const IconAward = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="9" r="5.2" />
    <path d="M8.6 13.4 7.4 21l4.6-2.4 4.6 2.4-1.2-7.6" />
  </svg>
);

export const IconSpark = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3.2 13.7 9l5.8 1.7-5.8 1.7L12 18.2l-1.7-5.8-5.8-1.7L10.3 9 12 3.2Z" />
    <path d="M18.6 16.6 19.3 19l2.4.7-2.4.7-.7 2.4" opacity=".55" />
  </svg>
);

export const IconTag = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M11.4 3.6H20v8.6l-8.8 8.8a1.6 1.6 0 0 1-2.3 0l-6.3-6.3a1.6 1.6 0 0 1 0-2.3l8.8-8.8Z" />
    <circle cx="16.1" cy="7.9" r="1.35" />
  </svg>
);

export const IconPin = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 21.4s6.8-6 6.8-11a6.8 6.8 0 1 0-13.6 0c0 5 6.8 11 6.8 11Z" />
    <circle cx="12" cy="10.2" r="2.5" />
  </svg>
);

export const IconScan = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3.6 8.2V5.6a2 2 0 0 1 2-2h2.6M15.8 3.6h2.6a2 2 0 0 1 2 2v2.6M20.4 15.8v2.6a2 2 0 0 1-2 2h-2.6M8.2 20.4H5.6a2 2 0 0 1-2-2v-2.6" />
    <path d="M3.6 12h16.8" opacity=".55" />
  </svg>
);

export const IconLeaf = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M20.2 4.2c0 8.4-4.6 13-11.4 13a5.6 5.6 0 0 1 0-11.2c4.6 0 7.6-1 11.4-1.8Z" />
    <path d="M4.2 20.4c2.6-4 5.6-6.6 9.4-8.6" opacity=".6" />
  </svg>
);

export const IconShield = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 3.2 4.8 6v5.6c0 4.4 3 8 7.2 9.2 4.2-1.2 7.2-4.8 7.2-9.2V6L12 3.2Z" />
    <path d="m9.3 11.9 1.9 1.9 3.6-3.6" opacity=".7" />
  </svg>
);

export const IconPlay = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M9.4 7.6v8.8L17 12 9.4 7.6Z" />
  </svg>
);

export const IconClose = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="m6.4 6.4 11.2 11.2M17.6 6.4 6.4 17.6" />
  </svg>
);

export const IconSound = ({ className, muted }: P & { muted?: boolean }) => (
  <svg {...base} className={className}>
    <path d="M5 9.4h2.8L11.6 6v12L7.8 14.6H5V9.4Z" />
    {muted ? (
      <path d="m15.4 9.8 3.8 4.4M19.2 9.8l-3.8 4.4" />
    ) : (
      <path d="M14.8 9.2a4 4 0 0 1 0 5.6M17.3 7a7 7 0 0 1 0 10" />
    )}
  </svg>
);
