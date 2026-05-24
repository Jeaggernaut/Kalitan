import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { foodDistributionData } from '../mock/associationMockData'

const colors = ['#35e27e', '#84cc16', '#eab308', '#8b5cf6']

export default function FoodDistributionChart() {
  return (
    <section className="association-panel association-donut-panel">
      <div className="association-panel__header">
        <div>
          <h2>Tipos de alimentos recibidos</h2>
        </div>
      </div>
      <div className="association-donut">
        <ResponsiveContainer width="42%" height={170}>
          <PieChart>
            <Pie data={foodDistributionData} dataKey="value" innerRadius={48} outerRadius={72} paddingAngle={2} stroke="none">
              {foodDistributionData.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="association-donut__legend">
          {foodDistributionData.map((item, index) => (
            <p key={item.name}>
              <i style={{ background: colors[index] }} />
              <span>{item.name}</span>
              <strong>{item.percent} ({item.value} kg)</strong>
            </p>
          ))}
        </div>
      </div>
      <p className="association-donut__total">Total: <strong>1,248 kg</strong> este mes</p>
    </section>
  )
}
