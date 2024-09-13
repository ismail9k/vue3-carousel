export type Breakpoints = { [key: number]: Partial<CarouselConfig> }

export type SnapAlign = 'start' | 'end' | 'center' | 'center-even' | 'center-odd'

export type Dir = 'rtl' | 'ltr'

export type I18nKeys =
  | 'ariaNextSlide'
  | 'ariaPreviousSlide'
  | 'ariaNavigateToSlide'
  | 'ariaGallery'
  | 'iconArrowUp'
  | 'iconArrowDown'
  | 'iconArrowRight'
  | 'iconArrowLeft'
  | 'itemXofY'
export interface CarouselConfig {
  itemsToShow: number
  itemsToScroll: number
  modelValue?: number
  transition?: number
  throttle: number
  autoplay?: number
  snapAlign: SnapAlign
  wrapAround?: boolean
  pauseAutoplayOnHover?: boolean
  mouseDrag?: boolean
  touchDrag?: boolean
  dir?: Dir
  breakpoints?: Breakpoints
  breakpointsToContainer: boolean
  settings?: Partial<CarouselConfig>
  i18n: { [key in I18nKeys]?: string }
}

export interface CarouselNav {
  [key: string]: any
}

export interface ElementStyleObject {
  [key: string]: any
}
