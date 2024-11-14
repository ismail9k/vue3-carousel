import { CarouselConfig } from '@/types'

import { getNumberInRange } from './getNumberInRange'

type Args = {
  config: Partial<CarouselConfig>
  currentSlide: number
  slidesCount: number
}

export function getSlidesToScroll({ config, currentSlide, slidesCount }: Args): number {
  const { snapAlign, wrapAround, itemsToShow = 1 } = config
  let output = 0

  switch (snapAlign) {
    case 'start':
      output = currentSlide
      break

    case 'center':
    case 'center-odd':
      output = currentSlide - (itemsToShow - 1) / 2
      break

    case 'center-even':
      output = currentSlide - (itemsToShow - 2) / 2
      break

    case 'end':
      output = currentSlide - itemsToShow - 1
      break

    default:
      break
  }

  if (wrapAround) {
    return output
  }

  return getNumberInRange({
    val: output,
    max: slidesCount - itemsToShow,
    min: 0,
  })
}
