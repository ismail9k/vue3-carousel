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
  // the slide the carousel is on now, kept when the scroll position matches it
  currentIndex?: number
}

/**
 * The slide index a native (scroll-snap) carousel is on: the first slide at
 * the scroll start, the last at the scroll end, otherwise the slide whose snap
 * point is nearest the viewport's. -1 without slides.
 *
 * The browser clamps snap points beyond the scroll range to its edges, so
 * several slides can be "on" at an edge: `currentIndex` is kept whenever the
 * scroller is where that slide would put it (its snap point at or past the
 * edge, or aligned in between).
 */
export function getNativeSlideIndex({
  slideRects,
  viewportRect,
  tolerance = 1,
  currentIndex,
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

  const deltaOf = (index: number) =>
    getNativeScrollDelta({ ...options, slideRect: slideRects[index], viewportRect })
  const current = currentIndex ?? -1
  const hasCurrent =
    Number.isInteger(current) && current >= 0 && current < slideRects.length
  // Forward distance from the viewport's snap point to the current slide's
  const currentDelta = () => deltaOf(current) * forward

  const startGap = (edge(slideRects[0], 'start') - edge(viewportRect, 'start')) * forward
  if (startGap >= -tolerance) {
    return hasCurrent && currentDelta() <= tolerance ? current : 0
  }

  const lastIndex = slideRects.length - 1
  const endGap =
    (edge(slideRects[lastIndex], 'end') - edge(viewportRect, 'end')) * forward
  if (endGap <= tolerance) {
    return hasCurrent && currentDelta() >= -tolerance ? current : lastIndex
  }

  if (hasCurrent && Math.abs(currentDelta()) <= tolerance) {
    return current
  }

  let nearest = 0
  let nearestDistance = Infinity
  slideRects.forEach((_, index) => {
    const distance = Math.abs(deltaOf(index))
    if (distance < nearestDistance) {
      nearest = index
      nearestDistance = distance
    }
  })
  return nearest
}
