const TextInput = ({isDarkMode, value, handleInputChange, textarea, label}) => {
  const InputComponents = textarea ? "textarea" : "input";
  return (
    <div className='relative '>
        <InputComponents
            type="text"
            className={`w-full px-4 pt-6 pb-2 border rounded-lg transition-all duration-300 outline-none resize-none ${
                textarea ? 'min-h-36' : ''
            } ${
                isDarkMode ? "bg-[#0d1b1d]/65 border-[#00ed9a]/20 text-white focus:border-[#00ed9a] focus:bg-[#0d1b1d]/85" 
                : "bg-white/65 border-[#b80e4d]/18 text-gray-900 focus:border-[#b80e4d] focus:bg-white/90"
            }`}
            value={value}
            onChange={({target}) => handleInputChange(label, target.value)}
        />
        <label className='text-sm absolute left-4 top-2 pointer-events-none origin-left '>
            {label}
        </label>
        
    </div>
    )
}

export default TextInput
