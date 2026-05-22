import { navLinks } from '../../utils/landingContent'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <strong>Kalitán</strong>
          <p>Economía circular para rescatar excedentes de alimentos y convertirlos en bienestar social.</p>
        </div>
        <nav aria-label="Navegación secundaria">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
