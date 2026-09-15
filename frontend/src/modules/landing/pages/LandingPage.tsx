import ArchitectureSection from "../components/ArchitectureSection";
import CTASection from "../components/CtaSection";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import PricingSection from "../components/PricingSection";
import TestimonialSection from "../components/TestimonialSection";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />

        <FeatureSection />

        <ArchitectureSection />

        <TestimonialSection />

        <PricingSection />

        <CTASection />
      </main>

      <Footer />
    </>
  );
}