/**
 * Whether the browser can run the carousel in native CSS mode (scroll snap).
 * Always false without a DOM (SSR).
 */
export function supportsNativeCss(): boolean {
  return (
    typeof CSS !== 'undefined' &&
    typeof CSS.supports === 'function' &&
    CSS.supports('scroll-snap-type', 'x mandatory')
  )
}
