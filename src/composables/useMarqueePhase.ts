import { Ref, WatchSource, watch } from 'vue'

import { getNumberInRange } from '@/utils'

export type UseMarqueePhaseOptions = {
  track: Ref<HTMLElement | null>
  // Marquee loop duration in seconds; 0 when the marquee is not running
  duration: WatchSource<number>
  // Number of real slides in one loop
  slidesCount: WatchSource<number>
}

const MARQUEE_ANIMATION = 'vc-marquee'

/**
 * Keeps the marquee track in place when its loop duration changes.
 *
 * A running CSS animation keeps its elapsed time when `animation-duration`
 * changes, so a new duration would map that time onto a different point of
 * the loop and the track would jump. The position is read before the DOM
 * updates and applied to the new duration afterwards.
 *
 * The position is kept in slides, not as a fraction of the loop: a resize or
 * speed change keeps the slide count, so the fraction is unchanged, while
 * adding or removing slides changes the loop length but not where the current
 * slides are.
 */
export function useMarqueePhase({
  track,
  duration,
  slidesCount,
}: UseMarqueePhaseOptions) {
  let progress: number | null = null

  const getAnimation = (): Animation | undefined =>
    track.value
      ?.getAnimations?.()
      .find(
        (animation) => (animation as CSSAnimation).animationName === MARQUEE_ANIMATION
      )

  watch(
    [duration, slidesCount],
    ([, newSlidesCount], [oldDuration, oldSlidesCount]) => {
      progress = null
      if (!oldDuration) {
        return
      }
      const currentTime = Number(getAnimation()?.currentTime)
      if (!Number.isFinite(currentTime)) {
        return
      }
      const oldDurationMs = oldDuration * 1000
      const fraction = (currentTime % oldDurationMs) / oldDurationMs
      if (oldSlidesCount > 0 && newSlidesCount > 0) {
        // A full loop is the start of the next one
        progress =
          getNumberInRange({
            val: (fraction * oldSlidesCount) / newSlidesCount,
            min: 0,
            max: 1,
          }) % 1
      } else {
        progress = fraction
      }
    },
    { flush: 'pre' }
  )

  watch(
    [duration, slidesCount],
    ([newDuration]) => {
      if (progress === null) {
        return
      }
      const animation = getAnimation()
      if (animation && newDuration > 0) {
        animation.currentTime = progress * newDuration * 1000
      }
      progress = null
    },
    { flush: 'post' }
  )
}
