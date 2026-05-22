export default function AuthIllustration() {
  return (
    <aside className="auth-visual" aria-label="Beneficios de Kalitán">
      <div className="auth-visual__orb auth-visual__orb--one" />
      <div className="auth-visual__orb auth-visual__orb--two" />
      <div className="auth-visual__content">
        <span className="auth-visual__badge">Plataforma circular</span>
        <h2>Gestiona excedentes con trazabilidad y reportes de impacto.</h2>
        <p>
          Conecta negocios, voluntarios, asociaciones y beneficiarios en una operación clara,
          medible y preparada para crecer.
        </p>
        <div className="auth-visual__stats">
          <article>
            <strong>$150 MXN</strong>
            <span>plan mensual para negocios</span>
          </article>
          <article>
            <strong>Gratis</strong>
            <span>para comunidad y aliados</span>
          </article>
        </div>
      </div>
    </aside>
  )
}
