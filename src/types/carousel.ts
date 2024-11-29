import { ComponentInternalInstance, ComputedRef, Reactive, Ref, ShallowReactive } from 'vue'

import {
  BREAKPOINT_MODE_OPTIONS,
  DIR_OPTIONS,
  SNAP_ALIGN_OPTIONS,
  I18N_DEFAULT_CONFIG,
  NORMALIZED_DIR_OPTIONS, DIR_MAP,
} from '@/partials/defaults'

export type Breakpoints = { [key: number]: Partial<Omit<CarouselConfig, 'breakpoints' | 'modelValue' | 'breakpointMode'>> }

export type SnapAlign = typeof SNAP_ALIGN_OPTIONS[number]

export type Dir = typeof DIR_OPTIONS[number]

export type BreakpointMode = typeof BREAKPOINT_MODE_OPTIONS[number]

export type NormalizedDir = typeof NORMALIZED_DIR_OPTIONS[number]

export type NonNormalizedDir = keyof typeof DIR_MAP

export type I18nKeys = keyof typeof I18N_DEFAULT_CONFIG

export type InjectedCarousel = Reactive<{
  config: CarouselConfig,
  viewport: Ref<Element | null>,
  slides: ShallowReactive<Array<ComponentInternalInstance>>
  slidesCount: ComputedRef<number>,
  currentSlide: Ref<number>,
  scrolledIndex: Ref<number>
  maxSlide: ComputedRef<number>,
  minSlide: ComputedRef<number>,
  slideSize: Ref<number>,
  isVertical: ComputedRef<boolean>,
  normalizedDir: ComputedRef<NormalizedDir>,
  nav: CarouselNav,
  isSliding: Ref<boolean>,
  registerSlide: (slide: ComponentInternalInstance, indexCb: (idx: number) => void) => void,
  unregisterSlide: (slide: ComponentInternalInstance) => void,
}>
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
  breakpointMode?: BreakpointMode
  breakpoints?: Breakpoints
  height: string | number
  i18n: { [key in I18nKeys]?: string }
}

export interface CarouselNav {
  slideTo: (index: number, skipTransition?: boolean) => void
  next: (skipTransition?: boolean) => void
  prev: (skipTransition?: boolean) => void
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
