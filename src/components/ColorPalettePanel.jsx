import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Palette, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { COLOR_PALETTES } from '../utils/colorPalettes';

export default function ColorPalettePanel() {
  const { colorPalette, setColorPalette } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [wave, setWave] = useState(null);
  const closeButtonRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.body.classList.toggle('palette-panel-open', isOpen);
    if (isOpen) requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => document.body.classList.remove('palette-panel-open');
  }, [isOpen]);

  useEffect(() => {
    const close = event => event.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const choosePalette = palette => {
    if (palette.id === colorPalette || wave) return;
    if (reducedMotion) {
      setColorPalette(palette.id);
      return;
    }
    setWave(palette);
    window.setTimeout(() => setColorPalette(palette.id), 180);
    window.setTimeout(() => setWave(null), 820);
  };

  return (
    <>
      <motion.button type="button" className="palette-trigger" onClick={() => setIsOpen(true)}
        whileHover={{ x: -4 }} whileTap={{ scale: 0.94 }} aria-label="Abrir selector de colores" title="Cambiar colores">
        <Palette size={19} />
      </motion.button>

      <AnimatePresence>
        {isOpen && <>
          <motion.button type="button" className="palette-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} aria-label="Cerrar selector de colores" />
          <motion.aside className="palette-panel" initial={{ x: '105%' }} animate={{ x: 0 }} exit={{ x: '105%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }} aria-label="Paleta de colores">
            <div className="palette-panel__header">
              <div><span>Personalización</span><h2>Elegí tu señal</h2></div>
              <button ref={closeButtonRef} type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar panel" title="Cerrar"><X size={20} /></button>
            </div>
            <p className="palette-panel__copy">La interfaz, la Matrix y sus luces cambian juntas.</p>
            <div className="palette-options">
              {COLOR_PALETTES.map(palette => {
                const selected = palette.id === colorPalette;
                return <motion.button type="button" key={palette.id} className={`palette-option${selected ? ' is-selected' : ''}`}
                  onClick={() => choosePalette(palette)} whileHover={{ x: -5 }} whileTap={{ scale: 0.98 }} aria-pressed={selected}>
                  <span className="palette-swatch" style={{ '--swatch-dark': palette.dark, '--swatch-light': palette.light }} />
                  <span>{palette.label}</span>{selected && <Check size={17} />}
                </motion.button>;
              })}
            </div>
            <div className="palette-panel__footer"><span /> Los colores se guardan automáticamente</div>
          </motion.aside>
        </>}
      </AnimatePresence>

      <AnimatePresence>
        {wave && <motion.div className="palette-wave" style={{ '--wave-color': wave.dark }}
          initial={{ clipPath: 'circle(0% at 100% 50%)', opacity: 0.7 }}
          animate={{ clipPath: 'circle(150% at 100% 50%)', opacity: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} />}
      </AnimatePresence>
    </>
  );
}
