import { lazy, Suspense } from 'react';
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

// Lazy loading para componentes menos críticos
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

// Componente de loading
const SectionLoader = () => (
  <div className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <>
      <SEO />
      <div className="min-h-screen">
        <Header />
        <HeroSection />
        
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <FooterSection />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
