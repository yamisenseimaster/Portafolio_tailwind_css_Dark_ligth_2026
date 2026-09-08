import { useEffect, useState } from 'react';
import {
    // eslint-disable-next-line no-unused-vars
    motion,
    AnimatePresence,
} from 'framer-motion';
import{
    Sun,
    Moon,
    Menu,
    X,
} from "lucide-react";
import { useTheme } from '../context/ThemeContext';

const navItems = [
    { label: "Hogar", sectionId: "home" },
    { label: "Proyectos", sectionId: "work" },
    { label: "Perfil", sectionId: "about" },
    { label: "Experiencia", sectionId: "skills" },
    { label: "Contacto", sectionId: "contact" },
];

const Navbar = () => {
    const {isDarkMode, toggleDarkMode} = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const updateActiveSection = () => {
            const current = navItems.findLast(({ sectionId }) => {
                const element = document.getElementById(sectionId);
                return element && element.getBoundingClientRect().top <= 140;
            });
            if (current) setActiveSection(current.sectionId);
        };
        updateActiveSection();
        window.addEventListener('scroll', updateActiveSection, { passive: true });
        return () => window.removeEventListener('scroll', updateActiveSection);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
            setIsMenuOpen(false);
        }
    };
  return <motion.nav
        style={{opacity: 1}}
        className={`cyber-nav fixed top-0 w-full z-50 border-t backdrop-blur-[6px] transition-colors duration-500 ${
            isDarkMode
                ? "border-white/10 bg-[#101c1f]/20 text-[#eef5f2]"
                : "border-black/10 bg-[#f2f3f5]/25 text-[#20282b]"
        }`}
    >
    <div className='mx-auto flex h-[86px] max-w-[1060px] items-center justify-between px-6'>
        <motion.div
            whileHover={{ scale: 1.05 }}
            className='flex flex-col leading-none'
        >
            <span className='font-bold tracking-wide'>Yamil Cazon</span>
            <span className={`mt-2 font-mono text-[11px] tracking-[0.18em] ${
                isDarkMode ? 'text-white/55' : 'text-black/45'
            }`}>ヤミル</span>
        </motion.div>

        {/* Desktop Navegattion */}
        <div className='hidden lg:flex items-center gap-8'>
            {navItems.map((item) => (

                <motion.button
                    key={item.sectionId}
                    whileHover={{ y: -2 }}
                    onClick={() => scrollToSection(item.sectionId)}
                    className={`relative h-[86px] text-sm font-bold transition-colors ${
                        activeSection === item.sectionId
                            ? "text-[var(--accent)]"
                            : isDarkMode ? "text-white/62 hover:text-white" : "text-black/62 hover:text-black"
                    }`}
                >
                    {item.label}
                    {activeSection === item.sectionId && (
                        <span className="absolute bottom-[25px] left-0 h-[2px] w-full bg-[var(--accent)]" />
                    )}
                </motion.button>
            ))}
            <span className={`text-sm font-bold ${isDarkMode ? "text-white/62" : "text-black/55"}`}>NO</span>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{scale: 0.95}}
                onClick={() => toggleDarkMode(isDarkMode ? 'light' : 'dark')}
                aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
                title={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
                className={`p-2 transition-colors ${
                    isDarkMode 
                    ? "text-white/62 hover:text-[var(--accent)]" 
                    : "text-black/62 hover:text-[var(--accent)]"
                }`}
            >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}

            </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className='lg:hidden flex items-center space-x-4'>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{scale: 0.95}}
                onClick={() => toggleDarkMode(isDarkMode ? 'light' : 'dark')}
                aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
                title={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
                className={`p-2 transition-colors ${
                    isDarkMode 
                    ? "text-white/62 hover:text-[var(--accent)]" 
                    : "text-black/62 hover:text-[var(--accent)]"
                }`}
            >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{scale: 0.95}}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMenuOpen}
                className={`p-2 transition-colors ${
                    isDarkMode                     
                    ? "text-white/62 hover:text-[var(--accent)]" 
                    : "text-black/62 hover:text-[var(--accent)]"
                }`}
            >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
         
        </div>
    </div>
    {/* Mobile menu */}
    <AnimatePresence>
        {isMenuOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`lg:hidden mx-6 mb-4 border p-4 backdrop-blur-md ${
                    isDarkMode ? "border-white/10 bg-[#101c1b]/82" : "border-black/10 bg-[#f2f3f5]/82"
                }`}
            >
                {navItems.map((item) => (
                    <motion.button
                        key={item.sectionId}
                        whileHover={{ y: 5 }}
                        onClick={() => scrollToSection(item.sectionId)}
                        className={`block w-full py-3 text-left text-sm font-bold transition-colors ${
                            activeSection === item.sectionId
                                ? "text-[var(--accent)]"
                                : isDarkMode ? "text-white/62 hover:text-white" : "text-black/62 hover:text-black"
                        }`}
                    >
                        {item.label}  
                    </motion.button>
                ))}
            </motion.div>
        )}
    </AnimatePresence>
   </motion.nav>     
    
       
}

export default Navbar
