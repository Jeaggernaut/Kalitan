import './ImpactSection.css'
import Card from '../Card/Card'
import { impactMetrics } from '../../utils/content'

export default function ImpactSection() {
  return (
    <section className="impact-section" id="impacto">
      <div className="impact-section__intro">
        <span className="eyebrow">Impacto local</span>
        <h2>Datos clave que muestran la oportunidad</h2>
        <p>
          Poza Rica tiene cientos de negocios con excedentes diarios. Kalitán activa una
          red colaborativa para convertir ese potencial en ayuda tangible.
        </p>
      </div>
      <div className="impact-section__cards">
        {impactMetrics.map((metric) => (
          <Card key={metric.label} className="impact-card">
            <strong>{metric.label}</strong>
            <p>{metric.sublabel}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
