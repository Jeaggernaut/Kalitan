import { Leaf, LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { volunteerNavigation, volunteerProfile } from '../mock/volunteerMockData'

const groups = [
  { title: '', items: volunteerNavigation.slice(0, 1) },
  { title: 'Mi actividad', items: volunteerNavigation.slice(1, 5) },
  { title: 'Impacto', items: volunteerNavigation.slice(5, 7) },
  { title: 'Cuenta', items: volunteerNavigation.slice(7) },
]

export default function VolunteerSidebar({ open, onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/auth?mode=login', { replace: true })
  }

  return (
    <>
      <button
        className={`volunteer-sidebar-backdrop ${open ? 'is-open' : ''}`}
        type="button"
        aria-label="Cerrar menú"
        onClick={onClose}
      />
      <aside className={`volunteer-sidebar ${open ? 'is-open' : ''}`}>
        <div className="volunteer-sidebar__brand">
          <span><Leaf size={26} /></span>
          <div>
            <strong>Kalitán</strong>
            <small>Economía circular</small>
          </div>
        </div>

        <nav className="volunteer-sidebar__nav" aria-label="Dashboard voluntario">
          {groups.map((group) => (
            <div className="volunteer-sidebar__group" key={group.title || 'main'}>
              {group.title && <p>{group.title}</p>}
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    className={({ isActive }) => `volunteer-sidebar__link${isActive ? ' is-active' : ''}`}
                    onClick={onClose}
                  >
                    <Icon size={19} />
                    <span>{item.label}</span>
                  </NavLink>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="volunteer-sidebar__footer">
          <div className="volunteer-sidebar__profile">
            <div className="volunteer-avatar">{volunteerProfile.initials}</div>
            <div>
              <strong>{volunteerProfile.name}</strong>
              <span>{volunteerProfile.status}</span>
            </div>
          </div>

          <button className="volunteer-sidebar__logout" type="button" onClick={handleLogout}>
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  )
}
