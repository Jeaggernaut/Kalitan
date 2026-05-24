import { Navigate, Outlet } from 'react-router-dom'
import { getDashboardPathByRole } from '../data/roles'
import { useAuth } from '../hooks/useAuth'

export default function RoleRoute({ allowedRoles }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/auth?mode=login" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardPathByRole(user.role)} replace />
  }

  return <Outlet />
}
