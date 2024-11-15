import { CarouselConfig } from '../types'

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
  const { snapAlign = 'N/A', wrapAround, itemsToShow = 1 } = config

  // If wrapAround is enabled, the max index is the last slide
  if (wrapAround) {
    return Math.max(slidesCount - 1, 0)
  }

  // Map snapAlign values to calculation logic
  const snapAlignCalculations: Record<string, number> = {
    start: Math.ceil(slidesCount - itemsToShow),
    end: Math.ceil(slidesCount - 1),
    center: slidesCount - Math.ceil((itemsToShow - 0.5) / 2),
    'center-odd': slidesCount - Math.ceil((itemsToShow - 0.5) / 2),
    'center-even': slidesCount - Math.ceil(itemsToShow / 2),
  }

  // Compute the max index based on snapAlign, or default to 0
  const calculateMaxIndex = snapAlignCalculations[snapAlign as string] ?? 0

  // Return the result ensuring it's non-negative
  return Math.max(calculateMaxIndex, 0)
}
