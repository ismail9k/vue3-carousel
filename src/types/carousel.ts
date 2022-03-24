export type Breakpoints = { [key: number]: Partial<CarouselConfig> }
export interface CarouselConfig {
  itemsToShow: number
  itemsToScroll: number
  modelValue?: number
  transition?: number
  autoplay?: number
  snapAlign: 'start' | 'end' | 'center' | 'center-even' | 'center-odd'
  wrapAround?: boolean
  pauseAutoplayOnHover?: boolean
  mouseDrag?: boolean
  touchDrag?: boolean
  dir: 'rtl' | 'ltr'
  breakpoints?: Breakpoints
  settings?: Partial<CarouselConfig>
}

export interface CarouselNav {
  [key: string]: any
}

export interface ElementStyleObject {
  [key: string]: any
}
