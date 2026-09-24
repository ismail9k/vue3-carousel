/**
 * Returns a debounced version of the function: it runs once, `ms` after the
 * last call, with the last call's arguments.
 */
export function debounce<Args extends Array<unknown>>(
  fn: (...args: Args) => void,
  ms: number
): { (...args: Args): void; cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  function debounced(...args: Args) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(...args)
    }, ms)
  }

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return debounced
}
