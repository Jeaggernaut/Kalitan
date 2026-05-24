import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import VolunteerSidebar from './components/VolunteerSidebar'
import VolunteerTopbar from './components/VolunteerTopbar'
import AvailableRescuesPage from './pages/AvailableRescuesPage'
import AvailabilityPage from './pages/AvailabilityPage'
import HistoryPage from './pages/HistoryPage'
import HomePage from './pages/HomePage'
import ImpactPage from './pages/ImpactPage'
import MyRescuesPage from './pages/MyRescuesPage'
import ProfilePage from './pages/ProfilePage'
import RecognitionsPage from './pages/RecognitionsPage'
import RoutesPage from './pages/RoutesPage'
import SettingsPage from './pages/SettingsPage'
import './VolunteerDashboard.css'

function Toast({ message }) {
  if (!message) return null
  return <div className="volunteer-toast">{message}</div>
}

export default function VolunteerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState('')

  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  return (
    <div className="volunteer-dashboard">
      <VolunteerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="volunteer-dashboard__main">
        <VolunteerTopbar onMenuClick={() => setSidebarOpen(true)} />

        <Routes>
          <Route index element={<Navigate to="inicio" replace />} />
          <Route path="inicio" element={<HomePage notify={notify} />} />
          <Route path="available-rescues" element={<AvailableRescuesPage notify={notify} />} />
          <Route path="my-rescues" element={<MyRescuesPage notify={notify} />} />
          <Route path="routes" element={<RoutesPage notify={notify} />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="impact" element={<ImpactPage />} />
          <Route path="recognitions" element={<RecognitionsPage />} />
          <Route path="profile" element={<ProfilePage notify={notify} />} />
          <Route path="availability" element={<AvailabilityPage notify={notify} />} />
          <Route path="settings" element={<SettingsPage notify={notify} />} />
          <Route path="*" element={<Navigate to="inicio" replace />} />
        </Routes>
      </main>

      <Toast message={toast} />
    </div>
  )
}
