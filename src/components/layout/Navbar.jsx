import { useEffect, useState } from 'react'
import logo from '../../assets/logos/kalitan-logo.png'
import { navLinks } from '../../utils/landingContent'
import Button from '../ui/Button'
import ThemeToggle from '../ui/ThemeToggle'
import './Navbar.css'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen)

    return () => document.body.classList.remove('menu-open')
  }, [isMenuOpen])

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace('#', ''))
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        rootMargin: '-28% 0px -58% 0px',
        threshold: [0.08, 0.18, 0.32, 0.5],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (event, href) => {
    event.preventDefault()

    if (href) {
      const sectionId = href.replace('#', '')
      const section = document.getElementById(sectionId)
      const navbarHeight = document.querySelector('.site-navbar')?.offsetHeight ?? 80

      if (section) {
        const targetTop = section.getBoundingClientRect().top + window.scrollY - navbarHeight - 10

        window.scrollTo({
          top: Math.max(targetTop, 0),
          behavior: 'smooth',
        })

        window.history.pushState(null, '', href)
        setActiveSection(sectionId)
      }
    }

    setIsMenuOpen(false)
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="site-navbar">
      <div className="site-navbar__inner">
        <a className="site-navbar__brand" href="#inicio" onClick={(event) => scrollToSection(event, '#inicio')}>
          <img src={logo} alt="Kalitán" />
          <span>
            <strong>Kalitán</strong>
            <small>Economía circular</small>
          </span>
        </a>

        <nav className={`site-navbar__nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className={activeSection === link.href.replace('#', '') ? 'is-active' : ''}
              href={link.href}
              aria-current={activeSection === link.href.replace('#', '') ? 'true' : undefined}
              onClick={(event) => scrollToSection(event, link.href)}
            >
              {link.label}
            </a>
          ))}

          <div className="site-navbar__mobile-actions">
            <ThemeToggle />
            <Button variant="primary" onClick={() => closeMenu()}>Afiliar negocio</Button>
          </div>
        </nav>

        <div className="site-navbar__actions">
          <ThemeToggle />
          <Button variant="secondary">Iniciar sesión</Button>
          <Button variant="primary">Afiliar negocio</Button>
        </div>

        <button
          className={`site-navbar__menu ${isMenuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
