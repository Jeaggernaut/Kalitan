import { Cloud, Heart, Leaf, Users } from 'lucide-react'
import { associationImpact } from '../mock/associationMockData'

export default function BeneficiaryStats() {
  const stats = [
    { label: 'Personas atendidas', value: associationImpact.people, icon: Users },
    { label: 'Alimentos recibidos', value: `${associationImpact.foodKg} kg`, icon: Leaf },
    { label: 'CO₂ evitado', value: `${associationImpact.co2Kg} kg`, icon: Cloud },
    { label: 'Donaciones recibidas', value: associationImpact.donations, icon: Heart },
  ]

  return (
    <section className="association-panel association-impact-stats">
      <div className="association-panel__header">
        <div>
          <h2>Impacto generado este mes</h2>
          <p>Resumen operativo para reportes internos y aliados donantes.</p>
        </div>
      </div>
      <div className="association-impact-stats__grid">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <article key={stat.label}>
              <span><Icon size={22} /></span>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
