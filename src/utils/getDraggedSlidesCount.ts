type DragParams = {
  isVertical: boolean
  isReversed: boolean
  dragged: { x: number; y: number }
  effectiveSlideSize: number
  threshold: number
}

/**
 * Calculates the number of slides to move based on drag movement
 * @param params Configuration parameters for drag calculation
 * @returns Number of slides to move (positive or negative)
 */
export function getDraggedSlidesCount(params: DragParams): number {
  const { isVertical, isReversed, dragged, effectiveSlideSize, threshold } = params

  // Get drag value based on direction
  const dragValue = isVertical ? dragged.y : dragged.x

  // If no drag, return +0 explicitly
  if (dragValue === 0) return 0

  const dragRatio = dragValue / effectiveSlideSize
  const absRatio = Math.abs(dragRatio)

  // If below the threshold, consider it no movement
  if (absRatio < threshold) return 0
  
  // For drags less than a full slide, move one slide in the drag direction
  // For drags of a full slide or more, move the corresponding number of slides
  const slidesDragged = absRatio < 1 ? Math.sign(dragRatio) : Math.round(dragRatio)

  return isReversed ? slidesDragged : -slidesDragged
}
