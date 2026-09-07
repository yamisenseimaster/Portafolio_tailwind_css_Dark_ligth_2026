import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import MatrixRain from '../effects/MatrixRain';
import ScrambleText from '../effects/ScrambleText';
import CodeWindow from '../effects/CodeWindow';
import MagneticLink from '../effects/MagneticLink';
import './HeroSection.css';
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from 'framer-motion';

export default function HeroSection() {
  const { isDarkMode } = useTheme();
  const reduced = useReducedMotion();
  const entrance = (delay) => ({
    initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 24, filter: reduced ? 'blur(0px)' : 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: reduced ? 0 : 0.9, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });
  return (
    <section id="home" className={`cyber-hero ${isDarkMode ? 'cyber-dark' : 'cyber-light'}`}>
      <MatrixRain isDarkMode={isDarkMode} />
      <div className="cyber-content">
        <div className="cyber-copy">
          <motion.p {...entrance(0)} className="cyber-status"><span /> Disponible para nuevos proyectos</motion.p>
          <motion.h1 {...entrance(0.12)}><ScrambleText key={String(isDarkMode)} text="Yamil Cazon" /><span className="cyber-cursor" aria-hidden="true">_</span></motion.h1>
          <motion.p {...entrance(0.24)} className="cyber-role">Desarrollador Full Stack</motion.p>
          <motion.p {...entrance(0.34)} className="cyber-lead">Construyendo <mark>experiencias digitales</mark> que importan.</motion.p>
          <motion.p {...entrance(0.44)} className="cyber-description">Creo aplicaciones web que combinan creatividad y funcionalidad. Con pasión por el código y el diseño, convierto ideas en experiencias claras, útiles y memorables.</motion.p>
          <motion.ul {...entrance(0.54)} className="cyber-stack" aria-label="Tecnologías">
            {['React', 'Node.js', 'TypeScript', 'MongoDB'].map(tech => <li key={tech}>{tech}</li>)}
          </motion.ul>
          <motion.div {...entrance(0.64)} className="cyber-actions">
            <MagneticLink className="cyber-button cyber-primary" href="#work"><ScrambleText text="Ver proyectos" /><ArrowUpRight size={17} /></MagneticLink>
            <MagneticLink className="cyber-button" href="#contact"><ScrambleText text="Contactame" /><Mail size={17} /></MagneticLink>
          </motion.div>
        </div>
        <CodeWindow />
        <motion.nav {...entrance(0.8)} className="hero-contents" aria-label="Contenido del portafolio">
          <span>Contenido</span>
          <a href="#work">01 / Registros de trabajo <ArrowUpRight size={14} /></a>
          <a href="#about">02 / Perfil <ArrowUpRight size={14} /></a>
          <a href="#skills">03 / Hoja de servicio <ArrowUpRight size={14} /></a>
          <a href="#contact">04 / Correspondencia <ArrowUpRight size={14} /></a>
        </motion.nav>
      </div>
      <a className="cyber-scroll" href="#work" aria-label="Ir a proyectos" title="Ir a proyectos"><ArrowDown size={20} /></a>
    </section>
  );
}
