export type ScaleMultipliers = {
  widthMultiplier: number
  heightMultiplier: number
}

const IDENTITY_MATRIX = [1, 0, 0, 1, 0, 0]

/**
 * Parses the computed transform of an element into its matrix values.
 * Returns the 2D identity matrix when the element has no (parsable) transform.
 */
export function getTransformValues(el: Element): number[] {
  const { transform } = window.getComputedStyle(el)

  if (!transform || transform === 'none') {
    return IDENTITY_MATRIX
  }

  const values = transform
    .split(/[(,)]/)
    .slice(1, -1)
    .map((v) => parseFloat(v))

  return values.length > 0 && !values.some(isNaN) ? values : IDENTITY_MATRIX
}

function getScale(values: number[]): { scaleX: number; scaleY: number } {
  // matrix(a, b, c, d, e, f): a = scaleX, d = scaleY
  if (values.length === 6) {
    return { scaleX: values[0], scaleY: values[3] }
  }
  // matrix3d(m11, ..., m44): m11 = scaleX, m22 = scaleY
  if (values.length === 16) {
    return { scaleX: values[0], scaleY: values[5] }
  }
  return { scaleX: 1, scaleY: 1 }
}

/**
 * Multipliers that convert screen-space sizes of `el` (getBoundingClientRect)
 * back into layout pixels, accounting for CSS scale transforms on `el` and on
 * every ancestor. Deliberately uncached: an ancestor's transform can change
 * without any event the carousel observes (e.g. a screen-fitting wrapper
 * rescaling on window resize).
 */
export function getScaleMultipliers(el: Element | null): ScaleMultipliers {
  let widthMultiplier = 1
  let heightMultiplier = 1

  let current: Element | null = el
  while (current) {
    const { scaleX, scaleY } = getScale(getTransformValues(current))
    // A zero scale (mid-animation) is skipped rather than divided by
    if (scaleX) widthMultiplier /= scaleX
    if (scaleY) heightMultiplier /= scaleY
    current = current.parentElement
  }

  return { widthMultiplier, heightMultiplier }
}
