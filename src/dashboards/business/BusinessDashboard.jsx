import { motion } from 'framer-motion'
import { useState } from 'react'
import BusinessSidebar from './components/BusinessSidebar'
import BusinessTopbar from './components/BusinessTopbar'
import ImpactBanner from './components/ImpactBanner'
import ImpactChart from './components/ImpactChart'
import MetricCard from './components/MetricCard'
import RecentSurplusList from './components/RecentSurplusList'
import SubscriptionCard from './components/SubscriptionCard'
import TraceabilityTimeline from './components/TraceabilityTimeline'
import { businessMetrics } from './mock/businessMockData'
import './BusinessDashboard.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
}

export default function BusinessDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="business-dashboard">
      <BusinessSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <motion.main
        className="business-dashboard__main"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <BusinessTopbar onMenuClick={() => setSidebarOpen(true)} />

        <motion.section className="business-dashboard__metrics" variants={containerVariants}>
          {businessMetrics.map((metric) => (
            <motion.div variants={itemVariants} key={metric.label}>
              <MetricCard metric={metric} />
            </motion.div>
          ))}
        </motion.section>

        <motion.section className="business-dashboard__content" variants={itemVariants}>
          <div className="business-dashboard__primary">
            <ImpactChart />
            <TraceabilityTimeline />
          </div>

          <aside className="business-dashboard__aside">
            <RecentSurplusList />
            <ImpactBanner />
            <SubscriptionCard />
          </aside>
        </motion.section>
      </motion.main>
    </div>
  )
}
