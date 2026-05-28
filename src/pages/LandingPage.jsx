import '../styles/motions.css'
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
      {/* Hero animates on mount via internal motion.div (no ScrollReveal needed) */}
      <HeroSection />

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
