import { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export default function ProjectImage({ project, index }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(x, { stiffness: 160, damping: 24 })
  const rotateY = useSpring(y, { stiffness: 160, damping: 24 })
  const move = event => {
    if (reduced || event.pointerType !== 'mouse') return
    const bounds = ref.current.getBoundingClientRect()
    x.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -6)
    y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 6)
  }
  return <figure className="project-perspective" ref={ref} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }}>
    <motion.div style={reduced ? {} : { rotateX, rotateY }} initial={{ clipPath: reduced ? 'inset(0%)' : 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0%)' }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${project.title}`}><motion.img whileHover={reduced ? {} : { scale: 1.025 }} transition={{ duration: 0.5 }} src={project.image} alt={`Vista de ${project.title}`} loading="lazy" /></a>
    </motion.div>
    <figcaption>Fig. {String(index + 1).padStart(2, '0')} / {project.title}</figcaption>
  </figure>
}
