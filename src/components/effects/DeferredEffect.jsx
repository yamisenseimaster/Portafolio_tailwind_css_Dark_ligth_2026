import { useEffect, useState } from 'react'

export default function DeferredEffect({ children }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let idle
    const timer = window.setTimeout(() => {
      if ('requestIdleCallback' in window) {
        idle = window.requestIdleCallback(() => setReady(true), { timeout: 700 })
      } else setReady(true)
    }, 200)
    return () => {
      window.clearTimeout(timer)
      if (idle !== undefined) window.cancelIdleCallback(idle)
    }
  }, [])
  return ready ? children : null
}
