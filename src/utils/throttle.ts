/**
 * Returns a throttled version of the function using requestAnimationFrame.
 *
 * @param fn - The function to throttle.
 */
export function throttle(fn: (...args: any[]) => unknown): (...args: any[]) => void {
  let isThrottled = false

  return function (...args: any[]) {
    if (isThrottled) return

    isThrottled = true
    requestAnimationFrame(() => {
      fn(...args)
      isThrottled = false
    })
  }
}
