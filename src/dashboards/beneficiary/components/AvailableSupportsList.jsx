import { ArrowRight } from 'lucide-react'
import SupportCard from './SupportCard'
import { availableSupports } from '../mock/beneficiaryMockData'

export default function AvailableSupportsList() {
  return (
    <section className="beneficiary-panel">
      <div className="beneficiary-panel__header">
        <div>
          <h2>Apoyos disponibles para ti</h2>
          <p>Opciones cercanas y faciles de solicitar.</p>
        </div>
        <button type="button">Ver todos <ArrowRight size={17} /></button>
      </div>
      <div className="beneficiary-supports-grid">
        {availableSupports.map((support) => (
          <SupportCard support={support} key={support.id} />
        ))}
      </div>
    </section>
  )
}
