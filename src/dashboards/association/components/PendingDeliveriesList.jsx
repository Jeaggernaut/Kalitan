import { ArrowRight, MapPin } from 'lucide-react'
import { pendingDeliveries } from '../mock/associationMockData'

const statusClass = {
  'En camino': 'is-route',
  Programado: 'is-scheduled',
  Recibido: 'is-received',
}

export default function PendingDeliveriesList() {
  return (
    <section className="association-panel association-deliveries">
      <div className="association-panel__header">
        <div>
          <h2>Entregas pendientes</h2>
          <p>Alimentos que están en camino a nuestra asociación.</p>
        </div>
        <button type="button">Ver todas</button>
      </div>

      <div className="association-deliveries__list">
        {pendingDeliveries.map((delivery) => (
          <article key={delivery.id}>
            <img src={delivery.image} alt={delivery.food} loading="lazy" />
            <div>
              <h3>{delivery.business}</h3>
              <p>{delivery.food}</p>
              <small><MapPin size={14} /> {delivery.dateTime}</small>
            </div>
            <span className={statusClass[delivery.status]}>{delivery.status}</span>
            <div className="association-deliveries__amount">
              <strong>{delivery.amount.split(' ')[0]}</strong>
              <small>{delivery.amount.split(' ').slice(1).join(' ')}</small>
            </div>
            <button type="button">
              Ver detalles
              <ArrowRight size={17} />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
