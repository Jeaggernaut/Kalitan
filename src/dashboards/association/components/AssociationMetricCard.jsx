import { TrendingUp } from 'lucide-react'

export default function AssociationMetricCard({ metric }) {
  const Icon = metric.icon

  return (
    <article className={`association-metric-card association-metric-card--${metric.tone}`}>
      <div className="association-metric-card__icon">
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
