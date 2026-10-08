import * as React from "react"

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(reducedMotionQuery)
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}

export function useReducedMotion() {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  )
}

/**
 * Steps through `count` stages every `intervalMs`. Holds while `held` (hover/focus),
 * while scrolled out of view, when the viewer pauses it, or under reduced motion.
 * `run` increments on every step so live content can remount and replay.
 */
export function useStepper(count: number, intervalMs: number, ref: React.RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion()
  const [active, setActive] = React.useState(0)
  const [run, setRun] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [held, setHeld] = React.useState(false)
  const [visible, setVisible] = React.useState(true)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])

  const playing = !reduced && !paused && !held && visible

  React.useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => {
      setActive((a) => (a + 1) % count)
      setRun((r) => r + 1)
    }, intervalMs)
    return () => window.clearTimeout(id)
  }, [playing, active, count, intervalMs])

  const select = React.useCallback((i: number) => {
    setActive(i)
    setRun((r) => r + 1)
  }, [])

  return { active, run, playing, reduced, paused, setPaused, setHeld, select }
}
