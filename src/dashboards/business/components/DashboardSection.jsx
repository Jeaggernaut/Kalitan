export default function DashboardSection({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`business-section ${className}`.trim()}>
      <div className="business-section__header">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
