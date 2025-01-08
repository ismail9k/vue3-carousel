type DragParams = {
  isVertical: boolean
  isReversed: boolean
  dragged: { x: number; y: number }
  effectiveSlideSize: number
}

/**
 * Calculates the number of slides to move based on drag movement
 * @param params Configuration parameters for drag calculation
 * @returns Number of slides to move (positive or negative)
 */
export function getDraggedSlidesCount(params: DragParams): number {
  const { isVertical, isReversed, dragged, effectiveSlideSize } = params

  // Get drag value based on direction
  const dragValue = isVertical ? dragged.y : dragged.x

  // If no drag, return +0 explicitly
  if (dragValue === 0) return 0

  const slidesDragged = Math.round(dragValue / effectiveSlideSize)

  return isReversed ? slidesDragged : -slidesDragged
}
