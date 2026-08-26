import { I18nProvider } from './i18n';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Philosophy from './components/Philosophy';
import Treatments from './components/Treatments';
import Doctor from './components/Doctor';
import Space from './components/Space';
import Tourism from './components/Tourism';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <I18nProvider>
      <Preloader onDone={() => undefined} />
      <CustomCursor />
      <ScrollProgress />
      <div className="grain" aria-hidden />

      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Philosophy />
        <Treatments />
        <Doctor />
        <Space />
        <Tourism />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </I18nProvider>
  );
}
