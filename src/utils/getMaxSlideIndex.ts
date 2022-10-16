import { CarouselConfig } from '../types'

type Args = {
  config: Partial<CarouselConfig>
  slidesCount: number
}

export function getMaxSlideIndex({ config, slidesCount }: Args): number {
  const { snapAlign, wrapAround } = config
  if (wrapAround) {
    return Math.max(slidesCount - 1, 0)
  }

  const itemsToShow = config.itemsToShow || 1
  let slides

  switch (snapAlign) {
    case 'start':
      slides = slidesCount - itemsToShow
      break

    case 'end':
      slides = slidesCount - 1
      break

    case 'center':
    case 'center-odd':
      slides = slidesCount - Math.ceil((itemsToShow - 0.5) / 2)
      break

    case 'center-even':
      slides = slidesCount - Math.ceil(itemsToShow / 2)
      break

    default:
      slides = 0
      break
  }

  return Math.max(slides, 0)
}
