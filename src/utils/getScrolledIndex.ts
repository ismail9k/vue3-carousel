import { CarouselConfig } from '@/shared'

import { getNumberInRange } from './getNumberInRange'
import { getSnapAlignOffset } from './getSnapAlignOffset'

type GetScrolledIndexArgs = {
  config: Pick<CarouselConfig, 'itemsToShow' | 'wrapAround' | 'snapAlign'>
  currentSlide: number
  slidesCount: number
}

export function getScrolledIndex({
  config,
  currentSlide,
  slidesCount,
}: GetScrolledIndexArgs): number {
  const { snapAlign = 'center', wrapAround, itemsToShow = 1 } = config

  // Calculate the offset based on snapAlign
  const offset = getSnapAlignOffset({ align: snapAlign, itemsToShow: +itemsToShow })

  // Compute the index with or without wrapAround
  if (wrapAround) {
    return currentSlide - offset
  }
  return getNumberInRange({
    val: currentSlide - offset,
    max: slidesCount - +itemsToShow,
    min: 0,
  })
}
