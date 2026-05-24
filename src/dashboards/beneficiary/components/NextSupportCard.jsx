import { ArrowRight, CalendarDays, MapPin, PackageCheck } from 'lucide-react'
import { nextSupport } from '../mock/beneficiaryMockData'

export default function NextSupportCard() {
  return (
    <section className="beneficiary-next-card">
      <div className="beneficiary-next-card__content">
        <span className="beneficiary-next-card__icon">
          <PackageCheck size={30} />
        </span>
        <p>Tu proximo apoyo</p>
        <h2>{nextSupport.business}</h2>
        <strong>{nextSupport.food}</strong>
        <ul>
          <li><CalendarDays size={18} /> {nextSupport.dateTime}</li>
          <li><MapPin size={18} /> {nextSupport.deliveryPoint}</li>
        </ul>
        <span className="beneficiary-status is-moving">{nextSupport.status}</span>
      </div>
      <div className="beneficiary-next-card__visual">
        <img src={nextSupport.image} alt={nextSupport.food} />
        <button type="button">
          Ver detalles
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  )
}
