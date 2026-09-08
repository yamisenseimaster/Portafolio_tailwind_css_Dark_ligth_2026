import { useEffect, useRef } from 'react';
import { COLOR_PALETTES } from '../../utils/colorPalettes';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/{}[]()=+-_:;';

export default function MatrixRain({ isDarkMode, colorPalette }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let glyphs = [];
    let frame;
    let previous = 0;
    let visible = true;
    let cellSize = 17;
    const startedAt = performance.now();
    const selectedPalette = COLOR_PALETTES.find(({ id }) => id === colorPalette) || COLOR_PALETTES[0];
    const accent = isDarkMode ? selectedPalette.dark : selectedPalette.light;
    const raw = accent.replace('#', '');
    const accentRgb = raw.length === 6
      ? `${parseInt(raw.slice(0, 2), 16)},${parseInt(raw.slice(2, 4), 16)},${parseInt(raw.slice(4, 6), 16)}`
      : '0,237,154';
    const colors = {
      dim: `rgba(${accentRgb},.52)`,
      mid: accent,
      hot: isDarkMode ? '#eafff8' : '#ffffff',
      veil: isDarkMode ? 'rgba(7, 16, 14, 0.18)' : 'rgba(246, 247, 249, 0.2)',
      sweep: `rgba(${accentRgb},${isDarkMode ? '.16' : '.2'})`,
    };
    const paint = (advance = false, now = 0) => {
      context.clearRect(0, 0, width, height);
      context.font = '800 13px "Lucida Console", "Cascadia Mono", Consolas, monospace';
      context.textBaseline = 'top';
      const transitionPulse = Math.max(0, 1 - (now - startedAt) / 1500);
      const sweepX = width * (1 - transitionPulse);
      glyphs.forEach(glyph => {
        const pulse = Math.sin(now * glyph.pulseSpeed + glyph.seed) * 0.5 + 0.5;
        const flicker = Math.random() < glyph.flashRate;
        const distanceToSweep = Math.abs(glyph.x - sweepX);
        const sweepBoost = transitionPulse * Math.max(0, 1 - distanceToSweep / 190) * 0.58;
        context.globalAlpha = flicker ? 0.95 : Math.min(0.9, glyph.alpha + pulse * glyph.pulse + sweepBoost);
        context.fillStyle = flicker ? colors.hot : (glyph.hot ? colors.mid : colors.dim);
        context.fillText(glyph.char, glyph.x, glyph.y);
        if (advance) {
          glyph.y += glyph.speed;
          if (glyph.y > height + cellSize) glyph.y = -cellSize;
          if (Math.random() < glyph.swapRate) glyph.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      });
      context.globalAlpha = 1;
      if (transitionPulse > 0) {
        const gradient = context.createLinearGradient(sweepX - 170, 0, sweepX + 170, 0);
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(0.5, colors.sweep);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      }
      context.fillStyle = colors.veil;
      context.fillRect(0, 0, width, height);
    };
    const resize = () => {
      ({ width, height } = canvas.getBoundingClientRect());
      cellSize = width < 640 ? 20 : 19;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const columns = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      glyphs = Array.from({ length: columns * rows }, (_, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const hot = Math.random() > 0.7;
        return {
          x: column * cellSize + Math.random() * 4,
          y: row * cellSize + Math.random() * 4,
          char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          alpha: hot ? 0.26 + Math.random() * 0.22 : 0.09 + Math.random() * 0.16,
          pulse: hot ? 0.26 : 0.13,
          pulseSpeed: 0.0026 + Math.random() * 0.006,
          speed: 0.05 + Math.random() * 0.15,
          seed: Math.random() * 100,
          hot,
          flashRate: hot ? 0.009 : 0.002,
          swapRate: hot ? 0.06 : 0.032,
        };
      });
      paint(false, performance.now());
    };
    const tick = now => {
      if (now - previous > (width < 640 ? 66 : 50)) { paint(true, now); previous = now; }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden && !preference.matches) frame = requestAnimationFrame(tick);
      else if (preference.matches) paint();
    };
    const resizeObserver = new ResizeObserver(resize);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resize();
    resizeObserver.observe(canvas);
    observer.observe(canvas);
    preference.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      preference.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [isDarkMode, colorPalette]);
  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
}
