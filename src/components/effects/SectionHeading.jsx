// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from 'framer-motion'

export default function SectionHeading({ index, title, children }) {
  const reduced = useReducedMotion()
  return <motion.header className="editorial-heading animated-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.7 }}>
    <motion.div className="heading-rule" aria-hidden="true" variants={{ hidden: { scaleX: reduced ? 1 : 0 }, visible: { scaleX: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } }} />
    <span className="record-index">{index}</span>
    <h2 aria-label={title}>{title.split(' ').map((word, i) => <span className="heading-word" aria-hidden="true" key={i}><motion.span variants={{ hidden: { y: reduced ? 0 : '110%', rotate: reduced ? 0 : 4 }, visible: { y: 0, rotate: 0, transition: { delay: i * 0.09 + 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}>{word}</motion.span></span>)}</h2>
    {children && <motion.p className="cyber-muted-text" variants={{ hidden: { opacity: reduced ? 1 : 0 }, visible: { opacity: 1, transition: { delay: 0.35, duration: 0.7 } } }}>{children}</motion.p>}
  </motion.header>
}
