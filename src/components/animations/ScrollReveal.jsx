import { motion, useReducedMotion } from 'framer-motion'

export default function ScrollReveal({ children, className = '', stagger = 0.08, delay = 0 }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18, margin: '0px 0px -80px 0px' }}
      variants={{
        hidden: { opacity: 0, y: 36 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
