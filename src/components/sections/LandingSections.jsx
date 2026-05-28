import { motion } from 'framer-motion'
import heroImage from '../../assets/images/hero-community.png'
import dashboardImage from '../../assets/images/business-dashboard.png'
import volunteersImage from '../../assets/images/volunteers.png'
import { benefits, howItWorks, impactCards, metrics, plans, quickStats } from '../../utils/landingContent'
import {
  blurReveal,
  containerVariants,
  heroTitleVariants,
  revealItemVariants,
  scaleReveal,
  slideFromLeft,
  slideFromRight,
} from '../animations/revealVariants'
import Button from '../ui/Button'
import './LandingSections.css'

/* ─── Shared viewport config ─────────────────────────────────────── */
const vp = { once: true, amount: 0.16, margin: '0px 0px -60px 0px' }

/* ─── Hero ───────────────────────────────────────────────────────── */

export function HeroSection() {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-section__inner">

        {/* Content — staggered children */}
        <motion.div
          className="hero-section__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="eyebrow" variants={blurReveal}>
            Economía circular alimentaria
          </motion.span>
          <motion.h1 variants={heroTitleVariants}>
            Rescata excedentes, mide impacto y conecta comunidades.
          </motion.h1>
          <motion.p variants={revealItemVariants}>
            Kalitán ayuda a negocios de alimentos a publicar excedentes, coordinar rescates y
            generar trazabilidad social con una suscripción accesible.
          </motion.p>
          <motion.div className="hero-section__actions" variants={revealItemVariants}>
            <Button variant="primary" className="has-shine">Afiliar mi negocio</Button>
            <Button variant="secondary">Conocer la plataforma</Button>
          </motion.div>
          <motion.div
            className="hero-section__stats"
            aria-label="Datos rápidos"
            variants={containerVariants}
          >
            {quickStats.map((stat) => (
              <motion.article variants={scaleReveal} key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>

        {/* Visual — slides from right */}
        <motion.div
          className="hero-section__visual"
          variants={slideFromRight}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <span className="hero-visual-shape hero-visual-shape--ring" />
          <span className="hero-visual-shape hero-visual-shape--pill" />
          <div className="hero-image-card hero-image-float">
            <img src={heroImage} alt="Personas recibiendo alimentos rescatados" />
          </div>
          <motion.div
            className="hero-badge hero-badge--top"
            initial={{ opacity: 0, x: -20, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <strong>Gratis</strong>
            <span>para voluntarios y beneficiarios</span>
          </motion.div>
          <motion.div
            className="hero-badge hero-badge--bottom"
            initial={{ opacity: 0, x: 20, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <strong>$150 MXN</strong>
            <span>plan mensual para negocios</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

/* ─── How it works ───────────────────────────────────────────────── */

export function HowItWorksSection() {
  return (
    <section className="section process-section" id="como-funciona">
      <motion.div
        className="section-header"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        <motion.span className="eyebrow" variants={blurReveal}>Cómo funciona</motion.span>
        <motion.h2 className="section-title" variants={heroTitleVariants}>
          Una operación simple para un problema grande.
        </motion.h2>
        <motion.p className="section-description" variants={revealItemVariants}>
          La plataforma ordena publicación, rescate, entrega y reporte en un flujo claro para todos los roles.
        </motion.p>
      </motion.div>

      <motion.div
        className="process-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        {howItWorks.map((item) => (
          <motion.article
            className="process-card"
            variants={revealItemVariants}
            key={item.step}
            whileHover={{ y: -6, transition: { duration: 0.22 } }}
          >
            <span>{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

/* ─── Benefits ───────────────────────────────────────────────────── */

export function BenefitsSection() {
  return (
    <section className="section benefits-section" id="beneficios">
      <motion.div
        className="benefits-section__media image-glow-wrap"
        variants={slideFromLeft}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        <img
          src={dashboardImage}
          alt="Panel digital para gestión de excedentes"
          loading="lazy"
          className="image-float"
        />
      </motion.div>

      <motion.div
        className="benefits-section__content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        <motion.span className="eyebrow" variants={blurReveal}>Beneficios</motion.span>
        <motion.h2 className="section-title" variants={heroTitleVariants}>
          Herramientas de gestión para negocios con impacto real.
        </motion.h2>
        <motion.p className="section-description" variants={revealItemVariants}>
          Kalitán combina experiencia SaaS con operación social: menos hojas de cálculo,
          más visibilidad y decisiones más rápidas.
        </motion.p>
        <motion.div className="benefit-list" variants={containerVariants}>
          {benefits.map((benefit) => (
            <motion.div
              className="benefit-item"
              variants={revealItemVariants}
              key={benefit}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
            >
              <span aria-hidden="true">✓</span>
              <p>{benefit}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─── Impact ─────────────────────────────────────────────────────── */

export function ImpactSection() {
  return (
    <section className="section impact-section" id="impacto">
      <motion.div
        className="section-header"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        <motion.span className="eyebrow" variants={blurReveal}>Impacto social</motion.span>
        <motion.h2 className="section-title" variants={heroTitleVariants}>
          Cada excedente rescatado cuenta una historia medible.
        </motion.h2>
      </motion.div>

      <div className="impact-layout">
        <motion.div
          className="impact-layout__image image-glow-wrap"
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <img
            src={volunteersImage}
            alt="Voluntarios organizando alimentos"
            loading="lazy"
            className="image-float"
          />
        </motion.div>

        <motion.div
          className="impact-cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          {impactCards.map((card) => (
            <motion.article
              className="impact-card"
              variants={scaleReveal}
              key={card.value}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
            >
              <h3 className="impact-number">{card.value}</h3>
              <p>{card.label}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Metrics ────────────────────────────────────────────────────── */

export function MetricsSection() {
  return (
    <section className="metrics-section" aria-labelledby="metricas-title">
      <div className="metrics-section__inner">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <motion.span className="eyebrow" variants={blurReveal}>Métricas</motion.span>
          <motion.h2 id="metricas-title" variants={heroTitleVariants}>
            Diseñado para operar localmente y escalar después.
          </motion.h2>
        </motion.div>

        <motion.div
          className="metrics-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          {metrics.map((metric) => (
            <motion.article
              variants={scaleReveal}
              key={metric.label}
              whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
            >
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Plans ──────────────────────────────────────────────────────── */

export function PlansSection() {
  return (
    <section className="section plans-section" id="planes">
      <motion.div
        className="section-header"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        <motion.span className="eyebrow" variants={blurReveal}>Planes</motion.span>
        <motion.h2 className="section-title" variants={heroTitleVariants}>
          Un modelo justo: paga quien monetiza, participa quien ayuda.
        </motion.h2>
        <motion.p className="section-description" variants={revealItemVariants}>
          Negocios afiliados financian la operación; voluntarios, asociaciones y beneficiarios acceden gratis.
        </motion.p>
      </motion.div>

      <motion.div
        className="plans-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        {plans.map((plan) => (
          <motion.article
            className={`plan-card ${plan.featured ? 'plan-card--featured' : ''}`}
            variants={revealItemVariants}
            key={plan.name}
            whileHover={{
              y: -6,
              transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
            }}
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
      </motion.div>
    </section>
  )
}

/* ─── Final CTA ──────────────────────────────────────────────────── */

export function FinalCtaSection() {
  return (
    <section className="final-cta-section">
      <motion.div
        className="final-cta-section__inner cta-gradient-animated"
        variants={scaleReveal}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        <motion.span className="eyebrow" variants={blurReveal}>Listo para empezar</motion.span>
        <motion.h2 variants={heroTitleVariants}>
          Convierte excedentes en impacto social verificable.
        </motion.h2>
        <motion.p variants={revealItemVariants}>
          Prepara tu negocio para publicar donaciones, coordinar entregas y comunicar resultados con claridad.
        </motion.p>
        <motion.div variants={revealItemVariants}>
          <Button variant="primary" className="has-shine">Afiliar negocio</Button>
          <Button variant="ghost">Hablar con Kalitán</Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
