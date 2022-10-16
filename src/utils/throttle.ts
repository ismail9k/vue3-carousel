/**
 * return a throttle version of the function
 * Throttling
 *
 */
// eslint-disable-next-line no-unused-vars
export function throttle(fn: (...args: any[]) => unknown, limit: number): typeof fn {
  let inThrottle: boolean
  return function (...args: any[]) {
    const self = this
    if (!inThrottle) {
      fn.apply(self, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
