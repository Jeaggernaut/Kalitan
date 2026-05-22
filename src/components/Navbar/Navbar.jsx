import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import Button from '../Button/Button'
import { navLinks } from '../../utils/content'
import logo from '../../assets/logo.png'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="navbar">
      <div className="navbar__container">
        <button className="navbar__brand" type="button" onClick={() => navigate('/')}>
          <img src={logo} alt="Kalitán logo" className="navbar__logo" />
          <div className="navbar__brand-text">
            <strong>Kalitán</strong>
            <p>Economía circular para alimentos</p>
          </div>
        </button>

        <nav className="navbar__links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <Button variant="primary" onClick={() => navigate('/login')}>
            <span className="navbar__login-icon" aria-hidden="true">↗</span>
            Iniciar sesión
          </Button>
        </div>
      </div>
    </header>
  )
}
