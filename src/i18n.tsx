import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

/* ------------------------------------------------------------------ *
 * Datos reales de la clínica (Instagram @martis_dental_clinic_group)
 * ------------------------------------------------------------------ */
export const CLINIC = {
  name: 'Martis Esthetic & Dental Clinic Group',
  instagram: 'https://www.instagram.com/martis_dental_clinic_group/',
  instagramHandle: '@martis_dental_clinic_group',
  tourismHandle: '@smileparadiserd',
  tourismUrl: 'https://www.instagram.com/smileparadiserd/',
  /** Link corto del perfil de WhatsApp Business. No admite mensaje prefijado. */
  whatsappShort: 'https://wa.me/message/V6QXEHWZOQPND1',
  /**
   * Número con código de país, sólo dígitos (ej. '18091234567').
   * Sólo con el número se puede abrir WhatsApp con el mensaje ya escrito;
   * mientras esté vacío se usa el link corto y el texto se copia al portapapeles.
   */
  whatsappNumber: '',
  address: 'Av. 27 de Febrero esq. Profesor Puello #56',
  city: 'San Pedro de Macorís 21000, República Dominicana',
  maps: 'https://www.google.com/maps/search/?api=1&query=Av.+27+de+Febrero+esquina+Profesor+Puello+56+San+Pedro+de+Macoris',
} as const;

/**
 * Devuelve el enlace de WhatsApp. Con `whatsappNumber` configurado abre el chat
 * con el mensaje ya redactado; sin él cae al link corto, que no admite texto.
 */
export function waLink(message?: string): string {
  if (!CLINIC.whatsappNumber) return CLINIC.whatsappShort;
  const base = `https://wa.me/${CLINIC.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const canPrefillWhatsApp = () => Boolean(CLINIC.whatsappNumber);

const es = {
  code: 'es',
  nav: {
    links: [
      { id: 'filosofia', label: 'La clínica' },
      { id: 'tratamientos', label: 'Tratamientos' },
      { id: 'doctora', label: 'Dra. Martis' },
      { id: 'espacio', label: 'El espacio' },
      { id: 'turismo', label: 'Turismo dental' },
    ],
    cta: 'Agendar cita',
    menu: 'Menú',
    close: 'Cerrar',
  },
  /** Mensajes que se abren ya redactados en WhatsApp según desde dónde se pulse. */
  wa: {
    generic: 'Hola, Martis 👋 Me gustaría agendar una cita.',
    doctor: 'Hola, Martis 👋 Me gustaría agendar una valoración con la Dra. Elizabeth Martis.',
    tourism: 'Hola, Martis 👋 Escribo desde el exterior y me interesa el programa de turismo dental.',
    greeting: 'Hola, Martis 👋',
    iAm: 'Soy',
    interested: 'Me interesa',
    myPhone: 'Mi teléfono / WhatsApp',
    fromWeb: 'Enviado desde la web',
  },
  hero: {
    eyebrow: 'San Pedro de Macorís · República Dominicana',
    titleA: 'Donde la sonrisa',
    titleB: 'se vuelve',
    titleAccent: 'arte',
    lead: 'Odontología altamente especializada, armonización orofacial y rejuvenecimiento facial. Doce años de excelencia clínica reunidos en un solo espacio.',
    ctaPrimary: 'Agendar mi cita',
    ctaSecondary: 'Recorrer la clínica',
    videoTag: 'Recorrido por la clínica',
    scroll: 'Desliza',
  },
  stats: [
    { value: 12, suffix: '+', label: 'Años de experiencia clínica' },
    { value: 6, suffix: '', label: 'Suites de atención privada' },
    { value: 4, suffix: '', label: 'Áreas de especialidad' },
    { value: 9600, suffix: '+', label: 'Pacientes en comunidad' },
  ],
  marquee: [
    'Periodoncia',
    'Implantes dentales',
    'Armonización orofacial',
    'Diseño de sonrisa',
    'Rejuvenecimiento facial',
    'Ortodoncia',
    'Turismo dental',
    'Estética avanzada',
  ],
  philosophy: {
    eyebrow: 'Nuestra filosofía',
    title: 'Salud, función y estética en una sola conversación',
    body: [
      'En Martis no separamos la odontología de la estética. Cada tratamiento parte de un diagnóstico integral donde la salud bucal, la armonía del rostro y la naturalidad del resultado se planifican juntas, no por separado.',
      'Es la diferencia entre arreglar un diente y devolverle a una persona la manera en que se mira al espejo.',
    ],
    quote: 'Creo firmemente que una sonrisa saludable tiene el poder de transformar vidas.',
    quoteAuthor: 'Dra. Elizabeth Martis',
    quoteRole: 'CEO & Fundadora',
    pillars: [
      { title: 'Diagnóstico integral', text: 'Evaluamos el rostro completo antes de tocar un solo diente.' },
      { title: 'Resultado natural', text: 'Nada que se note. Todo que se sienta propio.' },
      { title: 'Tecnología actual', text: 'Equipamiento de última generación en cada suite.' },
    ],
  },
  treatments: {
    eyebrow: 'Tratamientos',
    title: 'Todo lo que tu sonrisa necesita, bajo un mismo techo',
    lead: 'Seis áreas de trabajo que se combinan según tu caso. Ninguna se vende sola: se planifican en conjunto.',
    items: [
      {
        n: '01',
        title: 'Odontología Especializada',
        text: 'La base de todo. Salud primero, estética después.',
        list: ['Rehabilitación oral', 'Endodoncia', 'Odontología preventiva', 'Cirugía bucal'],
      },
      {
        n: '02',
        title: 'Implantes y Periodoncia',
        text: 'La especialidad de la casa: encías sanas y dientes que vuelven a su sitio.',
        list: ['Implantes dentales', 'Injertos de encía', 'Tratamiento periodontal', 'Regeneración ósea'],
      },
      {
        n: '03',
        title: 'Diseño de Sonrisa',
        text: 'Proyectamos el resultado antes de empezar. Nada se improvisa.',
        list: ['Carillas', 'Blanqueamiento profesional', 'Resinas estéticas', 'Contorneado gingival'],
      },
      {
        n: '04',
        title: 'Armonización Orofacial',
        text: 'Con formación realizada en Brasil, cuna de la especialidad.',
        list: ['Toxina botulínica', 'Ácido hialurónico', 'Perfilado facial', 'Bichectomía'],
      },
      {
        n: '05',
        title: 'Rejuvenecimiento y Piel',
        text: 'El cuidado que sostiene el resultado a largo plazo.',
        list: ['Limpieza facial profunda', 'Peelings', 'Bioestimulación', 'Protocolos de mantenimiento'],
      },
      {
        n: '06',
        title: 'Ortopedia y Ortodoncia',
        text: 'Ortodoncia maxilofacial para alinear función y estética.',
        list: ['Brackets estéticos', 'Alineadores', 'Ortopedia maxilar', 'Retención'],
      },
    ],
  },
  doctor: {
    eyebrow: 'Quién está detrás',
    name: 'Dra. Elizabeth Martis',
    role: 'Odontóloga · CEO & Fundadora',
    title: 'Doce años convirtiendo la excelencia en costumbre',
    body: [
      'Apasionada por transformar sonrisas y mejorar la calidad de vida de sus pacientes, la Dra. Martis fundó Martis Esthetic & Dental Clinic Group con una idea clara: que la odontología y la estética facial dejaran de ser dos mundos separados.',
      'Su compromiso es ofrecer tratamientos integrales basados en la excelencia, la innovación y la atención personalizada, combinando salud, función y estética para lograr resultados naturales y duraderos.',
    ],
    credentials: [
      { label: 'Especialista en Periodoncia e Implantes Dentales', detail: 'Especialidad' },
      { label: 'Armonización Orofacial', detail: 'Formación realizada en Brasil' },
      { label: 'Ortopedia y Ortodoncia Maxilofacial', detail: 'Maestría en curso' },
      { label: 'Más de 12 años de experiencia clínica', detail: 'Trayectoria' },
    ],
    cta: 'Agendar con la Dra. Martis',
  },
  space: {
    eyebrow: 'Nuestro espacio',
    title: 'Seis suites diseñadas para que bajes la guardia',
    body: 'Arcos de mármol, luz cálida y madera clara. Cada suite es un espacio privado, silencioso y equipado con tecnología actual — porque relajarse también es parte del tratamiento.',
    playLabel: 'Ver el recorrido',
    soundOn: 'Activar sonido',
    soundOff: 'Silenciar',
    galleryHint: 'Arrastra para explorar',
    gallery: [
      { src: '/media/g-espera.jpg', label: 'Sala de espera' },
      { src: '/media/g-arco-logo.jpg', label: 'Arco de mármol' },
      { src: '/media/g-suite-full.jpg', label: 'Suite clínica' },
      { src: '/media/g-estetica-puerta.jpg', label: 'Área de estética' },
      { src: '/media/g-estetica-sala.jpg', label: 'Cabina facial' },
      { src: '/media/g-suite-5.jpg', label: 'Suite 5' },
      { src: '/media/g-suite-madera.jpg', label: 'Suite en madera' },
      { src: '/media/g-pasillo.jpg', label: 'Pasillo principal' },
      { src: '/media/g-recepcion.jpg', label: 'Recepción' },
      { src: '/media/g-detalle-arco.jpg', label: 'Detalle' },
    ],
  },
  tourism: {
    eyebrow: 'Smile Paradise RD',
    title: 'Tu tratamiento, con el Caribe de fondo',
    body: 'Coordinamos tu plan completo desde el exterior: valoración a distancia, presupuesto cerrado antes de viajar y tratamiento concentrado en pocos días. Tú solo decides dónde quieres descansar después.',
    steps: [
      { n: '01', title: 'Valoración a distancia', text: 'Nos envías fotos y estudios. Te respondemos con un diagnóstico preliminar.' },
      { n: '02', title: 'Plan y presupuesto', text: 'Recibes el plan cerrado y el calendario antes de comprar el vuelo.' },
      { n: '03', title: 'Tratamiento concentrado', text: 'Agendamos todo en pocos días, con suites reservadas para ti.' },
      { n: '04', title: 'Descanso en la costa', text: 'Te orientamos con hospedaje y traslados en San Pedro y alrededores.' },
    ],
    cta: 'Escribir por WhatsApp',
    note: 'Atendemos pacientes en español e inglés.',
  },
  testimonials: {
    eyebrow: 'Pacientes',
    title: 'Lo que dicen quienes ya pasaron por aquí',
    items: [
      { quote: 'Llegué por una limpieza y terminé haciéndome el diseño de sonrisa completo. Nunca sentí que me estuvieran vendiendo algo: me explicaron cada paso.', name: 'Yamilet R.', city: 'San Pedro de Macorís' },
      { quote: 'La armonización quedó tan natural que mi familia solo notó que me veía descansada. Exactamente lo que pedí.', name: 'Claudia M.', city: 'Santo Domingo' },
      { quote: 'Vine desde Nueva York por cinco días. Todo estaba coordinado antes de que aterrizara. Volvería sin pensarlo.', name: 'Jorge P.', city: 'Nueva York, EE.UU.' },
    ],
  },
  contact: {
    eyebrow: 'Agenda tu cita',
    title: 'Empecemos por una conversación',
    body: 'Cuéntanos qué te gustaría cambiar. La primera valoración es una conversación tranquila, sin compromiso, para entender tu caso y explicarte las opciones reales.',
    addressLabel: 'Dirección',
    hoursLabel: 'Horario',
    hours: ['Lunes a viernes · 9:00 – 18:00', 'Sábados · 9:00 – 14:00'],
    socialLabel: 'Redes',
    whatsappCta: 'Escribir por WhatsApp',
    mapsCta: 'Cómo llegar',
    formTitle: 'O déjanos tus datos',
    fields: { name: 'Nombre completo', phone: 'Teléfono o WhatsApp', interest: 'Qué te interesa', message: 'Cuéntanos brevemente' },
    interests: ['Odontología general', 'Diseño de sonrisa', 'Implantes', 'Armonización orofacial', 'Rejuvenecimiento facial', 'Turismo dental'],
    submit: 'Enviar por WhatsApp',
    sent: 'Abriendo WhatsApp…',
    waNote: 'Se abre WhatsApp con tu mensaje ya redactado.',
    copyNote: 'Copiamos tu mensaje al portapapeles: pégalo en el chat.',
  },
  footer: {
    tagline: 'Donde la excelencia es nuestra especialidad.',
    rights: 'Todos los derechos reservados.',
    credit: 'Diseño y desarrollo',
    demo: 'Sitio demostrativo',
  },
};

/** El diccionario español define la forma; el inglés debe calzarla exacta. */
type Dict = typeof es;

const en: Dict = {
  code: 'en',
  nav: {
    links: [
      { id: 'filosofia', label: 'The clinic' },
      { id: 'tratamientos', label: 'Treatments' },
      { id: 'doctora', label: 'Dr. Martis' },
      { id: 'espacio', label: 'The space' },
      { id: 'turismo', label: 'Dental tourism' },
    ],
    cta: 'Book a visit',
    menu: 'Menu',
    close: 'Close',
  },
  wa: {
    generic: 'Hello, Martis 👋 I would like to book a visit.',
    doctor: 'Hello, Martis 👋 I would like to book an assessment with Dr. Elizabeth Martis.',
    tourism: 'Hello, Martis 👋 I am writing from abroad and I am interested in the dental tourism programme.',
    greeting: 'Hello, Martis 👋',
    iAm: 'My name is',
    interested: 'I am interested in',
    myPhone: 'My phone / WhatsApp',
    fromWeb: 'Sent from the website',
  },
  hero: {
    eyebrow: 'San Pedro de Macorís · Dominican Republic',
    titleA: 'Where the smile',
    titleB: 'becomes',
    titleAccent: 'art',
    lead: 'Highly specialized dentistry, orofacial harmonization and facial rejuvenation. Twelve years of clinical excellence gathered in one place.',
    ctaPrimary: 'Book my visit',
    ctaSecondary: 'Tour the clinic',
    videoTag: 'A walk through the clinic',
    scroll: 'Scroll',
  },
  stats: [
    { value: 12, suffix: '+', label: 'Years of clinical practice' },
    { value: 6, suffix: '', label: 'Private treatment suites' },
    { value: 4, suffix: '', label: 'Areas of specialty' },
    { value: 9600, suffix: '+', label: 'Patients in our community' },
  ],
  marquee: [
    'Periodontics',
    'Dental implants',
    'Orofacial harmonization',
    'Smile design',
    'Facial rejuvenation',
    'Orthodontics',
    'Dental tourism',
    'Advanced aesthetics',
  ],
  philosophy: {
    eyebrow: 'Our philosophy',
    title: 'Health, function and beauty in a single conversation',
    body: [
      'At Martis we do not treat dentistry and aesthetics as separate worlds. Every treatment begins with a complete diagnosis where oral health, facial harmony and a natural-looking result are planned together — never in isolation.',
      'That is the difference between fixing a tooth and giving someone back the way they look at themselves in the mirror.',
    ],
    quote: 'I firmly believe a healthy smile has the power to transform lives.',
    quoteAuthor: 'Dr. Elizabeth Martis',
    quoteRole: 'CEO & Founder',
    pillars: [
      { title: 'Complete diagnosis', text: 'We read the whole face before touching a single tooth.' },
      { title: 'Natural results', text: 'Nothing that shows. Everything that feels like you.' },
      { title: 'Current technology', text: 'Latest-generation equipment in every suite.' },
    ],
  },
  treatments: {
    eyebrow: 'Treatments',
    title: 'Everything your smile needs, under one roof',
    lead: 'Six areas of work that combine around your case. None of them is sold on its own — they are planned together.',
    items: [
      {
        n: '01',
        title: 'Specialized Dentistry',
        text: 'The foundation of everything. Health first, aesthetics after.',
        list: ['Oral rehabilitation', 'Endodontics', 'Preventive dentistry', 'Oral surgery'],
      },
      {
        n: '02',
        title: 'Implants & Periodontics',
        text: 'The house specialty: healthy gums and teeth back where they belong.',
        list: ['Dental implants', 'Gum grafting', 'Periodontal therapy', 'Bone regeneration'],
      },
      {
        n: '03',
        title: 'Smile Design',
        text: 'We project the result before we begin. Nothing is improvised.',
        list: ['Veneers', 'Professional whitening', 'Aesthetic composites', 'Gingival contouring'],
      },
      {
        n: '04',
        title: 'Orofacial Harmonization',
        text: 'Trained in Brazil, the birthplace of the specialty.',
        list: ['Botulinum toxin', 'Hyaluronic acid', 'Facial contouring', 'Buccal fat removal'],
      },
      {
        n: '05',
        title: 'Rejuvenation & Skin',
        text: 'The care that keeps the result standing over time.',
        list: ['Deep facial cleansing', 'Peels', 'Biostimulation', 'Maintenance protocols'],
      },
      {
        n: '06',
        title: 'Orthopedics & Orthodontics',
        text: 'Maxillofacial orthodontics to align function and aesthetics.',
        list: ['Aesthetic braces', 'Clear aligners', 'Maxillary orthopedics', 'Retention'],
      },
    ],
  },
  doctor: {
    eyebrow: 'Who is behind it',
    name: 'Dr. Elizabeth Martis',
    role: 'Dentist · CEO & Founder',
    title: 'Twelve years turning excellence into habit',
    body: [
      'Passionate about transforming smiles and improving her patients quality of life, Dr. Martis founded Martis Esthetic & Dental Clinic Group with one clear idea: that dentistry and facial aesthetics should stop being two separate worlds.',
      'Her commitment is to deliver comprehensive treatments built on excellence, innovation and personalized care — combining health, function and aesthetics to achieve natural, lasting results.',
    ],
    credentials: [
      { label: 'Specialist in Periodontics and Dental Implants', detail: 'Specialty' },
      { label: 'Orofacial Harmonization', detail: 'Trained in Brazil' },
      { label: 'Maxillofacial Orthopedics and Orthodontics', detail: "Master's in progress" },
      { label: 'Over 12 years of clinical experience', detail: 'Track record' },
    ],
    cta: 'Book with Dr. Martis',
  },
  space: {
    eyebrow: 'Our space',
    title: 'Six suites designed to let your guard down',
    body: 'Marble arches, warm light and pale wood. Every suite is a private, quiet room equipped with current technology — because relaxing is part of the treatment too.',
    playLabel: 'Watch the tour',
    soundOn: 'Turn sound on',
    soundOff: 'Mute',
    galleryHint: 'Drag to explore',
    gallery: [
      { src: '/media/g-espera.jpg', label: 'Waiting lounge' },
      { src: '/media/g-arco-logo.jpg', label: 'Marble arch' },
      { src: '/media/g-suite-full.jpg', label: 'Clinical suite' },
      { src: '/media/g-estetica-puerta.jpg', label: 'Aesthetics wing' },
      { src: '/media/g-estetica-sala.jpg', label: 'Facial cabin' },
      { src: '/media/g-suite-5.jpg', label: 'Suite 5' },
      { src: '/media/g-suite-madera.jpg', label: 'Wood suite' },
      { src: '/media/g-pasillo.jpg', label: 'Main corridor' },
      { src: '/media/g-recepcion.jpg', label: 'Reception' },
      { src: '/media/g-detalle-arco.jpg', label: 'Detail' },
    ],
  },
  tourism: {
    eyebrow: 'Smile Paradise RD',
    title: 'Your treatment, with the Caribbean behind it',
    body: 'We coordinate your entire plan from abroad: remote assessment, a closed quote before you fly, and treatment concentrated into a few days. You only decide where you want to rest afterwards.',
    steps: [
      { n: '01', title: 'Remote assessment', text: 'Send us photos and records. You get a preliminary diagnosis back.' },
      { n: '02', title: 'Plan and quote', text: 'You receive the full plan and schedule before booking a flight.' },
      { n: '03', title: 'Concentrated treatment', text: 'Everything scheduled across a few days, with suites reserved for you.' },
      { n: '04', title: 'Rest by the coast', text: 'We guide you on lodging and transfers in San Pedro and nearby.' },
    ],
    cta: 'Message us on WhatsApp',
    note: 'We attend patients in Spanish and English.',
  },
  testimonials: {
    eyebrow: 'Patients',
    title: 'What the people who came through here say',
    items: [
      { quote: 'I came in for a cleaning and ended up doing the full smile design. It never felt like a sales pitch — they walked me through every step.', name: 'Yamilet R.', city: 'San Pedro de Macorís' },
      { quote: 'The harmonization looked so natural that my family only noticed I seemed well rested. Exactly what I asked for.', name: 'Claudia M.', city: 'Santo Domingo' },
      { quote: 'I flew in from New York for five days. Everything was coordinated before I landed. I would do it again without thinking.', name: 'Jorge P.', city: 'New York, USA' },
    ],
  },
  contact: {
    eyebrow: 'Book your visit',
    title: 'Let us start with a conversation',
    body: 'Tell us what you would like to change. The first assessment is a calm, no-commitment conversation to understand your case and walk you through the real options.',
    addressLabel: 'Address',
    hoursLabel: 'Hours',
    hours: ['Monday to Friday · 9:00 – 18:00', 'Saturday · 9:00 – 14:00'],
    socialLabel: 'Social',
    whatsappCta: 'Message us on WhatsApp',
    mapsCta: 'Get directions',
    formTitle: 'Or leave us your details',
    fields: { name: 'Full name', phone: 'Phone or WhatsApp', interest: 'What are you interested in', message: 'Tell us briefly' },
    interests: ['General dentistry', 'Smile design', 'Implants', 'Orofacial harmonization', 'Facial rejuvenation', 'Dental tourism'],
    submit: 'Send via WhatsApp',
    sent: 'Opening WhatsApp…',
    waNote: 'WhatsApp opens with your message already written.',
    copyNote: 'We copied your message to the clipboard — just paste it in the chat.',
  },
  footer: {
    tagline: 'Where excellence is our specialty.',
    rights: 'All rights reserved.',
    credit: 'Design and development',
    demo: 'Demonstration site',
  },
};

const DICTS = { es, en } as const;
export type Lang = keyof typeof DICTS;

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es');

  const value = useMemo<I18nValue>(() => {
    document.documentElement.lang = lang;
    return { lang, setLang, t: DICTS[lang] };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>');
  return ctx;
}
