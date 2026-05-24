import { Bell, ChevronDown, Menu, Plus } from 'lucide-react'
import ThemeToggle from '../../../components/ui/ThemeToggle'
import { businessProfile } from '../mock/businessMockData'

export default function BusinessTopbar({ onMenuClick }) {
  return (
    <header className="business-topbar">
      <button className="business-topbar__menu" type="button" aria-label="Abrir menú" onClick={onMenuClick}>
        <Menu size={22} />
      </button>

      <div className="business-topbar__title">
        <span>¡Bienvenido!</span>
        <h1>{businessProfile.name}</h1>
        <p>Transformas excedentes en impacto real.</p>
      </div>

      <div className="business-topbar__actions">
        <button className="business-topbar__publish" type="button">
          Publicar excedente
          <Plus size={18} />
        </button>
        <ThemeToggle />
        <button className="business-topbar__icon" type="button" aria-label="Notificaciones">
          <Bell size={21} />
          <span>3</span>
        </button>
        <button className="business-topbar__profile" type="button">
          <span>{businessProfile.initials}</span>
          <div>
            <strong>{businessProfile.name}</strong>
            <small>{businessProfile.type}</small>
          </div>
          <ChevronDown size={18} />
        </button>
      </div>
    </header>
  )
}
