import './Hero.css'
import Button from '../Button/Button'
import heroImage from '../../assets/Familia.png'

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
