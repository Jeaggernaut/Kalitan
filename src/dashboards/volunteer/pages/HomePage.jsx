import { motion } from 'framer-motion'
import ActiveRescueTimeline from '../components/ActiveRescueTimeline'
import AvailableRescuesList from '../components/AvailableRescuesList'
import RescueMap from '../components/RescueMap'
import VolunteerAgenda from '../components/VolunteerAgenda'
import VolunteerImpactCard from '../components/VolunteerImpactCard'
import VolunteerMetricCard from '../components/VolunteerMetricCard'
import { volunteerMetrics } from '../mock/volunteerMockData'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function HomePage({ notify }) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.section className="volunteer-dashboard__metrics" variants={containerVariants}>
        {volunteerMetrics.map((metric) => (
          <motion.div variants={itemVariants} key={metric.label}>
            <VolunteerMetricCard metric={metric} />
          </motion.div>
        ))}
      </motion.section>

      <motion.section className="volunteer-dashboard__content" variants={itemVariants}>
        <div className="volunteer-dashboard__primary">
          <AvailableRescuesList notify={notify} />
          <ActiveRescueTimeline />
        </div>
        <aside className="volunteer-dashboard__aside">
          <VolunteerImpactCard />
          <VolunteerAgenda />
          <RescueMap />
        </aside>
      </motion.section>
    </motion.div>
  )
}
