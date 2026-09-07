/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/static-components */
import {useRef} from 'react'
import {
    motion,
    useInView,
} from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import {
    Mail,
    Heart,
    ArrowUp,
    Code2
} from "lucide-react"
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { containerVariants, itemVariants } from '../../utils/Helper'
const Footer = () => {

    const { isDarkMode } = useTheme();
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, margin: '-50px' });

    const socialLinks = [
        {
            name: 'GitHub',
            icon: FiGithub,
            url: "https://github.com",
            color:"hover:text-gray-400"
        },
        {
            name: 'LinkedIn',
            icon: FiLinkedin,
            url: "https://linkedin.com",
            color:"hover:text-blue-400"
        },
        {
            name: 'Twitter',
            icon: FiTwitter,
            url: "https://twitter.com",
            color:"hover:text-sky-400"
        },
        {
            name: 'Correo',
            icon: Mail,
            url: "mailto:H6NlW@example.com",
            color:"hover:text-green-400"
        }
    ];
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    // Animated Gradient Line Component
    const AnimatedGradientLine = () => (
        <div className='absolute top-0 left-0 w-full overflow-hidden'>
            <motion.div
                className={`h-px bg-gradient-to-r ${
                    isDarkMode
                        ? 'from-transparent via-[#00ed9a] to-transparent'
                        : 'from-transparent via-[#b80e4d] to-transparent'
                }`}
                initial={{ width: "0%", opacity: 0 }}
                animate={isInView ? { width: "100%", opacity: 1 } :{}}
                transition={{duration: 1.5, ease:"easeInOut"}}
                
            />
            <motion.div
                className={`absolute top-0 h-px bg-gradient-to-r ${
                    isDarkMode
                        ? 'from-[#00ed9a] via-[#ea2478] to-[#00ed9a]'
                        : 'from-[#b80e4d] via-[#00dc9d] to-[#b80e4d]'
                } blur-sm`}
                
                animate={{
                    x: ["-50%", "calc(100vw + 50%)"],
                }}
                transition={{
                    x:{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 6,
                        ease: "linear",
                        delay:1
                    }
                }}
            />
        </div>
    );
        
    return (
        <footer
                ref={footerRef}
                className="cyber-section overflow-hidden"
        >
        {/*Animated Wave/Gradiant Line*/}
        <AnimatedGradientLine />
        
        <div className='relative z-10 px-6 py-16'>
                <div className='max-w-6xl mx-auto'>
                    {/*Main footer Content*/}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className='text-center space-y-8'
                    >
                        {/*Logo Brand*/}
                        <motion.div variants={itemVariants} className='space-y-4'>
                            <motion.div
                                className='inline-flex items-center space-x-2 text-2xl font-medium'
                                whileHover={{scale: 1.05}}
                                transition={{type:  "spring", stiffness: 400}}
                            >
                                <motion.div
                                    animates={{rotate: 360}}
                                    transition={{repeat: Infinity, duration: 20, ease: "linear"}}
                                    className='cyber-accent-text'
                                >
                                    <Code2 size={28}/>
                                </motion.div>
                                <span>Yamil Cazon</span>
                            </motion.div>
                            <motion.p
                                variants={itemVariants}
                                className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md mx-auto `}
                            >
                                Creando experiencias digitales con pasión y precisión. © 2024 Yamil Cazon. Todos los derechos reservados.
                            </motion.p>
                        </motion.div>

                        {/*Social Links*/}
                        <motion.div variants={itemVariants} className='flex justify-center space-x-6'>
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 rounded-full transition-colors duration-300${
                                        isDarkMode 
                                        ? 'bg-[#0d1b1d]/70 hover:bg-[#0d1b1d]/90' 
                                        : 'bg-white/55 hover:bg-white/80'
                                    } ${social.color} backdrop-blur-sm`}
                                    whileHover={{ scale: 1.2, y:-2, rotate: [0, -5, 5, 0]}}
                                    whileTap={{scale:0.95}}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 300 }} 
                                    
                                >
                                    <social.icon size={20}/>
                                </motion.a>
                            ))}

                        </motion.div>
                        {/*Divider*/}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center space-x-4"
                        >
                            <div className={`h-px w-16 ${isDarkMode ? 'bg-[#00ed9a]/25' : 'bg-[#b80e4d]/20'}`}/>
                            <motion.div
                                animate={{scale: [1, 1.2, 1]}}
                                transition={{duration: 2, repeat: Infinity}}
                                className='text-red-500 '
                            >
                                <Heart size={16} fill="currentColor"/>
                            </motion.div>
                            <div className={`h-px w-16 ${isDarkMode ? 'bg-[#00ed9a]/25' : 'bg-[#b80e4d]/20' }`}/>
                        </motion.div>
                        {/*Copyright*/}
                        <motion.div variants={itemVariants} className="space-y-2">
                            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'

                            }`}>
                                © {new Date().getFullYear()} Yamil Cazon. Todos los derechos reservados.
                            </p>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-600' : 'text-gray-500' } `}>
                                Diseñado y desarrollado con <Heart size={14} fill="currentColor" className='inline-block mx-1'/> por Yamil Cazon
                            </p>
                        </motion.div>
                        {/*Back to Top Button*/}
                        <motion.div variants={itemVariants}>
                            <motion.button
                                onClick={scrollToTop}
                                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300  ${
                                    isDarkMode 
                                    ? 'bg-[#0d1b1d]/65 hover:bg-[#0d1b1d]/85 text-gray-400 hover:text-[#00ed9a]' 
                                    : 'bg-white/55 hover:bg-white/80 text-gray-600 hover:text-[#b80e4d]'
                                } backdrop-blur-sm border ${isDarkMode ? 'border-[#00ed9a]/20' : 'border-[#b80e4d]/18'}`}
                                whileHover={{ scale: 1.05, y:-2, boxShadow: isDarkMode ? '0px 10px 25px rgba(59, 30, 246, 0.15)' : '0px 10px 25px rgba(59, 130, 246, 0.1)' }}
                                whileTap={{ scale: 0.95 }}                                 
                            >
                                <ArrowUp size={16}/>
                                <span>Volver arriba</span>
                            </motion.button>
                        </motion.div>

                    </motion.div>
                </div>
        </div>

    
    </footer>
    
)
}

export default Footer
