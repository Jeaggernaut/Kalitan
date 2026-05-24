import { motion } from 'framer-motion'
import { Check, Download, FileDown, Pause, Pencil, Plus, Search, Trash2, Upload } from 'lucide-react'
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { BusinessProvider } from '../../context/BusinessContext.jsx'
import { useBusiness } from '../../hooks/useBusiness'
import BusinessSidebar from './components/BusinessSidebar'
import BusinessTopbar from './components/BusinessTopbar'
import MetricCard from './components/MetricCard'
import './BusinessDashboard.css'

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] } },
}

const statusClass = (status) => `status-pill is-${status.toLowerCase().replace(/\s/g, '-')}`
const statusValues = ['Publicado', 'En proceso', 'Rescatado', 'Pausado', 'Entregada', 'En traslado', 'Programada', 'Pagada', 'Pendiente', 'Activo']

function Toast({ message }) {
  return message ? <div className="business-toast">{message}</div> : null
}

function EmptyState({ title, text }) {
  return (
    <div className="business-empty">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  )
}

function PageHeader({ title, text, action }) {
  return (
    <section className="business-page-header">
      <div>
        <span>Negocio</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      {action}
    </section>
  )
}

function HomePage() {
  const { activeBusiness } = useBusiness()
  const activeSurpluses = activeBusiness.surpluses.filter((item) => item.status !== 'Rescatado')

  return (
    <>
      <motion.section className="business-dashboard__metrics business-dashboard__metrics--compact" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
        {activeBusiness.metrics.map((metric) => (
          <motion.div variants={itemVariants} key={metric.label}>
            <MetricCard metric={metric} />
          </motion.div>
        ))}
      </motion.section>

      <motion.section className="business-home-grid" variants={itemVariants}>
        <div className="business-home-grid__main">
          <section className="business-section business-focus-panel">
            <div className="business-section__header">
              <div>
                <h2>Excedentes activos</h2>
                <p>Publicaciones que todavía pueden convertirse en rescate.</p>
              </div>
            </div>
            <div className="business-active-surpluses">
              {activeSurpluses.slice(0, 4).map((surplus) => (
                <article key={surplus.id}>
                  <img src={surplus.image} alt="" />
                  <div>
                    <span className={statusClass(surplus.status)}>{surplus.status}</span>
                    <h3>{surplus.name}</h3>
                    <p>{surplus.amount} · {surplus.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="business-section">
            <div className="business-section__header">
              <div>
                <h2>Resumen de impacto</h2>
                <p>Tendencia mensual de rescates y CO₂ evitado.</p>
              </div>
            </div>
            <div className="business-chart business-chart--clean">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeBusiness.reports.monthlyRescues} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke="var(--business-dashboard-grid)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--business-dashboard-muted)" tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--business-dashboard-muted)" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--business-dashboard-tooltip)', border: '1px solid var(--business-dashboard-border)', borderRadius: 12 }} />
                  <Area dataKey="food" stroke="#4ade80" fill="#4ade8030" strokeWidth={3} />
                  <Area dataKey="co2" stroke="#7dd3fc" fill="#7dd3fc24" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <aside className="business-home-grid__side">
          <DonationFeed donations={activeBusiness.donations.slice(0, 3)} title="Donaciones recientes" />
          <SubscriptionMiniCard />
          <ActivityCard />
        </aside>
      </motion.section>
    </>
  )
}

function SurplusModal({ surplus, onClose, onSave }) {
  const [form, setForm] = useState(surplus ?? {
    name: '',
    description: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    image: '',
    status: 'Publicado',
  })

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  return (
    <div className="business-modal-backdrop" role="presentation">
      <form className="business-modal" onSubmit={(event) => { event.preventDefault(); onSave(form) }}>
        <div className="business-modal__header">
          <div>
            <span>{surplus ? 'Editar' : 'Nuevo excedente'}</span>
            <h3>{surplus ? surplus.name : 'Publicar excedente'}</h3>
          </div>
          <button type="button" onClick={onClose}>Cerrar</button>
        </div>
        <label>Nombre<input required value={form.name} onChange={(event) => update('name', event.target.value)} /></label>
        <label>Descripción<textarea required value={form.description} onChange={(event) => update('description', event.target.value)} /></label>
        <div className="business-form-grid">
          <label>Cantidad<input required value={form.amount} onChange={(event) => update('amount', event.target.value)} /></label>
          <label>Fecha<input required type="date" value={form.date} onChange={(event) => update('date', event.target.value)} /></label>
        </div>
        <label>Imagen mock<input value={form.image} placeholder="https://..." onChange={(event) => update('image', event.target.value)} /></label>
        <label>Estado
          <select value={form.status} onChange={(event) => update('status', event.target.value)}>
            <option>Publicado</option>
            <option>En proceso</option>
            <option>Rescatado</option>
            <option>Pausado</option>
          </select>
        </label>
        <div className="business-modal__actions">
          <button type="button" onClick={onClose}>Cancelar</button>
          <button className="business-primary-action" type="submit">Guardar</button>
        </div>
      </form>
    </div>
  )
}

function SurplusesPage({ notify }) {
  const { activeBusiness, createSurplus, deleteSurplus, updateSurplus } = useBusiness()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('Todos')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = activeBusiness.surpluses.filter((surplus) => (
    (status === 'Todos' || surplus.status === status)
    && `${surplus.name} ${surplus.description}`.toLowerCase().includes(query.toLowerCase())
  ))
  const pageSize = 4
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)

  const saveSurplus = (payload) => {
    if (editing) {
      updateSurplus(editing.id, payload)
      notify('Excedente actualizado')
    } else {
      createSurplus(payload)
      notify('Excedente publicado')
    }
    setModalOpen(false)
    setEditing(null)
  }

  const quickUpdate = (surplus, nextStatus) => {
    updateSurplus(surplus.id, { status: nextStatus })
    notify(`Estado cambiado a ${nextStatus}`)
  }

  return (
    <>
      <PageHeader
        title="Excedentes"
        text="La sección principal para publicar, pausar y cerrar rescates."
        action={<button className="business-primary-action" type="button" onClick={() => setModalOpen(true)}><Plus size={18} /> Publicación rápida</button>}
      />
      <section className="business-section business-page-card">
        <div className="business-toolbar">
          <label><Search size={17} /><input value={query} placeholder="Buscar excedente" onChange={(event) => { setQuery(event.target.value); setPage(1) }} /></label>
          <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1) }}>
            <option>Todos</option>
            <option>Publicado</option>
            <option>En proceso</option>
            <option>Rescatado</option>
            <option>Pausado</option>
          </select>
        </div>
        {visible.length === 0 ? (
          <EmptyState title="Sin excedentes encontrados" text="Ajusta los filtros o crea una publicación nueva." />
        ) : (
          <div className="business-card-grid">
            {visible.map((surplus) => (
              <article className="business-surplus-card" key={surplus.id}>
                <img src={surplus.image} alt="" />
                <div>
                  <span className={statusClass(surplus.status)}>{surplus.status}</span>
                  <h3>{surplus.name}</h3>
                  <p>{surplus.description}</p>
                  <small>{surplus.amount} · {surplus.date}</small>
                </div>
                <div className="business-row-actions">
                  <button type="button" title="Editar" onClick={() => { setEditing(surplus); setModalOpen(true) }}><Pencil size={16} /></button>
                  <button type="button" title="Publicar" onClick={() => quickUpdate(surplus, 'Publicado')}><Upload size={16} /></button>
                  <button type="button" title="Pausar" onClick={() => quickUpdate(surplus, 'Pausado')}><Pause size={16} /></button>
                  <button type="button" title="Marcar rescatado" onClick={() => quickUpdate(surplus, 'Rescatado')}><Check size={16} /></button>
                  <button type="button" title="Eliminar" onClick={() => { deleteSurplus(surplus.id); notify('Excedente eliminado') }}><Trash2 size={16} /></button>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="business-pagination">
          <button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>Anterior</button>
          <span>Página {page} de {totalPages}</span>
          <button type="button" disabled={page === totalPages} onClick={() => setPage((current) => current + 1)}>Siguiente</button>
        </div>
      </section>
      {modalOpen && <SurplusModal surplus={editing} onClose={() => { setModalOpen(false); setEditing(null) }} onSave={saveSurplus} />}
    </>
  )
}

function DonationFeed({ donations, title = 'Historial de donaciones' }) {
  if (donations.length === 0) return <EmptyState title="Sin donaciones" text="Todavía no hay donaciones para mostrar." />
  return (
    <section className="business-section business-donation-feed">
      <div className="business-section__header">
        <div>
          <h2>{title}</h2>
          <p>Actividad reciente con asociaciones receptoras.</p>
        </div>
      </div>
      {donations.map((item) => (
        <article key={item.id}>
          <span className={statusClass(item.status)}>{item.status}</span>
          <div>
            <strong>{item.food}</strong>
            <p>{item.association} · {item.amount}</p>
          </div>
          <small>{item.date}</small>
        </article>
      ))}
    </section>
  )
}

function DonationsPage() {
  const { activeBusiness } = useBusiness()
  const [status, setStatus] = useState('Todos')
  const [date, setDate] = useState('')
  const donations = activeBusiness.donations.filter((donation) => (
    (status === 'Todos' || donation.status === status) && (!date || donation.date === date)
  ))

  return (
    <>
      <PageHeader title="Donaciones realizadas" text="Historial limpio de lo que salió del negocio hacia asociaciones." />
      <div className="business-toolbar business-toolbar--standalone">
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option>Todos</option>
          <option>Entregada</option>
          <option>En traslado</option>
          <option>Programada</option>
        </select>
      </div>
      <DonationFeed donations={donations} />
    </>
  )
}

function ReportsPage({ notify }) {
  const { activeBusiness } = useBusiness()
  return (
    <>
      <PageHeader
        title="Reportes"
        text="Resumen simple para revisar tendencia mensual, alimentos y CO₂."
        action={<button className="business-primary-action" type="button" onClick={() => notify('Reporte PDF simulado exportado')}><FileDown size={18} /> Exportar PDF</button>}
      />
      <SummaryGrid items={activeBusiness.reports.summary} />
      <section className="business-section business-page-card">
        <div className="business-section__header">
          <div>
            <h2>Tendencia mensual</h2>
            <p>Rescates, alimentos rescatados y CO₂ evitado.</p>
          </div>
        </div>
        <div className="business-chart business-chart--clean">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activeBusiness.reports.monthlyRescues}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--business-dashboard-grid)" />
              <XAxis dataKey="month" stroke="var(--business-dashboard-muted)" />
              <YAxis stroke="var(--business-dashboard-muted)" />
              <Tooltip contentStyle={{ background: 'var(--business-dashboard-tooltip)', border: '1px solid var(--business-dashboard-border)', borderRadius: 12 }} />
              <Bar dataKey="food" fill="#4ade80" radius={[8, 8, 0, 0]} />
              <Bar dataKey="co2" fill="#7dd3fc" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  )
}

function MetricsPage() {
  const { activeBusiness } = useBusiness()
  const colors = ['#4ade80', '#7dd3fc', '#facc15', '#fb7185']
  return (
    <>
      <PageHeader title="Métricas" text="Analítica esencial sin ruido: rendimiento, rescates y categorías." />
      <ChartGrid>
        <ChartCard title="Rendimiento mensual">
          <LineChart data={activeBusiness.analytics.growth}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="performance" stroke="#4ade80" strokeWidth={3} /></LineChart>
        </ChartCard>
        <ChartCard title="Categorías más donadas">
          <PieChart><Pie data={activeBusiness.analytics.topFoods} dataKey="value" nameKey="name" outerRadius={98} label>{activeBusiness.analytics.topFoods.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip /></PieChart>
        </ChartCard>
        <ChartCard title="Rescates completados">
          <BarChart data={activeBusiness.analytics.growth}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="rescues" fill="#7dd3fc" radius={[8, 8, 0, 0]} /></BarChart>
        </ChartCard>
      </ChartGrid>
    </>
  )
}

function SubscriptionMiniCard() {
  const { activeBusiness } = useBusiness()
  return (
    <section className="business-section business-subscription-mini">
      <span className={statusClass(activeBusiness.subscription.status)}>{activeBusiness.subscription.status}</span>
      <h2>{activeBusiness.subscription.plan}</h2>
      <strong>{activeBusiness.subscription.price}<small>{activeBusiness.subscription.period}</small></strong>
      <p>Próximo pago: {activeBusiness.subscription.nextPayment}</p>
    </section>
  )
}

function SubscriptionPage({ notify }) {
  const { activeBusiness } = useBusiness()
  return (
    <>
      <PageHeader title="Suscripción" text="Plan actual, renovación y próximo pago en una vista limpia." />
      <section className="business-section business-subscription-detail">
        <span className={statusClass(activeBusiness.subscription.status)}>{activeBusiness.subscription.status}</span>
        <h2>{activeBusiness.subscription.plan}</h2>
        <strong>{activeBusiness.subscription.price}<small>{activeBusiness.subscription.period}</small></strong>
        <p>Renovación: {activeBusiness.subscription.nextPayment}</p>
        <div className="business-benefits">{activeBusiness.subscription.benefits.map((benefit) => <span key={benefit}>{benefit}</span>)}</div>
        <div className="business-row-actions">
          <button type="button" onClick={() => notify('Cambio de plan simulado')}>Cambiar plan</button>
          <button type="button" onClick={() => notify('Renovación simulada completada')}>Renovar</button>
          <button type="button" onClick={() => notify('Cancelación simulada registrada')}>Cancelar</button>
        </div>
      </section>
    </>
  )
}

function BillingPage({ notify }) {
  const { activeBusiness } = useBusiness()
  return (
    <>
      <PageHeader title="Facturación" text="Historial simple de pagos y facturas mock." />
      <section className="business-section business-page-card">
        <DataTable
          columns={['Factura', 'Fecha', 'Monto', 'Estado', 'Concepto', 'Acciones']}
          rows={activeBusiness.invoices.map((invoice) => [
            invoice.id,
            invoice.date,
            invoice.amount,
            invoice.status,
            invoice.concept,
            <button className="business-inline-button" type="button" key={invoice.id} onClick={() => notify('PDF mock descargado')}><Download size={15} /> PDF</button>,
          ])}
        />
      </section>
    </>
  )
}

function ProfilePage({ notify }) {
  const { activeBusiness, updateProfile } = useBusiness()
  const [draft, setDraft] = useState({ businessId: activeBusiness.id, profile: activeBusiness.profile })
  const [errors, setErrors] = useState({})
  const form = draft.businessId === activeBusiness.id ? draft.profile : activeBusiness.profile
  const setForm = (updater) => {
    setDraft((current) => ({
      businessId: activeBusiness.id,
      profile: typeof updater === 'function'
        ? updater(current.businessId === activeBusiness.id ? current.profile : activeBusiness.profile)
        : updater,
    }))
  }
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  const updatePreference = (field, value) => setForm((current) => ({
    ...current,
    preferences: { ...(current.preferences ?? {}), [field]: value },
  }))

  const save = (event) => {
    event.preventDefault()
    const nextErrors = {
      name: form.name.trim() ? '' : 'El nombre es obligatorio',
      phone: form.phone.trim() ? '' : 'El teléfono es obligatorio',
    }
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return
    updateProfile(form)
    notify('Perfil y preferencias guardadas')
  }

  return (
    <>
      <PageHeader title="Perfil del negocio" text="Datos del negocio, preferencias, notificaciones, privacidad y tema." />
      <form className="business-section business-profile-form business-profile-form--premium" onSubmit={save}>
        <div className="business-profile-preview">
          <img src={form.logo} alt="" />
          <button type="button" onClick={() => { update('logo', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=420&q=80'); notify('Logo mock actualizado') }}><Upload size={17} /> Subir logo</button>
        </div>
        <label>Nombre negocio<input value={form.name} onChange={(event) => update('name', event.target.value)} />{errors.name && <small>{errors.name}</small>}</label>
        <label>Descripción<textarea value={form.description} onChange={(event) => update('description', event.target.value)} /></label>
        <label>Dirección<input value={form.address} onChange={(event) => update('address', event.target.value)} /></label>
        <div className="business-form-grid">
          <label>Teléfono<input value={form.phone} onChange={(event) => update('phone', event.target.value)} />{errors.phone && <small>{errors.phone}</small>}</label>
          <label>Horarios<input value={form.hours} onChange={(event) => update('hours', event.target.value)} /></label>
        </div>
        <div className="business-profile-preferences">
          <label><span>Notificaciones</span><input type="checkbox" checked={Boolean(form.preferences?.notifications)} onChange={(event) => updatePreference('notifications', event.target.checked)} /></label>
          <label><span>Privacidad</span><select value={form.preferences?.privacy ?? 'Solo asociaciones verificadas'} onChange={(event) => updatePreference('privacy', event.target.value)}><option>Solo asociaciones verificadas</option><option>Todas las asociaciones activas</option></select></label>
          <label><span>Tema oscuro/claro</span><select value={form.preferences?.theme ?? 'Sistema'} onChange={(event) => updatePreference('theme', event.target.value)}><option>Sistema</option><option>Claro</option><option>Oscuro</option></select></label>
        </div>
        <button className="business-primary-action" type="submit">Guardar cambios</button>
      </form>
    </>
  )
}

function ActivityCard() {
  const { activeBusiness } = useBusiness()
  return (
    <section className="business-section business-activity-card">
      <div className="business-section__header">
        <div>
          <h2>Actividad reciente</h2>
          <p>Lo último que pasó en tu operación.</p>
        </div>
      </div>
      {(activeBusiness.activity ?? []).map((item) => <p key={item}>{item}</p>)}
    </section>
  )
}

function SummaryGrid({ items }) {
  return (
    <section className="business-summary-grid">
      {items.map((item) => <article className="business-section" key={item.label}><span>{item.label}</span><strong>{item.value}</strong></article>)}
    </section>
  )
}

function DataTable({ columns, rows }) {
  if (rows.length === 0) return <EmptyState title="Sin resultados" text="No hay registros para los filtros seleccionados." />
  return (
    <div className="business-table-wrap">
      <table className="business-table">
        <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[0]}-${index}`}>
              {row.map((cell, cellIndex) => (
                <td data-label={columns[cellIndex]} key={`${columns[cellIndex]}-${cellIndex}`}>
                  {typeof cell === 'string' && statusValues.includes(cell) ? <span className={statusClass(cell)}>{cell}</span> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ChartGrid({ children }) {
  return <section className="business-chart-grid business-chart-grid--simple">{children}</section>
}

function ChartCard({ title, children }) {
  return (
    <article className="business-section business-chart-card">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={280}>{children}</ResponsiveContainer>
    </article>
  )
}

function BusinessDashboardShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState('')
  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2200)
  }

  return (
    <div className="business-dashboard">
      <BusinessSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <motion.main className="business-dashboard__main" initial="hidden" animate="visible">
        <BusinessTopbar onMenuClick={() => setSidebarOpen(true)} />
        <Routes>
          <Route index element={<Navigate to="inicio" replace />} />
          <Route path="inicio" element={<HomePage />} />
          <Route path="excedentes" element={<SurplusesPage notify={notify} />} />
          <Route path="donaciones" element={<DonationsPage />} />
          <Route path="reportes" element={<ReportsPage notify={notify} />} />
          <Route path="metricas" element={<MetricsPage />} />
          <Route path="suscripcion" element={<SubscriptionPage notify={notify} />} />
          <Route path="facturacion" element={<BillingPage notify={notify} />} />
          <Route path="perfil" element={<ProfilePage notify={notify} />} />
          <Route path="solicitudes" element={<Navigate to="../inicio" replace />} />
          <Route path="trazabilidad" element={<Navigate to="../inicio" replace />} />
          <Route path="configuracion" element={<Navigate to="../perfil" replace />} />
          <Route path="*" element={<Navigate to="inicio" replace />} />
        </Routes>
      </motion.main>
      <Toast message={toast} />
    </div>
  )
}

export default function BusinessDashboard() {
  return (
    <BusinessProvider>
      <BusinessDashboardShell />
    </BusinessProvider>
  )
}
