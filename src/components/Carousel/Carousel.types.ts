import {
  ComponentInternalInstance,
  ComputedRef,
  Reactive,
  Ref,
  ShallowReactive,
} from 'vue'

import { SlideRegistry, CarouselConfig, NormalizedDir } from '@/shared'

export interface CarouselNav {
  slideTo: (index: number) => void
  next: (skipTransition?: boolean) => void
  prev: (skipTransition?: boolean) => void
}

export type InjectedCarousel = Reactive<{
  config: CarouselConfig
  viewport: Ref<Element | null>
  slides: ShallowReactive<Array<ComponentInternalInstance>>
  slidesCount: ComputedRef<number>
  clonedSlidesCount: ComputedRef<number>
  currentSlide: Ref<number>
  scrolledIndex: Ref<number>
  maxSlide: ComputedRef<number>
  minSlide: ComputedRef<number>
  slideSize: Ref<number>
  isVertical: ComputedRef<boolean>
  normalizedDir: ComputedRef<NormalizedDir>
  nav: CarouselNav
  isSliding: Ref<boolean>
  slideRegistry: SlideRegistry
}>

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
