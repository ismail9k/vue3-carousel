// Cache for transform values to avoid repeated parsing
// WeakMap automatically handles memory cleanup when elements are garbage collected
const transformCache = new WeakMap<HTMLElement, number[]>()

export function getTransformValues(el: HTMLElement) {
  // Check cache first
  const cached = transformCache.get(el)
  if (cached) {
    return cached
  }

  const { transform } = window.getComputedStyle(el)

  // Handle edge cases: no transform or 'none'
  if (!transform || transform === 'none') {
    const result = [1, 0, 0, 1, 0, 0] // Identity matrix
    transformCache.set(el, result)
    return result
  }

  // Parse transform matrix
  const values = transform
    .split(/[(,)]/)
    .slice(1, -1)
    .map((v) => parseFloat(v))

  // Cache the result
  if (values.length > 0 && !values.some(isNaN)) {
    transformCache.set(el, values)
  }

  return values
}

/**
 * Invalidates the transform cache for specific elements
 * Call this when you know transform values have changed
 *
 * Note: WeakMap doesn't have a clear() method for global invalidation.
 * If elements parameter is not provided, this function does nothing.
 */
export function invalidateTransformCache(elements?: Set<HTMLElement>) {
  if (elements) {
    elements.forEach((el) => transformCache.delete(el))
  }
  // Note: Cannot clear entire WeakMap - it has no clear() method
  // Cached values will be garbage collected when elements are no longer referenced
}

export type ScaleMultipliers = {
  widthMultiplier: number
  heightMultiplier: number
}

export function getScaleMultipliers(
  transformElements: Set<HTMLElement>
): ScaleMultipliers {
  // Early return if no transform elements
  if (transformElements.size === 0) {
    return { widthMultiplier: 1, heightMultiplier: 1 }
  }

  let widthMultiplier = 1
  let heightMultiplier = 1

  transformElements.forEach((el) => {
    const transformArr = getTransformValues(el)

    // Standard 2D transform matrix has 6 values: matrix(a, b, c, d, e, f)
    // where a = scaleX, d = scaleY
    if (transformArr.length === 6) {
      const scaleX = transformArr[0]
      const scaleY = transformArr[3]

      // Avoid division by zero
      if (scaleX !== 0) {
        widthMultiplier /= scaleX
      }
      if (scaleY !== 0) {
        heightMultiplier /= scaleY
      }
    }
  })

  return { widthMultiplier, heightMultiplier }
}
