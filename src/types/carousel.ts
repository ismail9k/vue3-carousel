import { Reactive, Ref } from 'vue'

import {
  BREAKPOINT_MODE_OPTIONS,
  DIR_OPTIONS,
  SNAP_ALIGN_OPTIONS,
  I18N_DEFAULT_CONFIG,
} from '@/partials/defaults'

export type Breakpoints = { [key: number]: Partial<CarouselConfig> }

export type SnapAlign = (typeof SNAP_ALIGN_OPTIONS)[number]

export type Dir = (typeof DIR_OPTIONS)[number]

export type BreakpointMode = (typeof BREAKPOINT_MODE_OPTIONS)[number]

export type I18nKeys = keyof typeof I18N_DEFAULT_CONFIG
export interface CarouselConfig {
  enabled: boolean
  itemsToShow: number
  itemsToScroll: number
  modelValue?: number
  transition?: number
  gap: number
  autoplay?: number
  snapAlign: SnapAlign
  wrapAround?: boolean
  pauseAutoplayOnHover?: boolean
  mouseDrag?: boolean
  touchDrag?: boolean
  dir?: Dir
  breakpointMode?: string
  breakpoints?: Breakpoints
  height: string | number
  i18n: { [key in I18nKeys]?: string }
}

export interface CarouselNav {
  slideTo: (index: number) => void
  next: () => void
  prev: () => void
}

export interface CarouselData {
  config: CarouselConfig
  slidesCount: Ref<number>
  slideSize: Ref<number>
  currentSlide: Ref<number>
  maxSlide: Ref<number>
  minSlide: Ref<number>
  middleSlide: Ref<number>
}

export interface CarouselMethods extends CarouselNav {
  updateBreakpointsConfig: () => void
  updateSlidesData: () => void
  updateSlideSize: () => void
  restartCarousel: () => void
}
export interface CarouselExposed extends CarouselMethods {
  nav: CarouselNav
  data: Reactive<CarouselData>
}
