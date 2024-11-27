/**
 * Returns a debounced version of the function using requestAnimationFrame.
 *
 * @param fn - The function to debounce.
 */
export function debounce(fn: (...args: any[]) => unknown): (...args: any[]) => void {
  let frameId: number | null = null

  return function (...args: any[]) {
    if (frameId) {
      cancelAnimationFrame(frameId)
    }

    frameId = requestAnimationFrame(() => {
      fn(...args)
      frameId = null
    })
  }
}
