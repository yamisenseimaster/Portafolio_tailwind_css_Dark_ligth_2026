// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export default function MagneticLink({ children, ...props }) {
  const reduced = useReducedMotion()
  const dx = useMotionValue(0)
  const dy = useMotionValue(0)
  const x = useSpring(dx, { stiffness: 220, damping: 18 })
  const y = useSpring(dy, { stiffness: 220, damping: 18 })
  return <motion.a {...props} style={reduced ? {} : { x, y }} whileTap={reduced ? {} : { scale: 0.96 }} onPointerMove={event => {
    if (reduced || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    dx.set((event.clientX - bounds.left - bounds.width / 2) * 0.09)
    dy.set((event.clientY - bounds.top - bounds.height / 2) * 0.16)
  }} onPointerLeave={() => { dx.set(0); dy.set(0) }}>{children}</motion.a>
}
