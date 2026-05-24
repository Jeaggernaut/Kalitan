import { Headphones, Phone } from 'lucide-react'

export default function HelpCard() {
  return (
    <section className="beneficiary-help-card">
      <div>
        <h2>Necesitas ayuda?</h2>
        <p>Estamos aqui para apoyarte con tus solicitudes y entregas.</p>
        <button type="button">
          <Phone size={17} />
          Contactar
        </button>
      </div>
      <span aria-hidden="true"><Headphones size={54} /></span>
    </section>
  )
}
