import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import BiologistsSection from '@/components/sections/BiologistsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import CTASection from '@/components/sections/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <BiologistsSection />
        <ProjectsSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
