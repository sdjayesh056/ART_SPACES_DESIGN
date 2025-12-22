import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { StatsSection } from "@/components/home/StatsSection";
import { LeadFormSection } from "@/components/home/LeadFormSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <StatsSection />
      <LeadFormSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
