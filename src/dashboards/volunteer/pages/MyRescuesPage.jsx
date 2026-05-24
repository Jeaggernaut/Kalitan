import { motion } from 'framer-motion'
import {
  Building2,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  Package,
  RotateCcw,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { updateRescueStatus } from '../../../services/volunteerService'
import { myRescues as initialRescues } from '../mock/volunteerMockData'

const statusClass = {
  'En proceso': 'is-process',
  Pendiente: 'is-pending',
  Completado: 'is-completed',
  Cancelado: 'is-cancelled',
}

const tabs = ['Todos', 'En proceso', 'Pendiente', 'Completado']

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function MyRescuesPage({ notify }) {
  const [rescues, setRescues] = useState(initialRescues)
  const [activeTab, setActiveTab] = useState('Todos')
  const [loading, setLoading] = useState('')

  const filtered = activeTab === 'Todos' ? rescues : rescues.filter((r) => r.status === activeTab)

  const updateStatus = async (id, status) => {
    setLoading(id + status)
    const result = await updateRescueStatus(id, status)
    if (result.success) {
      setRescues((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
      notify(result.message)
    }
    setLoading('')
  }

  return (
    <motion.div
      className="vpage"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38 }}
    >
      <div className="vpage__header">
        <div>
          <h2 className="vpage__title">Mis rescates</h2>
          <p className="vpage__subtitle">{rescues.length} rescates aceptados en total</p>
        </div>
      </div>

      <div className="vpage__tabs">
        {tabs.map((tab) => {
          const count = tab === 'Todos' ? rescues.length : rescues.filter((r) => r.status === tab).length
          return (
            <button
              key={tab}
              type="button"
              className={`vpage__tab${activeTab === tab ? ' is-active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab} {count > 0 && <span>{count}</span>}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="vpage__empty">
          <Package size={40} />
          <p>No tienes rescates en esta categoría.</p>
        </div>
      ) : (
        <motion.div
          className="vmyrescues-list"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {filtered.map((rescue) => (
            <motion.article key={rescue.id} className="vmyrescue-card volunteer-panel" variants={itemVariants}>
              <img src={rescue.image} alt={rescue.food} />

              <div className="vmyrescue-card__body">
                <div className="vmyrescue-card__top">
                  <div>
                    <h3>{rescue.food}</h3>
                    <span className="vmyrescue-card__amount"><Package size={14} /> {rescue.amount}</span>
                  </div>
                  <span className={`vstatus-badge ${statusClass[rescue.status]}`}>{rescue.status}</span>
                </div>

                <div className="vmyrescue-card__route">
                  <div className="vmyrescue-card__stop">
                    <div className="vmyrescue-card__stop-dot is-pickup" />
                    <div>
                      <strong>{rescue.business}</strong>
                      <span><MapPin size={12} /> {rescue.businessAddress}</span>
                      <span><Clock size={12} /> Recogida: {rescue.pickupTime}</span>
                    </div>
                  </div>
                  <div className="vmyrescue-card__route-line" />
                  <div className="vmyrescue-card__stop">
                    <div className="vmyrescue-card__stop-dot is-delivery" />
                    <div>
                      <strong>{rescue.association}</strong>
                      <span><Building2 size={12} /> {rescue.associationAddress}</span>
                      <span><Clock size={12} /> Entrega: {rescue.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="vmyrescue-card__actions">
                {rescue.status === 'Pendiente' && (
                  <button
                    type="button"
                    className="vaction-btn is-primary"
                    onClick={() => updateStatus(rescue.id, 'En proceso')}
                    disabled={!!loading}
                  >
                    <Navigation size={16} /> Iniciar ruta
                  </button>
                )}
                {rescue.status === 'En proceso' && (
                  <>
                    <button
                      type="button"
                      className="vaction-btn is-secondary"
                      onClick={() => updateStatus(rescue.id, 'Recogido')}
                      disabled={!!loading}
                    >
                      <CheckCircle2 size={16} /> Marcar recogido
                    </button>
                    <button
                      type="button"
                      className="vaction-btn is-primary"
                      onClick={() => updateStatus(rescue.id, 'Completado')}
                      disabled={!!loading}
                    >
                      <CheckCircle2 size={16} /> Marcar entregado
                    </button>
                  </>
                )}
                {(rescue.status === 'Pendiente' || rescue.status === 'En proceso') && (
                  <button
                    type="button"
                    className="vaction-btn is-danger"
                    onClick={() => updateStatus(rescue.id, 'Cancelado')}
                    disabled={!!loading}
                  >
                    <XCircle size={16} /> Cancelar
                  </button>
                )}
                {(rescue.status === 'Completado' || rescue.status === 'Cancelado') && (
                  <span className="vmyrescue-card__done">
                    {rescue.status === 'Completado' ? <CheckCircle2 size={16} /> : <RotateCcw size={16} />}
                    {rescue.status}
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
