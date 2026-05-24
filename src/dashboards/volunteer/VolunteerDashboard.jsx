import { motion } from 'framer-motion'
import { useState } from 'react'
import ActiveRescueTimeline from './components/ActiveRescueTimeline'
import AvailableRescuesList from './components/AvailableRescuesList'
import RescueMap from './components/RescueMap'
import VolunteerAgenda from './components/VolunteerAgenda'
import VolunteerImpactCard from './components/VolunteerImpactCard'
import VolunteerMetricCard from './components/VolunteerMetricCard'
import VolunteerSidebar from './components/VolunteerSidebar'
import VolunteerTopbar from './components/VolunteerTopbar'
import { volunteerMetrics } from './mock/volunteerMockData'
import './VolunteerDashboard.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
}

export default function VolunteerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="volunteer-dashboard">
      <VolunteerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <motion.main className="volunteer-dashboard__main" variants={containerVariants} initial="hidden" animate="visible">
        <VolunteerTopbar onMenuClick={() => setSidebarOpen(true)} />

        <motion.section className="volunteer-dashboard__metrics" variants={containerVariants}>
          {volunteerMetrics.map((metric) => (
            <motion.div variants={itemVariants} key={metric.label}>
              <VolunteerMetricCard metric={metric} />
            </motion.div>
          ))}
        </motion.section>

        <motion.section className="volunteer-dashboard__content" variants={itemVariants}>
          <div className="volunteer-dashboard__primary">
            <AvailableRescuesList />
            <ActiveRescueTimeline />
          </div>

          <aside className="volunteer-dashboard__aside">
            <VolunteerImpactCard />
            <VolunteerAgenda />
            <RescueMap />
          </aside>
        </motion.section>
      </motion.main>
    </div>
  )
}
