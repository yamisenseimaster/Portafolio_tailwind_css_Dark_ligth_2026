import { useLayoutEffect, useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../../utils/data'
import './ScrollShowcase.css'

export default function ScrollShowcase() {
  const section = useRef(null)
  const viewport = useRef(null)
  const track = useRef(null)
  const [distance, setDistance] = useState(0)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const tickerX = useTransform(scrollYProgress, [0, 1], [-180, 0])

  useLayoutEffect(() => {
    const measure = () => setDistance(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth))
    const observer = new ResizeObserver(measure)
    observer.observe(viewport.current)
    observer.observe(track.current)
    measure()
    return () => observer.disconnect()
  }, [])

  function revealProject(index) {
    if (reduced || !distance) return
    const card = track.current.children[index]
    const progress = Math.min(1, card.offsetLeft / distance)
    const top = window.scrollY + section.current.getBoundingClientRect().top
    window.scrollTo({ top: top + progress * (section.current.offsetHeight - window.innerHeight), behavior: 'instant' })
  }

  return <section ref={section} className={`scroll-showcase cyber-section ${reduced ? 'showcase-static' : ''}`} style={reduced ? undefined : { height: `calc(100svh + ${distance}px)` }} aria-label="Galería de proyectos">
    <div className="showcase-sticky">
      <div className="showcase-heading"><span className="record-index">Código en movimiento</span><a href="#work" aria-label="Ir a los registros de trabajo"><ArrowDownRight size={24} /></a></div>
      <div className="showcase-viewport" ref={viewport}>
        <motion.div ref={track} className="showcase-track" style={reduced ? undefined : { x }}>
          {PROJECTS.map((project, index) => <motion.a key={project.id} href={`#project-${project.id}`} className="showcase-project" onFocus={() => revealProject(index)} whileHover={reduced ? undefined : { y: -8 }} transition={{ type: 'spring', stiffness: 220, damping: 24 }}>
            <div className="showcase-image"><img src={project.image} alt={`Vista de ${project.title}`} loading="lazy" /><span className="showcase-scan" aria-hidden="true" /></div>
            <div className="showcase-caption"><span className="record-index">{String(index + 1).padStart(2, '0')}</span><h3>{project.title}</h3><ArrowUpRight size={20} /></div>
            <p>{project.tags.join(' / ')}</p>
          </motion.a>)}
        </motion.div>
      </div>
      <div className="showcase-meter" aria-hidden="true"><motion.div style={{ scaleX: reduced ? 1 : scrollYProgress }} /></div>
      <div className="showcase-ticker" aria-hidden="true"><motion.div style={reduced ? undefined : { x: tickerX }}>REACT + TYPESCRIPT / NODE.JS + MONGODB / DISEÑO + DESARROLLO / REACT + TYPESCRIPT / NODE.JS + MONGODB</motion.div></div>
    </div>
  </section>
}
