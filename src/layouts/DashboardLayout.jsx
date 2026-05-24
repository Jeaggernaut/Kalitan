import { Outlet, useNavigate } from 'react-router-dom'
import { getDashboardPathByRole } from '../data/roles'
import { useAuth } from '../hooks/useAuth'
import './DashboardLayout.css'

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/auth?mode=login', { replace: true })
  }

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <button className="dashboard-sidebar__brand" type="button" onClick={() => navigate(getDashboardPathByRole(user.role))}>
          <span>K</span>
          <div>
            <strong>Kalitán</strong>
            <small>{user.role}</small>
          </div>
        </button>

        <div className="dashboard-sidebar__profile">
          <p>{user.fullName}</p>
          <span>{user.email}</span>
        </div>

        <button className="dashboard-sidebar__logout" type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  )
}
