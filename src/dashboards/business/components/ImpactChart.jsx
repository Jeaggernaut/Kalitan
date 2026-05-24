import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import DashboardSection from './DashboardSection'
import { impactData } from '../mock/businessMockData'

export default function ImpactChart() {
  return (
    <DashboardSection
      title="Resumen de impacto"
      subtitle="Personas beneficiadas en los últimos 6 meses"
      className="business-impact-chart"
      action={<button className="business-chip" type="button">Personas beneficiadas</button>}
    >
      <div className="business-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={impactData} margin={{ top: 12, right: 16, bottom: 4, left: -14 }}>
            <defs>
              <linearGradient id="impactGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.48} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--business-dashboard-grid)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--color-text-muted)" tickLine={false} axisLine={false} />
            <YAxis stroke="var(--color-text-muted)" tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: 'var(--business-dashboard-tooltip)',
                border: '1px solid var(--color-border)',
                borderRadius: 14,
                color: 'var(--color-text)',
              }}
            />
            <Area
              type="monotone"
              dataKey="people"
              stroke="var(--color-primary)"
              strokeWidth={3}
              fill="url(#impactGradient)"
              dot={{ r: 4, strokeWidth: 0, fill: 'var(--color-primary)' }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardSection>
  )
}
