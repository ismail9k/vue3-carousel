import { CarouselConfig } from '../types';

/**
 * return a debounced version of the function
 * @param fn
 * @param delay
 */
export function debounce(fn: (...args: any[]) => unknown, delay: number): typeof fn {
  let timerId: ReturnType<typeof setTimeout> | null;
  return function (...args: any[]) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}

/**
 * return a throttle version of the function
 * Throttling
 *
 */
export function throttle(fn: (...args: any[]) => unknown, limit: number): typeof fn {
  let inThrottle: boolean;
  return function (...args: any[]) {
    const self = this;
    if (!inThrottle) {
      fn.apply(self, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function getSlides(vNode: any[] | undefined) {
  // Return empty array if there's any node
  if (!vNode) return [];

  // Check if the Slides components are added directly without v-for (#72)
  if (vNode[0]?.type?.name === 'CarouselSlide') return vNode;

  return vNode[0]?.children || [];
}

export function getMaxSlideIndex(config: CarouselConfig, slidesCount: number): number {
  if (config.wrapAround) {
    return slidesCount - 1;
  }
  switch (config.snapAlign) {
    case 'start':
      return slidesCount - config.itemsToShow;
    case 'end':
      return slidesCount - 1;
    case 'center':
    case 'center-odd':
      return slidesCount - Math.ceil(config.itemsToShow / 2);
    case 'center-even':
      return slidesCount - Math.ceil(config.itemsToShow / 2);
    default:
      return 0;
  }
}

export function getMinSlideIndex(config: CarouselConfig): number {
  if (config.wrapAround) {
    return 0;
  }
  switch (config.snapAlign) {
    case 'start':
      return 0;
    case 'end':
      return config.itemsToShow - 1;
    case 'center':
    case 'center-odd':
      return Math.floor((config.itemsToShow - 1) / 2);
    case 'center-even':
      return Math.floor((config.itemsToShow - 2) / 2);
    default:
      return 0;
  }
}

export function getCurrentSlideIndex(
  config: CarouselConfig,
  val: number,
  max: number,
  min: number
): number {
  if (config.wrapAround) {
    return val;
  }
  return Math.min(Math.max(val, min), max);
}
