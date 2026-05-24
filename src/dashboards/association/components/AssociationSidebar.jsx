import { Headphones, Star } from 'lucide-react'
import { associationNavigation, associationProfile } from '../mock/associationMockData'

const groups = [
  { title: '', items: associationNavigation.slice(0, 1) },
  { title: 'Gestión', items: associationNavigation.slice(1, 6) },
  { title: 'Impacto', items: associationNavigation.slice(6, 8) },
  { title: 'Asociación', items: associationNavigation.slice(8) },
]

export default function AssociationSidebar({ open, onClose }) {
  return (
    <>
      <button className={`association-sidebar-backdrop ${open ? 'is-open' : ''}`} type="button" aria-label="Cerrar menú" onClick={onClose} />
      <aside className={`association-sidebar ${open ? 'is-open' : ''}`}>
        <div className="association-sidebar__brand">
          <span>♧</span>
          <div>
            <strong>Kalitán</strong>
            <small>Economía circular</small>
          </div>
        </div>

        <nav className="association-sidebar__nav" aria-label="Dashboard asociación">
          {groups.map((group) => (
            <div className="association-sidebar__group" key={group.title || 'main'}>
              {group.title && <p>{group.title}</p>}
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <button className={item.active ? 'is-active' : ''} type="button" key={item.label}>
                    <Icon size={19} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="association-sidebar__profile">
          <div className="association-avatar">{associationProfile.initials}</div>
          <div>
            <strong>{associationProfile.name}</strong>
            <span>{associationProfile.type}</span>
            <small><Star size={14} fill="currentColor" /> {associationProfile.rating} ({associationProfile.reviews})</small>
          </div>
          <button type="button">Ver perfil</button>
        </div>

        <div className="association-sidebar__help">
          <Headphones size={20} />
          <div>
            <strong>¿Necesitas ayuda?</strong>
            <span>Contáctanos</span>
          </div>
        </div>
      </aside>
    </>
  )
}
