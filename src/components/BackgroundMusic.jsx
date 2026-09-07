import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import track from '../music/Enya_-_Caribbean_Blue_432_(mp3.pm).mp3'
import { useTheme } from '../context/ThemeContext'

export default function BackgroundMusic() {
  const { isDarkMode } = useTheme()
  const audioRef = useRef(null)
  const playRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const audio = new Audio(track)
    audio.preload = 'metadata'
    audio.volume = 0
    audioRef.current = audio
    let disposed = false
    let frame = 0
    let last = 0
    let gain = 0
    let enabled = true
    try { enabled = localStorage.getItem('music-muted') !== 'true' } catch { /* Storage may be unavailable. */ }

    // Combine the track envelope with a separate gain for smooth user toggles.
    const tick = now => {
      const elapsed = last ? Math.min((now - last) / 1000, 0.1) : 0
      last = now
      gain += ((enabled ? 1 : 0) - gain) * Math.min(1, elapsed * 5)
      const remaining = Number.isFinite(audio.duration) ? audio.duration - audio.currentTime : Infinity
      const envelope = Math.max(0, Math.min(1, audio.currentTime / 4, remaining / 6))
      audio.volume = 0.32 * envelope * gain
      if (!enabled && gain < 0.005) {
        audio.pause()
        audio.volume = 0
        frame = 0
        return
      }
      frame = requestAnimationFrame(tick)
    }
    const start = async () => {
      try {
        await audio.play()
        if (disposed) return
        setFailed(false)
        setPlaying(enabled)
        if (!frame) { last = 0; frame = requestAnimationFrame(tick) }
      } catch {
        if (!disposed) setPlaying(false)
      }
    }
    const save = () => {
      try { localStorage.setItem('music-muted', String(!enabled)) } catch { /* Playback still works without storage. */ }
    }
    playRef.current = () => {
      enabled = audio.paused ? true : !enabled
      save()
      setPlaying(enabled)
      if (enabled) void start()
    }
    const firstInteraction = event => {
      if (event.target.closest?.('[data-music-control]')) return
      if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return
      removeListeners()
      if (enabled) void start()
    }
    const removeListeners = () => {
      window.removeEventListener('pointerdown', firstInteraction)
      window.removeEventListener('keydown', firstInteraction)
    }
    const repeat = () => {
      cancelAnimationFrame(frame)
      frame = 0
      audio.currentTime = 0
      audio.volume = 0
      gain = 0
      if (enabled) void start()
    }
    const onError = () => {
      cancelAnimationFrame(frame)
      frame = 0
      setPlaying(false)
      setFailed(true)
    }
    audio.addEventListener('ended', repeat)
    audio.addEventListener('error', onError)
    window.addEventListener('pointerdown', firstInteraction)
    window.addEventListener('keydown', firstInteraction)
    return () => {
      disposed = true
      removeListeners()
      cancelAnimationFrame(frame)
      audio.removeEventListener('ended', repeat)
      audio.removeEventListener('error', onError)
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      audioRef.current = null
      playRef.current = null
    }
  }, [])

  const label = failed ? 'Reintentar música' : playing ? 'Silenciar música' : 'Activar música'
  return <button type="button" data-music-control className={`music-control ${isDarkMode ? 'music-dark' : 'music-light'}`} onClick={() => playRef.current?.()} aria-label={label} aria-pressed={playing} title={label}>
    {playing ? <Volume2 size={19} /> : <VolumeX size={19} />}
    <span className={`music-bars ${playing ? 'is-playing' : ''}`} aria-hidden="true">{[0, 1, 2, 3].map(index => <i key={index} style={{ animationDelay: `${index * -0.18}s` }} />)}</span>
  </button>
}
