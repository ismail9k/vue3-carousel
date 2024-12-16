import { CarouselConfig } from './types'

export const SNAP_ALIGN_OPTIONS = ['center', 'start', 'end', 'center-even', 'center-odd'] as const
export const BREAKPOINT_MODE_OPTIONS = ['viewport', 'carousel'] as const
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
  ariaNextSlide: 'Navigate to next slide',
  ariaPreviousSlide: 'Navigate to previous slide',
  ariaNavigateToSlide: 'Navigate to slide {slideNumber}',
  ariaNavigateToPage: 'Navigate to page {slideNumber}',
  ariaGallery: 'Gallery',
  itemXofY: 'Item {currentSlide} of {slidesCount}',
  iconArrowUp: 'Arrow pointing upwards',
  iconArrowDown: 'Arrow pointing downwards',
  iconArrowRight: 'Arrow pointing to the right',
  iconArrowLeft: 'Arrow pointing to the left',
} as const

export const DIR_MAP = {
  'left-to-right': 'ltr',
  'right-to-left': 'rtl',
  'top-to-bottom': 'ttb',
  'bottom-to-top': 'btt',
} as const

export const NORMALIZED_DIR_OPTIONS = Object.values(DIR_MAP)

export const DEFAULT_CONFIG: CarouselConfig = {
  enabled: true,
  itemsToShow: 1,
  itemsToScroll: 1,
  modelValue: 0,
  transition: 300,
  autoplay: 0,
  gap: 0,
  height: 'auto',
  wrapAround: false,
  pauseAutoplayOnHover: false,
  mouseDrag: true,
  touchDrag: true,
  snapAlign: SNAP_ALIGN_OPTIONS[0],
  dir: DIR_OPTIONS[0],
  breakpointMode: BREAKPOINT_MODE_OPTIONS[0],
  breakpoints: undefined,
  i18n: I18N_DEFAULT_CONFIG,
  ignoreAnimations: false,
}
