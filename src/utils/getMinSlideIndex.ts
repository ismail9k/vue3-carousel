import { CarouselConfig } from '../types'

type Args = {
  config: Partial<CarouselConfig>
  slidesCount: number
}

export function getMinSlideIndex({ config, slidesCount }: Args): number {
  const { wrapAround, snapAlign, itemsToShow = 1 } = config
  let output = 0

  if (wrapAround || itemsToShow > slidesCount) {
    return output
  }

  switch (snapAlign) {
    case 'start':
      output = 0
      break

    case 'end':
      output = itemsToShow - 1
      break

    case 'center':
    case 'center-odd':
      output = Math.floor((itemsToShow - 1) / 2)
      break

    case 'center-even':
      output = Math.floor((itemsToShow - 2) / 2)
      break

    default:
      output = 0
      break
  }

  return output
}
