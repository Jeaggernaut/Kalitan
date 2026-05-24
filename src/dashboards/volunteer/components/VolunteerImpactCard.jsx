import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { Cloud, Leaf, Package, Users } from 'lucide-react'
import { impactChartData, impactSummary } from '../mock/volunteerMockData'

export default function VolunteerImpactCard() {
  return (
    <section className="volunteer-panel volunteer-impact-card">
      <div className="volunteer-panel__header">
        <h2>Mi impacto</h2>
        <button type="button">Este mes⌄</button>
      </div>

      <div className="volunteer-impact-card__content">
        <div className="volunteer-impact-card__chart">
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie
                data={impactChartData}
                dataKey="value"
                innerRadius={54}
                outerRadius={72}
                startAngle={210}
                endAngle={-30}
                stroke="none"
              >
                <Cell fill="var(--volunteer-green)" />
                <Cell fill="rgba(255,255,255,0.08)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Leaf size={38} />
        </div>

        <div className="volunteer-impact-card__stats">
          <p><Users size={18} /> <strong>{impactSummary.people}</strong> Personas beneficiadas</p>
          <p><Package size={18} /> <strong>{impactSummary.foodKg} kg</strong> Alimentos rescatados</p>
          <p><Cloud size={18} /> <strong>{impactSummary.co2Kg} kg</strong> CO₂ evitado</p>
        </div>
      </div>

      <button className="volunteer-impact-card__button" type="button">Ver mi impacto completo →</button>
    </section>
  )
}
