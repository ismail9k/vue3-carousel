import { CarouselConfig } from '../types'

/**
 * return a debounced version of the function
 * @param fn
 * @param delay
 */
// eslint-disable-next-line no-unused-vars
export function debounce(fn: (...args: any[]) => unknown, delay: number): typeof fn {
  let timerId: ReturnType<typeof setTimeout> | null
  return function (...args: any[]) {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      fn(...args)
      timerId = null
    }, delay)
  }
}

/**
 * return a throttle version of the function
 * Throttling
 *
 */
// eslint-disable-next-line no-unused-vars
export function throttle(fn: (...args: any[]) => unknown, limit: number): typeof fn {
  let inThrottle: boolean
  return function (...args: any[]) {
    const self = this
    if (!inThrottle) {
      fn.apply(self, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function getSlidesVNodes(vNode: any[] | undefined) {
  // Return empty array if there's any node
  if (!vNode) return []

  // Check if the Slides components are added directly without v-for (#72)
  if (vNode[0]?.type?.name === 'CarouselSlide') return vNode

  return vNode[0]?.children || []
}

export function getMaxSlideIndex(
  config: Partial<CarouselConfig>,
  slidesCount: number
): number {
  if (config.wrapAround) {
    return Math.max(slidesCount - 1, 0)
  }

  const itemsToShow = config.itemsToShow || 1
  let slides
  switch (config.snapAlign) {
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

export function getMinSlideIndex(
  config: Partial<CarouselConfig>,
  slidesCount: number
): number {
  if (config.wrapAround) {
    return 0
  }

  const itemsToShow = config.itemsToShow || 1
  if (itemsToShow > slidesCount) {
    return 0
  }

  switch (config.snapAlign) {
    case 'start':
      return 0
    case 'end':
      return itemsToShow - 1
    case 'center':
    case 'center-odd':
      return Math.floor((itemsToShow - 1) / 2)
    case 'center-even':
      return Math.floor((itemsToShow - 2) / 2)
    default:
      return 0
  }
}

export function getCurrentSlideIndex(
  config: CarouselConfig,
  val: number,
  max: number,
  min: number
): number {
  if (config.wrapAround) {
    return val
  }
  return Math.min(Math.max(val, min), max)
}

export function getSlidesToScroll({
  currentSlide,
  snapAlign,
  itemsToShow,
  wrapAround,
  slidesCount,
}: {
  currentSlide: number
  itemsToShow: number
  wrapAround: boolean
  slidesCount: number
  snapAlign: string
}): number {
  let output = currentSlide

  if (snapAlign === 'center' || snapAlign === 'center-odd') {
    output -= (itemsToShow - 1) / 2
  } else if (snapAlign === 'center-even') {
    output -= (itemsToShow - 2) / 2
  } else if (snapAlign === 'end') {
    output -= itemsToShow - 1
  }

  if (!wrapAround) {
    const max = slidesCount - itemsToShow
    const min = 0
    output = Math.max(Math.min(output, max), min)
  }

  return output
}

export function mapNumberToRange(current: number, max: number, min = 0): number {
  if (current > max) {
    return mapNumberToRange(current - (max + 1), max, min)
  }
  if (current < min) {
    return mapNumberToRange(current + (max + 1), max, min)
  }
  return current
}
