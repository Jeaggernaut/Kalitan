import { Leaf, LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { associationNavigation, associationProfile } from '../mock/associationMockData'

export default function AssociationSidebar({ open, onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    localStorage.clear()
    navigate('/auth?mode=login', { replace: true })
  }

  return (
    <>
      <button className={`association-sidebar-backdrop ${open ? 'is-open' : ''}`} type="button" aria-label="Cerrar menú" onClick={onClose} />
      <aside className={`association-sidebar ${open ? 'is-open' : ''}`}>
        <div className="association-sidebar__brand">
          <span><Leaf size={28} /></span>
          <div>
            <strong>Kalitán</strong>
            <small>Asociación receptora</small>
          </div>
        </div>

        <nav className="association-sidebar__nav" aria-label="Dashboard asociación">
          {associationNavigation.map((item) => {
            const Icon = item.icon
            return (
              <NavLink className={({ isActive }) => (isActive ? 'is-active' : '')} to={item.path} key={item.label} onClick={onClose}>
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="association-sidebar__mini-profile">
          <img src={associationProfile.logo} alt="" />
          <div>
            <strong>{associationProfile.shortName}</strong>
            <span>{associationProfile.type}</span>
          </div>
        </div>

        <button className="association-sidebar__logout" type="button" onClick={handleLogout}>
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </aside>
    </>
  )
}
