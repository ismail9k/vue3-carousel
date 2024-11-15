import { CarouselConfig } from '@/types'

import { getNumberInRange } from './getNumberInRange'

type Args = {
  config: Partial<CarouselConfig>
  currentSlide: number
  slidesCount: number
}

export function getScrolledIndex({ config, currentSlide, slidesCount }: Args): number {
  const { snapAlign = 'start', wrapAround, itemsToShow = 1 } = config

  // Calculate the slide offset based on snapAlign
  const offsetMap: Record<string, number> = {
    start: 0,
    center: (itemsToShow - 1) / 2,
    'center-odd': (itemsToShow - 1) / 2,
    'center-even': (itemsToShow - 2) / 2,
    end: itemsToShow - 1,
  }

  const offset = offsetMap[snapAlign] || 0
  const scrolledIndex = currentSlide - offset
  return !wrapAround
    ? getNumberInRange({
        val: currentSlide - offset,
        max: slidesCount - itemsToShow,
        min: 0,
      })
    : scrolledIndex
}
