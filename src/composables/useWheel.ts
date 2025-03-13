import { ComputedRef, Ref, computed } from 'vue'

import { CarouselConfig } from '@/shared'
import { throttle } from '@/utils'

interface UseWheelOptions {
  isVertical: boolean | ComputedRef<boolean>
  isReversed: boolean | ComputedRef<boolean>
  isSliding: boolean | Ref<boolean>
  config: CarouselConfig
  next: (skipTransition?: boolean) => void
  prev: (skipTransition?: boolean) => void
}

export function useWheel(options: UseWheelOptions) {
  const { isVertical, isReversed, isSliding, config, next, prev } = options

  // Create computed values to handle both reactive and non-reactive inputs
  const vertical = computed(() => {
    return typeof isVertical === 'boolean' ? isVertical : isVertical.value
  })

  const reversed = computed(() => {
    return typeof isReversed === 'boolean' ? isReversed : isReversed.value
  })

  const sliding = computed(() => {
    return typeof isSliding === 'boolean' ? isSliding : isSliding.value
  })

  const handleScroll = throttle((event: Event): void => {
    if (!config.mouseWheel || sliding.value) {
      return
    }

    // Prevent default scrolling behavior when wheel navigation is enabled
    event.preventDefault()

    const wheelEvent = event as WheelEvent

    // Add sensitivity threshold to prevent small movements from triggering navigation
    const threshold =
      typeof config.mouseWheel === 'object' ? (config.mouseWheel.threshold ?? 10) : 10

    // Determine scroll direction
    const deltaY = Math.abs(wheelEvent.deltaY) > threshold ? wheelEvent.deltaY : 0
    const deltaX = Math.abs(wheelEvent.deltaX) > threshold ? wheelEvent.deltaX : 0

    // If neither delta exceeds the threshold, don't navigate
    if (deltaY === 0 && deltaX === 0) {
      return
    }

    const isScrollingDown = deltaY > 0
    const isScrollingRight = deltaX > 0

    // Determine direction based on carousel orientation and scroll direction
    if ((vertical.value && isScrollingDown) || (!vertical.value && isScrollingRight)) {
      if (reversed.value) {
        prev()
      } else {
        next()
      }
    } else {
      if (reversed.value) {
        next()
      } else {
        prev()
      }
    }
  }, 16)

  return {
    handleScroll,
  }
}
