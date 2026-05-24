import { Heart, Leaf } from 'lucide-react'

export default function CommunityBanner() {
  return (
    <section className="beneficiary-community-banner">
      <div>
        <span><Heart size={20} /></span>
        <h2>Cada apoyo transforma vidas</h2>
        <p>Gracias por permitir que los alimentos lleguen a tu hogar y a tu familia.</p>
      </div>
      <div className="beneficiary-community-banner__visual" aria-hidden="true">
        <Leaf size={46} />
      </div>
    </section>
  )
}
