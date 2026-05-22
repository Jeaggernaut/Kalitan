import './Navbar.css'
import Button from '../Button/Button'
import { navLinks } from '../../utils/content'
import logo from '../../assets/logo.png'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <img src={logo} alt="Kalitán logo" className="navbar__logo" />
          <div className="navbar__brand-text">
            <strong>Kalitán</strong>
            <p>Economía circular para alimentos</p>
          </div>
        </div>

        <nav className="navbar__links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <Button variant="primary">Iniciar sesión</Button>
        </div>
      </div>
    </header>
  )
}
