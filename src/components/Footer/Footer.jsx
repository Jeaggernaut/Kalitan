import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>Kalitán</strong>
        <p>Economía circular para excedentes de comida.</p>
      </div>
      <div className="footer__links">
        <a href="#inicio">Inicio</a>
        <a href="#como-funciona">Cómo funciona</a>
        <a href="#impacto">Impacto</a>
      </div>
    </footer>
  )
}
