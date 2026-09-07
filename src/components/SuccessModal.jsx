import {
      // eslint-disable-next-line no-unused-vars
      motion,
      AnimatePresence,     
} from "framer-motion"
import { CheckCircle, X, Sparkles} from "lucide-react"
const SuccessModal = ({ showSuccess, setShowSuccess }) => {
  
  return <AnimatePresence>
    {showSuccess && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setShowSuccess(false)}
      >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y:20 }}
        animate={{ scale: 1, opacity: 1, y:0 }}
        exit={{ scale: 0.8, opacity: 0, y:20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="cyber-card relative p-8 rounded-lg max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowSuccess(false)}
          className="absolute top-4 right-4 p-1 rounded-full transition-colors hover:bg-white/10"
        >
          <X size={18} />
        </button>

        <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="cyber-cta mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-6"
              >
            <CheckCircle size={32} className="text-white" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-medium mb-2"
          >
            ¡Listo! Tu mensaje fue enviado.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="cyber-muted-text mb-6"
          >
            Gracias por escribirme. Te voy a responder lo antes posible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <Sparkles size={20} className="cyber-accent-text" />
          </motion.div>
      </motion.div>
      </motion.div>
    )}

  </AnimatePresence>
}

export default SuccessModal
