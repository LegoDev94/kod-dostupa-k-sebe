import SmoothScroll from '@/components/SmoothScroll';
import CursorGlow from '@/components/CursorGlow';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ForWhom from '@/components/ForWhom';
import Themes from '@/components/Themes';
import Approach from '@/components/Approach';
import About from '@/components/About';
import Services from '@/components/Services';
import Safety from '@/components/Safety';
import Testimonials from '@/components/Testimonials';
import Practice from '@/components/Practice';
import Community from '@/components/Community';
import Faq from '@/components/Faq';
import Survey from '@/components/Survey';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <CursorGlow />
      <Header />
      <main>
        <Hero />
        <ForWhom />
        <Themes />
        <Approach />
        <About />
        <Services />
        <Safety />
        <Testimonials />
        <Practice />
        <Community />
        <Faq />
        <Survey />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
