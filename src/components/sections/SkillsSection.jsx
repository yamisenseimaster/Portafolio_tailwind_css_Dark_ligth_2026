// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { JOURNEY_STEPS } from '../../utils/data'
import { itemVariants } from '../../utils/Helper'
import SectionHeading from '../effects/SectionHeading'
export default function SkillsSection() {
  return <section id="skills" className="cyber-section editorial-section"><div className="record-shell">
    <SectionHeading index="03 / Experiencia" title="Hoja de servicio">Mi recorrido en desarrollo web, desde los primeros pasos hasta las aplicaciones completas.</SectionHeading>
    {JOURNEY_STEPS.map(step => <motion.article key={step.year} className="service-row" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={itemVariants}>
      <div className="service-meta"><span>{step.year}</span><span>{step.company}</span></div><div><h3>{step.title}</h3><p className="cyber-muted-text">{step.description}</p></div>
    </motion.article>)}
  </div></section>
}
