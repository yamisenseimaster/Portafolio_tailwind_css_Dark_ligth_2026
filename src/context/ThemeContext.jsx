import {createContext, useContext, useState, useEffect}from 'react';

const ThemeContext = createContext();
export const ThemeProvider = ({children}) => {
    const [isDarkMode, toggleDarkMode] = useState(
        localStorage.getItem('theme') || 'light'
    );
    useEffect(() => {
        const root = window.document.documentElement;
        if(isDarkMode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', isDarkMode);
    }, [isDarkMode]);
    return (
        <ThemeContext.Provider 
            value={{isDarkMode: isDarkMode === 'dark', toggleDarkMode}}
            >
            {children}
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);