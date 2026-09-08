import { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { Code2, Pause, Play, RotateCcw } from 'lucide-react'
import './CodeWindow.css'

const lines = [
  [['keyword', 'import '], ['name', 'React '], ['keyword', 'from '], ['string', "'react'"]],
  [],
  [['keyword', 'const '], ['name', 'Yamil '], ['plain', '= () => {']],
  [['keyword', '  return '], ['plain', '(']],
  [['plain', '    <'], ['tag', 'Developer']],
  [['plain', '      '], ['attribute', 'nombre'], ['plain', '='], ['string', '"Yamil Cazon"']],
  [['plain', '      '], ['attribute', 'stack'], ['plain', '='], ['string', '"React + Node.js"']],
  [['plain', '      '], ['attribute', 'pasión'], ['plain', '='], ['string', '"Crear lo imposible"']],
  [['plain', '    />']],
  [['plain', '  )']],
  [['plain', '}']],
  [],
  [['keyword', 'export default '], ['name', 'Yamil']],
]
const source = lines.map(line => line.map(([, text]) => text).join('')).join('\n')
const total = source.length
let offset = 0
const preparedLines = lines.map(line => {
  const start = offset
  const tokens = line.map(([kind, text]) => {
    const token = { kind, text, offset }
    offset += text.length
    return token
  })
  const end = offset
  offset += 1
  return { start, end, tokens }
})

export default function CodeWindow() {
  const ref = useRef(null)
  const visible = useInView(ref, { amount: 0.2 })
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)
  const [paused, setPaused] = useState(false)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 90, damping: 22 })
  const y = useSpring(pointerY, { stiffness: 90, damping: 22 })
  const shown = reduced ? total : Math.min(count, total)
  const complete = shown === total

  useEffect(() => {
    if (!visible || paused || reduced) return
    // Keep the finished snippet visible before the next writing cycle.
    const timer = window.setInterval(() => setCount(value => value >= total + 150 ? 0 : value + 2), 45)
    return () => window.clearInterval(timer)
  }, [visible, paused, reduced])

  const move = event => {
    if (reduced || event.pointerType !== 'mouse') return
    const bounds = ref.current.getBoundingClientRect()
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12)
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 10)
  }

  return <motion.div ref={ref} className="code-stage" initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 38 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.45, duration: 1.2, ease: [0.22, 1, 0.36, 1] }} onPointerMove={move} onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }}>
    <motion.div className="code-float" animate={{ y: !reduced && visible && !paused ? [0, -7, 0] : 0 }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
      <motion.div className="code-window" style={reduced ? {} : { x, y }}>
        <header className="code-titlebar">
          <span className="code-window-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="code-filename"><Code2 size={13} /> perfil.jsx</span>
          <div className="code-tools">
            <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Reanudar animación' : 'Pausar animación'} title={paused ? 'Reanudar animación' : 'Pausar animación'} disabled={Boolean(reduced)}>{paused ? <Play size={13} /> : <Pause size={13} />}</button>
            <button type="button" onClick={() => { setCount(0); setPaused(false) }} aria-label="Repetir escritura" title="Repetir escritura" disabled={Boolean(reduced)}><RotateCcw size={13} /></button>
          </div>
        </header>
        <div className="code-body">
          <pre className="sr-only">{source}</pre>
          <div className="code-lines" aria-hidden="true">{preparedLines.map((line, index) => {
            const active = shown >= line.start && shown <= line.end
            return <div className={`code-line ${active && !complete ? 'code-line-active' : ''}`} key={index}>
              <span className="code-line-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="code-line-content">{line.tokens.map(({ kind, text, offset }, tokenIndex) => {
                const visibleText = text.slice(0, Math.max(0, shown - offset))
                return <span className={`syntax-${kind}`} key={tokenIndex}>{visibleText}</span>
              })}{active && !complete && <span className={`code-caret ${paused ? 'is-paused' : ''}`} />}</span>
            </div>
          })}</div>
        </div>
        <footer className="code-statusbar"><span><i className={complete ? 'code-ready' : ''} />{complete ? 'Listo para crear' : paused ? 'En pausa' : 'Construyendo ideas'}</span><span>UTF-8 / JSX</span></footer>
        <motion.div className="code-light-pass" aria-hidden="true" animate={{ x: !reduced && visible && !paused ? ['-160%', '260%'] : '-160%' }} transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 8, ease: 'easeInOut' }} />
      </motion.div>
    </motion.div>
    <div className="code-caption" aria-hidden="true"><span>&lt; ideas /&gt;</span><span>convertidas en experiencias</span></div>
  </motion.div>
}
