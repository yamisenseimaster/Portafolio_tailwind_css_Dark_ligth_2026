import { useState, useRef } from "react"
import SuccessModal from "../SuccessModal"
import{
    // eslint-disable-next-line no-unused-vars
    motion,
    useScroll,
    useTransform,
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

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const handleInputChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setShowSuccess(true);
        setFormData({ name: "", email: "", message: "" });

        // Auto hide success modal after 3 seconds
        setTimeout(() => {setShowSuccess(false)}, 3000);


    };
    return <section
        id="contact"
        ref={sectionRef}
        className={`py-24 px-6 ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } relative overflow-hidden`}
    >
    {/** Background Elements */}
    <motion.div
        style={{y}} className="absolute inset-0 overflow-hidden"
    >
        <div
            className={`absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-5 ${
                isDarkMode ? "bg-blue-500" : "bg-blue-400"
            }`}
        />

        <div
            className={`absolute bottom-40  right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5 ${
                isDarkMode ? "bg-purple-500" : "bg-purple-400"
            }`}
        />

    </motion.div>
        
    <div className="max-w-6xl mx-auto relative z-10" >
        {/*Section Header*/}
        <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-20"
        >
            <motion.div
                variants={itemVariants}
                className={`text-sm uppercase tracking-widest ${
                    isDarkMode ? "text-gray-500" : "text-gray-600"
                }mb-4`}
            >
                Let s Connect
            </motion.div>

            <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-5xl font-light mb-6"
            >
                Get In
                <span className="text-blue-500 font-medium">Touch</span>

            </motion.h2>
            <motion.p
                variants={itemVariants}
                className={`text-xl max-w.2xl mx-auto ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
            >
                Ready to start your next project? Lets discuss how can bring
                your ideas to life.
                
            </motion.p>

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
                className={` p-8 rounded-2xl border ${
                    isDarkMode 
                    ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm" 
                    : "bg-gray-50/50 border-gray-200 backdrop-blur-sm"
                }`}
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
                            label="Email"
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
                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white text-sm py-4 rounded-xl uppercase tracking-wider font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? (
                            <>
                                <motion.div
                                    animated={{rotate:360}}
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
                    <h3 className="text-2xl font-medium mb-6"> Contact Info</h3>
                    <div className="space-y-4">
                        
                        {CONTACT_INFO.map((info) => (
                            <motion.div
                                key={info.label}
                                variants={itemVariants}
                                whileHover={{ x: 4}}
                                className={`flex items-center space-x-4 p-4 rounded-xl ${
                                    isDarkMode 
                                    ? "bg-gray-800/30  hover:bg-gray-800/50" 
                                    : "hover:bg-gray-100/50 bg-gray-50/30"
                                } transition-all duration-300`}
                            >
                                <div className={`p-3 rounded-lg ${
                                    isDarkMode ? "bg-gray-700" : "bg-white"
                                }`}>
                                    <info.icon size={20} className="text-blue-500"/>
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
                    <h3 className="text-xl font-medium mb-6">Follow Me</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {SOCIAL_LINKS.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{scale: 1.05, y:-2}}
                                className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 ${
                                    isDarkMode 
                                    ? "bg-gray-800/30  border-gray-700 hover:border-gray-600" 
                                    : "bg-white/80 border-gray-200 hover:border-gray-300"
                                } ${social.bgcolor} ${social.color}`}
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
                className={`p-6 rounded-xl border ${
                    isDarkMode 
                    ? "bg-green-500/10 border-green-500/30" 
                    : "bg-green-50 border-green-200"
                }`}
            >
                <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse "/>
                        <span className="font-medium text-green-500">
                            Available for work
                        </span>
                </div>
                    <p
                        className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                        I m currently open to new opportunities and collaborations. If you have a project in mind or just want to say hi, feel free to reach out!
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
                className={` max-w-2xl mx-auto p-8 rounded-2xl border ${
                    isDarkMode
                    ? "bg-gray-800/30 border-gray-700"
                    : "bg-gray-50/50 border-gray-200"
                }`}
            >
                <h3 className="text-xl font-medium mb-4">Prefer a quick call?</h3>
                <p
                    className={`${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                    }mb-6`}
                >
                    Sometimes a quick chat can be more effective than emails. If you prefer to discuss your project over a call, let me know and we can schedule a time that works for you.
                </p>
                <motion.button
                    whileHover={{y:-2, scale: 1.05}}
                    whileTap={{scale:0.98}}
                    className={`px-6 py-3 rounded-full border font-medium transition-all duration-300 ${
                        isDarkMode
                        ? "border-gray-600 hover:border-blue-500   hover:text-blue-400"
                        : "border-gray-300 hover:border-blue-500   hover:text-blue-600"
                    }`}
                >
                    Schedule a Call
                </motion.button>


            </motion.div>

        </motion.div>

    </div>

                <SuccessModal 
                    showSuccess={showSuccess} 
                    setShowSuccess={setShowSuccess} 
                    isDarkMode={isDarkMode} 
                />
    </div>s
  </section>
}

export default ContactSection