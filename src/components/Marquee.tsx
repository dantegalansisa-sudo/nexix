import { useI18n } from '../i18n';
import '../styles/marquee.css';

/** Cinta infinita de especialidades: mantiene el ojo en movimiento entre secciones. */
export default function Marquee() {
  const { t } = useI18n();
  const items = [...t.marquee, ...t.marquee];

  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {items.map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}
