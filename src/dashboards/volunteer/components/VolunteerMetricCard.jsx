import { TrendingUp } from 'lucide-react'

export default function VolunteerMetricCard({ metric }) {
  const Icon = metric.icon

  return (
    <article className={`volunteer-metric-card volunteer-metric-card--${metric.tone}`}>
      <div className="volunteer-metric-card__icon">
        <Icon size={24} />
      </div>
      <div>
        <p>{metric.label}</p>
        <strong>{metric.value}</strong>
      </div>
      <small>
        <TrendingUp size={15} />
        {metric.delta} vs mes anterior
      </small>
    </article>
  )
}
