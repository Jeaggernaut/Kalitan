import { Bell, CalendarDays, ChevronDown, LogOut, Menu, Settings, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../../../components/ui/ThemeToggle'
import { useAuth } from '../../../hooks/useAuth'
import { volunteerNotifications, volunteerProfile } from '../mock/volunteerMockData'

export default function VolunteerTopbar({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifsOpen, setNotifsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const notifsRef = useRef(null)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const unread = volunteerNotifications.filter((n) => !n.read).length

  useEffect(() => {
    function onClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false)
      if (notifsRef.current && !notifsRef.current.contains(e.target)) setNotifsOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/auth?mode=login', { replace: true })
  }

  const goto = (path) => {
    setDropdownOpen(false)
    navigate(path)
  }

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
        <button
          className="volunteer-topbar__availability"
          type="button"
          onClick={() => goto('/dashboard/volunteer/availability')}
        >
          <span />
          Disponibilidad
        </button>

        <ThemeToggle />

        <div className="volunteer-topbar__notifs-wrap" ref={notifsRef}>
          <button
            className="volunteer-topbar__icon"
            type="button"
            aria-label="Notificaciones"
            onClick={() => setNotifsOpen((prev) => !prev)}
          >
            <Bell size={21} />
            {unread > 0 && <span>{unread}</span>}
          </button>

          {notifsOpen && (
            <div className="volunteer-notifs-dropdown">
              <p className="volunteer-notifs-dropdown__title">Notificaciones</p>
              {volunteerNotifications.map((n) => (
                <div key={n.id} className={`volunteer-notifs-dropdown__item${n.read ? '' : ' is-unread'}`}>
                  <strong>{n.message}</strong>
                  <small>{n.time}</small>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="volunteer-topbar__profile-wrap" ref={dropdownRef}>
          <button
            className="volunteer-topbar__profile"
            type="button"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <span>{volunteerProfile.initials}</span>
            <div>
              <strong>{volunteerProfile.name}</strong>
              <small>{volunteerProfile.status}</small>
            </div>
            <ChevronDown size={18} className={dropdownOpen ? 'rotated' : ''} />
          </button>

          {dropdownOpen && (
            <div className="volunteer-profile-dropdown">
              <button type="button" onClick={() => goto('/dashboard/volunteer/profile')}>
                <User size={16} /> Mi perfil
              </button>
              <button type="button" onClick={() => goto('/dashboard/volunteer/availability')}>
                <CalendarDays size={16} /> Disponibilidad
              </button>
              <button type="button" onClick={() => goto('/dashboard/volunteer/settings')}>
                <Settings size={16} /> Configuración
              </button>
              <div className="volunteer-profile-dropdown__divider" />
              <button type="button" className="is-logout" onClick={handleLogout}>
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
