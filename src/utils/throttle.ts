/**
 * Returns a throttled version of the function using requestAnimationFrame or setTimeout.
 *
 * Uses requestAnimationFrame for immediate/frame-based throttling (ms = 0)
 * and setTimeout for longer delays to avoid unnecessary RAF calls.
 *
 * @param fn - The function to throttle.
 * @param ms - The number of milliseconds to wait for the throttled function to be called again
 */
export function throttle<Args extends Array<unknown>>(
  fn: (...args: Args) => void,
  ms = 0
): { (...args: Args): void; cancel: () => void } {
  let isThrottled = false
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let frameId: number | null = null

  function throttled(...args: Args) {
    if (isThrottled) return

    isThrottled = true

    // For delays longer than one frame (16ms), use setTimeout
    // For immediate or frame-based throttling, use requestAnimationFrame
    if (ms > 16) {
      timeoutId = setTimeout(() => {
        fn(...args)
        isThrottled = false
        timeoutId = null
      }, ms)
    } else {
      frameId = requestAnimationFrame(() => {
        fn(...args)
        isThrottled = false
        frameId = null
      })
    }
  }

  throttled.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    if (frameId !== null) {
      cancelAnimationFrame(frameId)
      frameId = null
    }
    isThrottled = false
  }

  return throttled
}
