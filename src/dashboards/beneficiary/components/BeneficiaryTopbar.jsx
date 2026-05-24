import { Bell, ChevronDown, LogOut, Menu, UserRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BeneficiaryTopbar({ onMenuClick, onLogout, profile, unreadCount }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="beneficiary-topbar">
      <button className="beneficiary-topbar__menu" type="button" aria-label="Abrir menú" onClick={onMenuClick}>
        <Menu size={22} />
      </button>
      <div>
        <span>Hola, {profile.name.split(' ')[0]}</span>
        <h1>Nos alegra tenerte aquí.</h1>
        <p>Hay apoyos disponibles para ti y tu familia.</p>
      </div>
      <div className="beneficiary-topbar__actions">
        <button className="beneficiary-topbar__notification" type="button" aria-label="Notificaciones" onClick={() => navigate('/dashboard/beneficiary/notifications')}>
          <Bell size={22} />
          {unreadCount > 0 && <span>{unreadCount}</span>}
        </button>
        <div className="beneficiary-topbar__profile-menu" ref={menuRef}>
          <button className="beneficiary-topbar__profile" type="button" onClick={() => setOpen((current) => !current)}>
            <span>{profile.initials}</span>
            <strong>{profile.name}</strong>
            <ChevronDown size={18} />
          </button>
          {open && (
            <div className="beneficiary-profile-dropdown">
              <button type="button" onClick={() => { setOpen(false); navigate('/dashboard/beneficiary/profile') }}>
                <UserRound size={17} />
                Mi perfil
              </button>
              <button type="button" onClick={() => { setOpen(false); onLogout() }}>
                <LogOut size={17} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
