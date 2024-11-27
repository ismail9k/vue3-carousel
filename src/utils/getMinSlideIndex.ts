import { CarouselConfig } from '@/shared'

type Args = {
  config: Partial<CarouselConfig>
  slidesCount: number
}

/**
 * Determines the minimum slide index based on the configuration.
 *
 * @param {Args} args - The carousel configuration and slide count.
 * @returns {number} The minimum slide index.
 */
export function getMinSlideIndex({ config, slidesCount }: Args): number {
  const { snapAlign = 'N/A', wrapAround, itemsToShow = 1 } = config

  // If wrapAround is enabled or itemsToShow exceeds slidesCount, the minimum index is always 0
  if (wrapAround || itemsToShow > slidesCount) {
    return 0
  }

  // Map of snapAlign to offset calculations
  const snapAlignCalculations: Record<string, number> = {
    start: 0,
    end: Math.floor(itemsToShow - 1),
    center: Math.floor((itemsToShow - 1) / 2),
    'center-odd': Math.floor((itemsToShow - 1) / 2),
    'center-even': Math.floor((itemsToShow - 2) / 2),
  }

  // Return the calculated offset or default to 0 for invalid snapAlign values
  return snapAlignCalculations[snapAlign as string] ?? 0
}
