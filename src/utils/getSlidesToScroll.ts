import { CarouselConfig } from '@/types'

type Args = {
  config: Partial<CarouselConfig>
  currentSlide: number
  slidesCount: number
}

export function getSlidesToScroll({ config, currentSlide, slidesCount }: Args): number {
  const { snapAlign, wrapAround } = config
  const itemsToShow = config.itemsToShow || 1
  let output = currentSlide

  switch (snapAlign) {
    case 'center':
    case 'center-odd':
      output -= (itemsToShow - 1) / 2
      break

    case 'center-even':
      output -= (itemsToShow - 2) / 2
      break

    case 'end':
      output -= itemsToShow - 1
      break

    default:
      break
  }

  if (!wrapAround) {
    const max = slidesCount - itemsToShow
    const min = 0
    output = Math.max(Math.min(output, max), min)
  }

  return output
}
