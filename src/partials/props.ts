import { defaultConfigs } from '@/partials/defaults'

export const carouselProps = {
  // count of items to showed per view
  itemsToShow: {
    default: defaultConfigs.itemsToShow,
    type: Number,
  },
  // count of items to be scrolled
  itemsToScroll: {
    default: defaultConfigs.itemsToScroll,
    type: Number,
  },
  // control infinite scrolling mode
  wrapAround: {
    default: defaultConfigs.wrapAround,
    type: Boolean,
  },
  // control max drag
  throttle: {
    default: defaultConfigs.throttle,
    type: Number,
  },
  // control snap position alignment
  snapAlign: {
    default: defaultConfigs.snapAlign,
    validator(value: string) {
      // The value must match one of these strings
      return ['start', 'end', 'center', 'center-even', 'center-odd'].includes(value)
    },
  },
  // sliding transition time in ms
  transition: {
    default: defaultConfigs.transition,
    type: Number,
  },
  // an object to store breakpoints
  breakpoints: {
    default: defaultConfigs.breakpoints,
    type: Object,
  },
  // time to auto advance slides in ms
  autoplay: {
    default: defaultConfigs.autoplay,
    type: Number,
  },
  // pause autoplay when mouse hover over the carousel
  pauseAutoplayOnHover: {
    default: defaultConfigs.pauseAutoplayOnHover,
    type: Boolean,
  },
  // slide number number of initial slide
  modelValue: {
    default: undefined,
    type: Number,
  },
  // toggle mouse dragging.
  mouseDrag: {
    default: defaultConfigs.mouseDrag,
    type: Boolean,
  },
  // toggle mouse dragging.
  touchDrag: {
    default: defaultConfigs.touchDrag,
    type: Boolean,
  },
  // control snap position alignment
  dir: {
    default: defaultConfigs.dir,
    validator(value: string) {
      // The value must match one of these strings
      return ['rtl', 'ltr'].includes(value)
    },
  },
  // aria-labels and additional text labels
  i18n: {
    default: defaultConfigs.i18n,
    type: Object,
  },
  // an object to pass all settings
  settings: {
    default() {
      return {}
    },
    type: Object,
  },
}
