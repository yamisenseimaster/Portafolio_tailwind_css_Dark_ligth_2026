const TextInput = ({isDarkMode, value, handleInputChange, textarea, label, type = "text", name, required = false}) => {
  const InputComponents = textarea ? "textarea" : "input";
  return (
    <div className='relative '>
        <InputComponents
            type={textarea ? undefined : type}
            name={name}
            required={required}
            className={`theme-input w-full px-4 pt-6 pb-2 border rounded-lg transition-all duration-300 outline-none resize-none ${
                textarea ? 'min-h-36' : ''
            } ${
                isDarkMode ? "bg-[#0d1b1d]/65 text-white focus:bg-[#0d1b1d]/85" 
                : "bg-white/65 text-gray-900 focus:bg-white/90"
            }`}
            value={value}
            onChange={({target}) => handleInputChange(target.value)}
        />
        <label className='text-sm absolute left-4 top-2 pointer-events-none origin-left '>
            {label}
        </label>
        
    </div>
    )
}

export default TextInput
