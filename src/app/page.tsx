import { HeroSection } from "@/components/sections/hero";
import { WhyVaspSection } from "@/components/sections/why-vasp";
import { StatsSection } from "@/components/sections/stats";
import { SolutionsOverview } from "@/components/sections/solutions-overview";
import { IndustriesOverview } from "@/components/sections/industries-overview";
import { TechnologyOverview } from "@/components/sections/technology-overview";
import { CaseStudiesOverview } from "@/components/sections/case-studies-overview";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyVaspSection />
      <StatsSection />
      <SolutionsOverview />
      <IndustriesOverview />
      <TechnologyOverview />
      <CaseStudiesOverview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
