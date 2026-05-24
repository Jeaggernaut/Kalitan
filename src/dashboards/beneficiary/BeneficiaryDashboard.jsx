import { motion } from 'framer-motion'
import { useState } from 'react'
import AvailableSupportsList from './components/AvailableSupportsList'
import BeneficiaryHistory from './components/BeneficiaryHistory'
import BeneficiarySidebar from './components/BeneficiarySidebar'
import BeneficiaryTopbar from './components/BeneficiaryTopbar'
import CommunityBanner from './components/CommunityBanner'
import HelpCard from './components/HelpCard'
import NextSupportCard from './components/NextSupportCard'
import QuickAccessGrid from './components/QuickAccessGrid'
import RequestStatusTimeline from './components/RequestStatusTimeline'
import './BeneficiaryDashboard.css'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
}

export default function BeneficiaryDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="beneficiary-dashboard">
      <BeneficiarySidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <motion.main
        className="beneficiary-dashboard__main"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <BeneficiaryTopbar onMenuClick={() => setSidebarOpen(true)} />
        <motion.div variants={itemVariants}>
          <NextSupportCard />
        </motion.div>
        <motion.div variants={itemVariants}>
          <QuickAccessGrid />
        </motion.div>
        <motion.div variants={itemVariants}>
          <AvailableSupportsList />
        </motion.div>
        <motion.section className="beneficiary-dashboard__split" variants={itemVariants}>
          <BeneficiaryHistory />
          <RequestStatusTimeline />
        </motion.section>
        <motion.section className="beneficiary-dashboard__split beneficiary-dashboard__bottom" variants={itemVariants}>
          <CommunityBanner />
          <HelpCard />
        </motion.section>
      </motion.main>
    </div>
  )
}
