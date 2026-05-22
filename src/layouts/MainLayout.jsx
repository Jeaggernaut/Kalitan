import { Outlet } from 'react-router-dom'
import AnimatedBackground from '../components/background/AnimatedBackground'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

export default function MainLayout() {
  return (
    <div className="app-shell">
      <AnimatedBackground />
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
