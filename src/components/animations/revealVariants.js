/* Reveal when entering viewport — base item */
export const revealItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
}

/* Container that staggers its children */
export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

/* Directional reveals */
export const slideFromLeft = {
  hidden: { opacity: 0, x: -38 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
}

export const slideFromRight = {
  hidden: { opacity: 0, x: 38 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
}

/* Scale + fade */
export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
}

/* Blur + fade + slide */
export const blurReveal = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 18 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
}

/* Hero title — strong reveal */
export const heroTitleVariants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
}
