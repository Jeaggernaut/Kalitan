import { motion } from 'framer-motion'
import { useState } from 'react'
import AssociationAgenda from './components/AssociationAgenda'
import AssociationMetricCard from './components/AssociationMetricCard'
import AssociationSidebar from './components/AssociationSidebar'
import AssociationTopbar from './components/AssociationTopbar'
import BeneficiaryStats from './components/BeneficiaryStats'
import DonationMap from './components/DonationMap'
import FoodDistributionChart from './components/FoodDistributionChart'
import ImpactBanner from './components/ImpactBanner'
import ImpactChart from './components/ImpactChart'
import PendingDeliveriesList from './components/PendingDeliveriesList'
import ReceptionTimeline from './components/ReceptionTimeline'
import { associationMetrics } from './mock/associationMockData'
import './AssociationDashboard.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
}

export default function AssociationDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="association-dashboard">
      <AssociationSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <motion.main className="association-dashboard__main" variants={containerVariants} initial="hidden" animate="visible">
        <AssociationTopbar onMenuClick={() => setSidebarOpen(true)} />

        <motion.section className="association-dashboard__metrics" variants={containerVariants}>
          {associationMetrics.map((metric) => (
            <motion.div variants={itemVariants} key={metric.label}>
              <AssociationMetricCard metric={metric} />
            </motion.div>
          ))}
        </motion.section>

        <motion.section className="association-dashboard__content" variants={itemVariants}>
          <div className="association-dashboard__primary">
            <PendingDeliveriesList />
            <div className="association-dashboard__charts">
              <ImpactChart />
              <FoodDistributionChart />
            </div>
            <ReceptionTimeline />
            <BeneficiaryStats />
            <ImpactBanner />
          </div>

          <aside className="association-dashboard__aside">
            <AssociationAgenda />
            <DonationMap />
          </aside>
        </motion.section>
      </motion.main>
    </div>
  )
}
