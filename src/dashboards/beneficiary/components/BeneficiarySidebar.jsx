import { LogOut, Sprout, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { beneficiaryNavigation, beneficiaryProfile } from '../mock/beneficiaryMockData'

export default function BeneficiarySidebar({ open, onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/auth?mode=login', { replace: true })
  }

  return (
    <>
      <button
        className={`beneficiary-sidebar-backdrop ${open ? 'is-open' : ''}`}
        type="button"
        aria-label="Cerrar menu"
        onClick={onClose}
      />
      <aside className={`beneficiary-sidebar ${open ? 'is-open' : ''}`}>
        <div className="beneficiary-sidebar__brand">
          <span><Sprout size={30} /></span>
          <div>
            <strong>Kalitan</strong>
            <small>Economia circular</small>
          </div>
          <button className="beneficiary-sidebar__close" type="button" aria-label="Cerrar menu" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="beneficiary-sidebar__nav" aria-label="Navegacion beneficiario">
          {beneficiaryNavigation.map((item) => {
            const Icon = item.icon
            return (
              <button className={item.active ? 'is-active' : ''} type="button" key={item.label}>
                <Icon size={20} />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="beneficiary-sidebar__community">
          <div aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <strong>Gracias por ser parte de esta comunidad.</strong>
          <p>Juntos transformamos vidas y reducimos desperdicio.</p>
        </div>

        <div className="beneficiary-sidebar__profile">
          <span>{beneficiaryProfile.initials}</span>
          <div>
            <strong>{beneficiaryProfile.name}</strong>
            <small>{beneficiaryProfile.association}</small>
          </div>
        </div>

        <button className="beneficiary-sidebar__logout" type="button" onClick={handleLogout}>
          <LogOut size={18} />
          Cerrar sesion
        </button>
      </aside>
    </>
  )
}
