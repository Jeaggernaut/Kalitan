import { Bell, Menu, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BusinessSwitcher from '../../../components/business/BusinessSwitcher'
import ThemeToggle from '../../../components/ui/ThemeToggle'
import { useBusiness } from '../../../hooks/useBusiness'

export default function BusinessTopbar({ onMenuClick }) {
  const { activeBusiness } = useBusiness()
  const navigate = useNavigate()

  return (
    <header className="business-topbar">
      <button className="business-topbar__menu" type="button" aria-label="Abrir menú" onClick={onMenuClick}>
        <Menu size={22} />
      </button>

      <div className="business-topbar__title">
        <span>¡Bienvenido!</span>
        <h1>{activeBusiness.profile.name}</h1>
        <p>Transformas excedentes en impacto real.</p>
      </div>

      <div className="business-topbar__actions">
        <button className="business-topbar__publish" type="button" onClick={() => navigate('/dashboard/business/excedentes')}>
          Publicar excedente
          <Plus size={18} />
        </button>
        <ThemeToggle />
        <button className="business-topbar__icon" type="button" aria-label="Notificaciones">
          <Bell size={21} />
          <span>3</span>
        </button>
        <BusinessSwitcher />
      </div>
    </header>
  )
}
