import { motion } from 'framer-motion'
import { ArrowRight, Check, ClipboardList, Edit3, Eye, MapPin, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AssociationSidebar from './components/AssociationSidebar'
import AssociationTopbar from './components/AssociationTopbar'
import DonationMap from './components/DonationMap'
import {
  associationAgenda,
  associationMetrics,
  associationProfile,
  associationRequests,
  pendingDeliveries,
  receivedFoods,
  recentActivity,
  receptionHistory,
} from './mock/associationMockData'
import './AssociationDashboard.css'

const statusClass = (status) => `association-status is-${status.toLowerCase().replace(/\s/g, '-')}`

function Toast({ message }) {
  return message ? <div className="association-toast">{message}</div> : null
}

function PageHeader({ title, text, action }) {
  return (
    <section className="association-page-header">
      <div>
        <span>Operación</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      {action}
    </section>
  )
}

function MetricStrip() {
  return (
    <section className="association-metrics-strip">
      {associationMetrics.map((metric) => {
        const Icon = metric.icon
        return (
          <article className="association-metric-card" key={metric.label}>
            <span><Icon size={18} /></span>
            <div>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
              <small>{metric.delta}</small>
            </div>
          </article>
        )
      })}
    </section>
  )
}

function PendingDeliveryCard({ delivery, onDetails, onReceive }) {
  return (
    <article className="association-delivery-card">
      <div className="association-delivery-card__main">
        <span className={statusClass(delivery.status)}>{delivery.status}</span>
        <h3>{delivery.business}</h3>
        <p>{delivery.food}</p>
      </div>
      <div className="association-delivery-card__meta">
        <span>{delivery.amount}</span>
        <span>{delivery.date} · {delivery.time}</span>
      </div>
      <div className="association-card-actions">
        <button type="button" onClick={() => onDetails(delivery)}><Eye size={16} /> Ver detalles</button>
        {delivery.status !== 'Recibido' && <button type="button" onClick={() => onReceive(delivery)}><Check size={16} /> Recibido</button>}
      </div>
    </article>
  )
}

function PendingDeliveries({ deliveries = pendingDeliveries, onDetails, onReceive }) {
  return (
    <section className="association-panel association-focus-panel">
      <div className="association-panel__header">
        <div>
          <h2>Entregas pendientes</h2>
          <p>Lo que requiere atención ahora: horarios, cantidades y estado de llegada.</p>
        </div>
      </div>
      <div className="association-delivery-grid">
        {deliveries.map((delivery) => (
          <PendingDeliveryCard delivery={delivery} key={delivery.id} onDetails={onDetails} onReceive={onReceive} />
        ))}
      </div>
    </section>
  )
}

function AgendaPanel() {
  return (
    <section className="association-panel">
      <div className="association-panel__header">
        <div>
          <h2>Agenda del día</h2>
          <p>Recepciones próximas.</p>
        </div>
      </div>
      <div className="association-agenda-list">
        {associationAgenda.map((item) => (
          <article key={item.id}>
            <time>{item.time}</time>
            <div>
              <strong>{item.business}</strong>
              <span>{item.foodType}</span>
            </div>
            <span className={statusClass(item.status)}>{item.status}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function RecentDonations() {
  return (
    <section className="association-panel">
      <div className="association-panel__header">
        <div>
          <h2>Donaciones recientes</h2>
          <p>Últimas recepciones validadas.</p>
        </div>
      </div>
      <div className="association-compact-list">
        {receptionHistory.slice(0, 3).map((item) => (
          <article key={item.id}>
            <span className={statusClass(item.status)}>{item.status}</span>
            <div>
              <strong>{item.food}</strong>
              <p>{item.business} · {item.amount}</p>
            </div>
            <small>{item.time}</small>
          </article>
        ))}
      </div>
    </section>
  )
}

function ReceptionState({ deliveries }) {
  const routeCount = deliveries.filter((delivery) => delivery.status === 'En camino').length
  const scheduledCount = deliveries.filter((delivery) => delivery.status === 'Programado').length
  return (
    <section className="association-panel association-state-panel">
      <div>
        <span className="association-state-dot" />
        <strong>{routeCount} entregas en camino</strong>
        <p>{scheduledCount} programadas para las siguientes 24 horas.</p>
      </div>
      <button type="button">Revisar recepción <ArrowRight size={16} /></button>
    </section>
  )
}

function ActivityPanel() {
  return (
    <section className="association-panel">
      <div className="association-panel__header">
        <div>
          <h2>Actividad reciente</h2>
          <p>Movimientos operativos importantes.</p>
        </div>
      </div>
      <div className="association-activity-feed">
        {recentActivity.map((activity) => <p key={activity}>{activity}</p>)}
      </div>
    </section>
  )
}

function HomePage({ deliveries, onDetails, onReceive }) {
  return (
    <>
      <MetricStrip />
      <motion.section className="association-home-grid" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <div className="association-home-grid__main">
          <PendingDeliveries deliveries={deliveries.slice(0, 3)} onDetails={onDetails} onReceive={onReceive} />
          <RecentDonations />
          <ActivityPanel />
        </div>
        <aside className="association-home-grid__side">
          <AgendaPanel />
          <ReceptionState deliveries={deliveries} />
          <DonationMap deliveries={deliveries} />
        </aside>
      </motion.section>
    </>
  )
}

function DeliveriesPage({ deliveries, onDetails, onReceive }) {
  const [query, setQuery] = useState('')
  const filteredDeliveries = deliveries.filter((delivery) => (
    `${delivery.business} ${delivery.food} ${delivery.status}`.toLowerCase().includes(query.toLowerCase())
  ))

  return (
    <>
      <PageHeader
        title="Entregas pendientes"
        text="Vista operativa para confirmar llegadas, revisar detalles y preparar la recepción."
        action={<label className="association-search"><Search size={16} /><input value={query} placeholder="Buscar entrega" onChange={(event) => setQuery(event.target.value)} /></label>}
      />
      <PendingDeliveries deliveries={filteredDeliveries} onDetails={onDetails} onReceive={onReceive} />
    </>
  )
}

function ReceivedFoodsPage() {
  return (
    <>
      <PageHeader title="Alimentos recibidos" text="Historial visual por categoría, cantidades y fechas recientes." />
      <section className="association-food-grid">
        {receivedFoods.map((food) => (
          <article className="association-panel association-food-card" key={food.id}>
            <span>{food.category}</span>
            <strong>{food.amount}</strong>
            <p>{food.date}</p>
            <small>{food.lastReception}</small>
          </article>
        ))}
      </section>
    </>
  )
}

function RequestsPage({ notify }) {
  return (
    <>
      <PageHeader
        title="Solicitudes"
        text="Peticiones activas de alimentos, pensadas como una bandeja ligera."
        action={<button className="association-primary-button" type="button" onClick={() => notify('Solicitud mock creada')}><Plus size={17} /> Nueva solicitud</button>}
      />
      <section className="association-panel">
        <div className="association-request-list">
          {associationRequests.map((request) => (
            <article key={request.id}>
              <ClipboardList size={18} />
              <div>
                <strong>{request.title}</strong>
                <p>{request.category} · {request.quantity} · {request.window}</p>
              </div>
              <span className={statusClass(request.status)}>{request.status}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function HistoryPage() {
  return (
    <>
      <PageHeader title="Historial de recepciones" text="Activity feed claro: qué llegó, cuándo, quién entregó y estado." />
      <section className="association-panel association-feed-panel">
        {receptionHistory.map((item) => (
          <article key={item.id}>
            <span className="association-feed-dot" />
            <div>
              <strong>{item.food}</strong>
              <p>{item.business} · entregó {item.deliveredBy}</p>
              <small>{item.time} · {item.amount}</small>
            </div>
            <span className={statusClass(item.status)}>{item.status}</span>
          </article>
        ))}
      </section>
    </>
  )
}

function ProfilePage({ notify }) {
  const [profile, setProfile] = useState(associationProfile)
  const [editing, setEditing] = useState(false)
  const update = (field, value) => setProfile((current) => ({ ...current, [field]: value }))

  return (
    <>
      <PageHeader
        title="Perfil de la asociación"
        text="Información visible para negocios y voluntarios."
        action={<button className="association-primary-button" type="button" onClick={() => setEditing((current) => !current)}><Edit3 size={17} /> {editing ? 'Ver perfil' : 'Editar perfil'}</button>}
      />
      <section className="association-panel association-profile-panel">
        <img src={profile.logo} alt="" />
        <div>
          {editing ? (
            <form onSubmit={(event) => { event.preventDefault(); setEditing(false); notify('Perfil actualizado') }}>
              <label>Nombre<input value={profile.name} onChange={(event) => update('name', event.target.value)} /></label>
              <label>Descripción<textarea value={profile.description} onChange={(event) => update('description', event.target.value)} /></label>
              <label>Dirección<input value={profile.address} onChange={(event) => update('address', event.target.value)} /></label>
              <label>Horarios<input value={profile.hours} onChange={(event) => update('hours', event.target.value)} /></label>
              <label>Contacto<input value={profile.contact} onChange={(event) => update('contact', event.target.value)} /></label>
              <button className="association-primary-button" type="submit">Guardar cambios</button>
            </form>
          ) : (
            <>
              <span>{profile.type}</span>
              <h3>{profile.name}</h3>
              <p>{profile.description}</p>
              <div className="association-profile-facts">
                <p><MapPin size={16} /> {profile.address}</p>
                <p>{profile.hours}</p>
                <p>{profile.contact}</p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

function SettingsPage({ notify, onLogout }) {
  const [notifications, setNotifications] = useState(true)
  const [privacy, setPrivacy] = useState('Solo negocios verificados')

  return (
    <>
      <PageHeader title="Configuración" text="Preferencias simples para operar sin fricción." />
      <section className="association-panel association-settings-panel">
        <label><span>Tema oscuro/claro</span><small>Usa el interruptor superior del dashboard.</small></label>
        <label><span>Notificaciones</span><input type="checkbox" checked={notifications} onChange={(event) => setNotifications(event.target.checked)} /></label>
        <label><span>Privacidad</span><select value={privacy} onChange={(event) => setPrivacy(event.target.value)}><option>Solo negocios verificados</option><option>Todos los negocios activos</option></select></label>
        <button type="button" onClick={() => notify('Configuración guardada')}>Guardar preferencias</button>
        <button className="association-danger-button" type="button" onClick={onLogout}>Cerrar sesión</button>
      </section>
    </>
  )
}

function DeliveryModal({ delivery, onClose }) {
  if (!delivery) return null

  return (
    <div className="association-modal-backdrop" role="presentation">
      <section className="association-modal">
        <div className="association-modal__header">
          <div>
            <span className={statusClass(delivery.status)}>{delivery.status}</span>
            <h3>{delivery.business}</h3>
          </div>
          <button type="button" onClick={onClose}>Cerrar</button>
        </div>
        <p><strong>Alimento:</strong> {delivery.food}</p>
        <p><strong>Cantidad:</strong> {delivery.amount}</p>
        <p><strong>Horario:</strong> {delivery.date}, {delivery.time}</p>
        <p><strong>Entrega:</strong> {delivery.driver}</p>
        <p><strong>Notas:</strong> {delivery.notes}</p>
      </section>
    </div>
  )
}

export default function AssociationDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [selectedDelivery, setSelectedDelivery] = useState(null)
  const [deliveries, setDeliveries] = useState(pendingDeliveries)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2200)
  }

  const handleReceive = (delivery) => {
    setDeliveries((currentDeliveries) => currentDeliveries.map((item) => (
      item.id === delivery.id ? { ...item, status: 'Recibido' } : item
    )))
    notify(`${delivery.food} marcado como recibido`)
  }

  const handleLogout = async () => {
    await logout()
    localStorage.clear()
    navigate('/auth?mode=login', { replace: true })
  }

  return (
    <div className="association-dashboard">
      <AssociationSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="association-dashboard__main">
        <AssociationTopbar onMenuClick={() => setSidebarOpen(true)} />
        <Routes>
          <Route index element={<Navigate to="inicio" replace />} />
          <Route path="inicio" element={<HomePage deliveries={deliveries} onDetails={setSelectedDelivery} onReceive={handleReceive} />} />
          <Route path="entregas-pendientes" element={<DeliveriesPage deliveries={deliveries} onDetails={setSelectedDelivery} onReceive={handleReceive} />} />
          <Route path="alimentos-recibidos" element={<ReceivedFoodsPage />} />
          <Route path="solicitudes" element={<RequestsPage notify={notify} />} />
          <Route path="historial" element={<HistoryPage />} />
          <Route path="perfil" element={<ProfilePage notify={notify} />} />
          <Route path="configuracion" element={<SettingsPage notify={notify} onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="inicio" replace />} />
        </Routes>
      </main>

      <DeliveryModal delivery={selectedDelivery} onClose={() => setSelectedDelivery(null)} />
      <Toast message={toast} />
    </div>
  )
}
