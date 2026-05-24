import DashboardSection from './DashboardSection'
import { traceabilitySteps } from '../mock/businessMockData'

export default function TraceabilityTimeline() {
  return (
    <DashboardSection title="Trazabilidad reciente" subtitle="Sigue el recorrido de tus donaciones" className="business-timeline-section">
      <div className="business-timeline">
        {traceabilitySteps.map((step) => {
          const Icon = step.icon
          return (
            <article key={step.title}>
              <div className="business-timeline__icon">
                <Icon size={25} />
                <span>✓</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <small>{step.time}</small>
            </article>
          )
        })}
      </div>
    </DashboardSection>
  )
}
