// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { SKILLS_CATEGORY, PASSIONS, TECH_STACK } from '../../utils/data'
import { itemVariants } from '../../utils/Helper'
import SectionHeading from '../effects/SectionHeading'
export default function About() {
  return <section id="about" className="cyber-section editorial-section"><div className="record-shell">
    <SectionHeading index="02 / Sobre mí" title="Perfil" />
    <motion.div className="profile-columns" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={itemVariants}>
      <div><p className="profile-intro">Desarrollador Full Stack que combina creatividad y funcionalidad para crear experiencias digitales claras, útiles y memorables.</p><p className="cyber-muted-text">Me gusta resolver problemas con creatividad y buscar nuevos desafíos para aprender y crecer. Trabajo con React, Node.js y bases de datos para convertir ideas en aplicaciones completas.</p>
      <div className="profile-principles">{PASSIONS.map(passion => <div key={passion.title}><h3>{passion.title}</h3><p className="cyber-muted-text">{passion.description}</p></div>)}</div></div>
      <div><h3 className="record-index">Stack técnico</h3><dl className="stack-table">{SKILLS_CATEGORY.map(category => <div key={category.title}><dt>{category.title}</dt><dd>{category.skills.map(skill => skill.name).join(' · ')}</dd></div>)}</dl><h3 className="record-index">Otras herramientas</h3><p className="stack-tools cyber-muted-text">{TECH_STACK.join(' / ')}</p></div>
    </motion.div>
  </div></section>
}
