import { DashboardHero, DashboardPanel, MetricGrid } from '../DashboardWidgets'

export default function AdminDashboard() {
  return (
    <div className="dashboard-page">
      <DashboardHero
        eyebrow="Dashboard admin"
        title="Supervisa usuarios, actividad y suscripciones."
        description="Vista general para monitorear operación, negocios afiliados y actividad de plataforma."
      />
      <MetricGrid
        metrics={[
          { value: '128', label: 'usuarios registrados' },
          { value: '34', label: 'negocios afiliados' },
          { value: '412', label: 'acciones registradas' },
          { value: '$5,100', label: 'MXN en suscripciones' },
        ]}
      />
      <DashboardPanel
        title="Actividad general"
        items={[
          { title: 'Nuevo negocio afiliado', description: 'Restaurante Verde activó suscripción mensual.' },
          { title: 'Actividad de rescates', description: '18 rescates coordinados esta semana.' },
          { title: 'Pagos pendientes', description: '3 suscripciones requieren seguimiento.' },
        ]}
      />
    </div>
  )
}
