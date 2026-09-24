import {
  EdgeRect,
  NativeAlignOptions,
  getAlignPoint,
  getNativeScrollDelta,
} from './getNativeScrollDelta'

type NativeSlideIndexParams = NativeAlignOptions & {
  slideRects: EdgeRect[]
  viewportRect: EdgeRect
  // px of slack when deciding the scroller sits at its start or end
  tolerance?: number
}

/**
 * The slide index a native (scroll-snap) carousel is on: the first slide at
 * the scroll start, the last at the scroll end, otherwise the slide whose snap
 * point is nearest the viewport's. -1 without slides.
 */
export function getNativeSlideIndex({
  slideRects,
  viewportRect,
  tolerance = 1,
  ...options
}: NativeSlideIndexParams): number {
  if (!slideRects.length) {
    return -1
  }

  const { isReversed, isVertical } = options
  // Distances are measured in the logical direction: forward is right/down,
  // or left when reversed.
  const forward = isReversed ? -1 : 1
  const edge = (rect: EdgeRect, align: 'start' | 'end') =>
    getAlignPoint(rect, { align, isReversed, isVertical })

  const startGap = (edge(slideRects[0], 'start') - edge(viewportRect, 'start')) * forward
  if (startGap >= -tolerance) {
    return 0
  }

  const lastIndex = slideRects.length - 1
  const endGap =
    (edge(slideRects[lastIndex], 'end') - edge(viewportRect, 'end')) * forward
  if (endGap <= tolerance) {
    return lastIndex
  }

  let nearest = 0
  let nearestDistance = Infinity
  slideRects.forEach((slideRect, index) => {
    const distance = Math.abs(
      getNativeScrollDelta({ ...options, slideRect, viewportRect })
    )
    if (distance < nearestDistance) {
      nearest = index
      nearestDistance = distance
    }
  })
  return nearest
}
