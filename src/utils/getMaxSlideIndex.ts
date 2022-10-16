import { CarouselConfig } from '../types'

type Args = {
  config: Partial<CarouselConfig>
  slidesCount: number
}

export function getMaxSlideIndex({ config, slidesCount }: Args): number {
  const { snapAlign, wrapAround, itemsToShow = 1 } = config
  if (wrapAround) {
    return Math.max(slidesCount - 1, 0)
  }

  let output
  switch (snapAlign) {
    case 'start':
      output = slidesCount - itemsToShow
      break

    case 'end':
      output = slidesCount - 1
      break

    case 'center':
    case 'center-odd':
      output = slidesCount - Math.ceil((itemsToShow - 0.5) / 2)
      break

    case 'center-even':
      output = slidesCount - Math.ceil(itemsToShow / 2)
      break

    default:
      output = 0
      break
  }

  return Math.max(output, 0)
}
