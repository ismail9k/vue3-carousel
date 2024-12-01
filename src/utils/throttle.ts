/**
 * Returns a throttled version of the function using requestAnimationFrame.
 *
 * @param fn - The function to throttle.
 * @param ms - The number of milliseconds to wait for the throttled function to be called again
 */
export function throttle<Args extends Array<unknown>>(fn: (...args: Args) => void, ms = 0): (...args: Args) => void {
  let isThrottled = false
  let start = 0

  return function (...args: Args) {
    if (isThrottled) return

    isThrottled = true
    const step = () => {
      requestAnimationFrame((time) => {
        const elapsed = time - start
        if (elapsed > ms) {
          start = time
          fn(...args)
          isThrottled = false
        } else {
          step()
        }
      })
    }
    step()
  }
}
