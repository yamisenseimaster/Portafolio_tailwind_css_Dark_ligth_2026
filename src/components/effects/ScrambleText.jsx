import { useEffect, useRef } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]_';

export default function ScrambleText({ text }) {
  const output = useRef(null);
  useEffect(() => {
    const element = output.current;
    const trigger = element.closest('a, button') || element;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    const restore = () => { cancelAnimationFrame(frame); element.textContent = text; };
    const scramble = () => {
      restore();
      if (preference.matches) return;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / 650, 1);
        element.textContent = Array.from(text, (letter, index) =>
          letter === ' ' || index < progress * text.length
            ? letter : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ).join('');
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    scramble();
    trigger.addEventListener('pointerenter', scramble);
    trigger.addEventListener('focus', scramble);
    preference.addEventListener('change', restore);
    return () => {
      restore();
      trigger.removeEventListener('pointerenter', scramble);
      trigger.removeEventListener('focus', scramble);
      preference.removeEventListener('change', restore);
    };
  }, [text]);
  return <span className="scramble-text"><span className="scramble-reserve">{text}</span><span ref={output} className="scramble-output" aria-hidden="true">{text}</span></span>;
}
