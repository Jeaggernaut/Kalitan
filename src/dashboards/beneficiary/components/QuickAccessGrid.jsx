import { ArrowRight } from 'lucide-react'
import { quickAccessItems } from '../mock/beneficiaryMockData'

export default function QuickAccessGrid() {
  return (
    <section className="beneficiary-panel">
      <div className="beneficiary-panel__header">
        <h2>Accesos rapidos</h2>
        <button type="button">Ver todos <ArrowRight size={17} /></button>
      </div>
      <div className="beneficiary-quick-grid">
        {quickAccessItems.map((item) => {
          const Icon = item.icon
          return (
            <button className={`beneficiary-quick-card is-${item.tone}`} type="button" key={item.label}>
              <span><Icon size={30} /></span>
              <strong>{item.label}</strong>
            </button>
          )
        })}
      </div>
    </section>
  )
}
