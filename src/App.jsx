import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import HeroSection from './components/sections/HeroSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import About from './components/sections/About'
import ContactSection from './components/sections/ContactSection'
import Footer from './components/sections/Footer'
import { MotionConfig } from 'framer-motion'
import BackgroundMusic from './components/BackgroundMusic'
import ScrollProgress from './components/effects/ScrollProgress'
import ScrollShowcase from './components/effects/ScrollShowcase'

const App = () => {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
      <div >
        <ScrollProgress />
        <BackgroundMusic />
        <Navbar />
        <HeroSection />
        <ScrollShowcase />
       <ProjectsSection/>
       <About/>
       <SkillsSection />
       <ContactSection/>
       <Footer/>
    </div>     
      </MotionConfig>
    </ThemeProvider>
    
  )
}

export default App
