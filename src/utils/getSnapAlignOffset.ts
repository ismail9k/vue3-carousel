import { SnapAlign } from '@/shared'

interface SnapAlignOffsetParams {
  align: SnapAlign
  slideSize?: number
  viewportSize?: number
  itemsToShow?: number
}

/**
 * Calculates the snap align offset for a carousel item based on items to show.
 * Returns the number of slides to offset.
 *
 * @param align - The alignment type.
 * @param itemsToShow - The number of items to show.
 * @returns The calculated offset.
 */
function getSnapAlignOffsetByItemsToShow(align: SnapAlign, itemsToShow: number): number {
  switch (align) {
    case 'start':
      return 0
    case 'center':
    case 'center-odd':
      return (itemsToShow - 1) / 2
    case 'center-even':
      return (itemsToShow - 2) / 2
    case 'end':
      return itemsToShow - 1
    default:
      return 0
  }
}

/**
 * Calculates the snap align offset for a carousel item based on slide and viewport size.
 * Returns the real width to offset.
 *
 * @param align - The alignment type.
 * @param slideSize - The size of the slide.
 * @param viewportSize - The size of the viewport.
 * @returns The calculated offset.
 */
function getSnapAlignOffsetBySlideAndViewport(
  align: SnapAlign,
  slideSize: number,
  viewportSize: number
): number {
  switch (align) {
    case 'start':
      return 0
    case 'center':
    case 'center-odd':
      return (viewportSize - slideSize) / 2
    case 'center-even':
      return viewportSize / 2 - slideSize
    case 'end':
      return viewportSize - slideSize
    default:
      return 0
  }
}

/**
 * Calculates the snap align offset for a carousel item.
 *
 * @param params - The parameters for calculating the offset.
 * @returns The calculated offset.
 */
export function getSnapAlignOffset({
  slideSize,
  viewportSize,
  align,
  itemsToShow,
}: SnapAlignOffsetParams): number {
  if (itemsToShow !== undefined) {
    return getSnapAlignOffsetByItemsToShow(align, itemsToShow)
  }
  if (slideSize !== undefined && viewportSize !== undefined) {
    return getSnapAlignOffsetBySlideAndViewport(align, slideSize, viewportSize)
  }

  return 0
}
