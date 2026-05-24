import { CalendarDays, MapPin } from 'lucide-react'

export default function SupportCard({ support }) {
  return (
    <article className="beneficiary-support-card">
      <div className="beneficiary-support-card__media">
        <img src={support.image} alt={support.food} />
        <span className="beneficiary-status is-available">{support.status}</span>
      </div>
      <h3>{support.business}</h3>
      <p>{support.food}</p>
      <ul>
        <li><CalendarDays size={16} /> {support.schedule}</li>
        <li><MapPin size={16} /> {support.deliveryPoint}</li>
      </ul>
      <button type="button">Solicitar apoyo</button>
    </article>
  )
}
