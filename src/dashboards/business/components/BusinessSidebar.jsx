import { ArrowRight, Leaf, LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useBusiness } from '../../../hooks/useBusiness'
import { businessNavigation } from '../mock/businessMockData'

const groups = [
  { title: '', items: businessNavigation.slice(0, 1) },
  { title: 'Operación', items: businessNavigation.slice(1, 3) },
  { title: 'Análisis', items: businessNavigation.slice(3, 5) },
  { title: 'Cuenta', items: businessNavigation.slice(5) },
]

export default function BusinessSidebar({ open, onClose }) {
  const { logout } = useAuth()
  const { activeBusiness } = useBusiness()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    localStorage.clear()
    navigate('/auth?mode=login', { replace: true })
  }

  return (
    <>
      <button className={`business-sidebar-backdrop ${open ? 'is-open' : ''}`} type="button" aria-label="Cerrar menú" onClick={onClose} />
      <aside className={`business-sidebar ${open ? 'is-open' : ''}`}>
        <div className="business-sidebar__brand">
          <span><Leaf size={30} /></span>
          <div>
            <strong>Kalitán</strong>
            <small>Economía circular</small>
          </div>
        </div>

        <nav className="business-sidebar__nav" aria-label="Dashboard negocio">
          {groups.map((group) => (
            <div className="business-sidebar__group" key={group.title || 'main'}>
              {group.title && <p>{group.title}</p>}
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink className={({ isActive }) => (isActive ? 'is-active' : '')} to={item.path} key={item.label} onClick={onClose}>
                    <Icon size={19} />
                    <span>{item.label}</span>
                  </NavLink>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="business-sidebar__footer">
          <div className="business-sidebar__plan">
            <span>Plan actual</span>
            <div>
              <strong>{activeBusiness.subscription.plan.replace('Plan ', '')}</strong>
              <small>{activeBusiness.subscription.status}</small>
            </div>
            <p>{activeBusiness.subscription.price} {activeBusiness.subscription.period}</p>
            <button type="button" onClick={() => navigate('/dashboard/business/suscripcion')}>
              Renovar plan
              <ArrowRight size={17} />
            </button>
          </div>
          <button className="business-sidebar__logout" type="button" onClick={handleLogout}>
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  )
}
