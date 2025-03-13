import { CarouselConfig } from './types'

export const BREAKPOINT_MODE_OPTIONS = ['viewport', 'carousel'] as const

export const DIR_MAP = {
  'bottom-to-top': 'btt',
  'left-to-right': 'ltr',
  'right-to-left': 'rtl',
  'top-to-bottom': 'ttb',
} as const

export const DIR_OPTIONS = [
  'ltr',
  'left-to-right',
  'rtl',
  'right-to-left',
  'ttb',
  'top-to-bottom',
  'btt',
  'bottom-to-top',
] as const

export const I18N_DEFAULT_CONFIG = {
  ariaGallery: 'Gallery',
  ariaNavigateToPage: 'Navigate to page {slideNumber}',
  ariaNavigateToSlide: 'Navigate to slide {slideNumber}',
  ariaNextSlide: 'Navigate to next slide',
  ariaPreviousSlide: 'Navigate to previous slide',
  iconArrowDown: 'Arrow pointing downwards',
  iconArrowLeft: 'Arrow pointing to the left',
  iconArrowRight: 'Arrow pointing to the right',
  iconArrowUp: 'Arrow pointing upwards',
  itemXofY: 'Item {currentSlide} of {slidesCount}',
} as const

export const NORMALIZED_DIR_OPTIONS = Object.values(DIR_MAP)

export const SLIDE_EFFECTS = ['slide', 'fade'] as const

export const SNAP_ALIGN_OPTIONS = [
  'center',
  'start',
  'end',
  'center-even',
  'center-odd',
] as const

export const DEFAULT_MOUSE_WHEEL_THRESHOLD = 10
export const DEFAULT_DRAG_THRESHOLD = 0.3

export const DEFAULT_CONFIG: CarouselConfig = {
  autoplay: 0,
  breakpointMode: BREAKPOINT_MODE_OPTIONS[0],
  breakpoints: undefined,
  dir: DIR_OPTIONS[0],
  enabled: true,
  gap: 0,
  height: 'auto',
  i18n: I18N_DEFAULT_CONFIG,
  ignoreAnimations: false,
  itemsToScroll: 1,
  itemsToShow: 1,
  modelValue: 0,
  mouseDrag: true,
  mouseWheel: false,
  pauseAutoplayOnHover: false,
  preventExcessiveDragging: false,
  slideEffect: SLIDE_EFFECTS[0],
  snapAlign: SNAP_ALIGN_OPTIONS[0],
  touchDrag: true,
  transition: 300,
  wrapAround: false,
}
