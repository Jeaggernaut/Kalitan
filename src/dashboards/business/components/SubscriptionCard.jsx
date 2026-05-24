import { subscription } from '../mock/businessMockData'

export default function SubscriptionCard() {
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
      <button type="button">Gestionar suscripción</button>
    </article>
  )
}
