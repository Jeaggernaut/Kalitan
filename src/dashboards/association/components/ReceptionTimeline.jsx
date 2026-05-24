import { receptionTimeline } from '../mock/associationMockData'

export default function ReceptionTimeline() {
  return (
    <section className="association-panel association-timeline-panel">
      <h2>Trazabilidad de recepción</h2>
      <div className="association-timeline">
        {receptionTimeline.map((step) => {
          const Icon = step.icon
          return (
            <article className={step.active ? 'is-active' : ''} key={step.title}>
              <div className="association-timeline__icon">
                <Icon size={24} />
                <span>✓</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <small>{step.time}</small>
            </article>
          )
        })}
      </div>
    </section>
  )
}
