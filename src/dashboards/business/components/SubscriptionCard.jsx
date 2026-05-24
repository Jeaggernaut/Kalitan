import { useNavigate } from 'react-router-dom'
import { useBusiness } from '../../../hooks/useBusiness'

export default function SubscriptionCard() {
  const { activeBusiness } = useBusiness()
  const navigate = useNavigate()
  const { subscription } = activeBusiness

  return (
    <article className="business-subscription-card">
      <div>
        <h2>Tu suscripción</h2>
        <span>{subscription.status}</span>
      </div>
      <p>{subscription.plan}</p>
      <strong>
        {subscription.price}
        <small>{subscription.period}</small>
      </strong>
      <p>Próximo pago: {subscription.nextPayment}</p>
      <button type="button" onClick={() => navigate('/dashboard/business/suscripcion')}>Gestionar suscripción</button>
    </article>
  )
}
