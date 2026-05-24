import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { receivedFoodData } from '../mock/associationMockData'

export default function ImpactChart() {
  return (
    <section className="association-panel association-chart-panel">
      <div className="association-panel__header">
        <div>
          <h2>Alimentos recibidos</h2>
          <p>Últimos 6 meses</p>
        </div>
      </div>
      <div className="association-bar-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={receivedFoodData} margin={{ top: 8, right: 10, bottom: 0, left: -22 }}>
            <CartesianGrid stroke="var(--association-grid)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--association-muted)" tickLine={false} axisLine={false} />
            <YAxis stroke="var(--association-muted)" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: 'var(--association-tooltip)',
                border: '1px solid var(--association-border)',
                borderRadius: 14,
                color: 'var(--association-text)',
              }}
            />
            <Bar dataKey="kg" radius={[10, 10, 0, 0]} fill="var(--association-green)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
