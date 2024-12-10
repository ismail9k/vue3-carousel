import { CarouselConfig } from '@/shared'

import { getNumberInRange } from './getNumberInRange'
import { mapNumberToRange } from './mapNumberToRange'

type GetScrolledIndexArgs = {
  config: Pick<CarouselConfig, 'itemsToShow' | 'wrapAround' | 'snapAlign'>
  currentSlide: number
  slidesCount: number
}

export const calculateOffset = (snapAlign: string, itemsToShow: number): number => {
  switch (snapAlign) {
    default:
    case 'start': return 0
    case 'center': return (itemsToShow - 1) / 2
    case 'center-odd': return (itemsToShow - 1) / 2
    case 'center-even': return (itemsToShow - 2) / 2
    case 'end': return itemsToShow - 1
  }
}

export function getScrolledIndex({
  config,
  currentSlide,
  slidesCount,
}: GetScrolledIndexArgs): number {
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
