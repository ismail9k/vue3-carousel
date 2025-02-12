import { PropType } from 'vue'

import {
  BREAKPOINT_MODE_OPTIONS,
  DEFAULT_CONFIG,
  DIR_MAP,
  DIR_OPTIONS,
  SLIDE_EFFECTS,
  SNAP_ALIGN_OPTIONS,
} from '@/shared'

import type {
  BreakpointMode,
  CarouselConfig,
  Dir,
  NonNormalizedDir,
  NormalizedDir,
  SlideEffect,
  SnapAlign,
} from '@/shared'

export const carouselProps = {
  // time to auto advance slides in ms
  autoplay: {
    default: DEFAULT_CONFIG.autoplay,
    type: Number,
  },
  // an object to store breakpoints
  breakpoints: {
    default: DEFAULT_CONFIG.breakpoints,
    type: Object as PropType<CarouselConfig['breakpoints']>,
  },
  // controls the breakpoint mode relative to the carousel container or the viewport
  breakpointMode: {
    default: DEFAULT_CONFIG.breakpointMode,
    validator(value: BreakpointMode) {
      return BREAKPOINT_MODE_OPTIONS.includes(value)
    },
  },
  // automatically disable interaction if the slides don't overflow its container
  disableInteractionWhenNoOverflow: {
    default: DEFAULT_CONFIG.disableInteractionWhenNoOverflow,
    type: Boolean
  },
  // enable/disable the carousel component
  enabled: {
    default: DEFAULT_CONFIG.enabled,
    type: Boolean,
  },
  // control the gap between slides
  gap: {
    default: DEFAULT_CONFIG.gap,
    type: Number,
  },
  // control the gap between slides
  height: {
    default: DEFAULT_CONFIG.height,
    type: [Number, String],
  },
  ignoreAnimations: {
    default: false,
    type: [Array, Boolean, String] as PropType<CarouselConfig['ignoreAnimations']>,
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: DEFAULT_CONFIG.itemsToScroll,
    type: Number,
  },
  // count of items to showed per view
  itemsToShow: {
    default: DEFAULT_CONFIG.itemsToShow,
    type: [Number, String],
  },
  // aria-labels and additional text labels
  i18n: {
    default: DEFAULT_CONFIG.i18n,
    type: Object as PropType<typeof DEFAULT_CONFIG.i18n>,
  },
  // slide number number of initial slide
  modelValue: {
    default: undefined,
    type: Number,
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: DEFAULT_CONFIG.mouseDrag,
    type: Boolean,
  },
  // toggle mouse dragging.
  touchDrag: {
    default: DEFAULT_CONFIG.touchDrag,
    type: Boolean,
  },
  pauseAutoplayOnHover: {
    default: DEFAULT_CONFIG.pauseAutoplayOnHover,
    type: Boolean,
  },
  preventExcessiveDragging: {
    default: false,
    type: Boolean,
    validator(value: boolean, props: { wrapAround?: boolean }) {
      if (value && props.wrapAround) {
        console.warn(
          `[vue3-carousel warn]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.`
        )
      }

      return true
    },
  },
  // control snap position alignment
  snapAlign: {
    default: DEFAULT_CONFIG.snapAlign,
    validator(value: SnapAlign) {
      return SNAP_ALIGN_OPTIONS.includes(value)
    },
  },
  slideEffect: {
    type: String as PropType<SlideEffect>,
    default: DEFAULT_CONFIG.slideEffect,
    validator(value: SlideEffect) {
      return SLIDE_EFFECTS.includes(value)
    },
  },
  // sliding transition time in ms
  transition: {
    default: DEFAULT_CONFIG.transition,
    type: Number,
  },
  // control the gap between slides
  dir: {
    type: String as PropType<Dir>,
    default: DEFAULT_CONFIG.dir,
    validator(value: Dir, props: { height?: string }) {
      // The value must match one of these strings
      if (!DIR_OPTIONS.includes(value)) {
        return false
      }

      const normalizedDir =
        value in DIR_MAP ? DIR_MAP[value as NonNormalizedDir] : (value as NormalizedDir)
      if (
        ['ttb', 'btt'].includes(normalizedDir) &&
        (!props.height || props.height === 'auto')
      ) {
        console.warn(
          `[vue3-carousel warn]: The dir "${value}" is not supported with height "auto".`
        )
      }
      return true
    },
  },
  // control infinite scrolling mode
  wrapAround: {
    default: DEFAULT_CONFIG.wrapAround,
    type: Boolean,
  },
}
