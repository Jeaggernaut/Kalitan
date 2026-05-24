import { ArrowRight, MapPin } from 'lucide-react'

const statusClass = {
  Disponible: 'is-available',
  'En proceso': 'is-process',
  Completado: 'is-completed',
}

export default function RescueCard({ rescue }) {
  return (
    <article className="volunteer-rescue-card">
      <img src={rescue.image} alt={rescue.food} loading="lazy" />
      <div className="volunteer-rescue-card__body">
        <h3>{rescue.business}</h3>
        <p>{rescue.food}</p>
        <small><MapPin size={14} /> {rescue.distance} de distancia</small>
      </div>
      <div className="volunteer-rescue-card__schedule">
        <span className={statusClass[rescue.status]}>{rescue.schedule}</span>
      </div>
      <div className="volunteer-rescue-card__amount">
        <strong>{rescue.amount.split(' ')[0]}</strong>
        <span>{rescue.amount.split(' ').slice(1).join(' ')}</span>
      </div>
      <button type="button">
        Ver detalles
        <ArrowRight size={17} />
      </button>
    </article>
  )
}
