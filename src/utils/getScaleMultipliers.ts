export type ScaleMultipliers = {
  widthMultiplier: number
  heightMultiplier: number
}

type ScaleValues = { scaleX: number; scaleY: number }

const IDENTITY_MATRIX = Object.freeze([1, 0, 0, 1, 0, 0])
const IDENTITY_SCALE: ScaleValues = { scaleX: 1, scaleY: 1 }

/**
 * Parses the computed transform of an element into its matrix values.
 * Returns the 2D identity matrix when the element has no (parsable) transform.
 */
export function getTransformValues(el: Element): readonly number[] {
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

function getScale(values: readonly number[]): ScaleValues {
  // matrix(a, b, c, d, e, f): a = scaleX, d = scaleY
  if (values.length === 6) {
    return { scaleX: values[0], scaleY: values[3] }
  }
  // matrix3d(m11, ..., m44): m11 = scaleX, m22 = scaleY
  if (values.length === 16) {
    return { scaleX: values[0], scaleY: values[5] }
  }
  return IDENTITY_SCALE
}

/**
 * Parses the computed `scale` of an element — the CSS Transforms Level 2
 * individual property, which is *not* reflected in `transform`. The computed
 * value is `none` or 1 to 3 space-separated numbers (a single value applies to
 * both axes; two or three are x then y). jsdom does not implement it and
 * reports `undefined` or an empty string, which yields identity values.
 */
export function getScaleValues(el: Element): ScaleValues {
  const { scale } = window.getComputedStyle(el)

  if (!scale || scale === 'none') {
    return IDENTITY_SCALE
  }

  const values = scale.trim().split(/\s+/).map(parseFloat)

  if (values.length > 3 || values.some(isNaN)) {
    return IDENTITY_SCALE
  }

  return { scaleX: values[0], scaleY: values.length > 1 ? values[1] : values[0] }
}

/**
 * Multipliers that convert screen-space sizes of `el` (getBoundingClientRect)
 * back into layout pixels, accounting for CSS scaling on `el` and on every
 * ancestor — both the `transform` matrix and the individual `scale` property.
 * Deliberately uncached: an ancestor's transform can change without any event
 * the carousel observes (e.g. a screen-fitting wrapper rescaling on window
 * resize).
 */
export function getScaleMultipliers(el: Element | null): ScaleMultipliers {
  let widthMultiplier = 1
  let heightMultiplier = 1

  let current: Element | null = el
  while (current) {
    // A zero scale (mid-animation) is skipped rather than divided by
    const matrixScale = getScale(getTransformValues(current))
    if (matrixScale.scaleX) widthMultiplier /= matrixScale.scaleX
    if (matrixScale.scaleY) heightMultiplier /= matrixScale.scaleY

    const propertyScale = getScaleValues(current)
    if (propertyScale.scaleX) widthMultiplier /= propertyScale.scaleX
    if (propertyScale.scaleY) heightMultiplier /= propertyScale.scaleY

    current = current.parentElement
  }

  return { widthMultiplier, heightMultiplier }
}
