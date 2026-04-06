import {
      // eslint-disable-next-line no-unused-vars
      motion,
      AnimatePresence,     
} from "framer-motion"
import { CheckCircle, X, Sparkles} from "lucide-react"
const SuccessModal = ({ showSuccess, setShowSuccess, isDarkMode }) => {
  
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
        className={`relative p-8 rounded-2xl border max-w-sm w-full text-center ${
            isDarkMode 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-200"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowSuccess(false)}
          className={`absolute top-4 right-4 p-1 rounded-full transition-colors ${
            isDarkMode ? " hover:bg-gray-700" : " hover:bg-gray-100"
          }`}
        >
          <X size={18} />
        </button>

        <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-500 mb-6"
              >
            <CheckCircle size={32} className="text-white" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-medium mb-2"
          >
            Success! Your message has been sent.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={` ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }mb-6`}
          >
            Thank you for reaching out. I'll get back to you as soon as possible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <Sparkles size={20} className=" text-yellow-400" />
          </motion.div>
      </motion.div>
      </motion.div>
    )}

  </AnimatePresence>
}

export default SuccessModal