import { Bell, CalendarDays, ChevronDown, Menu } from 'lucide-react'
import ThemeToggle from '../../../components/ui/ThemeToggle'
import { associationProfile } from '../mock/associationMockData'

export default function AssociationTopbar({ onMenuClick }) {
  return (
    <header className="association-topbar">
      <button className="association-topbar__menu" type="button" aria-label="Abrir menú" onClick={onMenuClick}>
        <Menu size={22} />
      </button>

      <div className="association-topbar__title">
        <span>¡Bienvenidos!</span>
        <h1>{associationProfile.name}</h1>
        <p>Recibimos alimentos, transformamos vidas.</p>
      </div>

      <div className="association-topbar__actions">
        <button className="association-topbar__schedule" type="button">
          <CalendarDays size={18} />
          Agendar recepción
        </button>
        <ThemeToggle />
        <button className="association-topbar__icon" type="button" aria-label="Notificaciones">
          <Bell size={21} />
          <span>3</span>
        </button>
        <button className="association-topbar__profile" type="button">
          <span>{associationProfile.initials}</span>
          <div>
            <strong>{associationProfile.shortName}</strong>
            <small>{associationProfile.type}</small>
          </div>
          <ChevronDown size={18} />
        </button>
      </div>
    </header>
  )
}
