import './Hero.css'
import Button from '../Button/Button'
import heroImage from '../../assets/Familia.png'

const heroHighlights = [
  {
    icon: '↻',
    title: 'Menos desperdicio',
    text: 'Rescatamos alimentos que aún pueden aprovecharse.',
  },
  {
    icon: '♧',
    title: 'Más impacto',
    text: 'Conectamos a quienes quieren ayudar con quienes lo necesitan.',
  },
  {
    icon: '▥',
    title: 'Optimización',
    text: 'Mejoramos rutas, tiempos y recursos en cada entrega.',
  },
  {
    icon: '▣',
    title: 'Transparencia',
    text: 'Seguimiento claro de cada donación y su impacto real.',
  },
]

export default function Hero({ onBusinessClick, onVolunteerClick }) {
  return (
    <section className="hero" id="inicio">
      <div className="hero__content">
        <span className="hero__eyebrow">
          <span>♧</span>
          Transformando excedentes en bienestar social
        </span>

        <h1>Rescatamos comida, conectamos comunidades<span>.</span></h1>
        <p>
          Kalitán une negocios, voluntarios y beneficiarios para reducir el desperdicio,
          optimizar entregas y cerrar ciclos sociales en Poza Rica.
        </p>

        <div className="hero__actions">
          <Button variant="primary" onClick={onBusinessClick}>
            <span className="hero__button-icon">⌂</span>
            Afiliar mi negocio
            <span aria-hidden="true">→</span>
          </Button>
          <Button variant="ghost" onClick={onVolunteerClick}>
            <span className="hero__button-icon">♡</span>
            Ser voluntario
          </Button>
        </div>

        <div className="hero__highlights" aria-label="Beneficios principales">
          {heroHighlights.map((item) => (
            <article className="hero__highlight" key={item.title}>
              <span>{item.icon}</span>
              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="hero__proof">
          <div className="hero__avatars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <p><strong>+1,400 negocios</strong> ya forman parte del cambio</p>
        </div>
      </div>

      <div className="hero__image">
        <div className="hero__visual">
          <img src={heroImage} alt="Personas recibiendo una caja con alimentos rescatados" />
          <div className="hero__visual-card">
            <span>✓</span>
            <div>
              <p>Tejemos una red local de rescate, entregas y seguimiento transparente.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
