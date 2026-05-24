import { ArrowRight, Leaf } from 'lucide-react'
import { businessNavigation } from '../mock/businessMockData'

const groups = [
  { title: '', items: businessNavigation.slice(0, 1) },
  { title: 'Gestión', items: businessNavigation.slice(1, 5) },
  { title: 'Impacto', items: businessNavigation.slice(5, 7) },
  { title: 'Negocio', items: businessNavigation.slice(7) },
]

export default function BusinessSidebar({ open, onClose }) {
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
                  <button className={item.active ? 'is-active' : ''} type="button" key={item.label}>
                    <Icon size={19} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="business-sidebar__plan">
          <span>Plan actual</span>
          <div>
            <strong>Básico</strong>
            <small>Activo</small>
          </div>
          <p>$150 MXN / mes</p>
          <button type="button">
            Renovar plan
            <ArrowRight size={17} />
          </button>
        </div>
      </aside>
    </>
  )
}
