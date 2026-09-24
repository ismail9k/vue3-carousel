import { getNumberInRange } from './getNumberInRange'

type GetClampedScrollTargetArgs = {
  currentIndex: number
  direction: 1 | -1
  itemsToScroll: number
  itemsToShow: number
  slidesCount: number
  snapAlignOffset: number
}

/**
 * Target index for next/prev when the track is clamped at both ends
 * (no wrapAround). Steps the visible window by itemsToScroll so a clamped
 * first or last position still moves the full amount, and lands on the edge
 * index for the final step so navigation can disable.
 */
export function getClampedScrollTarget({
  currentIndex,
  direction,
  itemsToScroll,
  itemsToShow,
  slidesCount,
  snapAlignOffset,
}: GetClampedScrollTargetArgs): number {
  const step = direction * itemsToScroll
  if (slidesCount <= 0) {
    return currentIndex + step
  }

  const maxScrolled = Math.max(0, slidesCount - itemsToShow)
  const rawScrolled = currentIndex - snapAlignOffset
  const scrolled = getNumberInRange({ val: rawScrolled, min: 0, max: maxScrolled })
  const target = scrolled + step

  if (target >= maxScrolled) {
    return slidesCount - 1
  }
  if (target <= 0) {
    return 0
  }

  // scrolled - rawScrolled is 0 unless the current position is clamped
  const index = currentIndex + step + (scrolled - rawScrolled)
  return direction > 0 ? Math.floor(index) : Math.ceil(index)
}
