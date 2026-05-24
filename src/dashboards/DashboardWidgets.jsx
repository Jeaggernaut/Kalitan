export function DashboardHero({ eyebrow, title, description, action }) {
  return (
    <section className="dashboard-hero">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      {action && <div style={{ marginTop: '1rem' }}>{action}</div>}
    </section>
  )
}

export function MetricGrid({ metrics }) {
  return (
    <section className="dashboard-grid" aria-label="Métricas">
      {metrics.map((metric) => (
        <article className="dashboard-card" key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </article>
      ))}
    </section>
  )
}

export function DashboardPanel({ title, items }) {
  return (
    <section className="dashboard-panel">
      <h2>{title}</h2>
      <div className="dashboard-list">
        {items.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
