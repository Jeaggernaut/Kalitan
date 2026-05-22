import {
  BenefitsSection,
  FinalCtaSection,
  HeroSection,
  HowItWorksSection,
  ImpactSection,
  MetricsSection,
  PlansSection,
} from '../components/sections/LandingSections'
import ScrollReveal from '../components/animations/ScrollReveal'

export default function LandingPage() {
  return (
    <>
      <ScrollReveal delay={0.05}>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal>
        <HowItWorksSection />
      </ScrollReveal>
      <ScrollReveal>
        <BenefitsSection />
      </ScrollReveal>
      <ScrollReveal>
        <ImpactSection />
      </ScrollReveal>
      <ScrollReveal>
        <MetricsSection />
      </ScrollReveal>
      <ScrollReveal>
        <PlansSection />
      </ScrollReveal>
      <ScrollReveal>
        <FinalCtaSection />
      </ScrollReveal>
    </>
  )
}
