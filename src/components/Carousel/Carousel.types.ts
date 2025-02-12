import {
  ComponentInternalInstance,
  ComputedRef,
  Reactive,
  Ref,
  ShallowReactive,
} from 'vue'

import { CarouselConfig, NormalizedDir, SlideRegistry } from '@/shared'

export type ElRect = {
  height: number
  width: number
}

export type Range = {
  min: number
  max: number
}

export type CarouselData = {
  config: CarouselConfig
  currentSlide: Ref<number>
  maxSlide: Ref<number>
  middleSlide: Ref<number>
  minSlide: Ref<number>
  slideSize: Ref<number>
  slidesCount: Ref<number>
}

export type CarouselExposed = CarouselMethods & {
  data: Reactive<CarouselData> // TODO deprecate and remove
} & InjectedCarousel

export type CarouselMethods = CarouselNav & {
  restartCarousel: () => void
  updateBreakpointsConfig: () => void
  updateSlideSize: () => void
  updateSlidesData: () => void
}

export type CarouselNav = {
  next: (skipTransition?: boolean) => void
  prev: (skipTransition?: boolean) => void
  slideTo: (index: number) => void
}

export type InjectedCarousel = Reactive<{
  activeSlide: Ref<number>
  config: CarouselConfig
  currentSlide: Ref<number>
  isSliding: Ref<boolean>
  isVertical: ComputedRef<boolean>
  maxSlide: ComputedRef<number>
  minSlide: ComputedRef<number>
  nav: CarouselNav
  normalizedDir: ComputedRef<NormalizedDir>
  slideRegistry: SlideRegistry
  slideSize: Ref<number>
  slides: ShallowReactive<Array<ComponentInternalInstance>>
  slidesCount: ComputedRef<number>
  viewport: Ref<Element | null>
  visibleRange: ComputedRef<Range>
}>
