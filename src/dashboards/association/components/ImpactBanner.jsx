import { ArrowRight, HeartHandshake, Leaf } from 'lucide-react'

export default function ImpactBanner() {
  return (
    <section className="association-panel association-impact-banner">
      <div className="association-impact-banner__visual" aria-hidden="true">
        <Leaf size={34} />
      </div>
      <div>
        <span>Impacto humano</span>
        <h2>Cada alimento recibido transforma vidas.</h2>
        <p>
          Kalitán ayuda a tu asociación a coordinar recepciones, validar entregas y documentar el impacto social
          con trazabilidad clara para donantes y beneficiarios.
        </p>
      </div>
      <button type="button">
        <HeartHandshake size={18} />
        Ver reporte completo
        <ArrowRight size={18} />
      </button>
    </section>
  )
}
