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

/**
 * Glifo de WhatsApp. Va relleno con `currentColor`, no trazado como los demás,
 * para que sea reconocible a cualquier tamaño.
 */
export const IconWhatsApp = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);
