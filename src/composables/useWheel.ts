import { ComputedRef, Ref, computed } from 'vue'

import { CarouselConfig } from '@/shared'
import { DEFAULT_MOUSE_WHEEL_THRESHOLD } from '@/shared/constants'

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

  const handleScroll = (event: Event): void => {
    event.preventDefault()

    if (!config.mouseWheel || sliding.value) {
      return
    }

    const wheelEvent = event as WheelEvent

    // Add sensitivity threshold to prevent small movements from triggering navigation
    const threshold =
      typeof config.mouseWheel === 'object'
        ? (config.mouseWheel.threshold ?? DEFAULT_MOUSE_WHEEL_THRESHOLD)
        : DEFAULT_MOUSE_WHEEL_THRESHOLD

    // Determine scroll direction
    const deltaY = Math.abs(wheelEvent.deltaY) > threshold ? wheelEvent.deltaY : 0
    const deltaX = Math.abs(wheelEvent.deltaX) > threshold ? wheelEvent.deltaX : 0

    // If neither delta exceeds the threshold, don't navigate
    if (deltaY === 0 && deltaX === 0) {
      return
    }

    // Determine primary delta based on carousel orientation
    const primaryDelta = vertical.value ? deltaY : deltaX

    // If primaryDelta is 0, use the other delta as fallback
    const effectiveDelta =
      primaryDelta !== 0 ? primaryDelta : vertical.value ? deltaX : deltaY

    // Positive delta means scrolling down/right
    const isScrollingForward = effectiveDelta > 0

    // Apply navigation based on scroll direction and carousel configuration
    if (isScrollingForward) {
      // Scrolling down/right
      if (reversed.value) {
        prev()
      } else {
        next()
      }
    } else {
      // Scrolling up/left
      if (reversed.value) {
        next()
      } else {
        prev()
      }
    }
  }

  return {
    handleScroll,
  }
}
