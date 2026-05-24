import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import {
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  FileText,
  HeartHandshake,
  HelpCircle,
  Info,
  MapPin,
  MessageCircle,
  PackageCheck,
  Search,
  Send,
  Trash2,
  Upload,
} from 'lucide-react'
import BeneficiarySidebar from './components/BeneficiarySidebar'
import BeneficiaryTopbar from './components/BeneficiaryTopbar'
import { quickAccessItems } from './mock/beneficiaryMockData'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { getDashboard, requestSupport, updateProfile } from '../../services/beneficiaryService'
import './BeneficiaryDashboard.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] } },
}

const normalize = (value = '') => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const statusClass = (status = '') => `beneficiary-status is-${normalize(status).replace(/\s+/g, '-')}`

function Panel({ title, text, action, children, className = '' }) {
  return (
    <section className={`beneficiary-panel ${className}`}>
      <div className="beneficiary-panel__header">
        <div>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

function PageHeader({ title, text, action }) {
  return (
    <section className="beneficiary-page-header">
      <div>
        <span>Beneficiario</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      {action}
    </section>
  )
}

function EmptyState({ title, text }) {
  return (
    <div className="beneficiary-empty">
      <HeartHandshake size={34} />
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  )
}

function Toolbar({ query, setQuery, filter, setFilter, options, placeholder, date, setDate }) {
  return (
    <div className="beneficiary-toolbar">
      <label>
        <Search size={17} />
        <input value={query} placeholder={placeholder} onChange={(event) => setQuery(event.target.value)} />
      </label>
      <select value={filter} onChange={(event) => setFilter(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      {setDate && <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />}
    </div>
  )
}

function SupportCard({ support, onRequest, onCancel, onDetails }) {
  const canRequest = support.status === 'Disponible'
  const canCancel = support.status === 'Reservado' || support.status === 'En camino'

  return (
    <article className="beneficiary-support-card beneficiary-support-card--full">
      <div className="beneficiary-support-card__media">
        <img src={support.image} alt="" />
        <span className={statusClass(support.status)}>{support.status}</span>
      </div>
      <div>
        <strong>{support.business}</strong>
        <h3>{support.food}</h3>
        <p>{support.quantity}</p>
      </div>
      <ul>
        <li><MapPin size={16} /> {support.location} · {support.distance}</li>
        <li><Clock size={16} /> {support.schedule}</li>
      </ul>
      <div className="beneficiary-card-actions">
        {canRequest && <button type="button" onClick={() => onRequest(support.id)}>Solicitar apoyo</button>}
        {canCancel && <button className="is-secondary" type="button" onClick={() => onCancel(support.id)}>Cancelar solicitud</button>}
        <button className="is-ghost" type="button" onClick={() => onDetails(`${support.business}: ${support.food}`)}>Ver detalles</button>
      </div>
    </article>
  )
}

function HomePage({ data, navigateTo, notify, onRequest }) {
  return (
    <>
      <section className="beneficiary-next-card">
        <div className="beneficiary-next-card__content">
          <span className="beneficiary-next-card__icon"><PackageCheck size={30} /></span>
          <p>Proximo apoyo</p>
          <h2>{data.nextSupport.food}</h2>
          <strong>{data.nextSupport.business}</strong>
          <ul>
            <li><CalendarDays size={17} /> {data.nextSupport.dateTime}</li>
            <li><MapPin size={17} /> {data.nextSupport.deliveryPoint}</li>
            <li><Info size={17} /> {data.nextSupport.status}</li>
          </ul>
        </div>
        <div className="beneficiary-next-card__visual">
          <img src={data.nextSupport.image} alt="" />
          <button type="button" onClick={() => navigateTo('requests')}>Ver solicitud <ChevronRight size={18} /></button>
        </div>
      </section>

      <Panel title="Accesos rapidos" text="Las acciones que mas usas, siempre cerca.">
        <div className="beneficiary-quick-grid">
          {quickAccessItems.map((item) => {
            const Icon = item.icon
            return (
              <button className={`beneficiary-quick-card is-${item.tone}`} type="button" key={item.path} onClick={() => navigateTo(item.path)}>
                <span><Icon size={25} /></span>
                <strong>{item.label}</strong>
              </button>
            )
          })}
        </div>
      </Panel>

      <Panel title="Apoyos disponibles" text="Opciones cercanas a tu ubicacion." action={<button type="button" onClick={() => navigateTo('supports')}>Ver todos</button>}>
        <div className="beneficiary-supports-grid">
          {data.supports.slice(0, 3).map((support) => (
            <SupportCard key={support.id} support={support} onRequest={onRequest} onCancel={() => notify('Cancelacion simulada')} onDetails={notify} />
          ))}
        </div>
      </Panel>

      <section className="beneficiary-dashboard__split">
        <Panel title="Estado actual" text="Seguimiento de tu solicitud activa.">
          <RequestTimeline request={data.requests[0]} compact />
        </Panel>
        <Panel title="Mensajes comunidad" text="Informacion util para esta semana.">
          <div className="beneficiary-message-list">
            {data.communityMessages.map((message) => <p key={message}>{message}</p>)}
          </div>
        </Panel>
      </section>
    </>
  )
}

function SupportsPage({ supports, setSupports, notify }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Todos')
  const options = ['Todos', 'Disponible', 'En camino', 'Reservado', 'Entregado']
  const visible = supports.filter((support) => (
    (filter === 'Todos' || support.status === filter)
    && normalize(`${support.business} ${support.food} ${support.location}`).includes(normalize(query))
  ))

  const handleRequest = async (supportId) => {
    await requestSupport(supportId)
    setSupports((current) => current.map((support) => (
      support.id === supportId ? { ...support, status: 'Reservado' } : support
    )))
    notify('Solicitud enviada')
  }

  const handleCancel = (supportId) => {
    setSupports((current) => current.map((support) => (
      support.id === supportId ? { ...support, status: 'Disponible' } : support
    )))
    notify('Solicitud cancelada')
  }

  return (
    <>
      <PageHeader title="Mis apoyos" text="Apoyos disponibles y reservados cerca de ti." />
      <Panel title="Apoyos disponibles">
        <Toolbar query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} options={options} placeholder="Buscar por alimento, negocio o ubicacion" />
        {visible.length === 0 ? (
          <EmptyState title="No encontramos apoyos" text="Prueba con otro filtro o vuelve a revisar mas tarde." />
        ) : (
          <div className="beneficiary-supports-grid beneficiary-supports-grid--wide">
            {visible.map((support) => <SupportCard key={support.id} support={support} onRequest={handleRequest} onCancel={handleCancel} onDetails={notify} />)}
          </div>
        )}
      </Panel>
    </>
  )
}

function HistoryPage({ history }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [date, setDate] = useState('')
  const visible = history.filter((item) => (
    (filter === 'Todos' || item.status === filter)
    && (!date || item.date.split('/').reverse().join('-') === date)
    && normalize(`${item.business} ${item.food}`).includes(normalize(query))
  ))

  return (
    <>
      <PageHeader title="Historial" text="Apoyos recibidos y movimientos anteriores." />
      <Panel title="Historial de apoyos">
        <Toolbar query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} options={['Todos', 'Entregado', 'Completado', 'Cancelado']} placeholder="Buscar historial" date={date} setDate={setDate} />
        {visible.length === 0 ? <EmptyState title="Sin historial para mostrar" text="Cuando recibas apoyos, apareceran aqui." /> : (
          <div className="beneficiary-history-feed">
            {visible.map((item) => (
              <article key={item.id}>
                <img src={item.image} alt="" />
                <div>
                  <strong>{item.business}</strong>
                  <p>{item.food} · {item.quantity}</p>
                </div>
                <time>{item.date}</time>
                <span className={statusClass(item.status)}>{item.status}</span>
              </article>
            ))}
          </div>
        )}
      </Panel>
    </>
  )
}

function RequestTimeline({ request, compact = false }) {
  if (!request) return <EmptyState title="Sin solicitudes activas" text="Cuando solicites un apoyo, veras su avance aqui." />

  return (
    <div className={`beneficiary-request-flow ${compact ? 'is-compact' : ''}`}>
      {request.steps.map((step) => (
        <article key={step.label} className={step.complete ? 'is-complete' : ''}>
          <span>{step.complete ? <Check size={17} /> : <Clock size={17} />}</span>
          <div>
            <strong>{step.label}</strong>
            <p>{step.complete ? 'Completado' : 'Pendiente'}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

function RequestsPage({ requests, setRequests, notify }) {
  const cancelRequest = (requestId) => {
    setRequests((current) => current.filter((request) => request.id !== requestId))
    notify('Solicitud cancelada')
  }

  return (
    <>
      <PageHeader title="Mis solicitudes" text="Solicitudes activas y seguimiento paso a paso." />
      {requests.length === 0 ? <Panel title="Solicitudes activas"><EmptyState title="No tienes solicitudes activas" text="Solicita un apoyo disponible para iniciar un seguimiento." /></Panel> : (
        <div className="beneficiary-request-list">
          {requests.map((request) => (
            <Panel key={request.id} title={request.food} text={`${request.business} · ${request.status}`}>
              <div className="beneficiary-request-meta">
                <span><CalendarDays size={16} /> {request.date}</span>
                <span><Clock size={16} /> {request.time}</span>
                <span><MapPin size={16} /> {request.location}</span>
              </div>
              <RequestTimeline request={request} />
              <div className="beneficiary-card-actions">
                <button className="is-secondary" type="button" onClick={() => cancelRequest(request.id)}>Cancelar solicitud</button>
                <button className="is-ghost" type="button" onClick={() => notify(`${request.business}: ${request.food}`)}>Ver detalles</button>
              </div>
            </Panel>
          ))}
        </div>
      )}
    </>
  )
}

function NotificationsPage({ notifications, setNotifications, notify }) {
  const markRead = (id) => setNotifications((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)))
  const remove = (id) => {
    setNotifications((current) => current.filter((item) => item.id !== id))
    notify('Notificacion eliminada')
  }
  const markAll = () => {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })))
    notify('Todas las notificaciones fueron marcadas como leidas')
  }

  return (
    <>
      <PageHeader title="Notificaciones" text="Avisos importantes sobre apoyos, entregas y cambios." action={<button className="beneficiary-action" type="button" onClick={markAll}>Marcar todas leidas</button>} />
      <Panel title="Centro de notificaciones">
        {notifications.length === 0 ? <EmptyState title="Sin notificaciones" text="Aqui apareceran tus avisos importantes." /> : (
          <div className="beneficiary-notification-list">
            {notifications.map((item) => (
              <article className={`is-${item.type} ${item.read ? 'is-read' : ''}`} key={item.id}>
                <span>{item.type === 'success' ? <Check size={18} /> : item.type === 'alert' ? <Bell size={18} /> : <Info size={18} />}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.message}</p>
                  <small>{item.time}</small>
                </div>
                <div className="beneficiary-icon-actions">
                  {!item.read && <button type="button" aria-label="Marcar leida" onClick={() => markRead(item.id)}><Check size={16} /></button>}
                  <button type="button" aria-label="Eliminar" onClick={() => remove(item.id)}><Trash2 size={16} /></button>
                </div>
              </article>
            ))}
          </div>
        )}
      </Panel>
    </>
  )
}

function ProfilePage({ profile, setProfile, notify }) {
  const [draft, setDraft] = useState(profile)
  const { theme, toggleTheme } = useTheme()
  const update = (field, value) => setDraft((current) => ({ ...current, [field]: value }))
  const updateNotifications = (field, value) => setDraft((current) => ({
    ...current,
    notifications: { ...current.notifications, [field]: value },
  }))

  const save = async (event) => {
    event.preventDefault()
    const response = await updateProfile(draft)
    setProfile(response.profile)
    notify('Perfil actualizado')
  }

  return (
    <>
      <PageHeader title="Mi perfil" text="Datos personales, preferencias y notificaciones." />
      <form className="beneficiary-panel beneficiary-profile-form" onSubmit={save}>
        <div className="beneficiary-profile-form__avatar">
          <span>{draft.initials}</span>
          <button type="button" onClick={() => notify('Avatar mock actualizado')}><Upload size={17} /> Subir avatar</button>
        </div>
        <label>Nombre<input value={draft.name} onChange={(event) => update('name', event.target.value)} /></label>
        <label>Correo<input value={draft.email} onChange={(event) => update('email', event.target.value)} /></label>
        <label>Telefono<input value={draft.phone} onChange={(event) => update('phone', event.target.value)} /></label>
        <label>Direccion<input value={draft.address} onChange={(event) => update('address', event.target.value)} /></label>
        <label>Integrantes familia<input type="number" min="1" value={draft.familyMembers} onChange={(event) => update('familyMembers', event.target.value)} /></label>
        <label>Preferencias alimentos<input value={draft.foodPreferences.join(', ')} onChange={(event) => update('foodPreferences', event.target.value.split(',').map((item) => item.trim()).filter(Boolean))} /></label>
        <div className="beneficiary-preferences">
          <label><span>Notificaciones app</span><input type="checkbox" checked={draft.notifications.app} onChange={(event) => updateNotifications('app', event.target.checked)} /></label>
          <label><span>Correo electronico</span><input type="checkbox" checked={draft.notifications.email} onChange={(event) => updateNotifications('email', event.target.checked)} /></label>
          <label><span>SMS</span><input type="checkbox" checked={draft.notifications.sms} onChange={(event) => updateNotifications('sms', event.target.checked)} /></label>
          <label><span>Modo {theme === 'dark' ? 'oscuro' : 'claro'}</span><input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} /></label>
        </div>
        <button className="beneficiary-action" type="submit">Guardar cambios</button>
      </form>
    </>
  )
}

function HelpPage({ notify }) {
  const [message, setMessage] = useState('')
  const sendSupport = (event) => {
    event.preventDefault()
    setMessage('')
    notify('Mensaje enviado a soporte')
  }

  return (
    <>
      <PageHeader title="Ayuda" text="Respuestas rapidas y contacto humano cuando lo necesites." />
      <section className="beneficiary-help-grid">
        <Panel title="Preguntas frecuentes">
          <div className="beneficiary-faq">
            {['Como solicito un apoyo?', 'Que hago si no puedo asistir?', 'Como confirmo una entrega?'].map((question) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>Revisa el apartado correspondiente y usa las acciones disponibles. Si necesitas apoyo extra, contactanos desde el formulario.</p>
              </details>
            ))}
          </div>
        </Panel>
        <Panel title="Contacto y soporte" text="Te respondemos con calma y claridad.">
          <div className="beneficiary-contact">
            <p><MessageCircle size={17} /> soporte@kalitan.mx</p>
            <p><HelpCircle size={17} /> Lunes a viernes, 9:00 AM - 6:00 PM</p>
          </div>
          <form className="beneficiary-support-form" onSubmit={sendSupport}>
            <label>Mensaje<textarea required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Cuéntanos que necesitas" /></label>
            <button className="beneficiary-action" type="submit"><Send size={17} /> Contactar</button>
          </form>
        </Panel>
        <Panel title="Guia de uso">
          <div className="beneficiary-guide">
            <p><FileText size={17} /> Explora apoyos disponibles.</p>
            <p><PackageCheck size={17} /> Solicita el apoyo que se ajuste a tu ubicacion.</p>
            <p><Check size={17} /> Sigue el estado y confirma la entrega.</p>
          </div>
        </Panel>
      </section>
    </>
  )
}

function Toast({ message }) {
  return message ? <div className="beneficiary-toast">{message}</div> : null
}

export default function BeneficiaryDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData] = useState(null)
  const [profile, setProfile] = useState(null)
  const [supports, setSupports] = useState([])
  const [requests, setRequests] = useState([])
  const [notifications, setNotifications] = useState([])
  const [toast, setToast] = useState('')
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getDashboard().then((snapshot) => {
      setData(snapshot)
      setProfile(snapshot.user)
      setSupports(snapshot.supports)
      setRequests(snapshot.requests)
      setNotifications(snapshot.notifications)
    })
  }, [])

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2200)
  }

  const handleLogout = async () => {
    await logout()
    localStorage.clear()
    navigate('/auth?mode=login', { replace: true })
  }

  const onRequest = async (supportId) => {
    await requestSupport(supportId)
    setSupports((current) => current.map((support) => (support.id === supportId ? { ...support, status: 'Reservado' } : support)))
    notify('Solicitud enviada')
  }

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications])

  if (!data || !profile) {
    return <div className="beneficiary-dashboard beneficiary-dashboard--loading">Cargando apoyos...</div>
  }

  const dashboardData = { ...data, user: profile, supports, requests, notifications }
  const navigateToBeneficiary = (path) => navigate(`/dashboard/beneficiary/${path}`)

  return (
    <div className="beneficiary-dashboard">
      <BeneficiarySidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} profile={profile} />

      <motion.main className="beneficiary-dashboard__main" variants={containerVariants} initial="hidden" animate="visible">
        <BeneficiaryTopbar onMenuClick={() => setSidebarOpen(true)} onLogout={handleLogout} profile={profile} unreadCount={unreadCount} />
        <motion.div variants={itemVariants}>
          <Routes>
            <Route index element={<Navigate to="inicio" replace />} />
            <Route path="inicio" element={<HomePage data={dashboardData} navigateTo={navigateToBeneficiary} notify={notify} onRequest={onRequest} />} />
            <Route path="supports" element={<SupportsPage supports={supports} setSupports={setSupports} notify={notify} />} />
            <Route path="history" element={<HistoryPage history={data.history} />} />
            <Route path="requests" element={<RequestsPage requests={requests} setRequests={setRequests} notify={notify} />} />
            <Route path="notifications" element={<NotificationsPage notifications={notifications} setNotifications={setNotifications} notify={notify} />} />
            <Route path="profile" element={<ProfilePage profile={profile} setProfile={setProfile} notify={notify} />} />
            <Route path="help" element={<HelpPage notify={notify} />} />
            <Route path="*" element={<Navigate to="inicio" replace />} />
          </Routes>
        </motion.div>
      </motion.main>
      <Toast message={toast} />
    </div>
  )
}
