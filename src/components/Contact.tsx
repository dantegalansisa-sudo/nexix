import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CLINIC, canPrefillWhatsApp, useI18n, waLink } from '../i18n';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { IconWhatsApp } from './Icons';
import { PREMIUM } from '../utils/easings';
import '../styles/contact.css';

export default function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  /**
   * No hay backend: el formulario redacta el mensaje y abre WhatsApp con él ya escrito.
   * Si todavía no se configuró `CLINIC.whatsappNumber`, el link corto del perfil no admite
   * texto prefijado, así que se copia al portapapeles y al paciente sólo le queda pegarlo.
   */
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? '').trim();

    const lines = [
      t.wa.greeting,
      '',
      `${t.wa.iAm} ${get('name')}.`,
      `${t.wa.interested}: ${get('interest')}`,
      `${t.wa.myPhone}: ${get('phone')}`,
    ];

    const note = get('message');
    if (note) lines.push('', note);
    lines.push('', `— ${t.wa.fromWeb}`);

    const message = lines.join('\n');

    if (!canPrefillWhatsApp()) {
      void navigator.clipboard?.writeText(message).then(
        () => setCopied(true),
        () => setCopied(false),
      );
    }

    setSent(true);
    window.open(waLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section contact bg-dark" id="contacto">
      <div className="contact__aura" aria-hidden />

      <div className="shell contact__grid">
        <div className="contact__info">
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <RevealText tag="h2" className="section-title contact__title" accent={['conversación', 'conversation']}>
            {t.contact.title}
          </RevealText>
          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.85, delay: 0.12, ease: PREMIUM }}
          >
            {t.contact.body}
          </motion.p>

          <dl className="contact__list">
            <div>
              <dt>{t.contact.addressLabel}</dt>
              <dd>
                {CLINIC.address}
                <br />
                {CLINIC.city}
              </dd>
            </div>
            <div>
              <dt>{t.contact.phoneLabel}</dt>
              <dd>
                <a href={CLINIC.phoneHref} className="contact__link">
                  {CLINIC.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt>{t.contact.hoursLabel}</dt>
              <dd>
                {t.contact.hours.map((h) => (
                  <span key={h}>{h}</span>
                ))}
              </dd>
            </div>
            <div>
              <dt>{t.contact.socialLabel}</dt>
              <dd>
                <a href={CLINIC.instagram} target="_blank" rel="noopener noreferrer" className="contact__link">
                  {CLINIC.instagramHandle}
                </a>
                <a href={CLINIC.tourismUrl} target="_blank" rel="noopener noreferrer" className="contact__link">
                  {CLINIC.tourismHandle}
                </a>
              </dd>
            </div>
          </dl>

          <div className="contact__actions">
            <MagneticButton href={waLink(t.wa.generic)} className="btn btn--light">
              <IconWhatsApp className="btn__wa" />
              {t.contact.whatsappCta}
            </MagneticButton>
            <MagneticButton href={CLINIC.maps} className="btn btn--outline-light">
              {t.contact.mapsCta}
              <span className="btn__arrow">↗</span>
            </MagneticButton>
          </div>
        </div>

        {/* ------------------------- Formulario ------------------------- */}
        <motion.div
          className="formcard"
          initial={{ opacity: 0, y: 46 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.95, ease: PREMIUM }}
        >
          <h3 className="formcard__title">{t.contact.formTitle}</h3>

          <form onSubmit={submit}>
            <label className="field">
              <span>{t.contact.fields.name}</span>
              <input type="text" name="name" required autoComplete="name" />
            </label>

            <label className="field">
              <span>{t.contact.fields.phone}</span>
              <input type="tel" name="phone" required autoComplete="tel" />
            </label>

            <label className="field">
              <span>{t.contact.fields.interest}</span>
              <select name="interest" defaultValue={t.contact.interests[0]}>
                {t.contact.interests.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>{t.contact.fields.message}</span>
              <textarea name="message" rows={3} />
            </label>

            <button type="submit" className="btn formcard__submit">
              <IconWhatsApp className="btn__wa" />
              {sent ? t.contact.sent : t.contact.submit}
            </button>

            <p className="formcard__note">{copied ? t.contact.copyNote : t.contact.waNote}</p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
