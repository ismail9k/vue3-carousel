type ApplyEdgeSpacingArgs = {
  /** Scrolled distance, already clamped to the [0, max] range. */
  value: number
  /** Scrolled distance of the last position. */
  max: number
  /** Extra space, in the same unit as `value`, to add at both edges. */
  spacing: number
}

/**
 * Pushes a clamped scrolled distance past its edges so that empty space
 * appears before the first slide (at the start) and after the last slide
 * (at the end). Positions in between are returned unchanged.
 */
export function applyEdgeSpacing({ value, max, spacing }: ApplyEdgeSpacingArgs): number {
  if (spacing <= 0) {
    return value
  }
  if (value <= 0) {
    return value - spacing
  }
  if (value >= max) {
    return value + spacing
  }
  return value
}
