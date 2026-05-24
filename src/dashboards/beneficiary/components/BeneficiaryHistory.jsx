import { ArrowRight } from 'lucide-react'
import { supportHistory } from '../mock/beneficiaryMockData'

export default function BeneficiaryHistory() {
  return (
    <section className="beneficiary-panel beneficiary-history">
      <div className="beneficiary-panel__header">
        <h2>Historial reciente</h2>
        <button type="button">Ver todo</button>
      </div>
      <div className="beneficiary-history__list">
        {supportHistory.map((item) => (
          <article key={item.id}>
            <img src={item.image} alt={item.food} />
            <div>
              <h3>{item.business}</h3>
              <p>{item.food}</p>
              <small>{item.date}</small>
            </div>
            <span>{item.status}</span>
          </article>
        ))}
      </div>
      <button className="beneficiary-wide-button" type="button">
        Ver historial completo
        <ArrowRight size={18} />
      </button>
    </section>
  )
}
