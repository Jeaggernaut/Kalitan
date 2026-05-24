import { LogOut, Sprout, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { beneficiaryNavigation } from '../mock/beneficiaryMockData'

export default function BeneficiarySidebar({ open, onClose, onLogout, profile }) {
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
            <strong>Kalitán</strong>
            <small>Economía circular</small>
          </div>
          <button className="beneficiary-sidebar__close" type="button" aria-label="Cerrar menu" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="beneficiary-sidebar__nav" aria-label="Navegacion beneficiario">
          {beneficiaryNavigation.map((item) => {
            const Icon = item.icon
            return (
              <NavLink key={item.path} to={`/dashboard/beneficiary/${item.path}`} onClick={onClose} className={({ isActive }) => (isActive ? 'is-active' : '')}>
                <Icon size={20} />
                {item.label}
              </NavLink>
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
          <span>{profile.initials}</span>
          <div>
            <strong>{profile.name}</strong>
            <small>{profile.association}</small>
          </div>
        </div>

        <button className="beneficiary-sidebar__logout" type="button" onClick={onLogout}>
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </aside>
    </>
  )
}
