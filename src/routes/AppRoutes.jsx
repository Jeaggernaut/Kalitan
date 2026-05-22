import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import BusinessAffiliationPage from '../pages/BusinessAffiliationPage'
import LandingPage from '../pages/LandingPage'
import RegisterVolunteerPage from '../pages/RegisterVolunteerPage'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="afiliar-negocio" element={<BusinessAffiliationPage />} />
          <Route path="register-volunteer" element={<RegisterVolunteerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
