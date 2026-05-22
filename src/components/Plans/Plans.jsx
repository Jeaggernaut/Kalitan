import './Plans.css'
import Card from '../Card/Card'
import { planOptions } from '../../utils/content'

export default function Plans() {
  return (
    <section className="plans" id="planes">
      <div className="section-header">
        <span className="eyebrow">Planes</span>
        <h2>Una experiencia adaptada a cada usuario</h2>
        <p>
          Opciones claras para negocios, voluntarios y beneficiarios. Sin costos ocultos,
          solo herramientas diseñadas para generar impacto.
        </p>
      </div>
      <div className="plans__grid">
        {planOptions.map((plan) => (
          <Card key={plan.name} className="plan-card">
            <h3>{plan.name}</h3>
            <p className="plan-card__price">{plan.price}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  )
}
