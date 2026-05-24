import { Headphones, Star } from 'lucide-react'
import { volunteerNavigation, volunteerProfile } from '../mock/volunteerMockData'

const groups = [
  { title: '', items: volunteerNavigation.slice(0, 1) },
  { title: 'Mi actividad', items: volunteerNavigation.slice(1, 5) },
  { title: 'Impacto', items: volunteerNavigation.slice(5, 7) },
  { title: 'Perfil', items: volunteerNavigation.slice(7) },
]

export default function VolunteerSidebar({ open, onClose }) {
  return (
    <>
      <button className={`volunteer-sidebar-backdrop ${open ? 'is-open' : ''}`} type="button" aria-label="Cerrar menú" onClick={onClose} />
      <aside className={`volunteer-sidebar ${open ? 'is-open' : ''}`}>
        <div className="volunteer-sidebar__brand">
          <span>♧</span>
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
                  <button className={item.active ? 'is-active' : ''} type="button" key={item.label}>
                    <Icon size={19} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="volunteer-sidebar__profile">
          <div className="volunteer-avatar">{volunteerProfile.initials}</div>
          <div>
            <strong>{volunteerProfile.name}</strong>
            <span>{volunteerProfile.status}</span>
            <small><Star size={14} fill="currentColor" /> {volunteerProfile.rating} ({volunteerProfile.reviews})</small>
          </div>
        </div>

        <div className="volunteer-sidebar__help">
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
