import './HowItWorks.css'
import { howItWorksSteps } from '../../utils/content'

const stepIcons = ['⌂', '▰', '♧']

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="como-funciona">
      <div className="how-it-works__header">
        <span className="eyebrow">¿Cómo funciona?</span>
        <h2>Un ciclo simple y transparente que conecta a todos</h2>
      </div>

      <div className="how-it-works__timeline">
        {howItWorksSteps.map((step, index) => (
          <article className="how-it-works__step" key={step.title}>
            <span className="how-it-works__icon">{stepIcons[index]}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
