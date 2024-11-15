/**
 * return a throttle version of the function
 * Throttling
 *
 */
// eslint-disable-next-line no-unused-vars
export function throttle(fn: (...args: any[]) => unknown): typeof fn {
  let isRunning = false
  return function (...args: any[]) {
    if (!isRunning) {
      isRunning = true
      requestAnimationFrame(() => {
        fn.apply(this, args)
        isRunning = false
      })
    }
  }
}
