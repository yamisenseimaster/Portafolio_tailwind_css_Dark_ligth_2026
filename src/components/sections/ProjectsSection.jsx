// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../../utils/data'
import { itemVariants } from '../../utils/Helper'
import SectionHeading from '../effects/SectionHeading'
import ProjectImage from '../effects/ProjectImage'
export default function ProjectsSection() {
  return <section id="work" className="cyber-section editorial-section"><div className="record-shell">
    <SectionHeading index="01 / Proyectos" title="Registros de trabajo">Una selección de aplicaciones, interfaces y servicios que construí.</SectionHeading>
    {PROJECTS.map((project, index) => <motion.article key={project.id} id={`project-${project.id}`} className="work-entry" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={itemVariants}>
      <header className="work-entry-heading"><div><span className="record-index">Registro / {String(index + 1).padStart(2, '0')}</span><h3>{project.title}</h3></div><span className="editorial-stamp">{project.category}</span></header>
      <div className={`work-entry-body ${index % 2 ? 'work-entry-reverse' : ''}`}>
        <ProjectImage project={project} index={index} />
        <div className="work-entry-details"><p>{project.description}</p><dl><div><dt>Especialidad</dt><dd>{project.category}</dd></div><div><dt>Tecnologías</dt><dd>{project.tags.join(' · ')}</dd></div></dl><a className="editorial-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Ver proyecto <ArrowUpRight size={16} /></a></div>
      </div>
    </motion.article>)}
  </div></section>
}
