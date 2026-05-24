import { Bell, CalendarDays, ChevronDown, LogOut, Menu, UserRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import ThemeToggle from '../../../components/ui/ThemeToggle'
import { associationProfile } from '../mock/associationMockData'

export default function AssociationTopbar({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const profileRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setProfileOpen(false)
    await logout()
    localStorage.clear()
    navigate('/auth?mode=login', { replace: true })
  }

  return (
    <header className="association-topbar">
      <button className="association-topbar__menu" type="button" aria-label="Abrir menú" onClick={onMenuClick}>
        <Menu size={22} />
      </button>

      <div className="association-topbar__title">
        <span>Recepciones de hoy</span>
        <h1>{associationProfile.name}</h1>
        <p>Un panel claro para recibir, validar y organizar alimentos.</p>
      </div>

      <div className="association-topbar__actions">
        <button className="association-topbar__schedule" type="button" onClick={() => navigate('/dashboard/association/solicitudes')}>
          <CalendarDays size={18} />
          Nueva solicitud
        </button>
        <ThemeToggle />
        <button className="association-topbar__icon" type="button" aria-label="Notificaciones">
          <Bell size={21} />
          <span>3</span>
        </button>
        <div className="association-topbar__profile-wrap" ref={profileRef}>
          <button className="association-topbar__profile" type="button" onClick={() => setProfileOpen((v) => !v)}>
            <span>{associationProfile.initials}</span>
            <div>
              <strong>{associationProfile.shortName}</strong>
              <small>{associationProfile.type}</small>
            </div>
            <ChevronDown size={16} />
          </button>
          {profileOpen && (
            <div className="association-profile-dropdown">
              <button type="button" onClick={() => { setProfileOpen(false); navigate('/dashboard/association/perfil') }}>
                <UserRound size={16} /> Mi perfil
              </button>
              <button type="button" onClick={handleLogout}>
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
