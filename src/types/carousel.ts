export type Breakpoints = { [key: number]: Partial<CarouselConfig> }

export type SnapAlign = 'start' | 'end' | 'center' | 'center-even' | 'center-odd'

export type Dir = 'rtl' | 'ltr'
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
  settings?: Partial<CarouselConfig>
}

export interface CarouselNav {
  [key: string]: any
}

export interface ElementStyleObject {
  [key: string]: any
}
