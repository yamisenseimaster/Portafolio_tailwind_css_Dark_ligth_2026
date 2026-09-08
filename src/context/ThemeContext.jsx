import {createContext, useContext, useState, useEffect}from 'react';
import { COLOR_PALETTES } from '../utils/colorPalettes';

const ThemeContext = createContext();
export const ThemeProvider = ({children}) => {
    const [isDarkMode, toggleDarkMode] = useState(
        localStorage.getItem('theme') || 'light'
    );
    const [colorPalette, setColorPalette] = useState(() => {
        const saved = localStorage.getItem('color-palette');
        return COLOR_PALETTES.some(({ id }) => id === saved) ? saved : 'matrix';
    });
    useEffect(() => {
        const root = window.document.documentElement;
        if(isDarkMode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', isDarkMode);
    }, [isDarkMode]);
    useEffect(() => {
        window.document.documentElement.dataset.palette = colorPalette;
        localStorage.setItem('color-palette', colorPalette);
    }, [colorPalette]);
    return (
        <ThemeContext.Provider 
            value={{isDarkMode: isDarkMode === 'dark', toggleDarkMode, colorPalette, setColorPalette}}
            >
            {children}
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
