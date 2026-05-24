import { AnimatePresence, motion } from 'framer-motion'
import { Building2, ChevronDown, Plus, Store } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBusiness } from '../../hooks/useBusiness'
import './BusinessSwitcher.css'

export default function BusinessSwitcher() {
  const { activeBusiness, businesses, selectBusiness } = useBusiness()
  const [open, setOpen] = useState(false)
  const switcherRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!switcherRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  const goTo = (path) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <div className="business-switcher" ref={switcherRef}>
      <button className="business-switcher__trigger" type="button" aria-expanded={open} onClick={() => setOpen((current) => !current)}>
        <span>{activeBusiness.profile.initials}</span>
        <div>
          <strong>{activeBusiness.profile.name}</strong>
          <small>{activeBusiness.profile.type}</small>
        </div>
        <ChevronDown size={18} className={open ? 'is-open' : ''} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="business-switcher__menu"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="business-switcher__list">
              {businesses.map((business) => (
                <button
                  className={business.id === activeBusiness.id ? 'is-active' : ''}
                  type="button"
                  key={business.id}
                  onClick={() => {
                    selectBusiness(business.id)
                    setOpen(false)
                  }}
                >
                  <span>{business.profile.initials}</span>
                  <div>
                    <strong>{business.profile.name}</strong>
                    <small>{business.profile.type}</small>
                  </div>
                </button>
              ))}
            </div>

            <div className="business-switcher__divider" />

            <div className="business-switcher__actions">
              <button type="button" onClick={() => goTo('/dashboard/business/perfil')}>
                <Building2 size={17} />
                Gestionar negocios
              </button>
              <button type="button" onClick={() => goTo('/dashboard/business/perfil')}>
                <Plus size={17} />
                Agregar nuevo negocio
              </button>
            </div>

            <div className="business-switcher__footer">
              <Store size={16} />
              <span>Cambio local, listo para conectar a Spring Boot.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
