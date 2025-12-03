import { CarouselConfig } from '@/shared'

import { getSnapAlignOffset } from './getSnapAlignOffset'

export const getMinSlideIndex = (config: CarouselConfig) => {
  const isAuto = config.itemsToShow === 'auto'

  if (isAuto) {
    return 0
  }

  // navigationBoundary controls navigation behavior
  if (config.navigationBoundary === 'viewport') {
    const itemsToShow = Number(config.itemsToShow)

    // Calculate snap alignment offset to account for how slides are positioned
    const snapOffset = getSnapAlignOffset({
      align: config.snapAlign,
      itemsToShow,
    })

    return Math.floor(snapOffset)
  }

  return 0
}
