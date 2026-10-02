/**
 * Returns a debounced version of the function: it runs once, `ms` after the
 * last call, with the last call's arguments. `cancel` drops the pending call;
 * `flush` runs it now.
 */
export function debounce<Args extends Array<unknown>>(
  fn: (...args: Args) => void,
  ms: number
): { (...args: Args): void; cancel: () => void; flush: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let pendingArgs: Args | null = null

  function debounced(...args: Args) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    pendingArgs = args
    timeoutId = setTimeout(debounced.flush, ms)
  }

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    pendingArgs = null
  }

  debounced.flush = () => {
    const args = pendingArgs
    debounced.cancel()
    if (args) {
      fn(...args)
    }
  }

  return debounced
}
