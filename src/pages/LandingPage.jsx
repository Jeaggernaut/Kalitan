import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero/Hero'
import HowItWorks from '../components/HowItWorks/HowItWorks'
import ImpactSection from '../components/ImpactSection/ImpactSection'
import Benefits from '../components/Benefits/Benefits'
import Plans from '../components/Plans/Plans'
import About from '../components/About/About'
import Button from '../components/Button/Button'
import './LandingPage.css'

export default function LandingPage() {
  const navigate = useNavigate()

  const openBusinessAffiliation = () => navigate('/afiliar-negocio')
  const openVolunteerRegistration = () => navigate('/register-volunteer')

  return (
    <div className="landing-page">
      <Hero onBusinessClick={openBusinessAffiliation} onVolunteerClick={openVolunteerRegistration} />
      <HowItWorks />
      <ImpactSection />
      <Benefits
        title="Beneficios para negocios"
        description="Soluciones pensadas para que tu comercio genere impacto y reduzca desperdicios de manera inteligente."
        items={['Transforma excedentes en valor social.', 'Reduce costos y mejora tu reputación.', 'Accede a métricas de impacto local.']}
      />
      <Benefits
        title="Beneficios para voluntarios"
        description="Una experiencia flexible, segura y transparente para quienes quieren ayudar con altos estándares."
        items={['Recibe alertas según tu zona.', 'Participa sin logística propia.', 'Cierra el ciclo con entregas verificadas.']}
        variant="secondary"
      />
      <Plans />
      <About />

      <section className="final-cta" id="contacto">
        <div className="final-cta__content">
          <span className="eyebrow">Únete al cambio</span>
          <h2>Comienza a rescatar excedentes hoy mismo</h2>
          <p>
            Kalitán está listo para conectar tu negocio, tu equipo de voluntarios y tu comunidad en una sola plataforma.
          </p>
        </div>
        <div className="final-cta__actions">
          <Button variant="primary" onClick={openBusinessAffiliation}>Afiliar mi negocio</Button>
          <Button variant="secondary" onClick={openVolunteerRegistration}>Ser voluntario</Button>
        </div>
      </section>
    </div>
  )
}
