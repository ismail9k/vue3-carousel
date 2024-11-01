import { defaultConfig } from '@/partials/defaults'

export const carouselProps = {
  // count of items to showed per view
  itemsToShow: {
    default: defaultConfig.itemsToShow,
    type: Number,
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: defaultConfig.itemsToScroll,
    type: Number,
  },
  // control infinite scrolling mode
  wrapAround: {
    default: defaultConfig.wrapAround,
    type: Boolean,
  },
  // control max drag
  throttle: {
    default: defaultConfig.throttle,
    type: Number,
  },
  // control snap position alignment
  snapAlign: {
    default: defaultConfig.snapAlign,
    validator(value: string) {
      // The value must match one of these strings
      return ['start', 'end', 'center', 'center-even', 'center-odd'].includes(value)
    },
  },
  // sliding transition time in ms
  transition: {
    default: defaultConfig.transition,
    type: Number,
  },
  // controls the breakpoint mode relative to the carousel container or the viewport
  breakpointMode: {
    default: defaultConfig.breakpointMode,
    validator(value: string) {
      return ['window', 'carousel'].includes(value)
    },
  },
  // an object to store breakpoints
  breakpoints: {
    default: defaultConfig.breakpoints,
    type: Object,
  },
  // time to auto advance slides in ms
  autoplay: {
    default: defaultConfig.autoplay,
    type: Number,
  },
  // pause autoplay when mouse hover over the carousel
  pauseAutoplayOnHover: {
    default: defaultConfig.pauseAutoplayOnHover,
    type: Boolean,
  },
  // slide number number of initial slide
  modelValue: {
    default: undefined,
    type: Number,
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: defaultConfig.mouseDrag,
    type: Boolean,
  },
  // toggle mouse dragging.
  touchDrag: {
    default: defaultConfig.touchDrag,
    type: Boolean,
  },
  // control snap position alignment
  dir: {
    default: defaultConfig.dir,
    validator(value: string) {
      // The value must match one of these strings
      return ['rtl', 'ltr'].includes(value)
    },
  },
  // aria-labels and additional text labels
  i18n: {
    default: defaultConfig.i18n,
    type: Object,
  },
}
