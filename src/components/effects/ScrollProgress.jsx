// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const reduced = useReducedMotion()
  return <motion.div className="page-progress" style={{ scaleX: reduced ? scrollYProgress : smooth }} aria-hidden="true" />
}
