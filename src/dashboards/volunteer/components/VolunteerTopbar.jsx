import { Bell, ChevronDown, Menu } from 'lucide-react'
import ThemeToggle from '../../../components/ui/ThemeToggle'
import { volunteerProfile } from '../mock/volunteerMockData'

export default function VolunteerTopbar({ onMenuClick }) {
  return (
    <header className="volunteer-topbar">
      <button className="volunteer-topbar__menu" type="button" aria-label="Abrir menú" onClick={onMenuClick}>
        <Menu size={22} />
      </button>

      <div className="volunteer-topbar__title">
        <span>¡Hola, {volunteerProfile.firstName}!</span>
        <h1>Gracias por transformar vidas</h1>
        <p>Tu tiempo y compromiso hacen la diferencia.</p>
      </div>

      <div className="volunteer-topbar__actions">
        <button className="volunteer-topbar__availability" type="button">
          <span />
          Tengo disponibilidad
        </button>
        <ThemeToggle />
        <button className="volunteer-topbar__icon" type="button" aria-label="Notificaciones">
          <Bell size={21} />
          <span>3</span>
        </button>
        <button className="volunteer-topbar__profile" type="button">
          <span>{volunteerProfile.initials}</span>
          <div>
            <strong>{volunteerProfile.name}</strong>
            <small>{volunteerProfile.status}</small>
          </div>
          <ChevronDown size={18} />
        </button>
      </div>
    </header>
  )
}
