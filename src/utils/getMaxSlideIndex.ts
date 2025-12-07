import { CarouselConfig } from '@/shared'

import { getSnapAlignOffset } from './getSnapAlignOffset'

export const getMaxSlideIndex = (config: CarouselConfig, slidesCount: number) => {
  const isAuto = config.itemsToShow === 'auto'

  // When itemsToShow is 'auto', always use last-slide logic
  if (isAuto) {
    return slidesCount - 1
  }

  // navigationBoundary controls disable behavior
  if (config.navigationBoundary === 'viewport') {
    const itemsToShow = Number(config.itemsToShow)

    // Calculate snap alignment offset to account for how slides are positioned
    const snapOffset = getSnapAlignOffset({
      align: config.snapAlign,
      itemsToShow,
    })

    return Math.max(0, slidesCount - itemsToShow + Math.ceil(snapOffset))
  }

  return slidesCount - 1
}
