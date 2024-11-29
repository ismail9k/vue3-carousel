import { CarouselConfig } from '@/types'

type Args = {
  config: Partial<CarouselConfig>
  slidesCount: number
}

/**
 * Determines the maximum slide index based on the configuration.
 *
 * @param {Args} args - The carousel configuration and slide count.
 * @returns {number} The maximum slide index.
 */
export function getMaxSlideIndex({ config, slidesCount }: Args): number {
  const { snapAlign = 'center', wrapAround, itemsToShow = 1 } = config

  // Map snapAlign values to calculation logic
  function snapAlignCalculations() {
    // If wrapAround is enabled, fallback to default which is the last slide
    switch (wrapAround ? '' : snapAlign) {
      case 'start':
        return Math.ceil(slidesCount - itemsToShow)
      case 'center':
      case 'center-odd':
        return slidesCount - Math.ceil((itemsToShow - .5) / 2)
      case 'center-even':
        return slidesCount - Math.ceil(itemsToShow / 2)
      case 'end':
      default:
        return Math.ceil(slidesCount - 1)
    }
  }

  // Return the result ensuring it's non-negative
  return Math.max(snapAlignCalculations(), 0)
}
