import { motion } from 'framer-motion'
import { Cloud, Leaf, PackageCheck, Users } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { impactMonthly, impactSummary } from '../mock/volunteerMockData'

const metrics = [
  { label: 'Rescates completados', value: impactSummary.rescuesCompleted, icon: PackageCheck, tone: 'green', suffix: 'rescates' },
  { label: 'Personas beneficiadas', value: impactSummary.people, icon: Users, tone: 'purple', suffix: 'personas' },
  { label: 'Alimentos rescatados', value: `${impactSummary.foodKg} kg`, icon: Leaf, tone: 'yellow', suffix: '' },
  { label: 'CO₂ evitado', value: `${impactSummary.co2Kg} kg`, icon: Cloud, tone: 'blue', suffix: '' },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="volunteer-chart-tooltip">
      <p><strong>{label}</strong></p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38 } },
}

export default function ImpactPage() {
  return (
    <motion.div
      className="vpage"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38 }}
    >
      <div className="vpage__header">
        <div>
          <h2 className="vpage__title">Mi impacto</h2>
          <p className="vpage__subtitle">Tu contribución al ecosistema Kalitán</p>
        </div>
      </div>

      <motion.div
        className="volunteer-dashboard__metrics"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      >
        {metrics.map((m) => {
          const Icon = m.icon
          return (
            <motion.article
              key={m.label}
              className={`volunteer-metric-card volunteer-metric-card--${m.tone}`}
              variants={itemVariants}
            >
              <div className="volunteer-metric-card__icon">
                <Icon size={24} />
              </div>
              <div>
                <p>{m.label}</p>
                <strong>{m.value}</strong>
              </div>
            </motion.article>
          )
        })}
      </motion.div>

      <div className="vimpact-layout">
        <motion.div
          className="volunteer-panel vimpact-chart-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.42 }}
        >
          <div className="volunteer-panel__header">
            <div>
              <h3>Rescates por mes</h3>
              <p>Historial de actividad mensual</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={impactMonthly} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,255,190,0.08)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--volunteer-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--volunteer-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(53,226,126,0.06)' }} />
              <Legend wrapperStyle={{ color: 'var(--volunteer-muted)', fontSize: 12 }} />
              <Bar dataKey="rescues" name="Rescates" radius={[6, 6, 0, 0]} maxBarSize={28}>
                {impactMonthly.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i === impactMonthly.length - 1 ? '#35e27e' : 'rgba(53,226,126,0.32)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="volunteer-panel vimpact-chart-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.42 }}
        >
          <div className="volunteer-panel__header">
            <div>
              <h3>Alimentos rescatados (kg)</h3>
              <p>Kg de alimentos por mes</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={impactMonthly} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,255,190,0.08)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--volunteer-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--volunteer-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(234,179,8,0.06)' }} />
              <Legend wrapperStyle={{ color: 'var(--volunteer-muted)', fontSize: 12 }} />
              <Bar dataKey="food" name="Alimentos (kg)" radius={[6, 6, 0, 0]} maxBarSize={28}>
                {impactMonthly.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i === impactMonthly.length - 1 ? '#eab308' : 'rgba(234,179,8,0.32)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="volunteer-panel vimpact-chart-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.42 }}
        >
          <div className="volunteer-panel__header">
            <div>
              <h3>Personas beneficiadas</h3>
              <p>Impacto en la comunidad por mes</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={impactMonthly} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,255,190,0.08)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--volunteer-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--volunteer-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139,92,246,0.06)' }} />
              <Legend wrapperStyle={{ color: 'var(--volunteer-muted)', fontSize: 12 }} />
              <Bar dataKey="people" name="Personas" radius={[6, 6, 0, 0]} maxBarSize={28}>
                {impactMonthly.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i === impactMonthly.length - 1 ? '#8b5cf6' : 'rgba(139,92,246,0.32)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  )
}
