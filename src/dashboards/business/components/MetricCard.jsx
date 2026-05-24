import { TrendingUp } from 'lucide-react'

export default function MetricCard({ metric }) {
  const Icon = metric.icon

  return (
    <article className="business-metric-card">
      <div className="business-metric-card__icon">
        <Icon size={24} />
      </div>
      <div>
        <p>{metric.label}</p>
        <strong>{metric.value}</strong>
        <span>{metric.suffix}</span>
      </div>
      <small>
        <TrendingUp size={15} />
        {metric.delta} vs mes anterior
      </small>
    </article>
  )
}
