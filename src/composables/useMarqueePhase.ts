import { Ref, WatchSource, watch } from 'vue'

export type UseMarqueePhaseOptions = {
  track: Ref<HTMLElement | null>
  // Marquee loop duration in seconds; 0 when the marquee is not running
  duration: WatchSource<number>
}

const MARQUEE_ANIMATION = 'vc-marquee'

/**
 * Keeps the marquee track in place when its loop duration changes.
 *
 * A running CSS animation keeps its elapsed time when `animation-duration`
 * changes, so a new duration would map that time onto a different point of
 * the loop and the track would jump. The loop progress is read before the DOM
 * updates and applied to the new duration afterwards.
 */
export function useMarqueePhase({ track, duration }: UseMarqueePhaseOptions) {
  let progress: number | null = null

  const getAnimation = (): Animation | undefined =>
    track.value
      ?.getAnimations?.()
      .find(
        (animation) => (animation as CSSAnimation).animationName === MARQUEE_ANIMATION
      )

  watch(
    duration,
    (_, oldDuration) => {
      progress = null
      const currentTime = Number(getAnimation()?.currentTime)
      if (!oldDuration || !Number.isFinite(currentTime)) {
        return
      }
      const oldDurationMs = oldDuration * 1000
      progress = (currentTime % oldDurationMs) / oldDurationMs
    },
    { flush: 'pre' }
  )

  watch(
    duration,
    (newDuration) => {
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
