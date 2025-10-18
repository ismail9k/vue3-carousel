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
  DragConfig,
  NonNormalizedDir,
  NormalizedDir,
  SlideEffect,
  SnapAlign,
  WheelConfig,
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
      const isValid = BREAKPOINT_MODE_OPTIONS.includes(value)
      if (!isValid) {
        console.warn(`[vue3-carousel]: Invalid breakpointMode "${value}". Allowed values: ${BREAKPOINT_MODE_OPTIONS.join(', ')}`)
      }
      return isValid
    },
  },
  clamp: {
    type: Boolean,
  },
  // control the direction of the carousel
  dir: {
    type: String as PropType<Dir>,
    default: DEFAULT_CONFIG.dir,
    validator(value: Dir, props: { height?: string }) {
      if (!DIR_OPTIONS.includes(value)) {
        console.warn(`[vue3-carousel]: Invalid dir "${value}". Allowed values: ${DIR_OPTIONS.join(', ')}`)
        return false
      }
      const normalizedDir = value in DIR_MAP ? DIR_MAP[value as NonNormalizedDir] : (value as NormalizedDir)
      if (["ttb", "btt"].includes(normalizedDir) && (!props.height || props.height === "auto")) {
        console.warn(`[vue3-carousel]: The dir "${value}" is not supported with height "auto".`)
      }
      return true
    },
  },
  // enable/disable the carousel component
  enabled: {
    default: DEFAULT_CONFIG.enabled,
    type: Boolean,
  },
  focusInJumpToSlide: {
    default: DEFAULT_CONFIG.focusInJumpToSlide,
    type: Boolean,
  },
  // control the gap between slides
  gap: {
    default: DEFAULT_CONFIG.gap,
    type: Number,
  },
  // set carousel height
  height: {
    default: DEFAULT_CONFIG.height,
    type: [Number, String],
  },
  // aria-labels and additional text labels
  i18n: {
    default: DEFAULT_CONFIG.i18n,
    type: Object as PropType<typeof DEFAULT_CONFIG.i18n>,
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
  // slide number number of initial slide
  modelValue: {
    default: undefined,
    type: Number,
  },
  // toggle mouse dragging
  mouseDrag: {
    default: DEFAULT_CONFIG.mouseDrag,
    type: [Boolean, Object] as PropType<boolean | DragConfig>,
  },
  // toggle mouse wheel scrolling
  mouseWheel: {
    default: DEFAULT_CONFIG.mouseWheel,
    type: [Boolean, Object] as PropType<boolean | WheelConfig>,
  },
  // control mouse scroll threshold
  mouseScrollThreshold: {
    default: DEFAULT_CONFIG.mouseScrollThreshold,
    type: Number,
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
          `[vue3-carousel]: "preventExcessiveDragging" cannot be used with wrapAround. The setting will be ignored.`
        )
      }
      return true
    },
  },
  slideEffect: {
    type: String as PropType<SlideEffect>,
    default: DEFAULT_CONFIG.slideEffect,
    validator(value: SlideEffect) {
      const isValid = SLIDE_EFFECTS.includes(value)
      if (!isValid) {
        console.warn(`[vue3-carousel]: Invalid slideEffect "${value}". Allowed values: ${SLIDE_EFFECTS.join(', ')}`)
      }
      return isValid
    },
  },
  // control snap position alignment
  snapAlign: {
    default: DEFAULT_CONFIG.snapAlign,
    validator(value: SnapAlign) {
      const isValid = SNAP_ALIGN_OPTIONS.includes(value)
      if (!isValid) {
        console.warn(`[vue3-carousel]: Invalid snapAlign "${value}". Allowed values: ${SNAP_ALIGN_OPTIONS.join(', ')}`)
      }
      return isValid
    },
  },
  // toggle touch dragging
  touchDrag: {
    default: DEFAULT_CONFIG.touchDrag,
    type: [Boolean, Object] as PropType<boolean | DragConfig>,
  },
  // sliding transition time in ms
  transition: {
    default: DEFAULT_CONFIG.transition,
    type: Number,
  },
  // control infinite scrolling mode
  wrapAround: {
    default: DEFAULT_CONFIG.wrapAround,
    type: Boolean,
  },
}
