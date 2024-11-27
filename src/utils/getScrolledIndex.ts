import { CarouselConfig } from '@/types'
import { mapNumberToRange } from '@/utils/mapNumberToRange'

import { getNumberInRange } from './getNumberInRange'

type Args = {
  config: Partial<CarouselConfig>
  currentSlide: number
  slidesCount: number
}

const calculateOffset = (snapAlign: string, itemsToShow: number): number => {
  const offsetMap: Record<string, number> = {
    start: 0,
    center: (itemsToShow - 1) / 2,
    'center-odd': (itemsToShow - 1) / 2,
    'center-even': (itemsToShow - 2) / 2,
    end: itemsToShow - 1,
  }
  return offsetMap[snapAlign] ?? 0 // Fallback to 0 for unknown snapAlign
}

export function getScrolledIndex({ config, currentSlide, slidesCount }: Args): number {
  const { snapAlign = 'center', wrapAround, itemsToShow = 1 } = config

  // Calculate the offset based on snapAlign
  const offset = calculateOffset(snapAlign, itemsToShow)

  // Compute the index with or without wrapAround
  if (!wrapAround) {
    return getNumberInRange({
      val: currentSlide - offset,
      max: slidesCount - itemsToShow,
      min: 0,
    })
  } else {
    return mapNumberToRange({
      val: currentSlide - offset,
      max: slidesCount + itemsToShow,
      min: 0 - itemsToShow,
    })
  }
}
