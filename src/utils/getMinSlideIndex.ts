import { CarouselConfig } from '@/shared'

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

  // Map snapAlign values to calculation logic
  function snapAlignCalculations() {
    switch (snapAlign) {
      case 'end':
        return Math.floor(itemsToShow - 1)
      case 'center':
      case 'center-odd':
        return Math.floor((itemsToShow - 1) / 2)
      case 'center-even':
        return Math.floor((itemsToShow - 2) / 2)
    }
    return 0
  }

  // Return the calculated offset or default to 0 for invalid snapAlign values
  return Math.max(0, snapAlignCalculations())
}
