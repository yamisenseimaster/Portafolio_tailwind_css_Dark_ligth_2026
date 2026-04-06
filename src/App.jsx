import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import HeroSection from './components/sections/HeroSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import About from './components/sections/About'
import ContactSection from './components/sections/ContactSection'
import Footer from './components/sections/Footer'

const App = () => {
  return (
    <ThemeProvider>
      <div >
        <Navbar />
        <HeroSection />
       <SkillsSection />
       <ProjectsSection/>
       <About/>
       <ContactSection/>
       <Footer/>
    </div>     
    </ThemeProvider>
    
  )
}

export default App