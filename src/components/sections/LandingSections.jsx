import { motion } from 'framer-motion'
import heroImage from '../../assets/images/hero-community.png'
import dashboardImage from '../../assets/images/business-dashboard.png'
import volunteersImage from '../../assets/images/volunteers.png'
import { benefits, howItWorks, impactCards, metrics, plans, quickStats } from '../../utils/landingContent'
import { revealItemVariants } from '../animations/revealVariants'
import Button from '../ui/Button'
import './LandingSections.css'

export function HeroSection() {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-section__inner">
        <div className="hero-section__content">
          <span className="eyebrow">Economía circular alimentaria</span>
          <h1>Rescata excedentes, mide impacto y conecta comunidades.</h1>
          <p>
            Kalitán ayuda a negocios de alimentos a publicar excedentes, coordinar rescates y
            generar trazabilidad social con una suscripción accesible.
          </p>
          <motion.div className="hero-section__actions" variants={revealItemVariants}>
            <Button variant="primary">Afiliar mi negocio</Button>
            <Button variant="secondary">Conocer la plataforma</Button>
          </motion.div>
          <div className="hero-section__stats" aria-label="Datos rápidos">
            {quickStats.map((stat) => (
              <motion.article variants={revealItemVariants} key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div className="hero-section__visual" variants={revealItemVariants}>
          <img src={heroImage} alt="Personas recibiendo alimentos rescatados" />
          <div className="hero-badge hero-badge--top">
            <strong>Gratis</strong>
            <span>para voluntarios y beneficiarios</span>
          </div>
          <div className="hero-badge hero-badge--bottom">
            <strong>$150 MXN</strong>
            <span>plan mensual para negocios</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function HowItWorksSection() {
  return (
    <section className="section process-section" id="como-funciona">
      <div className="section-header">
        <span className="eyebrow">Cómo funciona</span>
        <h2 className="section-title">Una operación simple para un problema grande.</h2>
        <p className="section-description">
          La plataforma ordena publicación, rescate, entrega y reporte en un flujo claro para todos los roles.
        </p>
      </div>
      <div className="process-grid">
        {howItWorks.map((item) => (
          <motion.article className="process-card" variants={revealItemVariants} key={item.step}>
            <span>{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function BenefitsSection() {
  return (
    <section className="section benefits-section" id="beneficios">
      <div className="benefits-section__media">
        <img src={dashboardImage} alt="Panel digital para gestión de excedentes" loading="lazy" />
      </div>
      <div className="benefits-section__content">
        <span className="eyebrow">Beneficios</span>
        <h2 className="section-title">Herramientas de gestión para negocios con impacto real.</h2>
        <p className="section-description">
          Kalitán combina experiencia SaaS con operación social: menos hojas de cálculo,
          más visibilidad y decisiones más rápidas.
        </p>
        <div className="benefit-list">
          {benefits.map((benefit) => (
            <motion.div className="benefit-item" variants={revealItemVariants} key={benefit}>
              <span aria-hidden="true">✓</span>
              <p>{benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ImpactSection() {
  return (
    <section className="section impact-section" id="impacto">
      <div className="section-header">
        <span className="eyebrow">Impacto social</span>
        <h2 className="section-title">Cada excedente rescatado cuenta una historia medible.</h2>
      </div>
      <div className="impact-layout">
        <div className="impact-layout__image">
          <img src={volunteersImage} alt="Voluntarios organizando alimentos" loading="lazy" />
        </div>
        <div className="impact-cards">
          {impactCards.map((card) => (
            <motion.article className="impact-card" variants={revealItemVariants} key={card.value}>
              <h3>{card.value}</h3>
              <p>{card.label}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MetricsSection() {
  return (
    <section className="metrics-section" aria-labelledby="metricas-title">
      <div className="metrics-section__inner">
        <div>
          <span className="eyebrow">Métricas</span>
          <h2 id="metricas-title">Diseñado para operar localmente y escalar después.</h2>
        </div>
        <div className="metrics-grid">
          {metrics.map((metric) => (
            <motion.article variants={revealItemVariants} key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PlansSection() {
  return (
    <section className="section plans-section" id="planes">
      <div className="section-header">
        <span className="eyebrow">Planes</span>
        <h2 className="section-title">Un modelo justo: paga quien monetiza, participa quien ayuda.</h2>
        <p className="section-description">
          Negocios afiliados financian la operación; voluntarios, asociaciones y beneficiarios acceden gratis.
        </p>
      </div>
      <div className="plans-grid">
        {plans.map((plan) => (
          <motion.article
            className={`plan-card ${plan.featured ? 'plan-card--featured' : ''}`}
            variants={revealItemVariants}
            key={plan.name}
          >
            {plan.featured && <span className="plan-card__tag">Recomendado</span>}
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="plan-card__price">
              <strong>{plan.price}</strong>
              <span>{plan.period}</span>
            </div>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function FinalCtaSection() {
  return (
    <section className="final-cta-section">
      <div className="final-cta-section__inner">
        <span className="eyebrow">Listo para empezar</span>
        <h2>Convierte excedentes en impacto social verificable.</h2>
        <p>Prepara tu negocio para publicar donaciones, coordinar entregas y comunicar resultados con claridad.</p>
        <div>
          <Button variant="primary">Afiliar negocio</Button>
          <Button variant="ghost">Hablar con Kalitán</Button>
        </div>
      </div>
    </section>
  )
}
