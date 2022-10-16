import { CarouselConfig } from '../types'

export function getMinSlideIndex(
  config: Partial<CarouselConfig>,
  slidesCount: number
): number {
  if (config.wrapAround) {
    return 0
  }

  const itemsToShow = config.itemsToShow || 1
  if (itemsToShow > slidesCount) {
    return 0
  }

  switch (config.snapAlign) {
    case 'start':
      return 0
    case 'end':
      return itemsToShow - 1
    case 'center':
    case 'center-odd':
      return Math.floor((itemsToShow - 1) / 2)
    case 'center-even':
      return Math.floor((itemsToShow - 2) / 2)
    default:
      return 0
  }
}
