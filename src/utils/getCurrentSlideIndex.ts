import { CarouselConfig } from '@/types'

export function getCurrentSlideIndex(
  config: Partial<CarouselConfig>,
  val: number,
  max: number,
  min: number
): number {
  if (config.wrapAround) {
    return val
  }
  return Math.min(Math.max(val, min), max)
}
