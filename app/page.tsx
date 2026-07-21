import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProductCatalog from '@/components/ProductCatalog';
import InquiryForm from '@/components/InquiryForm';
import Footer from '@/components/Footer';
import FloatingChannels from '@/components/FloatingChannels';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      {/* Navigation Header */}
      <Header />

      {/* Main Sections */}
      <main className={styles.main}>
        {/* Intro Hero Section */}
        <Hero />

        {/* Brand Philosophy / Story */}
        <AboutSection />

        {/* Gift Packages Catalog & details modal */}
        <ProductCatalog />

        {/* Interactive Custom Quote / Inquiry Form */}
        <InquiryForm />
      </main>

      {/* Brand Footer */}
      <Footer />

      {/* Floating Inquiry & SNS Channels (Naver TalkTalk, KakaoTalk, YouTube) */}
      <FloatingChannels />
    </div>
  );
}
