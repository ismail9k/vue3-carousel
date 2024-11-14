import { CarouselConfig } from '@/types'

type Args = {
  config: Partial<CarouselConfig>
  currentSlide: number
}

const isFraction = (number: number) => {
  return number % 1 !== 0
}
export function getScrollGap({ config, currentSlide }: Args): number {
  const { snapAlign, itemsToShow = 1 } = config
  let output = currentSlide

  switch (snapAlign) {
    case 'center':
    case 'center-odd':
      output = isFraction(itemsToShow)
        ? currentSlide - 1
        : currentSlide - (itemsToShow - 1) / 2
      break

    case 'center-even':
      output = isFraction(itemsToShow)
        ? currentSlide - itemsToShow - 2
        : currentSlide - (itemsToShow - 2) / 2
      break

    case 'end':
      output = currentSlide - itemsToShow - 1
      break

    default:
      break
  }

  return output
}
