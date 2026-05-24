import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { recognitions } from '../mock/volunteerMockData'

const colorMap = {
  green: { bg: 'rgba(53,226,126,0.16)', icon: '#35e27e', glow: 'rgba(53,226,126,0.22)' },
  yellow: { bg: 'rgba(234,179,8,0.16)', icon: '#eab308', glow: 'rgba(234,179,8,0.22)' },
  purple: { bg: 'rgba(139,92,246,0.18)', icon: '#a78bfa', glow: 'rgba(139,92,246,0.22)' },
  blue: { bg: 'rgba(59,130,246,0.16)', icon: '#60a5fa', glow: 'rgba(59,130,246,0.22)' },
  orange: { bg: 'rgba(249,115,22,0.16)', icon: '#fb923c', glow: 'rgba(249,115,22,0.22)' },
  gray: { bg: 'rgba(255,255,255,0.05)', icon: 'var(--volunteer-muted)', glow: 'transparent' },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
}

export default function RecognitionsPage() {
  const unlocked = recognitions.filter((r) => r.unlocked)
  const locked = recognitions.filter((r) => !r.unlocked)

  return (
    <motion.div
      className="vpage"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38 }}
    >
      <div className="vpage__header">
        <div>
          <h2 className="vpage__title">Reconocimientos</h2>
          <p className="vpage__subtitle">{unlocked.length} desbloqueados · {locked.length} por obtener</p>
        </div>
      </div>

      <div className="vbadges-section">
        <h3 className="vbadges-section__title">Logros desbloqueados</h3>
        <motion.div
          className="vbadges-grid"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {unlocked.map((badge) => {
            const Icon = badge.icon
            const colors = colorMap[badge.color]
            return (
              <motion.article
                key={badge.id}
                className="vbadge-card volunteer-panel is-unlocked"
                variants={itemVariants}
                style={{ '--badge-glow': colors.glow }}
              >
                <div
                  className="vbadge-card__icon"
                  style={{ background: colors.bg, color: colors.icon, boxShadow: `0 0 32px ${colors.glow}` }}
                >
                  <Icon size={30} />
                </div>
                <h4>{badge.name}</h4>
                <p>{badge.description}</p>
                {badge.date && <small>Obtenido el {badge.date}</small>}
              </motion.article>
            )
          })}
        </motion.div>
      </div>

      <div className="vbadges-section">
        <h3 className="vbadges-section__title">Por desbloquear</h3>
        <motion.div
          className="vbadges-grid"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {locked.map((badge) => {
            const Icon = badge.icon
            return (
              <motion.article
                key={badge.id}
                className="vbadge-card volunteer-panel is-locked"
                variants={itemVariants}
              >
                <div className="vbadge-card__icon is-locked-icon">
                  <Icon size={26} />
                  <Lock size={16} className="vbadge-lock" />
                </div>
                <h4>{badge.name}</h4>
                <p>{badge.description}</p>
                {badge.progress !== undefined && (
                  <div className="vbadge-progress">
                    <div
                      className="vbadge-progress__bar"
                      style={{
                        width: `${Math.min(100, (badge.progress / (badge.target ?? 50)) * 100)}%`,
                      }}
                    />
                    <span>
                      {badge.progress} / {badge.target ?? 50}
                    </span>
                  </div>
                )}
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </motion.div>
  )
}
