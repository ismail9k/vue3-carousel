import {
  BREAKPOINT_MODE_OPTIONS,
  DEFAULT_CONFIG,
  DIR_OPTIONS,
  SNAP_ALIGN_OPTIONS,
} from '@/partials/defaults'

export const carouselProps = {
  // count of items to showed per view
  itemsToShow: {
    default: DEFAULT_CONFIG.itemsToShow,
    type: Number,
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: DEFAULT_CONFIG.itemsToScroll,
    type: Number,
  },
  // control infinite scrolling mode
  wrapAround: {
    default: DEFAULT_CONFIG.wrapAround,
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
  // control snap position alignment
  snapAlign: {
    default: DEFAULT_CONFIG.snapAlign,
    validator(value: string) {
      return SNAP_ALIGN_OPTIONS.includes(value)
    },
  },
  // sliding transition time in ms
  transition: {
    default: DEFAULT_CONFIG.transition,
    type: Number,
  },
  // controls the breakpoint mode relative to the carousel container or the viewport
  breakpointMode: {
    default: DEFAULT_CONFIG.breakpointMode,
    validator(value: string) {
      return BREAKPOINT_MODE_OPTIONS.includes(value)
    },
  },
  // an object to store breakpoints
  breakpoints: {
    default: DEFAULT_CONFIG.breakpoints,
    type: Object,
  },
  // time to auto advance slides in ms
  autoplay: {
    default: DEFAULT_CONFIG.autoplay,
    type: Number,
  },
  // pause autoplay when mouse hover over the carousel
  pauseAutoplayOnHover: {
    default: DEFAULT_CONFIG.pauseAutoplayOnHover,
    type: Boolean,
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
  // control snap position alignment
  dir: {
    default: DEFAULT_CONFIG.dir,
    validator(value: string) {
      // The value must match one of these strings
      return DIR_OPTIONS.includes(value)
    },
  },
  // aria-labels and additional text labels
  i18n: {
    default: DEFAULT_CONFIG.i18n,
    type: Object,
  },
}
