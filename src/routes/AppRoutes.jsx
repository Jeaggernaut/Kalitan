import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboard from '../dashboards/admin/AdminDashboard'
import AssociationDashboard from '../dashboards/association/AssociationDashboard'
import BeneficiaryDashboard from '../dashboards/beneficiary/BeneficiaryDashboard'
import BusinessDashboard from '../dashboards/business/BusinessDashboard'
import VolunteerDashboard from '../dashboards/volunteer/VolunteerDashboard'
import { ROLES } from '../data/roles'
import DashboardLayout from '../layouts/DashboardLayout'
import MainLayout from '../layouts/MainLayout'
import AuthPage from '../pages/AuthPage'
import LandingPage from '../pages/LandingPage'
import ProtectedRoute from './ProtectedRoute'
import DashboardIndexRedirect from './DashboardIndexRedirect'
import RoleRoute from './RoleRoute'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="auth/login" element={<AuthPage />} />
          <Route path="auth/register" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allowedRoles={[ROLES.BUSINESS]} />}>
            <Route path="/dashboard/business/*" element={<BusinessDashboard />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={[ROLES.VOLUNTEER]} />}>
            <Route path="/dashboard/volunteer/*" element={<VolunteerDashboard />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={[ROLES.ASSOCIATION]} />}>
            <Route path="/dashboard/association/*" element={<AssociationDashboard />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={[ROLES.BENEFICIARY]} />}>
            <Route path="/dashboard/beneficiary/*" element={<BeneficiaryDashboard />} />
          </Route>
          <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/dashboard/admin/*" element={<AdminDashboard />} />
          </Route>

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardIndexRedirect />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
