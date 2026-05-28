import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { useScrollY } from '../../hooks/useScrollY'
import { navLinks } from '../../utils/content'
import Button from '../Button/Button'
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  const scrolled = useScrollY(30)

  return (
    <motion.header
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
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
            <a key={link.href} href={link.href} className="navbar__link">
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
    </motion.header>
  )
}
