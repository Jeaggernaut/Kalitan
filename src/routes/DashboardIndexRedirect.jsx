import { Navigate } from 'react-router-dom'
import { getDashboardPathByRole } from '../data/roles'
import { useAuth } from '../hooks/useAuth'

export default function DashboardIndexRedirect() {
  const { user } = useAuth()

  return <Navigate to={getDashboardPathByRole(user?.role)} replace />
}
