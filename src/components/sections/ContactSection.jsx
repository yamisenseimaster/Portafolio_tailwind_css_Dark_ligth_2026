import { useState, useRef } from "react"
import SuccessModal from "../SuccessModal"
import{
    // eslint-disable-next-line no-unused-vars
    motion,
    useInView

} from "framer-motion"

import { Send} from "lucide-react"
import { useTheme } from "../../context/ThemeContext"
import { CONTACT_INFO, SOCIAL_LINKS } from "../../utils/data"
import { containerVariants, itemVariants } from "../../utils/Helper"
import TextInput from "../input/TextInput"
const ContactSection = () => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {once: true, margin: '-100px'});

    const handleInputChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simula el envio del formulario
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setShowSuccess(true);
        setFormData({ name: "", email: "", message: "" });

        // Oculta automaticamente el modal despues de 3 segundos
        setTimeout(() => {setShowSuccess(false)}, 3000);


    };
    return <section
        id="contact"
        ref={sectionRef}
        className="cyber-section editorial-section overflow-hidden"
    >
    <div className="record-shell relative z-10" >
        {/*Section Header*/}
        <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="record-header"
        >
            <motion.div variants={itemVariants}>
                <div className="record-index">04 / Contacto</div>
                <div className="record-rule" />
                <p className="record-summary">¿Listo para empezar tu próximo proyecto? Contame la idea y armamos el siguiente paso.</p>
            </motion.div>
            <motion.h2 variants={itemVariants} className="record-title">
                Correspondencia
            </motion.h2>

        </motion.div>
    

    <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/*Contact Form* 1:37:1*/}
        <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="cyber-card cyber-card-hover record-card p-8"
            >
                <h3 className="text-2xl font-medium mb-8">Enviar mensaje</h3>
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <TextInput
                            isDarkMode={isDarkMode}
                            value={formData.name}
                            handleInputChange={(text) =>
                                handleInputChange("name", text)
                            }
                            label="Nombre "
                        />
                        <TextInput
                            isDarkMode={isDarkMode}
                            label="Correo"
                            value={formData.email}
                            handleInputChange={(text) =>
                                handleInputChange("email", text)
                            }
                        />
                    </div>

                    <TextInput
                        isDarkMode={isDarkMode}
                        label="Mensaje"
                        value={formData.message}
                        textarea
                        handleInputChange={(text) =>
                            handleInputChange("message", text)
                        }
                    />
                    <motion.button
                        disabled={isSubmitting}
                        whileHover={{y:-2, scale: 1.02}}
                        whileTap={{scale:0.98}}
                        className="cyber-cta w-full disabled:opacity-60 text-sm py-4 rounded-lg uppercase tracking-wider font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? (
                            <>
                                <motion.div
                                    animate={{rotate:360}}
                                    transition={{duration:1, repeat: Infinity, ease: "linear"}}
                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                />
                                <span>Enviando...</span>
                            </>
                        ) : (
                            <>
                                <Send size={18}/>
                                <span>Enviar</span>
                            </>
                        )}
                       

                    </motion.button>
                </div>
            </motion.div>

        </motion.div>

        {/*Contact Info & Social Link*/}
        <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-8"
        >
            {/* Contact Info */}
            <motion.div variants={itemVariants}>
                    <h3 className="text-2xl font-medium mb-6">Información de contacto</h3>
                    <div className="space-y-4">
                        
                        {CONTACT_INFO.map((info) => (
                            <motion.div
                                key={info.label}
                                variants={itemVariants}
                                whileHover={{ x: 4}}
                                className="cyber-card cyber-card-hover record-card flex items-center space-x-4 p-4 transition-all duration-300"
                            >
                                <div className="cyber-icon p-3 rounded-lg">
                                    <info.icon size={20}/>
                                </div>
                                <div>
                                    <div
                                        className={`text-sm ${
                                            isDarkMode ? "text-gray-500" : "text-gray-600"
                                        } `}
                                    >
                                        {info.label}
                                    </div>
                                    <div className="font-medium">{info.value}</div>
                                </div>

                            </motion.div>
                        ))}
                    </div>
            </motion.div>
            {/*Social Links*/}
            <motion.div variants={itemVariants}>
                    <h3 className="text-xl font-medium mb-6">Seguime</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {SOCIAL_LINKS.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{scale: 1.05, y:-2}}
                                className={`cyber-card cyber-card-hover record-card flex items-center space-x-3 p-4 transition-all duration-300 ${social.color}`}
                            >
                                 <social.icon size={20}/>
                                <span className="font-medium">{social.name}</span>
                            </motion.a>
                        ))}
                    </div>
            </motion.div>
            {/* Availability Status*/}
            <motion.div
                variants={itemVariants}
                className={`p-6 rounded-lg border ${
                    isDarkMode 
                    ? "bg-green-500/10 border-green-500/30" 
                    : "bg-green-50 border-green-200"
                }`}
            >
                <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse "/>
                        <span className="font-medium text-green-500">
                            Disponible para trabajar
                        </span>
                </div>
                    <p
                        className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                        Actualmente estoy abierto a nuevas oportunidades y colaboraciones. Si tenés un proyecto en mente o simplemente querés saludar, escribime.
                    </p>
               
        </motion.div>

        </motion.div>
        {/*bottom CTA*/}
        <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mt-20"
        >
            <motion.div
                variants={itemVariants}
                className="cyber-card cyber-card-hover record-card max-w-2xl mx-auto p-8"
            >
                <h3 className="text-xl font-medium mb-4">¿Preferís una llamada rápida?</h3>
                <p
                    className={`${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                    }mb-6`}
                >
                    A veces una charla breve es más efectiva que varios correos. Si preferís hablar de tu proyecto por llamada, coordinamos un horario que te quede cómodo.
                </p>
                <motion.button
                    whileHover={{y:-2, scale: 1.05}}
                    whileTap={{scale:0.98}}
                    className="cyber-outline px-6 py-3 rounded-full font-medium transition-all duration-300"
                >
                    Agendar llamada
                </motion.button>


            </motion.div>

        </motion.div>

    </div>

                <SuccessModal 
                    showSuccess={showSuccess} 
                    setShowSuccess={setShowSuccess} 
                />
    </div>
  </section>
}

export default ContactSection
