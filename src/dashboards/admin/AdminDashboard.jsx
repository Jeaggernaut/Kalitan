import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleUserRound,
  FileBarChart,
  FileDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  MoreHorizontal,
  Package,
  Search,
  ShieldCheck,
  Store,
  Sun,
  UsersRound,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { getAdminSnapshot } from '../../services/adminService'
import './AdminDashboard.css'

const navItems = [
  { to: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: 'usuarios', label: 'Usuarios', icon: UsersRound },
  { to: 'negocios', label: 'Negocios', icon: Store },
  { to: 'asociaciones', label: 'Asociaciones', icon: Building2 },
  { to: 'excedentes', label: 'Excedentes', icon: Package },
  { to: 'reportes', label: 'Reportes', icon: FileBarChart },
]

const statusOptions = ['Todos', 'Activo', 'Pendiente', 'Suspendido', 'Observacion']
const userTypeOptions = ['Todos', 'Beneficiario', 'Voluntario', 'Negocio', 'Asociacion']
const surplusStatusOptions = ['Todos', 'Publicado', 'En proceso', 'Rescatado', 'Vencido']

function initials(name = 'AD') {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
}

function normalize(value = '') {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function statusClass(status = '') {
  return `admin-status admin-status--${normalize(status).replace(/\s+/g, '-')}`
}

function ShellButton({ children, className = '', ...props }) {
  return <button className={`admin-button ${className}`} type="button" {...props}>{children}</button>
}

function AdminSidebar({ open, onClose, onLogout }) {
  return (
    <>
      <button className={`admin-sidebar-backdrop ${open ? 'is-open' : ''}`} type="button" aria-label="Cerrar menu" onClick={onClose} />
      <aside className={`admin-sidebar ${open ? 'is-open' : ''}`}>
        <div className="admin-brand">
          <span><ShieldCheck size={25} /></span>
          <div>
            <strong>KALITÁN</strong>
            <small>Operación admin</small>
          </div>
        </div>
        <nav className="admin-nav" aria-label="Admin">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={onClose} className={({ isActive }) => (isActive ? 'is-active' : '')}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <button className="admin-logout" type="button" onClick={onLogout}>
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </aside>
    </>
  )
}

function AdminTopbar({ onMenuClick, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const profileRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const today = new Date()
  const weekAgo = new Date(today)
  weekAgo.setDate(today.getDate() - 6)
  const fmt = (d) => d.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const dateRange = `${fmt(weekAgo)} - ${fmt(today)}`

  return (
    <header className="admin-topbar">
      <button className="admin-menu-button" type="button" aria-label="Abrir menú" onClick={onMenuClick}>
        <Menu size={20} />
      </button>
      <div className="admin-topbar__title">
        <span>Bienvenido, Administrador</span>
        <h1>Panel de administración</h1>
        <p>Resumen operativo de la plataforma en tiempo real.</p>
      </div>
      <div className="admin-topbar__actions">
        <button className="admin-date-range" type="button">
          <CalendarDays size={17} />
          {dateRange}
          <ChevronDown size={16} />
        </button>
        <button className="admin-icon-button" type="button" aria-label="Tema" onClick={toggleTheme}>
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <button className="admin-icon-button" type="button" aria-label="Notificaciones">
          <Bell size={19} />
          <span>3</span>
        </button>
        <div className="admin-profile" ref={profileRef}>
          <button className="admin-profile__trigger" type="button" onClick={() => setProfileOpen((current) => !current)}>
            <span>AD</span>
            <div>
              <strong>Administrador</strong>
              <small>Super Administrador</small>
            </div>
            <ChevronDown size={16} />
          </button>
          {profileOpen && (
            <div className="admin-profile__menu">
              <button type="button" onClick={() => { setProfileOpen(false); onLogout() }}>
                <LogOut size={15} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function PageTitle({ eyebrow, title, text, action }) {
  return (
    <section className="admin-page-title">
      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      {action}
    </section>
  )
}

function MetricCard({ metric, icon: Icon }) {
  return (
    <article className={`admin-metric admin-metric--${metric.tone ?? 'green'}`}>
      <span><Icon size={22} /></span>
      <div>
        <p>{metric.label}</p>
        <strong>{metric.value}</strong>
        <small>{metric.trend} vs semana anterior</small>
      </div>
    </article>
  )
}

function Panel({ title, action, children, className = '' }) {
  return (
    <section className={`admin-panel ${className}`}>
      <div className="admin-panel__header">
        <h3>{title}</h3>
        {action}
      </div>
      {children}
    </section>
  )
}

function DashboardHome({ data, notify }) {
  const icons = [Store, Building2, Package, CircleUserRound]

  return (
    <>
      <section className="admin-metrics">
        {data.dashboard.metrics.map((metric, index) => <MetricCard key={metric.label} metric={metric} icon={icons[index]} />)}
      </section>
      <section className="admin-home-grid">
        <Panel title="Actividad reciente" action={<ShellButton onClick={() => notify('Vista completa simulada')}>Ver todas</ShellButton>}>
          <div className="admin-feed">
            {data.dashboard.activity.map((item) => (
              <article key={item.id}>
                <span>{item.type[0]}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </div>
                <time>{item.time}</time>
              </article>
            ))}
          </div>
        </Panel>
        <Panel title="Crecimiento plataforma" className="admin-chart-panel" action={<ShellButton>Ultimos 7 dias</ShellButton>}>
          <ResponsiveContainer width="100%" height={286}>
            <AreaChart data={data.dashboard.growth} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="var(--admin-grid)" vertical={false} />
              <XAxis dataKey="date" stroke="var(--admin-muted)" tickLine={false} axisLine={false} />
              <YAxis stroke="var(--admin-muted)" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: 'var(--admin-tooltip)', border: '1px solid var(--admin-border)', borderRadius: 10 }} />
              <Area dataKey="users" stroke="#4ade80" fill="#4ade8030" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Alertas importantes" action={<ShellButton onClick={() => notify('Alertas revisadas')}>Ver todas</ShellButton>}>
          <AlertList alerts={data.alerts} />
        </Panel>
        <Panel title="Accesos rapidos">
          <div className="admin-quick-actions">
            {data.dashboard.quickActions.map((item) => (
              <button type="button" key={item} onClick={() => notify(`${item} mock`)}>
                {item}
              </button>
            ))}
          </div>
        </Panel>
      </section>
    </>
  )
}

function AlertList({ alerts }) {
  return (
    <div className="admin-alert-list">
      {alerts.map((alert) => (
        <article className={`admin-alert admin-alert--${alert.severity}`} key={alert.id}>
          <AlertTriangle size={18} />
          <div>
            <strong>{alert.title}</strong>
            <p>{alert.detail}</p>
          </div>
          <span>{alert.count}</span>
        </article>
      ))}
    </div>
  )
}

function Toolbar({ query, setQuery, filter, setFilter, options, placeholder = 'Buscar' }) {
  return (
    <div className="admin-toolbar">
      <label>
        <Search size={17} />
        <input value={query} placeholder={placeholder} onChange={(event) => setQuery(event.target.value)} />
      </label>
      <select value={filter} onChange={(event) => setFilter(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </div>
  )
}

function DataTable({ columns, rows }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

function UserAvatar({ name }) {
  return <span className="admin-avatar">{initials(name)}</span>
}

function RowActions({ actions }) {
  return (
    <div className="admin-row-actions">
      {actions.map((action) => (
        <button type="button" key={action} title={action}>
          <MoreHorizontal size={16} />
          <span>{action}</span>
        </button>
      ))}
    </div>
  )
}

function UsersPage({ data }) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('Todos')
  const filtered = data.users.filter((user) => (
    (type === 'Todos' || user.type === type)
    && normalize(`${user.name} ${user.email} ${user.status}`).includes(normalize(query))
  ))

  return (
    <>
      <PageTitle eyebrow="Usuarios" title="Gestion de usuarios" text="Control de perfiles registrados, estado operativo y tipo de cuenta." />
      <Panel title="Usuarios registrados">
        <Toolbar query={query} setQuery={setQuery} filter={type} setFilter={setType} options={userTypeOptions} placeholder="Buscar usuario o correo" />
        <DataTable
          columns={['Usuario', 'Tipo', 'Fecha registro', 'Estado', 'Acciones']}
          rows={filtered.map((user) => (
            <tr key={user.id}>
              <td data-label="Usuario"><div className="admin-user-cell"><UserAvatar name={user.name} /><div><strong>{user.name}</strong><span>{user.email}</span></div></div></td>
              <td data-label="Tipo">{user.type}</td>
              <td data-label="Fecha registro">{user.registeredAt}</td>
              <td data-label="Estado"><span className={statusClass(user.status)}>{user.status}</span></td>
              <td data-label="Acciones"><RowActions actions={['Ver perfil', 'Suspender', 'Activar', 'Eliminar']} /></td>
            </tr>
          ))}
        />
      </Panel>
    </>
  )
}

function BusinessesPage({ data }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('Todos')
  const filtered = data.businesses.filter((business) => (
    (status === 'Todos' || business.status === status)
    && normalize(`${business.name} ${business.owner}`).includes(normalize(query))
  ))

  return (
    <>
      <PageTitle eyebrow="Negocios" title="Negocios afiliados" text="Suscripciones, publicaciones activas y actividad reciente de negocios." />
      <section className="admin-summary-grid">
        <SummaryItem label="Negocios activos" value="128" />
        <SummaryItem label="Negocios pendientes" value="14" />
        <SummaryItem label="Suscripciones activas" value="112" />
      </section>
      <Panel title="Directorio de negocios">
        <Toolbar query={query} setQuery={setQuery} filter={status} setFilter={setStatus} options={statusOptions} placeholder="Buscar negocio" />
        <DataTable
          columns={['Negocio', 'Suscripcion', 'Excedentes activos', 'Actividad reciente', 'Estado', 'Acciones']}
          rows={filtered.map((business) => (
            <tr key={business.id}>
              <td data-label="Negocio"><strong>{business.name}</strong><span>{business.owner}</span></td>
              <td data-label="Suscripcion">{business.subscription}</td>
              <td data-label="Excedentes activos">{business.activeSurpluses}</td>
              <td data-label="Actividad reciente">{business.lastActivity}</td>
              <td data-label="Estado"><span className={statusClass(business.status)}>{business.status}</span></td>
              <td data-label="Acciones"><RowActions actions={['Ver negocio', 'Suspender', 'Aprobar', 'Cambiar estado']} /></td>
            </tr>
          ))}
        />
      </Panel>
    </>
  )
}

function AssociationsPage({ data }) {
  return (
    <>
      <PageTitle eyebrow="Asociaciones" title="Asociaciones receptoras" text="Gestion operativa de asociaciones, entregas recientes y estado de revision." />
      <Panel title="Asociaciones">
        <DataTable
          columns={['Asociacion', 'Entregas recientes', 'Actividad', 'Estado', 'Acciones']}
          rows={data.associations.map((association) => (
            <tr key={association.id}>
              <td data-label="Asociacion"><strong>{association.name}</strong><span>{association.contact}</span></td>
              <td data-label="Entregas recientes">{association.recentDeliveries}</td>
              <td data-label="Actividad">{association.lastActivity}</td>
              <td data-label="Estado"><span className={statusClass(association.status)}>{association.status}</span></td>
              <td data-label="Acciones"><RowActions actions={['Aprobar', 'Suspender', 'Ver perfil']} /></td>
            </tr>
          ))}
        />
      </Panel>
    </>
  )
}

function SurplusesPage({ data }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('Todos')
  const filtered = data.surpluses.filter((surplus) => (
    (status === 'Todos' || surplus.status === status)
    && normalize(`${surplus.food} ${surplus.business}`).includes(normalize(query))
  ))

  return (
    <>
      <PageTitle eyebrow="Excedentes" title="Vista global de excedentes" text="Seguimiento de publicaciones, rescates y excedentes vencidos." />
      <section className="admin-summary-grid">
        <SummaryItem label="Excedentes activos" value="356" />
        <SummaryItem label="Excedentes rescatados" value="214" />
        <SummaryItem label="Excedentes vencidos" value="12" />
      </section>
      <Panel title="Excedentes publicados">
        <Toolbar query={query} setQuery={setQuery} filter={status} setFilter={setStatus} options={surplusStatusOptions} placeholder="Buscar alimento o negocio" />
        <DataTable
          columns={['Alimento', 'Negocio', 'Cantidad', 'Fecha', 'Estado', 'Acciones']}
          rows={filtered.map((surplus) => (
            <tr key={surplus.id}>
              <td data-label="Alimento"><strong>{surplus.food}</strong></td>
              <td data-label="Negocio">{surplus.business}</td>
              <td data-label="Cantidad">{surplus.quantity}</td>
              <td data-label="Fecha">{surplus.date}</td>
              <td data-label="Estado"><span className={statusClass(surplus.status)}>{surplus.status}</span></td>
              <td data-label="Acciones"><RowActions actions={['Ver detalles', 'Eliminar', 'Marcar revisado']} /></td>
            </tr>
          ))}
        />
      </Panel>
    </>
  )
}

function ReportsPage({ data, notify }) {
  return (
    <>
      <PageTitle
        eyebrow="Reportes"
        title="Reporte ejecutivo"
        text="Indicadores esenciales para entender crecimiento y actividad semanal."
        action={<ShellButton className="admin-button--primary" onClick={() => notify('PDF mock exportado')}><FileDown size={17} /> Exportar PDF</ShellButton>}
      />
      <div className="admin-report-filter"><CalendarDays size={17} /> {(() => { const t = new Date(); const w = new Date(t); w.setDate(t.getDate() - 6); const f = (d) => d.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' }); return `${f(w)} - ${f(t)}` })()}</div>
      <section className="admin-summary-grid">
        {data.reports.summary.map((item) => <SummaryItem key={item.label} {...item} />)}
      </section>
      <section className="admin-report-grid">
        <Panel title="Crecimiento usuarios">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.reports.weeklyActivity}>
              <CartesianGrid stroke="var(--admin-grid)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--admin-muted)" />
              <YAxis stroke="var(--admin-muted)" />
              <Tooltip contentStyle={{ background: 'var(--admin-tooltip)', border: '1px solid var(--admin-border)', borderRadius: 10 }} />
              <Line dataKey="users" stroke="#4ade80" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Actividad semanal">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.reports.weeklyActivity}>
              <CartesianGrid stroke="var(--admin-grid)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--admin-muted)" />
              <YAxis stroke="var(--admin-muted)" />
              <Tooltip contentStyle={{ background: 'var(--admin-tooltip)', border: '1px solid var(--admin-border)', borderRadius: 10 }} />
              <Bar dataKey="surpluses" fill="#4ade80" radius={[6, 6, 0, 0]} />
              <Bar dataKey="businesses" fill="#7dd3fc" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </section>
    </>
  )
}

function SummaryItem({ label, value }) {
  return (
    <article className="admin-summary">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

function Toast({ message }) {
  return message ? <div className="admin-toast">{message}</div> : null
}

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState('')
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getAdminSnapshot().then(setData)
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

  const pageProps = useMemo(() => ({ data, notify }), [data])

  if (!data) {
    return <div className="admin-dashboard admin-dashboard--loading">Cargando panel administrativo...</div>
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />
      <main className="admin-main">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} onLogout={handleLogout} />
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardHome {...pageProps} />} />
          <Route path="usuarios" element={<UsersPage data={data} />} />
          <Route path="negocios" element={<BusinessesPage data={data} />} />
          <Route path="asociaciones" element={<AssociationsPage data={data} />} />
          <Route path="excedentes" element={<SurplusesPage data={data} />} />
          <Route path="reportes" element={<ReportsPage {...pageProps} />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
      <Toast message={toast} />
    </div>
  )
}
