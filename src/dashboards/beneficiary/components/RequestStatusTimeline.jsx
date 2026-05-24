import { Check, Clock, PackageCheck, Truck } from 'lucide-react'
import { requestTimeline } from '../mock/beneficiaryMockData'

const icons = [PackageCheck, Clock, Truck, Check]

export default function RequestStatusTimeline() {
  return (
    <section className="beneficiary-panel beneficiary-request-timeline">
      <div className="beneficiary-panel__header">
        <h2>Estado de mis solicitudes</h2>
      </div>
      <div className="beneficiary-request-timeline__list">
        {requestTimeline.map((step, index) => {
          const Icon = icons[index]
          return (
            <article key={step.label}>
              <span className={`is-${step.tone}`}>
                <Icon size={20} />
              </span>
              <div>
                <h3>{step.label}</h3>
                <p>{step.detail}</p>
              </div>
              <strong className={`beneficiary-status is-${step.tone}`}>{step.status}</strong>
            </article>
          )
        })}
      </div>
      <button className="beneficiary-wide-button" type="button">
        Ver todas mis solicitudes
      </button>
    </section>
  )
}
