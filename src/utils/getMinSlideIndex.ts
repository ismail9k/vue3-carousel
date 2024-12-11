import { CarouselConfig } from '@/shared'
import { calculateOffset } from '@/utils/getScrolledIndex'

type GetMinSlideIndexArgs = {
  config: Partial<CarouselConfig>
  slidesCount: number
}

/**
 * Determines the minimum slide index based on the configuration.
 *
 * @param {GetMinSlideIndexArgs} args - The carousel configuration and slide count.
 * @returns {number} The minimum slide index.
 */
export function getMinSlideIndex({ config, slidesCount }: GetMinSlideIndexArgs): number {
  const { snapAlign = 'center', wrapAround, itemsToShow = 1 } = config

  // If wrapAround is enabled or itemsToShow exceeds slidesCount, the minimum index is always 0
  if (wrapAround || itemsToShow > slidesCount) {
    return 0
  }

  // Return the calculated offset or default to 0 for invalid snapAlign values
  return Math.max(0, Math.floor(calculateOffset(snapAlign, itemsToShow)))
}
