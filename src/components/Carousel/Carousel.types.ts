import { Reactive, Ref } from 'vue'

import { CarouselConfig } from '@/shared/types'

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
